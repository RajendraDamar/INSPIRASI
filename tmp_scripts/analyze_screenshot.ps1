param(
  [string]$Path = ".\tmp_mobile_screenshot.png"
)

if (-not (Test-Path $Path)) {
  Write-Error "Missing screenshot at $Path"
  exit 2
}

Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile($Path)
$w = $bmp.Width
$h = $bmp.Height
$maxDim = [Math]::Max($w,$h)
$step = [Math]::Max(1, [int]([Math]::Floor($maxDim / 200)))
$counts = @{}
$totalR=0; $totalG=0; $totalB=0; $samples=0
for ($x=0; $x -lt $w; $x += $step) {
  for ($y=0; $y -lt $h; $y += $step) {
    $color = $bmp.GetPixel($x,$y)
    $hex = '{0:X2}{1:X2}{2:X2}' -f $color.R,$color.G,$color.B
    if ($counts.ContainsKey($hex)) { $counts[$hex] += 1 } else { $counts[$hex]=1 }
    $totalR += $color.R; $totalG += $color.G; $totalB += $color.B; $samples++
  }
}
$sorted = $counts.GetEnumerator() | Sort-Object -Property Value -Descending
$top = $sorted | Select-Object -First 8
$avgR = [int]([Math]::Round($totalR / $samples))
$avgG = [int]([Math]::Round($totalG / $samples))
$avgB = [int]([Math]::Round($totalB / $samples))
$avgHex = '{0:X2}{1:X2}{2:X2}' -f $avgR,$avgG,$avgB
Write-Output "SAMPLED_PIXELS=$samples"
Write-Output "AVERAGE_HEX=#${avgHex}"
Write-Output "TOP_COLORS (hex count):"
foreach ($e in $top) { Write-Output ("#" + $e.Key + " " + $e.Value) }

# create a small thumbnail and output base64 data URI
$max = 160
$scale = [math]::Min(1.0, $max / [double]$maxDim)
$newW = [int]([Math]::Max(1,[Math]::Floor($w*$scale)))
$newH = [int]([Math]::Max(1,[Math]::Floor($h*$scale)))
$thumb = New-Object System.Drawing.Bitmap $newW, $newH
$g = [System.Drawing.Graphics]::FromImage($thumb)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($bmp,0,0,$newW,$newH)
$ms = New-Object System.IO.MemoryStream
$thumb.Save($ms,[System.Drawing.Imaging.ImageFormat]::Png)
$ms.Position=0
$bytes = $ms.ToArray()
$base64 = [Convert]::ToBase64String($bytes)
Write-Output "DATA_URI=data:image/png;base64,$base64"

$g.Dispose(); $bmp.Dispose(); $thumb.Dispose(); $ms.Dispose();
