import React, { useState } from 'react';
import { BlurText } from './ui/portfolio-hero';
import { ShieldCheck, Award, Terminal } from 'lucide-react';
import { ArcCardReveal } from './ArcCardReveal';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bio' | 'certifications' | 'skills'>('bio');
  const [portraitTilt, setPortraitTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -18;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 18;
    setPortraitTilt({
      rotateX: rx,
      rotateY: ry,
      glowX: (x / rect.width) * 100,
      glowY: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setPortraitTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  };

  return (
    <div className="py-20 bg-slate-950/90 relative overflow-hidden min-h-screen">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* PORTFOLIO HERO HEADER - RIVERITA ARMS CROSSED FORMAL SUIT */}
        <div className="relative text-center mb-16 pt-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-bold uppercase mb-6">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Senior en Virtualización VMware & Broadcom Specialist
          </div>

          <div className="relative my-4 flex flex-col items-center justify-center">
            
            {/* BIG RIVERITA NAME HEADER */}
            <div className="relative z-0">
              <BlurText
                text="RIVERITA"
                delay={80}
                animateBy="letters"
                direction="top"
                className="font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-slate-400 drop-shadow-[0_0_35px_rgba(168,85,247,0.3)] font-mono"
              />
            </div>

            {/* TRIONN 3D HOLOGRAPHIC PARALLAX PORTRAIT FRAME */}
            <ArcCardReveal index={0} total={1}>
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="my-6 relative z-10 group cursor-pointer"
                style={{
                  perspective: '800px',
                }}
              >
                <div
                  style={{
                    transform: `rotateX(${portraitTilt.rotateX}deg) rotateY(${portraitTilt.rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
                    transition: 'transform 0.15s ease-out',
                    background: `radial-gradient(circle at ${portraitTilt.glowX}% ${portraitTilt.glowY}%, rgba(52,211,153,0.3), rgba(168,85,247,0.2), transparent 70%)`,
                  }}
                  className="w-36 h-48 sm:w-44 sm:h-60 rounded-3xl overflow-hidden border-2 border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.5)] group-hover:border-emerald-400/80 group-hover:shadow-[0_0_60px_rgba(52,211,153,0.6)] relative bg-slate-950 p-[2px]"
                >
                  <img
                    src="/riverita_arms_crossed.jpg"
                    alt="Riverita Traje Formal Brazos Cruzados"
                    className="w-full h-full object-cover object-top rounded-3xl transition-transform duration-500 group-hover:scale-108"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute('src', '/riverita_photo.png');
                    }}
                  />
                  {/* Holographic depth shimmer line */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-3xl opacity-30 group-hover:opacity-70 transition-opacity"
                    style={{
                      background: `linear-gradient(${135 + portraitTilt.rotateY * 2}deg, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                    }}
                  />
                </div>
              </div>
            </ArcCardReveal>

            {/* SPANISH TAGLINE BELOW NAME */}
            <div className="max-w-2xl mx-auto mt-2">
              <BlurText
                text="Experto en Virtualización VMware"
                delay={40}
                animateBy="words"
                direction="bottom"
                className="text-xl sm:text-2xl text-slate-200 font-mono font-extrabold text-center justify-center tracking-tight"
              />
            </div>

          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 flex items-center gap-2 shadow-xl">
            {[
              { id: 'bio', label: 'Sobre Mí' },
              { id: 'certifications', label: 'Certificaciones VCP/VCF' },
              { id: 'skills', label: 'Matriz de Competencias' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-emerald-500 text-white shadow-lg shadow-purple-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB CONTENTS WITH ARC CARD REVEAL */}
        <div className="max-w-4xl mx-auto">
          
          {/* TAB 1: BIO */}
          {activeTab === 'bio' && (
            <ArcCardReveal index={1} total={2}>
              <div className="glass-panel-luxury p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6 animate-in fade-in duration-300">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Terminal className="text-purple-400" /> Hola, soy Riverita 👋
                </h3>
                
                <p className="text-slate-300 text-base leading-relaxed">
                  Soy **Senior en Virtualización VMware** con años de trayectoria administrando plataformas enterprise desde las versiones legadas de vSphere/ESXi hasta la versión actual. He gobernado entornos administrando más de **400+ hosts físicos ESXi** y **10,000+ máquinas virtuales**.
                </p>

                <div className="p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-200 space-y-2">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-400" /> Mi Filosofía de Enseñanza:
                  </h4>
                  <p className="text-sm italic text-slate-300">
                    "Diseñé estos laboratorios y scripts porque me apasiona enseñar exactamente de la forma en que aprendo: de manera didáctica, práctica y directa para hacerle la vida más fácil a los administradores L1, L2 y L3."
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/5 text-center">
                    <div className="text-2xl font-black text-white font-mono">8+ Años</div>
                    <div className="text-xs text-slate-400">Experiencia DataCenter</div>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/5 text-center">
                    <div className="text-2xl font-black text-purple-400 font-mono">400+</div>
                    <div className="text-xs text-slate-400">Hosts ESXi Gestionados</div>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/5 text-center">
                    <div className="text-2xl font-black text-emerald-400 font-mono">10K+</div>
                    <div className="text-xs text-slate-400">VMs en Producción</div>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/5 text-center">
                    <div className="text-2xl font-black text-pink-400 font-mono">100%</div>
                    <div className="text-xs text-slate-400">Uptime Garantizado</div>
                  </div>
                </div>
              </div>
            </ArcCardReveal>
          )}

          {/* TAB 2: CERTIFICATIONS */}
          {activeTab === 'certifications' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in duration-300">
              {[
                {
                  title: "VMware Certified Professional (VCP-DCV)",
                  issuer: "Broadcom / VMware Enterprise",
                  desc: "Certificación oficial de administración y orquestación de vSphere Datacenter Virtualization.",
                  status: "Activa & Verificada"
                },
                {
                  title: "VMware Cloud Foundation Specialist (VCF)",
                  issuer: "Broadcom Enterprise Alliance",
                  desc: "Especialista en integración Full-Stack SDDC: vSphere, vSAN y NSX.",
                  status: "Activa & Verificada"
                }
              ].map((cert, idx) => (
                <ArcCardReveal key={idx} index={idx} total={2}>
                  <div className="glass-card-luxury p-6 rounded-3xl border border-white/10 space-y-3 relative">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        {cert.status}
                      </span>
                      <Award className="w-6 h-6 text-purple-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white">{cert.title}</h4>
                    <p className="text-xs font-mono text-purple-300">{cert.issuer}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{cert.desc}</p>
                  </div>
                </ArcCardReveal>
              ))}
            </div>
          )}

          {/* TAB 3: SKILLS (WITH EXACT PERCENTAGES) */}
          {activeTab === 'skills' && (
            <ArcCardReveal index={0} total={1}>
              <div className="glass-panel-luxury p-8 rounded-3xl border border-white/10 space-y-6 animate-in fade-in duration-300 relative">
                <h3 className="text-xl font-bold text-white mb-4">Matriz de Competencias de Infraestructura</h3>
                
                <div className="space-y-4">
                  {[
                    { name: "vSphere & ESXi Administration", level: 100, color: "from-purple-600 to-indigo-600" },
                    { name: "PowerCLI & PowerShell Automation", level: 80, color: "from-purple-500 to-pink-600" },
                    { name: "vSAN Storage & HCI Architecture", level: 75, color: "from-emerald-500 to-teal-600" },
                    { name: "VMware Cloud Foundation (VCF)", level: 70, color: "from-indigo-600 to-purple-600" },
                    { name: "NSX Network Microsegmentation", level: 50, color: "from-pink-600 to-rose-600" },
                  ].map((skill, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-white font-bold">{skill.name}</span>
                        <span className="text-emerald-400 font-bold">{skill.level}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                        <div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ArcCardReveal>
          )}

        </div>

      </div>
    </div>
  );
};
