import React, { useState } from 'react';
import { Terminal, Play, Copy, Check, Sparkles, Shield, Cpu } from 'lucide-react';

interface ScriptItem {
  id: string;
  name: string;
  command: string;
  description: string;
  output: string[];
}

const sampleScripts: ScriptItem[] = [
  {
    id: 'health-check',
    name: 'vSphere Cluster Health Check',
    command: 'Get-VMHost | Select-Object Name, ConnectionState, PowerState, CpuUsageMhz, MemoryUsageMB',
    description: 'Diagnóstico en tiempo real del estado de salud de todos los ESXi Hosts en la infraestructura vSphere.',
    output: [
      'VERBOSE: Connecting to vCenter Server vcenter.corp.local...',
      'SUCCESS: Authenticated as SSO Admin (vSphere.local)',
      '',
      'Name                 ConnectionState PowerState CpuUsageMhz MemoryUsageMB',
      '----                 --------------- ---------- ----------- -------------',
      'esxi-prd-01.corp.local Connected       PoweredOn  3450 MHz    128450 MB    [OK]',
      'esxi-prd-02.corp.local Connected       PoweredOn  3120 MHz    114200 MB    [OK]',
      'esxi-prd-03.corp.local Connected       PoweredOn  4100 MHz    142100 MB    [OK]',
      '',
      'STATUS: Cluster Health 100% - No HA/DRS Warnings Found.'
    ]
  },
  {
    id: 'vsan-resiliency',
    name: 'vSAN Datastore & Resiliency Check',
    command: 'Get-VsanClusterConfiguration -Cluster "VCF-Cluster-Prd" | Format-List',
    description: 'Verifica la salud de los disc-groups, objetos vSAN y políticas de almacenamiento FTT=1 / FTT=2.',
    output: [
      'VERBOSE: Querying vSAN Health Daemon (vsan-health-service)...',
      '',
      'Cluster Name          : VCF-Cluster-Prd',
      'vSAN Enabled          : True',
      'Space Efficiency      : Deduplication & Compression Active',
      'Resiliency Health     : PASSED (Green)',
      'Disk Groups Total     : 6 (12 NVMe Capacity / 6 NVMe Cache)',
      'Total Capacity        : 48.0 TB (14.2 TB Used / 33.8 TB Available)',
      '',
      'STATUS: vSAN Storage Policy Compliance: 100% Compliant.'
    ]
  },
  {
    id: 'vm-snapshot-cleanup',
    name: 'Automated Snapshot Cleanup > 7 Days',
    command: 'Get-VM | Get-Snapshot | Where-Object {$_.Created -lt (Get-Date).AddDays(-7)} | Remove-Snapshot -Confirm:$false',
    description: 'Elimina automáticamente snapshots huérfanos con más de 7 días para evitar latencia de I/O en Datastores.',
    output: [
      'VERBOSE: Searching snapshots older than 7 days across all Datastores...',
      'FOUND: Snapshot "Pre-Upgrade-AppDB" on VM "prod-db-01" (Age: 9 days)',
      'REMOVING: Consolidating delta disks into base VMDK...',
      'SUCCESS: Consolidated 42.5 GB of delta space on Datastore vsan-ds-01.',
      '',
      'STATUS: Datastore space reclaimed successfully.'
    ]
  }
];

