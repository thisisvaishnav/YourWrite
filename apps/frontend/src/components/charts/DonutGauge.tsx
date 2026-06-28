import { useEffect, useState } from "react";

interface DonutGaugeProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function DonutGauge({
  value,
  size = 180,
  strokeWidth = 14,
  label = "Overall Match"
}: DonutGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    // Trigger the sweep animation after mount
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 150);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  // Color selection based on score range
  let gradientStart = "#10b981"; // emerald-500
  let gradientEnd = "#06b6d4";   // cyan-500
  if (value < 50) {
    gradientStart = "#ef4444"; // red-500
    gradientEnd = "#f97316";   // orange-500
  } else if (value < 80) {
    gradientStart = "#f59e0b"; // amber-500
    gradientEnd = "#eab308";   // yellow-500
  }

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90 transition-transform duration-1000 ease-out"
        >
          <defs>
            <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradientStart} />
              <stop offset="100%" stopColor={gradientEnd} />
            </linearGradient>
            <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="0.35" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background track circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="stroke-muted/20 dark:stroke-muted/10 fill-none"
            strokeWidth={strokeWidth}
          />

          {/* Glowing/Shadow underlay path (slightly offset/blurred) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#donutGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            filter="url(#gaugeGlow)"
            className="transition-[stroke-dashoffset] duration-1000 ease-out"
          />
        </svg>

        {/* Centered textual contents */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold tracking-tight text-foreground transition-all duration-1000 ease-out">
            {Math.round(animatedValue)}%
          </span>
          <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase mt-0.5 max-w-[100px] leading-tight">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
