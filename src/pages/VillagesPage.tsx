import React, { useState, useMemo } from 'react';
import { PageId } from '../types';
import { VILLAGE_HABITATIONS_RECORDS, DISTRICTS_RECORDS } from '../data/localGovernmentData';
import {
  Layers,
  Search,
  MapPin,
  Building2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface VillagesPageProps {
  onNavigate: (page: PageId) => void;
  onSelectDistrict?: (districtId: string) => void;
}

export const VillagesPage: React.FC<VillagesPageProps> = ({ onNavigate, onSelectDistrict }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const districts = useMemo(() => {
    const list = DISTRICTS_RECORDS.map((d) => d.district_name);
    return ['All', ...list.sort()];
  }, []);

  const filteredVillages = useMemo(() => {
    return VILLAGE_HABITATIONS_RECORDS.filter((vh) => {
      const matchesSearch =
        vh.village_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vh.panchayat_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vh.block_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vh.district_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vh.official_code.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDistrict = selectedDistrict === 'All' || vh.district_name === selectedDistrict;
      const matchesType = selectedType === 'All' || vh.type === selectedType;

      return matchesSearch && matchesDistrict && matchesType;
    });
  }, [searchTerm, selectedDistrict, selectedType]);

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
                Official Villages & Habitations Register (Tamil Nadu)
              </h2>
              <p className="text-xs text-slate-300">
                Sourced from TNRDPR Habitation Database and Revenue Administration Department records.
              </p>
            </div>
          </div>
          <a
            href="https://tnrd.tn.gov.in"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-600/40 transition-colors shrink-0"
          >
            tnrd.tn.gov.in
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Administrative Concept Clarification Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Info className="w-4 h-4" />
            <span>Administrative Distinction: Habitation vs. Revenue Village vs. Village Panchayat</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 pt-1">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <strong className="text-amber-400 block mb-1">1. Habitation (குடியிருப்பு)</strong>
              A distinct cluster of houses or settlement within a village. Tamil Nadu has over 79,000 recognized habitations.
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <strong className="text-blue-400 block mb-1">2. Revenue Village (வருவாய் கிராமம்)</strong>
              The basic administrative unit of land records and revenue administration, administered by a Village Administrative Officer (VAO).
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <strong className="text-teal-400 block mb-1">3. Village Panchayat (கிராம ஊராட்சி)</strong>
              The local self-government unit established under the Tamil Nadu Panchayats Act, 1994, which may comprise one or more revenue villages or multiple habitations.
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Villages & Habitations Directory</h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore grassroots settlements mapped to their parent Panchayat and Block.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              Showing: <strong className="text-white font-mono">{filteredVillages.length}</strong> records
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search village name, panchayat, block, or district..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
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

            <div className="sm:col-span-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Types</option>
                <option value="Habitation">Habitation</option>
                <option value="Revenue Village">Revenue Village</option>
                <option value="Hamlet">Hamlet</option>
              </select>
            </div>
          </div>
        </div>

        {/* Villages List */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3 font-semibold">Village / Habitation Name</th>
                  <th className="px-4 py-3 font-semibold">Classification</th>
                  <th className="px-4 py-3 font-semibold">Parent Panchayat</th>
                  <th className="px-4 py-3 font-semibold">Block / Union</th>
                  <th className="px-4 py-3 font-semibold">District</th>
                  <th className="px-4 py-3 font-semibold text-right">Official Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredVillages.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      No village or habitation found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredVillages.map((vh) => (
                    <tr key={vh.village_id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-white">
                        {vh.village_name}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            vh.type === 'Revenue Village'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {vh.type}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-200">
                        {vh.panchayat_name}
                      </td>
                      <td className="px-4 py-3.5 text-slate-300">
                        {vh.block_name}
                      </td>
                      <td className="px-4 py-3.5 text-slate-300">
                        {vh.district_name}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <a
                          href={vh.source_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-semibold"
                        >
                          Verify
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
