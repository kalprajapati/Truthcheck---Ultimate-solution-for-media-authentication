import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { AuthContext } from '../context/auth';
import { getHistory } from '../services/api';
import { FileText, Image as ImageIcon, Video, ShieldCheck, AlertTriangle, XCircle, ChevronRight, Clock, Search } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchHistory = async () => {
            try {
                const data = await getHistory();
                setHistory(data);
            } catch (err) {
                console.error("Failed to fetch history:", err);
                setError('Failed to load your verification history.');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user, navigate]);

    const getStatusConfig = (score) => {
        if (score >= 80) return { color: 'text-status-success', bg: 'bg-status-success/10', border: 'border-status-success/20', icon: ShieldCheck, label: 'Authentic' };
        if (score < 50) return { color: 'text-status-error', bg: 'bg-status-error/10', border: 'border-status-error/20', icon: XCircle, label: 'Suspicious' };
        return { color: 'text-status-warning', bg: 'bg-status-warning/10', border: 'border-status-warning/20', icon: AlertTriangle, label: 'Unverified' };
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { 
            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
        }).format(date);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-grow container mx-auto px-6 py-28">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 animate-fade-in">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">My Dashboard</h1>
                            <p className="text-gray-400">View and manage your past verifications.</p>
                        </div>
                        <Link to="/analyze" className="btn-primary py-2.5 px-6 whitespace-nowrap self-start md:self-auto flex items-center gap-2">
                            <Search size={18} /> New Analysis
                        </Link>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-slide-up">
                        <div className="card p-6 border-t-4 border-t-primary">
                            <h3 className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Total Scans</h3>
                            <div className="text-3xl font-bold text-white">{history.length}</div>
                        </div>
                        <div className="card p-6 border-t-4 border-t-status-success">
                            <h3 className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Authentic Media</h3>
                            <div className="text-3xl font-bold text-white">
                                {history.filter(h => h.trustScore >= 80).length}
                            </div>
                        </div>
                        <div className="card p-6 border-t-4 border-t-status-error">
                            <h3 className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Suspicious Found</h3>
                            <div className="text-3xl font-bold text-white">
                                {history.filter(h => h.trustScore < 50).length}
                            </div>
                        </div>
                    </div>

                    {/* History Grid */}
                    <div className="animate-fade-in delay-200">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Clock size={20} className="text-primary-light" /> Recent Activity
                        </h2>

                        {loading ? (
                            <div className="py-20 flex justify-center">
                                <Loader text="Loading history..." />
                            </div>
                        ) : error ? (
                            <div className="p-6 bg-status-error/10 border border-status-error/20 text-status-error rounded-xl text-center">
                                {error}
                            </div>
                        ) : history.length === 0 ? (
                            <div className="card p-12 flex flex-col items-center justify-center text-center border-dashed border-2 border-white/10">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                    <Search size={24} className="text-gray-500" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">No verifications yet</h3>
                                <p className="text-gray-400 max-w-sm mb-6">You haven't analyzed any media or text yet. Start your first verification to see it here.</p>
                                <Link to="/analyze" className="btn-secondary py-2 px-6">Go to Analyze</Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {history.map((report) => {
                                    const status = getStatusConfig(report.trustScore);
                                    const StatusIcon = status.icon;
                                    
                                    return (
                                        <div 
                                            key={report._id} 
                                            onClick={() => navigate('/results', { state: { report } })}
                                            className="card p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 cursor-pointer transition-all duration-300 group flex flex-col h-full"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`p-2 rounded-lg ${report.type === 'media' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                                                    {report.type === 'media' ? <ImageIcon size={20} /> : <FileText size={20} />}
                                                </div>
                                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${status.bg} ${status.color} ${status.border}`}>
                                                    <StatusIcon size={12} />
                                                    {status.label}
                                                </div>
                                            </div>
                                            
                                            <div className="flex-grow mb-4">
                                                <h3 className="text-white font-medium line-clamp-2 text-sm leading-snug">
                                                    {report.input}
                                                </h3>
                                            </div>
                                            
                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                                <span className="text-xs text-gray-500">
                                                    {formatDate(report.createdAt)}
                                                </span>
                                                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-gray-400">
                                                    <ChevronRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Dashboard;
