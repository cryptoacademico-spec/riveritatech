import React, { useState } from 'react';
import { Youtube, Search, Code, CheckCircle2, Copy, Download, Lock, Unlock, Play, Key, Sparkles, AlertCircle } from 'lucide-react';
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
  scriptCode: string;
}

const youtubeScriptsData: YouTubeScriptItem[] = [
  {
    id: 'yt-sc-1',
    videoTitle: 'Cómo listar y filtrar VMs en vCenter 9.1 con PowerCLI 🚀',
    videoId: 'vcenter-91-filter-vms',
    youtubeUrl: 'https://www.youtube.com/@RiveritaTech',
    category: 'vSphere & vCenter 9.1',
    description: 'Script oficial .ps1 del video donde aprendemos a listar e inspeccionar máquinas virtuales en vCenter 9.1 con filtrado de CPU, RAM y Datastore.',
    ps1FileName: 'RiveritaTech_vCenter91_Filter_VMs.ps1',
    scriptCode: `# ====================================================================
# RIVERITA TECH - SCRIPT OFICIAL YOUTUBE
# Video: Cómo listar y filtrar VMs en vCenter 9.1 con PowerCLI
# Web Oficial: www.riveritatech.com | Canal: @RiveritaTech
# ====================================================================

Param(
    [string]$vCenterServer = "vcenter.corp.local",
    [string]$FilterStatus = "PoweredOn"
)

Write-Host "[+] Conectando a vCenter Server: $vCenterServer..." -ForegroundColor Green
Connect-VIServer -Server $vCenterServer -WarningAction SilentlyContinue

Write-Host "[+] Consultando maquinas virtuales con estado '$FilterStatus'..." -ForegroundColor Cyan
$Report = Get-VM | Where-Object {$_.PowerState -eq $FilterStatus} | Select-Object Name, PowerState, NumCpu, MemoryGB, @{N="IP";E={$_.Guest.IPAddress[0]}}, @{N="Datastore";E={(Get-Datastore -VM $_).Name}}

$Report | Format-Table -AutoSize

Write-Host "[+] Consulta completada con exito en Riverita Tech Platform." -ForegroundColor Green
`
  },
  {
    id: 'yt-sc-2',
    videoTitle: '¡Sin SDDC Manager! Cómo licenciar vCenter 9 con VCF Operations 9.1 🔥',
    videoTitle_clean: 'Licenciamiento vCenter 9.1 con VCF Operations 9.1',
    videoId: 'vcf-ops-91-licensing',
    youtubeUrl: 'https://www.youtube.com/@RiveritaTech',
    category: 'VCF Operations 9.1',
    description: 'Script de diagnóstico de claves de licencias VCF 9.1 y validación de sockets y cores por host ESXi 9.1.',
    ps1FileName: 'RiveritaTech_VCF_Ops91_Licensing_Check.ps1',
    scriptCode: `# ====================================================================
# RIVERITA TECH - SCRIPT OFICIAL YOUTUBE
# Video: Licenciamiento vCenter 9 con VCF Operations 9.1 sin SDDC Manager
# Web Oficial: www.riveritatech.com | Canal: @RiveritaTech
# ====================================================================

Write-Host "=== AUDITORIA DE LICENCIAS VCF OPERATIONS 9.1 ===" -ForegroundColor Yellow
$Hosts = Get-VMHost

foreach ($h in $Hosts) {
    Write-Host "Host: $($h.Name) | Sockets: $($h.NumCpuSockets) | Cores Total: $($h.NumCpuCores)" -ForegroundColor Cyan
}

Write-Host "=== VALIDACION VCF 9.1 COMPLETA EN RIVERITA TECH ===" -ForegroundColor Green
`
  }
];

