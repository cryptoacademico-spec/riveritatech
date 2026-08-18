import React, { useState, useEffect } from 'react';
import { Youtube, Search, CheckCircle2, Copy, Download, Lock, Unlock, Play, ShieldAlert, Sparkles } from 'lucide-react';
import { ArcCardReveal } from './ArcCardReveal';
import { SvgStrokeDraw } from './SvgStrokeDraw';

interface YouTubeScriptItem {
  id: string;
  videoTitle: string;
  videoId: string;
  youtubeUrl: string;
  ps1FileName: string;
  scriptFilePath: string;
}

const youtubeScriptsData: YouTubeScriptItem[] = [
  {
    id: 'yt-vcenter-91-filter',
    videoTitle: 'Cómo listar y filtrar VMs en vCenter 9.1 con PowerCLI 🚀',
    videoId: 'AzdTR59DhD0',
    youtubeUrl: 'https://www.youtube.com/watch?v=AzdTR59DhD0',
    ps1FileName: '02-Ver-VMs-Filtrar-Estado.ps1',
    scriptFilePath: '/scripts/02-Ver-VMs-Filtrar-Estado.ps1',
  },
  {
    id: 'yt-vcenter-91-connect',
    videoTitle: 'Cómo conectarse a vCenter 9.1 con PowerCLI 🚀',
    videoId: 'DIPPvQ34v8w',
    youtubeUrl: 'https://www.youtube.com/watch?v=DIPPvQ34v8w',
    ps1FileName: '01-Conectarse-a-vCenter.ps1',
    scriptFilePath: '/scripts/01-Conectarse-a-vCenter.ps1',
  },
  {
    id: 'yt-vcenter-91-datastore',
    videoTitle: 'Reporte de Datastores en vCenter 9.1 con PowerCLI 📊',
    videoId: 'l0zXbUCbb68',
    youtubeUrl: 'https://www.youtube.com/watch?v=l0zXbUCbb68',
    ps1FileName: '09-Reporte-Datastores.ps1',
    scriptFilePath: '/scripts/09-Reporte-Datastores.ps1',
  }
];

