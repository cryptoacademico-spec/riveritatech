# ====================================================================
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
