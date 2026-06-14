import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FileUpload from '../components/FileUpload';
import Loader from '../components/Loader';
import { analyzeMedia, analyzeText } from '../services/api';
import { FileText, Image, Video, Globe, Link as LinkIcon, AlertCircle } from 'lucide-react';

const Analyze = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('media');
    const [file, setFile] = useState(null);
    const [textInput, setTextInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
                                                
    const handleSubmit = async () => {
        setError('');
        setLoading(true);

        try {
            let result;
            if (activeTab === 'media') {
                if (!file) {
                    setError('Please upload a file to proceed.');
                    setLoading(false);
                    return;
                }
                const formData = new FormData();
                formData.append('file', file);
                result = await analyzeMedia(formData);
            } else {
                if (!textInput.trim()) {
                    setError('Please enter text or a URL to verify.');
                    setLoading(false);
                    return;
                }
                result = await analyzeText(textInput);
            }

            if (result.success) {
                navigate('/results', { state: { report: result.report } });
            }
        } catch (err) {
            console.error("Analysis Error:", err);
            const errorMsg = err.msg || err.message || JSON.stringify(err) || 'Analysis failed. Please check your input and try again.';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-grow container mx-auto px-6 py-32 flex flex-col items-center">
                <div className="text-center mb-10 animate-fade-in">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">Analyze Authenticity</h1>
                    <p className="text-gray-400 max-w-xl mx-auto">Upload content or paste a link. Our AI will scan for manipulation, Deepfakes, and factual accuracy.</p>
                </div>

                <div className="w-full max-w-2xl animate-fade-in delay-100">
                    <div className="card p-1.5 mb-8 flex bg-surface-highlight/50 backdrop-blur-md rounded-xl">
                        <button
                            onClick={() => setActiveTab('media')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-200
                                ${activeTab === 'media' ? 'bg-surface shadow-md text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <div className="flex gap-1">
                                <Image size={18} />
                                <Video size={18} />
                            </div>
                            <span>Media File</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('text')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-200
                                ${activeTab === 'text' ? 'bg-surface shadow-md text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <div className="flex gap-1">
                                <FileText size={18} />
                                <Globe size={18} />
                            </div>
                            <span>Text / URL</span>
                        </button>
                    </div>

                    <div className="card p-6 md:p-8 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
                        {/* Status Overlay */}
                        {loading && (
                            <div className="absolute inset-0 bg-surface/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                                <Loader text={activeTab === 'media' ? "Scanning frames and metadata..." : "Querying fact-check databases..."} />
                            </div>
                        )}

                        <div className="space-y-6">
                            {activeTab === 'media' ? (
                                <div className="animate-fade-in">
                                    <h3 className="text-lg font-medium text-white mb-4">Upload Image or Video</h3>
                                    <FileUpload onFileSelect={setFile} />
                                </div>
                            ) : (
                                <div className="animate-fade-in">
                                    <h3 className="text-lg font-medium text-white mb-4">Verify News or Claims</h3>
                                    <div className="relative">
                                        <textarea
                                            className="input-field min-h-[200px] resize-none font-mono text-sm leading-relaxed"
                                            placeholder="Paste article text or enter a URL here..."
                                            value={textInput}
                                            onChange={(e) => setTextInput(e.target.value)}
                                        ></textarea>
                                        <div className="absolute bottom-4 right-4 text-gray-500 text-xs flex items-center gap-1">
                                            <LinkIcon size={12} /> Supports raw text & URLs
                                        </div>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="p-4 bg-status-error/10 border border-status-error/20 text-status-error rounded-lg text-sm flex items-center gap-3 animate-slide-up">
                                    <AlertCircle size={20} />
                                    {error}
                                </div>
                            )}

                            <div className="pt-4 border-t border-white/5">
                                <button
                                    onClick={handleSubmit}
                                    className="btn-primary w-full py-4 text-lg shadow-xl shadow-primary/20"
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : 'Start Analysis'}
                                </button>
                                <p className="text-center text-xs text-gray-500 mt-4">
                                    By analyzing, you agree to our Terms of Service. Data is processed securely.
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

export default Analyze;
