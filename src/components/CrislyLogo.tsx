import { Sparkles } from 'lucide-react';

interface CrislyLogoProps {
  size?: 'sm' | 'md';
}

export function CrislyLogo({ size = 'md' }: CrislyLogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none">
      <span
        className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFD6E7] via-[#E8DFFF] to-[#D9EEFF] border border-white shadow-xs ${
          size === 'sm' ? 'w-8 h-8' : 'w-9 h-9'
        }`}
      >
        <Sparkles
          className={`${size === 'sm' ? 'w-4 h-4' : 'w-4.5 h-4.5'} text-[#6D28D9]`}
          aria-hidden="true"
        />
      </span>
      <span
        className={`font-display font-extrabold tracking-tight text-[#353044] ${
          size === 'sm' ? 'text-lg' : 'text-xl'
        }`}
      >
        CRISLY
      </span>
    </span>
  );
}
