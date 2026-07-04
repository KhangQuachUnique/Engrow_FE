import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { BandProgressPoint } from "../types/bandProgress";

interface BandProgressChartProps {
  points: BandProgressPoint[];
}

function BandTooltip(props: unknown) {
  const { active, payload } = props as {
    active?: boolean;
    payload?: Array<{ payload?: BandProgressPoint }>;
  };

  if (!active || !payload?.length) return null;

  const point = payload[0]?.payload as BandProgressPoint | undefined;
  if (!point) return null;

  return (
    <div className="rounded-2xl border border-primary-100 bg-white px-4 py-3 shadow-[0_12px_30px_rgba(58,190,249,0.18)]">
      <p className="font-heading text-xs font-bold text-text-muted">
        Essay attempt {point.attempt}
      </p>
      <p className="mt-1 font-heading text-2xl font-bold text-brand">
        Band {point.label}
      </p>
    </div>
  );
}

function BandDot({ cx, cy }: { cx?: number; cy?: number }) {
  if (cx === undefined || cy === undefined) return null;

  return (
    <circle
      cx={cx}
      cy={cy}
      r="4"
      fill="#3abef9"
      stroke="#ffffff"
      strokeWidth="3"
    />
  );
}

function ActiveBandDot({ cx, cy }: { cx?: number; cy?: number }) {
  if (cx === undefined || cy === undefined) return null;

  return (
    <g>
      <circle cx={cx} cy={cy} r="11" fill="rgba(58,190,249,0.18)" />
      <circle cx={cx} cy={cy} r="5" fill="#3abef9" stroke="#ffffff" strokeWidth="3" />
    </g>
  );
}

export default function BandProgressChart({
  points,
}: BandProgressChartProps) {
  const latestPoint = points.at(-1);
  const bestBand = Math.max(...points.map((point) => point.band));

  return (
    <section className="rounded-3xl border border-white bg-white px-7 py-7 shadow-[0_12px_32px_rgba(58,190,249,0.08)]">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="font-heading text-xs font-bold uppercase text-brand">
            Progress trend
          </p>
          <h2 className="mt-1 font-heading text-xl font-bold leading-7 text-text-main">
            Band progress over essays
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:min-w-56">
          <div className="rounded-2xl bg-primary-50 px-4 py-3">
            <p className="font-heading text-xs font-bold text-text-muted">
              Latest
            </p>
            <p className="font-heading text-2xl font-bold text-brand-dark">
              {latestPoint?.label ?? "-"}
            </p>
          </div>
          <div className="rounded-2xl bg-[#f8fff9] px-4 py-3">
            <p className="font-heading text-xs font-bold text-text-muted">
              Best
            </p>
            <p className="font-heading text-2xl font-bold text-emerald-500">
              {bestBand.toFixed(bestBand % 1 === 0 ? 0 : 1)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 h-75 min-w-170">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={points}
            margin={{ top: 16, right: 16, bottom: 18, left: -8 }}
          >
            <defs>
              <linearGradient id="bandProgressFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3abef9" stopOpacity={0.26} />
                <stop offset="70%" stopColor="#3abef9" stopOpacity={0.06} />
                <stop offset="100%" stopColor="#3abef9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="#ddf5ff"
              strokeDasharray="4 8"
              vertical={false}
            />
            <XAxis
              dataKey="attempt"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6e7980", fontFamily: "Quicksand", fontSize: 13 }}
              dy={10}
            />
            <YAxis
              domain={[4, 9]}
              ticks={[4, 5, 6, 7, 8, 9]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6e7980", fontFamily: "Quicksand", fontSize: 13 }}
              width={42}
            />
            <Tooltip content={<BandTooltip />} cursor={{ stroke: "#b9ebff", strokeWidth: 2 }} />
            <ReferenceLine
              y={7.5}
              stroke="#ff9f43"
              strokeDasharray="6 6"
              strokeWidth={2}
              label={{
                value: "Target 7.5",
                fill: "#ff7a1a",
                fontFamily: "Quicksand",
                fontSize: 12,
                fontWeight: 700,
                position: "insideTopRight",
              }}
            />
            <Area
              type="monotone"
              dataKey="band"
              stroke="#3abef9"
              strokeWidth={3}
              fill="url(#bandProgressFill)"
              dot={<BandDot />}
              activeDot={<ActiveBandDot />}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
