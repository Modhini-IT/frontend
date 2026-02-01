import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ShieldCheck, 
  Camera, 
  Plus, 
  Video, 
  WifiOff, 
  Activity, 
  UserPlus, 
  Bell, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Loader2,
  ScanFace,
  Target
} from 'lucide-react';

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
const now = () => new Date().toLocaleTimeString();

const sampleStudents = ['John Doe', 'Jane Smith', 'Alex Lee', 'Priya Patel', 'Wei Chen', 'Carlos Ramirez', 'Aisha Khan', 'Emily Clark', 'Michael Brown', 'Sara Johnson'];
const sampleReasons = ['Sports Competition', 'Medical', 'Library Duty', 'Lab Prep', 'Placement Event'];
const sampleLocations = ['Cafeteria', 'Library', 'Quad', 'Gym', 'Parking Lot', 'Corridor', 'Garden'];
const inClassLocations = ['Room 101', 'Room 202', 'CS Lab', 'Lecture Hall A'];

function randomBox() {
  const w = 12 + Math.random() * 10;
  const h = 16 + Math.random() * 14;
  const x = Math.random() * (100 - w - 8) + 4;
  const y = Math.random() * (100 - h - 8) + 4;
  return { x, y, w, h };
}

function statusStyles(status) {
  switch (status) {
    case 'Bunking': return { 
      border: 'border-red-500', 
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.6)]',
      bg: 'bg-red-500/20', 
      text: 'text-red-100',
      badge: 'bg-red-600',
      corner: 'border-red-400'
    };
    case 'Authorized': return { 
      border: 'border-emerald-500', 
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.6)]',
      bg: 'bg-emerald-500/20', 
      text: 'text-emerald-100',
      badge: 'bg-emerald-600',
      corner: 'border-emerald-400'
    };
    case 'In Class': return { 
      border: 'border-blue-500', 
      glow: 'shadow-[0_0_20px_rgba(59,130,246,0.6)]',
      bg: 'bg-blue-500/20', 
      text: 'text-blue-100',
      badge: 'bg-blue-600',
      corner: 'border-blue-400'
    };
    default: return { 
      border: 'border-gray-500', 
      glow: 'shadow-[0_0_20px_rgba(107,114,128,0.4)]',
      bg: 'bg-gray-500/20', 
      text: 'text-gray-100',
      badge: 'bg-gray-600',
      corner: 'border-gray-400'
    };
  }
}

// Corner bracket component for detection boxes
const CornerBracket = ({ position, color }) => {
  const positions = {
    tl: 'top-0 left-0 border-t-4 border-l-4 rounded-tl-sm',
    tr: 'top-0 right-0 border-t-4 border-r-4 rounded-tr-sm',
    bl: 'bottom-0 left-0 border-b-4 border-l-4 rounded-bl-sm',
    br: 'bottom-0 right-0 border-b-4 border-r-4 rounded-br-sm'
  };
  return (
    <div className={`absolute w-5 h-5 ${positions[position]} ${color} -m-0.5`} />
  );
};

