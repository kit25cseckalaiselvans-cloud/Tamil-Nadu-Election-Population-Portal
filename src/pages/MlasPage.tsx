import React, { useState, useMemo } from 'react';
import { PageId, AssemblyMlaRecord2026 } from '../types';
import { getActiveMlaRecords } from '../services/assemblyMlaService';
import { OFFICIAL_ECI_SOURCE_2026 } from '../data/assemblyData2026';
import { MlaProfileModal } from '../components/MlaProfileModal';
import { getPartyBadgeClass } from './AssemblyConstituenciesPage';
import {
  Users,
  Search,
  Filter,
  MapPin,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Vote,
  FileText,
} from 'lucide-react';

interface MlasPageProps {
  onNavigate: (page: PageId) => void;
  onSelectDistrict?: (districtId: string) => void;
}

export const MlasPage: React.FC<MlasPageProps> = ({ onNavigate, onSelectDistrict }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParty, setSelectedParty] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedMla, setSelectedMla] = useState<AssemblyMlaRecord2026 | null>(null);

  const mlaRecords = useMemo(() => getActiveMlaRecords(), []);

  // Unique parties
  const parties = useMemo(() => {
    const set = new Set<string>();
    mlaRecords.forEach((m) => set.add(m.party));
    return ['All', ...Array.from(set).sort()];
  }, [mlaRecords]);

  // Unique districts
  const districts = useMemo(() => {
    const set = new Set<string>();
    mlaRecords.forEach((m) => set.add(m.district));
    return ['All', ...Array.from(set).sort()];
  }, [mlaRecords]);

  // Filtered MLAs
  const filteredMlas = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return mlaRecords.filter((m) => {
      const matchesSearch =
        !term ||
        m.mla_name.toLowerCase().includes(term) ||
        m.constituency_name.toLowerCase().includes(term) ||
        m.constituency_number.toString() === term ||
        m.party.toLowerCase().includes(term) ||
        m.district.toLowerCase().includes(term);

      const matchesParty = selectedParty === 'All' || m.party === selectedParty;
      const matchesDistrict = selectedDistrict === 'All' || m.district === selectedDistrict;

      return matchesSearch && matchesParty && matchesDistrict;
    });
  }, [mlaRecords, searchTerm, selectedParty, selectedDistrict]);

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
                Official Directory of MLAs (Tamil Nadu Legislative Assembly – 2026)
              </h2>
              <p className="text-xs text-slate-300">
                Source: Election Commission of India – Tamil Nadu Assembly Election 2026 • Verified against Detailed Results Report.
              </p>
            </div>
          </div>
          <a
            href={OFFICIAL_ECI_SOURCE_2026.pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-600/40 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>ECI 2026 Results (PDF)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Page Header */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-3 py-0.5 rounded-full text-xs font-bold border border-purple-500/30 mb-2">
                <Users className="w-3 h-3" />
                Sitting Members of the Legislative Assembly (MLAs)
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Tamil Nadu MLAs Directory (2026)
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Verified roster of all 234 elected representatives serving in the Tamil Nadu Legislative Assembly.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('assembly-constituencies')}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Vote className="w-3.5 h-3.5" />
                <span>Constituency Table View</span>
              </button>
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-400">Total Seats: </span>
                <strong className="text-white font-mono">234</strong>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search MLA name, constituency, number, or party..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedParty}
                onChange={(e) => setSelectedParty(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
              >
                {parties.map((p) => (
                  <option key={p} value={p}>
                    {p === 'All' ? 'All Political Parties' : p}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d === 'All' ? 'All Districts (38)' : `${d} District`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* MLAs Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMlas.length === 0 ? (
            <div className="col-span-full bg-slate-950 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              No MLA records match your search criteria.
            </div>
          ) : (
            filteredMlas.map((m) => (
              <div
                key={m.constituency_number}
                onClick={() => setSelectedMla(m)}
                className="bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 sm:p-5 transition-all space-y-3 relative group cursor-pointer shadow-lg hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Constituency #{m.constituency_number}
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-1 group-hover:text-amber-300 transition-colors">
                      {m.mla_name}
                    </h3>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded text-[11px] font-bold border shrink-0 ${getPartyBadgeClass(
                      m.party
                    )}`}
                  >
                    {m.party}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Constituency:</span>
                    <strong className="text-slate-200">
                      {m.constituency_name} ({m.reservation_category})
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">District:</span>
                    <span className="text-slate-200">{m.district}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold text-emerald-400 bg-emerald-500/10">
                      {m.status}
                    </span>
                  </div>
                </div>

                {/* Source Footer */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate pr-2">
                    Election Year: {m.election_year}
                  </span>
                  <span className="text-amber-400 group-hover:text-amber-300 inline-flex items-center gap-1 font-semibold shrink-0">
                    View Profile →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MLA Profile Modal */}
      {selectedMla && (
        <MlaProfileModal mla={selectedMla} onClose={() => setSelectedMla(null)} />
      )}
    </div>
  );
};
