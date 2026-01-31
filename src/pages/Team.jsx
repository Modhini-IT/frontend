import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail } from 'lucide-react';

const Team= () => {
    const navigate = useNavigate();
    const [visibleCards, setVisibleCards] = useState([]);
    const observerRef = useRef(null);

    const teamMembers = [
        {
            name: 'Pranav A',
            role: 'Team Leader',
            email: '2025it1070@svce.ac.in',
            phone: '9345149135',
            initials: 'PA'
        },
        {
            name: 'Modhini V',
            role: 'Member',
            email: '2025it1089@svce.ac.in',
            phone: '9840859756',
            initials: 'MV'
        },
        {
            name: 'Rishe S',
            role: 'Member',
            email: '2025it1030@svce.ac.in',
            phone: '9500405647',
            initials: 'RS'
        },
        {
            name: 'Shivvani T',
            role: 'Member',
            email: '2025it0186@svce.ac.in',
            phone: '7305084346',
            initials: 'ST'
        },
        {
            name: 'Suresh Krishna G',
            role: 'Member',
            email: '2025it0130@svce.ac.in',
            phone: '7824020581',
            initials: 'SKG'
        },
        {
            name: 'Srivatsan S',
            role: 'Member',
            email: '2025it1058@svce.ac.in',
            phone: '7358116408',
            initials: 'SS'
        }
    ];

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '-20% 0px -20% 0px',
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const index = parseInt(entry.target.dataset.index);
                
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    setVisibleCards(prev => {
                        if (!prev.includes(index)) {
                            return [...prev, index].sort((a, b) => a - b);
                        }
                        return prev;
                    });
                }
            });
        }, options);

        const cards = document.querySelectorAll('.team-card-trigger');
        cards.forEach(card => observerRef.current.observe(card));

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return (
        <div className="min-h-screen p-8 relative bg-gradient-to-b from-gray-900 to-black">
            <button
                onClick={() => navigate('/')}
                className="fixed top-8 left-8 nav-back text-lg z-50 bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 hover:bg-black/70 transition-all"
            >
                <ArrowLeft size={24} />
                Back
            </button>

            <div className="max-w-4xl mx-auto pt-32 pb-20">
                <div className="text-center mb-32 sticky top-0 z-10 py-8 bg-gradient-to-b from-gray-900 to-transparent">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Meet <span className="text-emerald-400">Team</span> Ethu Nagarjuna Vaa
                    </h1>
                    <p className="text-xl text-gray-400">
                        BTech IT • 1st Year • Sri Venkateswara College of Engineering
                        
                    </p>
                </div>

                <div className="space-y-[60vh]">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            data-index={index}
                            className="team-card-trigger min-h-[80vh] flex items-center justify-center"
                        >
                            <div
                                className={`glass-panel p-8 max-w-2xl w-full transition-all duration-1000 transform ${
                                    visibleCards.includes(index)
                                        ? 'opacity-100 translate-y-0 scale-100'
                                        : 'opacity-0 translate-y-20 scale-95'
                                }`}
                                style={{
                                    background: 'rgba(0, 0, 0, 0.6)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '24px',
                                    boxShadow: visibleCards.includes(index) 
                                        ? '0 25px 50px -12px rgba(16, 185, 129, 0.25)' 
                                        : 'none'
                                }}
                            >
                                <div className="flex flex-col items-center text-center mb-8">
                                    <div
                                        className="w-24 h-24 rounded-full bg-emerald-400 flex items-center justify-center text-black font-bold text-3xl shadow-2xl shadow-emerald-400/30 mb-6 transition-transform duration-700"
                                        style={{
                                            transform: visibleCards.includes(index) 
                                                ? 'scale(1) rotate(0deg)' 
                                                : 'scale(0.5) rotate(-180deg)'
                                        }}
                                    >
                                        {member.initials}
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2">{member.name}</h3>
                                    <p
                                        className={`text-lg font-medium ${
                                            member.role === 'Team Leader' ? 'text-emerald-400' : 'text-gray-400'
                                        }`}
                                    >
                                        {member.role}
                                    </p>
                                </div>

                                <div className="space-y-4 bg-black/30 rounded-xl p-6">
                                    <div
                                        className="flex items-center gap-4 text-gray-300 transition-all duration-500 delay-200"
                                        style={{
                                            opacity: visibleCards.includes(index) ? 1 : 0,
                                            transform: visibleCards.includes(index) 
                                                ? 'translateX(0)' 
                                                : 'translateX(-20px)'
                                        }}
                                    >
                                        <Mail size={20} className="text-emerald-400 flex-shrink-0" />
                                        <span className="font-mono text-sm break-all">{member.email}</span>
                                    </div>
                                    <div
                                        className="flex items-center gap-4 text-gray-300 transition-all duration-500 delay-300"
                                        style={{
                                            opacity: visibleCards.includes(index) ? 1 : 0,
                                            transform: visibleCards.includes(index) 
                                                ? 'translateX(0)' 
                                                : 'translateX(-20px)'
                                        }}
                                    >
                                        <Phone size={20} className="text-emerald-400 flex-shrink-0" />
                                        <span className="font-mono text-sm">{member.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="h-[40vh]"></div>
            </div>
        </div>
    );
};

export default Team;
