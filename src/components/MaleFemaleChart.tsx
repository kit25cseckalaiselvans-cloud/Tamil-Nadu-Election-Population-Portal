import React, { useState } from 'react';
import { YearlyPopulationRecord } from '../types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';
import { Users, AlertCircle, BarChart2, AreaChart as AreaIcon } from 'lucide-react';

interface MaleFemaleChartProps {
  records: YearlyPopulationRecord[];
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

export const MaleFemaleChart: React.FC<MaleFemaleChartProps> = ({
  records,
  selectedYear,
  onSelectYear,
}) => {
  const [viewMode, setViewMode] = useState<'grouped' | 'proportions'>('grouped');

  const chartData = records.map((r) => ({
    year: r.year,
    displayYear: String(r.year),
    maleCrores: Number((r.malePopulation / 10000000).toFixed(3)),
    femaleCrores: Number((r.femalePopulation / 10000000).toFixed(3)),
    maleRaw: r.malePopulation,
    femaleRaw: r.femalePopulation,
    malePct: r.malePercentage,
    femalePct: r.femalePercentage,
    sexRatio: Math.round((r.femalePopulation / r.malePopulation) * 1000),
    isOfficial: r.status === 'Official',
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs min-w-[240px]">
          <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-2">
            <span className="font-extrabold text-amber-400 font-mono text-sm">
              Year {data.year}
            </span>
            <span className="text-[10px] text-slate-300">
              Sex Ratio: <strong className="text-amber-300 font-mono">{data.sexRatio}</strong> F/1000 M
            </span>
          </div>

          <div className="space-y-2 font-mono">
            <div className="flex justify-between items-center bg-blue-950/50 p-1.5 rounded border border-blue-800/40">
              <span className="text-blue-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Male:
              </span>
              <div className="text-right">
                <span className="text-white font-bold block">{data.maleRaw.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-blue-200">({data.malePct}%)</span>
              </div>
            </div>

            <div className="flex justify-between items-center bg-rose-950/50 p-1.5 rounded border border-rose-800/40">
              <span className="text-rose-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                Female:
              </span>
              <div className="text-right">
                <span className="text-white font-bold block">{data.femaleRaw.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-rose-200">({data.femalePct}%)</span>
              </div>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] text-amber-300/80">
            {data.isOfficial
              ? 'Official Census 2011 gender enumeration'
              : 'Estimated gender proportions (RGI demographic projections)'}
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
            <Users className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Male vs Female Population – 2010 to 2026
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Gender-wise demographic split, percentages, and evolving sex ratio for Tamil Nadu.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('grouped')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'grouped'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Absolute Count</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('proportions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'proportions'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AreaIcon className="w-3.5 h-3.5 text-rose-600" />
            <span>Percentages</span>
          </button>
        </div>
      </div>

      {/* Notice Banner about gender estimations */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Demographic Methodology Note: </span>
          Only the 2011 Census headcount figures are official statutory door-to-door enumeration records. Yearly gender figures for 2010 and 2012–2026 are <strong>demographic cohort projections</strong> derived from RGI age-sex survival schedules and SRS vital statistics.
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 sm:h-84 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === 'grouped' ? (
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
                domain={[34, 40]}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickFormatter={(v) => `${v} Cr`}
                tickMargin={8}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 10, fontSize: 12 }} />
              <Bar
                dataKey="maleCrores"
                name="Male Population (Cr)"
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="femaleCrores"
                name="Female Population (Cr)"
                fill="#ec4899"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <AreaChart
              data={chartData}
              margin={{ top: 15, right: 15, left: 10, bottom: 20 }}
              onClick={(e: any) => {
                if (e && e.activePayload && e.activePayload.length) {
                  onSelectYear(e.activePayload[0].payload.year);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="displayYear"
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickMargin={8}
              />
              <YAxis
                domain={[48, 52]}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickFormatter={(v) => `${v}%`}
                tickMargin={8}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 10, fontSize: 12 }} />
              <Area
                type="monotone"
                dataKey="malePct"
                name="Male Share (%)"
                stroke="#2563eb"
                fill="#3b82f6"
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="femalePct"
                name="Female Share (%)"
                stroke="#ec4899"
                fill="#f472b6"
                fillOpacity={0.25}
                strokeWidth={2}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Footer Info / Selected Year Insight */}
      {(() => {
        const sel = records.find((r) => r.year === selectedYear) || records[records.length - 1];
        return (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Selected Year</span>
              <span className="font-bold text-slate-900 font-mono text-sm">{sel.year}</span>
            </div>
            <div className="bg-blue-50/60 p-2.5 rounded-xl border border-blue-200">
              <span className="text-blue-700 block text-[11px]">Male Population</span>
              <span className="font-bold text-blue-900 font-mono text-sm">
                {sel.malePopulation.toLocaleString('en-IN')}{' '}
                <span className="text-xs font-medium text-blue-700">({sel.malePercentage}%)</span>
              </span>
            </div>
            <div className="bg-rose-50/60 p-2.5 rounded-xl border border-rose-200">
              <span className="text-rose-700 block text-[11px]">Female Population</span>
              <span className="font-bold text-rose-900 font-mono text-sm">
                {sel.femalePopulation.toLocaleString('en-IN')}{' '}
                <span className="text-xs font-medium text-rose-700">({sel.femalePercentage}%)</span>
              </span>
            </div>
            <div className="bg-amber-50/60 p-2.5 rounded-xl border border-amber-200">
              <span className="text-amber-800 block text-[11px]">Sex Ratio</span>
              <span className="font-bold text-amber-950 font-mono text-sm">
                {Math.round((sel.femalePopulation / sel.malePopulation) * 1000)}{' '}
                <span className="text-[10px] text-amber-800 font-normal">F per 1,000 M</span>
              </span>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
