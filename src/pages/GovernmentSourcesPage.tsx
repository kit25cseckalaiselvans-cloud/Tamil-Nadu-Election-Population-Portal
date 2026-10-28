import React, { useState } from 'react';
import { PageId } from '../types';
import { DATA_SOURCES_RECORDS } from '../data/localGovernmentData';
import {
  ExternalLink,
  ShieldCheck,
  Building2,
  FileCheck2,
  CheckCircle2,
  Scale,
  Layers,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface GovernmentSourcesPageProps {
  onNavigate: (page: PageId) => void;
}

export const GovernmentSourcesPage: React.FC<GovernmentSourcesPageProps> = ({ onNavigate }) => {
  const [selectedLevel, setSelectedLevel] = useState<number | 'All'>('All');

  const filteredSources =
    selectedLevel === 'All'
      ? DATA_SOURCES_RECORDS
      : DATA_SOURCES_RECORDS.filter((s) => s.priority_level === selectedLevel);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Statutory Verification Notice */}
        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-emerald-200">
                Official Government Data Sources & Verification Protocol
              </h2>
              <p className="text-xs text-slate-300">
                Rule #8 Standard: Every data point is directly attributed to an official statutory government publication.
              </p>
            </div>
          </div>
          <a
            href="https://www.tn.gov.in"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-600/40 transition-colors shrink-0"
          >
            tn.gov.in
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Header & Source Hierarchy Protocol */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-3 py-0.5 rounded-full text-xs font-bold border border-cyan-500/30 mb-2">
              <Scale className="w-3 h-3" />
              Source Priority Protocol (Section 14)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Official Data Sources & Attributions Matrix
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
              In accordance with statutory data integrity principles, this portal strictly adopts a four-tier data
              source hierarchy. In any scenario of discrepancy, higher priority levels legally supersede lower levels.
            </p>
          </div>

          {/* Level Explanations */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <button
              onClick={() => setSelectedLevel(1)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedLevel === 1
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                  : 'bg-slate-900 border-slate-800 hover:bg-slate-850 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-emerald-400">Level 1 Priority</span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                  Highest
                </span>
              </div>
              <strong className="text-sm text-white block">Constitutional Authorities</strong>
              <p className="text-[11px] text-slate-400 mt-1">
                ECI, TNSEC, and TNRDPR statutory gazetted databases.
              </p>
            </button>

            <button
              onClick={() => setSelectedLevel(2)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedLevel === 2
                  ? 'bg-blue-950/60 border-blue-500 text-blue-200'
                  : 'bg-slate-900 border-slate-800 hover:bg-slate-850 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-blue-400">Level 2 Priority</span>
                <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">
                  Gazettes
                </span>
              </div>
              <strong className="text-sm text-white block">Gazettes & Secretariat</strong>
              <p className="text-[11px] text-slate-400 mt-1">
                Tamil Nadu Govt Gazettes and TN Legislative Assembly Secretariat.
              </p>
            </button>

            <button
              onClick={() => setSelectedLevel(3)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedLevel === 3
                  ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                  : 'bg-slate-900 border-slate-800 hover:bg-slate-850 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-amber-400">Level 3 Priority</span>
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
                  Districts
                </span>
              </div>
              <strong className="text-sm text-white block">District NIC Portals</strong>
              <p className="text-[11px] text-slate-400 mt-1">
                Official district administration websites (*.nic.in) across all 38 districts.
              </p>
            </button>

            <button
              onClick={() => setSelectedLevel(4)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedLevel === 4
                  ? 'bg-purple-950/60 border-purple-500 text-purple-200'
                  : 'bg-slate-900 border-slate-800 hover:bg-slate-850 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-purple-400">Level 4 Priority</span>
                <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">
                  Abstracts
                </span>
              </div>
              <strong className="text-sm text-white block">Statistical Abstracts</strong>
              <p className="text-[11px] text-slate-400 mt-1">
                DES Statistical Handbooks, Census of India, and RGI publications.
              </p>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">
              Filtering by: <strong className="text-white">{selectedLevel === 'All' ? 'All Priority Levels' : `Level ${selectedLevel}`}</strong>
            </span>
            {selectedLevel !== 'All' && (
              <button
                onClick={() => setSelectedLevel('All')}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                Reset Filter (Show All)
              </button>
            )}
          </div>
        </div>

        {/* Sources Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSources.map((source) => (
            <div
              key={source.source_id}
              className="bg-slate-950 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 transition-all space-y-3 relative group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        String(source.priority_level).includes('1')
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : String(source.priority_level).includes('2')
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : String(source.priority_level).includes('3')
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}
                    >
                      Priority Level {String(source.priority_level).replace(/LEVEL\s*/i, '')}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Year: {source.data_year}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white group-hover:text-emerald-300">
                    {source.department_name}
                  </h3>
                </div>

                <a
                  href={source.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-900 text-emerald-400 hover:text-white hover:bg-emerald-600 transition-colors shrink-0"
                  title="Visit Official Source"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <div className="font-semibold text-slate-200">{source.document_name}</div>
                <p className="text-slate-400 text-[11px]">{source.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Verified: {source.last_verified}</span>
                <a
                  href={source.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
                >
                  {new URL(source.source_url).hostname}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Statutory Disclaimer Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-slate-200 font-bold">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>Statutory Disclaimer</span>
          </div>
          <p className="leading-relaxed">
            This portal provides government-sourced public information compiled from official state departments,
            electoral bodies, and administrative gazettes for transparency and citizen convenience. While every effort
            is made to ensure 100% data fidelity against primary sources, official government gazettes and notifications
            remain the ultimate legal authority for administrative or legal decisions.
          </p>
        </div>
      </div>
    </div>
  );
};
