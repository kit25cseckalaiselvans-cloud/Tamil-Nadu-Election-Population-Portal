import React, { useState, useMemo } from 'react';
import { PageId } from '../types';
import {
  LOCAL_BODIES_RECORDS,
  DISTRICTS_RECORDS,
  RURAL_GOVERNANCE_2026_METRICS,
} from '../data/localGovernmentData';
import {
  Building2,
  Search,
  Filter,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Layers,
  Crown,
  Briefcase,
} from 'lucide-react';

interface LocalGovernmentPageProps {
  onNavigate: (page: PageId) => void;
  onSelectDistrict?: (districtId: string) => void;
}

export const LocalGovernmentPage: React.FC<LocalGovernmentPageProps> = ({
  onNavigate,
  onSelectDistrict,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Urban' | 'Rural'>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const corporationsCount = LOCAL_BODIES_RECORDS.filter((b) => b.type === 'Municipal Corporation').length;
  const municipalitiesCount = LOCAL_BODIES_RECORDS.filter((b) => b.type === 'Municipality').length;
  const townPanchayatsCount = LOCAL_BODIES_RECORDS.filter((b) => b.type === 'Town Panchayat').length;
  const panchayatUnionsCount = LOCAL_BODIES_RECORDS.filter((b) => b.type === 'Panchayat Union').length;

  const filteredBodies = useMemo(() => {
    return LOCAL_BODIES_RECORDS.filter((b) => {
      const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
      const matchesType = selectedType === 'All' || b.type === selectedType;
      const matchesSearch =
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.district_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.official_code.includes(searchTerm.trim()) ||
        b.type.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesType && matchesSearch;
    });
  }, [selectedCategory, selectedType, searchTerm]);

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
                Official Directory of Local Self-Government Bodies (Tamil Nadu)
              </h2>
              <p className="text-xs text-slate-300">
                Urban Local Bodies (MAWS Department) & Rural Local Bodies (TNRDPR Department)
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

        {/* Header & Two-Tier Summary */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-3 py-0.5 rounded-full text-xs font-bold border border-indigo-500/30 mb-2">
                <Building2 className="w-3 h-3" />
                73rd & 74th Constitutional Amendments
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Tamil Nadu Local Government Bodies Directory
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Authoritative register of Urban Local Bodies (ULBs) and Panchayati Raj Institutions (PRIs).
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Corporations</span>
                <span className="text-lg font-black text-amber-400">21</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Municipalities</span>
                <span className="text-lg font-black text-blue-400">138</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Town Panchayats</span>
                <span className="text-lg font-black text-teal-400">490</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Rural Districts</span>
                <span className="text-lg font-black text-emerald-400">{RURAL_GOVERNANCE_2026_METRICS.totalRuralDistricts}</span>
                <span className="text-[9px] text-slate-400 block">Dist. Panchayats</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Panchayat Unions</span>
                <span className="text-lg font-black text-purple-400">{RURAL_GOVERNANCE_2026_METRICS.totalPanchayatUnions}</span>
                <span className="text-[9px] text-slate-400 block">Blocks</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Village Panchayats</span>
                <span className="text-lg font-black text-cyan-400">{RURAL_GOVERNANCE_2026_METRICS.totalVillagePanchayats.toLocaleString()}</span>
                <span className="text-[9px] text-slate-400 block">Base PRIs</span>
              </div>
            </div>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <div className="w-full sm:flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search local body name, district, or code..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedType('All');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                All Bodies
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Urban');
                  setSelectedType('All');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === 'Urban'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Urban (ULBs)
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Rural');
                  setSelectedType('All');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === 'Rural'
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Rural (PRIs)
              </button>
            </div>
          </div>
        </div>

        {/* 21 Municipal Corporations Showcase */}
        {selectedCategory !== 'Rural' && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  21 City Municipal Corporations of Tamil Nadu
                </h2>
                <p className="text-xs text-slate-400">
                  Headed by directly/indirectly elected Worshipful Mayors and administered by IAS Commissioners.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                21 Corporations
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {LOCAL_BODIES_RECORDS.filter((b) => b.type === 'Municipal Corporation').map((corp) => (
                <div
                  key={corp.body_id}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all space-y-1.5 group"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-extrabold text-white group-hover:text-amber-300">
                      {corp.name}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                      {corp.wards_count} Wards
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 flex items-center justify-between">
                    <span className="text-slate-400">District:</span>
                    <span className="font-medium text-slate-200">{corp.district_name}</span>
                  </div>

                  <div className="text-xs text-slate-300 flex items-center justify-between">
                    <span className="text-slate-400">Political Head:</span>
                    <span className="font-semibold text-emerald-400">{corp.head_title}</span>
                  </div>

                  <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80 flex items-center justify-between">
                    <span>LGD: {corp.official_code}</span>
                    <a
                      href={corp.source_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-semibold"
                    >
                      Gazette
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* General Local Bodies Table */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing <strong className="text-white">{filteredBodies.length}</strong> local government bodies
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold">TNSEC Official Register</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3 font-semibold">Local Body Name</th>
                  <th className="px-4 py-3 font-semibold">Classification</th>
                  <th className="px-4 py-3 font-semibold">Tier</th>
                  <th className="px-4 py-3 font-semibold">District</th>
                  <th className="px-4 py-3 font-semibold text-center">Wards</th>
                  <th className="px-4 py-3 font-semibold">Elected Head Title</th>
                  <th className="px-4 py-3 font-semibold text-right">Official Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredBodies.map((b) => (
                  <tr key={b.body_id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-white">
                      {b.name}
                    </td>
                    <td className="px-4 py-3.5 font-medium text-slate-200">
                      {b.type}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          b.category === 'Urban'
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                        }`}
                      >
                        {b.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => {
                          if (onSelectDistrict) onSelectDistrict(b.district_id);
                          onNavigate('districts');
                        }}
                        className="text-slate-300 hover:text-emerald-400 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <MapPin className="w-3 h-3 text-emerald-500" />
                        {b.district_name}
                      </button>
                    </td>
                    <td className="px-4 py-3.5 text-center font-mono font-bold text-slate-300">
                      {b.wards_count}
                    </td>
                    <td className="px-4 py-3.5 text-emerald-400 font-semibold">
                      {b.head_title}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <a
                        href={b.source_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-semibold"
                      >
                        Verify
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