export const PowerCLITerminal: React.FC = () => {
  const [selectedScript, setSelectedScript] = useState<ScriptItem>(sampleScripts[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>(sampleScripts[0].output);
  const [copied, setCopied] = useState(false);
  const [userInput, setUserInput] = useState('');

  const runScript = (script: ScriptItem) => {
    setSelectedScript(script);
    setIsRunning(true);
    setLogs(['VERBOSE: Initializing PowerCLI Session...', 'VERBOSE: Executing cmdlet...']);

    setTimeout(() => {
      setLogs(script.output);
      setIsRunning(false);
    }, 600);
  };

  const handleCustomCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsRunning(true);
    const cmd = userInput.trim();
    setUserInput('');

    setTimeout(() => {
      setLogs([
        `PS C:\\> ${cmd}`,
        'VERBOSE: Processing PowerCLI Cmdlet invocation...',
        'SUCCESS: Query executed against vCenter Server API (REST/SOAP)',
        'Result: Executed successfully by Riverita Automation Engine.',
      ]);
      setIsRunning(false);
    }, 400);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedScript.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full py-16 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase mb-3">
            <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>PowerCLI Developer Playground</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-mono">
            Consola Interactiva de Automatización
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mt-2 font-medium">
            Prueba en vivo los cmdlets de automatización diseñados por Riverita para vSphere, vSAN y VMware Cloud Foundation.
          </p>
        </div>

        {/* Terminal Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Script Selector Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>Scripts Listos para Ejecutar</span>
            </h3>

            {sampleScripts.map((script) => (
              <button
                key={script.id}
                onClick={() => runScript(script)}
                className={`p-4 rounded-2xl text-left transition-all border flex flex-col gap-2 cursor-pointer ${
                  selectedScript.id === script.id
                    ? 'bg-slate-900 border-purple-500/60 shadow-[0_0_25px_rgba(168,85,247,0.3)]'
                    : 'bg-slate-900/40 border-white/5 hover:bg-slate-900/80 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    {script.name}
                  </span>
                  <Play className={`w-3.5 h-3.5 ${selectedScript.id === script.id ? 'text-purple-400 fill-purple-400' : 'text-slate-500'}`} />
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {script.description}
                </p>
              </button>
            ))}
          </div>

          {/* PowerShell Interactive Output Box */}
          <div className="lg:col-span-8 rounded-3xl bg-slate-950 border border-purple-500/30 overflow-hidden shadow-2xl relative font-mono">
            
            {/* Terminal Header Bar */}
            <div className="bg-slate-900/90 px-6 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-slate-400 font-mono ml-2">Administrator: Windows PowerShell (PowerCLI 13.0)</span>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar Cmdlet'}</span>
              </button>
            </div>

            {/* Terminal Window Output Body */}
            <div className="p-6 h-[320px] overflow-y-auto bg-[#030712] text-xs font-mono leading-relaxed space-y-1">
              <div className="text-slate-500 mb-3">
                # VMware PowerCLI 13.1.0 build 21624440<br />
                # Connected to vCenter Server: vcenter-prd.corp.riverita.tech (vSphere 8.0 Update 2)
              </div>

              <div className="text-purple-400 font-bold mb-2">
                PS C:\Automation\VMware&gt; {selectedScript.command}
              </div>

              {isRunning ? (
                <div className="text-emerald-400 animate-pulse flex items-center gap-2 py-4">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Ejecutando cmdlet PowerCLI en tiempo real...</span>
                </div>
              ) : (
                logs.map((line, idx) => (
                  <div 
                    key={idx} 
                    className={
                      line.startsWith('SUCCESS') || line.endsWith('[OK]') || line.startsWith('STATUS:')
                        ? 'text-emerald-400 font-bold'
                        : line.startsWith('VERBOSE:')
                        ? 'text-slate-400 italic'
                        : line.startsWith('Name') || line.startsWith('----')
                        ? 'text-purple-300 font-bold'
                        : 'text-slate-200'
                    }
                  >
                    {line}
                  </div>
                ))
              )}
            </div>

            {/* Custom Input Execution Form */}
            <form onSubmit={handleCustomCommand} className="bg-slate-900/80 px-6 py-3 border-t border-white/10 flex items-center gap-3">
              <span className="text-emerald-400 font-bold text-xs">PS C:\&gt;</span>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Escribe un comando PowerCLI (ej: Get-VMHost, Get-Datastore)..."
                className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
              />
              <button type="submit" className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg text-xs transition-colors">
                Ejecutar
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
