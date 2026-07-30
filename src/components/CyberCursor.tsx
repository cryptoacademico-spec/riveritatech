import React, { useEffect, useState } from 'react';

export const CyberCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor-text]') as HTMLElement;
      const interactiveTarget = target.closest('button, a, input, .cursor-pointer') as HTMLElement;

      if (cursorTarget && cursorTarget.getAttribute('data-cursor-text')) {
        setIsHovered(true);
        setHoverText(cursorTarget.getAttribute('data-cursor-text'));
      } else if (interactiveTarget) {
        setIsHovered(true);
        setHoverText(null);
      } else {
        setIsHovered(false);
        setHoverText(null);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Dynamic Cursor Ring & Label */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[99999] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out flex items-center justify-center ${
          hoverText
            ? 'px-3.5 py-1.5 rounded-full bg-emerald-500/90 text-slate-950 font-mono font-black text-[10px] tracking-wider uppercase shadow-[0_0_25px_rgba(16,185,129,0.8)] border border-white/40'
            : isHovered
            ? 'w-10 h-10 rounded-full border-2 border-emerald-400 bg-emerald-500/20 shadow-[0_0_25px_rgba(16,185,129,0.7)] backdrop-blur-sm'
            : 'w-7 h-7 rounded-full border border-purple-500/50 bg-purple-500/10'
        } ${isClicked ? 'scale-90' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {hoverText && <span>{hoverText}</span>}
      </div>
    </>
  );
};