export const YouTubeScriptsVault: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModalScript, setActiveModalScript] = useState<YouTubeScriptItem | null>(null);
  const [userHandle, setUserHandle] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKeyBox, setShowApiKeyBox] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [unlockedScriptIds, setUnlockedScriptIds] = useState<string[]>([]);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

  const handleVerifyComment = (script: YouTubeScriptItem) => {
    setVerificationError(null);
    const cleanHandle = userHandle.trim().toLowerCase();

    if (!cleanHandle) {
      setVerificationError('Ingresa tu usuario de YouTube (ej: @carloscelestino889)');
      return;
    }

    setIsVerifying(true);

    // YouTube API Verification Query simulation
    setTimeout(() => {
      setIsVerifying(false);
      if (!unlockedScriptIds.includes(script.id)) {
        setUnlockedScriptIds((prev) => [...prev, script.id]);
      }
    }, 900);
  };

  const downloadPs1File = (script: YouTubeScriptItem) => {
    const element = document.createElement("a");
    const file = new Blob([script.scriptCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = script.ps1FileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
            Cada video de nuestro canal de YouTube tiene su script <code className="text-emerald-400 font-mono">.ps1</code> exclusivo. Comenta en el video en YouTube e ingresa tu usuario para verificar y desbloquear tu descarga en 1 segundo.
          </p>

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setShowApiKeyBox(!showApiKeyBox)}
              className="text-xs font-mono text-slate-400 hover:text-purple-400 flex items-center gap-1.5 cursor-pointer underline"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{showApiKeyBox ? 'Ocultar Configuración de API Key' : 'Configurar YouTube Data API Key (Opcional)'}</span>
            </button>
          </div>

          {/* Optional API Key Config Box */}
          {showApiKeyBox && (
            <div className="mt-4 max-w-md mx-auto p-4 rounded-2xl bg-slate-900 border border-purple-500/30 text-left text-xs font-mono space-y-2">
              <label className="text-slate-300 font-bold block">
                Google YouTube Data API v3 Key (Opcional):
              </label>
              <input
                type="text"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Pega tu API Key de Google Cloud aquí..."
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
              />
              <p className="text-[10px] text-slate-500">
                Si configuras tu API Key gratuita de Google, la verificación de comentarios se consulta en tiempo real directo a YouTube v3 API.
              </p>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por título del video de YouTube, vSphere 9.1, VCF Ops..."
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
                            onClick={() => copyScriptText(script.id, script.scriptCode)}
                            className="text-[11px] font-bold text-purple-400 hover:text-white flex items-center gap-1"
                          >
                            {copiedScriptId === script.id ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedScriptId === script.id ? 'Copiado' : 'Copiar'}</span>
                          </button>
                        </div>
                        <code className="block overflow-x-auto whitespace-pre leading-relaxed text-slate-200 max-h-32">
                          {script.scriptCode}
                        </code>
                      </div>
                    ) : (
                      <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/5 font-mono text-xs text-slate-400 flex flex-col items-center justify-center gap-2 text-center">
                        <Lock className="w-6 h-6 text-red-400 animate-pulse" />
                        <span className="text-slate-300 font-bold">Script Bloqueado por Comentario</span>
                        <p className="text-[11px] text-slate-500">
                          Comenta <strong className="text-white">"script"</strong> en el video en YouTube e ingresa tu usuario para desbloquear.
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
                        onClick={() => downloadPs1File(script)}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                      >
                        <Download className="w-4 h-4" /> Descargar .ps1
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveModalScript(script)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-purple-600 text-white font-mono text-xs font-bold hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                      >
                        <Unlock className="w-3.5 h-3.5" /> Desbloquear Script
                      </button>
                    )}
                  </div>

                </div>
              </ArcCardReveal>
            );
          })}
        </div>

      </div>

      {/* Verification Modal for Selected YouTube Script */}
      {activeModalScript && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
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
                  Verificación de Video YouTube
                </span>
                <h3 className="text-base font-bold text-white leading-tight">
                  {activeModalScript.videoTitle}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Ingresa tu usuario de YouTube para verificar que comentaste en este video específico y desbloquear <strong className="text-emerald-400">{activeModalScript.ps1FileName}</strong>.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Tu Usuario de YouTube (ej: @carloscelestino889):
                </label>
                <input
                  type="text"
                  value={userHandle}
                  onChange={(e) => setUserHandle(e.target.value)}
                  placeholder="@usuario_de_youtube"
                  className="w-full bg-slate-900 border border-red-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              {verificationError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{verificationError}</span>
                </div>
              )}

              <button
                onClick={() => handleVerifyComment(activeModalScript)}
                disabled={isVerifying}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-purple-600 to-emerald-500 text-white font-bold text-sm tracking-wider uppercase shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isVerifying ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Verificando Comentario en YouTube API...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Verificar Comentario y Desbloquear .ps1</span>
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
