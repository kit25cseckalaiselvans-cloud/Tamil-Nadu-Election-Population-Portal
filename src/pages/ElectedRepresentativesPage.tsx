import React, { useState, useMemo } from 'react';
import { PageId } from '../types';
import { ELECTED_REPRESENTATIVES_RECORDS, DISTRICTS_RECORDS } from '../data/localGovernmentData';
import {
  UserCheck,
  Search,
  Filter,
  MapPin,
  Building2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Crown,
  Award,
} from 'lucide-react';

interface ElectedRepresentativesPageProps {
  onNavigate: (page: PageId) => void;
  onSelectDistrict?: (districtId: string) => void;
}

export const ElectedRepresentativesPage: React.FC<ElectedRepresentativesPageProps> = ({
  onNavigate,
  onSelectDistrict,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  const positions = useMemo(() => {
    const set = new Set<string>();
    ELECTED_REPRESENTATIVES_RECORDS.forEach((r) => set.add(r.position));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const districts = useMemo(() => {
    const list = DISTRICTS_RECORDS.map((d) => d.district_name);
    return ['All', ...list.sort()];
  }, []);

  const filteredReps = useMemo(() => {
    return ELECTED_REPRESENTATIVES_RECORDS.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.local_body_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.district_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.party.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPosition = selectedPosition === 'All' || r.position === selectedPosition;
      const matchesDistrict = selectedDistrict === 'All' || r.district_name === selectedDistrict;

      return matchesSearch && matchesPosition && matchesDistrict;
    });
  }, [searchTerm, selectedPosition, selectedDistrict]);

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
                Official Directory of Elected Local-Body Representatives (Tamil Nadu)
              </h2>
              <p className="text-xs text-slate-300">
                Verified against Tamil Nadu State Election Commission (TNSEC) official gazetted declaration notices.
              </p>
            </div>
          </div>
          <a
            href="https://tnsec.tn.gov.in"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-600/40 transition-colors shrink-0"
          >
            tnsec.tn.gov.in
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Page Header */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-rose-500/10 text-rose-400 px-3 py-0.5 rounded-full text-xs font-bold border border-rose-500/30 mb-2">
                <UserCheck className="w-3 h-3" />
                Local Body Leadership (Mayors, Chairpersons, Presidents)
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Elected Local Government Representatives
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Directory of leaders presiding over Municipal Corporations, Municipalities, and Panchayat Unions.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-400">Total Verified Leaders: </span>
                <strong className="text-white font-mono">{ELECTED_REPRESENTATIVES_RECORDS.length}</strong>
              </div>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search representative name, local body, position, or district..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {positions.map((p) => (
                  <option key={p} value={p}>
                    {p === 'All' ? 'All Positions' : p}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d === 'All' ? 'All Districts' : d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Representatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReps.length === 0 ? (
            <div className="col-span-full bg-slate-950 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              No elected representative found matching your query.
            </div>
          ) : (
            filteredReps.map((r) => (
              <div
                key={r.rep_id}
                className="bg-slate-950 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-4 sm:p-5 transition-all space-y-3 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      {r.position}
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-1 group-hover:text-emerald-300">
                      {r.name}
                    </h3>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-900 text-slate-300 border border-slate-700 shrink-0">
                    {r.party}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Local Body:</span>
                    <strong className="text-slate-200">{r.local_body_name}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">District:</span>
                    <span className="text-slate-200">{r.district_name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Term:</span>
                    <span className="text-slate-300">
                      {r.term_start} – {r.term_end}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate pr-2">{r.official_gazette_notification}</span>
                  <a
                    href={r.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-semibold shrink-0"
                  >
                    Verify
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
