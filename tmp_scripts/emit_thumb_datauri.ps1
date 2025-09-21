param([string]$Path = ".\tmp_mobile_screenshot_thumb.png")
if (-not (Test-Path $Path)) { Write-Error "Missing $Path"; exit 2 }
$b = [System.IO.File]::ReadAllBytes($Path)
$s = [Convert]::ToBase64String($b)
Write-Output "data:image/png;base64,$s"
