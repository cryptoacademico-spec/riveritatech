import React, { useState } from 'react';
import { Terminal, Copy, CheckCircle2, Search, Code, ShieldCheck, Play, Youtube, Lock } from 'lucide-react';
import { ArcCardReveal } from './ArcCardReveal';
import { SvgStrokeDraw } from './SvgStrokeDraw';
import { YouTubeCommentVerifierModal } from './YouTubeCommentVerifierModal';

interface ScriptItem {
  id: string;
  title: string;
  category: string;
  description: string;
  command: string;
}

const practicalScripts: ScriptItem[] = [
  {
    id: 'sc-1',
    title: 'Consultar Estado de Máquinas Virtuales (VMs) en vCenter 9.1',
    category: 'vSphere & ESXi 9.1',
    description: 'Obtén un listado rápido con nombre de VM, estado de encendido, RAM asignada y dirección IP.',
    command: 'Get-VM | Select-Object Name, PowerState, MemoryGB, NumCpu, @{N="IP";E={$_.Guest.IPAddress[0]}} | Format-Table -AutoSize',
  },
  {
    id: 'sc-2',
    title: 'Detectar y Listar Snapshots Huérfanos (> 72 Horas)',
    category: 'Mantenimiento & Storage',
    description: 'Encuentra snapshots antiguos que consumen espacio en Datastore y ponen en riesgo el rendimiento.',
    command: 'Get-VM | Get-Snapshot | Where-Object {$_.Created -lt (Get-Date).AddDays(-3)} | Select-Object VM, Name, Created, SizeGB | Format-Table -AutoSize',
  },
  {
    id: 'sc-3',
    title: 'Verificar Espacio Libre y Uso de Datastores vSAN',
    category: 'Storage vSAN & SAN',
    description: 'Revisa el almacenamiento total, libre y porcentaje de ocupación en todos los Datastores de vCenter.',
    command: 'Get-Datastore | Select-Object Name, CapacityGB, FreeSpaceGB, @{N="FreePercent";E={[math]::Round(($_.FreeSpaceGB / $_.CapacityGB)*100, 2)}} | Format-Table -AutoSize',
  },
  {
    id: 'sc-4',
    title: 'Estado de Salud de Hosts Físicos ESXi',
    category: 'vSphere Hosts',
    description: 'Verifica la versión de ESXi, build, modelo de servidor hardware y uso de CPU/RAM por Host.',
    command: 'Get-VMHost | Select-Object Name, ConnectionState, PowerState, Version, Build, CpuUsageMhz, MemoryUsageGB | Format-Table -AutoSize',
  },
  {
    id: 'sc-5',
    title: 'Generar Reporte de Tarjetas de Red vSwitch & Portgroups',
    category: 'NSX & Networking',
    description: 'Lista los Portgroups configurados en Distributed vSwitches y las VLANs asociadas.',
    command: 'Get-VirtualPortgroup | Select-Object Name, VirtualSwitch, VLanId | Sort-Object Name | Format-Table -AutoSize',
  },
  {
    id: 'sc-6',
    title: 'Exportar Inventario Completo de vCenter a CSV',
    category: 'Reportes Enterprise',
    description: 'Genera una hoja de cálculo en CSV con el reporte completo de máquinas virtuales para auditoría.',
    command: 'Get-VM | Select-Object Name, PowerState, MemoryGB, NumCpu, UsedSpaceGB | Export-Csv -Path "C:\\vCenter_Inventario.csv" -NoTypeInformation',
  },
];

export const ScriptsSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isVerifierOpen, setIsVerifierOpen] = useState(false);
  const [selectedScriptTitle, setSelectedScriptTitle] = useState('');

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openVerifierForScript = (title: string) => {
    setSelectedScriptTitle(title);
    setIsVerifierOpen(true);
  };

  const filteredScripts = practicalScripts.filter(
    (script) =>
      script.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      script.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      script.command.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="scripts-section" className="py-20 bg-slate-950/90 relative overflow-hidden min-h-screen">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <SvgStrokeDraw>
              <Terminal className="w-4 h-4 text-emerald-400" />
            </SvgStrokeDraw>
            PowerCLI & PowerShell Practical Scripts
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Consultas Prácticas para <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-emerald-400 to-teal-300">Administradores VMware</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 font-normal">
            Scripts y comandos reales de PowerCLI para automatizar vCenter, vSphere y vSAN en tu día a día. Copia u obtén la descarga del script oficial verificando tu comentario de YouTube.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar script por comando, vSphere, vSAN, Snapshots..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/90 border border-white/10 text-white font-mono text-sm placeholder:text-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 shadow-xl"
          />
        </div>

        {/* Scripts Grid with Arc Card Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredScripts.map((script, idx) => (
            <ArcCardReveal key={script.id} index={idx} total={filteredScripts.length}>
              <div
                data-cursor-text="COPIAR SCRIPT"
                className="group relative glass-card-luxury p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                {/* TRIONN CORNER CROSSHAIRS (+) */}
                <div className="absolute top-3 left-3 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-purple-400 transition-colors">+</div>
                <div className="absolute top-3 right-3 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-purple-400 transition-colors">+</div>
                <div className="absolute bottom-3 left-3 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-emerald-400 transition-colors">+</div>
                <div className="absolute bottom-3 right-3 text-slate-500/40 text-xs font-mono select-none pointer-events-none group-hover:text-emerald-400 transition-colors">+</div>

                <div className="space-y-4">
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-wider">
                      {script.category}
                    </span>
                    <span className="text-[10px] font-mono text-purple-300">PowerCLI 13+</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {script.title}
                  </h3>

                  <p className="text-slate-300 text-xs leading-relaxed">
                    {script.description}
                  </p>

                  {/* Command Snippet Container */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-emerald-400 relative group/code overflow-hidden">
                    <div className="flex justify-between items-center text-slate-400 mb-2 pb-1.5 border-b border-slate-900">
                      <span className="flex items-center gap-1.5 text-[10px] text-purple-300">
                        <Code className="w-3.5 h-3.5 text-emerald-400" /> Cmdlet PowerCLI
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(script.id, script.command);
                        }}
                        className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedId === script.id ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" /> Copiar
                          </>
                        )}
                      </button>
                    </div>
                    <code className="block overflow-x-auto whitespace-pre leading-relaxed text-slate-200">
                      {script.command}
                    </code>
                  </div>

                </div>

                {/* Action Buttons: Copy Cmdlet & Unlock YouTube Script */}
                <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap justify-between items-center gap-3">
                  <button
                    onClick={() => copyToClipboard(script.id, script.command)}
                    className="px-3.5 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs font-bold hover:bg-purple-500/20 transition-all flex items-center gap-1.5"
                  >
                    <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" /> Copiar Cmdlet
                  </button>

                  <button
                    onClick={() => openVerifierForScript(script.title)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600/20 to-purple-600/20 border border-red-500/40 text-red-400 font-mono text-xs font-bold hover:border-red-400 transition-all flex items-center gap-2"
                  >
                    <Youtube className="w-4 h-4 text-red-500" />
                    <span>Desbloquear .ps1</span>
                  </button>
                </div>

              </div>
            </ArcCardReveal>
          ))}
        </div>

      </div>

      {/* YouTube Comment Verifier Modal */}
      <YouTubeCommentVerifierModal
        isOpen={isVerifierOpen}
        onClose={() => setIsVerifierOpen(false)}
        scriptTitle={selectedScriptTitle}
      />

    </section>
  );
};
