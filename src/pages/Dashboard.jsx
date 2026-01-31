import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Dumbbell, School, Coffee, Home, LayoutGrid, User, Settings as SettingsIcon } from 'lucide-react';

const locations = [
    { name: 'Library', count: 45, capacity: 100, icon: <Book size={24} /> },
    { name: 'MPH', count: 78, capacity: 150, icon: <Dumbbell size={24} /> },
    { name: 'Classroom Block 1', count: 120, capacity: 200, icon: <School size={24} /> },
    { name: 'Classroom Block 2', count: 95, capacity: 200, icon: <School size={24} /> },
    { name: 'Classroom Block 3', count: 88, capacity: 200, icon: <School size={24} /> },
    { name: 'Classroom Block 4', count: 156, capacity: 200, icon: <School size={24} /> },
    { name: 'Classroom Block 5', count: 62, capacity: 200, icon: <School size={24} /> },
    { name: 'Cafeteria', count: 34, capacity: 200, icon: <Coffee size={24} /> },
];

const data = locations.map(loc => ({
    name: loc.name,
    users: loc.count,
    occupancy: Math.round((loc.count / loc.capacity) * 100),
}));

const Dashboard = () => {
    const navigate = useNavigate();
    const [log, setLog] = useState("Privacy Check: All data anonymized locally.");
    const [timeStamp, setTimeStamp] = useState(new Date().toLocaleTimeString());

    const logMessages = [
        "Privacy Check: All data anonymized locally.",
        "Zone Sync: Library occupancy data updated.",
        "System Check: Campus mesh network stable.",
        "Data Stream: Classroom Block 1 sensors active.",
        "Analytics: Peak traffic detected in MPH.",
        "Security: System-wide integrity check passed.",
        "Network: Latency optimal at 12ms.",
        "Node Status: Cafeteria sensors online."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const randomMsg = logMessages[Math.floor(Math.random() * logMessages.length)];
            setLog(randomMsg);
            setTimeStamp(new Date().toLocaleTimeString());
        }, 4000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="w-full space-y-12 pb-16">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Campus Locations</h1>
            </div>

            {/* Stats Grid - Neat & Compact Cards - Locked to 2 Columns for 4/4 Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {locations.map((loc) => {
                    const percentage = (loc.count / loc.capacity) * 100;
                    const isHigh = percentage > 50;
                    const isCritical = percentage > 80;
                    const color = isCritical ? 'red' : isHigh ? 'yellow' : 'emerald';
                    const colors = {
                        red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', accent: '#ef4444' },
                        yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20', accent: '#fbbf24' },
                        emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', accent: '#10b981' }
                    }[color];

                    return (
                        <div key={loc.name} className="glass-panel p-6 flex flex-col hover:bg-white/[0.04] transition-all duration-300 group">
                            {/* Top row: Icon, Name & Count */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center border ${colors.border} shadow-lg transition-transform`}>
                                        {React.cloneElement(loc.icon, { size: 24 })}
                                    </div>
                                    <h3 className="text-xl font-bold text-white tracking-tight">{loc.name}</h3>
                                </div>
                                <div className={`text-4xl font-black ${colors.text}`}>
                                    {loc.count}
                                </div>
                            </div>

                            {/* Middle section: Progress Bar */}
                            <div className="space-y-4">
                                <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000 ease-out"
                                        style={{
                                            width: `${Math.min(100, percentage)}%`,
                                            backgroundColor: colors.accent,
                                        }}
                                    />
                                </div>

                                {/* Bottom row: Labels */}
                                <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                                    <span>Active Users</span>
                                    <span className="font-mono">{loc.count}/{loc.capacity}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Dashboard Footer - Terminal Log & Premium Fixed Dock */}
            <div className="mt-16 pb-32">
                {/* Unified Log Area */}
                <div className="w-full max-w-2xl mx-left">
                    <div className="glass-panel bg-[#0f111a]/95 border-white/5 p-4 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex gap-1.5 ml-1">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                            </div>
                            <span className="text-[10px] text-gray-500 font-mono ml-4 opacity-60">system_log.sh</span>
                        </div>
                        <div className="px-1 py-1 font-mono text-sm flex items-center gap-3">
                            <span className="text-emerald-500 font-bold opacity-80">&gt;</span>
                            <span className="text-emerald-500/60">[{timeStamp}]</span>
                            <span className="text-emerald-500 truncate">{log}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
