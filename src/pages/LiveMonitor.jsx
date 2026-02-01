import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Camera, 
  Plus, 
  Video, 
  Activity, 
  UserPlus, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Loader2 
} from 'lucide-react';

const LiveMonitor = () => {
  const uid = () => Math.random().toString(36).slice(2);
  const now = () => new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  
  const statusConfig = {
    'Bunking': { 
      border: 'border-red-500', 
      bg: 'bg-red-500/10', 
      labelBg: 'bg-red-500', 
      text: 'text-red-400',
      glow: 'shadow-red-500/20'
    },
    'Authorized': { 
      border: 'border-emerald-500', 
      bg: 'bg-emerald-500/10', 
      labelBg: 'bg-emerald-500', 
      text: 'text-emerald-400',
      glow: 'shadow-emerald-500/20'
    },
    'In Class': { 
      border: 'border-blue-500', 
      bg: 'bg-blue-500/10', 
      labelBg: 'bg-blue-500', 
      text: 'text-blue-400',
      glow: 'shadow-blue-500/20'
    }
  };

  const sampleStudents = ['John Doe', 'Jane Smith', 'Alex Lee', 'Wei Chen', 'Carlos Ramirez', 'Priya Patel'];
  const sampleLocations = ['Cafeteria', 'Parking Lot', 'Library', 'Gym', 'Quad', 'Room 101', 'Room 202'];
  const sampleReasons = ['Sports Competition', 'Medical', 'Library Duty', 'Lab Prep', 'Placement Event'];

  const [detections, setDetections] = useState([
    { id: '1', name: 'Alex Lee', status: 'Authorized', x: 20, y: 15, w: 18, h: 35, location: 'Cafeteria' },
    { id: '2', name: 'Wei Chen', status: 'In Class', x: 42, y: 30, w: 12, h: 25, location: 'Room 101' },
    { id: '3', name: 'John Doe', status: 'Bunking', x: 28, y: 50, w: 14, h: 30, location: 'Parking Lot' },
    { id: '4', name: 'Carlos Ramirez', status: 'In Class', x: 8, y: 60, w: 14, h: 28, location: 'Room 202' },
    { id: '5', name: 'Wei Chen', status: 'Authorized', x: 65, y: 25, w: 12, h: 22, location: 'Quad' }
  ]);
  
  const [activeAlert, setActiveAlert] = useState({
    studentName: 'JOHN DOE',
    location: 'Parking Lot',
    timestamp: '10:47:28 AM',
    notified: true
  });
  
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [exemptions, setExemptions] = useState([
    { id: '1', name: 'modhini', reason: 'Medical' },
    { id: '2', name: 'Jane Smith', reason: 'Medical' },
    { id: '3', name: 'Alex Lee', reason: 'Sports Competition' }
  ]);
  const [newExName, setNewExName] = useState('');
  const [newExReason, setNewExReason] = useState('');
  const [classes] = useState([
    { name: 'CS101', expected: 60, current: 54 },
    { name: 'EE207', expected: 45, current: 42 },
    { name: 'MA110', expected: 50, current: 48 },
    { name: 'BIO150', expected: 40, current: 36 }
  ]);
  
  const videoRef = useRef(null);

  useEffect(() => {
    if (isWebcamActive && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => { 
          if (videoRef.current) videoRef.current.srcObject = stream; 
        })
        .catch(() => setIsWebcamActive(false));
    } else if (!isWebcamActive && videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }, [isWebcamActive]);

  const simulateDetection = () => {
    const name = sampleStudents[Math.floor(Math.random() * sampleStudents.length)];
    const rand = Math.random();
    let status = 'In Class';
    let location = sampleLocations[Math.floor(Math.random() * sampleLocations.length)];

    if (rand > 0.6) {
      if (rand > 0.85) {
        status = 'Authorized';
      } else {
        status = 'Bunking';
        setActiveAlert({
          studentName: name.toUpperCase(),
          location: location,
          timestamp: now(),
          notified: false
        });
        setTimeout(() => {
          setActiveAlert(prev => ({ ...prev, notified: true }));
        }, 1500);
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
      h: 20 + Math.random() * 15
    };

    setDetections(prev => [newDetection, ...prev].slice(0, 6));
  };

  const addExemption = () => {
    if (newExName.trim() && newExReason) {
      setExemptions([{ id: uid(), name: newExName, reason: newExReason }, ...exemptions]);
      setNewExName('');
      setNewExReason('');
    }
  };

  // Calculate stats
  const inClassCount = detections.filter(d => d.status === 'In Class').length;
  const authorizedCount = detections.filter(d => d.status === 'Authorized').length;
  const bunkingCount = detections.filter(d => d.status === 'Bunking').length;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col font-sans">
      {/* Header - Dark Navy */}
      <header className="border-b border-slate-800/50 bg-[#0f172a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Smart Campus</h1>
              <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-[0.2em]">Attendance & Bunking Tracker</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Start Webcam - Slate button (NOT black) */}
            <button
              onClick={() => setIsWebcamActive(!isWebcamActive)}
              className={`inline-flex items-center gap-2 rounded-lg transition px-4 py-2 text-sm font-medium border ${
                isWebcamActive 
                  ? 'bg-red-600 hover:bg-red-500 border-red-500 text-white shadow-lg shadow-red-900/30' 
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-200 shadow-lg shadow-slate-900/20'
              }`}
            >
              <Camera className="h-4 w-4" /> 
              <span>{isWebcamActive ? 'Stop Webcam' : 'Start Webcam'}</span>
            </button>
            
            {/* Simulation - Emerald button */}
            <button 
              onClick={simulateDetection} 
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition px-4 py-2 text-sm font-medium text-white border border-emerald-500 shadow-lg shadow-emerald-900/40"
            >
              <Plus className="h-4 w-4" /> Simulation
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-7xl w-full px-6 py-6 grid grid-cols-12 gap-6">
        {/* Left Column - Video Feed */}
        <section className="col-span-12 lg:col-span-8 space-y-6">
          {/* Video Container */}
          <div className="relative rounded-2xl border border-slate-800 bg-black overflow-hidden shadow-2xl aspect-video">
            {/* Video Feed */}
            <div className="absolute inset-0 bg-[#020617]">
              {isWebcamActive ? (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover scale-x-[-1] opacity-70 grayscale contrast-125" 
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-black">
                  <div className="text-center opacity-30">
                    <Video className="h-16 w-16 mb-4 text-slate-600 mx-auto" />
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">Signal Encrypted / Standby</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
            </div>

            {/* Detection Boxes */}
            {detections.map(d => {
              const styles = statusConfig[d.status];
              return (
                <div 
                  key={d.id} 
                  className={`absolute ${styles.border} ${styles.bg} rounded-lg border-2 transition-all duration-500 ${styles.glow}`}
                  style={{
                    left: `${d.x}%`, 
                    top: `${d.y}%`, 
                    width: `${d.w}%`, 
                    height: `${d.h}%`,
                    boxShadow: `0 0 20px currentColor`
                  }}
                >
                  {/* Label above box */}
                  <div className={`absolute -top-12 left-0 ${styles.labelBg} text-white px-3 py-1.5 rounded-md text-[11px] font-bold whitespace-nowrap border border-white/20 shadow-lg`}>
                    <p className="leading-tight">{d.name}</p>
                    <p className="text-[9px] opacity-90 font-medium leading-tight">{d.status} • {d.location}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Attendance Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-xl bg-[#0f172a]/50 border border-slate-800/60">
              <div className="text-2xl font-bold text-blue-400">{inClassCount}</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">In Class</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-[#0f172a]/50 border border-slate-800/60">
              <div className="text-2xl font-bold text-emerald-400">{authorizedCount}</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Authorized</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-[#0f172a]/50 border border-slate-800/60">
              <div className="text-2xl font-bold text-red-400">{bunkingCount}</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Bunking</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-[#0f172a]/50 border border-slate-800/60">
              <div className="text-2xl font-bold text-slate-200">{detections.length}</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Total</div>
            </div>
          </div>

          {/* Bottom Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Logs */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0f172a]/40">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-400" /> Attendance Logs
              </h3>
              <div className="space-y-4">
                {classes.map(c => (
                  <div key={c.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-500">{c.name}</span>
                      <span className="text-slate-300">{c.current}/{c.expected}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" 
                        style={{width: `${(c.current/c.expected)*100}%`}}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fast Exemption */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0f172a]/40">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-purple-400" /> Fast Exemption
              </h3>
              <div className="space-y-3">
                <input 
                  value={newExName} 
                  onChange={e => setNewExName(e.target.value)} 
                  placeholder="Student Name" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition"
                />
                <select 
                  value={newExReason} 
                  onChange={e => setNewExReason(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50 transition appearance-none"
                >
                  <option value="">Select Reason</option>
                  {sampleReasons.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <button 
                  onClick={addExemption} 
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold transition border border-slate-700"
                >
                  Grant Exemption
                </button>
              </div>
              
              {/* Active Exemptions List */}
              <div className="mt-6 space-y-2 max-h-32 overflow-y-auto">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Active Exemptions ({exemptions.length})</h4>
                {exemptions.map(ex => (
                  <div key={ex.id} className="flex justify-between items-center text-xs py-2 border-b border-slate-800/50 last:border-0">
                    <span className="text-slate-300">{ex.name}</span>
                    <span className="text-slate-400 text-[10px] bg-slate-800/50 px-2 py-1 rounded">{ex.reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Right Sidebar - Active Alert */}
        <aside className="col-span-12 lg:col-span-4">
          <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/40 overflow-hidden shadow-xl sticky top-24">
            <div className="px-6 py-4 border-b border-slate-800 bg-[#0f172a]/60">
              <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" /> Active Alert
              </h3>
            </div>
            
            <div className="p-6">
              {/* Alert Card */}
              <div className="bg-[#020617] rounded-xl p-5 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)] mb-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wide">{activeAlert.studentName}</h4>
                    <div className="flex flex-col gap-1 mt-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> {activeAlert.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> {activeAlert.timestamp}
                      </span>
                    </div>
                  </div>
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                
                <div className={`flex items-center gap-2 pt-3 border-t border-slate-800 text-[11px] font-bold uppercase tracking-wider ${activeAlert.notified ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {activeAlert.notified ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>Advisor Notified</span>
                    </>
                  ) : (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Dispatching SMS...</span>
                    </>
                  )}
                </div>
              </div>

              {/* Recent Detections */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Recent Detections</h4>
                {detections.slice(0, 4).map(d => (
                  <div key={d.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#020617]/50 border border-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-2 h-2 rounded-full ${d.status === 'Bunking' ? 'bg-red-500' : d.status === 'Authorized' ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                      />
                      <span className="text-xs font-medium text-slate-300">{d.name}</span>
                    </div>
                    <span className={`text-[10px] font-bold uppercase ${statusConfig[d.status].text}`}>
                      {d.status === 'In Class' ? 'Class' : d.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default LiveMonitor;
