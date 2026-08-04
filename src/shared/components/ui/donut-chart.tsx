import { cn } from "@/lib/utils";

export interface DonutDatum {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutDatum[];
  className?: string;
  size?: number;
}

export function DonutChart({ data, className, size = 160 }: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;

  const segments = data.reduce<{ label: string; color: string; dash: number; offset: number }[]>(
    (acc, d) => {
      const dash = (d.value / total) * circumference;
      const offset = acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].dash : 0;
      acc.push({ label: d.label, color: d.color, dash, offset });
      return acc;
    },
    []
  );

  return (
    <div className={cn("flex items-center gap-6", className)}>
      <svg width={size} height={size} viewBox="0 0 42 42" className="-rotate-90">
        <circle cx="21" cy="21" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="6" />
        {segments.map((d) => (
          <circle
            key={d.label}
            cx="21"
            cy="21"
            r={radius}
            fill="none"
            stroke={d.color}
            strokeWidth="6"
            strokeDasharray={`${d.dash} ${circumference - d.dash}`}
            strokeDashoffset={-d.offset}
          />
        ))}
      </svg>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2 text-sm">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-slate-600">{d.label}</span>
            <span className="font-medium text-slate-900">
              {Math.round((d.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}