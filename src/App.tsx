import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BroadcomVMwareBadges } from './components/BroadcomVMwareBadges';
import { PowerCLITerminal } from './components/PowerCLITerminal';
import { YouTubeScriptsVault } from './components/YouTubeScriptsVault';
import { LabsSection } from './components/LabsSection';
import { ScriptsSection } from './components/ScriptsSection';
import { TutorialsSection } from './components/TutorialsSection';
import { AboutSection } from './components/AboutSection';
import { AuthModal } from './components/AuthModal';
import { CyberCursor } from './components/CyberCursor';
import { TrionnPreloader } from './components/TrionnPreloader';
import { AnimatedTestimonials } from './components/ui/animated-testimonials';
import TubesCursor from './components/ui/tubes-cursor';

export function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Read URL Path on initial page load (Support direct URL access like /youtube-scripts)
  useEffect(() => {
    const rawPath = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
    if (rawPath === 'youtube-scripts') {
      setCurrentPage('youtube-scripts');
    }
  }, []);

  // TRIONN SHARED SCROLL DRIVER ENGINE STATES (0.0 to 1.0)
  const [normalizedScroll, setNormalizedScroll] = useState(0);
  const targetScrollRef = useRef(0);
  const smoothedScrollRef = useRef(0);

  // GLOBAL TRIONN PRESS-AND-HOLD CHARGE-UP & BLAST SEQUENCE STATES
  const [isHoldingGlobal, setIsHoldingGlobal] = useState(false);
  const [vibrateOffset, setVibrateOffset] = useState({ x: 0, y: 0 });
  const [blastAmount, setBlastAmount] = useState(0);
  const [globalMousePos, setGlobalMousePos] = useState({ x: 0, y: 0 });
  const holdStartTime = useRef<number | null>(null);

  // TRIONN UNIFIED SCROLL ENGINE LISTENER (0.0 TO 1.0)
  useEffect(() => {
    const handleScroll = () => {
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollHeight > 0) {
        const rawProgress = window.scrollY / totalScrollHeight;
        targetScrollRef.current = Math.min(1.0, Math.max(0.0, rawProgress));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // RAF LERP SMOOTHING LOOP FOR TRIONN SCROLL DRIVER (0.12 LERP)
  useEffect(() => {
    let animId: number;

    const scrollLoop = () => {
      const diff = targetScrollRef.current - smoothedScrollRef.current;
      if (Math.abs(diff) > 0.0001) {
        smoothedScrollRef.current += diff * 0.12;
        setNormalizedScroll(smoothedScrollRef.current);
      }

      if (holdStartTime.current !== null) {
        const elapsed = (Date.now() - holdStartTime.current) / 1000;

        if (elapsed < 0.5) {
          setVibrateOffset({
            x: (Math.random() - 0.5) * 4,
            y: (Math.random() - 0.5) * 4,
          });
        } else {
          setVibrateOffset({ x: 0, y: 0 });
          setBlastAmount((prev) => Math.min(1.0, prev + 0.03));
        }
      } else {
        setVibrateOffset({ x: 0, y: 0 });
        setBlastAmount((prev) => Math.max(0, prev - 0.04));
      }

      animId = requestAnimationFrame(scrollLoop);
    };

    scrollLoop();
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      holdStartTime.current = Date.now();
      setIsHoldingGlobal(true);
      setGlobalMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      holdStartTime.current = null;
      setIsHoldingGlobal(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setGlobalMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Carlos Mendoza",
      role: "Admin VMware L3",
      company: "Enterprise SysAdmin",
      content: "Gracias a los laboratorios prácticos de Riverita pasé de ser Administrador L1 a manejar la infraestructura completa vSAN y ESXi en mi empresa.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    },
    {
      id: 2,
      name: "Andrés Silva",
      role: "Ingeniero de Automatización",
      company: "Infrastructure Corp",
      content: "La automatización con PowerCLI que enseña Riverita me ahorró más de 20 horas a la semana en despliegue de VMs y reportes de vCenter.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    },
    {
      id: 3,
      name: "Mariana Torres",
      role: "Especialista en Virtualización",
      company: "Storage Datacenter",
      content: "La explicación clara de la arquitectura Broadcom VCF es la mejor que he visto. Sin rodeos y directo a la experiencia de trinchera.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 font-sans selection:bg-purple-500 selection:text-white relative overflow-x-hidden">
      
      {/* GLOBAL TRIONN ENERGY PULSE OVERLAY ON MOUSE HOLD */}
      {isHoldingGlobal && (
        <div
          className="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-100 mix-blend-screen"
          style={{
            opacity: Math.max(blastAmount * 0.5, isHoldingGlobal ? 0.35 : 0),
            background: `radial-gradient(500px circle at ${globalMousePos.x}px ${globalMousePos.y}px, rgba(52, 211, 153, 0.4), rgba(168, 85, 247, 0.3), transparent 70%)`,
          }}
        />
      )}

      {/* INITIAL TRIONN PRELOADER (~3.5 Seconds) */}
      <TrionnPreloader />

      {/* 3D Tubes Cursor Background Glow */}
      <TubesCursor />

      {/* Cybernetic Dynamic Follower Cursor */}
      <CyberCursor />

      {/* Top Fixed Header Navbar with Synchronized TRIONN Elastic Easing */}
      <Navbar
        currentPage={currentPage}
        setPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
        onLogout={() => setUser(null)}
        vibrateOffset={vibrateOffset}
        isHolding={isHoldingGlobal}
      />

      {/* MAIN DYNAMIC CONTENT DRIVEN BY TRIONN SHARED SCROLL ENGINE */}
      <main 
        style={{
          transform: (vibrateOffset.x !== 0 || vibrateOffset.y !== 0 || blastAmount > 0)
            ? `perspective(1000px) translateX(${vibrateOffset.x}px) translateY(${vibrateOffset.y}px) scale(${1 + blastAmount * 0.02})`
            : 'none',
          transition: isHoldingGlobal ? 'none' : 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        className="relative z-10 pt-16"
      >
        {currentPage === 'home' && (
          <>
            <Hero setPage={setCurrentPage} onOpenAuth={() => setIsAuthOpen(true)} scrollProgress={normalizedScroll} />
            <BroadcomVMwareBadges />
            <YouTubeScriptsVault />
            <PowerCLITerminal />
            <LabsSection />
            <ScriptsSection />
            <TutorialsSection />
            <AboutSection />
            
            {/* Animated Testimonials Section ("Lo que dicen los Administradores") */}
            <AnimatedTestimonials
              title="Lo que dicen los Administradores"
              subtitle="Opiniones de SysAdmins y Especialistas en Virtualización que utilizan nuestros laboratorios y scripts de PowerCLI."
              badgeText="Comunidad VMware & VCF"
              testimonials={testimonials}
            />
          </>
        )}

        {currentPage === 'youtube-scripts' && (
          <div>
            <YouTubeScriptsVault />
          </div>
        )}

        {currentPage === 'labs' && (
          <div>
            <LabsSection />
          </div>
        )}

        {currentPage === 'scripts' && (
          <div>
            <PowerCLITerminal />
            <ScriptsSection />
          </div>
        )}

        {currentPage === 'tutorials' && (
          <div>
            <TutorialsSection />
          </div>
        )}

        {currentPage === 'stack' && (
          <div>
            <BroadcomVMwareBadges />
          </div>
        )}

        {currentPage === 'about' && (
          <div>
            <AboutSection />
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-900 bg-slate-950 text-slate-400 font-mono text-xs text-center relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-3">
          <p className="text-slate-300 font-bold">
            RIVERITA TECH — Plataforma de Entrenamiento VMware & Broadcom Enterprise
          </p>
          <p className="text-slate-400">
            Diseñado para Administradores L1 a L3 | vSphere • vSAN • NSX • PowerCLI
          </p>
        </div>
      </footer>

      {/* LOGIN / SIGNUP MODAL */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

    </div>
  );
}
export default App;
