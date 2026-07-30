import React, { useEffect, useRef } from 'react';

export const DatacenterRackCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle System (vSAN IOPS & Broadcom Fiber Optic Packets)
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
    }

    const particles: Particle[] = [];
    const particleCount = 45;
    const colors = ['#00C288', '#CC092F', '#34D399', '#F43F5E'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1,
        speedY: -(Math.random() * 0.4 + 0.1),
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    // Rack Tower Verticals
    interface RackTower {
      x: number;
      width: number;
      leds: { y: number; active: boolean; color: string; timer: number }[];
    }

    const towers: RackTower[] = [];
    const towerSpacing = 220;
    const numTowers = Math.ceil(width / towerSpacing) + 1;

    for (let i = 0; i < numTowers; i++) {
      const leds = [];
      const numLeds = 14;
      for (let j = 0; j < numLeds; j++) {
        leds.push({
          y: (height / numLeds) * j + 20,
          active: Math.random() > 0.5,
          color: Math.random() > 0.3 ? '#00C288' : '#CC092F',
          timer: Math.floor(Math.random() * 100),
        });
      }

      towers.push({
        x: i * towerSpacing - 40,
        width: 140,
        leds,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep Dark Ambient Gradient Background
      const bgGrad = ctx.createRadialGradient(
        mouseX,
        mouseY,
        50,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, 'rgba(15, 10, 25, 0.95)');
      bgGrad.addColorStop(0.5, 'rgba(8, 6, 16, 0.98)');
      bgGrad.addColorStop(1, 'rgba(2, 4, 10, 1)');

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // RENDER RACK TOWERS IN THE BACKGROUND
      towers.forEach((tower) => {
        // Rack Frame Outline
        ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
        ctx.fillRect(tower.x, 0, tower.width, height);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        ctx.strokeRect(tower.x, 0, tower.width, height);

        // Rack Drive Slot Lines
        for (let y = 0; y < height; y += 45) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
          ctx.beginPath();
          ctx.moveTo(tower.x, y);
          ctx.lineTo(tower.x + tower.width, y);
          ctx.stroke();
        }

        // Animated vSAN Storage LEDs
        tower.leds.forEach((led) => {
          led.timer++;
          if (led.timer > 80) {
            led.active = Math.random() > 0.4;
            led.timer = 0;
          }

          if (led.active) {
            ctx.fillStyle = led.color;
            ctx.shadowColor = led.color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(tower.x + 25, led.y, 2, 0, Math.PI * 2);
            ctx.fill();

            // Additional small indicator
            ctx.fillStyle = '#00C288';
            ctx.fillRect(tower.x + 35, led.y - 1, 8, 2);
          }
        });
      });

      // Reset shadow blur
      ctx.shadowBlur = 0;

      // RENDER STREAMING FIBER OPTIC DATA PARTICLES
      particles.forEach((p) => {
        p.y += p.speedY;
        p.alpha += p.pulseSpeed;

        if (p.alpha > 0.8 || p.alpha < 0.1) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
    />
  );
};
