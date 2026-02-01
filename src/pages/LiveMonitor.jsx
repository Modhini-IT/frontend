import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Video, VideoOff, Plus, Activity, UserPlus, AlertTriangle, MapPin, Clock, CheckCircle, Loader2 } from 'lucide-react';

const uid = () => Math.random().toString(36).substr(2, 9);
const now = () => new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

const statusConfig = {
  'Bunking': { border: 'border-red-500/80', bg: 'bg-red-500/10', labelBg: 'bg-red-500/90', text: 'text-red-400', color: '#ef4444' },
  'Authorized': { border: 'border-green-500/80', bg: 'bg-green-500/10', labelBg: 'bg-green-500/90', text: 'text-green-400', color: '#22c55e' },
  'In Class': { border: 'border-blue-500/80', bg: 'bg-blue-500/10', labelBg: 'bg-blue-500/90', text: 'text-blue-400', color: '#3b82f6' }
};

const sampleStudents = ['John Doe', 'Jane Smith', 'Alex Lee', 'Priya Patel', 'Wei Chen', 'Carlos Ramirez', 'Aisha Khan', 'Emily Clark'];
const sampleLocations = ['Cafeteria', 'Library', 'Quad', 'Gym', 'Parking Lot', 'Corridor', 'Garden', 'Room 101', 'Room 202', 'Lecture Hall A'];
const reasons = ['Sports Competition', 'Medical', 'Library Duty', 'Lab Prep', 'Placement Event'];

const initialDetections = [
  { id: '1', name: 'Alex Lee', status: 'Authorized', x: 25, y: 15, w: 18, h: 35, location: 'Cafeteria' },
  { id: '2', name: 'Wei Chen', status: 'In Class', x: 45, y: 35, w: 12, h: 28, location: 'Room 101' },
  { id: '3', name: 'John Doe', status: 'Bunking', x: 30, y: 55, w: 16, h: 32, location: 'Parking Lot' },
  { id: '4', name: 'Carlos Ramirez', status: 'In Class', x: 10, y: 65, w: 15, h: 28, location: 'Room 202' }
];

