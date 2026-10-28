import React, { useState } from 'react';
import { PopulationHistoryEntry, PopulationEstimate } from '../types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { TrendingUp, Users, Calendar } from 'lucide-react';

interface PopulationChartProps {
  history: PopulationHistoryEntry[];
  estimate: PopulationEstimate;
}

export const PopulationChart: React.FC<PopulationChartProps> = ({ history, estimate }) => {
  const [activeTab, setActiveTab] = useState<'30day' | 'projection' | 'gender'>('30day');

  // Reverse 30-day history for chronological left-to-right display
  const chronologicalHistory = [...history].reverse().map((entry) => ({
    date: entry.date.slice(0, 5), // DD-MM
    fullDate: entry.date,
    population: entry.estimatedPopulation,
    formatted: entry.estimatedPopulation.toLocaleString('en-IN'),
  }));

  // Min and max for domain scaling
  const minPop = Math.min(...chronologicalHistory.map((d) => d.population));
  const maxPop = Math.max(...chronologicalHistory.map((d) => d.population));
  const padding = (maxPop - minPop) * 0.1 || 1000;

  // Long-term projection series (Census 2011 to 2031) based on RGI Report
  const projectionSeries = [
    { year: '2011 (Census)', population: 72147030, type: 'Official Headcount' },
    { year: '2016', population: 74250000, type: 'RGI Estimate' },
    { year: '2021', population: 76400000, type: 'RGI Estimate' },
    { year: '2024', population: 76860000, type: 'RGI Projection' },
    { year: '2026 (Current)', population: estimate.currentEstimatedPopulation, type: 'Daily Projection' },
    { year: '2031', population: 79200000, type: 'RGI Projection' },
    { year: '2036', population: 80100000, type: 'RGI Projection' },
  ];

  const genderData = [
    {
      category: 'Census 2011 Baseline',
      Male: 36137975,
      Female: 36009055,
    },
    {
      category: `Estimated (${estimate.updatedDateString.slice(-4)})`,
      Male: estimate.estimatedMalePopulation,
      Female: estimate.estimatedFemalePopulation,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
      {/* Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Demographic Trajectory & Visualization
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visualizing mathematical daily increments and long-term population projections.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('30day')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === '30day'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            30-Day Daily Trend
          </button>
          <button
            onClick={() => setActiveTab('projection')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'projection'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2011–2036 Projections
          </button>
          <button
            onClick={() => setActiveTab('gender')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'gender'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Gender Split
          </button>
        </div>
      </div>

      {/* 30-Day Daily Trend Chart */}
      {activeTab === '30day' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Daily Increment: +{estimate.estimatedDailyChange.toLocaleString('en-IN')} individuals / day</span>
            <span className="font-semibold text-slate-700">Past 30 Days Progression</span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chronologicalHistory} margin={{ top: 10, right: 15, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="popGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis
                  domain={[Math.floor(minPop - padding), Math.ceil(maxPop + padding)]}
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${(v / 10000000).toFixed(3)} Cr`}
                  width={70}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-700 space-y-1">
                          <div className="font-bold text-amber-400">{data.fullDate}</div>
                          <div className="text-sm font-extrabold font-mono">{data.formatted}</div>
                          <div className="text-[10px] text-slate-300">Daily Projection (+{estimate.estimatedDailyChange}/day)</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="population"
                  stroke="#d97706"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#popGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-500 text-center italic">
            Visualizes consistent daily statistical accumulation from official baseline at {estimate.annualGrowthRate}% annual growth rate.
          </p>
        </div>
      )}

      {/* 2011-2036 Long Term Projections */}
      {activeTab === 'projection' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Official Census Baseline vs. RGI Technical Group Long-Term Projections</span>
            <span className="font-semibold text-slate-700">Unit: Crores</span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectionSeries} margin={{ top: 10, right: 15, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis
                  domain={[65000000, 85000000]}
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${(v / 10000000).toFixed(1)} Cr`}
                  width={60}
                />
                <Tooltip
                  formatter={(val: any) => [
                    `${Number(val).toLocaleString('en-IN')} (~${(Number(val) / 10000000).toFixed(2)} Cr)`,
                    'Population',
                  ]}
                />
                <Bar dataKey="population" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-500 text-center italic">
            Data sourced from Census 2011 and the National Commission on Population (Ministry of Health & Family Welfare).
          </p>
        </div>
      )}

      {/* Gender Comparison */}
      {activeTab === 'gender' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Male vs. Female Demographic Comparison</span>
            <span className="font-semibold text-emerald-700">Sex Ratio: ~{estimate.estimatedSexRatio}</span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={genderData} margin={{ top: 10, right: 15, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${(v / 10000000).toFixed(1)} Cr`}
                  width={60}
                />
                <Tooltip formatter={(val: any) => [`${Number(val).toLocaleString('en-IN')}`, '']} />
                <Legend />
                <Bar dataKey="Male" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Female" fill="#e11d48" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