// Hash Algorithm using salt per attempt: PIN 1, PIN 2, PIN 3 are random non-sequential numbers
export const calculatePinForAttempt = (handle: string, videoId: string, attempt: number): string => {
  const clean = handle.trim().toLowerCase().replace(/[@'"]/g, '');
  if (!clean) return 'RIV000';
  
  const salt = `${clean}_${videoId}_v${attempt}_riveritasalt`;
  let hash = 0;
  for (let i = 0; i < salt.length; i++) {
    hash = (hash << 5) - hash + salt.charCodeAt(i);
    hash |= 0;
  }
  
  const absNum = Math.abs(hash) % 900 + 100;
  return `RIV${absNum}`;
};

export const YouTubeScriptsVault: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Independent input states per video script ID
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [pinInputs, setPinInputs] = useState<Record<string, string>>({});
  const [verifyingMap, setVerifyingMap] = useState<Record<string, boolean>>({});
  const [errorMap, setErrorMap] = useState<Record<string, string | null>>({});
  const [successMap, setSuccessMap] = useState<Record<string, string | null>>({});

  // Auto-filter card if URL has video ID parameter (e.g. ?v=l0zXbUCbb68)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const videoParam = params.get('v');
    if (videoParam) {
      const match = youtubeScriptsData.find(s => s.videoId.toLowerCase() === videoParam.toLowerCase());
      if (match) {
        setSearchTerm(match.videoTitle);
      }
    }
  }, []);

  // Unlocked scripts per session ONLY (Resets on page refresh so cards always start locked!)
  const [unlockedScriptIds, setUnlockedScriptIds] = useState<string[]>([]);

  // Burned PINs persist across sessions per video (So reused PINs are blocked permanently!)
  const [burnedPins, setBurnedPins] = useState<string[]>(() => {
    const saved = localStorage.getItem('riverita_burned_pins');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('riverita_burned_pins', JSON.stringify(burnedPins));
  }, [burnedPins]);

  // Robust Blob Download Trigger (Guarantees zero page reload or SPA routing jump)
  const triggerDirectDownload = (script: YouTubeScriptItem) => {
    fetch(script.scriptFilePath)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = script.ps1FileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.error('Download error:', err);
        const link = document.createElement('a');
        link.href = script.scriptFilePath;
        link.download = script.ps1FileName;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  const handleVerifyCommentAndPin = (script: YouTubeScriptItem) => {
    const scriptId = script.id;
    setErrorMap((prev) => ({ ...prev, [scriptId]: null }));
    setSuccessMap((prev) => ({ ...prev, [scriptId]: null }));

    const rawHandle = userInputs[scriptId] || '';
    const rawPin = pinInputs[scriptId] || '';

    // Normalize handle & PIN
    const cleanHandle = rawHandle.trim().toLowerCase().replace(/[@'"]/g, '');
    const cleanPin = rawPin.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (!cleanHandle) {
      setErrorMap((prev) => ({ ...prev, [scriptId]: 'Ingresa tu usuario de YouTube (ej: @tu_usuario_youtube)' }));
      return;
    }

    if (!cleanPin) {
      setErrorMap((prev) => ({ ...prev, [scriptId]: 'Ingresa tu PIN asignado (ej: RIV577)' }));
      return;
    }

    // 1. Calculate valid PINs for attempts 1, 2, 3, 4, 5 for this user handle AND this specific video ID
    const validAttemptPins = [
      calculatePinForAttempt(cleanHandle, script.videoId, 1),
      calculatePinForAttempt(cleanHandle, script.videoId, 2),
      calculatePinForAttempt(cleanHandle, script.videoId, 3),
      calculatePinForAttempt(cleanHandle, script.videoId, 4),
      calculatePinForAttempt(cleanHandle, script.videoId, 5)
    ];

    // 2. ABSOLUTE STRICT VALIDATION: Reject any PIN that is not generated for this user handle & video
    if (!validAttemptPins.includes(cleanPin)) {
      setErrorMap((prev) => ({
        ...prev,
        [scriptId]: `❌ PIN inválido para este video. El PIN "${cleanPin}" no corresponde a este video/usuario. Comenta "datastore" en el video para recibir tu PIN exacto.`
      }));
      return;
    }

    // 3. Check if THIS SPECIFIC PIN was ALREADY BURNED / USED for this video
    const pinKey = `${script.videoId}:${cleanHandle}:${cleanPin}`;
    const isPinBurned = burnedPins.includes(pinKey) || burnedPins.includes(cleanPin);
    if (isPinBurned) {
      setErrorMap((prev) => ({
        ...prev,
        [scriptId]: `❌ El PIN "${cleanPin}" para este video ya fue utilizado y quemado por su dueño. Por favor solicita un PIN nuevo en los comentarios.`
      }));
      return;
    }

    setVerifyingMap((prev) => ({ ...prev, [scriptId]: true }));

    // Perform verification, burn PIN, and trigger download
    setTimeout(() => {
      setVerifyingMap((prev) => ({ ...prev, [scriptId]: false }));
      
      // Permanently BURN this PIN for this specific video
      setBurnedPins((prev) => [...prev, pinKey, cleanPin]);

      // Unlock script for this session
      if (!unlockedScriptIds.includes(script.id)) {
        setUnlockedScriptIds((prev) => [...prev, script.id]);
      }

      // Show success alert message inside card
      setSuccessMap((prev) => ({
        ...prev,
        [scriptId]: `✅ ¡PIN ${cleanPin} Validado Exitosamente para este Video! Descargando ${script.ps1FileName}...`
      }));

      // AUTOMATICALLY TRIGGER BLOB DOWNLOAD
      triggerDirectDownload(script);
    }, 300);
  };

  const filtered = youtubeScriptsData.filter(
    (s) => s.videoTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="youtube-scripts-section" className="py-20 bg-slate-950/95 relative overflow-hidden min-h-screen">
      
      {/* Ambient Red Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header - CLEAN PUBLIC INSTRUCTIONS ONLY */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <SvgStrokeDraw>
              <Youtube className="w-4 h-4 text-red-500" />
            </SvgStrokeDraw>
            Bóveda Oficial de Scripts de YouTube
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Descarga los Scripts de <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-400 to-emerald-400">Nuestros Videos</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 font-normal">
            Cada video de nuestro canal tiene su script <code className="text-emerald-400 font-mono">.ps1</code> exclusivo. Comenta en el video e ingresa tu PIN único de 1 solo uso que te enviamos en los comentarios para desbloquear tu archivo.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por título del video..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/90 border border-white/10 text-white font-mono text-sm placeholder:text-slate-500 focus:outline-none focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20 shadow-xl"
          />
        </div>

        {/* YouTube Scripts Grid - MULTI VIDEO SUPPORT (INDEPENDENT PIN MATCHING PER VIDEO) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((script, idx) => {
            const isUnlocked = unlockedScriptIds.includes(script.id);
            const scriptId = script.id;

            return (
              <ArcCardReveal key={script.id} index={idx} total={filtered.length}>
                <div className="group relative glass-card-luxury p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between transition-all duration-300 overflow-hidden h-full">
                  
                  {/* Corner Crosshairs */}
                  <div className="absolute top-3 left-3 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-red-400 transition-colors">+</div>
                  <div className="absolute top-3 right-3 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-red-400 transition-colors">+</div>

                  <div className="space-y-5">
                    
                    {/* ONLY THE EXACT VIDEO TITLE */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-red-300 transition-colors leading-snug">
                      {script.videoTitle}
                    </h3>

                    {/* Locked/Unlocked Content State - DIRECT INLINE FORM */}
                    {isUnlocked ? (
                      <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 font-mono text-xs text-emerald-400 space-y-3">
                        <div className="flex justify-between items-center text-slate-300 pb-2 border-b border-slate-900">
                          <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Script .ps1 Desbloqueado: {script.ps1FileName}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">
                          Archivo oficial listo para descargar: <code className="text-emerald-400 font-mono">{script.ps1FileName}</code>
                        </p>
                        <button
                          type="button"
                          onClick={() => triggerDirectDownload(script)}
                          className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                        >
                          <Download className="w-4 h-4" /> Descargar {script.ps1FileName}
                        </button>
                      </div>
                    ) : (
                      /* DIRECT INLINE FORM - STRICT SINGLE PIN MATCHING PER VIDEO & ATTEMPTS 1..5 */
                      <div className="bg-slate-950/90 p-5 rounded-2xl border border-white/10 space-y-3.5 font-mono">
                        
                        <div className="flex items-center gap-2 text-xs text-slate-300 font-bold pb-2 border-b border-white/5">
                          <Lock className="w-4 h-4 text-red-400 shrink-0 animate-pulse" />
                          <span>Ingresa tu Usuario de YouTube y PIN de 1 Solo Uso:</span>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="text-[11px] text-slate-400 block mb-1">
                              1. Tu Usuario de YouTube:
                            </label>
                            <input
                              type="text"
                              value={userInputs[scriptId] || ''}
                              onChange={(e) => setUserInputs((prev) => ({ ...prev, [scriptId]: e.target.value }))}
                              placeholder="Ejemplo: @tu_usuario_youtube"
                              className="w-full bg-slate-900 border border-purple-500/40 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] text-slate-400 block mb-1">
                              2. Tu PIN Único para ESTE Video:
                            </label>
                            <input
                              type="text"
                              value={pinInputs[scriptId] || ''}
                              onChange={(e) => setPinInputs((prev) => ({ ...prev, [scriptId]: e.target.value }))}
                              placeholder="EJEMPLO: RIVxxxx"
                              className="w-full bg-slate-900 border border-red-500/40 rounded-xl px-3.5 py-2 text-xs text-white font-bold tracking-widest focus:outline-none focus:border-emerald-400 uppercase"
                            />
                          </div>
                        </div>

                        {/* ERROR ALERT INSIDE CARD */}
                        {errorMap[scriptId] && (
                          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2">
                            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{errorMap[scriptId]}</span>
                          </div>
                        )}

                        {/* SUCCESS ALERT INSIDE CARD */}
                        {successMap[scriptId] && (
                          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{successMap[scriptId]}</span>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => handleVerifyCommentAndPin(script)}
                          disabled={verifyingMap[scriptId]}
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 via-purple-600 to-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {verifyingMap[scriptId] ? (
                            <>
                              <Sparkles className="w-4 h-4 animate-spin" />
                              <span>Validando PIN y Descargando Script...</span>
                            </>
                          ) : (
                            <>
                              <Unlock className="w-4 h-4" />
                              <span>Validar PIN y Desbloquear .ps1</span>
                            </>
                          )}
                        </button>

                      </div>
                    )}
                  </div>

                  {/* Footer Action Buttons */}
                  <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between">
                    <a
                      href={script.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 font-mono text-xs font-bold hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 text-red-500 fill-red-500" /> Ver Video en YouTube
                    </a>
                  </div>

                </div>
              </ArcCardReveal>
            );
          })}
        </div>

      </div>

    </section>
  );
};
