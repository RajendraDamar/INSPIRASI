param(
  [string]$Mode = 'Local'
)

Write-Host "Running CI smoke-check helper (Mode=$Mode)"

# Ensure packages/ui built
if (-not (Test-Path "packages/ui/dist/index.js")) {
  Write-Host "packages/ui not built; building now..."
  pnpm -C packages/ui run build
}

# If adb is available, capture a brief logcat snapshot and a screenshot.
if (Get-Command adb -ErrorAction SilentlyContinue) {
  Write-Host "adb found — capturing logcat and screenshot"
  adb logcat -c
  adb logcat -d > tmp_device_logcat.txt

  try {
    adb shell screencap -p /sdcard/tmp_mobile_screenshot.png
    adb pull /sdcard/tmp_mobile_screenshot.png .\tmp_mobile_screenshot.png
    adb shell rm /sdcard/tmp_mobile_screenshot.png
    Write-Host "Captured screenshot to tmp_mobile_screenshot.png"
  } catch {
    Write-Host "Failed to capture screenshot: $_"
  }
} else {
  Write-Host "adb not found in PATH — emulator steps will be skipped."
}

Write-Host "CI smoke-check helper finished."
