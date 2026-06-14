const axios = require('axios');

const DEEPWARE_API_URL = 'https://api.deepware.ai/api/v1';
const API_KEY = process.env.DEEPWARE_API_KEY;

// Mock Fallback generator
const getMockAnalysis = () => {
    const isDeepfake = Math.random() < 0.3; // 30% chance of being fake for demo
    const deepfakeScore = isDeepfake ? (Math.random() * 40 + 60) : (Math.random() * 20); // High score if fake, low if real

    return {
        score: deepfakeScore,
        confidence: Math.random() * 0.5 + 0.5,
        isFake: isDeepfake,
        source: "Mock Deepware Analysis"
    };
};

const scanMedia = async (fileUrl) => {
    if (!API_KEY || API_KEY === 'mock_deepware_key') {
        return getMockAnalysis();
    }

    try {
        // Real logic would go here:
        // 1. POST /video/scan
        // 2. Poll /video/report/:id
        // Implementing mock for reliability during this setup
        return getMockAnalysis();
    } catch (error) {
        console.error("Deepware API Error, using fallback:", error.message);
        return getMockAnalysis();
    }
};

module.exports = { scanMedia };
