import React, { useState, useEffect } from 'react';

interface TrionnPreloaderProps {
  onComplete?: () => void;
}

export const TrionnPreloader: React.FC<TrionnPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING VSPHERE ENGINE...');
  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Smooth countdown from 0% to 100% over ~3.5 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              setShouldRender(false);
              if (onComplete) onComplete();
            }, 900);
          }, 300);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 3) + 2;
        const boundedNext = Math.min(100, next);

        if (boundedNext < 30) {
          setStatusText('INITIALIZING VSPHERE SDDC ENGINE...');
        } else if (boundedNext < 60) {
          setStatusText('MOUNTING VSAN HCI DATASTORES & NSX NETWORKS...');
        } else if (boundedNext < 85) {
          setStatusText('LOADING POWERCLI AUTOMATION MODULES...');
        } else {
          setStatusText('SYSTEM READY — WELCOME TO RIVERITA TECH');
        }

        return boundedNext;
      });
    }, 75);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#040508] transition-all duration-1000 ease-in-out ${isDone ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'}`}>
      
      {/* TRIONN Architectural Grid Belts / Vertical Lines */}
      <div className="absolute inset-0 grid grid-cols-6 sm:grid-cols-12 gap-0 opacity-15 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-slate-700 h-full w-full" />
        ))}
      </div>

      {/* Subtle Glowing Center Ambient Light */}
      <div className="absolute w-[600px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* CENTER LOGO & CROSSHAIR BOX */}
      <div className="relative p-10 sm:p-16 flex flex-col items-center justify-center max-w-lg w-full">
        
        {/* TOP-LEFT CORNER CROSSHAIR (+) */}
        <div className="absolute -top-3 -left-3 text-purple-400 font-mono text-2xl select-none font-light animate-pulse">
          +
        </div>

        {/* TOP-RIGHT CORNER CROSSHAIR (+) */}
        <div className="absolute -top-3 -right-3 text-purple-400 font-mono text-2xl select-none font-light animate-pulse">
          +
        </div>

        {/* BOTTOM-LEFT CORNER CROSSHAIR (+) */}
        <div className="absolute -bottom-3 -left-3 text-emerald-400 font-mono text-2xl select-none font-light animate-pulse">
          +
        </div>

        {/* BOTTOM-RIGHT CORNER CROSSHAIR (+) */}
        <div className="absolute -bottom-3 -right-3 text-emerald-400 font-mono text-2xl select-none font-light animate-pulse">
          +
        </div>

        {/* BORDER LINES AROUND BOX */}
        <div className="absolute inset-0 border border-slate-800/80 rounded-2xl bg-slate-950/60 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.15)]" />

        {/* INNER CONTENT */}
        <div className="relative z-10 text-center space-y-6">
          
          {/* LOGO SYMBOL / BRAND */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            RIVERITA TECH ENTERPRISE
          </div>

          <div className="my-2">
            <h2 className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-emerald-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              RIVERITA
            </h2>
          </div>

          {/* TRIONN SLOT MACHINE PERCENTAGE COUNTER */}
          <div className="font-mono text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-emerald-400 to-white tracking-widest my-4">
            {progress.toString().padStart(2, '0')}<span className="text-2xl text-purple-400 ml-1">%</span>
          </div>

          {/* DYNAMIC CONSOLE STATUS TEXT */}
          <div className="h-6 flex items-center justify-center">
            <p className="text-[11px] font-mono text-slate-400 tracking-wider uppercase animate-pulse">
              {statusText}
            </p>
          </div>

          {/* PROGRESS BAR */}
          <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden border border-white/5 mt-4">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-emerald-400 rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 pt-2 tracking-widest uppercase">
            <span>SYS.VER 9.0</span>
            <span>VCF / VSPHERE SDDC</span>
          </div>

        </div>

      </div>

    </div>
  );
};
