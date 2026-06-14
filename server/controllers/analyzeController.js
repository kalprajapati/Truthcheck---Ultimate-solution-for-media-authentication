const Report = require('../models/Report');
const { scanMedia } = require('../services/deepwareService');
const { verifyText } = require('../services/newsVerifyService');
const { calculateTrustScore } = require('../utils/trustScore');
const { extractMetadata } = require('../services/metadataService');
const { searchImage } = require('../services/reverseImageSearchService');
const { analyzeTextWithAI } = require('../services/geminiService');

// @desc    Analyze uploaded media (Image/Video)
// @route   POST /api/analyze/media
// @access  Public
const analyzeMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        // 1. Metadata Extraction
        const { metadataRisk, metadata } = extractMetadata(req.file.path, req.file.mimetype);

        // 2. Reverse Image Search
        const reverseImageResult = await searchImage(req.file.path);

        // 3. Deepware Scan
        // In a real app, we would upload the file to Deepware or a cloud bucket first.
        // Here we just pass the dummy identifier.
        const deepwareResult = await scanMedia(req.file.path);

        // 4. Calculate Score
        // We pass the reverse image search score as the verification data for media
        const trustScore = calculateTrustScore(deepwareResult, { score: reverseImageResult.score }, metadataRisk);

        // 5. Save Report
        const report = new Report({
            user: req.user ? req.user._id : null,
            type: 'media',
            input: req.file.filename,
            deepwareScore: deepwareResult.score,
            deepfakeProbability: deepwareResult.confidence * 100,
            metadataScore: 100 - metadataRisk,
            trustScore: trustScore,
            details: {
                ...deepwareResult,
                metadata: metadata,
                reverseImageSearch: reverseImageResult
            }
        });

        // 4. Save Report (Optional)
        try {
            await report.save();
        } catch (dbError) {
            console.error("Database save failed (ignoring):", dbError.message);
        }

        res.status(200).json({ success: true, report });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error', error: error.message });
    }
};

// @desc    Analyze text or URL
// @route   POST /api/analyze/text
// @access  Public
const analyzeText = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ msg: 'No text provided' });
        }

        // 1. Verify Text
        const verifyResult = await verifyText(text);

        // 2. Deepfake check for text using Gemini AI
        const aiResult = await analyzeTextWithAI(text);
        const aiDetectionScore = aiResult.aiDetectionScore;
        const isAiGenerated = aiResult.isAiGenerated;

        // 3. Calculate Score
        // We map AI detection to "Deepfake Data" slot
        const trustScore = calculateTrustScore(
            { score: aiDetectionScore },
            verifyResult,
            0 // No metadata risk for raw text
        );

        // 4. Save Report
        const report = new Report({
            user: req.user ? req.user._id : null,
            type: 'text',
            input: text.substring(0, 50) + '...',
            deepwareScore: aiDetectionScore, // Reusing field for AI score
            factCheckScore: verifyResult.score,
            trustScore: trustScore,
            details: { ...verifyResult, isAiGenerated, aiAnalysis: aiResult.analysis }
        });

        // 4. Save Report (Optional)
        try {
            await report.save();
        } catch (dbError) {
            console.error("Database save failed (ignoring):", dbError.message);
        }

        res.status(200).json({ success: true, report });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error', error: error.message });
    }
};

// @desc    Get Report by ID
// @route   GET /api/report/:id
const getReport = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ msg: 'Report not found' });
        res.json(report);
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @desc    Get user's analysis history
// @route   GET /api/analyze/history
// @access  Private
const getHistory = async (req, res) => {
    try {
        const history = await Report.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(history);
    } catch (error) {
        console.error("Get History Error:", error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

module.exports = { analyzeMedia, analyzeText, getReport, getHistory };
