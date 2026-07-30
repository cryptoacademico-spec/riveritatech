import React, { useState } from 'react';
import { BlurText } from './ui/portfolio-hero';
import { ArcCardReveal } from './ArcCardReveal';

const badges = [
  {
    name: 'Broadcom Enterprise',
    category: 'Ecosistema Global',
    color: 'from-purple-600 to-indigo-600',
    image: '/icon_chip.jpg',
    desc: 'Procesadores Silicon y tecnología de infraestructura de última generación.',
  },
  {
    name: 'VMware vSphere',
    category: 'Hypervisor Core',
    color: 'from-indigo-600 to-emerald-600',
    image: '/icon_server.jpg',
    desc: 'Servidores de Rack 2U enterprise para computación en la nube.',
  },
  {
    name: 'vSAN Hyper-Converged',
    category: 'Almacenamiento HCI',
    color: 'from-emerald-600 to-teal-500',
    image: '/icon_storage.jpg',
    desc: 'Matriz Datastore SAN de discos NVMe de ultra-baja latencia.',
  },
  {
    name: 'VMware Cloud Foundation',
    category: 'VCF Full Stack',
    color: 'from-purple-500 to-pink-600',
    image: '/icon_cloud.jpg',
    desc: 'Orquestación de Data Center Definido por Software (SDDC).',
  },
  {
    name: 'PowerCLI Automation',
    category: 'Cmdlets & Scripts',
    color: 'from-emerald-500 to-purple-600',
    image: '/icon_terminal.jpg',
    desc: 'Consola de automatización de vCenter con PowerShell.',
  },
  {
    name: 'NSX Data Center',
    category: 'Redes & Seguridad',
    color: 'from-pink-600 to-purple-600',
    image: '/icon_security.jpg',
    desc: 'Microsegmentación de red y firewall distribuido.',
  },
];

export const BroadcomVMwareBadges: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="w-full py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-bold tracking-widest uppercase mb-3">
            Infraestructura Enterprise
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            <BlurText
              text="Stack Tecnológico Enterprise"
              delay={25}
              animateBy="words"
              direction="top"
              className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-emerald-400 font-extrabold justify-center text-center"
            />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {badges.map((badge, idx) => (
            <ArcCardReveal key={idx} index={idx} total={badges.length}>
              <div
                data-cursor-text="EXPLORAR"
                onMouseDown={() => setActiveIdx(idx)}
                onMouseUp={() => setActiveIdx(null)}
                onMouseLeave={() => setActiveIdx(null)}
                style={{
                  transform: activeIdx === idx ? 'scale(0.97) rotate(0.5deg)' : 'scale(1)',
                  transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="group relative glass-card-luxury p-6 rounded-3xl transition-all duration-500 hover:-translate-y-2 flex items-start gap-5 cursor-pointer overflow-hidden border border-white/10 active:border-emerald-400/80 active:shadow-[0_0_30px_rgba(52,211,153,0.5)] select-none"
              >
                {/* TRIONN CORNER CROSSHAIRS (+) */}
                <div className="absolute top-2 left-2 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-purple-400 transition-colors">+</div>
                <div className="absolute top-2 right-2 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-purple-400 transition-colors">+</div>
                <div className="absolute bottom-2 left-2 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-emerald-400 transition-colors">+</div>
                <div className="absolute bottom-2 right-2 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-emerald-400 transition-colors">+</div>

                {/* REAL HARDWARE ASSET IMAGE ICON */}
                <div className="shrink-0 w-16 h-16 rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative group-hover:scale-110 transition-transform duration-500">
                  <img 
                    src={badge.image} 
                    alt={badge.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info Content */}
                <div className="flex-1">
                  <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider block mb-1">
                    {badge.category}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {badge.name}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mt-2">
                    {badge.desc}
                  </p>
                </div>
              </div>
            </ArcCardReveal>
          ))}
        </div>
      </div>
    </div>
  );
};
