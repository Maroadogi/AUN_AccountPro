import React from "react";

interface LogoMarkProps {
  className?: string;
}

export function LogoMark({ className = "w-10 h-10" }: LogoMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ribbonGradComp" x1="10%" y1="90%" x2="90%" y2="10%">
          <stop offset="0%" stop-color="#8021F3" />
          <stop offset="50%" stop-color="#4361EE" />
          <stop offset="100%" stop-color="#4CC9F0" />
        </linearGradient>
        <linearGradient id="centerGradComp" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00F5FF" />
          <stop offset="100%" stop-color="#0055FF" />
        </linearGradient>
        <linearGradient id="floatTopComp" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#48CAE4" />
          <stop offset="100%" stop-color="#4361EE" />
        </linearGradient>
        <linearGradient id="floatMidComp" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#B5179E" />
          <stop offset="100%" stop-color="#7209B7" />
        </linearGradient>
        <linearGradient id="floatBotComp" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#7209B7" />
          <stop offset="100%" stop-color="#3F37C9" />
        </linearGradient>
      </defs>

      {/* Sweeping Outer Ribbon */}
      <path
        d="M 45,8 C 45,8 15,38 10,43 C 5,48 5,52 10,57 C 15,62 45,92 45,92 C 48,95 53,95 56,92 C 60,88 58,80 50,75 C 44,71 28,55 26,50 C 28,45 44,29 50,25 C 58,20 60,12 56,8 C 53,5 48,5 45,8 Z"
        fill="url(#ribbonGradComp)"
      />

      {/* Ribbon highlights for 3D effect */}
      <path
        d="M 45,8 C 45,8 15,38 10,43 C 5,48 5,52 10,57 C 12,59 14,56 18,52 C 22,48 38,32 44,26 C 48,22 48,15 45,8 Z"
        fill="white"
        opacity="0.12"
      />

      {/* Central Diamond */}
      <path
        d="M 46,32 L 61,47 C 62,48 62,52 61,53 L 46,68 C 45,69 43,69 42,68 L 27,53 C 26,52 26,48 27,47 L 42,32 C 43,31 45,31 46,32 Z"
        fill="url(#centerGradComp)"
      />

      {/* Floating Diamond 1 (Top-Right) */}
      <path
        d="M 72,18 L 80,26 C 81,27 81,29 80,30 L 72,38 C 71,39 69,39 68,38 L 60,30 C 59,29 59,27 60,26 L 68,18 C 69,17 71,17 72,18 Z"
        fill="url(#floatTopComp)"
      />

      {/* Floating Diamond 2 (Middle-Right) */}
      <path
        d="M 82,36 L 90,44 C 91,45 91,47 90,48 L 82,56 C 81,57 79,57 78,56 L 70,48 C 69,47 69,45 70,44 L 78,36 C 79,35 81,35 82,36 Z"
        fill="url(#floatMidComp)"
      />

      {/* Floating Diamond 3 (Bottom-Right) */}
      <path
        d="M 72,54 L 80,62 C 81,63 81,65 80,66 L 72,74 C 71,75 69,75 68,74 L 60,66 C 59,65 59,63 60,62 L 68,54 C 69,53 71,53 72,54 Z"
        fill="url(#floatBotComp)"
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export default function Logo({
  className = "flex items-center gap-3 select-none",
  iconClassName = "w-9 h-9 md:w-10 md:h-10",
  textClassName = "font-sans font-extrabold tracking-tight text-xl md:text-2xl text-ink-dark",
}: LogoProps) {
  return (
    <div className={className}>
      <LogoMark className={iconClassName} />
      <span className={textClassName}>
        Аудит<span className="text-lavender-accent font-medium">Учет</span>Налоги
      </span>
    </div>
  );
}
