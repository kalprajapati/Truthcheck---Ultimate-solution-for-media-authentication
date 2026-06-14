import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShieldCheck, Server, Lock, Cpu, Database, Eye } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-background text-gray-200">
            <Navbar />

            <div className="container mx-auto px-6 py-32">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-20 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Restoring Trust in the Digital Age</h1>
                        <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                            TruthCheck is an advanced AI forensics platform dedicated to safeguarding the information ecosystem against the rising tide of synthetic media and misinformation.
                        </p>
                    </div>

                    {/* Our Story */}
                    <div className="mb-24 animate-slide-up delay-100">
                        <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-primary pl-6">Our Story</h2>
                        <div className="prose prose-lg prose-invert text-gray-400 max-w-none">
                            <p className="mb-6">
                                The concept for TruthCheck was born out of a critical observation: as generative AI becomes accessible to everyone, the line between reality and fabrication is blurring at an alarming rate. What started as a research project into GAN (Generative Adversarial Network) artifacts quickly evolved into a mission-critical tool for digital verification.
                            </p>
                            <p>
                                We realized that traditional fact-checking methods were too slow to keep up with the viral spread of deepfakes. We needed a solution that could move at the speed of the internet—combining computer vision, natural language processing, and cryptographic verification into a single, seamless experience. TruthCheck is the realization of that vision: a shield for the truth in a post-reality world.
                            </p>
                        </div>
                    </div>

                    {/* Mission Grid */}
                    <div className="grid md:grid-cols-2 gap-12 mb-24 animate-slide-up delay-200">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Eye className="text-red-400" />
                                The Challenge
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                The proliferation of hyper-realistic deepfakes and AI-generated text has made it trivial to manufacture consent, damage reputations, and spread disinformation. Misinformation spreads 6x faster than truth, destabilizing economies and democracies. The sheer volume of content requires automated, scalable forensic tools.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <ShieldCheck className="text-status-success" />
                                Our Solution
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                We provide an enterprise-grade API and interface that aggregates multiple detection vectors—visual artifacts to detect GAN traces, semantic inconsistencies for claim verification, and source metadata analysis—into a single, reliable Trust Score. We empower users to verify before they trust.
                            </p>
                        </div>
                    </div>

                    {/* Stack / Technology */}
                    <div className="mb-24 animate-slide-up delay-300">
                        <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Arsenal</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            <TechCard
                                icon={<Cpu className="text-primary" />}
                                title="Deep Learning"
                                desc="Deepware Scanner & Custom TensorFlow models for artifact detection."
                            />
                            <TechCard
                                icon={<Database className="text-accent-cyan" />}
                                title="Fact Verification"
                                desc="Google Fact Check Tools API for claim review."
                            />
                            <TechCard
                                icon={<Server className="text-purple-400" />}
                                title="Scalable Backend"
                                desc="Node.js & Express on high-availability clusters."
                            />
                        </div>
                    </div>

                    {/* Security */}
                    <div className="card p-8 bg-surface-highlight/30 border-l-4 border-primary animate-slide-up delay-400">
                        <div className="flex items-start gap-4">
                            <Lock className="text-gray-300 w-8 h-8 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Privacy & Security</h3>
                                <p className="text-gray-400">
                                    We adhere to strict data privacy standards. Media uploaded for analysis is processed in volatile memory for forensic evaluation and is not persisted in our training datasets without explicit user consent.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

const TechCard = ({ icon, title, desc }) => (
    <div className="card p-6 hover:bg-white/5 transition-colors">
        <div className="mb-4 w-10 h-10 bg-black/50 rounded-lg flex items-center justify-center border border-white/5">
            {icon}
        </div>
        <h3 className="font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
    </div>
);

export default About;
