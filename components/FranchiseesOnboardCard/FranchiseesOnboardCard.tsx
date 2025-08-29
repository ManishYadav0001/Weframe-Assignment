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
      setVal(Math.round(0 + (target - 0) * easeOutCubic(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, reduced]);

  return val;
}

export default function FranchiseOnboardCard() {
  const total = useCountUp(14, 900); 

  return (
    <Card className="w-full h-[300px] rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Total Franchisees Onboard
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Top Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold" aria-live="polite">
              {total}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
              <ArrowUpRight className="h-3 w-3" />
              7.4%
            </span>
          </div>

          {/* Avatars */}
          <div className="flex -space-x-2">
            <Avatar className="h-6 w-6 border-2 border-white">
              <AvatarImage src="https://i.pravatar.cc/40?img=1" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Avatar className="h-6 w-6 border-2 border-white">
              <AvatarImage src="https://i.pravatar.cc/40?img=2" />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <Avatar className="h-6 w-6 border-2 border-white">
              <AvatarImage src="https://i.pravatar.cc/40?img=3" />
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <Avatar className="h-6 w-6 border-2 border-white">
              <AvatarImage src="https://i.pravatar.cc/40?img=4" />
              <AvatarFallback>D</AvatarFallback>
            </Avatar>
            <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-xs font-medium">
              +7
            </div>
          </div>
        </div>

        {/* Progress Bars (static as before) */}
        <div className="mt-4 space-y-1">
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div className="h-2 w-[20%] rounded-full bg-blue-500" />
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div className="h-2 w-[70%] rounded-full bg-blue-400" />
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div className="h-2 w-[50%] rounded-full bg-blue-300" />
          </div>
        </div>

        {/* Stages */}
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Stage 1 (Initial Inquiry)
            </div>
            <span className="font-semibold">02</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Stage 2 (Document Submission)
            </div>
            <span className="font-semibold">07</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-300" />
              Stage 3 (Training)
            </div>
            <span className="font-semibold">05</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
