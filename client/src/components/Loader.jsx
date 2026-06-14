import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ text = "Analyzing..." }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className="relative w-20 h-20 mb-4">
                <motion.div
                    className="absolute inset-0 border-4 border-cyan-500/30 rounded-full"
                />
                <motion.div
                    className="absolute inset-0 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
            </div>
            <p className="text-cyan-400 animate-pulse font-medium tracking-wide">{text}</p>
        </div>
    );
};

export default Loader;
