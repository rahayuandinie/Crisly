import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = '',
  duration = 650,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startVal = display;
    const diff = value - startVal;

    if (diff === 0) return;

    let rafId = 0;
    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(startVal + diff * eased));
      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      }
    };

    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span className="tabular-nums">
      {display.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}
