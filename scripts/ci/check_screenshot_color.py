#!/usr/bin/env python3
"""Simple screenshot color checker for CI.

Checks whether the provided PNG contains pixels close to one of the expected
primary colors from the Tailwind tokens (primary.600 / primary.500).

Usage: python scripts/ci/check_screenshot_color.py tmp_mobile_screenshot.png
Exits 0 on success, 2 on missing file, 1 on assertion failure.
"""
import sys
from PIL import Image
import math


def rgb_distance(a, b):
    return math.sqrt(sum((x - y) ** 2 for x, y in zip(a, b)))


def find_color(img, target_rgb, max_distance=80, sample_step=6):
    w, h = img.size
    px = img.load()
    for y in range(0, h, sample_step):
        for x in range(0, w, sample_step):
            if px[x, y][:3] == target_rgb:
                return True
            if rgb_distance(px[x, y][:3], target_rgb) <= max_distance:
                return True
    return False


def main():
    if len(sys.argv) < 2:
        print("Usage: check_screenshot_color.py <screenshot.png>")
        sys.exit(2)

    path = sys.argv[1]
    try:
        img = Image.open(path).convert("RGBA")
    except FileNotFoundError:
        print(f"File not found: {path}")
        sys.exit(2)

    # Tailwind tokens used in the project (approx)
    primary_600 = (37, 99, 235)   # #2563EB
    primary_500 = (59, 130, 246)  # #3B82F6

    print(f"Checking screenshot for primary colors: {primary_600} or {primary_500}")

    found_600 = find_color(img, primary_600)
    found_500 = find_color(img, primary_500)

    if found_600 or found_500:
        print("OK: Found expected primary color in screenshot")
        sys.exit(0)
    else:
        print("ERROR: Expected primary colors not found in screenshot")
        # Print top colors for diagnostics
        try:
            small = img.convert('RGB')
            colors = small.getcolors(maxcolors=10000000)
            colors_sorted = sorted(colors, key=lambda x: -x[0])
            print('\nTop 20 colors (count, rgb):')
            for c in colors_sorted[:20]:
                print(c)
        except Exception as e:
            print(f"Could not compute top colors: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
