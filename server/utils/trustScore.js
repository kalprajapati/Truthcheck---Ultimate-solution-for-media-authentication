const calculateTrustScore = (deepfakeData, verificationData, metadataRisk = 0) => {
    // Base Weights
    const W_DEEPFAKE = 0.4;
    const W_VERIFY = 0.4;
    const W_META = 0.2;

    // Normalizing inputs
    // Deepwire returns "Deepfake Score" (Higher = Fake). We want Trust Score (Higher = Real).
    const deepfakeTrust = 100 - (deepfakeData.score || 0);

    // Verification Score (Higher = Real/True).
    const verifyTrust = verificationData.score || 50; // Default neutral

    // Metadata Risk (Higher = Risky). Trust = 100 - Risk.
    const metaTrust = 100 - metadataRisk;

    // Final Calculation
    let totalScore = (deepfakeTrust * W_DEEPFAKE) + (verifyTrust * W_VERIFY) + (metaTrust * W_META);

    // Hard Penalty for Metadata Manipulation
    // If the metadata risk is high (e.g., Photoshop or Canva detected), 
    // we apply a severe penalty, regardless of if the AI thought it was real.
    if (metadataRisk >= 50) {
        totalScore = totalScore * 0.7; // Flat 30% penalty
    } else if (metadataRisk >= 25) {
        totalScore = totalScore * 0.9; // Flat 10% penalty
    }

    return Math.round(totalScore);
};

module.exports = { calculateTrustScore };
