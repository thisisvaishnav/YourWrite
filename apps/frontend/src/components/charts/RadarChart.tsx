import { useEffect, useState } from "react";

interface RadarMetric {
  name: string;
  score: number;
}

interface RadarChartProps {
  data: RadarMetric[];
  size?: number;
  activeKey: string | null;
  onActiveKeyChange: (key: string) => void;
}

export function RadarChart({
  data,
  size = 280,
  activeKey,
  onActiveKeyChange
}: RadarChartProps) {
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = size / 2 - 40; // Leave room for labels

  const numSides = data.length;
  
  // Calculate vertex coordinates helper
  const getCoordinates = (index: number, radius: number) => {
    const angle = index * (2 * Math.PI / numSides) - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      angle
    };
  };

  // Generate background grid levels (25%, 50%, 75%, 100%)
  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  const gridPolygons = gridLevels.map(level => {
    const points = Array.from({ length: numSides }, (_, i) => {
      const { x, y } = getCoordinates(i, maxRadius * level);
      return `${x},${y}`;
    }).join(" ");
    return { level, points };
  });

  // Calculate coordinates for the actual data polygon
  const dataPoints = data.map((d, i) => {
    // Animate the scores outward
    const animatedScore = d.score * animationProgress;
    const radius = maxRadius * (animatedScore / 100);
    return getCoordinates(i, radius);
  });
  const dataPolygonString = dataPoints.map(p => `${p.x},${p.y}`).join(" ");

  // Calculate position for labels (slightly outside maxRadius)
  const labels = data.map((d, i) => {
    const { x, y, angle } = getCoordinates(i, maxRadius + 18);
    
    // Determine alignment based on position
    let textAnchor = "middle";
    let dy = "0.33em";
    
    const cosVal = Math.cos(angle);
    const sinVal = Math.sin(angle);
    
    if (Math.abs(cosVal) < 0.1) {
      // Top or Bottom
      textAnchor = "middle";
      dy = sinVal < 0 ? "-0.2em" : "1.1em";
    } else {
      // Right or Left halves
      textAnchor = cosVal > 0 ? "start" : "end";
    }

    return { name: d.name, score: d.score, x, y, textAnchor, dy };
  });

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[300px]"
      >
        <defs>
          <radialGradient id="radarAreaGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.25" />
          </radialGradient>
          <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer and Inner Polygons grid */}
        {gridPolygons.map((grid, index) => (
          <polygon
            key={index}
            points={grid.points}
            className="stroke-muted/30 dark:stroke-muted/15 fill-none stroke-[1px]"
          />
        ))}

        {/* Radial Axis lines */}
        {Array.from({ length: numSides }).map((_, i) => {
          const outer = getCoordinates(i, maxRadius);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={outer.x}
              y2={outer.y}
              className="stroke-muted/20 dark:stroke-muted/10 stroke-[1px]"
              strokeDasharray="2,2"
            />
          );
        })}

        {/* Data polygon filled area */}
        <polygon
          points={dataPolygonString}
          fill="url(#radarAreaGradient)"
          className="stroke-primary stroke-[2px] transition-all duration-1000 ease-out"
          style={{ filter: "drop-shadow(0 2px 8px var(--color-primary))" }}
        />

        {/* Vertices indicator points */}
        {dataPoints.map((p, i) => {
          const item = data[i];
          if (!item) return null;
          const isActive = activeKey === item.name;
          return (
            <g
              key={i}
              className="cursor-pointer group"
              onClick={() => onActiveKeyChange(item.name)}
            >
              {/* Outer pulsing ring for active state */}
              {isActive && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={8}
                  className="fill-primary/20 stroke-primary stroke-[1px] animate-ping"
                />
              )}
              {/* Actual point */}
              <circle
                cx={p.x}
                cy={p.y}
                r={isActive ? 6 : 4}
                className={`fill-background stroke-primary transition-all duration-300 ${
                  isActive ? "stroke-[3px]" : "stroke-[2px] group-hover:scale-125"
                }`}
              />
            </g>
          );
        })}

        {/* Dimension Labels */}
        {labels.map((lbl, i) => {
          const isActive = activeKey === lbl.name;
          return (
            <g
              key={i}
              className="cursor-pointer select-none"
              onClick={() => onActiveKeyChange(lbl.name)}
            >
              <text
                x={lbl.x}
                y={lbl.y}
                textAnchor={lbl.textAnchor}
                dy={lbl.dy}
                className={`text-[10px] font-bold tracking-tight transition-all duration-200 ${
                  isActive
                    ? "fill-primary font-extrabold text-[11px]"
                    : "fill-muted-foreground hover:fill-foreground"
                }`}
              >
                {lbl.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
