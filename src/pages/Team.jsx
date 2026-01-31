import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail } from 'lucide-react';

const Team = () => {
    const navigate = useNavigate();

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

    return (
        <div className="min-h-screen p-8 relative">
            <button
                onClick={() => navigate('/')}
                className="absolute top-8 left-8 nav-back text-lg z-50 bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10"
            >
                <ArrowLeft size={24} />
                Back
            </button>

            <div className="max-w-7xl mx-auto pt-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Meet <span className="text-emerald-400" style={{ color: 'var(--accent-primary)' }}>Team</span> Ethu Nagarjuna Vaa
                    </h1>
                    <p className="text-xl text-gray-400">
                        BTech IT • 1st Year • Sri Venkateswara College of Engineering
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="glass-panel p-6 hover:bg-white/5 transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-emerald-400 flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-emerald-400/20" style={{ backgroundColor: 'var(--accent-primary)' }}>
                                    {member.initials}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{member.name}</h3>
                                    <p className={`text-sm ${member.role === 'Team Leader' ? 'text-emerald-400' : 'text-gray-400'}`} style={member.role === 'Team Leader' ? { color: 'var(--accent-primary)' } : {}}>
                                        {member.role}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-gray-400 text-sm">
                                    <Mail size={16} className="text-emerald-400" style={{ color: 'var(--accent-primary)' }} />
                                    <span className="font-mono text-xs sm:text-sm">{member.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400 text-sm">
                                    <Phone size={16} className="text-emerald-400" style={{ color: 'var(--accent-primary)' }} />
                                    <span className="font-mono text-xs sm:text-sm">{member.phone}</span>
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
