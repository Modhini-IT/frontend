import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Camera, 
  Plus, 
  VideoOff,
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
  const now = () => new Date().toLocaleTimeString('en-US', { hour12: false });
  
  const statusConfig = {
    'Bunking': { 
      border: 'border-red-500', 
      bg: 'bg-red-500/10', 
      labelBg: 'bg-red-600', 
      text: 'text-red-400'
    },
    'Authorized': { 
      border: 'border-emerald-500', 
      bg: 'bg-emerald-500/10', 
      labelBg: 'bg-emerald-600', 
      text: 'text-emerald-400'
    },
    'In Class': { 
      border: 'border-blue-500', 
      bg: 'bg-blue-500/10', 
      labelBg: 'bg-blue-600', 
      text: 'text-blue-400'
    }
  };

  const sampleStudents = ['John Doe', 'Jane Smith', 'Alex Lee', 'Wei Chen', 'Carlos Ramirez'];
  const sampleLocations = ['Cafeteria', 'Parking Lot', 'Library', 'Gym', 'Quad', 'Room 101'];

  const [detections, setDetections] = useState([
    { id: '1', name: 'Alex Lee', status: 'Authorized', x: 20, y: 15, w: 18, h: 30, location: 'Cafeteria' },
    { id: '2', name: 'Wei Chen', status: 'In Class', x: 40, y: 28, w: 14, h: 24, location: 'Room 101' },
    { id: '3', name: 'John Doe', status: 'Bunking', x: 28, y: 45, w: 16, h: 28, location: 'Parking Lot' },
    { id: '4', name: 'John Doe', status: 'In Class', x: 45, y: 42, w: 14, h: 24, location: 'Lecture Hall A' },
    { id: '5', name: 'Wei Chen', status: 'Authorized', x: 62, y: 20, w: 14, h: 24, location: 'Quad' },
    { id: '6', name: 'Carlos Ramirez', status: 'In Class', x: 8, y: 48, w: 16, h: 28, location: 'Room 202' }
  ]);
  
  const [activeAlert, setActiveAlert] = useState({
    studentName: 'JOHN DOE',
    location: 'Parking Lot',
    timestamp: '10:47:28 AM',
    notified: true
  });
  
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  
  const videoRef = useRef(null);

  // Handle webcam toggle
  useEffect(() => {
    const startWebcam = async () => {
      try {
        if (isWebcamActive) {
          const mediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              width: { ideal: 1280 },
              height: { ideal: 720 }
            } 
          });
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
          setError(null);
        } else {
          if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
          }
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
        }
      } catch (err) {
        console.error("Webcam error:", err);
        setError("Camera access denied");
        setIsWebcamActive(false);
      }
    };

    startWebcam();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isWebcamActive]);

  const simulateDetection = () => {
    const name = sampleStudents[Math.floor(Math.random() * sampleStudents.length)];
    const rand = Math.random();
    let status = 'In Class';
    let location = sampleLocations[Math.floor(Math.random() * sampleLocations.length)];

    if (rand > 0.6) {
      if (rand > 0.8) {
        status = 'Authorized';
      } else {
        status = 'Bunking';
        setActiveAlert({
          studentName: name.toUpperCase(),
          location: location,
          timestamp: now(),
          notified: false
        });
        setTimeout(() => setActiveAlert(prev => ({ ...prev, notified: true })), 1500);
      }
    }

    const newDetection = {
      id: uid(),
      name,
      status,
      location,
      x: 10 + Math.random() * 70,
      y: 10 + Math.random() * 60,
      w: 12 + Math.random() * 8,
      h: 20 + Math.random() * 12
    };

    setDetections(prev => [newDetection, ...prev].slice(0, 6));
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0f172a]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-[1400px] px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Smart Campus</h1>
              <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-[0.15em]">Attendance & Bunking Tracker</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Start/Stop Webcam Button */}
            <button
              onClick={() => setIsWebcamActive(!isWebcamActive)}
              className={`inline-flex items-center gap-2 rounded-lg transition px-4 py-2 text-sm font-medium ${
                isWebcamActive 
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/30' 
                  : 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600'
              }`}
            >
              {isWebcamActive ? <VideoOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
              <span>{isWebcamActive ? 'Stop Webcam' : 'Start Webcam'}</span>
            </button>
            
            <button 
              onClick={simulateDetection} 
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition px-4 py-2 text-sm font-medium text-white shadow-lg shadow-emerald-900/40"
            >
              <Plus className="h-4 w-4" /> 
              <span>Simulation</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-[1400px] w-full px-4 py-4 grid grid-cols-12 gap-4">
        {/* Left Column - Video Feed */}
        <section className="col-span-12 lg:col-span-9 space-y-4">
          {/* Video Container */}
          <div className="relative rounded-xl border border-slate-800 bg-black overflow-hidden shadow-2xl aspect-video">
            
            {/* WEBCAM FEED */}
            <video 
              ref={videoRef}
              autoPlay 
              playsInline 
              muted
              className={`absolute inset-0 w-full h-full object-cover transform scale-x-[-1] ${
                isWebcamActive ? 'opacity-100' : 'opacity-0'
              }`}
            />
            
            {/* Standby / Offline State */}
            {!isWebcamActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-black">
                <Camera className="h-16 w-16 mb-4 text-slate-700" />
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">
                  {error || "Camera Offline - Click Start Webcam"}
                </p>
              </div>
            )}

            {/* Overlay Effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none opacity-10" 
                 style={{ 
                   backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', 
                   backgroundSize: '50px 50px' 
                 }} 
            />

            {/* Detection Boxes */}
            {detections.map(d => {
              const styles = statusConfig[d.status];
              return (
                <div 
                  key={d.id} 
                  className={`absolute ${styles.border} ${styles.bg} rounded-lg border-2 transition-all duration-500 backdrop-blur-sm`}
                  style={{ 
                    left: `${d.x}%`, 
                    top: `${d.y}%`, 
                    width: `${d.w}%`, 
                    height: `${d.h}%`,
                    boxShadow: `0 0 20px currentColor`
                  }}
                >
                  <div className={`absolute -top-10 left-0 ${styles.labelBg} text-white px-3 py-1.5 rounded-md text-[11px] font-bold whitespace-nowrap border border-white/20 shadow-lg`}>
                    <p className="leading-tight">{d.name}</p>
                    <p className="text-[9px] opacity-90 font-medium leading-tight mt-0.5">{d.status} • {d.location}</p>
                  </div>
                </div>
              );
            })}

            {/* Recording Indicator */}
            {isWebcamActive && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live</span>
              </div>
            )}
          </div>

          {/* Bottom Panels */}
          <div className="grid grid-cols-2 gap-4">
            {/* Attendance Logs */}
            <div className="p-5 rounded-xl border border-slate-800 bg-[#0f172a]/60">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <Activity className="h-3.5 w-3.5 text-emerald-400" /> 
                Attendance Logs
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-500">CS101</span>
                    <span className="text-slate-300">54/60</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[90%] shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Fast Exemption */}
            <div className="p-5 rounded-xl border border-slate-800 bg-[#0f172a]/60">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <UserPlus className="h-3.5 w-3.5 text-purple-400" /> 
                Fast Exemption
              </h3>
              <input 
                placeholder="Student Name" 
                className="w-full bg-[#020617] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition mb-3"
              />
              <button className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold transition border border-slate-700">
                Grant Exemption
              </button>
            </div>
          </div>
        </section>

        {/* Right Sidebar - Active Alert */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="rounded-xl border border-slate-800 bg-[#0f172a]/60 p-4 sticky top-20">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            
            <div className="bg-[#020617] rounded-xl p-5 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
              <h4 className="text-base font-bold text-white uppercase tracking-wide text-center mb-4">
                {activeAlert.studentName}
              </h4>
              
              <div className="flex flex-col items-center gap-2 text-[11px] text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {activeAlert.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {activeAlert.timestamp}
                </span>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 pt-4 border-t border-slate-800">
                <CheckCircle className="h-4 w-4" />
                <span>Advisor Notified</span>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default LiveMonitor;
