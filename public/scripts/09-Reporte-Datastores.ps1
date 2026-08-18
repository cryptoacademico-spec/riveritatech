#═══════════════════════════════════════════════════════
#  ⚡ RIVERITA TECH — PowerCLI Script
#  📺 youtube.com/@RiveritaTech | 🏆 vExpert
#═══════════════════════════════════════════════════════
#  VIDEO #9: Reporte y Auditoría de Datastores + NAA
#═══════════════════════════════════════════════════════

# ╔══════════════════════════════════════╗
# ║  CONFIGURA AQUÍ                     ║
# ╚══════════════════════════════════════╝

$alertaPorcentaje = 20   # Alerta si queda menos de 20% libre
$rutaExport = "$env:USERPROFILE\Desktop\Datastores_Report.csv"

# ──────────────────────────────────────
# PASO 1: Ver todos los datastores con NAA
# ──────────────────────────────────────
Write-Host "`n💾 Reporte de Datastores y LUNs:" -ForegroundColor Cyan

$datastoresInfo = Get-Datastore | Where-Object { $_.State -eq "Available" } | ForEach-Object {
    $ds = $_
    $naa = if ($ds.Type -eq "VMFS" -and $ds.ExtensionData.Info.Vmfs.Extent) {
        ($ds.ExtensionData.Info.Vmfs.Extent.DiskName) -join ", "
    } else {
        "N/A ($($ds.Type))"
    }

    [PSCustomObject]@{
        Name              = $ds.Name
        Identificador_NAA = $naa
        Capacidad_GB      = [math]::Round($ds.CapacityGB, 2)
        Usado_GB          = [math]::Round($ds.CapacityGB - $ds.FreeSpaceGB, 2)
        Libre_GB          = [math]::Round($ds.FreeSpaceGB, 2)
        Porcentaje_Libre  = [math]::Round(($ds.FreeSpaceGB / $ds.CapacityGB) * 100, 1)
        Tipo              = $ds.Type
        Version_VMFS      = $ds.FileSystemVersion
    }
}

$datastoresInfo | Select-Object Name, Capacidad_GB, Usado_GB, Libre_GB, Porcentaje_Libre, Tipo | Format-Table -AutoSize

# ──────────────────────────────────────
# PASO 2: Datastores en peligro (< 20% libre)
# ──────────────────────────────────────
Write-Host "`n⚠️ Datastores con menos de $alertaPorcentaje% libre:" -ForegroundColor Red

$peligro = $datastoresInfo | Where-Object { $_.Porcentaje_Libre -lt $alertaPorcentaje }

if ($peligro) {
    $peligro | Select-Object Name, Identificador_NAA, Libre_GB, Porcentaje_Libre | Format-Table -AutoSize
    Write-Host "🚨 ¡Estos datastores necesitan atención inmediata!" -ForegroundColor Red
} else {
    Write-Host "✅ Todos los datastores tienen más de $alertaPorcentaje% libre." -ForegroundColor Green
}

# ──────────────────────────────────────
# PASO 3: Resumen general de la infraestructura
# ──────────────────────────────────────
$totalCap  = [math]::Round(($datastoresInfo | Measure-Object -Property Capacidad_GB -Sum).Sum, 2)
$totalFree = [math]::Round(($datastoresInfo | Measure-Object -Property Libre_GB -Sum).Sum, 2)
$totalUsed = [math]::Round($totalCap - $totalFree, 2)

Write-Host "`n📊 Resumen global de almacenamiento:" -ForegroundColor Cyan
Write-Host "──────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "   Total Datastores: $($datastoresInfo.Count)"
Write-Host "   Capacidad total:  $totalCap GB"
Write-Host "   Usado:            $totalUsed GB ($([math]::Round(($totalUsed/$totalCap)*100,1))%)"
Write-Host "   Libre:            $totalFree GB ($([math]::Round(($totalFree/$totalCap)*100,1))%)"
Write-Host "──────────────────────────────────────────────────" -ForegroundColor DarkGray

# ──────────────────────────────────────
# PASO 4: Exportar reporte a CSV (Excel)
# ──────────────────────────────────────
Write-Host "`n💾 Exportando reporte a: $rutaExport" -ForegroundColor Cyan
$datastoresInfo | Select-Object Name, Identificador_NAA, Capacidad_GB, Usado_GB, Libre_GB, Porcentaje_Libre, Tipo, Version_VMFS, @{N='Fecha_Reporte';E={Get-Date -Format 'yyyy-MM-dd HH:mm'}} |
    Export-Csv -Path $rutaExport -NoTypeInformation -Encoding UTF8

Write-Host "✅ Reporte exportado exitosamente con mapeo NAA." -ForegroundColor Green

# ═══════════════════════════════════════
# 🚀 @RiveritaTech | vExpert
# ═══════════════════════════════════════