import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Leaf } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login logic - just redirect to dashboard
        if (email && password) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative bg-forest">
            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-8 left-8 nav-back text-lg"
            >
                <ArrowLeft size={24} />
                Back
            </button>

            <div className="glass-panel w-full max-w-md p-8 md:p-12 animate-fade-in shadow-2xl">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Leaf className="text-emerald-400" size={32} color="var(--accent-primary)" />
                        <span className="text-2xl font-bold">Eco<span style={{ color: 'var(--accent-primary)' }}>Track</span></span>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                    <p className="text-gray-400">Sign in with your college email</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">College Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="email"
                                placeholder="yourname@svce.ac.in"
                                className="input-field pl-10 mb-0"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="input-field pl-10 mb-0"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-1">
                        <button type="button" className="text-sm text-emerald-400 hover:text-emerald-300" style={{ color: 'var(--accent-primary)' }}>
                            Forgot password?
                        </button>
                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-4 py-3 text-lg">
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account? <span className="text-emerald-400 cursor-pointer hover:underline" style={{ color: 'var(--accent-primary)' }}>Contact Admin</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
