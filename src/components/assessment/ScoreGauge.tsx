import { useEffect, useState } from "react";
import type { ScoreBand } from "../../types/assessment";

interface ScoreGaugeProps {
  score: number;
  band: ScoreBand;
  bandLabel: string;
}

const BAND_COLORS: Record<ScoreBand, string> = {
  beginner: "#f59e0b",
  curious: "#4361EE",
  ready: "#10b981",
  advanced: "#8b5cf6",
};

export function ScoreGauge({ score, band, bandLabel }: ScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const color = BAND_COLORS[band];
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const duration = 1500;
    const start = performance.now();
    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(score * eased));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [score]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-56 h-56">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
          <circle cx="100" cy="100" r={radius} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-none" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-white">{animatedScore}</span>
          <span className="text-sm text-white/40 mt-1">out of 100</span>
        </div>
      </div>
      <div className="mt-4 px-4 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: `${color}15`, color }}>
        {bandLabel}
      </div>
    </div>
  );
}
