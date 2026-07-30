import React, { useRef, useEffect, useState, useCallback } from 'react';

interface ParticleHeadlineProps {
  text: string;
  gradientText?: string;
  className?: string;
  gradientClassName?: string;
}

interface Particle {
  el: HTMLSpanElement;
  ox: number;
  oy: number;
  dirX: number;
  dirY: number;
  speed: number;
  rotSpeed: number;
  delay: number;
}

export const ParticleHeadline: React.FC<ParticleHeadlineProps> = ({
  text,
  gradientText,
  className = '',
  gradientClassName = 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const animFrameRef = useRef<number>(0);
  const progressRef = useRef(0);

  const fullText = gradientText ? `${text} ${gradientText}` : text;

  // Reveal letters on scroll into view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(container);

    // Safety fallback: reveal after 300ms if observer missed
    const fallbackTimer = setTimeout(() => setIsRevealed(true), 400);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Measure characters for particle burst effect on hover or scroll reveal
  const measureAndCreateParticles = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans = container.querySelectorAll<HTMLSpanElement>('[data-char]');
    const particles: Particle[] = [];
    const containerRect = container.getBoundingClientRect();
    const maxDim = Math.max(containerRect.width, containerRect.height);

    spans.forEach((span, i) => {
      const rect = span.getBoundingClientRect();
      const angle = (Math.random() - 0.5) * Math.PI * 2;
      const speed = (0.15 + Math.random() * 0.25) * maxDim;

      particles.push({
        el: span,
        ox: rect.left - containerRect.left + rect.width / 2,
        oy: rect.top - containerRect.top + rect.height / 2,
        dirX: Math.cos(angle),
        dirY: Math.sin(angle) * 0.8,
        speed,
        rotSpeed: (Math.random() - 0.5) * 360,
        delay: i * 0.015,
      });
    });

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const timer = setTimeout(measureAndCreateParticles, 200);
    return () => clearTimeout(timer);
  }, [measureAndCreateParticles]);

  // Particle explosion loop on hover / pulse
  useEffect(() => {
    const loop = () => {
      const targetProgress = isHovered ? 1 : 0;
      const diff = targetProgress - progressRef.current;
      progressRef.current += diff * 0.1;

      const progress = progressRef.current;

      particlesRef.current.forEach((p) => {
        const t = Math.max(0, Math.min(1, (progress - p.delay) / (1 - p.delay)));
        const eased = t * (2 - t);

        if (t > 0.001) {
          const tx = p.dirX * p.speed * eased;
          const ty = p.dirY * p.speed * eased;
          const rot = p.rotSpeed * eased;

          p.el.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${1 + eased * 0.15})`;
          p.el.style.textShadow = `0 0 ${15 * eased}px rgba(168, 85, 247, 0.8)`;
        } else {
          p.el.style.transform = 'translate(0px, 0px) rotate(0deg) scale(1)';
          p.el.style.textShadow = 'none';
        }
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isHovered]);

  // Split text into characters with individual spans
  const renderChars = () => {
    const words = fullText.split(' ');
    let charIndex = 0;
    const normalWordCount = text.split(' ').length;

    return words.map((word, wordIdx) => {
      const isGradientWord = gradientText && wordIdx >= normalWordCount;

      const chars = word.split('').map((char) => {
        const idx = charIndex++;
        return (
          <span
            key={`char-${idx}`}
            data-char={char}
            className={`inline-block transition-all duration-700 ease-out ${isGradientWord ? gradientClassName : ''}`}
            style={{
              opacity: isRevealed ? 1 : 0,
              filter: isRevealed ? 'blur(0px)' : 'blur(10px)',
              transform: isRevealed ? 'translateY(0px)' : 'translateY(15px)',
              transitionDelay: `${idx * 25}ms`,
              willChange: 'transform, opacity, filter',
            }}
          >
            {char}
          </span>
        );
      });

      charIndex++;
      return (
        <span key={`word-${wordIdx}`} className="inline-block whitespace-nowrap">
          {chars}
          {wordIdx < words.length - 1 && (
            <span data-char=" " className="inline-block" style={{ width: '0.3em' }}>
              &nbsp;
            </span>
          )}
        </span>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative cursor-pointer select-none ${className}`}
    >
      <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
        {renderChars()}
      </h2>
    </div>
  );
};
