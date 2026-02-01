import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Video, VideoOff, Plus, Activity, UserPlus, AlertTriangle, MapPin, Clock, CheckCircle, Loader2 } from 'lucide-react';

const LiveMonitor = () => {
  const uid = () => Math.random().toString(36).substr(2, 9);
  const now = () => new Date().toLocaleTimeString('en-US', { hour12: false });
  
  const statusConfig = {
    'Bunking': { border: 'border-red-500/80', bg: 'bg-red-500/10', labelBg: 'bg-red-500', text: 'text-red-400' },
    'Authorized': { border: 'border-green-500/80', bg: 'bg-green-500/10', labelBg: 'bg-green-500', text: 'text-green-400' },
    'In Class': { border: 'border-blue-500/80', bg: 'bg-blue-500/10', labelBg: 'bg-blue-500', text: 'text-blue-400' }
  };

  const sampleStudents = ['John Doe', 'Jane Smith', 'Alex Lee', 'Wei Chen', 'Carlos Ramirez', 'Priya Patel'];
  const sampleLocations = ['Cafeteria', 'Parking Lot', 'Library', 'Gym', 'Room 101', 'Room 202'];
  const reasons = ['Sports Competition', 'Medical', 'Library Duty', 'Lab Prep', 'Placement Event'];

  const [detections, setDetections] = useState([
    { id: '1', name: 'Alex Lee', status: 'Authorized', x: 25, y: 15, w: 18, h: 35, location: 'Cafeteria' },
    { id: '2', name: 'Wei Chen', status: 'In Class', x: 45, y: 35, w: 12, h: 28, location: 'Room 101' },
    { id: '3', name: 'John Doe', status: 'Bunking', x: 30, y: 55, w: 16, h: 32, location: 'Parking Lot' },
    { id: '4', name: 'Carlos Ramirez', status: 'In Class', x: 10, y: 65, w: 15, h: 28, location: 'Room 202' }
  ]);
  
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
      if (rand > 0.8) {
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
    }

    const newDetection = {
      id: uid(),
      name: name,
      status: status,
      location: location,
      x: 10 + Math.random() * 70,
      y: 10 + Math.random() * 60,
      w: 12 + Math.random() * 10,
      h: 20 + Math.random() * 15
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
    <div className="min-h-screen bg-neutral-950 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Smart Campus</h1>
              <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest">Attendance & Bunking Tracker</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWebcamActive(!isWebcamActive)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${isWebcamActive ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-neutral-800 hover:bg-neutral-700 text-gray-300'}`}
            >
              {isWebcamActive ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              <span>{isWebcamActive ? 'Stop Webcam' : 'Start Webcam'}</span>
            </button>
            <button
              onClick={simulateDetection}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-all shadow-lg shadow-emerald-900/40"
            >
              <Plus className="w-4 h-4" />
              <span>Simulation</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 grid grid-cols-12 gap-6">
        {/* Video Feed Section */}
        <section className="col-span-12 lg:col-span-8 space-y-6">
          <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-black aspect-video shadow-2xl">
            {/* Video Layer */}
            <div className="absolute inset-0">
              {isWebcamActive ? (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1] opacity-60 grayscale" />
              ) : (
                <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                  <div className="text-center opacity-20">
                    <Video className="w-16 h-16 mx-auto mb-2 text-neutral-600" />
                    <p className="text-xs font-bold uppercase tracking-widest">Camera Offline</p>
                  </div>
                </div>
              )}
            </div>

            {/* Detection Boxes */}
            {detections.map((d) => {
              const style = statusConfig[d.status];
              return (
                <div
                  key={d.id}
                  className={`absolute rounded-lg border-2 ${style.border} ${style.bg}`}
                  style={{ 
                    left: `${d.x}%`, 
                    top: `${d.y}%`, 
                    width: `${d.w}%`, 
                    height: `${d.h}%`,
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                  }}
                >
                  <div className={`absolute -top-10 left-0 ${style.labelBg} text-white px-3 py-1.5 rounded-md text-[11px] font-bold whitespace-nowrap border border-white/10 shadow-lg`}>
                    <div>{d.name}</div>
                    <div className="text-[9px] opacity-90 font-medium">{d.status} • {d.location}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Logs */}
            <div className="rounded-xl p-6 bg-neutral-900/40 border border-neutral-800">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Attendance Logs</h3>
              </div>
              <div className="space-y-4">
                {classes.map((c) => (
                  <div key={c.name} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-neutral-500">{c.name}</span>
                      <span className="text-neutral-300">{c.current}/{c.expected}</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" 
                        style={{ width: `${(c.current/c.expected)*100}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fast Exemption */}
            <div className="rounded-xl p-6 bg-neutral-900/40 border border-neutral-800">
              <div className="flex items-center gap-2 mb-6">
                <UserPlus className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Fast Exemption</h3>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Student Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
                <select
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                >
                  <option value="">Select Reason</option>
                  {reasons.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <button
                  onClick={addExemption}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-purple-900/20"
                >
                  Grant Exemption
                </button>
              </div>
              {exemptions.length > 0 && (
                <div className="mt-4 space-y-2 max-h-32 overflow-y-auto">
                  {exemptions.map((ex) => (
                    <div key={ex.id} className="flex justify-between text-xs py-2 px-3 rounded bg-neutral-950/50 border border-neutral-800">
                      <span className="text-neutral-400">{ex.name}</span>
                      <span className="text-purple-400">{ex.reason}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Right Sidebar - Active Alert */}
        <aside className="col-span-12 lg:col-span-4">
          <div className="rounded-xl p-6 bg-neutral-900/40 border border-neutral-800 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Active Alert</h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </div>

            {activeAlert && (
              <div className="space-y-4">
                <div className="bg-neutral-950/80 rounded-lg p-4 border border-red-500/20">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wide">{activeAlert.studentName}</h4>
                      <div className="flex flex-col gap-1 mt-2 text-[11px] text-neutral-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {activeAlert.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activeAlert.timestamp}
                        </span>
                      </div>
                    </div>
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  
                  <div className={`flex items-center gap-2 pt-3 border-t border-neutral-800 text-[10px] font-bold uppercase tracking-wider ${activeAlert.notified ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {activeAlert.notified ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Advisor Notified</span>
                      </>
                    ) : (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Notifying Advisor...</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Recent Detections */}
                <div className="pt-4 border-t border-neutral-800">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-3">Recent Detections</h4>
                  <div className="space-y-2">
                    {detections.slice(0, 4).map((d) => (
                      <div key={d.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-neutral-950/30 border border-neutral-800/50">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: d.status === 'Bunking' ? '#ef4444' : d.status === 'Authorized' ? '#22c55e' : '#3b82f6' }} />
                          <span className="text-xs font-medium text-neutral-300">{d.name}</span>
                        </div>
                        <span className={`text-[10px] font-bold uppercase ${statusConfig[d.status].text}`}>
                          {d.status === 'In Class' ? 'Class' : d.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default LiveMonitor;
