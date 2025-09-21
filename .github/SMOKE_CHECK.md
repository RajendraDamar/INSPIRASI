CI smoke-check
===============

This repository includes a lightweight CI smoke-check workflow that verifies `packages/ui` builds and runs a workspace typecheck.

Trigger it manually via GitHub Actions (workflow: `CI — Smoke check`). There is an optional Android emulator job; to run it set the `run_android` input to `true`.

Local helper: `scripts/ci/run-smoke-check.ps1` will attempt to build `packages/ui` and capture `adb logcat` + a screenshot if `adb` is available in PATH.
