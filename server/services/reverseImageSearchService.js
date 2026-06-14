const fs = require('fs');

/**
 * Simulates a Reverse Image Search API (like Google Lens or TinEye)
 * 
 * @param {string} filePath - Path to the uploaded file
 * @returns {object} { matchType, matchesFound, oldestDate, score, sources }
 */
const searchImage = async (filePath) => {
    // In a real app, we would upload the buffer to TinEye/Google Vision API.
    // Here we simulate the process. We can use the file size to deterministically 
    // mock a result so the same image yields the same result.
    
    let fileSize = 0;
    try {
        const stats = fs.statSync(filePath);
        fileSize = stats.size;
    } catch (e) {
        fileSize = Math.floor(Math.random() * 1000000);
    }

    // Determine state based on the last digit of the file size
    const stateSeed = fileSize % 3;

    let result = {
        matchesFound: false,
        matchType: 'unique', // unique, recent, historical
        oldestDate: null,
        score: 100, // 100 = Unique (Good), 80 = Recent (Neutral), 10 = Historical (Bad)
        sources: []
    };

    const DOMAINS = ["reddit.com", "news.yahoo.com", "twitter.com", "apnews.com", "bbc.com", "facebook.com", "pinterest.com"];

    if (stateSeed === 0) {
        // Historical Match (High risk, likely out of context)
        result.matchesFound = true;
        result.matchType = 'historical';
        result.score = 10;
        
        // Generate a date from 3-8 years ago
        const yearsAgo = Math.floor(Math.random() * 5) + 3;
        const pastDate = new Date();
        pastDate.setFullYear(pastDate.getFullYear() - yearsAgo);
        pastDate.setMonth(Math.floor(Math.random() * 12));
        result.oldestDate = pastDate.toISOString().split('T')[0];

        // Random sources
        result.sources = [
            `https://${DOMAINS[Math.floor(Math.random() * DOMAINS.length)]}/article/archive/${yearsAgo}`,
            `https://${DOMAINS[Math.floor(Math.random() * DOMAINS.length)]}/post/${Math.floor(Math.random() * 99999)}`
        ];

    } else if (stateSeed === 1) {
        // Recent Match (Neutral risk, maybe a recent news photo)
        result.matchesFound = true;
        result.matchType = 'recent';
        result.score = 80;

        // Generate a date within the last 14 days
        const daysAgo = Math.floor(Math.random() * 14) + 1;
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - daysAgo);
        result.oldestDate = pastDate.toISOString().split('T')[0];

        result.sources = [
            `https://${DOMAINS[Math.floor(Math.random() * DOMAINS.length)]}/breaking-news/`
        ];

    } else {
        // Unique / Not Found (Good, authentic user photo)
        result.matchesFound = false;
        result.matchType = 'unique';
        result.score = 100;
        result.oldestDate = "N/A";
        result.sources = [];
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return result;
};

module.exports = { searchImage };
