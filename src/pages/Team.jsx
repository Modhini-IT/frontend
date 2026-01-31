import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail } from 'lucide-react';

const Team = () => {
    const navigate = useNavigate();
    const [visibleCards, setVisibleCards] = useState([]);
    const observerRef = useRef(null);

    const teamMembers = [
        { name: 'Pranav A', role: 'Team Leader', email: '2025it1070@svce.ac.in', phone: '9345149135', initials: 'PA' },
        { name: 'Modhini V', role: 'Member', email: '2025it1089@svce.ac.in', phone: '9840859756', initials: 'MV' },
        { name: 'Rishe S', role: 'Member', email: '2025it1030@svce.ac.in', phone: '9500405647', initials: 'RS' },
        { name: 'Shivvani T', role: 'Member', email: '2025it0186@svce.ac.in', phone: '7305084346', initials: 'ST' },
        { name: 'Suresh Krishna G', role: 'Member', email: '2025it0130@svce.ac.in', phone: '7824020581', initials: 'SKG' },
        { name: 'Srivatsan S', role: 'Member', email: '2025it1058@svce.ac.in', phone: '7358116408', initials: 'SS' }
    ];

    useEffect(() => {
        const options = {
            root: null,
            threshold: 0.15, // Triggers earlier for a smoother flow
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const index = parseInt(entry.target.dataset.index);
                if (entry.isIntersecting) {
                    setVisibleCards(prev => [...new Set([...prev, index])]);
                }
            });
        }, options);

        const cards = document.querySelectorAll('.team-card-trigger');
        cards.forEach(card => observerRef.current.observe(card));

        return () => observerRef.current?.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30">
            {/* Custom CSS Injection */}
            <style>{`
                .glass-card {
                    transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
                    will-change: transform, opacity;
                }
                .initial-blob {
                    transition: transform 1s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
            `}</style>

            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="fixed top-8 left-8 z-50 flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-xl hover:bg-white/10 transition-all active:scale-95"
            >
                <ArrowLeft size={20} />
                <span className="font-medium">Back</span>
            </button>

            <div className="max-w-4xl mx-auto px-6 pt-32 pb-40">
                {/* Header Section */}
                <header className="text-center mb-40">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Team</span> Ethu Nagarjuna Vaa
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                        BTech IT • 1st Year • Sri Venkateswara College of Engineering
                    </p>
                    <div className="mt-10 animate-bounce text-gray-600">
                        <p className="text-xs uppercase tracking-[0.2em]">Scroll to reveal</p>
                    </div>
                </header>

                {/* Team List */}
                <div className="space-y-32">
                    {teamMembers.map((member, index) => {
                        const isVisible = visibleCards.includes(index);
                        return (
                            <div
                                key={index}
                                data-index={index}
                                className="team-card-trigger min-h-[40vh] flex items-center justify-center"
                            >
                                <div
                                    className={`glass-card relative w-full max-w-2xl p-10 md:p-12 overflow-hidden ${
                                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
                                    }`}
                                    style={{
                                        background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                        backdropFilter: 'blur(24px)',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        borderRadius: '40px',
                                        boxShadow: isVisible ? '0 40px 80px -20px rgba(0,0,0,0.5), 0 0 40px -10px rgba(16,185,129,0.1)' : 'none'
                                    }}
                                >
                                    {/* Animated Initial Bubble */}
                                    <div className="flex flex-col items-center mb-10">
                                        <div 
                                            className={`initial-blob w-24 h-24 rounded-3xl bg-emerald-400 flex items-center justify-center text-black font-black text-3xl mb-6 shadow-[0_0_40px_-5px_rgba(52,211,153,0.6)] ${
                                                isVisible ? 'scale-100 rotate-0' : 'scale-50 rotate-45'
                                            }`}
                                        >
                                            {member.initials}
                                        </div>
                                        <h3 className="text-4xl font-bold tracking-tight mb-2">{member.name}</h3>
                                        <span className={`px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase ${
                                            member.role === 'Team Leader' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-white/5 text-gray-400'
                                        }`}>
                                            {member.role}
                                        </span>
                                    </div>

                                    {/* Contact Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/[0.05] hover:bg-white/[0.06] transition-colors group">
                                            <div className="p-2 bg-emerald-400/10 rounded-lg group-hover:scale-110 transition-transform">
                                                <Mail size={18} className="text-emerald-400" />
                                            </div>
                                            <span className="text-sm font-mono text-gray-300 truncate">{member.email}</span>
                                        </div>
                                        <div className="flex items-center gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/[0.05] hover:bg-white/[0.06] transition-colors group">
                                            <div className="p-2 bg-emerald-400/10 rounded-lg group-hover:scale-110 transition-transform">
                                                <Phone size={18} className="text-emerald-400" />
                                            </div>
                                            <span className="text-sm font-mono text-gray-300">{member.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Team;
