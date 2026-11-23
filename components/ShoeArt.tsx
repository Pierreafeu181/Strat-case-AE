"use client";

import { useId } from "react";
import Image from "next/image";

const LEATHER: Record<string, string> = {
  black: "#211b18",
  walnut: "#6b3d24",
  brown: "#3d261a",
};

function tone(leather: string) {
  const l = leather.toLowerCase();
  if (l.includes("walnut")) return LEATHER.walnut;
  if (l.includes("brown")) return LEATHER.brown;
  return LEATHER.black;
}

/** Placeholder side-profile oxford (our own drawing; no brand marks). */
export function ShoeSilhouette({ leather, className }: { leather: string; className?: string }) {
  const c = tone(leather);
  const id = "g" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <svg className={className} viewBox="0 0 400 250" role="img" aria-label="Oxford shoe, side view" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <ellipse cx="205" cy="192" rx="165" ry="9" fill="#1f1a17" opacity="0.12" />
      {/* upper */}
      <path
        d="M58 183 C50 162 52 132 64 114 C70 106 80 103 92 103 L150 104 C166 105 178 110 192 119 C214 132 250 140 290 146 C330 152 356 160 364 172 C368 178 366 182 360 183 L56 183 Z"
        fill={c}
      />
      <path
        d="M58 183 C50 162 52 132 64 114 C70 106 80 103 92 103 L150 104 C166 105 178 110 192 119 C214 132 250 140 290 146 C330 152 356 160 364 172 C368 178 366 182 360 183 L56 183 Z"
        fill={`url(#${id})`}
      />
      {/* heel counter seam, quarter seam, cap toe */}
      <path d="M66 118 C80 132 86 156 84 182" fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="1.6" />
      <path d="M150 100 C150 130 160 158 176 180" fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="1.6" />
      <path d="M296 147 C292 160 294 172 302 182" fill="none" stroke="#000" strokeOpacity="0.4" strokeWidth="1.8" />
      <path d="M301 148 C297 160 299 172 307 182" fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 3" />
      {/* laces */}
      <g stroke="#fff" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round">
        <path d="M166 106 L180 113" />
        <path d="M176 112 L190 119" />
        <path d="M186 118 L200 125" />
      </g>
      {/* welt + sole + heel */}
      <path d="M50 183 L364 183 C368 183 370 186 368 189 L362 194 L52 194 Z" fill="#2b201b" />
      <path d="M58 188 L360 188" stroke="#c9a27a" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M50 194 L118 194 L116 206 L56 206 C52 206 50 203 50 200 Z" fill="#1a1411" />
      <path d="M50 200 L117 200" stroke="#000" strokeOpacity="0.4" strokeWidth="1" />
    </svg>
  );
}

/** Uses the pair photo when one is set in pairs.json, otherwise the silhouette. */
export function ShoeVisual({
  photo,
  leather,
  alt,
  priority = false,
  sizes = "(max-width: 440px) 100vw, 440px",
}: {
  photo: string | null;
  leather: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (photo) return <Image src={photo} alt={alt} fill priority={priority} sizes={sizes} />;
  return <ShoeSilhouette leather={leather} className="shoe" />;
}
