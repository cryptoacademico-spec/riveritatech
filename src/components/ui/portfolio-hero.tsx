import React, { useState, useEffect, useRef } from "react";

export interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 30,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [active, setActive] = useState(true); // Default true so text is ALWAYS visible!
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure visibility fallback
    const timer = setTimeout(() => setActive(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const words = text.split(" ");

  if (animateBy === "letters") {
    return (
      <div ref={ref} className={`inline-flex flex-wrap justify-center gap-x-3 sm:gap-x-4 gap-y-2 ${className}`} style={style}>
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {word.split("").map((char, charIdx) => {
              const charIndex = wordIdx * 5 + charIdx;
              return (
                <span
                  key={charIdx}
                  style={{
                    display: "inline-block",
                    filter: active ? "blur(0px)" : "blur(8px)",
                    opacity: active ? 1 : 0,
                    transform: active ? "translateY(0)" : `translateY(${direction === "top" ? "-10px" : "10px"})`,
                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${charIndex * delay}ms`,
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center gap-x-2.5 gap-y-1.5 ${className}`} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: active ? "blur(0px)" : "blur(8px)",
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : `translateY(${direction === "top" ? "-10px" : "10px"})`,
            transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * delay}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};
