import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, ShieldCheck, Copy, Check } from 'lucide-react';

const Team = () => {
    const navigate = useNavigate();
    const [visibleCards, setVisibleCards] = useState([]);
    const [copiedIndex, setCopiedIndex] = useState(null);
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
        const options = { threshold: 0.15 };
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const index = parseInt(entry.target.dataset.index);
                if (entry.isIntersecting) {
                    setVisibleCards(prev => [...new Set([...prev, index])]);
                }
            });
        }, options);

        document.querySelectorAll('.team-card-trigger').forEach(t => observerRef.current.observe(t));
        return () => observerRef.current?.disconnect();
    }, []);

    const copyEmail = (email, index) => {
        navigator.clipboard.writeText(email);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="min-h-screen bg-[#0d1117] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
            {/* Eco Glows */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 px-8 py-5 flex justify-between items-center bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-2">
                    <ShieldCheck size={20} className="text-emerald-400" />
                    <span className="font-bold text-xl tracking-tight text-white">EcoTrack <span className="text-emerald-400 font-medium">Team</span></span>
                </div>
                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-all">
                    <ArrowLeft size={16} /> Dashboard
                </button>
            </nav>

            <div className="max-w-3xl mx-auto px-6 pt-40 pb-60 relative z-10">
                <header className="text-center mb-32">
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-white">Meet the <span className="text-emerald-400">Innovators</span></h1>
                    <p className="text-gray-500 text-sm uppercase tracking-[0.4em] font-bold">BTech IT • SVCE</p>
                </header>

                <div className="space-y-12">
                    {teamMembers.map((member, index) => {
                        const isVisible = visibleCards.includes(index);
                        return (
                            <div key={index} data-index={index} className="team-card-trigger">
                                <div 
                                    className={`relative p-[1px] rounded-[32px] transition-all duration-1000 ease-out group ${
                                        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
                                    }`}
                                    style={{
                                        background: isVisible 
                                            ? 'linear-gradient(145deg, rgba(52,211,153,0.3) 0%, rgba(255,255,255,0.03) 50%, rgba(14,165,233,0.2) 100%)' 
                                            : 'transparent'
                                    }}
                                >
                                    {/* Darker Internal Card */}
                                    <div className="bg-[#090c12] rounded-[31px] p-8 md:p-10 relative z-10 hover:bg-[#0b0e16] transition-colors">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-[#0d1117] border border-white/5 flex items-center justify-center text-emerald-400 font-black text-xl shadow-2xl">
                                                    {member.initials}
                                                </div>
                                                <div>
                                                    <h3 className="text-3xl font-bold tracking-tight text-white">{member.name}</h3>
                                                    <span className={`text-xs font-black tracking-widest uppercase ${member.role === 'Team Leader' ? 'text-emerald-400' : 'text-gray-500'}`}>
                                                        {member.role} {member.role === 'Team Leader' && '• CORE'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <button 
                                                    onClick={() => copyEmail(member.email, index)}
                                                    className="flex items-center justify-between gap-4 bg-[#0d1117] px-4 py-3 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all group/btn"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Mail size={14} className="text-emerald-400" />
                                                        <span className="text-xs font-mono text-gray-400 group-hover/btn:text-emerald-100 transition-colors">{member.email}</span>
                                                    </div>
                                                    {copiedIndex === index ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} className="text-gray-600 group-hover/btn:text-emerald-400" />}
                                                </button>
                                                <div className="flex items-center gap-3 bg-[#0d1117] px-4 py-3 rounded-xl border border-white/5">
                                                    <Phone size={14} className="text-emerald-400" />
                                                    <span className="text-xs font-mono text-gray-400">{member.phone}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Eco Status Bar */}
                                        <div className="mt-8 pt-6 border-t border-white/5">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Contribution Active</span>
                                                <span className="text-[10px] font-bold text-emerald-400 animate-pulse">LIVE</span>
                                            </div>
                                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 rounded-full transition-all duration-[2s]" style={{ width: isVisible ? '100%' : '0%' }} />
                                            </div>
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
