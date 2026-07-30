import React, { useRef, useEffect, useState } from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

interface VideoScrollDriverProps {
  scrollProgress: number;
  className?: string;
}

export const VideoScrollDriver: React.FC<VideoScrollDriverProps> = ({
  scrollProgress,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);

  // High-performance image sequence fallback
  const frameImages = [
    '/server_stage1_closed.png',
    '/server_stage2_open.png',
    '/server_stage3_exploded.png',
  ];

  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);

  // Preload fallback frames
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let loadedCount = 0;

    frameImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameImages.length) {
          setLoadedImages(imgs);
        }
      };
      imgs.push(img);
    });
  }, []);

  const p = Math.max(0, Math.min(1, scrollProgress * 1.35));

  // Canvas Chroma-Keying & Smooth Render Loop
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const renderLoop = () => {
      // 1. Draw Canvas background & size
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // 2. Render smooth interpolated frame sequence with chroma removal
      if (loadedImages.length === 3) {
        // Calculate frame weight
        const progressScaled = p * 2; // 0 to 2 range across 3 frames
        const stageIndex = Math.min(1, Math.floor(progressScaled));
        const alphaFraction = progressScaled - stageIndex;

        const currentImg = loadedImages[stageIndex];
        const nextImg = loadedImages[Math.min(2, stageIndex + 1)];

        if (currentImg && currentImg.complete) {
          ctx.globalAlpha = 1 - alphaFraction;
          ctx.drawImage(currentImg, 0, 0, width, height);
        }

        if (nextImg && nextImg.complete && alphaFraction > 0) {
          ctx.globalAlpha = alphaFraction;
          ctx.drawImage(nextImg, 0, 0, width, height);
        }

        ctx.globalAlpha = 1.0;

        // 3. Dynamic Chroma Keying (Remove light grey background #d0d0d0 to #ffffff)
        try {
          const imgData = ctx.getImageData(0, 0, width, height);
          const data = imgData.data;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // If pixel is light grey or near white background (r > 190, g > 190, b > 190)
            if (r > 185 && g > 185 && b > 185 && Math.abs(r - g) < 25 && Math.abs(g - b) < 25) {
              const brightness = (r + g + b) / 3;
              // Smooth alpha dropoff for light pixels
              const alpha = Math.max(0, Math.min(255, (255 - brightness) * 3));
              data[i + 3] = alpha;
            }
          }
          ctx.putImageData(imgData, 0, 0);
        } catch (err) {
          // Fallback if cross-origin or canvas read error occurs
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    renderLoop();
    return () => cancelAnimationFrame(animId);
  }, [p, loadedImages]);

  return (
    <div className={`relative w-full max-w-4xl mx-auto py-6 select-none ${className}`}>
      {/* HIGH-TECH GLASS CONTAINER PANEL (PROTECTS WEBSITE BEAUTY & DESIGN) */}
      <div className="relative w-full aspect-[16/9] max-h-[480px] rounded-3xl overflow-hidden glass-panel-luxury border border-white/15 shadow-[0_0_50px_rgba(168,85,247,0.25)] p-4 sm:p-6 flex items-center justify-center bg-[#030712]">
        
        {/* NEON GLOW ATMOSPHERE LIGHT BEHIND SERVER */}
        <div 
          className="absolute w-[500px] h-[300px] bg-gradient-to-r from-purple-600/30 via-emerald-400/30 to-purple-600/30 rounded-full blur-[100px] pointer-events-none transition-opacity duration-300 z-0"
          style={{
            opacity: 0.7 + p * 0.3,
          }}
        />

        {/* LASER SCANNING BEAM DIVIDER */}
        <div 
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-emerald-400 to-purple-600 shadow-[0_0_20px_rgba(52,211,153,1)] transition-all duration-75 ease-out pointer-events-none z-30"
          style={{ top: `${Math.max(10, Math.min(90, p * 100))}%` }}
        />

        {/* HIGH-SPEED CHROMA-KEYED CANVAS (100% TRANSPARENT BACKGROUND, 60 FPS) */}
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
        />

        {/* HUD FOOTER STATUS (CLEAN, ELEGANT & MINIMALIST) */}
        <div className="absolute bottom-4 left-6 right-6 z-20 flex justify-between items-center pointer-events-none text-xs font-mono">
          <div className="bg-slate-950/80 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-slate-300 flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold">
              {p < 0.3 ? "Servidor ESXi vSphere (Cerrado)" : (p < 0.7 ? "Tapa Superior Abierta" : "Componentes Desarmados 3D")}
            </span>
          </div>

          <div className="bg-slate-950/80 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-purple-300 shadow-lg flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>Desplaza para desarmar</span>
          </div>
        </div>

      </div>
    </div>
  );
};
