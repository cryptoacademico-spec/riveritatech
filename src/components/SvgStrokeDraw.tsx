import React, { useRef, useEffect, useState } from 'react';

interface SvgStrokeDrawProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const SvgStrokeDraw: React.FC<SvgStrokeDrawProps> = ({ children, delay = 0, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsDrawn(true);
          }, delay);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(container);

    // Fallback timer to ensure icon is always visible
    const fallbackTimer = setTimeout(() => {
      setIsDrawn(true);
    }, delay + 400);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [delay]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{
        transform: isDrawn ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-8deg)',
        opacity: isDrawn ? 1 : 0,
        filter: isDrawn ? 'drop-shadow(0 0 12px rgba(52, 211, 153, 0.4))' : 'none',
        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out, filter 0.8s ease-out',
        willChange: 'transform, opacity, filter',
      }}
    >
      {children}
    </div>
  );
};
