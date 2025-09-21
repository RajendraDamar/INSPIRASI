#!/usr/bin/env bash
set -euo pipefail

# link-ui-node-modules.sh
# Creates (or recreates) a symlink from apps/mobile/node_modules/@inspirasi/ui -> packages/ui/dist

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
SRC="$ROOT_DIR/packages/ui/dist"
DST="$ROOT_DIR/apps/mobile/node_modules/@inspirasi/ui"

echo "Project root: $ROOT_DIR"
echo "Source: $SRC"
echo "Destination: $DST"

mkdir -p "$(dirname "$DST")"
if [ -L "$DST" ] || [ -e "$DST" ]; then
  echo "Removing existing destination: $DST"
  rm -rf "$DST"
fi

ln -s "$SRC" "$DST"
echo "Created symlink: $DST -> $SRC"
