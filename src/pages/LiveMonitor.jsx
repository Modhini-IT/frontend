import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ShieldCheck, Video, Activity, Bell, 
  Search, Plus, CheckCircle, Loader2 
} from 'lucide-react';

// --- Utilities ---
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
const now = () => new Date().toLocaleTimeString();
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const sampleStudents = ['John Doe', 'Jane Smith', 'Alex Lee', 'Priya Patel', 'Wei Chen', 'Carlos Ramirez', 'Aisha Khan', 'Emily Clark', 'Michael Brown', 'Sara Johnson'];
const sampleReasons = ['Sports Competition', 'Medical', 'Library Duty', 'Lab Prep', 'Placement Event'];
const sampleLocations = ['Cafeteria', 'Library', 'Quad', 'Gym', 'Parking Lot', 'Corridor', 'Garden'];
const inClassLocations = ['Room 101', 'Room 202', 'CS Lab', 'Lecture Hall A'];

function randomBox() {
    const w = 15 + Math.random() * 15;
    const h = 25 + Math.random() * 15;
    return {
        id: uid(),
        x: Math.random() * (100 - w),
        y: Math.random() * (100 - h),
        w,
        h,
        student: sampleStudents[Math.floor(Math.random() * sampleStudents.length)],
        status: Math.random() > 0.7 ? 'Bunking' : 'In Class',
        location: Math.random() > 0.7 ? sampleLocations[Math.floor(Math.random() * sampleLocations.length)] : inClassLocations[Math.floor(Math.random() * inClassLocations.length)]
    };
}

const LiveMonitor = () => {
    const [detections, setDetections] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [exemptions, setExemptions] = useState([]);
    const [showExemptionModal, setShowExemptionModal] = useState(false);
    const [newExemption, setNewExemption] = useState({ name: '', reason: '' });
    const videoRef = useRef(null);

    // Camera Setup
    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream; })
                .catch(err => console.error("Webcam Error:", err));
        }
    }, []);

    // Simulated Detection Engine
    useEffect(() => {
        const interval = setInterval(() => {
            const count = 2 + Math.floor(Math.random() * 3);
            const newDetections = Array.from({ length: count }, randomBox);
            setDetections(newDetections);

            // Handle alerts for bunking students
            newDetections.forEach(d => {
                const isExempt = exemptions.some(e => e.name.toLowerCase() === d.student.toLowerCase());
                if (d.status === 'Bunking' && !isExempt) {
                    const alertId = uid();
                    setAlerts(prev => [{
                        id: alertId,
                        student: d.student,
                        location: d.location,
                        time: now(),
                        messageSent: false
                    }, ...prev].slice(0, 10));

                    // Simulate SMS notification delay
                    setTimeout(() => {
                        setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, messageSent: true } : a));
                    }, 2500);
                }
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [exemptions]);

    const handleAddExemption = (e) => {
        e.preventDefault();
        if (newExemption.name) {
            setExemptions([...exemptions, { ...newExemption, id: uid() }]);
            setNewExemption({ name: '', reason: '' });
            setShowExemptionModal(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-neutral-950 text-gray-100 font-sans">
            <main className="flex-1 grid grid-cols-12 overflow-hidden">
                {/* Surveillance Feed Column */}
                <div className="col-span-12 lg:col-span-9 p-4 flex flex-col gap-4 overflow-y-auto">
                    <header className="flex items-center justify-between bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800">
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
                                <ShieldCheck className="h-6 w-6 text-emerald-500" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold tracking-tight">Live Surveillance</h1>
                                <p className="text-xs text-emerald-500/60 font-mono flex items-center gap-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    SYSTEM ACTIVE • 24.05 FPS
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setShowExemptionModal(true)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/10"
                        >
                            <Plus className="h-4 w-4" /> Fast Exemption
                        </button>
                    </header>

                    {/* Camera Feed Container */}
                    <div className="relative aspect-video bg-black rounded-3xl border border-neutral-800 overflow-hidden shadow-2xl group">
                        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale contrast-125 opacity-40" />
                        
                        {/* Detection Overlays */}
                        <div className="absolute inset-0 pointer-events-none">
                            {detections.map(det => {
                                const isExempt = exemptions.some(e => e.name.toLowerCase() === det.student.toLowerCase());
                                const colorClass = isExempt ? 'border-emerald-500 bg-emerald-500/10' : 
                                                 det.status === 'Bunking' ? 'border-red-500 bg-red-500/10' : 
                                                 'border-blue-500 bg-blue-500/10';
                                
                                return (
                                    <div key={det.id} className={`absolute border-2 transition-all duration-700 rounded-sm ${colorClass}`}
                                         style={{ left: `${det.x}%`, top: `${det.y}%`, width: `${det.w}%`, height: `${det.h}%` }}>
                                        <div className="absolute -top-6 left-0 whitespace-nowrap bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                            {isExempt ? 'AUTHORIZED' : det.student} • {det.location}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar Alerts */}
                <aside className="col-span-12 lg:col-span-3 border-l border-neutral-900 bg-neutral-950/50 p-4 overflow-y-auto">
                    <div className="flex items-center gap-2 mb-6 text-neutral-400">
                        <Bell className="h-4 w-4" />
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em]">Incident Log</h2>
                    </div>
                    
                    <div className="space-y-3">
                        {alerts.map(a => (
                            <div key={a.id} className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 animate-in slide-in-from-right-4 duration-500">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-red-400 text-[10px] font-black uppercase tracking-widest bg-red-400/10 px-2 py-0.5 rounded">Violation</span>
                                    <span className="text-neutral-500 text-[10px] font-mono">{a.time}</span>
                                </div>
                                <h3 className="font-bold text-sm text-white">{a.student}</h3>
                                <p className="text-xs text-neutral-400 mb-3">Detected at <span className="text-neutral-200">{a.location}</span></p>
                                <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${a.messageSent ? 'text-emerald-500' : 'text-amber-500'}`}>
                                    {a.messageSent ? <CheckCircle className="h-3 w-3" /> : <Loader2 className="h-3 w-3 animate-spin" />}
                                    {a.messageSent ? 'Advisor Notified' : 'Dispatching SMS...'}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </main>

            {/* Exemption Modal */}
            {showExemptionModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl">
                        <h2 className="text-2xl font-black mb-6">Quick Exemption</h2>
                        <form onSubmit={handleAddExemption} className="space-y-4">
                            <input 
                                className="w-full bg-neutral-800 border-none rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-emerald-500"
                                placeholder="Student Full Name"
                                value={newExemption.name}
                                onChange={e => setNewExemption({...newExemption, name: e.target.value})}
                            />
                            <button className="w-full bg-emerald-500 py-4 rounded-2xl font-black text-neutral-950 uppercase tracking-widest">Authorize Access</button>
                            <button type="button" onClick={() => setShowExemptionModal(false)} className="w-full text-neutral-500 font-bold py-2">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LiveMonitor;
