import React from 'react';
import { HistoryDashboardMetrics } from '../types';
import {
  Users,
  TrendingUp,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Activity,
  CheckCircle2,
} from 'lucide-react';

interface HistoryDashboardCardsProps {
  metrics: HistoryDashboardMetrics;
  onSelectYear: (year: number) => void;
}

export const HistoryDashboardCards: React.FC<HistoryDashboardCardsProps> = ({
  metrics,
  onSelectYear,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
      {/* 1. Population in 2010 */}
      <div
        onClick={() => onSelectYear(2010)}
        className="cursor-pointer bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:border-amber-400 hover:shadow-md transition-all group"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Population in 2010
          </span>
          <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-amber-100 text-slate-600 group-hover:text-amber-700 flex items-center justify-center transition-colors">
            <Calendar className="w-4 h-4" />
          </div>
        </div>
        <div className="font-mono text-xl sm:text-2xl font-black text-slate-900">
          {metrics.pop2010.toLocaleString('en-IN')}
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500">{(metrics.pop2010 / 10000000).toFixed(2)} Crores</span>
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
            Pre-Census Est.
          </span>
        </div>
      </div>

      {/* 2. Population in 2020 */}
      <div
        onClick={() => onSelectYear(2020)}
        className="cursor-pointer bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all group"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Population in 2020
          </span>
          <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-700 flex items-center justify-center transition-colors">
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="font-mono text-xl sm:text-2xl font-black text-slate-900">
          {metrics.pop2020.toLocaleString('en-IN')}
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500">{(metrics.pop2020 / 10000000).toFixed(2)} Crores</span>
          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
            RGI Projection
          </span>
        </div>
      </div>

      {/* 3. Population in 2025 */}
      <div
        onClick={() => onSelectYear(2025)}
        className="cursor-pointer bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:border-purple-400 hover:shadow-md transition-all group"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Population in 2025
          </span>
          <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-purple-100 text-slate-600 group-hover:text-purple-700 flex items-center justify-center transition-colors">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="font-mono text-xl sm:text-2xl font-black text-slate-900">
          {metrics.pop2025.toLocaleString('en-IN')}
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500">{(metrics.pop2025 / 10000000).toFixed(2)} Crores</span>
          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
            RGI Benchmark
          </span>
        </div>
      </div>

      {/* 4. Population in 2026 */}
      <div
        onClick={() => onSelectYear(2026)}
        className="cursor-pointer bg-amber-500/10 rounded-2xl border-2 border-amber-500/40 p-4 sm:p-5 shadow-xs hover:border-amber-500 hover:shadow-md transition-all group relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Population in 2026
          </span>
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="font-mono text-xl sm:text-2xl font-black text-slate-950">
          {metrics.pop2026.toLocaleString('en-IN')}
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-amber-200 text-xs font-medium">
          <span className="text-amber-900 font-bold">{(metrics.pop2026 / 10000000).toFixed(2)} Crores</span>
          <span className="text-[10px] font-extrabold text-amber-950 bg-amber-400 px-1.5 py-0.5 rounded">
            Estimated 2026
          </span>
        </div>
      </div>

      {/* 5. Total Population Growth from 2010 to 2026 */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Total Growth (2010–2026)
          </span>
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        <div className="font-mono text-xl sm:text-2xl font-black text-emerald-700">
          +{metrics.totalGrowthAbsolute.toLocaleString('en-IN')}
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500">16-Year Net Addition</span>
          <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[11px]">
            +{metrics.totalGrowthPercent}%
          </span>
        </div>
      </div>

      {/* 6. Average Annual Growth */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Average Annual Growth
          </span>
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="font-mono text-xl sm:text-2xl font-black text-blue-700">
          {metrics.averageAnnualGrowth}% <span className="text-sm font-sans font-medium text-slate-500">/ yr</span>
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500">Compound (CAGR)</span>
          <span className="text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 font-medium">
            TFR ~1.4 Transition
          </span>
        </div>
      </div>
    </div>
  );
};
