import React from 'react';
import { GraduationCap, BookOpen, Layers, CheckCircle2, Play, Sparkles } from 'lucide-react';

interface CourseModule {
  level: string;
  title: string;
  duration: string;
  topics: string[];
  desc: string;
}

const modules: CourseModule[] = [
  {
    level: 'Nivel L1 — Fundamentos SysAdmin',
    title: 'vSphere 8.0 & ESXi Core Administration',
    duration: '12 Horas de Práctica',
    desc: 'Diseñado para administradores junior. Instalación de ESXi en bare-metal, creación de Máquinas Virtuales, plantillas y vMotion.',
    topics: [
      'Instalación y Configuración Inicial de Host ESXi 8.0/9.0',
      'Creación de VMs, Guest OS, VMware Tools y Hardware Virtual',
      'Gestión de Almacenamiento VMFS y Datastores NFS',
      'Migración en Caliente con vMotion & Storage vMotion'
    ]
  },
  {
    level: 'Nivel L2 — Operación Enterprise',
    title: 'Cluster vSphere HA, DRS & vSAN Storage',
    duration: '18 Horas de Práctica',
    desc: 'Para administradores intermedios. Alta disponibilidad HA, balanceo de carga DRS y configuración de almacenamiento hiperconvergente vSAN.',
    topics: [
      'Configuración de Clusters vSphere HA (High Availability) & Heartbeats',
      'Reglas de Afinidad y Balanceo Dinámico con DRS',
      'Arquitectura vSAN HCI: Claiming Disks, Storage Policies & Disk Groups',
      'Troubleshooting de Logs de ESXi con /var/log/vmkernel.log'
    ]
  },
  {
    level: 'Nivel L3 — Automatización & VCF',
    title: 'PowerCLI Automation & VMware Cloud Foundation (VCF)',
    duration: '24 Horas de Práctica',
    desc: 'Nivel avanzado. Automatización con cmdlets PowerCLI, microsegmentación NSX y despliegue de SDDC con Cloud Foundation.',
    topics: [
      'Automatización Completa de vCenter con Cmdlets PowerCLI 13+',
      'Microsegmentación de Red con Distributed Firewall en NSX-T',
      'Despliegue de Workload Domains en VMware Cloud Foundation (VCF)',
      'Gestión de Ciclo de Vida (LCM) y Parcheo de Infraestructura'
    ]
  }
];

export const AcademiaSection: React.FC = () => {
  return (
    <section id="academia-section" className="py-20 bg-slate-950/90 relative overflow-hidden min-h-screen">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <GraduationCap className="w-4 h-4 text-purple-400" /> Academia VMware Riverita
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ruta de Entrenamiento <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-emerald-400 to-teal-300">L1 a L3</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 font-normal">
            Aprende paso a paso de la forma didáctica y práctica que Riverita diseñó para que domines vSphere, vSAN, NSX y PowerCLI.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((mod, idx) => (
            <div
              key={idx}
              data-cursor-text="VER MÓDULO"
              className="group relative glass-card-luxury p-8 rounded-3xl border border-white/10 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
            >
              {/* TRIONN CORNER CROSSHAIRS (+) */}
              <div className="absolute top-3 left-3 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-purple-400 transition-colors">+</div>
              <div className="absolute top-3 right-3 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-purple-400 transition-colors">+</div>
              <div className="absolute bottom-3 left-3 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-emerald-400 transition-colors">+</div>
              <div className="absolute bottom-3 right-3 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-emerald-400 transition-colors">+</div>

              <div className="space-y-4">
                
                <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 uppercase tracking-wider inline-block">
                  {mod.level}
                </span>

                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {mod.title}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed">
                  {mod.desc}
                </p>

                <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
                  <span className="text-[11px] font-mono text-purple-300 font-bold flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" /> Temario del Módulo:
                  </span>
                  {mod.topics.map((topic, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs font-mono text-slate-400">
                  {mod.duration}
                </span>
                <button className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Acceder al Curso</span>
                  <Play className="w-3.5 h-3.5 fill-emerald-400" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
