Set-PowerCLIConfiguration -InvalidCertificateAction Ignore -Confirm:$false -ErrorAction SilentlyContinue

$vCenterServer = "vcsa-c.diegovmware.local"

Write-Host "`nConectando a vCenter Server: $vCenterServer ..." -ForegroundColor Cyan

# Conectar a vCenter
$conn = Connect-VIServer -Server $vCenterServer

if ($global:DefaultVIServer) {
    Write-Host "`n[OK] Conectado exitosamente a vCenter Server por PowerCLI!" -ForegroundColor Green
    Write-Host "------------------------------------------------------------------" -ForegroundColor DarkGray
    Write-Host "Servidor vCenter : " -NoNewline; Write-Host "$($global:DefaultVIServer.Name)" -ForegroundColor White
    Write-Host "Version vSphere  : " -NoNewline; Write-Host "$($global:DefaultVIServer.Version)" -ForegroundColor White
    Write-Host "Build Number     : " -NoNewline; Write-Host "$($global:DefaultVIServer.Build)" -ForegroundColor White
    Write-Host "Usuario Conectado: " -NoNewline; Write-Host "$($global:DefaultVIServer.User)" -ForegroundColor White
    Write-Host "------------------------------------------------------------------" -ForegroundColor DarkGray
    Write-Host "`nTIP: Compara la Version y el Build en 'Resumen' de tu vCenter Web Client" -ForegroundColor Yellow
} else {
    Write-Host "`n[ERROR] No se pudo conectar a $vCenterServer" -ForegroundColor Red
    Write-Host "Verifica la direccion, usuario y contrasena." -ForegroundColor Yellow
}

Write-Host "`n------------------------------------------------------------------" -ForegroundColor DarkGray
Write-Host "Version de PowerCLI Instalada:" -ForegroundColor Cyan
Get-Module VMware.PowerCLI -ListAvailable | Select-Object Name, Version

Write-Host "`n------------------------------------------------------------------" -ForegroundColor DarkGray
Write-Host "@RiveritaTech | VMware vExpert" -ForegroundColor Magenta
