import React, { useState, useMemo } from 'react';
import { PageId } from '../types';
import {
  DISTRICTS_RECORDS,
  ASSEMBLY_CONSTITUENCY_RECORDS,
  ASSEMBLY_MEMBERS_RECORDS,
  BLOCKS_RECORDS,
  VILLAGE_PANCHAYATS_RECORDS,
  VILLAGE_HABITATIONS_RECORDS,
  LOCAL_BODIES_RECORDS,
  ELECTED_REPRESENTATIVES_RECORDS,
  DATA_SOURCES_RECORDS,
} from '../data/localGovernmentData';
import {
  MapPin,
  Building2,
  Users,
  Vote,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  FileCheck2,
  Layers,
  Crown,
} from 'lucide-react';

interface DistrictDetailPageProps {
  districtId: string;
  onNavigate: (page: PageId) => void;
  onSelectDistrict: (id: string) => void;
}

export const DistrictDetailPage: React.FC<DistrictDetailPageProps> = ({
  districtId,
  onNavigate,
  onSelectDistrict,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'acs' | 'mlas' | 'blocks' | 'panchayats' | 'villages' | 'localbodies' | 'reps' | 'sources'
  >('overview');

  const district = useMemo(() => {
    return (
      DISTRICTS_RECORDS.find(
        (d) => d.district_id === districtId || d.district_name.toLowerCase() === districtId.toLowerCase()
      ) || DISTRICTS_RECORDS[0]
    );
  }, [districtId]);

  // Sub-entity queries for this district
  const constituencies = useMemo(() => {
    return ASSEMBLY_CONSTITUENCY_RECORDS.filter(
      (ac) => ac.district_id === district.district_id || ac.district_name.toLowerCase() === district.district_name.toLowerCase()
    );
  }, [district]);

  const mlas = useMemo(() => {
    return ASSEMBLY_MEMBERS_RECORDS.filter(
      (m) => m.district_name.toLowerCase() === district.district_name.toLowerCase()
    );
  }, [district]);

  const blocks = useMemo(() => {
    return BLOCKS_RECORDS.filter((b) => b.district_id === district.district_id);
  }, [district]);

  const villagePanchayats = useMemo(() => {
    return VILLAGE_PANCHAYATS_RECORDS.filter((vp) => vp.district_id === district.district_id);
  }, [district]);

  const habitations = useMemo(() => {
    return VILLAGE_HABITATIONS_RECORDS.filter(
      (vh) => vh.district_name.toLowerCase() === district.district_name.toLowerCase()
    );
  }, [district]);

  const localBodies = useMemo(() => {
    return LOCAL_BODIES_RECORDS.filter((lb) => lb.district_id === district.district_id);
  }, [district]);

  const representatives = useMemo(() => {
    return ELECTED_REPRESENTATIVES_RECORDS.filter(
      (er) => er.district_name.toLowerCase() === district.district_name.toLowerCase()
    );
  }, [district]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back and District Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onNavigate('districts')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl transition-colors border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to 38 Districts Directory</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Switch District:</span>
            <select
              value={district.district_id}
              onChange={(e) => onSelectDistrict(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              {DISTRICTS_RECORDS.map((d) => (
                <option key={d.district_id} value={d.district_id}>
                  {d.district_name} ({d.region})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* District Hero Header with 15 Required Metadata Points */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-emerald-500/10 text-emerald-400 px-3 py-0.5 rounded-full text-xs font-bold border border-emerald-500/30 inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Official District Dossier (Tamil Nadu)
                </span>
                <span className="bg-blue-500/10 text-blue-400 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border border-blue-500/30">
                  LGD Code: {district.official_code}
                </span>
                <span className="bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full text-xs font-medium">
                  Region: {district.region}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {district.district_name} District
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Headquarters: <strong className="text-white">{district.headquarters}</strong> • Area: {district.area_sq_km.toLocaleString()} sq. km
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={district.official_website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
              >
                Official District Portal
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 pt-2">
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">2026 Projection Pop.</span>
              <strong className="text-sm font-mono text-white">
                {district.population_projection_2026.toLocaleString()}
              </strong>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Assembly Constituencies</span>
              <strong className="text-sm font-mono text-amber-400">
                {district.assembly_constituencies_count} Seats
              </strong>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Panchayat Unions (Blocks)</span>
              <strong className="text-sm font-mono text-blue-400">
                {district.blocks_count} Blocks
              </strong>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Village Panchayats</span>
              <strong className="text-sm font-mono text-teal-400">
                {district.village_panchayats_count} Units
              </strong>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Urban Local Bodies</span>
              <strong className="text-sm font-mono text-purple-400">
                {district.local_bodies_count} ULBs
              </strong>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Taluks / Divisions</span>
              <strong className="text-sm font-mono text-emerald-400">
                {district.taluks_count} / {district.revenue_divisions_count}
              </strong>
            </div>
          </div>

          {/* Statutory Verification Attributions Row */}
          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
            <div>
              Source: <span className="text-slate-200">{district.source_department}</span> • Dataset: <span className="text-slate-200">{district.source_document}</span>
            </div>
            <div>
              Year: <strong className="text-white">{district.data_year}</strong> • Verified: <strong className="text-emerald-400">{district.last_verified}</strong>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex border-b border-slate-800 overflow-x-auto gap-1">
          {[
            { id: 'overview', label: '1. District Overview' },
            { id: 'acs', label: `2. Assembly Constituencies (${constituencies.length})` },
            { id: 'mlas', label: `3. MLAs (${mlas.length})` },
            { id: 'blocks', label: `4. Blocks (${blocks.length})` },
            { id: 'panchayats', label: `5. Village Panchayats (${villagePanchayats.length})` },
            { id: 'villages', label: `6. Habitations (${habitations.length})` },
            { id: 'localbodies', label: `7. Local Bodies (${localBodies.length})` },
            { id: 'reps', label: `8. Elected Leaders (${representatives.length})` },
            { id: 'sources', label: '9. Official Sources' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 font-bold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10 rounded-t-xl'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  Administrative Structure
                </h3>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Headquarters</span>
                    <strong className="text-white">{district.headquarters}</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Revenue Divisions</span>
                    <strong className="text-white">{district.revenue_divisions_count}</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Taluks</span>
                    <strong className="text-white">{district.taluks_count}</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Panchayat Unions (Blocks)</span>
                    <strong className="text-white">{district.blocks_count}</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Village Panchayats</span>
                    <strong className="text-white">{district.village_panchayats_count}</strong>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Municipal Corporations & Municipalities</span>
                    <strong className="text-white">{district.local_bodies_count}</strong>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  Demographic Statistics
                </h3>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">2011 Census Population</span>
                    <strong className="text-white">{district.population_census_2011.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">2026 Projection Population</span>
                    <strong className="text-emerald-400">{district.population_projection_2026.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Area (Square Kilometers)</span>
                    <strong className="text-white">{district.area_sq_km.toLocaleString()} km²</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Delimitation Order</span>
                    <strong className="text-white">Delimitation Commission of India (2008)</strong>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">LGD Verification Status</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Assembly Constituencies */}
        {activeTab === 'acs' && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>
                Assembly Constituencies in <strong className="text-white">{district.district_name}</strong> ({constituencies.length} seats)
              </span>
              <span className="text-emerald-400 font-semibold">ECI 2026 Order</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3 text-center w-16">No.</th>
                    <th className="px-4 py-3">Constituency Name</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Sitting MLA</th>
                    <th className="px-4 py-3">Parliamentary Seat</th>
                    <th className="px-4 py-3 text-right">Official Gazette</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {constituencies.map((ac) => {
                    const member = mlas.find((m) => m.constituency_number === ac.constituency_number);
                    return (
                      <tr key={ac.constituency_id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="px-4 py-3 text-center font-mono font-bold text-slate-300">
                          {ac.constituency_number}
                        </td>
                        <td className="px-4 py-3 font-bold text-white">{ac.constituency_name}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ac.reservation_category === 'SC'
                                ? 'bg-amber-500/20 text-amber-300'
                                : ac.reservation_category === 'ST'
                                ? 'bg-purple-500/20 text-purple-300'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {ac.reservation_category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-emerald-300 font-semibold">
                          {member?.member_name || 'Official information not currently available'}
                        </td>
                        <td className="px-4 py-3 text-slate-300">{ac.parliamentary_constituency}</td>
                        <td className="px-4 py-3 text-right">
                          <a
                            href={ac.source_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-semibold"
                          >
                            ECI
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: MLAs */}
        {activeTab === 'mlas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mlas.map((m) => (
              <div
                key={m.member_id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 relative group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      Constituency #{m.constituency_number}
                    </span>
                    <h4 className="text-base font-extrabold text-white mt-0.5">{m.member_name}</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-900 text-emerald-400 border border-emerald-500/30">
                    {m.party}
                  </span>
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Constituency:</span>
                    <strong>{m.constituency_name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Term:</span>
                    <span>16th Assembly</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-emerald-400 font-semibold">{m.status}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate pr-2">{m.gazette_reference}</span>
                  <a
                    href={m.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
                  >
                    Verify
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Blocks / Panchayat Unions */}
        {activeTab === 'blocks' && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-4 py-3 border-b border-slate-800 text-xs text-slate-400">
              Panchayat Unions (Blocks) in <strong className="text-white">{district.district_name}</strong>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Block / Panchayat Union Name</th>
                    <th className="px-4 py-3">LGD Code</th>
                    <th className="px-4 py-3 text-center">Village Panchayats Count</th>
                    <th className="px-4 py-3">Source Department</th>
                    <th className="px-4 py-3 text-right">Official Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {blocks.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                        No rural blocks (Chennai District is 100% urban).
                      </td>
                    </tr>
                  ) : (
                    blocks.map((b) => (
                      <tr key={b.block_id} className="hover:bg-slate-900/60">
                        <td className="px-4 py-3 font-bold text-white">{b.block_name}</td>
                        <td className="px-4 py-3 font-mono text-slate-300">{b.official_code}</td>
                        <td className="px-4 py-3 text-center font-mono font-bold text-emerald-400">
                          {b.village_panchayats_count}
                        </td>
                        <td className="px-4 py-3 text-slate-300">{b.source_department}</td>
                        <td className="px-4 py-3 text-right">
                          <a
                            href={b.source_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-semibold"
                          >
                            TNRDPR
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
        )}

        {/* Tab 5: Village Panchayats & President Status (Rule #8) */}
        {activeTab === 'panchayats' && (
          <div className="space-y-4">
            <div className="bg-amber-950/40 border border-amber-500/30 p-3.5 rounded-xl text-xs text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Rule #8 Integrity:</strong> Village Panchayat President names are only displayed when verified from official published lists.
              </span>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Panchayat Name</th>
                      <th className="px-4 py-3">LGD Code</th>
                      <th className="px-4 py-3">Block</th>
                      <th className="px-4 py-3 text-center">Habitations</th>
                      <th className="px-4 py-3">President Information (Rule #8)</th>
                      <th className="px-4 py-3 text-right">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {villagePanchayats.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                          No village panchayats in this district (100% urban jurisdiction).
                        </td>
                      </tr>
                    ) : (
                      villagePanchayats.map((vp) => (
                        <tr key={vp.panchayat_id} className="hover:bg-slate-900/60">
                          <td className="px-4 py-3 font-bold text-white">{vp.panchayat_name}</td>
                          <td className="px-4 py-3 font-mono text-slate-300">{vp.official_code}</td>
                          <td className="px-4 py-3 text-slate-300">{vp.block_name}</td>
                          <td className="px-4 py-3 text-center font-mono font-bold text-slate-300">
                            {vp.habitations_count}
                          </td>
                          <td className="px-4 py-3">
                            {vp.president_name ? (
                              <span className="text-emerald-400 font-semibold">{vp.president_name}</span>
                            ) : (
                              <span className="text-amber-300/90 text-xs italic bg-amber-950/20 px-2 py-0.5 rounded border border-amber-500/20">
                                Current President information not available in the verified official dataset.
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <a
                              href={vp.source_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-semibold"
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
        )}

        {/* Tab 6: Habitations */}
        {activeTab === 'villages' && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Village / Habitation</th>
                    <th className="px-4 py-3">Classification</th>
                    <th className="px-4 py-3">Parent Panchayat</th>
                    <th className="px-4 py-3">Block</th>
                    <th className="px-4 py-3 text-right">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {habitations.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                        No rural habitations listed for this urban district.
                      </td>
                    </tr>
                  ) : (
                    habitations.map((vh) => (
                      <tr key={vh.village_id} className="hover:bg-slate-900/60">
                        <td className="px-4 py-3 font-bold text-white">{vh.village_name}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300">
                            {vh.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-300">{vh.panchayat_name}</td>
                        <td className="px-4 py-3 text-slate-300">{vh.block_name}</td>
                        <td className="px-4 py-3 text-right">
                          <a
                            href={vh.source_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-semibold"
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
        )}

        {/* Tab 7: Local Bodies (Corporations, Municipalities, Town Panchayats) */}
        {activeTab === 'localbodies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {localBodies.map((lb) => (
              <div
                key={lb.body_id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2 group hover:border-emerald-500/40 transition-all"
              >
                <div className="flex items-start justify-between">
                  <h4 className="text-base font-extrabold text-white">{lb.name}</h4>
                  <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                    {lb.wards_count} Wards
                  </span>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Classification:</span>
                    <strong>{lb.type}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tier:</span>
                    <span className="text-emerald-400 font-semibold">{lb.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Elected Head:</span>
                    <span className="text-amber-300 font-semibold">{lb.head_title}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>LGD: {lb.official_code}</span>
                  <a
                    href={lb.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
                  >
                    Verify
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 8: Elected Representatives */}
        {activeTab === 'reps' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {representatives.length === 0 ? (
              <div className="col-span-full bg-slate-950 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
                Official gazetted local-body head list for this district pending next statutory update.
              </div>
            ) : (
              representatives.map((r) => (
                <div
                  key={r.rep_id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2 group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-400">{r.position}</span>
                      <h4 className="text-base font-extrabold text-white">{r.name}</h4>
                    </div>
                    <span className="text-xs font-bold text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                      {r.party}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Local Body:</span>
                      <strong>{r.local_body_name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Term:</span>
                      <span>{r.term_start} – {r.term_end}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate pr-2">{r.official_gazette_notification}</span>
                    <a
                      href={r.source_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
                    >
                      TNSEC
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 9: Official Sources */}
        {activeTab === 'sources' && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">District Data Attributions & Sources</h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                <span className="text-emerald-400 font-bold block">1. District Official Portal</span>
                <p>Website: <a href={district.official_website} target="_blank" rel="noreferrer" className="text-emerald-400 underline">{district.official_website}</a></p>
                <p className="text-slate-400">Administered by National Informatics Centre (NIC) and District Collectorate.</p>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                <span className="text-blue-400 font-bold block">2. Delimitation & Electoral Roll Dataset</span>
                <p>Delimitation Commission of India & Election Commission of India (elections.tn.gov.in).</p>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                <span className="text-amber-400 font-bold block">3. Local Body & Panchayat Raj Directorate</span>
                <p>Tamil Nadu Rural Development & Panchayat Raj Department (tnrd.tn.gov.in) and TNSEC (tnsec.tn.gov.in).</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