// Face detection overlay with scanning effect
const FaceDetectionOverlay = ({ detection }) => {
  const styles = statusStyles(detection.status);
  const [scanLine, setScanLine] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`absolute ${styles.glow} z-20`}
      style={{
        left: `${detection.x}%`, 
        top: `${detection.y}%`, 
        width: `${detection.w}%`, 
        height: `${detection.h}%`
      }}
    >
      {/* Main detection frame */}
      <div className={`relative w-full h-full border-2 ${styles.border} ${styles.bg} rounded-lg overflow-hidden`}>
        {/* Corner brackets */}
        <CornerBracket position="tl" color={styles.corner} />
        <CornerBracket position="tr" color={styles.corner} />
        <CornerBracket position="bl" color={styles.corner} />
        <CornerBracket position="br" color={styles.corner} />
        
        {/* Scanning line animation */}
        <div 
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-70"
          style={{ top: `${scanLine}%` }}
        />
        
        {/* Crosshair center */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className={`w-4 h-4 border ${styles.border} rounded-full`} />
        </div>
        
        {/* Corner targeting marks */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-white/50 rounded-full" />
        <div className="absolute top-1 right-1 w-2 h-2 bg-white/50 rounded-full" />
        <div className="absolute bottom-1 left-1 w-2 h-2 bg-white/50 rounded-full" />
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-white/50 rounded-full" />
      </div>
      
      {/* Info label - positioned above the box */}
      <div 
        className={`absolute -top-14 left-0 ${styles.badge} text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap flex items-center gap-2 min-w-max`}
      >
        <ScanFace className="h-4 w-4" />
        <div>
          <p className="text-xs font-bold">{detection.name}</p>
          <p className="text-[10px] opacity-90 font-medium flex items-center gap-1">
            <Target className="h-3 w-3" />
            {detection.status} • {detection.location}
          </p>
        </div>
        {/* Triangle pointer */}
        <div className={`absolute -bottom-2 left-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent ${styles.badge.replace('bg-', 'border-t-')}`} />
      </div>
      
      {/* Confidence score */}
      <div className={`absolute -bottom-6 right-0 ${styles.bg} ${styles.text} px-2 py-1 rounded text-[10px] font-bold border ${styles.border}`}>
        {(85 + Math.random() * 14).toFixed(1)}% MATCH
      </div>
    </div>
  );
};

