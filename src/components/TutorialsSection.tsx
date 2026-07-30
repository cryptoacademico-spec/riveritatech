import React, { useState } from 'react';
import { Play, Video, Youtube, X, Sparkles } from 'lucide-react';
import { ArcCardReveal } from './ArcCardReveal';

const misTutoriales = [
  {
    id: 1,
    titulo: "VMWARE LABS GRATIS: Simula vMotion, DRS y HA en vSphere",
    tipo: "Video",
    duracion: "Tutorial", 
    videoId: "iFr16fXUjz4",
    thumbnail: "https://img.youtube.com/vi/iFr16fXUjz4/maxresdefault.jpg", 
    link: "https://www.youtube.com/watch?v=iFr16fXUjz4"
  },
  {
    id: 2,
    titulo: "Cómo Instalar VMware ESXi 9.0.1 DESDE CERO en Workstation 2025",
    tipo: "Video",
    duracion: "Guía",
    videoId: "mSa_rtnWK3s",
    thumbnail: "https://img.youtube.com/vi/mSa_rtnWK3s/maxresdefault.jpg", 
    link: "https://www.youtube.com/watch?v=mSa_rtnWK3s"
  },
  {
    id: 3,
    titulo: "Cómo Instalar VMware Workstation Pro 25H2 GRATIS",
    tipo: "Video",
    duracion: "Tutorial",
    videoId: "-9a1mGe1Q8c",
    thumbnail: "https://img.youtube.com/vi/-9a1mGe1Q8c/maxresdefault.jpg", 
    link: "https://www.youtube.com/watch?v=-9a1mGe1Q8c"
  },
  {
    id: 4,
    titulo: "Aprende vSAN desde Cero | Laboratorio VMware",
    tipo: "Video",
    duracion: "Tutorial",
    videoId: "oBl2k1PHc4k",
    thumbnail: "https://img.youtube.com/vi/oBl2k1PHc4k/maxresdefault.jpg", 
    link: "https://www.youtube.com/watch?v=oBl2k1PHc4k"
  },
  {
    id: 5,
    titulo: "Instalación y Configuración vCenter 9.0.1 | Guía Desde Cero",
    tipo: "Video",
    duracion: "Tutorial",
    videoId: "7MpL3LSGJ5U",
    thumbnail: "https://img.youtube.com/vi/7MpL3LSGJ5U/maxresdefault.jpg", 
    link: "https://www.youtube.com/watch?v=7MpL3LSGJ5U"
  },
  {
    id: 6,
    titulo: "Al crear VM en VMware: NO des Siguiente sin saber ESTO (Thin vs Thick)",
    tipo: "Video",
    duracion: "Tutorial",
    videoId: "uL_IviZBzPM",
    thumbnail: "https://img.youtube.com/vi/uL_IviZBzPM/maxresdefault.jpg", 
    link: "https://www.youtube.com/watch?v=uL_IviZBzPM"
  },
  {
    id: 7,
    titulo: "Configura Backup Nativo vCenter + Servidor FTP (Guía 2026)",
    tipo: "Video",
    duracion: "Tutorial",
    videoId: "l28FaDBe4ys",
    thumbnail: "https://img.youtube.com/vi/l28FaDBe4ys/maxresdefault.jpg", 
    link: "https://www.youtube.com/watch?v=l28FaDBe4ys"
  }
];

export const TutorialsSection: React.FC = () => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  return (
    <section id="tutorials-section" className="py-20 bg-slate-950/90 relative overflow-hidden min-h-screen">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <Youtube className="w-4 h-4 text-red-400" /> Contenido Técnico en YouTube
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Academia <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-purple-400">Riverita TECH</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 font-normal">
            Guías paso a paso, resolución de fallas reales y demos de ingeniería en vSphere, vSAN y PowerCLI.
          </p>
        </div>

        {/* Video Cards Grid with Arc Card Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {misTutoriales.map((tuto, idx) => (
            <ArcCardReveal key={tuto.id} index={idx} total={misTutoriales.length}>
              <div
                data-cursor-text="VER VIDEO"
                onClick={() => setSelectedVideoId(tuto.videoId)}
                className="group cursor-pointer glass-card-luxury rounded-3xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-500 shadow-xl hover:shadow-[0_0_35px_rgba(239,68,68,0.3)] flex flex-col hover:-translate-y-2 relative"
              >
                {/* TRIONN CORNER CROSSHAIRS (+) */}
                <div className="absolute top-2 left-2 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-red-400 transition-colors z-20">+</div>
                <div className="absolute top-2 right-2 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-red-400 transition-colors z-20">+</div>

                {/* Thumbnail Container */}
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img 
                    src={tuto.thumbnail} 
                    alt={tuto.titulo} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute('src', `https://img.youtube.com/vi/${tuto.videoId}/hqdefault.jpg`);
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/10 transition-colors" />
                  
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 text-white text-[11px] px-2.5 py-1 rounded-lg border border-white/10 font-mono font-bold">
                    {tuto.duracion}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                    <div className="bg-red-600/90 p-4 rounded-full shadow-2xl backdrop-blur-md group-hover:scale-110 transition-transform">
                      <Play size={26} className="text-white fill-current translate-x-0.5"/>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <span className="text-[11px] font-bold font-mono text-red-400 uppercase mb-2 block tracking-wider flex items-center gap-1.5">
                    <Video size={14}/> {tuto.tipo}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                    {tuto.titulo}
                  </h3>
                </div>
              </div>
            </ArcCardReveal>
          ))}
        </div>

      </div>

      {/* YOUTUBE MODAL PLAYER */}
      {selectedVideoId && (
        <div className="fixed inset-0 z-[20000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setSelectedVideoId(null)}
              className="absolute top-4 right-4 z-10 bg-slate-950/80 text-white p-2.5 rounded-full border border-white/20 hover:bg-red-600 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                title="YouTube Video Player"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
