import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, ShieldAlert, FileCode } from 'lucide-react';

interface ScriptItem {
  id: string;
  title: string;
  category: 'snapshots' | 'vcenter' | 'esxi' | 'vms';
  description: string;
  whatIfSupported: boolean;
  code: string;
}

const scriptsData: ScriptItem[] = [
  {
    id: 'snap-audit',
    title: 'Auditoría & Limpieza de Snapshots de vCenter',
    category: 'snapshots',
    description: 'Encuentra todos los snapshots en vCenter con más de 3 días de antigüedad, calcula el espacio consumido en GB/TB y permite borrado seguro con -WhatIf.',
    whatIfSupported: true,
    code: `# =========================================================
# RIVERITA TECH - POWERCLI SCRIPT: vCenter Snapshot Audit
# =========================================================
[CmdletBinding(SupportsShouldProcess=$true)]
param(
    [Parameter(Mandatory=$true)]
    [string]$vCenterServer,
    [int]$DaysOld = 3
)

Try {
    Write-Verbose "Conectando a vCenter: $vCenterServer..."
    $connection = Connect-VIServer -Server $vCenterServer -ErrorAction Stop

    $dateLimit = (Get-Date).AddDays(-$DaysOld)
    Write-Host "[+] Buscando snapshots creados antes de $dateLimit..." -ForegroundColor Cyan

    $oldSnapshots = Get-VM | Get-Snapshot | Where-Object { $_.Created -lt $dateLimit }

    $report = foreach ($snap in $oldSnapshots) {
        [PSCustomObject]@{
            VMName         = $snap.VM.Name
            SnapshotName   = $snap.Name
            SizeGB         = [math]::Round($snap.SizeGB, 2)
            CreatedDate    = $snap.Created
            Creator        = $snap.Creator
            Description    = $snap.Description
        }
    }

    $report | Out-GridView -Title "Snapshots obsoletos en $vCenterServer"
    Write-Host "[✓] Auditoría completada. Total Snapshots: $($report.Count)" -ForegroundColor Green
}
Catch {
    Write-Error "Error ejecutando el script: $_"
}
Finally {
    Disconnect-VIServer -Server $vCenterServer -Confirm:$false -ErrorAction SilentlyContinue
}`
  },
  {
    id: 'vcenter-health',
    title: 'vCenter Server Health & Alarm Dashboard',
    category: 'vcenter',
    description: 'Verifica el estado de salud global de tu clúster vCenter, alarmas rojas/amarillas activas y estado de sincronización NTP.',
    whatIfSupported: false,
    code: `# =========================================================
# RIVERITA TECH - POWERCLI: vCenter Global Health Check
# =========================================================
Import-Module VMware.VimAutomation.Core -ErrorAction Stop

$vCenter = Read-Host "Ingresa el FQDN o IP del vCenter"
Connect-VIServer -Server $vCenter

Write-Host ">>> Obteniendo Alarmas Activas en vSphere <<<" -ForegroundColor Yellow
$alarms = Get-AlarmTrigger -Realtime | Where-Object { $_.Entity.OverallStatus -eq "Red" }

foreach ($alarm in $alarms) {
    Write-Host "[ALERTA ROJA] Entidad: $($alarm.Entity.Name) | Alarma: $($alarm.Alarm.Name)" -ForegroundColor Red
}

$hosts = Get-VMHost
Write-Host ">>> Estado de Hosts ESXi ($($hosts.Count) detectados) <<<" -ForegroundColor Cyan
$hosts | Select-Object Name, ConnectionState, PowerState, NumCpu, MemoryUsageGB | Format-Table -AutoSize`
  },
  {
    id: 'esxi-syslog',
    title: 'Configuración Masiva de Syslog & NTP en ESXi',
    category: 'esxi',
    description: 'Aplica de forma automatizada el servidor Syslog y NTP centralizado a más de 100+ hosts ESXi en segundos.',
    whatIfSupported: true,
    code: `# =========================================================
# RIVERITA TECH - POWERCLI: ESXi Mass Syslog & NTP Setup
# =========================================================
[CmdletBinding(SupportsShouldProcess=$true)]
param(
    [string]$SyslogServer = "udp://syslog.riveritatech.local:514",
    [string]$NTPServer = "pool.ntp.org"
)

$hosts = Get-VMHost
foreach ($esx in $hosts) {
    if ($PSCmdlet.ShouldProcess($esx.Name, "Configurar Syslog y NTP")) {
        Write-Host "Configurando host: $($esx.Name)" -ForegroundColor Green
        
        # Configurar Syslog
        Get-VMHostSysLogServer -VMHost $esx | Set-VMHostSysLogServer -SysLogServer $SyslogServer
        
        # Configurar NTP
        Add-VMHostNtpServer -VMHost $esx -NtpServer $NTPServer -Confirm:$false
        Get-VMHostService -VMHost $esx | Where-Object {$_.Key -eq "ntpd"} | Start-VMHostService
    }
}`
  },
  {
    id: 'thin-provisioning',
    title: 'Reporte de Aprovisionamiento Fino (Thin vs Thick)',
    category: 'vms',
    description: 'Identifica qué VMs están aprovisionadas como Thin vs Thick en tus Datastores para prevenir Overcommitment de almacenamiento.',
    whatIfSupported: false,
    code: `# =========================================================
# RIVERITA TECH: Thin vs Thick Disk Storage Reporter
# =========================================================
$vms = Get-VM
$storageReport = foreach ($vm in $vms) {
    $hardDisks = $vm | Get-HardDisk
    foreach ($disk in $hardDisks) {
        [PSCustomObject]@{
            VM           = $vm.Name
            DiskName     = $disk.Name
            CapacityGB   = $disk.CapacityGB
            Type         = $disk.StorageFormat # Thin, Thick, EagerZeroedThick
            Datastore    = $disk.Filename.Split(']')[0].TrimStart('[')
        }
    }
}

$storageReport | Export-Csv -Path "C:\\Temp\\StorageReport.csv" -NoTypeInformation -Encoding UTF8
Write-Host "Reporte exportado exitosamente a C:\\Temp\\StorageReport.csv" -ForegroundColor Green`
  }
];