function LiveMonitor() {
  const [detections, setDetections] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [exemptions, setExemptions] = useState([
    { id: '1', name: 'Jane Smith', reason: 'Medical' },
    { id: '2', name: 'Alex Lee', reason: 'Sports Competition' }
  ]);
  const [search, setSearch] = useState('');
  const [newExName, setNewExName] = useState('');
  const [newExReason, setNewExReason] = useState('');
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef(null);

  const filteredExemptions = useMemo(() => 
    exemptions.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.reason.toLowerCase().includes(search.toLowerCase())),
    [exemptions, search]
  );

  const [classes, setClasses] = useState([
    { name: 'CS101', expected: 60, current: 54 },
    { name: 'EE207', expected: 45, current: 42 },
    { name: 'MA110', expected: 50, current: 48 },
    { name: 'BIO150', expected: 40, current: 36 }
  ]);

  useEffect(() => {
    if (isWebcamActive && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => { 
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setScanning(true);
          }
        })
        .catch(err => { console.error(err); setIsWebcamActive(false); });
    } else if (!isWebcamActive && videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setScanning(false);
    }
  }, [isWebcamActive]);

  const simulateDetection = () => {
    const name = sampleStudents[Math.floor(Math.random() * sampleStudents.length)];
    const box = randomBox();
    const r = Math.random();
    let status, location;

    if (r < 0.45) {
      status = 'Bunking';
      location = sampleLocations[Math.floor(Math.random() * sampleLocations.length)];
      if (exemptions.some(e => e.name.toLowerCase() === name.toLowerCase())) {
        status = 'Authorized';
      } else {
        const id = uid();
        setAlerts(prev => [{ id, studentName: name, location, timestamp: now(), messageSent: false }, ...prev].slice(0, 20));
        setTimeout(() => setAlerts(prev => prev.map(a => a.id === id ? { ...a, messageSent: true } : a)), 1500);
      }
    } else if (r < 0.80) {
      status = 'Authorized';
      location = sampleLocations[Math.floor(Math.random() * sampleLocations.length)];
    } else {
      status = 'In Class';
      location = inClassLocations[Math.floor(Math.random() * inClassLocations.length)];
    }

    setDetections(prev => [{ id: uid(), name, status, ...box, location }, ...prev].slice(0, 6));
  };

  // Auto-simulate detections when webcam is active
  useEffect(() => {
    if (isWebcamActive) {
      const interval = setInterval(() => {
        if (Math.random() > 0.6) {
          simulateDetection();
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isWebcamActive, exemptions]);

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 flex flex-col">
      {/* Global scan line overlay */}
      {scanning && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent animate-scan" />
        </div>
      )}
      
      <style>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #404040; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #525252; }
      `}</style>

      <header className="border-b border-neutral-800/80 bg-neutral-900/80 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-tight text-white">Smart Campus</h1>
              <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-widest leading-none mt-1">AI-Powered Attendance & Security</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800/50 rounded-lg border border-neutral-700">
              <div className={`w-2 h-2 rounded-full ${isWebcamActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-xs font-medium text-neutral-400">{isWebcamActive ? 'LIVE' : 'OFFLINE'}</span>
            </div>
            <button
              onClick={() => setIsWebcamActive(!isWebcamActive)}
              className={`inline-flex items-center gap-2 rounded-lg transition px-4 py-2 text-sm font-medium ${isWebcamActive ? 'bg-red-600 hover:bg-red-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}
            >
              <Camera className="h-4 w-4" /> <span>{isWebcamActive ? 'Stop' : 'Start'} Camera</span>
            </button>
            <button onClick={simulateDetection} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition px-4 py-2 text-sm font-medium shadow-lg shadow-blue-900/40">
              <Plus className="h-4 w-4" /> Add Detection
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-7xl w-full px-6 py-6 grid grid-cols-12 gap-6">
        <section className="col-span-12 lg:col-span-8 space-y-6">
          {/* Main Camera Feed */}
          <div className="rounded-2xl border-2 border-neutral-700 bg-neutral-900 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-3 bg-neutral-800 border-b border-neutral-700">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-emerald-400" />
                  <h2 className="text-sm font-bold tracking-wide uppercase text-white">Surveillance Feed</h2>
                </div>
                {scanning && (
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded animate-pulse">
                    SCANNING...
                  </span>
                )}
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  <span className="text-[11px] uppercase font-bold text-blue-400">In Class</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="text-[11px] uppercase font-bold text-emerald-400">Authorized</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-[11px] uppercase font-bold text-red-400">Bunking</span>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-video bg-black overflow-hidden">
              {/* Grid overlay for tech effect */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
              
              {/* Vignette effect */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-10 pointer-events-none" />
              
              {isWebcamActive ? (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover scale-x-[-1] opacity-80 contrast-125 saturate-75" 
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900">
                  <div className="p-6 rounded-full bg-neutral-800/50 mb-4">
                    <WifiOff className="h-16 w-16 text-neutral-500" />
                  </div>
                  <p className="text-sm font-bold tracking-[0.2em] uppercase text-neutral-500">Camera Offline</p>
                  <p className="text-xs text-neutral-600 mt-2">Click "Start Camera" to begin surveillance</p>
                </div>
              )}
              
              {/* Face detection overlays */}
              {detections.map(d => (
                <FaceDetectionOverlay key={d.id} detection={d} />
              ))}
              
              {/* Corner brackets for feed */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-emerald-500/50 z-30" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-emerald-500/50 z-30" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-emerald-500/50 z-30" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-emerald-500/50 z-30" />
              
              {/* Timestamp overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur px-4 py-1.5 rounded-full border border-neutral-700 z-30">
                <span className="text-xs font-mono text-emerald-400">{new Date().toLocaleString()}</span>
              </div>
              
              {/* Detection count */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-neutral-700 z-30 flex items-center gap-2">
                <ScanFace className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">{detections.length} FACES DETECTED</span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
              <p className="text-2xl font-bold text-emerald-400">{detections.filter(d => d.status === 'In Class').length}</p>
              <p className="text-[10px] uppercase text-neutral-500 font-bold tracking-wider">In Class</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
              <p className="text-2xl font-bold text-blue-400">{detections.filter(d => d.status === 'Authorized').length}</p>
              <p className="text-[10px] uppercase text-neutral-500 font-bold tracking-wider">Authorized</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
              <p className="text-2xl font-bold text-red-400">{detections.filter(d => d.status === 'Bunking').length}</p>
              <p className="text-[10px] uppercase text-neutral-500 font-bold tracking-wider">Bunking</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
              <p className="text-2xl font-bold text-white">{detections.length}</p>
              <p className="text-[10px] uppercase text-neutral-500 font-bold tracking-wider">Total</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Logs */}
            <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900">
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-6 flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-400" /> Attendance Overview
              </h3>
              <div className="space-y-4">
                {classes.map(c => {
                  const percentage = (c.current / c.expected) * 100;
                  return (
                    <div key={c.name} className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-400 font-medium">{c.name}</span>
                        <span className="font-bold text-white">{c.current}/{c.expected} <span className="text-neutral-500">({percentage.toFixed(0)}%)</span></span>
                      </div>
                      <div className="h-2.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            percentage >= 90 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' :
                            percentage >= 75 ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' :
                            'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                          }`} 
                          style={{width: `${percentage}%`}}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Fast Exemption */}
            <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900">
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-6 flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-purple-400" /> Add Exemption
              </h3>
              <div className="space-y-3">
                <input 
                  value={newExName} 
                  onChange={e => setNewExName(e.target.value)} 
                  placeholder="Student Name" 
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition outline-none text-white placeholder-neutral-600"
                />
                <select 
                  value={newExReason} 
                  onChange={e => setNewExReason(e.target.value)} 
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition appearance-none text-white"
                >
                  <option value="" className="bg-neutral-900">Select Reason</option>
                  {sampleReasons.map(r => <option key={r} value={r} className="bg-neutral-900">{r}</option>)}
                </select>
                <button 
                  onClick={() => { 
                    if(newExName && newExReason) { 
                      setExemptions([{id: uid(), name: newExName, reason: newExReason}, ...exemptions]); 
                      setNewExName(''); 
                      setNewExReason(''); 
                    } 
                  }} 
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-bold transition shadow-lg shadow-purple-900/30"
                >
                  Grant Exemption
                </button>
              </div>
              
              {/* Exemption list preview */}
              <div className="mt-4 pt-4 border-t border-neutral-800">
                <p className="text-[10px] uppercase text-neutral-500 font-bold mb-2">Active Exemptions ({exemptions.length})</p>
                <div className="space-y-1 max-h-20 overflow-y-auto custom-scrollbar">
                  {exemptions.slice(0, 3).map(e => (
                    <div key={e.id} className="flex justify-between text-xs py-1">
                      <span className="text-neutral-300">{e.name}</span>
                      <span className="text-purple-400">{e.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Incident List Sidebar */}
        <aside className="col-span-12 lg:col-span-4 h-fit">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-800/50 flex justify-between items-center">
              <h3 className="text-xs font-bold tracking-widest uppercase flex items-center gap-2 text-white">
                <Bell className="h-4 w-4 text-amber-500" /> Security Alerts
              </h3>
              <span className="text-[10px] font-bold bg-red-500/20 text-red-400 px-2.5 py-1 rounded-full">
                {alerts.length} ACTIVE
              </span>
            </div>
            <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
              {alerts.map(a => (
                <div 
                  key={a.id} 
                  className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-red-500/50 transition-all group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      </div>
                      <h4 className="text-sm font-bold text-white">{a.studentName}</h4>
                    </div>
                    <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-bold">BUNK</span>
                  </div>
                  <div className="flex gap-4 text-xs text-neutral-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> {a.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {a.timestamp}
                    </span>
                  </div>
                  <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${a.messageSent ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {a.messageSent ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        <span>Advisor Notified</span>
                      </>
                    ) : (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending Alert...</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
              {alerts.length === 0 && (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <ShieldCheck className="h-8 w-8 text-emerald-500" />
                  </div>
                  <p className="text-sm font-bold text-neutral-500 uppercase tracking-wider">No Violations</p>
                  <p className="text-xs text-neutral-600 mt-1">All students are accounted for</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800">
            <p className="text-[10px] uppercase text-neutral-500 font-bold mb-3">System Status</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Camera Status</span>
                <span className={isWebcamActive ? 'text-emerald-400' : 'text-red-400'}>
                  {isWebcamActive ? 'Operational' : 'Offline'}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Face Recognition</span>
                <span className="text-emerald-400">Active</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">SMS Alerts</span>
                <span className="text-emerald-400">Enabled</span>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <footer className="p-6 mt-auto border-t border-neutral-800 bg-neutral-900/50">
        <div className="mx-auto max-w-7xl flex justify-between items-center text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-600">
          <span>Smart Campus Tracker v2.5.0</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Secure Connection
          </span>
        </div>
      </footer>
    </div>
  );
}
export default LiveMonitor;
