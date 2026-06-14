import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Database, Search, Upload, Play, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="min-h-screen bg-background text-gray-200">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                    <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-primary/20 rounded-full blur-[128px]"></div>
                    <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-accent-cyan/10 rounded-full blur-[128px]"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium mb-8 animate-fade-in backdrop-blur-sm">
                        <span className="flex w-2 h-2 rounded-full bg-status-success"></span>
                        v1.0 Public Beta Now Live
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 animate-fade-in">
                        Verify Media. <br />
                        <span className="text-gradient-primary">Detect Deepfakes.</span> <br />
                        Trust What You See.
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in delay-100">
                        The integrity of information is under attack. Use our enterprise-grade forensic tools to detect AI-generated content and verify news sources in real-time.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-200">
                        <Link to="/analyze" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center group text-lg px-8">
                            Analyze Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="#how-it-works" className="btn-secondary w-full sm:w-auto justify-center text-lg px-8">
                            How It Works
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-surface/30 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Comprehensive Media Forensics</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Our multi-layered analysis engine combines Deep Learning, Metadata extraction, and Cross-reference databases.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Shield className="text-primary" size={32} />}
                            title="AI Deepfake Detection"
                            desc="State-of-the-art neural networks analyze facial landmarks, blinking patterns, and compression artifacts to identify GAN-generated faces."
                        />
                        <FeatureCard
                            icon={<Search className="text-accent-cyan" size={32} />}
                            title="Semantic Fact-Checking"
                            desc="We cross-reference textual claims against trusted global fact-checking repositories (Google Fact Check, Snopes) to verify accuracy."
                        />
                        <FeatureCard
                            icon={<Database className="text-purple-400" size={32} />}
                            title="Metadata & Source Trace"
                            desc="Extract invisible EXIF data, encoder fingerprints, and source history to determine if a file has been tampered with."
                        />
                    </div>
                </div>
            </section>

            {/* How It Works Summary */}
            <section id="how-it-works" className="py-24 relative overflow-hidden bg-surface/20">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">Transparent Verification Process</h2>
                        <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
                            We believe in showing our work. Our platform determines authenticity through a rigorous 3-step forensic protocol involving data integrity checks, multi-model AI analysis, and weighted trust scoring.
                        </p>

                        <div className="grid grid-cols-3 gap-8 mb-12 opacity-60">
                            <div className="flex flex-col items-center">
                                <Upload className="w-8 h-8 text-primary mb-2" />
                                <span className="text-sm text-gray-300">Ingest</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Search className="w-8 h-8 text-accent-cyan mb-2" />
                                <span className="text-sm text-gray-300">Analyze</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <CheckCircle className="w-8 h-8 text-status-success mb-2" />
                                <span className="text-sm text-gray-300">Verify</span>
                            </div>
                        </div>

                        <Link to="/how-it-works" className="btn-secondary inline-flex items-center gap-2">
                            View Detailed Protocol <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="card p-8 card-hover group">
        <div className="mb-6 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
    </div>
);



export default Home;
