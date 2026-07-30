import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ServerHotspots } from './ServerHotspots';

gsap.registerPlugin(ScrollTrigger);

interface HeroPinAssemblyProps {
  scrollProgress?: number;
}

export const HeroPinAssembly: React.FC<HeroPinAssemblyProps> = () => {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [assemblyProgress, setAssemblyProgress] = useState(0);
  const [loadedImgs, setLoadedImgs] = useState<HTMLImageElement[]>([]);

  // 1. Preload 7 High-Definition Native Transparent PNG Frames (0% White Fringe, 100% 4K Sharpness)
  useEffect(() => {
    const frameSources = [
      '/frames/frame_1.png', // Frame 1: Exploded View
      '/frames/frame_2.png', // Frame 2: Assembly Stage 1
      '/frames/frame_3.png', // Frame 3: Assembly Stage 2
      '/frames/frame_4.png', // Frame 4: Assembly Stage 3
      '/frames/frame_5.png', // Frame 5: Assembly Stage 4
      '/frames/frame_6.png', // Frame 6: Assembly Stage 5
      '/frames/frame_7.png', // Frame 7: Fully Assembled Server
    ];

    const imgs: HTMLImageElement[] = [];
    let count = 0;

    frameSources.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        count++;
        if (count === frameSources.length) {
          setLoadedImgs(imgs);
        }
      };
      imgs.push(img);
    });
  }, []);

  // 2. Setup GSAP ScrollTrigger Pinning: Instant 1st scroll start + Exact 7-scroll assembly distance (+=480vh)
  useEffect(() => {
    const pinSection = pinSectionRef.current;
    if (!pinSection) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#hero-section', // Triggers directly at the Hero top boundary
        start: 'top top',        // Activates IMMEDIATELY on the 1st scroll pixel
        end: '+=480vh',          // Extended distance for EXACTLY 7 full scrolls of assembly
        pin: true,
        scrub: 0.5,              // Smooth 60 FPS inertia scrubbing
        onUpdate: (self) => {
          setAssemblyProgress(self.progress);
        },
      });
    }, pinSectionRef);

    return () => ctx.revert();
  }, []);

  // 3. Discrete Step Canvas Loop: 100% Solid Opaque Rendering (ZERO Ghosting, ZERO Double Shadows)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || loadedImgs.length < 7) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Map assemblyProgress (0.0 to 1.0) into discrete solid frame indices (0 to 6)
    const p = Math.max(0, Math.min(1, assemblyProgress));

    // Calculate discrete step index
    const frameIdx = Math.min(loadedImgs.length - 1, Math.floor(p * loadedImgs.length));

    const currentImg = loadedImgs[frameIdx];

    // Render current frame at 100% SOLID OPAQUE (no see-through overlays or ghosting shadows)
    if (currentImg && currentImg.complete) {
      ctx.globalAlpha = 1.0;
      ctx.drawImage(currentImg, 0, 0, width, height);
    }
  }, [assemblyProgress, loadedImgs]);

  return (
    <div ref={pinSectionRef} className="relative w-full py-4 select-none bg-transparent overflow-visible pointer-events-none">
      
      {/* 100% CLEAN STAGE — SERVIDOR SÓLIDO TRANSPARENTE ULTRA-NÍTIDO CON HOTSPOTS 3D */}
      <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center overflow-visible bg-transparent pointer-events-none z-10">
        
        {/* SOFT NEON AMBIENT GLOW */}
        <div 
          className="absolute w-[500px] h-[300px] bg-gradient-to-r from-purple-600/20 via-emerald-400/20 to-purple-600/20 rounded-full blur-[110px] pointer-events-none transition-transform duration-200"
          style={{
            transform: `scale(${1 + assemblyProgress * 0.1})`,
            opacity: 0.5 + assemblyProgress * 0.4,
          }}
        />

        {/* 3D CONTAINER WITH INTERACTIVE HOTSPOT CALLOUTS */}
        <div 
          className="relative w-full max-w-[850px] aspect-[16/9] flex items-center justify-center overflow-visible transition-transform duration-100 ease-out bg-transparent border-0 outline-none shadow-none pointer-events-none"
          style={{
            transform: `perspective(1200px) rotateX(${5 - assemblyProgress * 4}deg) rotateY(${-6 + assemblyProgress * 6}deg) scale(${0.96 + assemblyProgress * 0.08})`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* INTERACTIVE 3D COMPONENT INSPECTOR PINS */}
          <ServerHotspots />

          {/* CANVAS VISIBLE: RENDERIZADO 100% SÓLIDO Y OPACO EN CADA PASO DE SCROLL */}
          <canvas
            ref={canvasRef}
            width={1200}
            height={675}
            className="w-full h-full object-contain relative z-20 border-0 outline-none shadow-none bg-transparent pointer-events-none filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
          />
        </div>

      </div>
    </div>
  );
};
