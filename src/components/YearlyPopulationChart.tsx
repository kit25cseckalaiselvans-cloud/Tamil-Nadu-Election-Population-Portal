import React, { useState } from 'react';
import { YearlyPopulationRecord } from '../types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceDot,
  Cell,
} from 'recharts';
import { TrendingUp, BarChart3, LineChart as LineIcon, Layers, Info } from 'lucide-react';

interface YearlyPopulationChartProps {
  records: YearlyPopulationRecord[];
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

export const YearlyPopulationChart: React.FC<YearlyPopulationChartProps> = ({
  records,
  selectedYear,
  onSelectYear,
}) => {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'combined'>('line');

  // Chart data formatted
  const chartData = records.map((r) => ({
    year: r.year,
    displayYear: String(r.year),
    population: r.totalPopulation,
    populationInCrores: Number((r.totalPopulation / 10000000).toFixed(3)),
    growthRate: r.growthRatePercent,
    status: r.status,
    isOfficial: r.status === 'Official',
    growthAbsolute: r.growthAbsolute,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs min-w-[220px]">
          <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-2">
            <span className="font-extrabold text-amber-400 font-mono text-sm">
              Year {data.year}
            </span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                data.isOfficial
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
              }`}
            >
              {data.status}
            </span>
          </div>

          <div className="space-y-1.5 font-mono">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Population:</span>
              <span className="text-white font-bold text-sm">
                {data.population.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">In Crores:</span>
              <span className="text-amber-300 font-semibold">{data.populationInCrores} Cr</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Yearly Growth:</span>
              <span
                className={`font-semibold ${
                  data.growthRate >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {data.growthRate >= 0 ? '+' : ''}
                {data.growthRate}% (+{data.growthAbsolute.toLocaleString('en-IN')})
              </span>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400 italic">
            Click data point to view full year metadata
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Tamil Nadu Population Growth: 2010–2026
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Decadal progression from 7.12 Crore (2010) to 7.79 Crore (2026) based on Census & RGI demographic reports.
          </p>
        </div>

        {/* View Toggle (Line vs Bar) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setChartType('line')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              chartType === 'line'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LineIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>Line Chart</span>
          </button>
          <button
            type="button"
            onClick={() => setChartType('bar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              chartType === 'bar'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
            <span>Bar Chart</span>
          </button>
          <button
            type="button"
            onClick={() => setChartType('combined')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all hidden md:flex items-center gap-1.5 ${
              chartType === 'combined'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-purple-600" />
            <span>Dual View</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 sm:h-84 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart
              data={chartData}
              margin={{ top: 15, right: 15, left: 10, bottom: 20 }}
              onClick={(e: any) => {
                if (e && e.activePayload && e.activePayload.length) {
                  onSelectYear(e.activePayload[0].payload.year);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="displayYear"
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickMargin={8}
              />
              <YAxis
                domain={[70, 79]}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickFormatter={(v) => `${v} Cr`}
                tickMargin={8}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 10, fontSize: 12 }} />
              <Bar
                dataKey="populationInCrores"
                name="Total Population (Crores)"
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={`bar-${entry.year}`}
                    fill={
                      entry.year === selectedYear
                        ? '#0f172a'
                        : entry.isOfficial
                        ? '#10b981'
                        : '#3b82f6'
                    }
                    cursor="pointer"
                  />
                ))}
              </Bar>
            </BarChart>
          ) : chartType === 'combined' ? (
            <BarChart
              data={chartData}
              margin={{ top: 15, right: 20, left: 10, bottom: 20 }}
              onClick={(e: any) => {
                if (e && e.activePayload && e.activePayload.length) {
                  onSelectYear(e.activePayload[0].payload.year);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="displayYear"
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickMargin={8}
              />
              <YAxis
                yAxisId="left"
                domain={[70, 79]}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickFormatter={(v) => `${v} Cr`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 1.8]}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 10, fontSize: 12 }} />
              <Bar
                yAxisId="left"
                dataKey="populationInCrores"
                name="Population (Crores)"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="growthRate"
                name="Annual Growth %"
                stroke="#f59e0b"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#f59e0b' }}
              />
            </BarChart>
          ) : (
            <LineChart
              data={chartData}
              margin={{ top: 15, right: 20, left: 10, bottom: 20 }}
              onClick={(e: any) => {
                if (e && e.activePayload && e.activePayload.length) {
                  onSelectYear(e.activePayload[0].payload.year);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="displayYear"
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickMargin={8}
              />
              <YAxis
                domain={[70, 79]}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickFormatter={(v) => `${v} Cr`}
                tickMargin={8}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 10, fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="populationInCrores"
                name="Total Population (Crores)"
                stroke="#2563eb"
                strokeWidth={3}
                dot={(props: any) => {
                  const { cx, cy, payload } = props;
                  const isSelected = payload.year === selectedYear;
                  const isOfficial = payload.isOfficial;
                  return (
                    <circle
                      key={`dot-${payload.year}`}
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 6 : isOfficial ? 5 : 3.5}
                      fill={
                        isSelected
                          ? '#f59e0b'
                          : isOfficial
                          ? '#10b981'
                          : '#2563eb'
                      }
                      stroke="#ffffff"
                      strokeWidth={2}
                      className="cursor-pointer transition-all hover:scale-125"
                    />
                  );
                }}
                activeDot={{ r: 7, fill: '#f59e0b', stroke: '#ffffff', strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Interactive Helper Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <strong>2011:</strong> Official Census enumeration (72,147,030)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <strong>2012–2026:</strong> RGI Demographic Cohort Projection
          </span>
        </div>

        <span className="text-[11px] text-slate-400 italic">
          Currently focused on: <strong className="text-slate-800">{selectedYear}</strong>
        </span>
      </div>
    </div>
  );
};
