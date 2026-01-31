import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, User } from 'lucide-react';

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
            rootMargin: '0px 0px -15% 0px',
            threshold: 0.2
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
        <div className="min-h-screen bg-[#0b0e14] text-white overflow-x-hidden font-sans selection:bg-[#10b981]/30">
            {/* Eco-Themed Parallax Blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-[#10b981]/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[35rem] h-[35rem] bg-[#0ea5e9]/5 rounded-full blur-[120px]" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-[#0b0e14]/80 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#10b981] rounded-lg flex items-center justify-center">
                        <User size={18} className="text-[#0b0e14]" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">EcoTrack <span className="text-[#10b981]">Team</span></span>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>
            </nav>

            <div className="max-w-4xl mx-auto px-6 pt-40 pb-60 relative z-10">
                <header className="text-center mb-32">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Meet the <span className="text-[#10b981]">Innovators</span>
                    </h1>
                    <div className="flex items-center justify-center gap-3 text-gray-400 bg-white/5 w-fit mx-auto px-6 py-2 rounded-full border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                        BTech IT • Sri Venkateswara College of Engineering
                    </div>
                </header>

                {/* Team Stack */}
                <div className="flex flex-col gap-12">
                    {teamMembers.map((member, index) => {
                        const isVisible = visibleCards.includes(index);
                        return (
                            <div
                                key={index}
                                data-index={index}
                                className="team-card-trigger w-full"
                            >
                                <div
                                    className={`relative transition-all duration-1000 cubic-bezier(0.2, 1, 0.3, 1) ${
                                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 scale-[0.98]'
                                    }`}
                                >
                                    {/* Card Decoration (EcoTrack Style Line) */}
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#10b981] rounded-l-2xl z-20" />

                                    <div className="bg-[#161b22] border border-white/5 p-8 md:p-12 rounded-2xl shadow-2xl overflow-hidden">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                            
                                            <div className="flex items-center gap-6">
                                                {/* Initials Circle */}
                                                <div className="w-20 h-20 shrink-0 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-[#10b981] font-bold text-2xl shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                                                    {member.initials}
                                                </div>
                                                
                                                <div>
                                                    <h3 className="text-3xl font-bold tracking-tight mb-1">{member.name}</h3>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-sm font-semibold uppercase tracking-widest ${
                                                            member.role === 'Team Leader' ? 'text-[#10b981]' : 'text-gray-500'
                                                        }`}>
                                                            {member.role}
                                                        </span>
                                                        {member.role === 'Team Leader' && (
                                                            <span className="bg-[#10b981]/20 text-[#10b981] text-[10px] px-2 py-0.5 rounded-md font-black">CORE</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Contact Info (Dashboard Pill Style) */}
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-center gap-3 bg-[#0b0e14] px-4 py-3 rounded-xl border border-white/5 hover:border-[#10b981]/30 transition-all cursor-default">
                                                    <Mail size={16} className="text-[#10b981]" />
                                                    <span className="text-sm font-mono text-gray-400">{member.email}</span>
                                                </div>
                                                <div className="flex items-center gap-3 bg-[#0b0e14] px-4 py-3 rounded-xl border border-white/5 hover:border-[#10b981]/30 transition-all cursor-default">
                                                    <Phone size={16} className="text-[#10b981]" />
                                                    <span className="text-sm font-mono text-gray-400">{member.phone}</span>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Progress Bar Detail (Visual reference to EcoTrack Dashboard) */}
                                        <div className="mt-10 pt-8 border-t border-white/5 flex items-center gap-4">
                                            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-[#10b981] rounded-full transition-all duration-1000 delay-500" 
                                                    style={{ width: isVisible ? '100%' : '0%' }}
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">Contribution Active</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <footer className="mt-40 text-center text-gray-600 text-sm">
                    <p>© 2026 Team Ethu Nagarjuna Vaa • EcoTrack Initiative</p>
                </footer>
            </div>
        </div>
    );
};

export default Team;
