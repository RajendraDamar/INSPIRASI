Developer Runbook — Inspirasi Mobile

This file contains a short, copy-paste Windows PowerShell runbook and a small helper script for wireless ADB connections used while developing the Expo mobile app.

1) Quick one-shot runbook (copy-paste into PowerShell)

```powershell
# 1) Repo root (adjust path as needed)
Set-Location 'C:\Users\Damar\Downloads\Github\INSPIRASI'

# 2) Ensure workspace deps
pnpm -w install

# 3) Build shared UI package so Metro uses dist artifacts
pnpm -C .\packages\ui run build

# 4) (Optional) Align react-native to Expo SDK 48 (only if needed)
Set-Location .\apps\mobile
npx expo install react-native@0.71.14

# 5) Wireless ADB connect (replace DEVICE_IP below with your phone IP)
$ADB = 'C:\Users\Damar\AppData\Local\Android\Sdk\platform-tools\adb.exe'
& $ADB kill-server
& $ADB start-server
& $ADB connect 192.168.0.103:5555     # <-- replace with your device IP
& $ADB devices -l

# 6) Forward Metro ports (so Expo Go reaches Metro)
& $ADB reverse tcp:19000 tcp:19000
& $ADB reverse tcp:8081 tcp:8081
& $ADB reverse --list

# 7) Start Expo Metro (clear cache)
Set-Location 'C:\Users\Damar\Downloads\Github\INSPIRASI\apps\mobile'
pnpm -C .\apps\mobile start -- --clear

# 8) Press 'a' in the Metro terminal (or run the command below in a separate terminal)
# npx expo start --android

# 9) Fallback: start the Metro server in tunnel mode (works around adb/firewall issues)
pnpm -C .\apps\mobile start -- --tunnel
```

- From repo root: `.	ools\adb-connect.ps1 -DeviceIp 192.168.0.103`
- The script prefers $env:ANDROID_SDK_ROOT if set, otherwise falls back to the typical user SDK path.

Notes:
- If your device shows `unauthorized` or `offline` in `adb devices -l`, re-authorize on the phone and/or toggle USB debugging.
- Tunnel mode is slower but reliable without fiddling with adb.


---
Quick troubleshooting:
- If Metro still can't connect: verify PC and phone are on the same Wi‑Fi, disable VPNs, or try the `--tunnel` fallback.

Developer convenience:
- From the repo root you can now run a single command to link the built UI into the mobile app, build the shared package, and start Expo (Windows only):

```powershell
# from repository root
pnpm -C .\apps\mobile run dev:mobile
```

This runs `scripts/link-ui-node-modules.ps1`, builds `packages/ui`, then starts Expo with `--clear`.
