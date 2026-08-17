#═══════════════════════════════════════════════════════
#  ⚡ RIVERITA TECH — PowerCLI Script
#  📺 youtube.com/@RiveritaTech
#  🏆 VMware vExpert
#═══════════════════════════════════════════════════════
#  VIDEO #2: Ver Todas tus VMs y Filtrar por Estado
#═══════════════════════════════════════════════════════

# ╔══════════════════════════════════════╗
# ║  REQUISITO: Estar conectado a       ║
# ║  vCenter (ejecuta script #1 primero)║
# ╚══════════════════════════════════════╝

# ──────────────────────────────────────
# PASO 1: Ver TODAS las VMs
# ──────────────────────────────────────
Write-Host "`n📋 Todas las VMs en tu entorno:" -ForegroundColor Cyan
Get-VM | Format-Table Name, PowerState, NumCpu, MemoryGB, UsedSpaceGB -AutoSize

# ──────────────────────────────────────
# PASO 2: Filtrar solo VMs ENCENDIDAS
# ──────────────────────────────────────
Write-Host "`n🟢 VMs Encendidas:" -ForegroundColor Green
Get-VM | Where-Object { $_.PowerState -eq 'PoweredOn' } | 
    Select-Object Name, NumCpu, MemoryGB, @{N='UsedGB';E={[math]::Round($_.UsedSpaceGB,2)}} | 
    Format-Table -AutoSize

# ──────────────────────────────────────
# PASO 3: Filtrar solo VMs APAGADAS
# ──────────────────────────────────────
Write-Host "`n🔴 VMs Apagadas:" -ForegroundColor Red
Get-VM | Where-Object { $_.PowerState -eq 'PoweredOff' } | 
    Select-Object Name, NumCpu, MemoryGB | 
    Format-Table -AutoSize

# ──────────────────────────────────────
# PASO 4: Contar VMs por estado
# ──────────────────────────────────────
$allVMs = Get-VM
$on  = ($allVMs | Where-Object { $_.PowerState -eq 'PoweredOn' }).Count
$off = ($allVMs | Where-Object { $_.PowerState -eq 'PoweredOff' }).Count
$sus = ($allVMs | Where-Object { $_.PowerState -eq 'Suspended' }).Count

Write-Host "`n📊 Resumen:" -ForegroundColor Cyan
Write-Host "──────────────────────────────────" -ForegroundColor DarkGray
Write-Host "   Total VMs:     $($allVMs.Count)" -ForegroundColor White
Write-Host "   🟢 Encendidas: $on"              -ForegroundColor Green
Write-Host "   🔴 Apagadas:   $off"             -ForegroundColor Red
Write-Host "   ⏸️  Suspendidas: $sus"            -ForegroundColor Yellow
Write-Host "──────────────────────────────────" -ForegroundColor DarkGray

# ──────────────────────────────────────
# BONUS: Buscar una VM específica
# ──────────────────────────────────────
# Cambia 'NombreVM' por el nombre real
# Get-VM -Name 'NombreVM' | Select-Object *

# ═══════════════════════════════════════
# 🚀 @RiveritaTech | vExpert
# 💬 ¿Dudas? Comenta en el video
# ═══════════════════════════════════════
