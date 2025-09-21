## Phase 2 — Integrate Carefully

This section documents the integration steps we took and how to use the new CI workflow and cross-platform link helpers.

1. CI: Build verification
	 - A GitHub Actions workflow was added at `.github/workflows/build-mobile-ui.yml`.
	 - It runs on `push` and `pull_request` for changes under `packages/ui/**` and will execute `pnpm -C packages/ui run build` to ensure the shared UI package builds in CI.
	 - Purpose: catch TypeScript/build regressions for `@inspirasi/ui` early in PRs that affect the UI package.

2. Cross-platform link helpers
	 - Windows helper (already present): `scripts/link-ui-node-modules.ps1` — creates a junction using `mklink /J` from `apps/mobile/node_modules/@inspirasi/ui` to `packages/ui/dist`.
	 - Unix helper (new): `scripts/link-ui-node-modules.sh` — creates a symbolic link for macOS/Linux developers.
		 - Usage:
			 - Make executable: `chmod +x scripts/link-ui-node-modules.sh`
			 - Run: `./scripts/link-ui-node-modules.sh`
		 - Both helpers are idempotent: they remove any existing path before creating the link.

3. Verification steps (quick)
	 - Build the shared UI package:
		 ```bash
		 pnpm -C packages/ui run build
		 ```
	 - Create the link (Windows):
		 ```powershell
		 pwsh -NoProfile -ExecutionPolicy Bypass -File scripts/link-ui-node-modules.ps1
		 ```
	 - Create the link (macOS/Linux):
		 ```bash
		 chmod +x scripts/link-ui-node-modules.sh
		 ./scripts/link-ui-node-modules.sh
		 ```
	 - Start Expo (mobile):
		 ```bash
		 pnpm -C apps/mobile run dev:mobile
		 ```

4. Caveats & follow-ups
	 - CI currently only builds `packages/ui`. If you want CI to also run mobile bundling or smoke tests, we can wire an additional job that runs Metro/Expo bundling or a small Jest/react-native smoke test.
	 - Consider adding a pre-commit hook or CI check that ensures `packages/ui` builds before merging PRs that touch mobile code.

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
