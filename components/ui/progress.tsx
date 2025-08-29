// components/ui/progress.tsx
'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

type Props = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  value?: number;      // target percent 0..100
  durationMs?: number; // default 800
  easing?: string;     // default cubic-bezier(0.22,1,0.36,1)
};

export function Progress({
  className,
  value = 85,
  durationMs = 800,
  easing = 'cubic-bezier(0.22,1,0.36,1)',
  ...props
}: Props) {
  const reduced = usePrefersReducedMotion(); // respect OS setting [3]
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Step 1: commit empty bar without transition [1]
    el.style.transition = 'none';
    el.style.transform = 'translateX(-100%)';

    if (reduced) {
      // No motion when reduced‑motion is on [3]
      el.style.transform = `translateX(-${100 - (value || 0)}%)`;
      return;
    }

    // Step 2: force reflow so the initial style really paints [1]
    void el.getBoundingClientRect();

    // Step 3: enable transition, then move in the following frame(s) [1]
    el.style.transition = `transform ${durationMs}ms ${easing}`;
    const id1 = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(() => {
        el.style.transform = `translateX(-${100 - (value || 0)}%)`;
      });
      // cleanup nested raf
      return () => cancelAnimationFrame(id2);
    });

    return () => cancelAnimationFrame(id1);
  }, [value, durationMs, easing, reduced]);

  return (
    <ProgressPrimitive.Root
      value={value}
      max={100}
      className={`relative h-2 w-full overflow-hidden rounded-full bg-primary/20 ${className ?? ''}`}
      {...props}
    >
      <ProgressPrimitive.Indicator
        ref={ref}
        className="h-full w-full bg-primary will-change-transform"
      />
    </ProgressPrimitive.Root>
  );
}

export default Progress;
