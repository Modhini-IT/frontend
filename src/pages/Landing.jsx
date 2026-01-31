import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ScanFace, Zap, ArrowRight, Info } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative override-landing bg-forest">
            {/* Decorative background overlay handled in CSS or here */}
            <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

            <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-6 animate-fade-in-up">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-4">
                    <Leaf className="w-4 h-4 text-emerald-400" color="var(--accent-primary)" />
                    <span className="text-sm font-medium text-emerald-100">Carbon-Neutral Operations</span>
                </div>

                {/* Title */}
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-2">
                    Eco<span style={{ color: 'var(--accent-primary)' }}>Track</span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-gray-200 font-light mb-2">
                    Smart Face Recognition & Movement Tracking System
                </p>
                <p className="text-lg text-emerald-400 font-medium mb-8" style={{ color: 'var(--accent-primary)' }}>
                    Powered by AI. Driven by Sustainability.
                </p>

                {/* Feature Badges */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <FeatureBadge icon={<ScanFace size={18} />} text="Face Recognition" />
                    <FeatureBadge icon={<Zap size={18} />} text="Low-Power AI" />
                    <FeatureBadge icon={<Leaf size={18} />} text="Eco-Friendly" />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button
                        onClick={() => navigate('/login')}
                        className="btn btn-primary flex items-center justify-center gap-2 group px-8 py-4 text-lg"
                    >
                        Get Started
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </button>

                    <button
                        onClick={() => navigate('/team')}
                        className="btn btn-outline flex items-center justify-center gap-2 px-8 py-4 text-lg"
                    >
                        Learn More
                        <Info size={20} />
                    </button>
                </div>

            </div>
        </div>
    );
};

const FeatureBadge = ({ icon, text }) => (
    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/30 border border-white/5 backdrop-blur-sm">
        <span style={{ color: 'var(--accent-primary)' }}>{icon}</span>
        <span className="text-sm">{text}</span>
    </div>
);

export default Landing;
