import React, { useState } from 'react';
import { PopulationEstimate } from '../types';
import { checkOfficialDataSourceUpdates, CheckUpdateResult } from '../services/dataSourceService';
import { ShieldCheck, ExternalLink, RefreshCw, AlertCircle, Database, CheckCircle2, X } from 'lucide-react';

interface DataSourceProps {
  estimate: PopulationEstimate;
  onClose?: () => void;
  onOpenAdmin?: () => void;
}

export const DataSource: React.FC<DataSourceProps> = ({ estimate, onClose, onOpenAdmin }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<CheckUpdateResult | null>(null);

  const handleCheckUpdates = async () => {
    setIsChecking(true);
    try {
      const res = await checkOfficialDataSourceUpdates();
      setCheckResult(res);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-7 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-semibold mb-2 border border-blue-200">
            <Database className="w-3.5 h-3.5 text-blue-700" />
            Official Government Data Source & Repository Audit
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Official Data Source & Verification
          </h2>
          <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
            Full provenance, authoritative baseline credentials, and government repository status.
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

      {/* Mandatory Official Year Status (Requirement #10) */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-5 rounded-2xl border border-blue-800 shadow-md space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-300">
            Official Cadence & Transparency Status
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/40">
            Truthful Disclosure
          </span>
        </div>
        <div className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Latest official data: <span className="text-amber-400">{estimate.baselineYear}</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          The application calculates daily population projections from this authoritative baseline. The Indian Government does not publish daily census numbers via API; rather, complete headcounts are decennial, supplemented by annual Sample Registration System (SRS) bulletins.
        </p>
      </div>

      {/* Active Baseline Credentials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
          <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
            Primary Authoritative Source
          </div>
          <div className="font-extrabold text-sm text-slate-900">{estimate.sourceName}</div>
          <div className="text-slate-600 pt-1">
            Office of the Registrar General & Census Commissioner of India (ORGI), Ministry of Home Affairs, New Delhi.
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
          <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
            Official Verification Link
          </div>
          <div className="font-extrabold text-sm text-blue-700 flex items-center gap-1.5">
            <a
              href={estimate.sourceURL}
              target="_blank"
              rel="noreferrer"
              className="hover:underline inline-flex items-center gap-1"
            >
              {estimate.sourceURL}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="text-slate-600 pt-1">
            Official government portal hosting census gazettes, tables, and SRS reports.
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
          <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
            Official Headcount Baseline
          </div>
          <div className="font-extrabold text-sm font-mono text-slate-900">
            {estimate.baselinePopulation.toLocaleString('en-IN')} citizens
          </div>
          <div className="text-slate-600 pt-1">
            Enumerated population as of baseline date: {estimate.baselineDate}.
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
          <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
            Demographic Projection Factor
          </div>
          <div className="font-extrabold text-sm font-mono text-slate-900">
            {estimate.annualGrowthRate}% per annum
          </div>
          <div className="text-slate-600 pt-1">
            Equates to +{estimate.estimatedDailyChange.toLocaleString('en-IN')} individuals / day.
          </div>
        </div>
      </div>

      {/* Automatic Data Source Check Action (Requirement #10) */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Automated Official Repository Check</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Query the official data registry to check if a newer decennial census or updated projection baseline has been gazetted.
            </p>
          </div>

          <button
            onClick={handleCheckUpdates}
            disabled={isChecking}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-xs font-bold transition-colors inline-flex items-center gap-2 shadow-sm shrink-0"
            id="btn-check-official-updates"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
            <span>{isChecking ? 'Checking Repository...' : 'Check for Official Updates'}</span>
          </button>
        </div>

        {/* Check Result Card */}
        {checkResult && (
          <div className="mt-3 p-4 rounded-xl bg-white border border-slate-300 text-xs space-y-2 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Repository Audit Completed ({checkResult.checkedAt})
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                Status: Current
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed">{checkResult.statusMessage}</p>
            <div className="pt-2 border-t border-slate-100 text-slate-500 flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <span>Authority: {checkResult.sourceAuthority}</span>
              <span className="font-medium text-blue-700">{checkResult.recommendation}</span>
            </div>
          </div>
        )}
      </div>

      {/* Admin Panel Link */}
      {onOpenAdmin && (
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">Authorized Data Administrator?</span>
          <button
            onClick={onOpenAdmin}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 underline flex items-center gap-1"
          >
            Configure Official Baseline via Admin Panel →
          </button>
        </div>
      )}
    </div>
  );
};
