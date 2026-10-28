import React from 'react';
import { YearlyPopulationRecord } from '../types';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Users,
  TrendingUp,
  FileText,
  AlertTriangle,
  Award,
} from 'lucide-react';

interface YearDetailModalProps {
  record: YearlyPopulationRecord | null;
  onClose: () => void;
}

export const YearDetailModal: React.FC<YearDetailModalProps> = ({ record, onClose }) => {
  if (!record) return null;

  const isOfficial = record.status === 'Official';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl ${
                isOfficial ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
              }`}
            >
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-mono">Tamil Nadu Population – {record.year}</h3>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    isOfficial
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-amber-400 text-slate-950'
                  }`}
                >
                  {record.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isOfficial
                  ? 'Official Statutory Decennial Census Record'
                  : 'Estimated Value — Not an official census count'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Key Metric Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Total Headcount
              </span>
              <span className="text-lg font-bold text-slate-900 font-mono block mt-0.5">
                {record.totalPopulation.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-slate-500">
                {(record.totalPopulation / 10000000).toFixed(3)} Crores
              </span>
            </div>

            <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-200">
              <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">
                Male Population
              </span>
              <span className="text-base font-bold text-blue-950 font-mono block mt-0.5">
                {record.malePopulation.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-blue-700 font-semibold">{record.malePercentage}% share</span>
            </div>

            <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-200">
              <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider block">
                Female Population
              </span>
              <span className="text-base font-bold text-rose-950 font-mono block mt-0.5">
                {record.femalePopulation.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-rose-700 font-semibold">{record.femalePercentage}% share</span>
            </div>
          </div>

          {/* Growth & Change */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-xs text-slate-600 font-medium">Year-on-Year Growth ({record.year - 1} → {record.year}):</span>
                <span className="text-sm font-bold text-slate-900 font-mono ml-2">
                  {record.growthRatePercent >= 0 ? '+' : ''}{record.growthRatePercent}%
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
              {record.growthAbsolute >= 0 ? '+' : ''}{record.growthAbsolute.toLocaleString('en-IN')} persons
            </span>
          </div>

          {/* Source Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Authoritative Data Source
            </h4>
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/80 text-xs space-y-2">
              <div className="font-bold text-slate-900 text-sm">{record.source}</div>
              {record.notes && <div className="text-slate-600 leading-relaxed">{record.notes}</div>}
              {record.sourceURL && (
                <div className="pt-1">
                  <a
                    href={record.sourceURL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold underline"
                  >
                    <span>Verify at Official Government Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Methodology */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              Demographic Methodology
            </h4>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
              {record.methodology}
            </div>
          </div>

          {/* Statutory Disclaimer */}
          <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              This is a college project presentation. Data for {record.year} is {isOfficial ? 'taken directly from the Census of India 2011 Primary Census Abstract' : 'derived using standard cohort component projections published by the Registrar General of India'}. It does not represent an unannounced administrative census count.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
