"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import * as React from "react";

// Easing: easeOutCubic
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

// Tween hook: animates from `from` to `to` over `durationMs`
function useRafTween(from: number, to: number, durationMs: number) {
  const [val, setVal] = React.useState(from);

  React.useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = easeOutCubic(t);
      setVal(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, durationMs]);

  return val;
}

export default function AccountProgress() {
  const target = 85;
  // Animate 0 -> 85 over 900ms
  const animated = useRafTween(0, target, 900);
  const rounded = Math.round(animated);

  return (
    <Card className="w-full rounded-2xl shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-center text-lg font-semibold">
          Account Progress
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        {/* Circular Progress */}
        <div className="h-32 w-32">
          <CircularProgressbar
            value={animated}
            text={`${rounded}%`}
            strokeWidth={10}
            styles={buildStyles({
              pathTransition: "none",
              textSize: "16px",
              textColor: "#000",
              pathColor: "#2196f3",
              trailColor: "#e6e6e6",
            })}
          />
        </div>

        <div className="mt-2 h-[1px] w-full bg-gray-300" />

        {/* Steps Completed */}
        <div className="w-full rounded-xl border-t bg-gray-100 p-4 pt-4 py-6 space-y-3">
          <h3 className="text-sm font-medium">Steps Completed</h3>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Profile Setup</span>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Initial Training</span>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Legal Documents</span>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
        </div>

        {/* Steps Remaining */}
        <div className="w-full rounded-xl border-t bg-gray-100 p-4 pt-4 py-6 space-y-3">
          <h3 className="text-sm font-medium">Steps Remaining</h3>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Financial Integration</span>
            <CheckCircle className="h-4 w-4 text-green-500 opacity-40" />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Final Review</span>
            <CheckCircle className="h-4 w-4 text-green-500 opacity-40" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
