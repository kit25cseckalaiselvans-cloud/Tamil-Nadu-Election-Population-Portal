import React, { useState, useMemo } from 'react';
import { PageId } from '../types';
import {
  VILLAGE_PANCHAYATS_RECORDS,
  BLOCKS_RECORDS,
  DISTRICTS_RECORDS,
  RURAL_GOVERNANCE_2026_METRICS,
} from '../data/localGovernmentData';
import {
  Building2,
  Search,
  Filter,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface VillagePanchayatsPageProps {
  onNavigate: (page: PageId) => void;
  onSelectDistrict?: (districtId: string) => void;
}

export const VillagePanchayatsPage: React.FC<VillagePanchayatsPageProps> = ({
  onNavigate,
  onSelectDistrict,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedBlock, setSelectedBlock] = useState('All');

  // Districts for dropdown
  const districts = useMemo(() => {
    const list = DISTRICTS_RECORDS.filter((d) => d.village_panchayats_count > 0).map((d) => d.district_name);
    return ['All', ...list.sort()];
  }, []);

  // Blocks filtered by selected district
  const blocks = useMemo(() => {
    let list = BLOCKS_RECORDS;
    if (selectedDistrict !== 'All') {
      list = list.filter((b) => b.district_name === selectedDistrict);
    }
    return ['All', ...Array.from(new Set(list.map((b) => b.block_name))).sort()];
  }, [selectedDistrict]);

  // Filtered Village Panchayats
  const filteredPanchayats = useMemo(() => {
    return VILLAGE_PANCHAYATS_RECORDS.filter((vp) => {
      const matchesSearch =
        vp.panchayat_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vp.official_code.includes(searchTerm.trim()) ||
        vp.block_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vp.district_name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDistrict = selectedDistrict === 'All' || vp.district_name === selectedDistrict;
      const matchesBlock = selectedBlock === 'All' || vp.block_name === selectedBlock;

      return matchesSearch && matchesDistrict && matchesBlock;
    });
  }, [searchTerm, selectedDistrict, selectedBlock]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Strict Data Integrity Rule Banner (Rule #8) */}
        <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-amber-200">
                Rule #8 Statutory Data Integrity Standard: Verified Village Panchayat Records
              </h2>
              <p className="text-xs text-slate-300">
                President names are strictly shown only when officially published in TNRDPR / TNSEC datasets.
                Unverified entries explicitly show: <em>“Current President information not available in the verified official dataset.”</em>
              </p>
            </div>
          </div>
          <a
            href="https://tnrd.tn.gov.in"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-white bg-amber-900/60 px-3 py-1.5 rounded-lg border border-amber-600/40 transition-colors shrink-0"
          >
            tnrd.tn.gov.in
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Header & Overview Stats */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-400 px-3 py-0.5 rounded-full text-xs font-bold border border-teal-500/30 mb-2">
                <Building2 className="w-3 h-3" />
                Rural Development & Panchayat Raj Department (TNRDPR)
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Tamil Nadu Village Panchayats Directory
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Official register of 12,525 Village Panchayats across 388 Panchayat Unions in Tamil Nadu.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-400">Total Panchayats: </span>
                <strong className="text-white font-mono">{RURAL_GOVERNANCE_2026_METRICS.totalVillagePanchayats.toLocaleString()}</strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-400">Panchayat Unions: </span>
                <strong className="text-teal-400 font-mono">{RURAL_GOVERNANCE_2026_METRICS.totalPanchayatUnions}</strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-400">Rural Districts: </span>
                <strong className="text-emerald-400 font-mono">{RURAL_GOVERNANCE_2026_METRICS.totalRuralDistricts} / {RURAL_GOVERNANCE_2026_METRICS.totalRevenueDistricts}</strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-400">Habitations: </span>
                <strong className="text-amber-400 font-mono">{RURAL_GOVERNANCE_2026_METRICS.totalHabitations.toLocaleString()}</strong>
              </div>
            </div>
          </div>

          {/* 2026 Three-Tier Panchayati Raj Architecture Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-slate-900/90 rounded-xl border border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Tier 1: Apex Rural Tier</span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  {RURAL_GOVERNANCE_2026_METRICS.totalRuralDistricts} Districts
                </span>
              </div>
              <h4 className="text-sm font-black text-white">District Panchayats</h4>
              <p className="text-[11px] text-slate-300">
                Covers <strong>37 Rural Districts</strong> across Tamil Nadu. Chennai is 100% urban and has no District Panchayat.
              </p>
            </div>

            <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-800 md:pl-3 pt-2 md:pt-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Tier 2: Intermediate Tier</span>
                <span className="text-[10px] font-mono bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded border border-teal-500/30">
                  {RURAL_GOVERNANCE_2026_METRICS.totalPanchayatUnions} Blocks
                </span>
              </div>
              <h4 className="text-sm font-black text-white">Panchayat Unions (Blocks)</h4>
              <p className="text-[11px] text-slate-300">
                <strong>388 Panchayat Unions</strong> spanning all 37 rural districts, administered by BDOs and elected Chairpersons.
              </p>
            </div>

            <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-800 md:pl-3 pt-2 md:pt-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Tier 3: Grassroots Tier</span>
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  {RURAL_GOVERNANCE_2026_METRICS.totalVillagePanchayats.toLocaleString()} Units
                </span>
              </div>
              <h4 className="text-sm font-black text-white">Village Panchayats</h4>
              <p className="text-[11px] text-slate-300">
                <strong>12,525 Village Panchayats</strong> governing <strong>79,394 rural habitations</strong> under the Tamil Nadu Panchayats Act.
              </p>
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
                placeholder="Search Village Panchayat name, LGD code, block, or district..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedBlock('All');
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d === 'All' ? 'All Districts' : d}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {blocks.map((b) => (
                  <option key={b} value={b}>
                    {b === 'All' ? 'All Blocks' : b}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Village Panchayats Table */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>
              Displaying <strong className="text-white">{filteredPanchayats.length}</strong> official Village Panchayats
            </span>
            <span className="text-[11px] text-teal-400 font-semibold">TNRDPR & LGD Directory Standards</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3 font-semibold">Panchayat Name</th>
                  <th className="px-4 py-3 font-semibold">LGD Code</th>
                  <th className="px-4 py-3 font-semibold">Block / Union</th>
                  <th className="px-4 py-3 font-semibold">District</th>
                  <th className="px-4 py-3 font-semibold text-center">Habitations</th>
                  <th className="px-4 py-3 font-semibold">Panchayat President Status (Rule #8)</th>
                  <th className="px-4 py-3 font-semibold text-right">Official Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredPanchayats.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                      No village panchayat found matching your query.
                    </td>
                  </tr>
                ) : (
                  filteredPanchayats.map((vp) => (
                    <tr key={vp.panchayat_id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-white">
                        {vp.panchayat_name}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-slate-300">
                        {vp.official_code}
                      </td>
                      <td className="px-4 py-3.5 text-slate-200">
                        {vp.block_name}
                      </td>
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => {
                            if (onSelectDistrict) onSelectDistrict(vp.district_id);
                            onNavigate('districts');
                          }}
                          className="text-slate-300 hover:text-emerald-400 hover:underline font-medium inline-flex items-center gap-1"
                        >
                          <MapPin className="w-3 h-3 text-emerald-500" />
                          {vp.district_name}
                        </button>
                      </td>
                      <td className="px-4 py-3.5 text-center font-mono font-bold text-slate-300">
                        {vp.habitations_count}
                      </td>
                      <td className="px-4 py-3.5">
                        {vp.president_name ? (
                          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{vp.president_name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-amber-300/90 text-xs italic bg-amber-950/20 px-2.5 py-1 rounded border border-amber-500/20 max-w-sm">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>Current President information not available in the verified official dataset.</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <a
                          href={vp.source_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-semibold"
                        >
                          TNRD
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
