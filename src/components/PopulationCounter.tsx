import React, { useState, useEffect } from 'react';
import { PopulationEstimate } from '../types';
import { Play, Pause, RefreshCw, AlertCircle, Info } from 'lucide-react';

interface PopulationCounterProps {
  estimate: PopulationEstimate;
  onRefresh?: () => void;
  onOpenMethodology?: () => void;
  onOpenDataSource?: () => void;
}

export const PopulationCounter: React.FC<PopulationCounterProps> = ({
  estimate,
  onRefresh,
  onOpenMethodology,
  onOpenDataSource,
}) => {
  const [isLiveActive, setIsLiveActive] = useState(true);
  const [livePopulation, setLivePopulation] = useState<number>(estimate.currentEstimatedPopulation);
  const [fractionalSeconds, setFractionalSeconds] = useState<number>(0);
  const [secondsUntilNextPerson, setSecondsUntilNextPerson] = useState<number>(0);

  // Interval for live ticking per second
  const secondsPerPerson =
    estimate.estimatedDailyChange > 0 ? Math.round(86400 / estimate.estimatedDailyChange) : 75;

  useEffect(() => {
    setLivePopulation(estimate.currentEstimatedPopulation);
  }, [estimate.currentEstimatedPopulation]);

  useEffect(() => {
    if (!isLiveActive) return;

    const interval = setInterval(() => {
      setFractionalSeconds((prev) => {
        const next = prev + 1;
        // Check if a person is added based on per-second rate
        const accumulatedChange = next * estimate.estimatedPerSecondChange;
        if (accumulatedChange >= 1) {
          setLivePopulation((p) => p + Math.floor(accumulatedChange));
          return next - Math.floor(accumulatedChange) / estimate.estimatedPerSecondChange;
        }
        return next;
      });

      // Countdown to next person
      setSecondsUntilNextPerson((prev) => (prev <= 1 ? secondsPerPerson : prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isLiveActive, estimate.estimatedPerSecondChange, secondsPerPerson]);

  // Format with Indian numbering system (Crores, Lakhs)
  const formatIndianNumber = (num: number): string => {
    return num.toLocaleString('en-IN');
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-xl relative overflow-hidden">
      {/* Decorative ambient backdrop */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-5">
        {/* Top Status & Controls Header */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/40 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Automatic Daily Population Update System
          </span>

          <span className="inline-flex items-center gap-1 text-slate-400 text-xs bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
            Official baseline: <strong className="text-slate-200">{estimate.baselineYear}</strong>
          </span>

          <button
            onClick={() => setIsLiveActive(!isLiveActive)}
            className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border transition-all ${
              isLiveActive
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
            }`}
            title="Toggle second-by-second live calculation projection"
          >
            {isLiveActive ? <Pause className="w-3 h-3 text-emerald-400" /> : <Play className="w-3 h-3 text-slate-300" />}
            <span>{isLiveActive ? 'Live Ticker Active' : 'Ticker Paused'}</span>
          </button>
        </div>

        {/* Main Title */}
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-medium text-slate-300 uppercase tracking-wider">
            Tamil Nadu Estimated Population
          </h2>
          <p className="text-xs text-amber-300/80">
            தமிழ்நாடு மதிப்பிடப்பட்ட தற்போதைய மக்கள் தொகை
          </p>
        </div>

        {/* Large Prominent Population Number */}
        <div className="py-2">
          <div
            id="tamil-nadu-estimated-population"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 tabular-nums drop-shadow-sm select-all"
          >
            {formatIndianNumber(livePopulation)}
          </div>
          <div className="mt-1 text-xs font-medium text-slate-400 tracking-wide">
            (~{(livePopulation / 10000000).toFixed(2)} Crore Citizens)
          </div>
        </div>

        {/* Primary Required Metadata Badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-300 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Updated:</span>
            <span className="font-semibold text-white">{estimate.updatedDateString}</span>
          </div>

          <span className="text-slate-600 hidden sm:inline">•</span>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Official baseline:</span>
            <span className="font-semibold text-amber-300">
              {estimate.baselineYear} ({formatIndianNumber(estimate.baselinePopulation)})
            </span>
          </div>

          <span className="text-slate-600 hidden sm:inline">•</span>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Daily Change:</span>
            <span className="font-semibold text-emerald-400">
              +{formatIndianNumber(estimate.estimatedDailyChange)} / day
            </span>
          </div>
        </div>

        {/* Mandatory Specific Label */}
        <div className="inline-block bg-slate-800/90 text-amber-300/90 border border-amber-500/20 px-3.5 py-1.5 rounded-xl text-xs font-medium">
          “Estimated value — not an official daily population count.”
        </div>

        {/* Mathematical Projection Live Note */}
        <div className="max-w-2xl text-[11px] text-slate-400 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5 text-left">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-200">Demographic Projection Notice:</span>{' '}
            This number is a mathematical projection based on the official Census baseline (March 2011) and the Registrar General of India's annual growth rate ({estimate.annualGrowthRate}%/yr). Over {estimate.daysElapsed.toLocaleString('en-IN')} days have elapsed since the baseline date, yielding an estimated net addition of ~1 person every ~{secondsPerPerson} seconds.
          </div>
        </div>

        {/* Action Buttons: Methodology, Data Source, Recalculate */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          {onOpenMethodology && (
            <button
              onClick={onOpenMethodology}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Info className="w-3.5 h-3.5 text-amber-400" />
              Methodology
            </button>
          )}

          {onOpenDataSource && (
            <button
              onClick={onOpenDataSource}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <AlertCircle className="w-3.5 h-3.5 text-blue-400" />
              Data Source
            </button>
          )}

          {onRefresh && (
            <button
              onClick={onRefresh}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md"
              title="Recalculate with current time"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Recalculate Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
