import React from 'react';
import { Cpu, Zap } from 'lucide-react';

export const HeroFuturisticBanner: React.FC = () => {
  return (
    <div className="relative w-full py-8 px-6 my-6 rounded-3xl glass-panel-luxury border border-white/10 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
      <div className="flex items-center gap-4">
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-emerald-500 text-white shadow-lg shadow-purple-500/20">
          <Cpu className="w-7 h-7" />
        </div>
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
            Arquitectura VMware Cloud Foundation 9.1
          </span>
          <h4 className="text-xl font-bold text-white">
            Software-Defined Data Center (SDDC)
          </h4>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-slate-900/90 border border-white/10 px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-300">
          <Zap className="w-4 h-4 text-purple-400" />
          <span>ESXi 9.0 + vSAN 9.0 + NSX-T</span>
        </div>
      </div>
    </div>
  );
};

export default HeroFuturisticBanner;
