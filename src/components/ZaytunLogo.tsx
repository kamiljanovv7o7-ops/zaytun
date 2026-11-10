import React from 'react';
import { useApp } from '../context/AppContext';

interface ZaytunLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const ZaytunLogo: React.FC<ZaytunLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const { lang } = useApp();

  const dimensions = {
    sm: 'w-10 h-10',
    md: 'w-13 h-13',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32',
  }[size];

  const textSize = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  }[size];

  const subtextSize = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Medallion container */}
      <div
        className={`relative ${dimensions} rounded-full p-[2px] bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-500 shadow-lg shadow-amber-950/40 shrink-0 group`}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-stone-950 relative flex items-center justify-center border border-amber-500/50">
          {/* Real logo image cropped into circle */}
          <img
            src="/assets/aistudio/WhatsApp_Image_2026-11-06_at_15.35.09_eeaeb21b.jpeg"
            alt="Zaytun Cafe Logo"
            className="w-full h-full object-cover scale-[2.2] object-[center_45.2%] transition-transform duration-500 group-hover:scale-[2.35]"
            loading="eager"
            onError={(e) => {
              // Fallback vector icon if image fails
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          {/* Subtle gold ambient gloss */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-amber-400/10 to-transparent pointer-events-none" />
        </div>
        {/* Subtle decorative glow */}
        <div className="absolute -inset-0.5 rounded-full bg-amber-400/20 blur-[3px] -z-10 group-hover:bg-amber-400/40 transition-all duration-300" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-serif tracking-wider font-extrabold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent ${textSize}`}
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {lang === 'ky' ? 'ЗАЙТУН' : 'ZAYTUN'}
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          </div>
          <span
            className={`text-amber-200/75 uppercase tracking-widest font-medium ${subtextSize}`}
          >
            {lang === 'ky'
              ? 'Чыгыш ашканасы • Өзгөн'
              : lang === 'uz'
              ? 'Sharqona taomlar • Oʻzgan'
              : lang === 'ru'
              ? 'Восточная кухня • Узген'
              : 'Eastern Cuisine • Uzgen'}
          </span>
        </div>
      )}
    </div>
  );
};
