import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, ShieldCheck, Copy, Check } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from './ScrollStack'; // Ensure the file path is correct

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
        <div className="min-h-screen bg-[#0d1117] text-white overflow-hidden">
            {/* Nav matches your Dashboard */}
            <nav className="fixed top-0 w-full z-[100] px-8 py-5 flex justify-between items-center bg-[#0d1117]/90 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-3">
                    <ShieldCheck size={20} className="text-emerald-400" />
                    <span className="font-bold text-xl tracking-tight italic">EcoTrack <span className="text-emerald-400 not-italic">Team</span></span>
                </div>
                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all bg-white/5 px-4 py-2 rounded-full">
                    <ArrowLeft size={16} /> Dashboard
                </button>
            </nav>

            {/* ScrollStack Wrapper */}
            <ScrollStack 
                itemStackDistance={60} // Offset so headers of stacked cards are visible
                stackPosition="15%"     // Where they stop at the top
                baseScale={0.92}        // The bottom-most card scale
                itemScale={0.015}       // Scale difference between cards
                useWindowScroll={true}  // Better for mobile/full-page feel
            >
                <header className="text-center mb-32 pt-20">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic">
                        MEET THE <span className="text-emerald-400 not-italic">INNOVATORS</span>
                    </h1>
                    <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 px-4 py-1 rounded-full text-emerald-400 text-[10px] font-black tracking-[0.4em] uppercase">
                        SVCE • BTech IT
                    </div>
                </header>

                {teamMembers.map((member, index) => (
                    <ScrollStackItem key={index}>
                        {/* THE CARD DESIGN: Dark Glass Aesthetic */}
                        <div className="relative h-full w-full p-[1.5px] rounded-[40px] bg-gradient-to-br from-emerald-500/40 via-white/5 to-blue-500/20 shadow-2xl">
                            <div className="bg-[#090b11] h-full w-full rounded-[39px] p-8 md:p-12 flex flex-col justify-between">
                                
                                {/* Header of the Card */}
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-[#0d1117] border border-white/10 flex items-center justify-center text-emerald-400 font-black text-2xl shadow-inner">
                                            {member.initials}
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold tracking-tight text-white mb-1">{member.name}</h3>
                                            <span className={`text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded ${member.role === 'Team Leader' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-gray-500'}`}>
                                                {member.role}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex flex-col items-end gap-2">
                                        <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Live Contact</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Body of the Card */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => copyToClipboard(member.email, index)}
                                        className="flex items-center justify-between gap-4 bg-[#0d1117] px-6 py-4 rounded-2xl border border-white/5 hover:border-emerald-500/40 transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Mail size={18} className="text-emerald-400" />
                                            <span className="text-sm font-mono text-gray-400 group-hover:text-white">{member.email}</span>
                                        </div>
                                        {copiedIndex === index ? <Check size={18} className="text-emerald-400" /> : <Copy size={16} className="text-gray-700 group-hover:text-emerald-400" />}
                                    </button>

                                    <div className="flex items-center gap-4 bg-[#0d1117] px-6 py-4 rounded-2xl border border-white/5">
                                        <Phone size={18} className="text-emerald-400" />
                                        <span className="text-sm font-mono text-gray-400">{member.phone}</span>
                                    </div>
                                </div>

                                {/* Bottom Status Bar - Matches your Dashboard Locations */}
                                <div className="pt-8 border-t border-white/5">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">EcoTrack Innovator Verified</span>
                                        <span className="text-[10px] font-bold text-emerald-400">STATUS: ACTIVE</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 rounded-full w-full shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollStackItem>
                ))}
            </ScrollStack>
        </div>
    );
};

export default Team;
