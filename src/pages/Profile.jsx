import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    User as UserIcon,
    Mail,
    Phone,
    Briefcase,
    Home,
    LayoutGrid,
    Settings as SettingsIcon
} from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();

    const userDetails = {
        name: "Alex Rivera",
        email: "alex.rivera@campus.edu",
        phone: "+1 (555) 0123-4567",
        department: "Computer Science & Engineering"
    };

    const profileFields = [
        { label: "Full Name", value: userDetails.name, icon: <UserIcon size={20} className="text-emerald-400" /> },
        { label: "Email Address", value: userDetails.email, icon: <Mail size={20} className="text-emerald-400" /> },
        { label: "Phone Number", value: userDetails.phone, icon: <Phone size={20} className="text-emerald-400" /> },
        { label: "Department", value: userDetails.department, icon: <Briefcase size={20} className="text-emerald-400" /> }
    ];

    return (
        <div className="fixed inset-0 z-[1000] bg-[#060010] flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Main Centered Wrapper */}
            <div className="w-full max-w-2xl flex flex-col items-center animate-in fade-in zoom-in duration-500">

                {/* Header - Centered Group */}
                <div className="flex items-center justify-center gap-6 mb-12 w-full">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all shadow-xl hover:scale-110 active:scale-95"
                    >
                        <ChevronLeft size={28} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-7xl font-black text-[#10b981] tracking-tighter" style={{
                        textShadow: '0 0 30px rgba(16, 185, 129, 0.4)'
                    }}>
                        Profile
                    </h1>
                </div>

                {/* Profile Card - Balanced Centering */}
                <div className="w-full glass-panel bg-[#0f111a]/90 border-white/5 p-8 rounded-[3.5rem] shadow-[0_60px_100px_rgba(0,0,0,0.8)] border border-white/10 backdrop-blur-3xl">
                    <div className="space-y-6">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center shadow-inner group">
                                <UserIcon size={48} className="text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                            </div>
                        </div>

                        {/* Details List */}
                        <div className="space-y-4">
                            {profileFields.map((field, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-6 p-6 rounded-[2rem] bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.05] transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/5 flex items-center justify-center border border-emerald-500/10 shrink-0">
                                        {field.icon}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">{field.label}</p>
                                        <h3 className="text-xl font-black text-white tracking-tight">{field.value}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
