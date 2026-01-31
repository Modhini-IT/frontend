import React, { useRef, useEffect, useState, createContext, useContext } from 'react';

// --- INLINE ICONS (No lucide-react) ---
const ShieldCheck = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ArrowLeft = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const Mail = ({ size = 18, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const Phone = ({ size = 18, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const Copy = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const Check = ({ size = 18, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// --- NATIVE SCROLL STACK (No GSAP) ---
const ScrollStackContext = createContext(null);

const ScrollStackItem = ({ children, index }) => {
  const itemRef = useRef(null);
  const [transform, setTransform] = useState(`scale(${0.9 + index * 0.02})`);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const element = itemRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const stackTrigger = windowHeight * 0.20; // 20% from top
      const startOffset = windowHeight * 0.5; // Start animation 50vh away
      
      // Calculate progress based on distance to stack position
      const distance = rect.top - stackTrigger;
      let progress = 1 - (distance / startOffset);
      progress = Math.max(0, Math.min(1, progress));
      
      // Scale from base scale up to 1
      const baseScale = 0.9 + (index * 0.02);
      const currentScale = baseScale + (1 - baseScale) * progress;
      
      // Subtle parallax offset
      const yOffset = (1 - progress) * (index * 15);
      
      setTransform(`scale(${currentScale}) translateY(${-yOffset}px)`);
      setIsSticky(progress >= 0.8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [index]);

  return (
    <div 
      ref={itemRef} 
      style={{
        transform: transform,
        transformOrigin: 'center top',
        position: 'sticky',
        top: `${20 + (index * 2.5)}%`,
        zIndex: index + 1,
        marginBottom: index === 5 ? '100vh' : '2rem', // Extra scroll space for last item
        transition: 'filter 0.3s ease',
        filter: isSticky ? 'brightness(1)' : 'brightness(0.95)',
      }}
      className="will-change-transform w-full"
    >
      {children}
    </div>
  );
};

const ScrollStack = ({ children }) => {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div style={{ perspective: '1000px', position: 'relative' }}>
      {childrenArray.map((child, index) => (
        <ScrollStackItem key={index} index={index}>
          {child}
        </ScrollStackItem>
      ))}
    </div>
  );
};

// --- MAIN COMPONENT ---
const Team = () => {
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
        <div className="min-h-screen bg-[#0d1117] text-white overflow-x-hidden" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {/* Nav */}
            <nav style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 1000,
                padding: '1.25rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'rgba(13, 17, 23, 0.9)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <ShieldCheck size={20} className="text-emerald-400" style={{ color: '#34d399' }} />
                    <span style={{ fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: '-0.025em', fontStyle: 'italic' }}>
                        EcoTrack <span style={{ color: '#34d399', fontStyle: 'normal' }}>Team</span>
                    </span>
                </div>
                <button 
                    onClick={() => window.history.back()}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#9ca3af',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.color = '#ffffff';
                        e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.color = '#9ca3af';
                        e.target.style.backgroundColor = 'rgba(255,255,255,0.05)';
                    }}
                >
                    <ArrowLeft size={16} /> Dashboard
                </button>
            </nav>

            {/* Main Content */}
            <div style={{ paddingTop: '8rem', paddingLeft: '1rem', paddingRight: '1rem', maxWidth: '72rem', margin: '0 auto' }}>
                {/* Header */}
                <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ 
                        fontSize: 'clamp(3rem, 8vw, 4.5rem)', 
                        fontWeight: '900', 
                        marginBottom: '1.5rem', 
                        letterSpacing: '-0.05em',
                        fontStyle: 'italic',
                        lineHeight: 1.1
                    }}>
                        MEET THE <span style={{ color: '#34d399', fontStyle: 'normal' }}>INNOVATORS</span>
                    </h1>
                    <div style={{ 
                        display: 'inline-block',
                        backgroundColor: 'rgba(52, 211, 153, 0.1)', 
                        border: '1px solid rgba(52, 211, 153, 0.2)', 
                        padding: '0.25rem 1rem', 
                        borderRadius: '9999px', 
                        color: '#34d399', 
                        fontSize: '0.625rem', 
                        fontWeight: 900, 
                        letterSpacing: '0.4em',
                        textTransform: 'uppercase'
                    }}>
                        SVCE • BTech IT
                    </div>
                </header>

                {/* Stacking Cards */}
                <ScrollStack>
                    {teamMembers.map((member, index) => (
                        <div key={index} style={{
                            position: 'relative',
                            width: '100%',
                            padding: '1.5px',
                            borderRadius: '32px',
                            background: 'linear-gradient(135deg, rgba(52,211,153,0.4), rgba(255,255,255,0.05), rgba(59,130,246,0.2))',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}>
                            <div style={{
                                backgroundColor: 'rgba(9, 11, 17, 0.95)',
                                borderRadius: '30px',
                                padding: '2rem',
                                minHeight: '400px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                {/* Card Header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div style={{
                                            width: '4rem',
                                            height: '4rem',
                                            borderRadius: '1rem',
                                            background: 'linear-gradient(135deg, rgba(52,211,153,0.2), rgba(59,130,246,0.2))',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#34d399',
                                            fontWeight: 900,
                                            fontSize: '1.5rem',
                                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
                                        }}>
                                            {member.initials}
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', letterSpacing: '-0.025em', marginBottom: '0.25rem', color: '#ffffff' }}>
                                                {member.name}
                                            </h3>
                                            <span style={{
                                                fontSize: '0.625rem',
                                                fontWeight: 900,
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '9999px',
                                                backgroundColor: member.role === 'Team Leader' ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.05)',
                                                color: member.role === 'Team Leader' ? '#34d399' : '#9ca3af',
                                                border: `1px solid ${member.role === 'Team Leader' ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.1)'}`
                                            }}>
                                                {member.role}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div style={{ 
                                        display: 'none',
                                        '@media (min-width: 768px)': { display: 'flex' }
                                    }} className="desktop-only">
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            backgroundColor: 'rgba(52,211,153,0.1)',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '9999px',
                                            border: '1px solid rgba(52,211,153,0.2)'
                                        }}>
                                            <span style={{
                                                width: '0.375rem',
                                                height: '0.375rem',
                                                borderRadius: '50%',
                                                backgroundColor: '#34d399',
                                                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                                            }} />
                                            <span style={{ fontSize: '0.625rem', fontWeight: 900, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                Live Contact
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: '1fr', 
                                    gap: '1rem', 
                                    marginTop: '2rem',
                                    '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' }
                                }} className="contact-grid">
                                    <button 
                                        onClick={() => copyToClipboard(member.email, index)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: '1rem',
                                            backgroundColor: '#0d1117',
                                            padding: '1rem 1.5rem',
                                            borderRadius: '1rem',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            width: '100%'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(52,211,153,0.5)';
                                            e.currentTarget.style.backgroundColor = 'rgba(52,211,153,0.05)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                            e.currentTarget.style.backgroundColor = '#0d1117';
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', overflow: 'hidden' }}>
                                            <Mail size={18} style={{ color: '#34d399', flexShrink: 0 }} />
                                            <span style={{ 
                                                fontSize: '0.875rem', 
                                                fontFamily: 'monospace', 
                                                color: '#9ca3af',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }} className="email-text">
                                                {member.email}
                                            </span>
                                        </div>
                                        {copiedIndex === index ? 
                                            <Check size={18} style={{ color: '#34d399', flexShrink: 0 }} /> : 
                                            <Copy size={16} style={{ color: '#4b5563', flexShrink: 0 }} className="copy-icon" />
                                        }
                                    </button>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        backgroundColor: '#0d1117',
                                        padding: '1rem 1.5rem',
                                        borderRadius: '1rem',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        transition: 'all 0.2s'
                                    }}
                                    className="phone-box"
                                    >
                                        <Phone size={18} style={{ color: '#34d399' }} />
                                        <span style={{ fontSize: '0.875rem', fontFamily: 'monospace', color: '#9ca3af' }}>
                                            {member.phone}
                                        </span>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                        <span style={{ fontSize: '0.625rem', fontWeight: 900, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            EcoTrack Innovator Verified
                                        </span>
                                        <span style={{ 
                                            fontSize: '0.625rem', 
                                            fontWeight: 'bold', 
                                            color: '#34d399', 
                                            backgroundColor: 'rgba(52,211,153,0.1)', 
                                            padding: '0.25rem 0.5rem', 
                                            borderRadius: '0.25rem' 
                                        }}>
                                            STATUS: ACTIVE
                                        </span>
                                    </div>
                                    <div style={{ height: '0.375rem', width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '9999px', overflow: 'hidden' }}>
                                        <div style={{ 
                                            height: '100%', 
                                            width: '100%', 
                                            background: 'linear-gradient(90deg, #34d399, #3b82f6)', 
                                            borderRadius: '9999px',
                                            boxShadow: '0 0 15px rgba(52,211,153,0.5)'
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollStack>
            </div>

            <style>{`
                @media (min-width: 768px) {
                    .desktop-only { display: flex !important; }
                    .contact-grid { grid-template-columns: 1fr 1fr !important; }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .copy-icon { transition: color 0.2s; }
                button:hover .copy-icon { color: #34d399; }
                .email-text { transition: color 0.2s; }
                button:hover .email-text { color: #ffffff; }
                .phone-box:hover { border-color: rgba(52,211,153,0.3) !important; }
                .phone-box:hover span { color: #ffffff !important; }
            `}</style>
        </div>
    );
};

export default Team;
