import React, { useRef, useEffect, useState } from 'react';

interface ServerBlueprintMorphProps {
  scrollProgress?: number;
}

interface Particle3D {
  x0: number;
  y0: number;
  z0: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  layer: number; // 0: chassis, 1: motherboard, 2: fans, 3: lid
}

export const ServerBlueprintMorph: React.FC<ServerBlueprintMorphProps> = ({ scrollProgress = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle3D[]>([]);

  const [p, setP] = useState(scrollProgress);

  useEffect(() => {
    setP(scrollProgress);
  }, [scrollProgress]);

  // Generate 3D Particle Grid (Isometric Server Component Mesh)
  useEffect(() => {
    const particles: Particle3D[] = [];
    const colors = ['#34d399', '#a855f7', '#38bdf8', '#6ee7b7', '#c084fc'];

    // Layer 0: Base Chassis (80 particles)
    for (let i = 0; i < 80; i++) {
      particles.push({
        x0: (Math.random() - 0.5) * 360,
        y0: 60 + (Math.random() - 0.5) * 40,
        z0: (Math.random() - 0.5) * 160,
        vx: (Math.random() - 0.5) * 220,
        vy: 40 + Math.random() * 120,
        vz: (Math.random() - 0.5) * 180,
        size: 1.5 + Math.random() * 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        layer: 0,
      });
    }

    // Layer 1: Motherboard & Dual CPU Sockets (80 particles)
    for (let i = 0; i < 80; i++) {
      particles.push({
        x0: (Math.random() - 0.5) * 320,
        y0: 20 + (Math.random() - 0.5) * 30,
        z0: (Math.random() - 0.5) * 140,
        vx: (Math.random() - 0.5) * 260,
        vy: -40 - Math.random() * 160,
        vz: (Math.random() - 0.5) * 200,
        size: 2.0 + Math.random() * 2.5,
        color: '#34d399', // Emerald CPU/PCB
        layer: 1,
      });
    }

    // Layer 2: Cooling Fans & Top Lid Cover (90 particles)
    for (let i = 0; i < 90; i++) {
      particles.push({
        x0: (Math.random() - 0.5) * 380,
        y0: -40 + (Math.random() - 0.5) * 40,
        z0: (Math.random() - 0.5) * 180,
        vx: (Math.random() - 0.5) * 300,
        vy: -120 - Math.random() * 220,
        vz: (Math.random() - 0.5) * 240,
        size: 2.0 + Math.random() * 3.0,
        color: '#a855f7', // Purple Top Lid
        layer: 2,
      });
    }

    particlesRef.current = particles;
  }, []);

  // 60 FPS RAF Render Loop (Particle Disassembly & Re-assembly by Scroll)
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const progressVal = Math.max(0, Math.min(1, p * 1.3));

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Draw ambient particles floating & exploding in 3D
      const particles = particlesRef.current;
      const explodeFactor = progressVal;

      particles.forEach((pt) => {
        // Calculate current 3D position based on scroll explosion factor
        const px = pt.x0 + pt.vx * explodeFactor;
        const py = pt.y0 + pt.vy * explodeFactor;
        const pz = pt.z0 + pt.vz * explodeFactor;

        // Perspective 3D projection
        const scale = 800 / (800 + pz);
        const screenX = cx + px * scale;
        const screenY = cy + py * scale;
        const radius = Math.max(0.5, pt.size * scale);

        // Alpha fade based on explosion distance
        const alpha = Math.max(0.2, 1.0 - explodeFactor * 0.5);

        // Render Glowing Particle
        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 12 * explodeFactor;
        ctx.shadowColor = pt.color;
        ctx.fill();

        // Connect nearby particles with subtle energy filaments when exploding
        if (explodeFactor > 0.1 && Math.random() < 0.08) {
          ctx.beginPath();
          ctx.moveTo(screenX, screenY);
          ctx.lineTo(screenX + (Math.random() - 0.5) * 30, screenY + (Math.random() - 0.5) * 30);
          ctx.strokeStyle = pt.color;
          ctx.globalAlpha = 0.25 * explodeFactor;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [p]);

  const explodeFactor = Math.max(0, Math.min(1, p * 1.3));

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto py-6 select-none"
    >
      {/* 100% TRANSPARENT 3D PARTICLE DISASSEMBLY STAGE — NO LASERS, NO GREY BOXES */}
      <div className="relative w-full aspect-[16/9] max-h-[500px] flex items-center justify-center overflow-visible">
        
        {/* ATMOSPHERIC AMBIENT GLOW LIGHT */}
        <div 
          className="absolute w-[500px] h-[300px] bg-gradient-to-r from-purple-600/25 via-emerald-400/25 to-purple-600/25 rounded-full blur-[120px] pointer-events-none transition-opacity duration-300 z-0"
          style={{
            opacity: 0.5 + explodeFactor * 0.5,
          }}
        />

        {/* SOLID SERVER IMAGE (FADES OUT AS IT DISSOLVES INTO PARTICLES) */}
        <div 
          className="absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-150 ease-out z-10 pointer-events-none"
          style={{
            opacity: Math.max(0, 1 - explodeFactor * 1.5),
            transform: `scale(${1 - explodeFactor * 0.05})`,
          }}
        >
          <img
            src="/server_stage1_closed.png"
            alt="Servidor ESXi vSphere"
            className="w-full h-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)]"
          />
        </div>

        {/* 60 FPS HIGH-SPEED 3D PARTICLE CANVAS EXPLOSION */}
        <canvas
          ref={canvasRef}
          width={900}
          height={500}
          className="relative z-20 w-full h-full object-contain pointer-events-none"
        />

      </div>
    </div>
  );
};
