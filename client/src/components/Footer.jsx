import React from 'react';
import { ShieldCheck, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-surface/50 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <ShieldCheck className="w-8 h-8 text-primary" />
                            <span className="text-xl font-bold text-white">TruthCheck</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Empowering truth in the digital age. Advanced AI forensics to detect deepfakes and verify information integrity.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Github size={20} /></a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/analyze" className="hover:text-primary transition-colors">Video Detection</Link></li>
                            <li><Link to="/analyze" className="hover:text-primary transition-colors">Image Forensics</Link></li>
                            <li><Link to="/analyze" className="hover:text-primary transition-colors">News Verification</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors">API Access</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/about" className="hover:text-primary transition-colors">Documentation</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors">Methodology</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Stay Updated</h4>
                        <p className="text-sm text-gray-400 mb-4">Subscribe for the latest in AI safety tech.</p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Enter email" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-primary/50" />
                            <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                    <p>&copy; {new Date().getFullYear()} TruthCheck Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        <span>Made with React & Node.js</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-status-success"></span> Systems Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
