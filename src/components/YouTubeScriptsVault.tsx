import React, { useState, useEffect } from 'react';
import { Youtube, Search, Code, CheckCircle2, Copy, Download, Lock, Unlock, Play, ShieldAlert, Sparkles, AlertCircle, KeyRound, HelpCircle } from 'lucide-react';
import { ArcCardReveal } from './ArcCardReveal';
import { SvgStrokeDraw } from './SvgStrokeDraw';

interface YouTubeScriptItem {
  id: string;
  videoTitle: string;
  videoId: string;
  youtubeUrl: string;
  category: string;
  description: string;
  ps1FileName: string;
  scriptFilePath: string;
  scriptCodeContent: string;
}

const youtubeScriptsData: YouTubeScriptItem[] = [
  {
    id: 'yt-vcenter-91-filter',
    videoTitle: 'Cómo listar y filtrar VMs en vCenter 9.1 con PowerCLI 🚀',
    videoId: 'AzdTR59DhD0',
    youtubeUrl: 'https://www.youtube.com/watch?v=AzdTR59DhD0',
    category: 'vSphere & vCenter 9.1',
    description: 'Script oficial .ps1 para listar e inspeccionar el estado de las máquinas virtuales en vCenter 9.1 con filtrado de CPU, RAM, Datastore e IPs.',
    ps1FileName: 'script_vcenter91_filter_vms.ps1',
    scriptFilePath: '/scripts/script_vcenter91_filter_vms.ps1',
    scriptCodeContent: `# ====================================================================
# RIVERITA TECH - SCRIPT OFICIAL YOUTUBE
# Video: Cómo listar y filtrar VMs en vCenter 9.1 con PowerCLI
# Link Oficial: https://www.youtube.com/watch?v=AzdTR59DhD0
# Web Oficial: www.riveritatech.com | Canal: @RiveritaTech
# ====================================================================

Param(
    [string]$vCenterServer = "vcenter.corp.local",
    [string]$FilterStatus = "PoweredOn"
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " RIVERITA TECH - INVENTARIO & REPORTE vCENTER 9.1" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan

Write-Host "[+] Conectando a vCenter Server: $vCenterServer..." -ForegroundColor Green
Connect-VIServer -Server $vCenterServer -WarningAction SilentlyContinue

Write-Host "[+] Consultando maquinas virtuales con estado '$FilterStatus'..." -ForegroundColor Cyan
$Report = Get-VM | Where-Object {$_.PowerState -eq $FilterStatus} | Select-Object Name, PowerState, NumCpu, MemoryGB, @{N="IP";E={$_.Guest.IPAddress[0]}}, @{N="Datastore";E={(Get-Datastore -VM $_).Name}}

$Report | Format-Table -AutoSize

Write-Host "[+] Consulta completada con exito en Riverita Tech Platform." -ForegroundColor Green
`
  }
];

