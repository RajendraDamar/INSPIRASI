param(
  [string]$Src = ".\tmp_mobile_screenshot.png",
  [string]$Out = ".\tmp_mobile_screenshot_thumb.png",
  [int]$Max = 160
)
if (-not (Test-Path $Src)) { Write-Error "Missing $Src"; exit 2 }
Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile($Src)
$scale = [math]::Min(1.0, $Max / [double][Math]::Max($bmp.Width,$bmp.Height))
$nw = [int]([Math]::Floor($bmp.Width * $scale))
$nh = [int]([Math]::Floor($bmp.Height * $scale))
$thumb = New-Object System.Drawing.Bitmap $nw, $nh
$g = [System.Drawing.Graphics]::FromImage($thumb)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($bmp,0,0,$nw,$nh)
$thumb.Save($Out,[System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); $thumb.Dispose();
Write-Output "WROTE_THUMB=$Out"
