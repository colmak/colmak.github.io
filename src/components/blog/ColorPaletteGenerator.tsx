"use client";

import React, { useState } from "react";

interface ColorSwatch {
  color: string;
  name: string;
}

export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#3b82f6"); 
  const [swatches, setSwatches] = useState<ColorSwatch[]>(
    generateSwatches("#3b82f6"),
  );

  function generateSwatches(hex: string): ColorSwatch[] {
    const result: ColorSwatch[] = [];

    for (let i = 9; i >= 1; i--) {
      const lightness = 100 - i * 10;
      result.push({
        color: lightenDarkenColor(hex, lightness),
        name: `${i}00`,
      });
    }

    return result;
  }

  function lightenDarkenColor(hex: string, percent: number): string {

    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    const [h, s, l] = rgbToHsl(r, g, b);

    const newLightness = percent / 100;

    const rgb = hslToRgb(h, s, newLightness);

    return rgbToHex(rgb[0], rgb[1], rgb[2]);
  }

  function rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return [h, s, l];
  }

  function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    let r, g, b;

    if (s === 0) {
      r = g = b = l; 
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setBaseColor(newColor);
    setSwatches(generateSwatches(newColor));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Could not copy text: ", err);
    });
  };

  return (
    <div className="my-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Interactive Color Palette Generator
      </h3>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Select base color:
          <div className="mt-1 flex items-center">
            <input
              type="color"
              value={baseColor}
              onChange={handleColorChange}
              className="h-10 w-20 cursor-pointer rounded border border-gray-300"
            />
            <span className="ml-2 font-mono">{baseColor}</span>
          </div>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {swatches.map((swatch, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden rounded-md border border-gray-200 dark:border-gray-700"
            onClick={() => copyToClipboard(swatch.color)}
            style={{ cursor: "pointer" }}
          >
            <div className="h-16" style={{ backgroundColor: swatch.color }} />
            <div className="flex justify-between bg-gray-50 p-2 dark:bg-gray-900">
              <span className="text-sm font-medium">{swatch.name}</span>
              <span className="font-mono text-xs">{swatch.color}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Click on any color swatch to copy its hex code to clipboard.
      </div>
    </div>
  );
}
