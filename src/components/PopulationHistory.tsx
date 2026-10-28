import React, { useState } from 'react';
import { PopulationHistoryEntry } from '../types';
import { Download, Calendar, ArrowDownRight, History, Search } from 'lucide-react';

interface PopulationHistoryProps {
  history: PopulationHistoryEntry[];
}

export const PopulationHistory: React.FC<PopulationHistoryProps> = ({ history }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(
    (item) =>
      item.date.includes(searchTerm) ||
      item.baseline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const headers = 'Date,Estimated Population,Baseline,Status,Estimated Daily Change\n';
    const rows = history
      .map(
        (entry) =>
          `"${entry.date}",${entry.estimatedPopulation},"${entry.baseline}","${entry.status}",+${entry.dailyChange}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'tamil_nadu_30_day_population_update_log.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
              <History className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Population Update History
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated rolling 30-day log recording daily estimated populations based on the official demographic baseline.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-36 sm:w-44"
            />
          </div>

          <button
            onClick={exportCSV}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-sm"
            title="Download 30-day log as CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table Display */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Estimated Population</th>
              <th className="py-3 px-4 text-center">Daily Change</th>
              <th className="py-3 px-4">Baseline</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
            {filteredHistory.map((item, index) => (
              <tr
                key={item.date}
                className={index === 0 ? 'bg-amber-50/50 hover:bg-amber-50 font-semibold' : 'hover:bg-slate-50'}
              >
                <td className="py-2.5 px-4 font-sans flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-900">{item.date}</span>
                  {index === 0 && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500 text-slate-950">
                      Today
                    </span>
                  )}
                </td>
                <td className="py-2.5 px-4 text-right font-extrabold text-slate-900 tabular-nums text-xs">
                  {item.estimatedPopulation.toLocaleString('en-IN')}
                </td>
                <td className="py-2.5 px-4 text-center text-emerald-700 font-semibold tabular-nums">
                  +{item.dailyChange.toLocaleString('en-IN')}
                </td>
                <td className="py-2.5 px-4 text-slate-600 font-sans">{item.baseline}</td>
                <td className="py-2.5 px-4 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 font-sans">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <span>Showing {filteredHistory.length} of 30 recorded days</span>
        <span className="text-[11px] italic">
          Persisted in browser local storage and recalculated dynamically upon opening.
        </span>
      </div>
    </div>
  );
};
