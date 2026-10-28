import React from 'react';
import { YearlyPopulationRecord } from '../types';
import { CheckCircle2, TrendingUp, Calendar, ChevronRight } from 'lucide-react';

interface PopulationTimelineProps {
  records: YearlyPopulationRecord[];
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

export const PopulationTimeline: React.FC<PopulationTimelineProps> = ({
  records,
  selectedYear,
  onSelectYear,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span>2010–2026 Population Timeline</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any year to inspect demographic headcount, growth percentage, and official source metadata.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            Official Census
          </span>
          <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            Projected / Estimated
          </span>
        </div>
      </div>

      {/* Horizontal Scrollable Timeline Bar */}
      <div className="overflow-x-auto pb-3 pt-1">
        <div className="flex items-center gap-2 min-w-max">
          {records.map((r, index) => {
            const isSelected = selectedYear === r.year;
            const isOfficial = r.status === 'Official';

            return (
              <React.Fragment key={r.year}>
                <button
                  type="button"
                  onClick={() => onSelectYear(r.year)}
                  className={`group relative flex flex-col items-center px-3 py-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-500/50 scale-105 z-10'
                      : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  {/* Year Number */}
                  <span
                    className={`font-mono text-sm font-extrabold ${
                      isSelected
                        ? 'text-amber-400'
                        : isOfficial
                        ? 'text-emerald-700 font-black'
                        : 'text-slate-900'
                    }`}
                  >
                    {r.year}
                  </span>

                  {/* Population formatted short (e.g. 7.21 Cr) */}
                  <span
                    className={`text-[11px] font-medium mt-0.5 ${
                      isSelected ? 'text-slate-200' : 'text-slate-600'
                    }`}
                  >
                    {(r.totalPopulation / 10000000).toFixed(2)} Cr
                  </span>

                  {/* Status Indicator */}
                  <span
                    className={`mt-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      isSelected
                        ? isOfficial
                          ? 'bg-emerald-500 text-slate-950 font-black'
                          : 'bg-amber-400 text-slate-950'
                        : isOfficial
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isOfficial ? 'Census' : 'Est.'}
                  </span>

                  {/* Growth rate bubble */}
                  <span
                    className={`text-[10px] mt-1 font-mono font-semibold ${
                      isSelected
                        ? 'text-emerald-300'
                        : r.growthRatePercent >= 0
                        ? 'text-emerald-600'
                        : 'text-rose-600'
                    }`}
                  >
                    {r.growthRatePercent >= 0 ? '+' : ''}
                    {r.growthRatePercent}%
                  </span>
                </button>

                {/* Arrow connector between years */}
                {index < records.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
