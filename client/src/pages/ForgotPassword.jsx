import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Lock, KeyRound, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: New Password, 4: Success
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSendCode = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/auth/forgotpassword', { email });
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to send code');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/auth/verifycode', { email, code });
            setStep(3);
        } catch (err) {
            setError(err.response?.data?.msg || 'Invalid or expired code');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/auth/resetpassword', { email, code, newPassword });
            setStep(4);
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center px-4 pt-20 pb-12">
                <div className="card max-w-md w-full p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    
                    <div className="text-center mb-8 relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {step === 1 && "Reset Password"}
                            {step === 2 && "Enter Code"}
                            {step === 3 && "New Password"}
                            {step === 4 && "Success!"}
                        </h2>
                        <p className="text-gray-400 text-sm">
                            {step === 1 && "Enter your email to receive a 4-digit reset code."}
                            {step === 2 && `We sent a code to ${email}`}
                            {step === 3 && "Please enter your new secure password."}
                            {step === 4 && "Your password has been changed successfully."}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-status-error/10 border border-status-error/20 text-status-error text-sm p-3 rounded-lg mb-6 text-center">
                            {error}
                        </div>
                    )}

                    {/* STEP 1: Enter Email */}
                    {step === 1 && (
                        <form onSubmit={handleSendCode} className="space-y-5 relative z-10">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={18} className="text-gray-500" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                                {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                                {loading ? 'Sending...' : 'Send Reset Code'}
                            </button>
                        </form>
                    )}

                    {/* STEP 2: Enter Code */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyCode} className="space-y-5 relative z-10">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">4-Digit Code</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <KeyRound size={18} className="text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        maxLength="4"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors tracking-widest text-center text-lg font-bold"
                                        placeholder="0000"
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                                {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                                {loading ? 'Verifying...' : 'Verify Code'}
                            </button>
                        </form>
                    )}

                    {/* STEP 3: New Password */}
                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-5 relative z-10">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-gray-500" />
                                    </div>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                                        placeholder="••••••••"
                                        minLength="6"
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                                {loading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                                {loading ? 'Resetting...' : 'Change Password'}
                            </button>
                        </form>
                    )}

                    {/* STEP 4: Success */}
                    {step === 4 && (
                        <div className="text-center space-y-6 relative z-10">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 bg-status-success/10 rounded-full flex items-center justify-center text-status-success">
                                    <CheckCircle2 size={32} />
                                </div>
                            </div>
                            <Link to="/login" className="btn-primary w-full inline-block">
                                Return to Login
                            </Link>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="mt-6 text-center text-sm text-gray-500 relative z-10">
                            Remember your password? <Link to="/login" className="text-white hover:text-primary transition-colors font-medium">Sign in</Link>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ForgotPassword;
