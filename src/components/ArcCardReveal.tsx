import React, { useRef, useEffect, useState } from 'react';

interface ArcCardRevealProps {
  children: React.ReactNode;
  index: number;
  total: number;
}

export const ArcCardReveal: React.FC<ArcCardRevealProps> = ({ children, index, total }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const pairIndex = Math.floor(index / 2);
          const delay = pairIndex * 220; // 220ms stagger between pairs

          setTimeout(() => {
            setIsRevealed(true);
          }, delay);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(card);

    // Safety fallback: guaranteed reveal after 600ms so cards are NEVER hidden
    const fallbackTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 600 + index * 100);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [index]);

  // Curved entrance path: even index from left, odd index from right
  const isLeft = index % 2 === 0;
  const startX = isLeft ? -180 : 180;
  const startRot = isLeft ? -6 : 6;

  return (
    <div
      ref={cardRef}
      style={{
        transform: isRevealed
          ? 'translate3d(0px, 0px, 0px) scale(1) rotate(0deg)'
          : `translate3d(${startX}px, 80px, 0px) scale(0.86) rotate(${startRot}deg)`,
        opacity: isRevealed ? 1 : 0,
        transition: `transform 1.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease-out`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};

// =============================================================================
// STRIPE WIPE TRANSITION COMPONENT
// =============================================================================

interface StripeWipeProps {
  stripeCount?: number;
  colorFrom?: string;
  colorTo?: string;
}

export const StripeWipe: React.FC<StripeWipeProps> = () => {
  // Silent null wrapper so no unwanted stripe banners are rendered
  return null;
};
