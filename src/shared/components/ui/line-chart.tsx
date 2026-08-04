import { cn } from "@/lib/utils";

export interface LineDatum {
  label: string;
  value: number;
}

interface LineChartProps {
  data: LineDatum[];
  className?: string;
  height?: number;
}

export function LineChart({ data, className, height = 200 }: LineChartProps) {
  if (data.length < 2) return null;

  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(...data.map((d) => d.value), 0);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((d.value - min) / range) * 80 - 10;
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L 100 100 L 0 100 Z`;

  return (
    <div className={cn("w-full", className)}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ height }} className="w-full">
        <defs>
          <linearGradient id="lineArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#lineArea)" />
        <path
          d={linePath}
          fill="none"
          stroke="#6366f1"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {points.map((p) => (
          <circle key={p.label} cx={p.x} cy={p.y} r="1.5" fill="#6366f1" />
        ))}
      </svg>
      <div className="mt-2 flex justify-between">
        {data.map((d) => (
          <span key={d.label} className="text-xs text-slate-500">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}