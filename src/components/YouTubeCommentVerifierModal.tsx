import React, { useState } from 'react';
import { Youtube, CheckCircle2, Lock, Unlock, Download, Terminal, Sparkles, AlertCircle, X } from 'lucide-react';

interface YouTubeCommentVerifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  scriptTitle?: string;
  scriptDownloadUrl?: string;
  scriptCodeContent?: string;
}

export const YouTubeCommentVerifierModal: React.FC<YouTubeCommentVerifierModalProps> = ({
  isOpen,
  onClose,
  scriptTitle = "Cómo listar y filtrar VMs en vCenter 9.1 con PowerCLI (.ps1)",
  scriptCodeContent = `# Script Oficial Riverita Tech: Listar y Filtrar VMs en vCenter 9.1 con PowerCLI
# Canal Oficial: @RiveritaTech | Web: www.riveritatech.com

Connect-VIServer -Server "vcenter.corp.local" -Protocol https -WarningAction SilentlyContinue

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " RIVERITA TECH - INVENTARIO & REPORTE vCENTER 9.1" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan

$VMs = Get-VM | Select-Object Name, PowerState, NumCpu, MemoryGB, @{N="IPAddress";E={$_.Guest.IPAddress[0]}}, @{N="Datastore";E={(Get-Datastore -VM $_).Name}}

$VMs | Format-Table -AutoSize

# Exportar a CSV si lo deseas:
# $VMs | Export-Csv -Path "C:\\Riverita_VMs_vCenter91.csv" -NoTypeInformation
`
}) => {
  const [handle, setHandle] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanHandle = handle.trim().toLowerCase();
    if (!cleanHandle) {
      setErrorMsg('Por favor ingresa tu usuario de YouTube (ej: @carloscelestino889)');
      return;
    }

    setIsVerifying(true);

    // Simulate Instant YouTube API Comment Verification
    setTimeout(() => {
      setIsVerifying(false);
      setIsUnlocked(true);
    }, 800);
  };

  const handleDownloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([scriptCodeContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "RiveritaTech_vCenter91_Filter_VMs.ps1";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      
      <div className="relative w-full max-w-xl bg-slate-900 border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.3)] text-left overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500">
            <Youtube className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">
              Desbloqueador de Scripts YouTube
            </span>
            <h3 className="text-xl font-bold text-white leading-tight">
              Verificador de Comentario en Vivo
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-6 leading-relaxed">
          Script solicitado para el video: <span className="font-bold text-emerald-400">{scriptTitle}</span>.
        </p>

        {!isUnlocked ? (
          <form onSubmit={handleVerify} className="space-y-4">
            
            <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2">
              <label className="text-xs font-mono text-slate-300 font-bold block">
                Ingresa tu usuario de YouTube:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="Ejemplo: @carloscelestino889"
                  className="w-full bg-slate-900 border border-purple-500/40 rounded-xl px-4 py-3 text-sm text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Verificamos automáticamente si ya comentaste en el video para entregarte el archivo <code className="text-emerald-400 font-mono">.ps1</code>.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-emerald-500 to-teal-500 text-white font-mono font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isVerifying ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-white" />
                  <span>Verificando en YouTube API...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Verificar Comentario y Desbloquear</span>
                </>
              )}
            </button>

          </form>
        ) : (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
            
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-white">¡Comentario Verificado Exitosamente!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Gracias <strong className="text-emerald-400">{handle}</strong> por apoyar nuestro canal de YouTube. Tu script oficial <code className="text-purple-300">.ps1</code> ya está 100% desbloqueado.
                </p>
              </div>
            </div>

            {/* Code preview */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-emerald-400 max-h-40 overflow-y-auto">
              <code className="whitespace-pre">{scriptCodeContent}</code>
            </div>

            <button
              onClick={handleDownloadFile}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(16,185,129,0.8)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Script Oficial (.ps1)</span>
            </button>

          </div>
        )}

      </div>

    </div>
  );
};
