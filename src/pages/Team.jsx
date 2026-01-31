import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, ShieldCheck, Copy, Check } from 'lucide-react';

const Team = () => {
    const navigate = useNavigate();
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0, activeIndex: null });

    const teamMembers = [
        { name: 'Pranav A', role: 'Team Leader', email: '2025it1070@svce.ac.in', phone: '9345149135', initials: 'PA' },
        { name: 'Modhini V', role: 'Member', email: '2025it1089@svce.ac.in', phone: '9840859756', initials: 'MV' },
        { name: 'Rishe S', role: 'Member', email: '2025it1030@svce.ac.in', phone: '9500405647', initials: 'RS' },
        { name: 'Shivvani T', role: 'Member', email: '2025it0186@svce.ac.in', phone: '7305084346', initials: 'ST' },
        { name: 'Suresh Krishna G', role: 'Member', email: '2025it0130@svce.ac.in', phone: '7824020581', initials: 'SKG' },
        { name: 'Srivatsan S', role: 'Member', email: '2025it1058@svce.ac.in', phone: '7358116408', initials: 'SS' }
    ];

    const handleMouseMove = (e, index) => {
        const card = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - card.left) / card.width - 0.5;
        const y = (e.clientY - card.top) / card.height - 0.5;
        setTilt({ x: x * 10, y: y * -10, activeIndex: index });
    };

    const resetTilt = () => setTilt({ x: 0, y: 0, activeIndex: null });

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="min-h-screen bg-[#0d1117] text-white font-sans selection:bg-emerald-500/30 pb-96">
            <style>{`
                .stack-card { transition: transform 0.15s ease-out, box-shadow 0.3s ease; }
                .glass-border { background: linear-gradient(145deg, rgba(52,211,153,0.4), rgba(255,255,255,0.05) 50%, rgba(14,165,233,0.3)); }
            `}</style>

            <nav className="fixed top-0 w-full z-[100] px-8 py-5 flex justify-between items-center bg-[#0d1117]/90 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                        <ShieldCheck size={20} className="text-emerald-400" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">EcoTrack <span className="text-emerald-400">Team</span></span>
                </div>
                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all">
                    <ArrowLeft size={16} /> Dashboard
                </button>
            </nav>

            <div className="max-w-3xl mx-auto px-6 pt-40 relative z-10">
                <header className="text-center mb-32">
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter italic text-white">MEET THE <span className="text-emerald-400 not-italic">INNOVATORS</span></h1>
                    <p className="text-gray-500 text-xs font-bold tracking-[0.5em] uppercase">IT DEPT • SVCE</p>
                </header>

                <div className="relative">
                    {teamMembers.map((member, index) => (
                        <div 
                            key={index} 
                            className="sticky w-full mb-32" 
                            style={{ top: `${100 + (index * 45)}px`, zIndex: index + 1 }}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseLeave={resetTilt}
                        >
                            <div 
                                className="stack-card glass-border p-[1.5px] rounded-[32px] shadow-2xl"
                                style={{
                                    transform: tilt.activeIndex === index 
                                        ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` 
                                        : 'none'
                                }}
                            >
                                <div className="bg-[#090b11] rounded-[31px] p-8 md:p-10">
                                    <div className="flex flex-col md:flex-row justify-between gap-10">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#0d1117] border border-white/10 flex items-center justify-center text-emerald-400 font-black text-2xl">
                                                {member.initials}
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">{member.name}</h3>
                                                <span className={`text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded ${member.role === 'Team Leader' ? 'bg-emerald-400/20 text-emerald-400' : 'bg-white/5 text-gray-500'}`}>
                                                    {member.role}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 min-w-[240px]">
                                            <button 
                                                onClick={() => copyToClipboard(member.email, index)}
                                                className="flex items-center justify-between gap-4 bg-[#0d1117] px-4 py-3 rounded-xl border border-white/5 hover:border-emerald-500/40 transition-all group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Mail size={14} className="text-emerald-400" />
                                                    <span className="text-xs font-mono text-gray-400 group-hover:text-white transition-colors">{member.email}</span>
                                                </div>
                                                {copiedIndex === index ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-gray-700 group-hover:text-emerald-400" />}
                                            </button>
                                            <div className="flex items-center gap-3 bg-[#0d1117] px-4 py-3 rounded-xl border border-white/5">
                                                <Phone size={14} className="text-emerald-400" />
                                                <span className="text-xs font-mono text-gray-400">{member.phone}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-10 pt-8 border-t border-white/5">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Active Status</span>
                                            <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                <span className="text-[10px] font-black text-emerald-400">LIVE</span>
                                            </div>
                                        </div>
                                        <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden p-[1px]">
                                            <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full w-full shadow-[0_0_15px_rgba(52,211,153,0.4)]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;
