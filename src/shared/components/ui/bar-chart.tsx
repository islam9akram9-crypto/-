import { cn } from "@/lib/utils";

export interface BarDatum {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarDatum[];
  className?: string;
  height?: number;
}

export function BarChart({ data, className, height = 200 }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-end gap-3" style={{ height }}>
        {data.map((d) => (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t-md bg-indigo-500 transition-all"
                style={{
                  height: `${(d.value / max) * 100}%`,
                  backgroundColor: d.color,
                }}
                title={`${d.label}: ${d.value}`}
              />
            </div>
            <span className="text-xs text-slate-500">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}