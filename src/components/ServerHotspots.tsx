import React, { useState } from 'react';
import { Cpu, HardDrive, Zap, ShieldCheck, X } from 'lucide-react';

interface Hotspot {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  top: string;
  left: string;
  specs: string[];
}

const hotspots: Hotspot[] = [
  {
    id: 'cpu',
    title: 'Dual Processors Enterprise',
    category: 'Hypervisor Compute Core',
    icon: Cpu,
    top: '38%',
    left: '52%',
    specs: [
      'Sockets: Dual LGA-4677 Enterprise',
      'Cores Totales: 128 vCPUs Dedicadas',
      'Soporte vSphere 8, 9 & VCF 9.1 Directo'
    ]
  },
  {
    id: 'ram',
    title: '512 GB DDR5 ECC RAM',
    category: 'Memory Pool',
    icon: Zap,
    top: '32%',
    left: '42%',
    specs: [
      'Frecuencia: 4800 MHz Registered ECC',
      'Latencia Ultra-baja para vSAN Caching',
      'Zero Memory Error Isolation'
    ]
  },
  {
    id: 'nvme',
    title: 'vSAN NVMe Storage Trays',
    category: 'Datastore HCI',
    icon: HardDrive,
    top: '65%',
    left: '68%',
    specs: [
      'Protocolo: PCIe Gen 5.0 U.3 NVMe',
      'Capacidad: 8x 15.36 TB Hot-swap',
      'Configuración: vSAN ESA Dedicated'
    ]
  },
  {
    id: 'psu',
    title: 'Fuentes Redundantes 1600W',
    category: 'Power Management',
    icon: ShieldCheck,
    top: '48%',
    left: '22%',
    specs: [
      'Eficiencia: 80 Plus Titanium 96%',
      'Conmutación N+1 Hot-swappable',
      'Supervisión iDRAC / IPMI en Vivo'
    ]
  }
];

export const ServerHotspots: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  return (
    <div className="absolute inset-0 pointer-events-auto z-40">
      {hotspots.map((spot) => {
        const IconComponent = spot.icon;
        const isActive = activeHotspot?.id === spot.id;

        return (
          <div
            key={spot.id}
            style={{ top: spot.top, left: spot.left }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
          >
            {/* Pulsing Hotspot Button */}
            <button
              onClick={() => setActiveHotspot(isActive ? null : spot)}
              className="relative group w-8 h-8 rounded-full bg-slate-950/90 border border-purple-400 flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.8)] hover:scale-125 transition-transform"
            >
              <span className="absolute inset-0 rounded-full bg-purple-500/40 animate-ping" />
              <span className="text-emerald-400 font-mono font-bold text-xs">+</span>
            </button>

            {/* Floating Glassmorphic Specs Card Callout */}
            {isActive && (
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64 p-4 rounded-2xl bg-slate-950/95 border border-purple-500/50 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">
                      {spot.category}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="text-sm font-bold text-white mb-2">{spot.title}</h4>

                <ul className="space-y-1 text-xs text-slate-300 font-mono">
                  {spot.specs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
