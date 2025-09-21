# adb-connect.ps1
# Connect an Android device over Wi-Fi and reverse Metro ports (19000, 8081)
# Usage:
#   pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\adb-connect.ps1 -DeviceIp 192.168.0.103
#   pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\adb-connect.ps1 192.168.0.103

param(
    [Parameter(Mandatory=$false, Position=0)]
    [string]$DeviceIp
)

# Support positional argument
if ([string]::IsNullOrEmpty($DeviceIp) -and $args.Count -ge 1) {
    $DeviceIp = $args[0]
}

# Trim whitespace
if ($DeviceIp) { $DeviceIp = $DeviceIp.Trim() }

if ([string]::IsNullOrEmpty($DeviceIp)) {
    Write-Error "Device IP is missing. Usage: pwsh -File .\scripts\adb-connect.ps1 -DeviceIp 192.168.0.103"
    exit 1
}

# Locate adb: prefer ANDROID_SDK_ROOT, fallback to USERPROFILE, else use 'adb' on PATH
$androidRoot = $env:ANDROID_SDK_ROOT
if ([string]::IsNullOrEmpty($androidRoot)) {
    $androidRoot = Join-Path $env:USERPROFILE 'AppData\Local\Android\Sdk'
}

$adbCandidate = Join-Path $androidRoot 'platform-tools\adb.exe'
if (Test-Path $adbCandidate) {
    $adb = $adbCandidate
} else {
    # fallback to PATH
    $adb = 'adb'
}

# Restart adb server quietly
try {
    & $adb kill-server | Out-Null
    & $adb start-server | Out-Null
} catch {
    Write-Warning "Failed to start adb server using '$adb'. Ensure adb is installed and on PATH or set ANDROID_SDK_ROOT. Error: $_"
}

Write-Output "Connecting to device $DeviceIp:5555..."
$connectOut = & $adb connect "${DeviceIp}:5555" 2>&1
Write-Output $connectOut

# If adb printed a usage message, bail early
if ($connectOut -match 'usage: adb connect') {
    Write-Error 'adb connect usage error — check the DeviceIp you passed and ensure it is non-empty and in form 192.168.x.x'
    exit 3
}

# List devices and look for the device we just connected
$devicesOut = & $adb devices -l 2>&1
Write-Output $devicesOut

if ($devicesOut -match [regex]::Escape("${DeviceIp}:5555")) {
    Write-Output 'Forwarding Metro ports (19000, 8081) to device...'
    $r1 = & $adb reverse tcp:19000 tcp:19000 2>&1
    Write-Output $r1
    $r2 = & $adb reverse tcp:8081 tcp:8081 2>&1
    Write-Output $r2
    $rList = & $adb reverse --list 2>&1
    Write-Output $rList
    Write-Output 'Done.'
    exit 0
} else {
    Write-Warning "No device found matching ${DeviceIp}:5555. Skipping adb reverse."
    Write-Output 'Use USB to authorize ADB or try: adb tcpip 5555 (run while device connected by USB), then adb connect <ip>:5555'
    exit 2
}
