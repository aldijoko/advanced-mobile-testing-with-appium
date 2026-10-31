# Ensures the adb server and the Android emulator are running and booted.
# On this machine `adb start-server` hangs because connecting to a closed loopback
# port never gets refused, so the server is started directly with `nodaemon server`.
param(
    [string]$AvdName = 'Medium_Phone',
    [int]$BootTimeoutSeconds = 300
)

$ErrorActionPreference = 'Stop'

$sdk = if ($env:ANDROID_HOME) { $env:ANDROID_HOME } else { "$env:LOCALAPPDATA\Android\Sdk" }
$adb = "$sdk\platform-tools\adb.exe"
$emulator = "$sdk\emulator\emulator.exe"

function Test-AdbServer {
    [bool](netstat -ano | Select-String ':5037\s.*LISTENING')
}

function Invoke-Adb([string]$Arguments, [int]$TimeoutSeconds = 8) {
    $output = [IO.Path]::GetTempFileName()
    try {
        $process = Start-Process -FilePath $adb -ArgumentList $Arguments -PassThru -WindowStyle Hidden -RedirectStandardOutput $output
        if (-not $process.WaitForExit($TimeoutSeconds * 1000)) {
            Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
            return ''
        }
        return (Get-Content $output -Raw)
    } finally {
        Remove-Item $output -ErrorAction SilentlyContinue
    }
}

if (Test-AdbServer) {
    Write-Output '[device] adb server already running'
} else {
    # Clients started while no server was listening are stuck forever.
    Get-Process adb -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Process -FilePath $adb -ArgumentList 'nodaemon', 'server' -WindowStyle Hidden
    $deadline = (Get-Date).AddSeconds(20)
    while (-not (Test-AdbServer)) {
        if ((Get-Date) -gt $deadline) { throw 'adb server did not start within 20 seconds' }
        Start-Sleep -Milliseconds 500
    }
    Write-Output '[device] adb server started'
}

if (Get-Process qemu-system-x86_64 -ErrorAction SilentlyContinue) {
    Write-Output '[device] emulator already running'
} else {
    Start-Process -FilePath $emulator -ArgumentList '-avd', $AvdName
    Write-Output "[device] emulator $AvdName started"
}

$deadline = (Get-Date).AddSeconds($BootTimeoutSeconds)
# Output is empty while the device is not attached yet, so force it to a string.
while ("$(Invoke-Adb 'shell getprop sys.boot_completed')".Trim() -ne '1') {
    if ((Get-Date) -gt $deadline) { throw "emulator did not finish booting within $BootTimeoutSeconds seconds" }
    Start-Sleep -Seconds 3
}

Write-Output '[device] ready'
Write-Output "$(Invoke-Adb 'devices')".Trim()
