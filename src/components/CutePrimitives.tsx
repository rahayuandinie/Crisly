import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SparkleParticle {
  id: number;
  dx: number;
  dy: number;
  color: string;
}

interface SparkleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SPARKLE_COLORS = ['#FFD6E7', '#A78BFA', '#FFF1C7', '#EC4899', '#D9EEFF'];

export function SparkleButton({
  children,
  onClick,
  className = '',
  ...props
}: SparkleButtonProps) {
  const [bursts, setBursts] = useState<SparkleParticle[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const base = Date.now();
    const particles: SparkleParticle[] = [
      { id: base + 1, dx: -24, dy: -22, color: SPARKLE_COLORS[0] },
      { id: base + 2, dx: 24, dy: -20, color: SPARKLE_COLORS[1] },
      { id: base + 3, dx: -28, dy: 12, color: SPARKLE_COLORS[2] },
      { id: base + 4, dx: 26, dy: 14, color: SPARKLE_COLORS[3] },
      { id: base + 5, dx: 0, dy: -30, color: SPARKLE_COLORS[4] },
    ];
    setBursts(particles);
    window.setTimeout(() => setBursts([]), 500);
    onClick?.(e);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`relative overflow-visible hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 ${className}`}
    >
      {children}
      <AnimatePresence>
        {bursts.map((p) => (
          <motion.span
            key={p.id}
            aria-hidden="true"
            initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 1.1, x: p.dx, y: p.dy }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 0L7.3 4.7L12 6L7.3 7.3L6 12L4.7 7.3L0 6L4.7 4.7L6 0Z"
                fill={p.color}
              />
            </svg>
          </motion.span>
        ))}
      </AnimatePresence>
    </button>
  );
}

interface CuteTooltipProps {
  label: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

export function CuteTooltip({
  label,
  children,
  position = 'bottom',
}: CuteTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, y: position === 'bottom' ? -4 : 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === 'bottom' ? -4 : 4, scale: 0.95 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 z-50 whitespace-nowrap rounded-2xl bg-[#FFF1C7] border border-[#FDE68A] px-3 py-1.5 text-[11px] font-bold text-[#353044] shadow-md shadow-[#A78BFA]/15 ${
              position === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2'
            }`}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

interface CuteEmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function CuteEmptyState({
  title,
  description,
  action,
}: CuteEmptyStateProps) {
  return (
    <div className="rounded-3xl bg-white border border-[#EFE8F6] p-10 text-center flex flex-col items-center gap-3 shadow-xs">
      {/* Minimalist cute pastel cloud & sparkle illustration */}
      <div className="relative w-24 h-20 flex items-center justify-center">
        <svg
          viewBox="0 0 96 76"
          className="w-full h-full animate-float-gentle"
          aria-hidden="true"
        >
          <circle cx="20" cy="18" r="4" fill="#FFD6E7" />
          <circle cx="78" cy="16" r="3.5" fill="#D9EEFF" />
          <path
            d="M82 32L83.5 36.5L88 38L83.5 39.5L82 44L80.5 39.5L76 38L80.5 36.5L82 32Z"
            fill="#A78BFA"
          />
          <path
            d="M27 56H68C74.6 56 80 50.6 80 44C80 37.9 75.4 32.8 69.4 32.1C67.4 23.4 59.6 17 50.3 17C40.1 17 31.7 24.7 30.6 34.7C24.7 35.6 20 40.7 20 47C20 52 23.1 56 27 56Z"
            fill="#E8DFFF"
          />
          <circle cx="43" cy="40" r="2.2" fill="#353044" />
          <circle cx="57" cy="40" r="2.2" fill="#353044" />
          <path
            d="M46.5 45.5C48 47.5 52 47.5 53.5 45.5"
            stroke="#EC4899"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h3 className="font-display text-base font-extrabold text-[#353044]">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-[#6E6584] max-w-sm leading-relaxed">
        {description}
      </p>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}

export function CuteLoadingOverlay({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#FFFCFA]/90 backdrop-blur-md flex flex-col items-center justify-center gap-4"
    >
      <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#FFD6E7] via-[#E8DFFF] to-[#D9EEFF] flex items-center justify-center shadow-lg shadow-[#A78BFA]/20 animate-float-gentle">
        <Sparkles className="w-7 h-7 text-[#6D28D9] animate-sparkle" aria-hidden="true" />
      </div>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFD6E7] animate-bounce" />
        <span
          className="w-2.5 h-2.5 rounded-full bg-[#A78BFA] animate-bounce"
          style={{ animationDelay: '120ms' }}
        />
        <span
          className="w-2.5 h-2.5 rounded-full bg-[#D9EEFF] animate-bounce"
          style={{ animationDelay: '240ms' }}
        />
      </div>
      <p className="font-display text-sm font-extrabold text-[#353044]">
        {message}
      </p>
    </motion.div>
  );
}
