import React from 'react';
import { motion } from 'framer-motion';

const TrustMeter = ({ score }) => {
    // 0-40 Red, 41-70 Yellow, 71-100 Green
    const getColor = (s) => {
        if (s >= 80) return '#10b981'; // Emerald 500
        if (s >= 60) return '#fbbf24'; // Amber 400
        return '#ef4444'; // Red 500
    };

    const color = getColor(score);
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative flex flex-col items-center justify-center">
            <svg width="200" height="200" className="transform -rotate-90">
                {/* Background Ring */} 
                <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    stroke="#1e293b"
                    strokeWidth="15"
                    fill="transparent"
                />
                {/* Progress Ring */}
                <motion.circle
                    cx="100"
                    cy="100"
                    r={radius}
                    stroke={color}
                    strokeWidth="15"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference} // Start from 0
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold text-white mb-1">{score}%</span>
                <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Trust Score</span>
            </div>
        </div>
    );
};

export default TrustMeter;
