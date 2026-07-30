import React from 'react';
import { HeroPinAssembly } from './HeroPinAssembly';
import { BlurText } from './ui/portfolio-hero';
import { ArrowRight, HeartHandshake, Sparkles } from 'lucide-react';

interface HeroProps {
  setPage: (page: string) => void;
  onOpenAuth: () => void;
  scrollProgress?: number;
}

export const Hero: React.FC<HeroProps> = ({ setPage, onOpenAuth, scrollProgress = 0 }) => {
  return (
    <section id="hero-section" className="relative pt-20 overflow-hidden min-h-screen flex flex-col justify-center bg-[#030712]">
      
      {/* Soft Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[400px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Personal Welcome Badge from Riverita */}
        <div className="flex justify-center mb-4">
          <div 
            onClick={() => setPage('about')}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-950/90 border border-purple-500/30 text-white text-xs font-mono font-bold hover:bg-purple-500/10 hover:border-purple-500/60 transition-all cursor-pointer shadow-xl group"
          >
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>Mensaje del Senior: Aprende VMware Broadcom con práctica real</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* MAIN TITLE SLOGAN: DE CERO A EXPERTO EN VMWARE */}
        <div className="text-center max-w-5xl mx-auto mb-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-4">
            <BlurText
              text="DE CERO A EXPERTO EN VMWARE"
              delay={25}
              animateBy="words"
              direction="top"
              className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-emerald-400 font-black justify-center text-center font-mono"
            />
          </h1>
          
          <div className="text-slate-300 text-base sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-medium">
            <BlurText
              text="La plataforma real creada por un Senior en Virtualización para dominar vSphere, vSAN y VCF sin miedo."
              delay={35}
              animateBy="words"
              direction="bottom"
              className="text-slate-300 justify-center text-center"
            />
          </div>
        </div>

      </div>

      {/* GSAP SCROLLTRIGGER PINNING HERO SERVER ASSEMBLY (EXPLODED -> ASSEMBLED) */}
      <HeroPinAssembly scrollProgress={scrollProgress} />

      {/* POST-HERO MANIFESTO & ACTION BUTTONS */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-12">
        {/* BLOQUE "MANIFESTO" JUSTO DEBAJO DEL HERO ASSEMBLY */}
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 max-w-3xl mx-auto backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-emerald-400" />
          <p className="text-sm sm:text-base text-slate-300 italic leading-relaxed text-left pl-3">
            "Diseñé estos laboratorios y scripts porque me apasiona enseñar exactamente de la forma en que aprendo: de manera didáctica, práctica y directa para hacerle la vida más fácil a los administradores L1, L2 y L3."
          </p>
          <div className="mt-4 text-right text-xs font-mono font-bold text-emerald-400 flex items-center justify-end gap-1.5">
            <HeartHandshake className="w-4 h-4 text-purple-400" /> — Riverita (Senior en Virtualización)
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => setPage('labs')}
            className="group px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-500 text-white font-bold rounded-2xl shadow-[0_0_35px_rgba(168,85,247,0.4)] hover:shadow-[0_0_45px_rgba(168,85,247,0.7)] transition-all transform hover:-translate-y-1 flex items-center gap-3 text-base cursor-pointer"
          >
            <span>Explorar Laboratorios VCF</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={onOpenAuth}
            className="px-8 py-4 bg-slate-900/90 border border-white/10 hover:border-emerald-400/50 text-slate-200 hover:text-white font-bold rounded-2xl transition-all flex items-center gap-2 text-base cursor-pointer shadow-lg"
          >
            <span>Unirme a la Comunidad</span>
          </button>
        </div>
      </div>

    </section>
  );
};
