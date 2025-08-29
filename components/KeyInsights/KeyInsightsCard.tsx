"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

// Ease-out cubic for pleasant motion
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function useCountUp(target: number, durationMs = 800) {
  const reduced = usePrefersReducedMotion();
  const [val, setVal] = React.useState(0);

  React.useEffect(() => {
    if (reduced) {
      setVal(target);
      return;
    }
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = easeOutCubic(t);
      setVal(0 + (target - 0) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick); 
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, reduced]);

  return Math.round(val);
}

export default function InsightsFeedbackCard() {
  const percent = useCountUp(10, 900); 

  return (
    <Card className="w-full h-[300px] rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Key Insights & Feedback
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Top Section */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{percent}%</p>
            <p className="text-xs text-gray-500">Sales Growth</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-6 w-6 object-contain"
              />
            </div>
            <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
              Top Performer
            </span>
          </div>
        </div>

        <div className="mt-2 h-[1px] w-full bg-gray-300" />

        {/* Feedback Section */}
        <div className="mt-6 rounded-lg border bg-gray-50 p-3">
          <p className="mb-2 text-xs font-medium text-gray-700">Feedback</p>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <span className="mt-1 h-2 w-2 rounded-full bg-gray-300" />
            Franchisees are requesting more detailed training materials.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
