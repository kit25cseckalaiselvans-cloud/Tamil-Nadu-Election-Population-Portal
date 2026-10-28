import React, { useState } from 'react';
import { YearlyPopulationRecord } from '../types';
import {
  Search,
  Filter,
  Download,
  ExternalLink,
  ShieldCheck,
  Info,
  TrendingUp,
  Award,
} from 'lucide-react';
import { exportYearlyDataToCSV } from '../services/yearlyPopulationService';

interface YearlyPopulationTableProps {
  records: YearlyPopulationRecord[];
  selectedYear: number;
  onSelectYear: (year: number) => void;
  onViewSource: (record: YearlyPopulationRecord) => void;
}

export const YearlyPopulationTable: React.FC<YearlyPopulationTableProps> = ({
  records,
  selectedYear,
  onSelectYear,
  onViewSource,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Official' | 'Estimated'>('All');

  // Filter records
  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      String(r.year).includes(searchTerm) ||
      r.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
      {/* Table Top Bar */}
      <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>Tamil Nadu Population Table (2010–2026)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive yearly demographics, gender distribution, growth percentages, and data certification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search year or source..."
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-slate-800 placeholder-slate-400 w-44 sm:w-52"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-300 text-xs">
              {(['All', 'Official', 'Estimated'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    statusFilter === st
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* CSV Export */}
            <button
              type="button"
              onClick={() => exportYearlyDataToCSV(records)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory Table Disclaimer Bar */}
      <div className="bg-amber-50/80 px-5 py-2.5 border-b border-amber-200/70 text-xs text-amber-900 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Official vs Estimated Distinction:</strong> 2011 represents the official Census headcount (72,147,030). All other years are RGI demographic projections and are labeled as <em>Estimated Population – Not an official census count</em>.
          </span>
        </div>
        <span className="text-[11px] font-mono text-amber-800 shrink-0 hidden lg:inline">
          Showing {filteredRecords.length} of {records.length} records
        </span>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Year</th>
              <th className="py-3 px-4">Total Population</th>
              <th className="py-3 px-4">Male Population</th>
              <th className="py-3 px-4">Female Population</th>
              <th className="py-3 px-4">Population Growth</th>
              <th className="py-3 px-4">Population Status</th>
              <th className="py-3 px-4 text-right">Source & Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No records match your search criteria.
                </td>
              </tr>
            ) : (
              filteredRecords.map((r) => {
                const isSelected = r.year === selectedYear;
                const isOfficial = r.status === 'Official';

                return (
                  <tr
                    key={r.year}
                    onClick={() => onSelectYear(r.year)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-amber-50/90 font-medium'
                        : isOfficial
                        ? 'bg-emerald-50/40 hover:bg-emerald-50/70'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* Year */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-sm font-extrabold ${
                            isOfficial ? 'text-emerald-800' : 'text-slate-900'
                          }`}
                        >
                          {r.year}
                        </span>
                        {isOfficial && (
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Census Year
                          </span>
                        )}
                        {r.year === 2026 && (
                          <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Current Year
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Total Population */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 text-sm">
                      <div>{r.totalPopulation.toLocaleString('en-IN')}</div>
                      <div className="text-[10px] text-slate-500 font-sans font-normal">
                        {(r.totalPopulation / 10000000).toFixed(3)} Crores
                      </div>
                    </td>

                    {/* Male Population */}
                    <td className="py-3.5 px-4 font-mono">
                      <div className="text-slate-900 font-semibold">
                        {r.malePopulation.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-blue-700 font-sans font-semibold">
                        {r.malePercentage}%
                      </div>
                    </td>

                    {/* Female Population */}
                    <td className="py-3.5 px-4 font-mono">
                      <div className="text-slate-900 font-semibold">
                        {r.femalePopulation.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-rose-700 font-sans font-semibold">
                        {r.femalePercentage}%
                      </div>
                    </td>

                    {/* Population Growth */}
                    <td className="py-3.5 px-4 font-mono">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 font-bold ${
                            r.growthRatePercent >= 0 ? 'text-emerald-700' : 'text-rose-600'
                          }`}
                        >
                          <TrendingUp className="w-3 h-3" />
                          {r.growthRatePercent >= 0 ? '+' : ''}
                          {r.growthRatePercent}%
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-sans">
                        +{r.growthAbsolute.toLocaleString('en-IN')} / yr
                      </div>
                    </td>

                    {/* Population Status */}
                    <td className="py-3.5 px-4">
                      {isOfficial ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider shadow-2xs">
                          <Award className="w-3 h-3" />
                          Official Data
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider">
                          Estimated Data
                        </span>
                      )}
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {isOfficial ? 'Census of India' : 'RGI Projection'}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewSource(r);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors border border-slate-300"
                        title="View official citation & calculation methodology"
                      >
                        <span>View Source</span>
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <div>
          Baseline year: <strong className="text-slate-800">2011</strong> • Official Headcount: <strong className="text-slate-800 font-mono">72,147,030</strong>
        </div>
        <div className="text-slate-400 italic">
          Click any row to focus on that year in charts and details
        </div>
      </div>
    </div>
  );
};
