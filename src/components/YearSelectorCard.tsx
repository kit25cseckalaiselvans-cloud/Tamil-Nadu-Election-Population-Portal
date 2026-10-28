import React from 'react';
import { YearlyPopulationRecord } from '../types';
import {
  Calendar,
  Users,
  TrendingUp,
  Award,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';

interface YearSelectorCardProps {
  records: YearlyPopulationRecord[];
  selectedYear: number;
  onSelectYear: (year: number) => void;
  onViewSource: (record: YearlyPopulationRecord) => void;
}

export const YearSelectorCard: React.FC<YearSelectorCardProps> = ({
  records,
  selectedYear,
  onSelectYear,
  onViewSource,
}) => {
  const currentRecord =
    records.find((r) => r.year === selectedYear) || records[records.length - 1];
  const isOfficial = currentRecord.status === 'Official';

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-800 space-y-4">
      {/* Top row: Dropdown and status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Year-by-Year Demographic Inspector
            </span>
            <h3 className="text-lg font-bold text-white">
              Tamil Nadu Demographic Record for {currentRecord.year}
            </h3>
          </div>
        </div>

        {/* Year Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="year-select" className="text-xs text-slate-300 font-medium">
            Select Year:
          </label>
          <div className="relative">
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => onSelectYear(Number(e.target.value))}
              className="appearance-none bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-sm pl-3.5 pr-8 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              {records.map((r) => (
                <option key={r.year} value={r.year} className="bg-slate-900 text-white">
                  {r.year} {r.status === 'Official' ? '• Official Census' : '• Estimated'}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Stats Grid for Selected Year */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-1">
        {/* Total Population */}
        <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
          <span className="text-slate-400 text-xs block mb-1">Total Population</span>
          <span className="font-mono text-xl sm:text-2xl font-black text-white block">
            {currentRecord.totalPopulation.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-amber-400 font-medium mt-0.5 block">
            {(currentRecord.totalPopulation / 10000000).toFixed(3)} Crores
          </span>
        </div>

        {/* Male Population */}
        <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
          <span className="text-blue-300 text-xs block mb-1">Male Population</span>
          <span className="font-mono text-lg sm:text-xl font-bold text-white block">
            {currentRecord.malePopulation.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-blue-300 font-semibold mt-0.5 block">
            {currentRecord.malePercentage}% Share
          </span>
        </div>

        {/* Female Population */}
        <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
          <span className="text-rose-300 text-xs block mb-1">Female Population</span>
          <span className="font-mono text-lg sm:text-xl font-bold text-white block">
            {currentRecord.femalePopulation.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-rose-300 font-semibold mt-0.5 block">
            {currentRecord.femalePercentage}% Share
          </span>
        </div>

        {/* Growth Rate */}
        <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
          <span className="text-slate-400 text-xs block mb-1">Annual Growth Rate</span>
          <span
            className={`font-mono text-lg sm:text-xl font-bold block ${
              currentRecord.growthRatePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {currentRecord.growthRatePercent >= 0 ? '+' : ''}
            {currentRecord.growthRatePercent}%
          </span>
          <span className="text-xs text-slate-400 mt-0.5 block">
            +{currentRecord.growthAbsolute.toLocaleString('en-IN')} persons
          </span>
        </div>
      </div>

      {/* Source Citation & Status Banner */}
      <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start sm:items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400">Data Source:</span>
              <span className="text-white font-bold">{currentRecord.source}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  isOfficial
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-amber-400 text-slate-950'
                }`}
              >
                {currentRecord.status === 'Official' ? 'Official Data' : 'Estimated Data'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {isOfficial
                ? 'Official Statutory Decennial Census Count (Primary Census Abstract)'
                : 'Calculated using transparent demographic cohort projection method'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onViewSource(currentRecord)}
          className="self-start sm:self-auto px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <span>View Source & Formula</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