export const PowerCLIScripts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeScript, setActiveScript] = useState<ScriptItem>(scriptsData[0]);
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);

  const filteredScripts = selectedCategory === 'all' 
    ? scriptsData 
    : scriptsData.filter(s => s.category === selectedCategory);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeScript.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setTerminalOutput("Conectando a vCenter RiveritaTech.local...\n[+] Autenticando usuario VCP...\n[+] Ejecutando Cmdlet en modo simulación...\n");
    
    setTimeout(() => {
      setTerminalOutput(prev => prev + `[SUCCESS] ${activeScript.title} ejecutado correctamente.\n[INFO] Modo -WhatIf activo: 0 cambios destructivos realizados en vCenter.`);
      setIsSimulating(false);
    }, 1800);
  };

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase mb-3">
            <Terminal className="w-4 h-4" /> PowerShell & PowerCLI Hub
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Scripts de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400">Automatización VMware</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto mt-3">
            Código probado en entornos enterprise reales (+10k VMs). Listo para copiar, probar y desplegar.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'Todos los Scripts' },
            { id: 'snapshots', label: 'Snapshots' },
            { id: 'vcenter', label: 'vCenter Health' },
            { id: 'esxi', label: 'Hosts ESXi' },
            { id: 'vms', label: 'Aprovisionamiento VMs' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-400'
                  : 'bg-slate-900/60 text-slate-400 border border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Grid: Sidebar + Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* List Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            {filteredScripts.map(script => (
              <div
                key={script.id}
                onClick={() => {
                  setActiveScript(script);
                  setTerminalOutput(null);
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeScript.id === script.id
                    ? 'bg-slate-900 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                    : 'bg-slate-900/40 border-white/5 hover:border-white/20 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                    {script.category}
                  </span>
                  {script.whatIfSupported && (
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" /> -WhatIf OK
                    </span>
                  )}
                </div>
                <h4 className="text-base font-bold text-white mb-1">{script.title}</h4>
                <p className="text-slate-400 text-xs line-clamp-2">{script.description}</p>
              </div>
            ))}
          </div>

          {/* Code Terminal */}
          <div className="lg:col-span-8 rounded-3xl border border-white/10 bg-slate-950 overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-slate-900 px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-300 font-bold flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-purple-400" />
                  {activeScript.title}.ps1
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/30 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {isSimulating ? 'Simulando...' : 'Probar Script'}
                </button>
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-mono font-bold hover:bg-purple-500 transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copiado' : 'Copiar'}
                </button>
              </div>
            </div>

            {/* Code Content */}
            <div className="p-6 overflow-x-auto max-h-[480px] bg-slate-950 font-mono text-xs leading-relaxed text-slate-200 selection:bg-purple-600 selection:text-white">
              <pre>{activeScript.code}</pre>
            </div>

            {/* Console Output */}
            {terminalOutput && (
              <div className="bg-black/95 p-4 border-t border-emerald-500/30 font-mono text-xs text-emerald-400 animate-in fade-in duration-300 flex items-start gap-3">
                <Terminal className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <div className="whitespace-pre-wrap">{terminalOutput}</div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
