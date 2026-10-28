import React from 'react';
import { PopulationEstimate } from '../types';
import { BookOpen, Calculator, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, X } from 'lucide-react';

interface MethodologyProps {
  estimate: PopulationEstimate;
  onClose?: () => void;
}

export const Methodology: React.FC<MethodologyProps> = ({ estimate, onClose }) => {
  const formatNumber = (num: number) => num.toLocaleString('en-IN');

  const annualChange = Math.round(estimate.baselinePopulation * (estimate.annualGrowthRate / 100));

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-semibold mb-2 border border-amber-200">
            <Calculator className="w-3.5 h-3.5 text-amber-700" />
            Demographic Calculation Specification
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How is the Daily Population Estimate Calculated?
          </h2>
          <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
            A transparent, step-by-step breakdown of the demographic projection methodology used on this portal.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Prominent Mandatory Statement */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-2xl text-red-950 text-sm leading-relaxed">
        <div className="font-bold flex items-center gap-2 text-red-900 mb-1">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          Mandatory Transparency Notice
        </div>
        <p className="font-medium">
          “This is a statistical estimate and should not be interpreted as an official daily population count.”
        </p>
        <p className="text-xs text-red-800/90 mt-1">
          Neither the Government of India nor the Government of Tamil Nadu conducts a daily population enumeration. Official censuses occur decennially, supplemented by sample surveys and expert demographic projections.
        </p>
      </div>

      {/* 6 Step Simple Language Walkthrough (Requirement #9) */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">
            6
          </span>
          Six-Step Mathematical Methodology
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Step 1 */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
              <span>Step 1</span>
              <span className="text-slate-300">•</span>
              <span>Official Baseline</span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Start with the Latest Official Baseline</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We anchor the calculation on the official headcount from the Census of India 2011 ({formatNumber(estimate.baselinePopulation)} citizens as of {estimate.baselineDate}) or official RGI projection reports.
            </p>
            <div className="text-[11px] font-mono bg-white p-2 rounded-lg border border-slate-200 text-slate-800">
              P₀ = {formatNumber(estimate.baselinePopulation)}
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
              <span>Step 2</span>
              <span className="text-slate-300">•</span>
              <span>Authoritative Growth Rate</span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Determine Applicable Annual Growth Assumption</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We apply an authoritative annual growth rate ({estimate.annualGrowthRate}%/year) derived from the Registrar General of India's Technical Group on Population Projections for Tamil Nadu.
            </p>
            <div className="text-[11px] font-mono bg-white p-2 rounded-lg border border-slate-200 text-slate-800">
              r = {estimate.annualGrowthRate}% = {(estimate.annualGrowthRate / 100).toFixed(4)}
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
              <span>Step 3</span>
              <span className="text-slate-300">•</span>
              <span>Daily Rate Conversion</span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Convert Annual Change into Approximate Daily Change</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The annual population addition is divided by 365.25 days (accounting for leap years) to compute the average daily net growth.
            </p>
            <div className="text-[11px] font-mono bg-white p-2 rounded-lg border border-slate-200 text-slate-800">
              ΔDaily = (P₀ × r) / 365.25 = +{formatNumber(estimate.estimatedDailyChange)} / day
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
              <span>Step 4</span>
              <span className="text-slate-300">•</span>
              <span>Elapsed Calendar Days</span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Calculate Number of Days Since Baseline Date</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The system calculates the exact number of days that have elapsed between the official baseline date ({estimate.baselineDate}) and the current date.
            </p>
            <div className="text-[11px] font-mono bg-white p-2 rounded-lg border border-slate-200 text-slate-800">
              Days Elapsed = {formatNumber(estimate.daysElapsed)} days
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
              <span>Step 5</span>
              <span className="text-slate-300">•</span>
              <span>Linear Daily Projection</span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Estimate the Current Population</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The estimated current population is the baseline population plus the cumulative daily increments across all elapsed days.
            </p>
            <div className="text-[11px] font-mono bg-white p-2 rounded-lg border border-slate-200 text-emerald-800 font-bold">
              P(t) = P₀ + (ΔDaily × Days) = {formatNumber(estimate.currentEstimatedPopulation)}
            </div>
          </div>

          {/* Step 6 */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
              <span>Step 6</span>
              <span className="text-slate-300">•</span>
              <span>Client-Side Recalculation</span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Recalculate Value When Website is Opened</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Whenever a user visits or refreshes the website, the application executes this formula in real time, guaranteeing that today's date ({estimate.updatedDateString}) is applied automatically.
            </p>
            <div className="text-[11px] font-mono bg-white p-2 rounded-lg border border-slate-200 text-blue-800 font-bold">
              Automatic Client Execution: Verified on {estimate.lastCalculatedTime}
            </div>
          </div>
        </div>
      </div>

      {/* Live Formula Preview Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
          <Calculator className="w-4 h-4" />
          Active Mathematical Proof for Today
        </h4>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
          <div>
            <span className="text-slate-500">1. Annual Growth =</span> {formatNumber(estimate.baselinePopulation)} × {estimate.annualGrowthRate}% = <span className="text-amber-300 font-bold">+{formatNumber(annualChange)}</span> / yr
          </div>
          <div>
            <span className="text-slate-500">2. Daily Rate =</span> {formatNumber(annualChange)} / 365.25 = <span className="text-emerald-400 font-bold">+{formatNumber(estimate.estimatedDailyChange)}</span> / day
          </div>
          <div>
            <span className="text-slate-500">3. Cumulative Days =</span> {formatNumber(estimate.daysElapsed)} days since {estimate.baselineDate}
          </div>
          <div>
            <span className="text-slate-500">4. Total Addition =</span> {formatNumber(estimate.estimatedDailyChange)} × {formatNumber(estimate.daysElapsed)} = <span className="text-amber-400 font-bold">+{formatNumber(estimate.currentEstimatedPopulation - estimate.baselinePopulation)}</span>
          </div>
          <div className="pt-2 border-t border-slate-800 text-base font-extrabold text-amber-400">
            Estimated Population = {formatNumber(estimate.baselinePopulation)} + {formatNumber(estimate.currentEstimatedPopulation - estimate.baselinePopulation)} = {formatNumber(estimate.currentEstimatedPopulation)}
          </div>
        </div>
      </div>

      {/* Demographic Context on Tamil Nadu's Transition */}
      <div className="bg-blue-50/80 p-5 rounded-2xl border border-blue-200 text-xs text-blue-950 space-y-2">
        <div className="font-bold text-sm text-blue-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          Demographic Context: Why 0.58% Annual Growth?
        </div>
        <p className="leading-relaxed">
          Tamil Nadu underwent its demographic transition earlier than most other Indian states. Its Total Fertility Rate (TFR) stands at approximately <strong>1.4 children per woman</strong> (Sample Registration System), well below the national replacement level of 2.1. Consequently, while the historical 2001–2011 decadal growth rate was 15.6% (~1.46%/year), the current RGI Technical Group projections adopt a calibrated annual rate of ~0.55%–0.65% to reflect this mature demographic stabilization.
        </p>
      </div>
    </div>
  );
};
