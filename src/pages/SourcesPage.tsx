import React from 'react';
import { OFFICIAL_SOURCES } from '../data/tnData';
import {
  ExternalLink,
  BookOpen,
  ShieldCheck,
  Building,
  FileCheck2,
  Calendar,
  Layers,
  Info,
} from 'lucide-react';

export const SourcesPage: React.FC = () => {
  return (
    <div className="space-y-10 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold w-fit mb-3 border border-blue-200">
          <BookOpen className="w-3.5 h-3.5" />
          Official Government Data Sources & Attribution
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
          Data Sources & Methodology
        </h1>
        <p className="mt-2 text-slate-600 text-sm leading-relaxed">
          Every demographic, electoral, and vital health statistic featured on this portal is cited from authoritative, primary public data repositories published by the Government of India and the Government of Tamil Nadu.
        </p>
      </div>

      {/* PRIMARY GOVERNMENT DATA SOURCES DIRECTORY */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">
            Primary Government Authorities & Portals
          </h2>
          <span className="text-xs text-slate-500">Authenticated Repositories</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OFFICIAL_SOURCES.map((source, index) => (
            <div
              key={index}
              id={`source-card-${index}`}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {source.category} • {source.year}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-700 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{source.status}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900">{source.datasetName}</h3>
                <div className="text-[11px] font-semibold text-slate-500">{source.sourceAuthority}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{source.description}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 truncate max-w-[200px]">
                  {source.officialUrl.replace('https://', '')}
                </span>
                <a
                  href={source.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Visit Portal</span>
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* METHODOLOGY & DATA CADENCE EXPLANATION */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            Understanding Source Cadence & Update Cycles
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Why different statistics on this portal reflect different reporting years.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-blue-900 text-sm">
              <Calendar className="w-4 h-4 text-blue-600" />
              1. Census Demographics
            </div>
            <p className="text-slate-600 leading-relaxed">
              Decennial Census of India conducted by the Office of the Registrar General. The 2011 Primary Census Abstract remains the last officially published full census dataset for India. Projections are computed under Census Expert Committee models.
            </p>
            <div className="text-[11px] text-blue-700 font-semibold">Cadence: Decennial (Every 10 years)</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-sm">
              <Calendar className="w-4 h-4 text-emerald-600" />
              2. Electoral Rolls (SSR)
            </div>
            <p className="text-slate-600 leading-relaxed">
              Special Summary Revision (SSR) conducted annually by CEO Tamil Nadu with 4 qualifying dates (Jan 1, Apr 1, Jul 1, Oct 1). The 2024 final electoral roll forms the official benchmark for registered electors and polling stations.
            </p>
            <div className="text-[11px] text-emerald-700 font-semibold">Cadence: Annual & Continuous Revision</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-rose-900 text-sm">
              <Calendar className="w-4 h-4 text-rose-600" />
              3. Vital Statistics (CRS)
            </div>
            <p className="text-slate-600 leading-relaxed">
              Civil Registration System compiled under the RBD Act 1969 by the Chief Registrar of Births and Deaths & Directorate of Public Health, Government of Tamil Nadu. Data reflects legally registered births and deaths across municipal/panchayat units.
            </p>
            <div className="text-[11px] text-rose-700 font-semibold">Cadence: Annual Vital Statistics Reports</div>
          </div>
        </div>
      </section>

      {/* CITATION ETHICS & REPRODUCIBILITY */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-xs text-slate-600 space-y-2">
        <div className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Info className="w-4 h-4 text-amber-600" />
          Academic Citation & Research Use
        </div>
        <p className="leading-relaxed">
          When citing data from this college demonstration portal for research papers or college presentations, please attribute the underlying primary governmental source indicated on each specific card or chart (e.g., <em>“Election Commission of India, General Election 2024 Report”</em> or <em>“Census of India 2011, Primary Census Abstract for Tamil Nadu”</em>).
        </p>
      </section>
    </div>
  );
};
