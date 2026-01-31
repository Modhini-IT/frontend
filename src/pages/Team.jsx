import React, { useRef, useEffect, useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, ShieldCheck, Copy, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// --- SCROLL STACK COMPONENTS ---

const ScrollStackContext = createContext(null);

const ScrollStackItem = ({ children }) => {
  const itemRef = useRef(null);
  const ctx = useContext(ScrollStackContext);
  
  useEffect(() => {
    if (!ctx) return;
    ctx.registerItem(itemRef.current);
    return () => ctx.unregisterItem(itemRef.current);
  }, [ctx]);

  return (
    <div 
      ref={itemRef} 
      className="scroll-stack-item will-change-transform"
      style={{ 
        position: 'relative',
        width: '100%',
        marginBottom: '4rem',
        zIndex: 1
      }}
    >
      {children}
    </div>
  );
};

const ScrollStack = ({ 
  children,
  itemStackDistance = 80,
  stackPosition = "20%",
  baseScale = 0.9,
  itemScale = 0.02,
}) => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const triggersRef = useRef([]);

  const registerItem = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  const unregisterItem = (el) => {
    itemsRef.current = itemsRef.current.filter(item => item !== el);
  };

  useEffect(() => {
    const items = itemsRef.current;
    if (items.length === 0) return;

    // Clear previous triggers
    triggersRef.current.forEach(st => st.kill());
    triggersRef.current = [];

    const stackPosValue = parseInt(stackPosition);
    const isPercentage = stackPosition.includes('%');
    
    items.forEach((item, index) => {
      const scaleValue = baseScale + (index * itemScale);
      const stackingOffset = index * itemStackDistance;
      
      // Initial state
      gsap.set(item, {
        scale: scaleValue,
        transformOrigin: "center top",
        zIndex: index + 1
      });

      // Create scroll trigger for stacking
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: () => `top ${isPercentage ? `${stackPosValue + (index * 5)}%` : `${stackPosValue + (index * 60)}px`}`,
        end: () => `+=${window.innerHeight * 0.8}`,
        pin: true,
        pinSpacing: false,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentScale = gsap.utils.interpolate(scaleValue, 1, progress);
          const yOffset = stackingOffset * (1 - progress);
          
          gsap.set(item, {
            scale: currentScale,
            y: -yOffset,
            zIndex: index + 1 + (progress * 10)
          });
        }
      });
      
      triggersRef.current.push(trigger);
    });

    return () => {
      triggersRef.current.forEach(st => st.kill());
      triggersRef.current = [];
    };
  }, [itemStackDistance, stackPosition, baseScale, itemScale]);

  return (
    <ScrollStackContext.Provider value={{ registerItem, unregisterItem }}>
      <div 
        ref={containerRef}
        className="scroll-stack-container relative"
        style={{
          perspective: '1000px',
          paddingTop: '2rem',
        }}
      >
        {children}
      </div>
    </ScrollStackContext.Provider>
  );
};

// --- MAIN TEAM COMPONENT ---

const Team = () => {
    const navigate = useNavigate();
    const [copiedIndex, setCopiedIndex] = useState(null);

    const teamMembers = [
        { name: 'Pranav A', role: 'Team Leader', email: '2025it1070@svce.ac.in', phone: '9345149135', initials: 'PA' },
        { name: 'Modhini V', role: 'Member', email: '2025it1089@svce.ac.in', phone: '9840859756', initials: 'MV' },
        { name: 'Rishe S', role: 'Member', email: '2025it1030@svce.ac.in', phone: '9500405647', initials: 'RS' },
        { name: 'Shivvani T', role: 'Member', email: '2025it0186@svce.ac.in', phone: '7305084346', initials: 'ST' },
        { name: 'Suresh Krishna G', role: 'Member', email: '2025it0130@svce.ac.in', phone: '7824020581', initials: 'SKG' },
        { name: 'Srivatsan S', role: 'Member', email: '2025it1058@svce.ac.in', phone: '7358116408', initials: 'SS' }
    ];

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="min-h-screen bg-[#0d1117] text-white overflow-x-hidden">
            {/* Nav */}
            <nav className="fixed top-0 w-full z-[1000] px-8 py-5 flex justify-between items-center bg-[#0d1117]/90 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-3">
                    <ShieldCheck size={20} className="text-emerald-400" />
                    <span className="font-bold text-xl tracking-tight italic">EcoTrack <span className="text-emerald-400 not-italic">Team</span></span>
                </div>
                <button 
                    onClick={() => navigate('/')} 
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all bg-white/5 px-4 py-2 rounded-full hover:bg-white/10"
                >
                    <ArrowLeft size={16} /> Dashboard
                </button>
            </nav>

            {/* Main Content */}
            <div className="pt-32 px-4 md:px-8 max-w-6xl mx-auto">
                {/* Header */}
                <header className="text-center mb-24">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic">
                        MEET THE <span className="text-emerald-400 not-italic">INNOVATORS</span>
                    </h1>
                    <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 px-4 py-1 rounded-full text-emerald-400 text-[10px] font-black tracking-[0.4em] uppercase">
                        SVCE • BTech IT
                    </div>
                </header>

                {/* Stacking Cards */}
                <ScrollStack 
                    itemStackDistance={80}
                    stackPosition="20%"
                    baseScale={0.9}
                    itemScale={0.02}
                >
                    {teamMembers.map((member, index) => (
                        <ScrollStackItem key={index}>
                            <div className="relative h-full w-full p-[1.5px] rounded-[32px] bg-gradient-to-br from-emerald-500/40 via-white/5 to-blue-500/20 shadow-2xl backdrop-blur-sm">
                                <div className="bg-[#090b11]/95 h-full w-full rounded-[30px] p-8 md:p-12 flex flex-col justify-between min-h-[400px]">
                                    
                                    {/* Card Header */}
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-emerald-400 font-black text-2xl shadow-inner">
                                                {member.initials}
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-bold tracking-tight text-white mb-1">{member.name}</h3>
                                                <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full ${member.role === 'Team Leader' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-gray-400 border border-white/10'}`}>
                                                    {member.role}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="hidden md:flex flex-col items-end gap-2">
                                            <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Live Contact</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                        <button 
                                            onClick={() => copyToClipboard(member.email, index)}
                                            className="flex items-center justify-between gap-4 bg-[#0d1117] px-6 py-4 rounded-2xl border border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4 overflow-hidden">
                                                <Mail size={18} className="text-emerald-400 flex-shrink-0" />
                                                <span className="text-sm font-mono text-gray-400 group-hover:text-white truncate">{member.email}</span>
                                            </div>
                                            {copiedIndex === index ? 
                                                <Check size={18} className="text-emerald-400 flex-shrink-0" /> : 
                                                <Copy size={16} className="text-gray-600 group-hover:text-emerald-400 flex-shrink-0" />
                                            }
                                        </button>

                                        <div className="flex items-center gap-4 bg-[#0d1117] px-6 py-4 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all">
                                            <Phone size={18} className="text-emerald-400" />
                                            <span className="text-sm font-mono text-gray-400 hover:text-white transition-colors">{member.phone}</span>
                                        </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div className="pt-8 border-t border-white/5 mt-8">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">EcoTrack Innovator Verified</span>
                                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">STATUS: ACTIVE</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full w-full shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollStackItem>
                    ))}
                </ScrollStack>
            </div>
            
            {/* Bottom spacer for scroll */}
            <div className="h-[50vh]" />
        </div>
    );
};

export default Team;
