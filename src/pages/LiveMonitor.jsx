import React, { useState, useEffect } from 'react';
import { 
    Activity, Shield, Camera, AlertCircle, CheckCircle, 
    Loader2, Zap, MapPin, Users, Maximize2 
} from 'lucide-react';

const LiveMonitor = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [alerts, setAlerts] = useState([]);
    
    // Camera feed status data (from your original logic)
    const cameras = [
        { id: 1, name: 'Main Gate - Entry', health: 98 },
        { id: 2, name: 'Library Corridor', health: 94 },
        { id: 3, name: 'Cafeteria Hub', health: 89 },
        { id: 4, name: 'Block A - 3rd Floor', health: 99 },
    ];

    useEffect(() => {
        // 1. Clock Update
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        
        // 2. Violation Generator (Ported directly from your HTML script)
        const alertTimer = setInterval(() => {
            if (Math.random() > 0.7) {
                const id = Math.random().toString(36).substr(2, 9);
                const newAlert = {
                    id,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    location: ['Library South', 'Main Quad', 'Lab 204', 'Parking Gate'][Math.floor(Math.random() * 4)],
                    student: ['Pranav A', 'Modhini V', 'Rishe S', 'Shivvani T'][Math.floor(Math.random() * 4)],
                    messageSent: false
                };

                setAlerts(prev => [newAlert, ...prev].slice(0, 5));

                // 3. Dispatch Simulation
                setTimeout(() => {
                    setAlerts(current => 
                        current.map(a => a.id === id ? { ...a, messageSent: true } : a)
                    );
                }, 2500);
            }
        }, 6000);

        return () => {
            clearInterval(timer);
            clearInterval(alertTimer);
        };
    }, []);

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            {/* System Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">LIVE SURVEILLANCE</h1>
                    <p className="text-gray-400 flex items-center gap-2 font-mono text-sm">
                        <Activity size={14} className="text-emerald-400 animate-pulse" />
                        SYSTEM_CORE_ACTIVE • {time}
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="glass-panel px-4 py-2 flex items-center gap-3 bg-white/[0.02]">
                        <Users size={18} className="text-emerald-400" />
                        <span className="text-sm font-bold tracking-tighter text-white">142 ACTIVE</span>
                    </div>
                    <div className="glass-panel px-4 py-2 flex items-center gap-3 border-emerald-500/30 bg-emerald-500/5">
                        <Shield size={18} className="text-emerald-400" />
                        <span className="text-sm font-bold text-emerald-400 tracking-tighter">SECURE</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Monitor View */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-panel relative aspect-video overflow-hidden border-white/10 bg-black">
                        {/* Simulated CCTV Background */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] bg-cover opacity-20 grayscale" />
                        
                        {/* Scanning Effect Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent h-[200%] animate-scanline pointer-events-none" />

                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white font-bold">Cam_01_Entrance</span>
                        </div>

                        <div className="absolute bottom-6 left-6 space-y-1">
                            <p className="text-[10px] text-emerald-400 font-mono tracking-widest bg-black/40 px-2 py-1 inline-block rounded">AI_RECOGNITION: ENABLED</p>
                            <h2 className="text-xl font-bold text-white uppercase">Sector A-12 Main Gate</h2>
                        </div>
                    </div>

                    {/* Camera Health Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {cameras.map(cam => (
                            <div key={cam.id} className="glass-panel p-4 border-white/5 hover:bg-white/5 transition-all cursor-pointer group">
                                <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest mb-1 group-hover:text-emerald-400">{cam.name}</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-2xl font-black text-white">{cam.health}%</span>
                                    <Zap size={14} className="text-emerald-400 mb-1 opacity-50" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Threat Log (Sidebar) */}
                <aside className="glass-panel p-6 min-h-[500px] flex flex-col border-white/5">
                    <div className="flex items-center gap-2 mb-6">
                        <AlertCircle size={20} className="text-amber-500" />
                        <h3 className="font-bold text-lg tracking-tight text-white uppercase">Threat Log</h3>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                        {alerts.length > 0 ? (
                            alerts.map(alert => (
                                <div key={alert.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-3 animate-slide-in">
                                    <div className="flex justify-between items-start">
                                        <span className="text-[10px] font-mono text-gray-500">{alert.time}</span>
                                        <span className="text-[9px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded uppercase font-black tracking-widest">Unauth_Exit</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-white uppercase">{alert.student}</p>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-500">
                                            <MapPin size={10} /> {alert.location}
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${alert.messageSent ? 'text-emerald-400' : 'text-amber-500/60'}`}>
                                        {alert.messageSent ? <CheckCircle size={12} /> : <Loader2 size={12} className="animate-spin" />}
                                        {alert.messageSent ? 'Advisor Notified' : 'Sending SMS...'}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center opacity-20 text-center py-20">
                                <Shield size={40} className="mb-4" />
                                <p className="text-[10px] uppercase font-black tracking-[0.3em]">Monitoring...</p>
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default LiveMonitor;