export const YouTubeScriptsVault: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModalScript, setActiveModalScript] = useState<YouTubeScriptItem | null>(null);
  
  // Verification form states
  const [userHandleInput, setUserHandleInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  
  // Unlocked scripts and used PINs persistence
  const [unlockedScriptIds, setUnlockedScriptIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('riverita_unlocked_scripts');
    return saved ? JSON.parse(saved) : [];
  });

  const [usedPins, setUsedPins] = useState<string[]>(() => {
    const saved = localStorage.getItem('riverita_used_pins');
    return saved ? JSON.parse(saved) : ['Riv0'];
  });

  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('riverita_unlocked_scripts', JSON.stringify(unlockedScriptIds));
  }, [unlockedScriptIds]);

  useEffect(() => {
    localStorage.setItem('riverita_used_pins', JSON.stringify(usedPins));
  }, [usedPins]);

  const handleVerifyCommentAndPin = (script: YouTubeScriptItem) => {
    setVerificationError(null);
    const cleanHandle = userHandleInput.trim().toLowerCase();
    const cleanPin = pinInput.trim();

    if (!cleanHandle) {
      setVerificationError('Ingresa tu usuario de YouTube (ej: @carloscelestino889)');
      return;
    }

    if (!cleanPin) {
      setVerificationError('Ingresa el PIN de 4 caracteres (ej: Riv1, Riv2)');
      return;
    }

    // Check if the PIN was ALREADY USED & KILLED by someone else
    const normalizedPin = cleanPin.toUpperCase();
    const isPinBurned = usedPins.some((p) => p.toUpperCase() === normalizedPin);

    if (isPinBurned) {
      setVerificationError(`❌ El PIN "${cleanPin}" ya fue utilizado y quemado por su dueño. Deja tu propio comentario en el video para recibir un PIN único nuevo.`);
      return;
    }

    setIsVerifying(true);

    // Simulate verification & PIN redemption
    setTimeout(() => {
      setIsVerifying(false);
      
      // Mark PIN as USED/KILLED permanently
      setUsedPins((prev) => [...prev, cleanPin]);

      // Unlock script for this video
      if (!unlockedScriptIds.includes(script.id)) {
        setUnlockedScriptIds((prev) => [...prev, script.id]);
      }

      // Close modal
      setActiveModalScript(null);
    }, 800);
  };

  const triggerDirectDownload = (script: YouTubeScriptItem) => {
    const link = document.createElement('a');
    link.href = script.scriptFilePath;
    link.download = script.ps1FileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyScriptText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScriptId(id);
    setTimeout(() => setCopiedScriptId(null), 2000);
  };

  const filtered = youtubeScriptsData.filter(
    (s) =>
      s.videoTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="youtube-scripts-section" className="py-20 bg-slate-950/95 relative overflow-hidden min-h-screen">
      
      {/* Ambient Red Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
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
            Cada video de nuestro canal tiene su script <code className="text-emerald-400 font-mono">.ps1</code> en <code className="text-purple-300 font-mono">public/scripts/</code>. Comenta en el video en YouTube e ingresa tu PIN único de 1 solo uso para desbloquear tu archivo.
          </p>

          <div className="mt-4 p-3 rounded-2xl bg-slate-900/80 border border-white/10 max-w-xl mx-auto text-xs font-mono text-slate-300 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-emerald-400" />
              <span>PINs Secuenciales: <strong className="text-white">Riv1, Riv2, Riv3 ... Riv1000</strong></span>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase">
              1 Solo Uso (Anti-Impostor)
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por título del video, vCenter 9.1, PowerCLI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/90 border border-white/10 text-white font-mono text-sm placeholder:text-slate-500 focus:outline-none focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20 shadow-xl"
          />
        </div>

        {/* YouTube Scripts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((script, idx) => {
            const isUnlocked = unlockedScriptIds.includes(script.id);

            return (
              <ArcCardReveal key={script.id} index={idx} total={filtered.length}>
                <div className="group relative glass-card-luxury p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  
                  {/* Corner Crosshairs */}
                  <div className="absolute top-3 left-3 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-red-400 transition-colors">+</div>
                  <div className="absolute top-3 right-3 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-red-400 transition-colors">+</div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 uppercase tracking-wider flex items-center gap-1.5">
                        <Youtube className="w-3.5 h-3.5" /> {script.category}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                        {script.ps1FileName}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-red-300 transition-colors leading-snug">
                      {script.videoTitle}
                    </h3>

                    <p className="text-slate-300 text-xs leading-relaxed">
                      {script.description}
                    </p>

                    {/* Locked/Unlocked Content State */}
                    {isUnlocked ? (
                      <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/30 font-mono text-xs text-emerald-400 space-y-2">
                        <div className="flex justify-between items-center text-slate-300 pb-1.5 border-b border-slate-900">
                          <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Script .ps1 Desbloqueado
                          </span>
                          <button
                            onClick={() => copyScriptText(script.id, script.scriptCodeContent)}
                            className="text-[11px] font-bold text-purple-400 hover:text-white flex items-center gap-1"
                          >
                            {copiedScriptId === script.id ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedScriptId === script.id ? 'Copiado' : 'Copiar'}</span>
                          </button>
                        </div>
                        <code className="block overflow-x-auto whitespace-pre leading-relaxed text-slate-200 max-h-36">
                          {script.scriptCodeContent}
                        </code>
                      </div>
                    ) : (
                      <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/5 font-mono text-xs text-slate-400 flex flex-col items-center justify-center gap-2 text-center">
                        <Lock className="w-6 h-6 text-red-400 animate-pulse" />
                        <span className="text-slate-300 font-bold">Script Protegido por PIN de 1 Solo Uso</span>
                        <p className="text-[11px] text-slate-500">
                          Comenta <strong className="text-white">"script"</strong> en el video de YouTube para recibir tu PIN personal.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer Action Buttons */}
                  <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                    <a
                      href={script.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 font-mono text-xs font-bold hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 text-red-500 fill-red-500" /> Ver Video en YouTube
                    </a>

                    {isUnlocked ? (
                      <button
                        onClick={() => triggerDirectDownload(script)}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                      >
                        <Download className="w-4 h-4" /> Descargar .ps1
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setVerificationError(null);
                          setUserHandleInput('');
                          setPinInput('');
                          setActiveModalScript(script);
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-purple-600 text-white font-mono text-xs font-bold hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                      >
                        <Unlock className="w-3.5 h-3.5" /> Ingresar PIN y Desbloquear
                      </button>
                    )}
                  </div>

                </div>
              </ArcCardReveal>
            );
          })}
        </div>

      </div>

      {/* PIN & Comment Verification Modal */}
      {activeModalScript && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-slate-900 border border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(239,68,68,0.3)] text-left font-mono">
            
            <button
              onClick={() => setActiveModalScript(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500">
                <Youtube className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block">
                  Desbloqueo de Script de YouTube
                </span>
                <h3 className="text-base font-bold text-white leading-tight">
                  {activeModalScript.videoTitle}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Ingresa tu usuario de YouTube y el PIN único de 1 solo uso que te respondió <strong className="text-red-400">@RiveritaTech</strong> en los comentarios.
            </p>

            <div className="space-y-4">
              
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
                
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    1. Tu Usuario de YouTube:
                  </label>
                  <input
                    type="text"
                    value={userHandleInput}
                    onChange={(e) => setUserHandleInput(e.target.value)}
                    placeholder="Ejemplo: @carloscelestino889"
                    className="w-full bg-slate-900 border border-purple-500/40 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    2. Tu PIN Único de 1 Solo Uso (ej: Riv1, Riv2):
                  </label>
                  <input
                    type="text"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Ejemplo: Riv1"
                    className="w-full bg-slate-900 border border-red-500/40 rounded-xl px-4 py-2.5 text-sm text-white font-bold tracking-widest focus:outline-none focus:border-emerald-400 uppercase"
                  />
                </div>

              </div>

              {verificationError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{verificationError}</span>
                </div>
              )}

              <button
                onClick={() => handleVerifyCommentAndPin(activeModalScript)}
                disabled={isVerifying}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-purple-600 to-emerald-500 text-white font-bold text-sm tracking-wider uppercase shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isVerifying ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Verificando PIN y Quemando Código...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Validar PIN y Desbloquear .ps1</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
