import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, X, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Analyze', path: '/analyze' },
        { name: 'How It Works', path: '/how-it-works' },
        { name: 'About', path: '/about' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <ShieldCheck className="w-6 h-6 text-primary-light" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">TruthCheck</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`nav-link ${isActive(link.path) ? 'text-white' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-gray-300 hover:text-white text-sm border-r border-white/10 pr-4 flex items-center gap-2 transition-colors">
                                Welcome, <span className="font-medium">{user.name}</span>
                            </Link>
                            <Link to="/analyze" className="btn-primary py-2 px-5 text-sm shadow-lg shadow-primary/20">
                                Analyze
                            </Link>
                            <button onClick={logout} className="text-gray-400 hover:text-status-error ml-2 transition-colors" title="Logout">
                                <LogOut size={18} />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                                Log in
                            </Link>
                            <Link to="/signup" className="btn-primary py-2 px-5 text-sm shadow-lg shadow-primary/20">
                                Sign up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-surface border-b border-white/5 p-6 flex flex-col gap-4 shadow-2xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-gray-300 hover:text-white font-medium py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/analyze"
                        className="text-gray-300 hover:text-white font-medium py-2"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Analyze Content
                    </Link>
                    <div className="border-t border-white/10 pt-4 mt-2">
                        {user ? (
                            <div className="flex flex-col gap-4">
                                <Link to="/dashboard" className="text-white font-medium" onClick={() => setMobileMenuOpen(false)}>Dashboard ({user.name})</Link>
                                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-status-error font-medium text-left">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <Link to="/login" className="text-gray-300 hover:text-white font-medium" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                                <Link to="/signup" className="btn-primary text-center" onClick={() => setMobileMenuOpen(false)}>Sign up</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
