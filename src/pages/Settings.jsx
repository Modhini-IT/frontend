import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    Bell,
    Moon,
    Shield,
    Smartphone,
    Home,
    LayoutGrid,
    User,
    Settings as SettingsIcon
} from 'lucide-react';

const Settings = () => {
    const navigate = useNavigate();

    const [settings, setSettings] = useState({
        notifications: true,
        darkMode: true,
        privacyMode: false,
        mobileAlerts: false
    });

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const settingItems = [
        {
            key: 'notifications',
            title: 'Notifications',
            subtitle: 'Enable push notifications',
            icon: <Bell size={24} className="text-emerald-400" />
        },
        {
            key: 'darkMode',
            title: 'Dark Mode',
            subtitle: 'Use dark theme',
            icon: <Moon size={24} className="text-emerald-400" />
        },
        {
            key: 'privacyMode',
            title: 'Privacy Mode',
            subtitle: 'Hide your activity status',
            icon: <Shield size={24} className="text-emerald-400" />
        },
        {
            key: 'mobileAlerts',
            title: 'Mobile Alerts',
            subtitle: 'Receive SMS alerts',
            icon: <Smartphone size={24} className="text-emerald-400" />
        }
    ];

    return (
        <div className="fixed inset-0 z-[1000] bg-[#060010] flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Main Centered Wrapper - Wider max-width as requested */}
            <div className="w-full max-w-4xl flex flex-col items-center animate-in fade-in zoom-in duration-500">

                {/* Header - Centered Landscape Group */}
                <div className="flex items-center justify-center gap-10 mb-12 w-full">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-16 h-16 border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white/10 transition-all shadow-2xl hover:scale-110 active:scale-95 shrink-0"
                    >
                        <ChevronLeft size={36} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-8xl font-black text-[#10b981] tracking-tighter" style={{
                        textShadow: '0 0 40px rgba(16, 185, 129, 0.4)'
                    }}>
                        Settings
                    </h1>
                </div>

                {/* Main Settings Card - 1 Column Grid in a Wider Container */}
                <div className="w-full glass-panel bg-[#0f111a]/90 border-white/5 p-12 rounded-[4rem] shadow-[0_80px_120px_rgba(0,0,0,0.9)] border border-white/10 backdrop-blur-3xl">
                    <div className="space-y-6">
                        {settingItems.map((item) => (
                            <div
                                key={item.key}
                                className="flex items-center justify-between p-8 rounded-[3rem] bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-8 text-left">
                                    <div className="w-16 h-16 rounded-3xl bg-emerald-500/5 flex items-center justify-center border border-emerald-500/10 group-hover:scale-110 transition-transform shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-white mb-1 tracking-tight">{item.title}</h3>
                                        <p className="text-base text-gray-400 font-medium opacity-70">{item.subtitle}</p>
                                    </div>
                                </div>

                                {/* Premium Push-Style Slider Toggle */}
                                <button
                                    onClick={() => toggleSetting(item.key)}
                                    className={`
                                        relative w-24 h-12 rounded-full transition-all duration-500 ease-in-out p-1.5 shrink-0
                                        ${settings[item.key] ? 'bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'bg-[#1c1f2e] border border-white/10'}
                                    `}
                                >
                                    <div className={`
                                        h-9 w-9 rounded-full shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                                        ${settings[item.key] ? 'translate-x-12 bg-white' : 'translate-x-0 bg-[#060010]'}
                                    `} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
