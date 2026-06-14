const axios = require('axios');

const GOOGLE_FACT_CHECK_URL = 'https://factchecktools.googleapis.com/v1alpha1/claims:search';
const API_KEY = process.env.GOOGLE_FACT_CHECK_KEY;

// Expanded Internal Knowledge Base for Demo
const MOCK_DB = [
    { keywords: ["taylor swift", "ai"], verdict: "Misleading", score: 20, reason: "High volume of AI-generated deepfakes involving this subject reported." },
    { keywords: ["flat earth", "nasa", "fake"], verdict: "False", score: 0, reason: "Scientific consensus contradicts this claim." },
    { keywords: ["election", "stolen", "fraud"], verdict: "Disputed", score: 40, reason: "Multiple independent audits have confirmed election integrity." },
    { keywords: ["cure", "cancer", "secret", "miracle"], verdict: "Suspicious", score: 15, reason: "Medical claims require peer-reviewed evidence. 'Miracle cure' is a common disinformation flag." },
    { keywords: ["free money", "giveaway", "crypto", "elon musk"], verdict: "Scam", score: 5, reason: "Pattern matches known cryptocurrency scams." },
    { keywords: ["alien", "ufo", "invasion"], verdict: "Unverified", score: 30, reason: "Extraordinary claims require extraordinary evidence." },
    { keywords: ["pope", "jacket", "balenciaga"], verdict: "Satire", score: 60, reason: "Viral AI-generated image (Midjourney)." },
    { keywords: ["water", "wet"], verdict: "True", score: 98, reason: "Basic tautology." }
];

// Keywords that suggest clickbait or low quality
const SENSATIONAL_KEYWORDS = [
    "shocking", "you won't believe", "secret they hide", "banned video",
    "leak", "exposed", "truth about", "100% real", "destroy", "annihilate"
];

const CREDIBLE_DOMAINS = [
    "reuters.com", "apnews.com", "bbc.com", "nytimes.com", "nature.com", "gov", "edu"
];

/**
 * simulatedAiAnalysis - Performs heuristic analysis when no API is available
 */
const simulatedAiAnalysis = (text) => {
    let score = 75; // Start with a "C" grade
    let rating = "Unverified";
    let flags = [];

    const lowerText = text.toLowerCase();

    // 1. Database Lookup (Fuzzy Match)
    for (const entry of MOCK_DB) {
        if (entry.keywords.some(k => lowerText.includes(k))) {
            return {
                verified: entry.score > 50,
                score: entry.score,
                rating: entry.verdict,
                references: [{
                    publisher: "Internal Knowledge Base",
                    url: "#",
                    title: `Flagged Topic: ${entry.reason}`
                }]
            };
        }
    }

    // 2. Sensationalism Check
    let sensCount = 0;
    SENSATIONAL_KEYWORDS.forEach(word => {
        if (lowerText.includes(word)) sensCount++;
    });

    if (sensCount > 0) {
        score -= (sensCount * 15);
        flags.push("Contains clickbait/sensationalist language");
        rating = "Sensationalist";
    }

    // 3. CAPSLOCK CHECK
    const upperCount = text.replace(/[^A-Z]/g, "").length;
    const totalCount = text.length;
    if (totalCount > 0 && (upperCount / totalCount) > 0.3) {
        score -= 20;
        flags.push("Excessive use of capitalization");
        rating = "Low Quality";
    }

    // 4. Source Credibility (if URL)
    if (text.includes("http")) {
        const isCredible = CREDIBLE_DOMAINS.some(d => lowerText.includes(d));
        if (isCredible) {
            score += 20;
            rating = "Likely Credible";
            flags.push("Source domain is on the safe list");
        } else {
            // Neutral for unknown domains, but slight penalty for random blogs
            score -= 5;
        }
    }

    // Bound score
    score = Math.max(0, Math.min(100, score));

    return {
        verified: score > 60,
        score,
        rating: rating,
        references: flags.map(f => ({ publisher: "Heuristic Analysis", title: f, url: "#" }))
    };
};

const verifyText = async (query) => {
    // If REAL KEY is present, use it
    if (API_KEY && API_KEY !== 'mock_google_key') {
        try {
            console.log(`Querying Google Fact Check: ${query}`);
            const response = await axios.get(GOOGLE_FACT_CHECK_URL, {
                params: {
                    query: query,
                    key: API_KEY,
                    languageCode: 'en'
                }
            });

            if (response.data.claims && response.data.claims.length > 0) {
                const claim = response.data.claims[0];
                const rating = claim.claimReview[0].textualRating;

                // Smart score mapping
                let score = 50;
                const r = rating.toLowerCase();
                if (r.includes('true') || r.includes('correct')) score = 95;
                else if (r.includes('false') || r.includes('fake') || r.includes('incorrect')) score = 10;
                else if (r.includes('misleading') || r.includes('context')) score = 40;
                else if (r.includes('satire')) score = 60;

                return {
                    verified: score > 50,
                    score,
                    rating: rating,
                    references: response.data.claims.map(c => ({
                        publisher: c.claimReview[0].publisher.name,
                        url: c.claimReview[0].url,
                        title: c.text
                    }))
                };
            } else {
                // API returned no results -> Fallback to simulation
                console.log("No API results, falling back to simulation.");
                return simulatedAiAnalysis(query);
            }

        } catch (error) {
            console.error("Fact Check API Error:", error.message);
            // Fallback to simulation
            return simulatedAiAnalysis(query);
        }
    } else {
        // MOCK MODE
        return simulatedAiAnalysis(query);
    }
};

module.exports = { verifyText };
