import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Video, Plus, Activity, UserPlus, AlertTriangle, MapPin, Clock, CheckCircle, Loader2 } from 'lucide-react';

const LiveMonitor = () => {
  const uid = () => Math.random().toString(36).substr(2, 9);
  const now = () => new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  
  // Color scheme matching the uploaded images
  const statusConfig = {
    'Bunking': { 
      border: 'border-red-500', 
      bg: 'bg-red-500/10', 
      labelBg: 'bg-red-500', 
      text: 'text-red-400',
      shadow: 'shadow-red-500/20'
    },
    'Authorized': { 
      border: 'border-emerald-500', 
      bg: 'bg-emerald-500/10', 
      labelBg: 'bg-emerald-500', 
      text: 'text-emerald-400',
      shadow: 'shadow-emerald-500/20'
    },
    'In Class': { 
      border: 'border-blue-500', 
      bg: 'bg-blue-500/10', 
      labelBg: 'bg-blue-500', 
      text: 'text-blue-400',
      shadow: 'shadow-blue-500/20'
    }
  };

  const sampleStudents = ['John Doe', 'Jane Smith', 'Alex Lee', 'Wei Chen', 'Carlos Ramirez', 'Priya Patel', 'Emily Davis'];
  const sampleLocations = ['Cafeteria', 'Parking Lot', 'Library', 'Gym', 'Room 101', 'Room 202', 'Lecture Hall A', 'Quad'];
  const reasons = ['Sports Competition', 'Medical', 'Library Duty', 'Lab Prep', 'Placement Event'];

  const [detections, setDetections] = useState([
    { id: '1', name: 'Alex Lee', status: 'Authorized', x: 20, y: 12, w: 16, h: 30, location: 'Cafeteria' },
    { id: '2', name: 'Wei Chen', status: 'In Class', x: 42, y: 35, w: 14, h: 26, location: 'Room 101' },
    { id: '3', name: 'John Doe', status: 'Bunking', x: 55, y: 55, w: 15, h: 28, location: 'Parking Lot' },
    { id: '4', name: 'Carlos Ramirez', status: 'In Class', x: 15, y: 62, w: 13, h: 24, location: 'Room 202' },
    { id: '5', name: 'Wei Chen', status: 'Authorized', x: 65, y: 28, w: 12, h: 22, location: 'Quad' }
  ]);
  
  const [activeAlert, setActiveAlert] = useState({
    id: 'alert-1',
    studentName: 'JOHN DOE',
    location: 'Parking Lot',
    timestamp: '10:47:28 AM',
    notified: true
  });
  
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [exemptions, setExemptions] = useState([
    { id: 'e1', name: 'modhini', reason: 'Medical' },
    { id: 'e2', name: 'Jane Smith', reason: 'Medical' },
    { id: 'e3', name: 'Alex Lee', reason: 'Sports Competition' }
  ]);
  const [newName, setNewName] = useState('');
  const [newReason, setNewReason] = useState('');
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
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
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
          id: uid(),
          studentName: name.toUpperCase(),
          location: location,
          timestamp: now(),
          notified: false
        });
        setTimeout(() => {
          setActiveAlert(prev => prev ? { ...prev, notified: true } : null);
        }, 1500);
      }
    } else {
      status = 'In Class';
      location = ['Room 101', 'Room 202', 'Lecture Hall A'][Math.floor(Math.random() * 3)];
    }

    const newDetection = {
      id: uid(),
      name: name,
      status: status,
      location: location,
      x: 8 + Math.random() * 75,
      y: 8 + Math.random() * 65,
      w: 12 + Math.random() * 8,
      h: 18 + Math.random() * 12
    };

    setDetections(prev => [newDetection, ...prev].slice(0, 6));
  };

  const addExemption = () => {
    if (newName.trim() && newReason) {
      setExemptions([...exemptions, { id: uid(), name: newName, reason: newReason }]);
      setNewName('');
      setNewReason('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col font-sans">
      {/* Header - Matching the dark navy style */}
      <header className="border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Smart Campus</h1>
              <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-[0.2em]">Attendance & Bunking Tracker</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Start Webcam - Slate with border (NOT black) */}
            <button
              onClick={() => setIsWebcamActive(!isWebcamActive)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all border ${
                isWebcamActive 
                  ? 'bg-red-600 hover:bg-red-500 border-red-500 text-white shadow-lg shadow-red-900/30' 
                  : 'bg-slate-800/80 hover:bg-slate-700 border-slate-600 text-slate-200 shadow-lg shadow-slate-900/20'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>{isWebcamActive ? 'Stop Webcam' : 'Start Webcam'}</span>
            </button>
            
            {/* Simulation Button - Emerald Primary */}
            <button
              onClick={simulateDetection}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-all border border-emerald-500 shadow-lg shadow-emerald-900/40 hover:shadow-emerald-900/60"
            >
              <Plus className="w-4 h-4" />
              <span>Simulation</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 grid grid-cols-12 gap-6">
        {/* Left Column */}
        <section className="col-span-12 lg:col-span-8 space-y-6">
          {/* Video Feed with Detection Boxes */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black aspect-video shadow-2xl shadow-black/50">
            {/* Video Layer */}
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
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-black">
                  <div className="text-center opacity-30">
                    <Video className="w-20 h-20 mx-auto mb-4 text-slate-600" />
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Signal Encrypted / Standby</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            </div>

            {/* Status Legend Overlay */}
            <div className="absolute top-4 right-4 flex gap-4 bg-black/40 backdrop-blur-md rounded-lg px-4 py-2 border border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-[10px] font-semibold text-blue-400 uppercase">In Class</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] font-semibold text-emerald-400 uppercase">Authorized</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="text-[10px] font-semibold text-red-400 uppercase">Bunking</span>
              </div>
            </div>

            {/* Detection Boxes */}
            {detections.map((d) => {
              const style = statusConfig[d.status];
              return (
                <div
                  key={d.id}
                  className={`absolute rounded-lg border-2 backdrop-blur-sm transition-all duration-500 ${style.border} ${style.bg} ${style.shadow}`}
                  style={{ 
                    left: `${d.x}%`, 
                    top: `${d.y}%`, 
                    width: `${d.w}%`, 
                    height: `${d.h}%`,
                    boxShadow: `0 0 25px -5px currentColor`
                  }}
                >
                  <div className={`absolute -top-12 left-0 ${style.labelBg} text-white px-3 py-1.5 rounded-md text-[11px] font-bold whitespace-nowrap border border-white/20 shadow-xl`}>
                    <div className="leading-tight">{d.name}</div>
                    <div className="text-[9px] opacity-90 font-medium leading-tight mt-0.5">{d.status} • {d.location}</div>
                  </div>
                </div>
              );
            })}

            {/* Scanline Effects */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,_rgba(16,185,129,0.03)_50%)] bg-[length:100%_4px] opacity-30" />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
              <div className="text-2xl font-bold text-emerald-400">1</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">In Class</div>
            </div>
            <div className="text-center p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
              <div className="text-2xl font-bold text-emerald-400">4</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Authorized</div>
            </div>
            <div className="text-center p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
              <div className="text-2xl font-bold text-red-400">1</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Bunking</div>
            </div>
            <div className="text-center p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
              <div className="text-2xl font-bold text-slate-200">6</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Total</div>
            </div>
          </div>

          {/* Bottom Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Overview */}
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-200 tracking-wide">Attendance Overview</h3>
              </div>
              <div className="space-y-4">
                {classes.map((c) => (
                  <div key={c.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-400 w-16">{c.name}</span>
                    <div className="flex-1 mx-4">
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${(c.current/c.expected)*100}%` }} 
                        />
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-300 w-16 text-right">{c.current}/{c.expected} ({Math.round((c.current/c.expected)*100)}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fast Exemption */}
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <UserPlus className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-slate-200 tracking-wide">Add Exemption</h3>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Student Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
                <select
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors appearance-none"
                  style={{ backgroundImage: 'none' }}
                >
                  <option value="">Select Reason</option>
                  {reasons.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <button
                  onClick={addExemption}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold transition-colors border border-slate-700"
                >
                  Grant Exemption
                </button>
              </div>
              
              {/* Active Exemptions List */}
              <div className="mt-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Active Exemptions ({exemptions.length})</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {exemptions.map((ex) => (
                    <div key={ex.id} className="flex justify-between items-center text-sm py-2 border-b border-slate-800/50 last:border-0">
                      <span className="text-slate-300">{ex.name}</span>
                      <span className="text-purple-400 text-xs font-medium bg-purple-500/10 px-2 py-1 rounded">{ex.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Sidebar - Active Alert */}
        <aside className="col-span-12 lg:col-span-4 space-y-6">
          <div className="rounded-xl p-6 bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm lg:sticky lg:top-24">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <h3 className="text-sm font-bold text-slate-200">Incident List</h3>
              </div>
              <span className="text-[10px] font-bold bg-slate-800 px-2 py-1 rounded text-slate-400">{detections.filter(d => d.status === 'Bunking').length} ITEMS</span>
            </div>

            {activeAlert && (
              <div className="bg-slate-950/80 rounded-xl p-5 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wide">{activeAlert.studentName}</h4>
                    <div className="flex flex-col gap-1.5 mt-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" />
                        {activeAlert.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        {activeAlert.timestamp}
                      </span>
                    </div>
                  </div>
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                
                <div className={`flex items-center gap-2 pt-4 border-t border-slate-800 text-[11px] font-bold uppercase tracking-wider ${activeAlert.notified ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {activeAlert.notified ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Advisor Notified</span>
                    </>
                  ) : (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Dispatching SMS...</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Recent Detections List */}
            <div className="mt-6 space-y-3">
              {detections.filter(d => d.status === 'Bunking').slice(0, 3).map((d) => (
                <div key={d.id} className="bg-slate-950/30 border border-slate-800 rounded-lg p-3 group hover:border-red-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-bold text-slate-200 uppercase">{d.name}</span>
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex gap-3 text-[10px] text-slate-500">
                    <span>{d.location}</span>
                    <span>•</span>
                    <span>{now()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Logs Side Panel */}
          <div className="rounded-xl p-6 bg-slate-900/40 border border-slate-800/60">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> Attendance Logs
            </h3>
            <div className="space-y-3">
              {classes.slice(0, 1).map((c) => (
                <div key={c.name}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-400">{c.name}</span>
                    <span className="text-white font-bold">{c.current}/{c.expected}</span>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${(c.current/c.expected)*100}%` }} />
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <input 
                  type="text" 
                  placeholder="Student Name" 
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-300 placeholder-slate-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default LiveMonitor;
