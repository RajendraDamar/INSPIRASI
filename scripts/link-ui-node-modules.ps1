# Create a junction in apps/mobile/node_modules/@inspirasi/ui pointing to packages/ui/dist
param(
  [string]$ProjectRoot = (Get-Location).Path
)

$src = Join-Path $ProjectRoot 'packages\ui\dist'
$dest = Join-Path $ProjectRoot 'apps\mobile\node_modules\@inspirasi\ui'

if (-not (Test-Path $src)) {
  Write-Error "Source path does not exist: $src. Run pnpm -C .\packages\ui run build first."
  exit 1
}

# Ensure parent folder exists
$parent = Split-Path $dest -Parent
if (-not (Test-Path $parent)) { New-Item -ItemType Directory -Path $parent -Force | Out-Null }

# Remove existing dest if it exists
if (Test-Path $dest) {
  Write-Output "Removing existing path: $dest"
  Remove-Item $dest -Recurse -Force
}

# Create the junction
cmd /c mklink /J "${dest}" "${src}"

if ($LASTEXITCODE -eq 0) {
  Write-Output "Created junction: $dest -> $src"
  exit 0
} else {
  Write-Error "mklink failed with exit code $LASTEXITCODE"
  exit $LASTEXITCODE
}
