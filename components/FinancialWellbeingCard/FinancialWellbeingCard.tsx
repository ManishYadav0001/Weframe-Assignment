"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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

// Easing and tween via rAF
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3); 

function useCountUp(target: number, durationMs = 900) {
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
      setVal((0 + (target - 0) * easeOutCubic(t)));
      if (t < 1) raf = requestAnimationFrame(tick); 
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, reduced]);

  return val;
}

const fmtUSD = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export default function FinancialWellbeingCard() {
  // Targets
  const totalTarget = 20;
  const targetAmount = 500_000;
  const currentAmount = 450_000;

  // Animated values
  const total = Math.round(useCountUp(totalTarget, 900));
  const target = useCountUp(targetAmount, 900);
  const current = useCountUp(currentAmount, 900);

  return (
    <Card className="w-full h-[300px] rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Financial Wellbeing
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Top Section */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-5xl font-bold" aria-live="polite">{total}</span>
            <p className="text-xs text-gray-500">Total Franchisees</p>
          </div>

          <span className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full font-medium">
            <ArrowUpRight className="w-3 h-3" />
            2.1%
          </span>
        </div>

        <div className="h-[1px] mt-2 w-full bg-gray-300" />

        {/* Bottom Two Boxes */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-lg border bg-gray-50 p-4 text-center">
            <p className="mb-1 text-xs text-gray-500">Target</p>
            <p className="text-lg font-bold" aria-live="polite">{fmtUSD(target)}</p>
          </div>
          <div className="rounded-lg border bg-gray-50 p-4 text-center">
            <p className="mb-1 text-xs text-gray-500">Current</p>
            <p className="text-lg font-bold" aria-live="polite">{fmtUSD(current)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
