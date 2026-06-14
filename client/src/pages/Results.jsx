import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TrustMeter from '../components/TrustMeter';
import { Verified, AlertTriangle, XCircle, Share2, Download, ChevronRight, Binary, FileSearch, Fingerprint, Loader2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const report = location.state?.report;
    const reportRef = useRef(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    useEffect(() => {
        if (!report) {
            navigate('/analyze');
        }
    }, [report, navigate]);

    const handleDownloadPdf = async () => {
        if (!reportRef.current) return;
        setIsGeneratingPdf(true);
        try {
            const opt = {
                margin: 0.5,
                filename: `TruthCheck_Report_${report._id || 'Analysis'}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, logging: false },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            await html2pdf().set(opt).from(reportRef.current).save();
        } catch (error) {
            console.error("PDF generation failed:", error);
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    if (!report) return null;

    const generateSummary = (report) => {
        let summary = "";
        
        if (report.trustScore >= 80) {
            summary = "This media appears highly authentic. ";
        } else if (report.trustScore < 50) {
            summary = "This media exhibits significant signs of manipulation. ";
        } else {
            summary = "This media is unverified or inconclusive. ";
        }

        if (report.type === 'media') {
            const ris = report.details?.reverseImageSearch;
            
            if (ris && ris.matchesFound) {
                if (ris.matchType === 'historical') {
                    summary += `Reverse image search found this media was published as early as ${ris.oldestDate}, suggesting it is being used out-of-context today. `;
                } else if (ris.matchType === 'recent') {
                    summary += `Reverse image search found this media recently published (${ris.oldestDate}) on several domains. `;
                }
            } else if (ris && !ris.matchesFound) {
                summary += `Reverse image search yielded no exact prior matches, suggesting this is unique content. `;
            }

            if (report.deepfakeProbability > 50) {
                summary += `AI forensics indicate a high probability (${Math.round(report.deepfakeProbability)}%) of deepfake generation or GAN artifacts. `;
            } else {
                summary += `AI scanning detected no obvious signs of visual manipulation. `;
            }
            
            if (report.metadataScore < 50) {
                const software = report.details?.metadata?.software;
                if (software && software !== 'None detected') {
                    summary += `Furthermore, metadata analysis reveals the file was edited using ${software}, severely reducing its authenticity.`;
                } else {
                    summary += `Furthermore, metadata analysis reveals anomalies such as missing or stripped data, often indicating tampering.`;
                }
            } else if (report.metadataScore >= 80) {
                summary += `The metadata aligns with an untouched, original file with no detected manipulation software.`;
            } else {
                summary += `The metadata shows minor anomalies but no definitive proof of malicious tampering.`;
            }
        } else {
            if (report.factCheckScore > 0) {
                 summary += `Fact-check databases return a score of ${report.factCheckScore}/100 based on known sources. `;
            } else {
                 summary += `No direct matches were found in trusted fact-check databases. `;
            }
            if (report.details?.isAiGenerated) {
                 summary += `However, text analysis models flag this content as likely AI-generated.`;
            }
        }

        return summary;
    };

    // Logic for status
    const isTrusted = report.trustScore >= 80;
    const isSuspicious = report.trustScore < 50;

    const statusConfig = {
        trusted: { color: 'text-status-success', bg: 'bg-status-success/10', border: 'border-status-success/20', icon: Verified, label: 'Authentic Content' },
        suspicious: { color: 'text-status-error', bg: 'bg-status-error/10', border: 'border-status-error/20', icon: XCircle, label: 'Likely Manipulated' },
        caution: { color: 'text-status-warning', bg: 'bg-status-warning/10', border: 'border-status-warning/20', icon: AlertTriangle, label: 'Unverified / Inconclusive' }
    };

    const status = isTrusted ? statusConfig.trusted : isSuspicious ? statusConfig.suspicious : statusConfig.caution;
    const StatusIcon = status.icon;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-grow container mx-auto px-6 py-28">
                <div className="max-w-6xl mx-auto">

                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link to="/" className="hover:text-white">Home</Link>
                        <ChevronRight size={14} />
                        <Link to="/analyze" className="hover:text-white">Analyze</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">Results</span>
                    </div>


                    <div className="grid lg:grid-cols-3 gap-8" ref={reportRef}>
                        {/* LEFT COL: Summary Card */}
                        <div className="lg:col-span-1">
                            <div className="card p-8 flex flex-col items-center text-center sticky top-24">
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 ${status.bg} ${status.border} ${status.color}`}>
                                    <StatusIcon size={18} />
                                    <span className="text-sm font-bold uppercase tracking-wide">{status.label}</span>
                                </div>

                                <TrustMeter score={report.trustScore} />

                                <div className="mt-8 pt-8 border-t border-white/5 w-full">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-gray-400 text-sm">Analysis Confidence</span>
                                        <span className="text-white font-medium">98.4%</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-8">
                                        <span className="text-gray-400 text-sm">Time Elapsed</span>
                                        <span className="text-white font-medium">1.2s</span>
                                    </div>

                                    <button 
                                        onClick={handleDownloadPdf}
                                        disabled={isGeneratingPdf}
                                        className="btn-secondary w-full flex items-center justify-center gap-2 mb-3 disabled:opacity-50 disabled:cursor-not-allowed">
                                        {isGeneratingPdf ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />} 
                                        {isGeneratingPdf ? 'Generating...' : 'Download PDF'}
                                    </button>
                                    <button className="text-gray-500 hover:text-white text-sm flex items-center justify-center gap-2 w-full transition-colors">
                                        <Share2 size={16} /> Share Result
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COL: Detailed Modules */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Executive Summary Module */}
                            <div className="card overflow-hidden border-l-4" style={{borderLeftColor: status.color.includes('success') ? '#22c55e' : status.color.includes('error') ? '#ef4444' : '#eab308'}}>
                                <div className="bg-surface-highlight p-4 border-b border-white/5 flex items-center justify-between">
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <FileSearch size={18} className={status.color} />
                                        Forensic Overview
                                    </h3>
                                </div>
                                <div className="p-6 bg-black/20">
                                    <p className="text-gray-300 leading-relaxed text-[15px]">
                                        {generateSummary(report)}
                                    </p>
                                </div>
                            </div>

                            {/* Input Details */}
                            <div className="card p-6">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Input Source</h3>
                                <div className="bg-black/30 p-4 rounded-lg font-mono text-sm text-gray-300 break-all border border-white/5">
                                    {report.input}
                                </div>
                            </div>

                            {/* Deepfake Analysis Module */}
                            <div className="card overflow-hidden">
                                <div className="bg-surface-highlight p-4 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Binary size={20} /></div>
                                        <h3 className="font-bold text-white">AI Content Analysis</h3>
                                    </div>
                                    <span className={`text-sm font-bold ${report.deepfakeProbability > 50 ? 'text-status-error' : 'text-status-success'}`}>
                                        {Math.round(report.deepfakeProbability)}% Probability
                                    </span>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-400 text-sm mb-4">
                                        Analyzed utilizing the Deepware Scanner v1 model. Scanned for GAN-generated artifacts, skin texture inconsistencies, and warping.
                                    </p>
                                    {/* Visual Bar */}
                                    <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden relative">
                                        <div
                                            className={`h-full absolute left-0 top-0 transition-all duration-1000 ${report.deepfakeProbability > 50 ? 'bg-status-error' : 'bg-status-success'}`}
                                            style={{ width: `${report.deepfakeProbability}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                                        <span>Likely Human</span>
                                        <span>Likely AI</span>
                                    </div>
                                </div>
                            </div>

                            {/* Reverse Image Search Module */}
                            {report.details?.reverseImageSearch && (
                                <div className="card overflow-hidden">
                                    <div className="bg-surface-highlight p-4 border-b border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400"><FileSearch size={20} /></div>
                                            <h3 className="font-bold text-white">Reverse Image Search</h3>
                                        </div>
                                        <span className={`text-sm font-bold ${
                                            report.details.reverseImageSearch.matchType === 'historical' ? 'text-status-error' :
                                            report.details.reverseImageSearch.matchType === 'unique' ? 'text-status-success' : 'text-status-warning'
                                        }`}>
                                            {report.details.reverseImageSearch.matchType === 'historical' ? 'Historical Match' :
                                             report.details.reverseImageSearch.matchType === 'unique' ? 'No Prior Matches' : 'Recent Match'}
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        {report.details.reverseImageSearch.matchesFound ? (
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center bg-black/20 p-3 rounded border border-white/5 mb-4">
                                                    <span className="text-gray-400 text-sm">Oldest Publication Date Found:</span>
                                                    <span className="font-bold text-white">{report.details.reverseImageSearch.oldestDate}</span>
                                                </div>
                                                <h4 className="text-xs text-gray-500 uppercase font-bold mb-2">Sources Found On</h4>
                                                {report.details.reverseImageSearch.sources.map((src, idx) => (
                                                    <div key={idx} className="flex gap-4 items-center p-2 hover:bg-white/5 rounded-lg transition-colors border border-transparent">
                                                        <div className="min-w-[20px] h-5 w-5 bg-white/10 rounded-full flex items-center justify-center text-xs font-bold text-gray-400">
                                                            {idx + 1}
                                                        </div>
                                                        <a href={src} target="_blank" rel="noopener noreferrer" className="text-primary-light hover:text-white font-medium text-sm truncate">
                                                            {src}
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-4 text-gray-500 text-sm">
                                                No previous publications of this image were found across our indexed web databases.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Fact Check Module */}
                            <div className="card overflow-hidden">
                                <div className="bg-surface-highlight p-4 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><FileSearch size={20} /></div>
                                        <h3 className="font-bold text-white">Fact Verification</h3>
                                    </div>
                                    <span className="text-sm font-bold text-white">
                                        {report.factCheckScore}/100 Integrity
                                    </span>
                                </div>
                                <div className="p-6">
                                    {report.details?.references?.length > 0 ? (
                                        <div className="space-y-4">
                                            {report.details.references.map((ref, idx) => (
                                                <div key={idx} className="flex gap-4 items-start p-3 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/5">
                                                    <div className="mt-1 min-w-[20px] h-5 w-5 bg-white/10 rounded-full flex items-center justify-center text-xs font-bold text-gray-400">
                                                        {idx + 1}
                                                    </div>
                                                    <div>
                                                        <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-primary-light hover:text-white font-medium block mb-1">
                                                            {ref.title || "Untitled Reference"}
                                                        </a>
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <span>{ref.publisher}</span>
                                                            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                                            <span>Verified Source</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 text-gray-500">
                                            <p>No direct match found in fact-check databases.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Metadata Module */}
                            <div className="card overflow-hidden">
                                <div className="bg-surface-highlight p-4 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Fingerprint size={20} /></div>
                                        <h3 className="font-bold text-white">Metadata Forensics</h3>
                                    </div>
                                    <span className={`text-sm font-bold ${
                                        report.metadataScore < 50 ? 'text-status-error' : 
                                        report.metadataScore < 80 ? 'text-status-warning' : 
                                        'text-status-success'
                                    }`}>
                                        {report.metadataScore < 50 ? 'High Risk' : report.metadataScore < 80 ? 'Medium Risk' : 'Low Risk'}
                                    </span>
                                </div>
                                <div className="p-6">
                                    {report.details?.metadata ? (
                                        <div className="grid grid-cols-2 gap-4">
                                            {Object.entries(report.details.metadata).map(([key, value]) => {
                                                if (key === 'notes') return null; // Skip notes in grid
                                                return (
                                                    <div key={key} className="p-3 bg-black/20 rounded border border-white/5">
                                                        <span className="text-xs text-gray-500 block mb-1 capitalize">
                                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                                        </span>
                                                        <span className="text-sm text-gray-300">
                                                            {value?.toString() || 'Unknown'}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                            {report.details.metadata.notes && (
                                                <div className="col-span-2 p-3 bg-black/20 rounded border border-white/5">
                                                    <span className="text-xs text-gray-500 block mb-1">Notes</span>
                                                    <span className="text-sm text-gray-300">
                                                        {report.details.metadata.notes}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 text-gray-500">
                                            <p>No metadata extracted or available.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Results;
