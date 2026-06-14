import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Upload, Search, Database, CheckCircle, Lock, FileText, Cpu, Eye, Shield } from 'lucide-react';

const HowItWorks = () => {
    return (
        <div className="min-h-screen bg-background text-gray-200">
            <Navbar />

            {/* Header */}
            <div className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary-light text-xs font-medium mb-6 animate-fade-in backdrop-blur-sm">
                        <Shield size={12} />
                        The TruthCheck Protocol
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                        Forensic Verification <span className="text-gradient-primary">Demystified</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-100">
                        Our multi-layered analysis engine combines Deep Learning, Metadata extraction, and Cross-reference databases to determine content authenticity with high confidence.
                    </p>
                </div>
            </div>

            {/* Detailed Workflow Steps */}
            <div className="container mx-auto px-6 pb-32">
                <div className="max-w-5xl mx-auto space-y-24">

                    {/* Step 1 */}
                    <div className="flex flex-col md:flex-row gap-12 items-center animate-slide-up">
                        <div className="md:w-1/2 relative">
                            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full"></div>
                            <div className="relative z-10 bg-surface border border-white/10 rounded-2xl p-8 shadow-2xl">
                                <Upload className="w-16 h-16 text-primary mb-6" />
                                <div className="space-y-4">
                                    <div className="h-2 bg-white/10 rounded w-3/4"></div>
                                    <div className="h-2 bg-white/10 rounded w-1/2"></div>
                                    <div className="h-2 bg-white/10 rounded w-full"></div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="text-primary font-mono text-sm mb-4">STEP 01</div>
                            <h2 className="text-3xl font-bold text-white mb-4">Secure Ingestion & Hashing</h2>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                When you upload media, we first generate a unique cryptographic hash (SHA-256) of the file. This creates a digital fingerprint that ensures the file hasn't been tampered with during transit and allows us to check against known databases of previously debunked content.
                            </p>
                            <ul className="space-y-3 text-sm text-gray-500">
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-status-success" /> End-to-end encryption</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-status-success" /> Chain of custody verification</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-status-success" /> Privacy-first volatile processing</li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col md:flex-row-reverse gap-12 items-center animate-slide-up">
                        <div className="md:w-1/2 relative">
                            <div className="absolute inset-0 bg-accent-cyan/20 blur-[60px] rounded-full"></div>
                            <div className="relative z-10 bg-surface border border-white/10 rounded-2xl p-8 shadow-2xl">
                                <Cpu className="w-16 h-16 text-accent-cyan mb-6" />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-lg p-4 text-center">
                                        <div className="text-xs text-gray-500 mb-1">Visual</div>
                                        <div className="font-bold text-white">98%</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4 text-center">
                                        <div className="text-xs text-gray-500 mb-1">Audio</div>
                                        <div className="font-bold text-white">95%</div>
                                    </div>
                                    <div className="col-span-2 bg-white/5 rounded-lg p-4 text-center">
                                        <div className="text-xs text-gray-500 mb-1">Semantic</div>
                                        <div className="font-bold text-white">Verified</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="text-accent-cyan font-mono text-sm mb-4">STEP 02</div>
                            <h2 className="text-3xl font-bold text-white mb-4">Multi-Vector Analysis</h2>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Our engine runs parallel forensic processes. For visual media, we employ ensemble Deep Learning models (like EfficientNet and Xception) trained on FaceForensics++ datasets to detect GAN artifacts. For text, we perform semantic analysis and cross-reference claims with Google's Fact Check Tools API.
                            </p>
                            <ul className="space-y-3 text-sm text-gray-500">
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-status-success" /> Deepware Scanner Integration</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-status-success" /> Frame-by-frame anomaly detection</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-status-success" /> Metadata & EXIF analysis</li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col md:flex-row gap-12 items-center animate-slide-up">
                        <div className="md:w-1/2 relative">
                            <div className="absolute inset-0 bg-purple-500/20 blur-[60px] rounded-full"></div>
                            <div className="relative z-10 bg-surface border border-white/10 rounded-2xl p-8 shadow-2xl flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-5xl font-bold text-white mb-2">94<span className="text-2xl text-gray-500">/100</span></div>
                                    <div className="text-sm text-status-success uppercase tracking-widest">High Trust Score</div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="text-purple-400 font-mono text-sm mb-4">STEP 03</div>
                            <h2 className="text-3xl font-bold text-white mb-4">Trust Scoring Algorithm</h2>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Raw data from our models is aggregated into a final Trust Score. This weighted algorithm prioritizes visual integrity, metadata consistency, and source reputation. A score above 80 indicates high confidence in authenticity, while lower scores flag potential manipulation.
                            </p>
                            <ul className="space-y-3 text-sm text-gray-500">
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-status-success" /> Weighted confidence metrics</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-status-success" /> Historical source reliability</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-status-success" /> Human-readable verdict</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* CTA */}
            <div className="container mx-auto px-6 pb-24 text-center">
                <div className="max-w-3xl mx-auto bg-surface border border-white/5 rounded-2xl p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to verify?</h2>
                    <p className="text-gray-400 mb-8">
                        Experience the power of our forensic engine with your own media.
                    </p>
                    <a href="/analyze" className="btn-primary inline-flex items-center gap-2 px-8 py-3 rounded-lg text-lg">
                        Start Verification
                    </a>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default HowItWorks;
