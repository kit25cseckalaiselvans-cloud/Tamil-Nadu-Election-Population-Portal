import React from 'react';
import { PopulationEstimate } from '../types';
import {
  Users,
  TrendingUp,
  Clock,
  Calendar,
  ShieldCheck,
  Info,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

interface PopulationCardProps {
  estimate: PopulationEstimate;
  onOpenMethodology: () => void;
  onOpenDataSource: () => void;
  onOpenAdmin?: () => void;
}

export const PopulationCard: React.FC<PopulationCardProps> = ({
  estimate,
  onOpenMethodology,
  onOpenDataSource,
  onOpenAdmin,
}) => {
  const formatNumber = (num: number) => num.toLocaleString('en-IN');

  return (
    <div className="space-y-6">
      {/* Top Bar with Timestamps & Direct Action Buttons */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Validated Demographic System
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-600">
                Daily Automatic Calculation
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Statewide Population & Growth Metrics
            </h3>
          </div>

          {/* Action Buttons: Data Source & Methodology */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenMethodology}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors inline-flex items-center gap-1.5 border border-slate-300"
              id="btn-methodology-header"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              Methodology
            </button>

            <button
              onClick={onOpenDataSource}
              className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold transition-colors inline-flex items-center gap-1.5 border border-blue-200"
              id="btn-datasource-header"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-700" />
              Data Source
            </button>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                title="Open Admin Data Update Panel"
                id="btn-admin-config"
              >
                <span>⚙ Admin Panel</span>
              </button>
            )}
          </div>
        </div>

        {/* Clear Timestamps Differentiation (Requirement #11) */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Last calculated
              </div>
              <div className="font-semibold text-slate-900">{estimate.lastCalculatedTime}</div>
              <div className="text-[10px] text-slate-500">Recalculated on user access (local time)</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
            <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Data source updated
              </div>
              <div className="font-semibold text-slate-900">
                Baseline {estimate.baselineYear} (Date: {estimate.baselineDate})
              </div>
              <div className="text-[10px] text-slate-500">{estimate.sourceName.slice(0, 36)}...</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 sm:col-span-2 lg:col-span-1">
            <TrendingUp className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Daily Change Rate
              </div>
              <div className="font-semibold text-slate-900">
                +{formatNumber(estimate.estimatedDailyChange)} people / day
              </div>
              <div className="text-[10px] text-slate-500">
                Annual rate: {estimate.annualGrowthRate}% | Days elapsed: {formatNumber(estimate.daysElapsed)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Key Indicator Cards (Requirement #8) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. Official Population */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Official Headcount
              </span>
              <span>Baseline: {estimate.baselineYear}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight">
              {formatNumber(estimate.baselinePopulation)}
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Official baseline count enumerated by Census of India
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Verified Census Enumeration</span>
            <span className="font-bold text-slate-700">~7.21 Crore</span>
          </div>
        </div>

        {/* 2. Estimated Current Population */}
        <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl border-2 border-amber-300 p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-extrabold text-[10px] px-3 py-0.5 rounded-bl-lg uppercase tracking-wider">
            Live Daily Estimate
          </div>
          <div>
            <div className="flex items-center justify-between text-xs text-amber-800 mb-2">
              <span className="font-bold uppercase tracking-wider text-[10px] text-amber-900">
                Estimated Current Population
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-950 tracking-tight">
              {formatNumber(estimate.currentEstimatedPopulation)}
            </div>
            <p className="text-xs text-amber-900/90 font-medium mt-1">
              Updated: {estimate.updatedDateString}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-amber-900">
            <span className="font-semibold">Projected Growth</span>
            <span className="font-bold text-emerald-700">
              +{formatNumber(estimate.currentEstimatedPopulation - estimate.baselinePopulation)}
            </span>
          </div>
        </div>

        {/* 3. Male Population (Estimated) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Male Population (Est.)
              </span>
              <span>50.10%</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight">
              {formatNumber(estimate.estimatedMalePopulation)}
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Calculated using standard demographic gender distribution
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Census 2011 Base: 36,137,975</span>
            <span className="font-bold text-indigo-700">50.1%</span>
          </div>
        </div>

        {/* 4. Female Population (Estimated) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider text-[10px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Female Population (Est.)
              </span>
              <span>49.90%</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight">
              {formatNumber(estimate.estimatedFemalePopulation)}
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Calculated using state vital ratio & census proportions
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Census 2011 Base: 36,009,055</span>
            <span className="font-bold text-rose-700">49.9%</span>
          </div>
        </div>

        {/* 5. Sex Ratio */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                State Sex Ratio
              </span>
              <span className="font-semibold text-emerald-700">Higher than India (943)</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight flex items-baseline gap-2">
              <span>{estimate.estimatedSexRatio}</span>
              <span className="text-xs font-normal text-slate-500 font-sans">
                Females per 1,000 Males
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Tamil Nadu ranks among the top major states in gender parity
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>National Average: 943</span>
            <span className="font-bold text-emerald-600">+53 vs National</span>
          </div>
        </div>

        {/* 6. Annual Growth Rate & Last Data Update */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                Annual Growth Assumption
              </span>
              <span className="font-semibold text-purple-700">RGI Projection</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight">
              {estimate.annualGrowthRate}% <span className="text-xs font-sans text-slate-500 font-normal">/ year</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Reflects demographic transition & low Total Fertility Rate (TFR 1.4)
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Official baseline: {estimate.baselineYear}</span>
            <span className="font-bold text-purple-700">+{formatNumber(estimate.estimatedDailyChange)} / day</span>
          </div>
        </div>
      </div>

      {/* Mandatory Statutory Disclaimer Notice (Requirement #13) */}
      <div className="bg-amber-50/90 border border-amber-200 p-4 rounded-2xl text-amber-900 text-xs leading-relaxed flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-amber-950 block mb-0.5">
            Mandatory Demographic Projection Disclaimer:
          </strong>
          “Population figures shown as ‘Estimated Population’ are calculated projections based on an official population baseline and demographic assumptions. They are not an official daily census count. For official population statistics, refer to the cited government sources.”
        </div>
      </div>
    </div>
  );
};