export default function LiveMonitor() {
  const [detections, setDetections] = useState(initialDetections);
  const [activeAlert, setActiveAlert] = useState({
    id: 'alert-1',
    studentName: 'JOHN DOE',
    location: 'Parking Lot',
    timestamp: '10:47:28 AM',
    notified: true
  });
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [exemptions, setExemptions] = useState([]);
  const [newName, setNewName] = useState('');
  const [newReason, setNewReason] = useState('');
  const [classes, setClasses] = useState([
    { name: 'CS101', expected: 60, current: 54 },
    { name: 'EE207', expected: 45, current: 42 },
    { name: 'MA110', expected: 50, current: 48 },
    { name: 'BIO150', expected: 40, current: 36 }
  ]);
  
  const videoRef = useRef(null);

  useEffect(() => {
    if (isWebcamActive && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream; })
        .catch(() => setIsWebcamActive(false));
    } else if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }, [isWebcamActive]);

  const simulateDetection = () => {
    const name = sampleStudents[Math.floor(Math.random() * sampleStudents.length)];
    const isBunking = Math.random() > 0.6;
    let status = 'In Class';
    let location = sampleLocations[Math.floor(Math.random() * sampleLocations.length)];

    if (isBunking) {
      status = Math.random() > 0.5 ? 'Authorized' : 'Bunking';
      if (status === 'Bunking') {
        setActiveAlert({
          id: uid(),
          studentName: name.toUpperCase(),
          location,
          timestamp: now(),
          notified: false
        });
        setTimeout(() => setActiveAlert(prev => prev ? { ...prev, notified: true } : null), 1500);
      }
    }

    const newDetection = {
      id: uid(),
      name,
      status,
      location,
      x: 10 + Math.random() * 70,
      y: 10 + Math.random() * 60,
      w: 12 + Math.random() * 10,
      h: 20 + Math.random() * 20
    };

    setDetections(prev => [newDetection, ...prev].slice(0, 6));
  };

  const addExemption = () => {
    if (newName && newReason) {
      setExemptions([...exemptions, { id: uid(), name: newName, reason: newReason }]);
      setNewName('');
      setNewReason('');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 flex flex-col font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="border-b border-neutral-800/50 bg-neutral-900/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 shadow-lg shadow-emerald-900/20">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Smart Campus</h1>
              <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-[0.2em]">Attendance & Bunking Tracker</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWebcamActive(!isWebcamActive)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${isWebcamActive ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/30' : 'bg-neutral-800 hover:bg-neutral-700 text-gray-300 border border-neutral-700'}`}
            >
              {isWebcamActive ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              <span>{isWebcamActive ? 'Stop Webcam' : 'Start Webcam'}</span>
            </button>
            <button
              onClick={simulateDetection}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-sm transition-all shadow-lg shadow-emerald-900/40 hover:shadow-emerald-900/60 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Simulation</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-6 grid grid-cols-12 gap-6">
        {/* Video Feed Section */}
        <section className="col-span-12 lg:col-span-9 space-y-6">
          <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-black aspect-[16/9] shadow-2xl shadow-black/50 group">
            {/* Video Layer */}
            <div className="absolute inset-0 bg-neutral-950">
              {isWebcamActive ? (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1] opacity-70 grayscale contrast-125" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-black">
                  <div className="text-center opacity-30">
                    <Video className="w-20 h-20 mx-auto mb-4 text-neutral-600" />
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500">Signal Encrypted / Standby</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
            </div>

            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(transparent_50%,_rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />

            {/* Detection Boxes */}
            {detections.map((d) => {
              const styles = statusConfig[d.status];
              return (
                <div
                  key={d.id}
                  className={`absolute rounded-lg border-2 backdrop-blur-sm transition-all duration-500 ${styles.border} ${styles.bg}`}
                  style={{ 
                    left: `${d.x}%`, 
                    top: `${d.y}%`, 
                    width: `${d.w}%`, 
                    height: `${d.h}%`,
                    boxShadow: `0 0 30px ${styles.color}30, inset 0 0 20px ${styles.color}10`
                  }}
                >
                  <div className={`absolute -top-12 left-0 ${styles.labelBg} text-white px-3 py-1.5 rounded-md text-[11px] font-bold whitespace-nowrap border border-white/20 shadow-xl backdrop-blur-md`}>
                    <div className="leading-tight">{d.name}</div>
                    <div className="text-[9px] opacity-90 font-medium leading-tight mt-0.5">{d.status} • {d.location}</div>
                  </div>
                </div>
              );
            })}

            {/* Corner Markers */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-emerald-500/50 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-emerald-500/50 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-emerald-500/50 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-emerald-500/50 rounded-br-lg" />
          </div>

          {/* Bottom Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Logs */}
            <div className="rounded-xl p-6 bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-sm shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-400">Attendance Logs</h3>
              </div>
              <div className="space-y-5">
                {classes.map((c) => (
                  <div key={c.name} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-neutral-500 tracking-wider">{c.name}</span>
                      <span className="text-neutral-300 font-mono">{c.current}/{c.expected}</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.6)] transition-all duration-1000 ease-out" 
                        style={{ width: `${(c.current/c.expected)*100}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fast Exemption */}
            <div className="rounded-xl p-6 bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-sm shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <UserPlus className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-400">Fast Exemption</h3>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Student Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                />
                <div className="relative">
                  <select
                    value={newReason}
                    onChange={(e) => setNewReason(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select Reason</option>
                    {reasons.map(r => <option key={r} value={r} className="bg-neutral-900">{r}</option>)}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"><path d="M0 0h10L5 6 0 0z"/></svg>
                  </div>
                </div>
                <button
                  onClick={addExemption}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 active:scale-[0.98] mt-2"
                >
                  Grant Exemption
                </button>
              </div>
              {exemptions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-neutral-800 space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                  {exemptions.map((ex) => (
                    <div key={ex.id} className="flex justify-between items-center text-xs py-2 px-3 rounded bg-neutral-950/50 border border-neutral-800/50">
                      <span className="text-neutral-300 font-medium">{ex.name}</span>
                      <span className="text-purple-400 text-[10px] uppercase tracking-wider font-bold">{ex.reason}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Right Sidebar - Active Alert */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="rounded-xl p-6 bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-sm shadow-xl lg:sticky lg:top-24">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-400">Active Alert</h3>
              </div>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
            </div>

            {activeAlert ? (
              <div className="space-y-4">
                <div className="bg-neutral-950/80 rounded-xl p-5 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide uppercase">{activeAlert.studentName}</h4>
                      <div className="flex flex-col gap-1.5 mt-3 text-[11px] text-neutral-500 font-medium">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-neutral-600" />
                          {activeAlert.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-neutral-600" />
                          {activeAlert.timestamp}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 pt-4 border-t border-neutral-800/50 text-[11px] font-bold uppercase tracking-wider ${activeAlert.notified ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {activeAlert.notified ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Advisor Notified</span>
                      </>
                    ) : (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Dispatching Alert...</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Mini Detections List */}
                <div className="pt-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-4">Recent Detections</h4>
                  <div className="space-y-2">
                    {detections.slice(0, 4).map((d) => (
                      <div key={d.id} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-neutral-950/30 border border-neutral-800/30 hover:border-neutral-700/50 transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]`} style={{ backgroundColor: statusConfig[d.status].color, color: statusConfig[d.status].color }} />
                          <span className="text-xs font-medium text-neutral-300 group-hover:text-white transition-colors">{d.name}</span>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${statusConfig[d.status].text}`}>
                          {d.status === 'In Class' ? 'Class' : d.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="inline-flex p-4 rounded-full bg-neutral-950/50 mb-3">
                  <ShieldCheck className="w-8 h-8 text-neutral-700" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">No Active Violations</p>
                <p className="text-[10px] text-neutral-700 mt-1">System monitoring...</p>
              </div>
            )}
          </div>
        </aside>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #262626;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #404040;
        }
      `}</style>
    </div>
  );
}
export default LiveMonitor;
