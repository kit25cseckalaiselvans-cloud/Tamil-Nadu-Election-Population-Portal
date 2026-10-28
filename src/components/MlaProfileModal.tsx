import React from 'react';
import { AssemblyMlaRecord2026 } from '../types';
import {
  X,
  ShieldCheck,
  Building2,
  MapPin,
  Vote,
  Calendar,
  ExternalLink,
  Award,
  CheckCircle2,
  FileText,
  AlertCircle,
} from 'lucide-react';

interface MlaProfileModalProps {
  mla: AssemblyMlaRecord2026 | null;
  onClose: () => void;
}

export const MlaProfileModal: React.FC<MlaProfileModalProps> = ({ mla, onClose }) => {
  if (!mla) return null;

  const getPartyColor = (party: string) => {
    if (party === 'TVK') return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    if (party === 'DMK') return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    if (party === 'ADMK' || party === 'AIADMK') return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    if (party === 'INC') return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
    if (party === 'PMK') return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
    if (party === 'BJP') return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
    if (party === 'VCK') return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
    if (party === 'CPI' || party === 'CPI(M)') return 'bg-red-500/20 text-red-300 border-red-500/40';
    if (party === 'IUML') return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
    if (party === 'DMDK') return 'bg-amber-600/20 text-amber-200 border-amber-600/40';
    return 'bg-slate-800 text-slate-200 border-slate-700';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 font-bold text-base">
              #{mla.constituency_number}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white leading-tight">{mla.constituency_name}</h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    mla.reservation_category === 'General'
                      ? 'bg-slate-800 text-slate-300'
                      : mla.reservation_category === 'SC'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}
                >
                  {mla.reservation_category}
                </span>
              </div>
              <p className="text-xs text-slate-400">Tamil Nadu Legislative Assembly Constituency</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* MLA Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  2026 Elected Representative / MLA
                </div>
                <h2 className="text-2xl font-extrabold text-white">{mla.mla_name}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getPartyColor(mla.party)}`}>
                    Party: {mla.party}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Status: {mla.status}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-center min-w-[110px]">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Election Year</div>
                  <div className="text-xl font-bold text-amber-400">{mla.election_year}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
                <MapPin className="w-4 h-4 text-blue-400" />
                Administrative District
              </div>
              <div className="text-base font-bold text-white">{mla.district} District</div>
              <p className="text-[11px] text-slate-400 mt-1">
                Organized under Tamil Nadu 38 administrative revenue districts.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
                <Vote className="w-4 h-4 text-purple-400" />
                Constituency Number & Category
              </div>
              <div className="text-base font-bold text-white">
                No. {mla.constituency_number} ({mla.reservation_category} Seat)
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Delimitation Order 2008 statutory classification.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
                <Award className="w-4 h-4 text-amber-400" />
                Parliamentary Constituency
              </div>
              <div className="text-base font-bold text-white">{mla.parliamentary_constituency || 'Tamil Nadu'}</div>
              <p className="text-[11px] text-slate-400 mt-1">
                Parent Lok Sabha Parliamentary Constituency mapping.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
                <Calendar className="w-4 h-4 text-emerald-400" />
                Verification Status & Date
              </div>
              <div className="text-base font-bold text-emerald-300">
                {mla.is_verified ? 'Officially Verified' : 'Pending Verification'}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Last verified: {mla.last_verified_date}</p>
            </div>
          </div>

          {/* Statutory Source Section */}
          <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Official Authoritative Election Source
            </div>
            <p className="text-xs text-slate-300">
              This winning candidate and constituency record is sourced directly from the official{' '}
              <strong className="text-white">Election Commission of India (ECI)</strong> Detailed Results Report.
            </p>
            <div className="pt-2">
              <a
                href={mla.source_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-900/60 px-3.5 py-2 rounded-lg border border-emerald-600/50 hover:bg-emerald-800/80 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>View Official ECI 2026 Detailed Results (PDF)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Anti-Hallucination & Public Data Notice */}
          <div className="flex items-start gap-2 text-[11px] text-slate-400 bg-slate-950 border border-slate-800 rounded-lg p-3">
            <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <span>
              <strong>Rule #8 Integrity Standard:</strong> No personal details, unverified contact numbers, or unofficial commentary are added. All data strictly reflects gazetted public election return filings.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-400">
            Tamil Nadu Legislative Assembly • Constituency #{mla.constituency_number}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white transition-colors"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
