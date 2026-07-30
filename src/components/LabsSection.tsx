import React from 'react';
import { Database, Network, Activity, Scale, ArrowRightLeft, Play, ExternalLink, Sparkles } from 'lucide-react';
import { BlurText } from './ui/portfolio-hero';
import { ArcCardReveal } from './ArcCardReveal';
import { SvgStrokeDraw } from './SvgStrokeDraw';

interface Lab {
  id: number;
  titulo: string;
  descripcion: string;
  nivel: string;
  etiqueta: string;
  color: string;
  icono: React.ReactNode;
  link: string;
}

const misLaboratorios: Lab[] = [
  {
    id: 1,
    titulo: "Aprende a configurar vSAN",
    descripcion: "Convierte discos locales en un Datastore indestructible. Domina la HCI y dile adiós a las SAN tradicionales para siempre.",
    nivel: "Intermedio",
    etiqueta: "Más Popular",
    color: "from-purple-600 to-indigo-600",
    icono: <Database size={40} className="text-emerald-400 drop-shadow-lg" />,
    link: "https://vsan-lab.riveritatech.com"
  },
  {
    id: 2,
    titulo: "Master en vCenter Server",
    descripcion: "El cerebro de tu Data Center. Orquesta clusters, automatiza cargas y gobierna toda tu infraestructura desde un único panel de cristal.",
    nivel: "Básico",
    etiqueta: "Core",
    color: "from-slate-600 to-indigo-600",
    icono: <Network size={40} className="text-purple-400 drop-shadow-lg" />,
    link: "https://vcenter-lab.riveritatech.com/"
  },
  {
    id: 3,
    titulo: "vSphere High Availability (HA)",
    descripcion: "Corta los cables. Mata el servidor. Mira cómo tus VMs resucitan automáticamente en otro host. Cero pánico, 100% uptime.",
    nivel: "Básico",
    etiqueta: "Resiliencia",
    color: "from-red-600 to-amber-600",
    icono: <Activity size={40} className="text-pink-400 drop-shadow-lg" />,
    link: "https://ha-lab.riveritatech.com/"
  },
  {
    id: 4,
    titulo: "vSphere DRS (Dynamic Resource)",
    descripcion: "Equilibrio perfecto de carga. El algoritmo inteligente que mueve VMs en caliente para evitar cuellos de botella en CPU y RAM.",
    nivel: "Avanzado",
    etiqueta: "Optimización",
    color: "from-emerald-600 to-teal-600",
    icono: <Scale size={40} className="text-teal-400 drop-shadow-lg" />,
    link: "https://drs-lab.riveritatech.com/"
  },
  {
    id: 5,
    titulo: "vMotion (Live Migration)",
    descripcion: "Migración de VMs en cero milisegundos sin tirar ni un solo paquete de red. La magia pura del Hypervisor en producción.",
    nivel: "Intermedio",
    etiqueta: "Movilidad",
    color: "from-purple-600 to-pink-600",
    icono: <ArrowRightLeft size={40} className="text-purple-300 drop-shadow-lg" />,
    link: "https://vmotion-lab.riveritatech.com/"
  }
];

interface LabsSectionProps {
  limit?: number;
}

export const LabsSection: React.FC<LabsSectionProps> = ({ limit }) => {
  const displayedLabs = limit ? misLaboratorios.slice(0, limit) : misLaboratorios;

  return (
    <section id="labs-section" className="py-20 bg-slate-950/90 relative overflow-hidden">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" /> Simulaciones Prácticas VMware
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            <BlurText
              text="Laboratorios de Infraestructura Real"
              delay={25}
              animateBy="words"
              direction="top"
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-emerald-400 to-teal-300 font-black justify-center text-center"
            />
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 font-normal">
            Haz clic en cualquiera de los entornos para ingresar directamente al simulador web en vivo.
          </p>
        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedLabs.map((lab, idx) => (
            <ArcCardReveal key={lab.id} index={idx} total={displayedLabs.length}>
              <div
                data-cursor-text="EJECUTAR LAB"
                onClick={() => window.open(lab.link, '_blank')}
                className="group relative glass-card-luxury p-8 rounded-3xl border border-white/10 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                {/* TRIONN CORNER CROSSHAIRS (+) */}
                <div className="absolute top-3 left-3 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-purple-400 transition-colors">+</div>
                <div className="absolute top-3 right-3 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-purple-400 transition-colors">+</div>
                <div className="absolute bottom-3 left-3 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-emerald-400 transition-colors">+</div>
                <div className="absolute bottom-3 right-3 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-emerald-400 transition-colors">+</div>

                <div className="space-y-5">
                  
                  {/* Badges Row */}
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 uppercase tracking-widest">
                      {lab.etiqueta}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-white/5">
                      {lab.nivel}
                    </span>
                  </div>

                  {/* Icon & Title with Animated TRIONN SVG Draw */}
                  <div className="flex items-center gap-4 pt-2">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      <SvgStrokeDraw delay={idx * 120}>
                        {lab.icono}
                      </SvgStrokeDraw>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight">
                      {lab.titulo}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed">
                    {lab.descripcion}
                  </p>

                </div>

                {/* Action Footer Button */}
                <div className="pt-6 mt-6 border-t border-white/5 flex justify-between items-center">
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    En Vivo <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </span>
                  <button className="flex items-center gap-2 text-xs font-mono font-bold text-white bg-gradient-to-r from-purple-600 to-emerald-500 px-4 py-2 rounded-xl shadow-lg group-hover:scale-105 transition-transform">
                    <span>Abrir Simulador</span>
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </button>
                </div>

              </div>
            </ArcCardReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
