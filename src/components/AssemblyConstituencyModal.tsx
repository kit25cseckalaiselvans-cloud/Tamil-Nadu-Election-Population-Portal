import React from 'react';
import { AssemblyConstituency } from '../types';
import { X, ExternalLink, MapPin, Landmark, Award, Shield, User, Info, Building2 } from 'lucide-react';

interface AssemblyConstituencyModalProps {
  constituency: AssemblyConstituency | null;
  onClose: () => void;
}

export const AssemblyConstituencyModal: React.FC<AssemblyConstituencyModalProps> = ({
  constituency,
  onClose,
}) => {
  if (!constituency) return null;

  const getTypeBadge = (type: 'General' | 'SC' | 'ST') => {
    switch (type) {
      case 'SC':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <Shield className="w-3.5 h-3.5" />
            Reserved for Scheduled Castes (SC)
          </span>
        );
      case 'ST':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
            <Shield className="w-3.5 h-3.5" />
            Reserved for Scheduled Tribes (ST)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Award className="w-3.5 h-3.5" />
            General Category
          </span>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="constituency-modal-title"
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-5 text-white flex items-start justify-between border-b border-amber-500/30">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-xs font-extrabold tracking-wide">
                AC #{constituency.number}
              </span>
              <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                {constituency.district} District
              </span>
            </div>
            <h2 id="constituency-modal-title" className="text-2xl font-bold text-white tracking-tight">
              {constituency.name}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Tamil Nadu Legislative Assembly Constituency
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Reservation Status Banner */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-semibold text-slate-600">Seat Classification</span>
            <div>{getTypeBadge(constituency.type)}</div>
          </div>

          {/* Core Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* MLA Card */}
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                <User className="w-4 h-4 text-amber-600" />
                Elected Member (MLA)
              </div>
              <div className="text-base font-bold text-slate-900">
                {constituency.mla || 'Data unavailable – check official CEO source'}
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-xs text-slate-500 font-medium">Party:</span>
                <span className="inline-block px-2 py-0.5 rounded text-xs font-extrabold bg-slate-800 text-white">
                  {constituency.party || 'Check official record'}
                </span>
              </div>
            </div>

            {/* Parliamentary Constituency */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                <Landmark className="w-4 h-4 text-slate-600" />
                Lok Sabha / Parliamentary Segment
              </div>
              <div className="text-base font-bold text-slate-900">
                {constituency.parliamentaryConstituency || 'Tamil Nadu Lok Sabha Constituency'}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Parliamentary delimitation segment as per ECI 2008 Order
              </p>
            </div>
          </div>

          {/* Legislative Details */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs text-slate-700">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-medium">Assembly Term:</span>
              <span className="font-bold text-slate-900">16th Tamil Nadu Legislative Assembly (2021–2026)</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-medium">Delimitation Notification:</span>
              <span className="font-semibold text-slate-800">Delimitation Order, 2008 (Schedule XXVI)</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-medium">Administrative District:</span>
              <span className="font-bold text-slate-900">{constituency.district}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Official Data Source:</span>
              <span className="font-semibold text-slate-800">{constituency.source}</span>
            </div>
          </div>

          {/* Official Verification Notice */}
          <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">Authoritative Verification</p>
              <p className="text-blue-800 leading-relaxed">
                Constituency delimitations are governed by the Election Commission of India. MLA incumbencies
                and bye-election gazettes are published by Chief Electoral Officer Tamil Nadu and the Tamil Nadu
                Legislative Assembly Secretariat.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <a
            href="https://elections.tn.gov.in"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors shadow-sm"
          >
            <Building2 className="w-4 h-4" />
            View Official Source (CEO Tamil Nadu)
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
