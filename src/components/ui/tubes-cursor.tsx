import React, { useEffect, useRef } from 'react';

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);

  const randomColors = (count: number) => {
    return new Array(count)
      .fill(0)
      .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
  };

  useEffect(() => {
    const initTimer = setTimeout(() => {
      import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js' as any)
        .then((module: any) => {
          const TubesCursorImpl = module.default;
          
          if (canvasRef.current) {
            const app = TubesCursorImpl(canvasRef.current, {
              tubes: {
                colors: ["#CC092F", "#00C288", "#8965e0"],
                lights: {
                  intensity: 200,
                  colors: ["#00C288", "#CC092F", "#a855f7", "#10b981"]
                }
              }
            });
            appRef.current = app;
          }
        })
        .catch((err) => console.error("Failed to load TubesCursor module:", err));
    }, 100);

    return () => {
      clearTimeout(initTimer);
      if (appRef.current && typeof appRef.current.dispose === 'function') {
        appRef.current.dispose();
      }
    };
  }, []);

  const handleClick = () => {
    if (appRef.current && appRef.current.tubes) {
      const newTubeColors = randomColors(3);
      const newLightColors = randomColors(4);
      if (typeof appRef.current.tubes.setColors === 'function') {
        appRef.current.tubes.setColors(newTubeColors);
      }
      if (typeof appRef.current.tubes.setLightsColors === 'function') {
        appRef.current.tubes.setLightsColors(newLightColors);
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-auto" />
    </div>
  );
}
