import React, { useState, useEffect } from 'react';
import { Camera, Zap, Users, AlertCircle, Leaf } from 'lucide-react';

// Mock WebSocket data simulation
const useLiveUpdates = () => {
    const [data, setData] = useState({
        occupancy: 45,
        energyUsage: 12.5,
        status: 'Active',
        feedTimestamp: new Date().toLocaleTimeString()
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => ({
                occupancy: Math.max(0, prev.occupancy + Math.floor(Math.random() * 5) - 2),
                energyUsage: (12 + Math.random()).toFixed(2),
                status: 'Active',
                feedTimestamp: new Date().toLocaleTimeString()
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return data;
};

const LiveMonitor = () => {
    const stats = useLiveUpdates();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Live Monitor</h1>
                    <p className="text-gray-400 font-medium">Real-time camera feed and room status</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    System Online
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Camera Feed */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="glass-panel p-1 relative overflow-hidden aspect-video bg-black flex items-center justify-center group border-white/10">
                        {/* Gradient Overlay for "Scanning" effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent animate-scanline pointer-events-none z-10"></div>

                        {/* Mock Camera Placeholder Image */}
                        <img
                            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1000&auto=format&fit=crop"
                            alt="Live Feed"
                            className="w-full h-full object-cover opacity-60"
                        />

                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-white flex items-center gap-2 z-20 border border-white/5">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            REC • {stats.feedTimestamp}
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-20">
                            <div className="bg-black/60 backdrop-blur-md px-3 py-2 rounded text-xs border border-white/5">
                                <p className="text-gray-400 uppercase text-[10px] font-bold tracking-tighter">Camera ID</p>
                                <p className="font-mono">CAM-LIB-01</p>
                            </div>
                            <div className="bg-black/60 backdrop-blur-md px-3 py-2 rounded text-xs border border-white/5">
                                <p className="text-gray-400 uppercase text-[10px] font-bold tracking-tighter">Detection</p>
                                <p className="font-mono text-emerald-400">FACE_ID_ACTIVE</p>
                            </div>
                        </div>

                        {/* Face Detection Boxes (Mock) */}
                        <div className="absolute top-1/2 left-1/3 w-24 h-24 border-2 border-emerald-400/50 rounded z-10 hidden group-hover:block transition-all">
                            <div className="absolute -top-6 left-0 bg-emerald-500/80 text-black text-[10px] px-1 rounded-sm font-bold">ID: 9822</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Library Main', 'Entrance', 'Reading Room', 'Corridor'].map((cam, i) => (
                            <div key={i} className={`glass-panel p-2 cursor-pointer transition-all hover:border-emerald-500/50 ${i === 0 ? 'border-emerald-500/50 bg-emerald-500/5' : 'opacity-60 hover:opacity-100 border-white/5'}`}>
                                <div className="aspect-video bg-black/40 rounded overflow-hidden relative">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Camera size={16} className="text-gray-600" />
                                    </div>
                                </div>
                                <p className="text-[10px] mt-2 text-center text-gray-400 uppercase font-bold tracking-wider">{cam}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Live Stats */}
                <div className="space-y-4">
                    <div className="glass-panel p-6 border-white/5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg">Current Status</h3>
                            <Users className="text-emerald-400" size={20} />
                        </div>
                        <div className="text-4xl font-black mb-2">{stats.occupancy}</div>
                        <p className="text-sm text-gray-400 font-medium">Students detected in Library</p>
                        <div className="w-full bg-white/5 rounded-full h-2 mt-4 overflow-hidden">
                            <div className="bg-emerald-400 h-2 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (stats.occupancy / 100) * 100)}%` }}></div>
                        </div>
                        <p className="text-[10px] text-right mt-1 text-gray-500 font-bold uppercase tracking-widest">{Math.min(100, (stats.occupancy / 100) * 100).toFixed(0)}% Capacity</p>
                    </div>

                    <div className="glass-panel p-6 border-white/5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg">Energy Impact</h3>
                            <Zap className="text-yellow-400" size={20} />
                        </div>
                        <div className="text-4xl font-black mb-2">{stats.energyUsage} <span className="text-lg text-gray-500 font-normal tracking-tight">kWh</span></div>
                        <p className="text-sm text-gray-400 font-medium">Current power consumption</p>
                        <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 flex items-start gap-2">
                            <Leaf size={14} className="mt-0.5 shrink-0" />
                            <span>Smart lighting reduced output by 30% due to sufficient daylight.</span>
                        </div>
                    </div>

                    <div className="glass-panel p-6 border-red-500/20 bg-red-500/5">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="text-red-400" size={20} />
                            <h3 className="font-bold uppercase tracking-tight">System Alerts</h3>
                        </div>
                        <ul className="space-y-3 text-xs text-gray-400 font-medium">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></span>
                                Unauthorized entry attempt (Block 2)
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0"></span>
                                Camera 03 offline (Reconnecting...)
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveMonitor;
