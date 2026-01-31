import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, ShieldCheck, Copy, Check } from 'lucide-react';

const Team = () => {
    const navigate = useNavigate();
    const [copiedIndex, setCopiedIndex] = useState(null);

    const teamMembers = [
        { name: 'Pranav A', role: 'Team Leader', email: '2025it1070@svce.ac.in', phone: '9345149135', initials: 'PA' },
        { name: 'Modhini V', role: 'Member', email: '2025it1089@svce.ac.in', phone: '9840859756', initials: 'MV' },
        { name: 'Rishe S', role: 'Member', email: '2025it1030@svce.ac.in', phone: '9500405647', initials: 'RS' },
        { name: 'Shivvani T', role: 'Member', email: '2025it0186@svce.ac.in', phone: '7305084346', initials: 'ST' },
        { name: 'Suresh Krishna G', role: 'Member', email: '2025it0130@svce.ac.in', phone: '7824020581', initials: 'SKG' },
        { name: 'Srivatsan S', role: 'Member', email: '2025it1058@svce.ac.in', phone: '7358116408', initials: 'SS' }
    ];

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="min-h-screen bg-[#0a0c10] text-white selection:bg-emerald-500/30 font-sans">
            {/* Nav Section */}
            <nav className="fixed top-0 w-full z-[100] px-8 py-5 flex justify-between items-center bg-[#0a0c10]/90 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-3">
                    <ShieldCheck size={20} className="text-emerald-400" />
                    <span className="font-bold text-xl tracking-tight">EcoTrack <span className="text-emerald-400">Team</span></span>
                </div>
                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all">
                    <ArrowLeft size={16} /> Dashboard
                </button>
            </nav>

            <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
                <header className="text-center mb-20">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">MEET THE INNOVATORS</h1>
                    <p className="text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase">BTech IT • SVCE</p>
                </header>

                {/* The Stacking Container */}
                <div className="relative">
                    {teamMembers.map((member, index) => (
                        <div 
                            key={index} 
                            className="sticky top-28 mb-20 w-full"
                            style={{ 
                                zIndex: index + 1, // Higher index for each subsequent card
                                marginTop: index === 0 ? '0' : '40px' 
                            }}
                        >
                            {/* Glassy Border Wrapper */}
                            <div className="relative p-[1px] rounded-[32px] overflow-hidden bg-gradient-to-br from-emerald-500/40 via-white/5 to-blue-500/20 shadow-2xl">
                                
                                {/* Darker Internal Card */}
                                <div className="bg-[#0f141c] rounded-[31px] p-8 md:p-10">
                                    <div className="flex flex-col md:flex-row justify-between gap-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-[#0a0c10] border border-white/10 flex items-center justify-center text-emerald-400 font-black text-2xl shadow-inner">
                                                {member.initials}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                                                <span className={`text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded ${member.role === 'Team Leader' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-gray-500'}`}>
                                                    {member.role}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <button 
                                                onClick={() => copyToClipboard(member.email, index)}
                                                className="flex items-center justify-between gap-4 bg-[#0a0c10] px-4 py-2.5 rounded-xl border border-white/5 hover:border-emerald-500/40 transition-all group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Mail size={14} className="text-emerald-400" />
                                                    <span className="text-xs font-mono text-gray-400 group-hover:text-white">{member.email}</span>
                                                </div>
                                                {copiedIndex === index ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-gray-700 group-hover:text-emerald-400" />}
                                            </button>
                                            <div className="flex items-center gap-3 bg-[#0a0c10] px-4 py-2.5 rounded-xl border border-white/5">
                                                <Phone size={14} className="text-emerald-400" />
                                                <span className="text-xs font-mono text-gray-400">{member.phone}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dashboard-style Progress */}
                                    <div className="mt-8 pt-6 border-t border-white/5">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Active Contribution</span>
                                            <span className="text-[10px] font-bold text-emerald-400">LIVE</span>
                                        </div>
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
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
