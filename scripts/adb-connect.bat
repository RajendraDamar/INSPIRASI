@echo off
REM Simple CMD wrapper to call the PowerShell adb helper.
REM Usage: adb-connect.bat 192.168.0.103
if "%1"=="" (
  echo Usage: %~n0 ^<device-ip^>
  exit /b 1
)
pwsh -NoProfile -ExecutionPolicy Bypass -File "%~dp0adb-connect.ps1" %1
