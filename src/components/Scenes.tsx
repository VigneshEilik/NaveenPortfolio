import { useId } from 'react'
import type { CaseStudy } from '../content'
import { usePrefersReducedMotion } from '../hooks/useMotion'

/**
 * Flat "postcard" illustrations used when a case study has no photo.
 * Pure SVG — no external images. All decorative (aria-hidden).
 */

function Plane({ path, dur = '12s' }: { path: string; dur?: string }) {
  const reduced = usePrefersReducedMotion()
  return (
    <>
      <path d={path} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.2" strokeDasharray="3 5" />
      {!reduced && (
        <g>
          <path d="M -7 -4 L 8 0 L -7 4 L -4 0 Z" fill="#fff" />
          <animateMotion dur={dur} repeatCount="indefinite" rotate="auto" path={path} />
        </g>
      )}
    </>
  )
}

function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g className="motion-safe:animate-drift" fill="#fff" fillOpacity="0.85">
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <ellipse cx="0" cy="0" rx="22" ry="9" />
        <ellipse cx="14" cy="-6" rx="13" ry="10" />
        <ellipse cx="-10" cy="-4" rx="10" ry="8" />
      </g>
    </g>
  )
}

function Hills() {
  const id = useId()
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="size-full">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbd9b2" />
          <stop offset="1" stopColor="#f6efe2" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${id}-sky)`} />
      <circle cx="292" cy="92" r="34" fill="#f4a259" />
      <circle cx="292" cy="92" r="52" fill="#f4a259" fillOpacity="0.18" />
      <Cloud x={90} y={60} />
      <Cloud x={330} y={40} s={0.7} />
      <Plane path="M -20 120 C 80 60, 200 40, 420 70" dur="14s" />
      <path d="M0 170 C 60 120, 120 140, 180 150 S 300 110, 400 140 V260 H0Z" fill="#7fae8a" />
      <path d="M0 190 C 70 160, 150 185, 220 175 S 340 150, 400 170 V260 H0Z" fill="#4f8a6b" />
      <path d="M0 214 C 80 196, 170 216, 260 206 S 360 196, 400 204 V260 H0Z" fill="#2f6650" />
      <path d="M0 232 H400 V260 H0Z" fill="#3f7ba3" />
      <path d="M40 240 h40 M140 246 h60 M260 240 h50" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
      <path d="M150 52 l6 4 l6 -4 M168 62 l5 3 l5 -3" stroke="#0e1b36" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function Beach() {
  const id = useId()
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="size-full">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d2b5c" />
          <stop offset="0.55" stopColor="#e07a63" />
          <stop offset="1" stopColor="#f7c38a" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${id}-sky)`} />
      <circle cx="200" cy="168" r="44" fill="#ffd9a0" />
      <circle cx="200" cy="168" r="70" fill="#ffd9a0" fillOpacity="0.15" />
      <circle cx="60" cy="40" r="1.4" fill="#fff" />
      <circle cx="120" cy="22" r="1" fill="#fff" />
      <circle cx="330" cy="30" r="1.2" fill="#fff" />
      <Plane path="M -20 90 C 100 40, 260 30, 420 60" dur="13s" />
      <rect y="168" width="400" height="92" fill="#22407a" />
      <path d="M0 186 C 50 180, 100 192, 150 186 S 250 180, 300 186 S 370 192, 400 186" stroke="#3b62a8" strokeWidth="3" fill="none" />
      <path d="M0 206 C 50 200, 100 212, 150 206 S 250 200, 300 206 S 370 212, 400 206" stroke="#3b62a8" strokeWidth="3" fill="none" />
      <path d="M176 178 h48 M184 190 h32 M190 202 h20" stroke="#ffd9a0" strokeOpacity="0.8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M0 236 C 90 222, 200 232, 400 226 V260 H0Z" fill="#e8c48f" />
      {/* Palm */}
      <g fill="#0b1633">
        <path d="M330 240 C 326 200, 318 160, 304 128 L 309 126 C 324 158, 334 198, 337 240 Z" />
        <path d="M306 128 C 280 112, 256 116, 240 130 C 262 118, 284 120, 304 132 Z" />
        <path d="M306 128 C 300 100, 282 88, 262 86 C 282 96, 296 108, 302 130 Z" />
        <path d="M306 128 C 324 104, 346 100, 366 108 C 344 108, 326 116, 309 132 Z" />
        <path d="M306 128 C 330 126, 352 138, 362 156 C 344 140, 326 134, 307 132 Z" />
        <path d="M306 128 C 296 140, 290 158, 292 176 C 286 156, 292 140, 304 127 Z" />
      </g>
    </svg>
  )
}

function Mountains() {
  const id = useId()
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="size-full">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bcd8ec" />
          <stop offset="1" stopColor="#eef5f8" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${id}-sky)`} />
      <Cloud x={80} y={50} s={0.9} />
      <Cloud x={300} y={70} s={0.6} />
      <Plane path="M -20 70 C 120 30, 280 60, 420 30" dur="15s" />
      <path d="M-10 200 L 90 80 L 160 160 L 230 70 L 320 170 L 410 100 V260 H-10Z" fill="#5d7299" />
      <path d="M90 80 L 110 104 L 98 100 L 88 110 L 78 96 Z M230 70 L 252 96 L 238 92 L 228 102 L 216 88 Z" fill="#fff" />
      <path d="M-10 220 L 60 150 L 140 210 L 220 140 L 300 200 L 410 150 V260 H-10Z" fill="#3a4e78" />
      <path d="M0 260 C 120 250, 160 220, 210 214 S 300 210, 400 200 V260Z" fill="#7b9b74" />
      <path d="M150 260 C 180 236, 230 228, 250 214 S 300 204, 330 204" stroke="#efe6d3" strokeWidth="10" fill="none" strokeLinecap="round" />
      {/* Coach */}
      <g transform="translate(222 208) rotate(-12)">
        <rect x="0" y="-12" width="34" height="14" rx="3" fill="#f4a259" />
        <rect x="4" y="-9" width="6" height="5" fill="#0e1b36" fillOpacity="0.7" />
        <rect x="12" y="-9" width="6" height="5" fill="#0e1b36" fillOpacity="0.7" />
        <rect x="20" y="-9" width="6" height="5" fill="#0e1b36" fillOpacity="0.7" />
        <circle cx="8" cy="2" r="2.5" fill="#0e1b36" />
        <circle cx="26" cy="2" r="2.5" fill="#0e1b36" />
      </g>
    </svg>
  )
}

export function Scene({ category }: { category: CaseStudy['category'] }) {
  if (category === 'International') return <Beach />
  if (category === 'Domestic') return <Hills />
  return <Mountains />
}
