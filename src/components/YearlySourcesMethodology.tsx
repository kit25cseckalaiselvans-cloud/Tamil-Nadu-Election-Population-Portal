import React from 'react';
import {
  BookOpen,
  ShieldAlert,
  ExternalLink,
  Award,
  Calendar,
  Layers,
  GraduationCap,
} from 'lucide-react';

export const YearlySourcesMethodology: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Section Title */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Population Sources, Classification & Methodology (2010–2026)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Statutory documentation of data origin, official benchmarks, mathematical calculations, and audit trails.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of 4 Explanatory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. Official Data vs Estimated Data */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Classification of Official vs. Estimated Data</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            In compliance with academic integrity and government data standards, we strictly distinguish between enumerated headcounts and mathematical demographic models:
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
              <div>
                <strong className="text-emerald-800">Official Data (2011):</strong> The sole decennial statutory census headcount conducted during this timeline is the <strong>Census of India 2011</strong> (Total: <strong>72,147,030</strong>; Male: <strong>36,137,975</strong>; Female: <strong>36,009,055</strong>).
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-1.5"></span>
              <div>
                <strong className="text-amber-800">Estimated Data (2010 & 2012–2026):</strong> Calculated projections based on the <em>Report of the Technical Group on Population Projections</em> (National Commission on Population, MoHFW / Office of Registrar General of India).
              </div>
            </li>
          </ul>
        </div>

        {/* 2. Demographic Calculation Method */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Demographic Growth Calculation Formula</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The year-over-year population growth percentage is calculated using standard demographic mathematics:
          </p>
          <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-900 shadow-2xs">
            Annual Growth Rate (%) = [(Population_t - Population_{'t-1'}) / Population_{'t-1'}] × 100
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tamil Nadu&apos;s annual population growth tapered from ~1.22% in 2011 to ~0.27% in 2026 due to the state reaching below-replacement Total Fertility Rate (TFR ~1.4 in NFHS-5) and advanced demographic transition.
          </p>
        </div>

        {/* 3. Primary Government Sources */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span>Authoritative Data Sources</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
              <span className="font-semibold">Census of India (ORGI)</span>
              <a
                href="https://censusindia.gov.in"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-[11px] font-medium"
              >
                censusindia.gov.in <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
              <span className="font-semibold">Ministry of Health & Family Welfare</span>
              <a
                href="https://main.mohfw.gov.in"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-[11px] font-medium"
              >
                main.mohfw.gov.in <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
              <span className="font-semibold">Chief Electoral Officer Tamil Nadu</span>
              <a
                href="https://elections.tn.gov.in"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-[11px] font-medium"
              >
                elections.tn.gov.in <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>

        {/* 4. Why 2026 is an Estimate & Last Update */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Automatic 2026 Update & Audit Date</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The national 2021 decennial census was deferred due to the COVID-19 pandemic. Consequently, all 2026 population figures are <strong>projections</strong>. Our portal automatically calculates the 2026 estimate using the active demographic engine.
          </p>
          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
            <span>Last data update: <strong>September 2026</strong></span>
            <span className="font-semibold text-amber-800">2026 Population: Estimated</span>
          </div>
        </div>
      </div>

      {/* Mandatory Statutory Disclaimer Notice */}
      <div className="bg-amber-950/40 border-2 border-amber-500/40 rounded-xl p-4 text-xs text-slate-200 space-y-1.5">
        <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wider text-[11px]">
          <GraduationCap className="w-4 h-4 text-amber-400" />
          Mandatory Academic Project Notice
        </div>
        <p className="leading-relaxed">
          “This website is a college project and an informational portal. Population figures marked as estimated are calculated values and should not be treated as official census figures. For official statistics, always refer to the relevant Government of India or Government of Tamil Nadu sources.”
        </p>
      </div>
    </div>
  );
};
