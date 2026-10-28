import React, { useState } from 'react';
import { PageId } from '../types';
import { DISTRICTS_RECORDS, LOCAL_BODIES_RECORDS, ASSEMBLY_CONSTITUENCY_RECORDS } from '../data/localGovernmentData';
import {
  Landmark,
  Building2,
  Users,
  Vote,
  MapPin,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Award,
  BookOpen,
  Scale,
  Compass,
} from 'lucide-react';

interface TamilNaduPageProps {
  onNavigate: (page: PageId) => void;
  onSelectDistrict?: (districtId: string) => void;
}

export const TamilNaduPage: React.FC<TamilNaduPageProps> = ({ onNavigate, onSelectDistrict }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'structure' | 'history' | 'reorganisation'>('overview');

  const totalDistricts = DISTRICTS_RECORDS.length;
  const totalACs = ASSEMBLY_CONSTITUENCY_RECORDS.length;
  const totalCorps = LOCAL_BODIES_RECORDS.filter((b) => b.type === 'Municipal Corporation').length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Statutory Verification Notice */}
        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-emerald-200">
                Official State Government Administrative Directory (Tamil Nadu)
              </h2>
              <p className="text-xs text-slate-300">
                All data sourced from official Tamil Nadu Government Gazettes, TNRDPR, ECI, and TNSEC publications.
              </p>
            </div>
          </div>
          <a
            href="https://www.tn.gov.in"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-600/40 transition-colors"
          >
            tn.gov.in
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
              <Landmark className="w-3.5 h-3.5" />
              State Administrative Profile 2026
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              State of Tamil Nadu <span className="text-emerald-400">(தமிழ்நாடு)</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Tamil Nadu is the tenth largest Indian state by area and the sixth largest by population. With an
              urbanization rate exceeding 48.4%, it possesses one of the most structured two-tier and three-tier
              governance frameworks in India, spanning 38 Revenue Districts, 234 Legislative Assembly Constituencies,
              and 12,525 Village Panchayats.
            </p>

            {/* Core Metrics Quick Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                <span className="text-xs text-slate-400">Districts</span>
                <p className="text-xl sm:text-2xl font-black text-white">{totalDistricts}</p>
                <span className="text-[10px] text-emerald-400 font-semibold">100% Verified LGD</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                <span className="text-xs text-slate-400">Assembly Seats</span>
                <p className="text-xl sm:text-2xl font-black text-amber-400">{totalACs}</p>
                <span className="text-[10px] text-slate-400">234 Constituencies</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                <span className="text-xs text-slate-400">Panchayat Unions</span>
                <p className="text-xl sm:text-2xl font-black text-blue-400">388</p>
                <span className="text-[10px] text-slate-400">Blocks in 37 Rural Districts</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                <span className="text-xs text-slate-400">Village Panchayats</span>
                <p className="text-xl sm:text-2xl font-black text-teal-400">12,525</p>
                <span className="text-[10px] text-slate-400">Rural Local Bodies</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 overflow-x-auto gap-2">
          {[
            { id: 'overview', label: 'Governance Overview' },
            { id: 'structure', label: 'Administrative Structure' },
            { id: 'reorganisation', label: 'District Reorganisations (2019–2020)' },
            { id: 'history', label: 'Historical Gazette Context' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 font-bold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10 rounded-t-xl'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Landmark className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Legislative Assembly</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Unicameral legislature with 234 elected members representing 234 territorial constituencies across the
                  38 districts. Plus 39 Members of Parliament in the Lok Sabha and 18 in the Rajya Sabha.
                </p>
                <button
                  onClick={() => onNavigate('assembly-constituencies')}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-emerald-400 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
                >
                  Explore 234 Constituencies &rarr;
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Urban Governance (ULBs)</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Comprises 21 City Municipal Corporations headed by Mayors, 138 Municipalities headed by Municipal
                  Chairpersons, and 490 Town Panchayats headed by Town Panchayat Presidents.
                </p>
                <button
                  onClick={() => onNavigate('local-government')}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-teal-400 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
                >
                  View Urban Local Bodies &rarr;
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Rural Governance (PRIs)</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  3-Tier Panchayati Raj institution: 37 District Panchayats (covering all 37 rural districts; Chennai is 100%
                  urban), 388 Panchayat Unions (Block tier), and 12,525 Village Panchayats (Grassroots tier) governing over 79,000 habitations.
                </p>
                <button
                  onClick={() => onNavigate('village-panchayats')}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
                >
                  View Village Panchayats &rarr;
                </button>
              </div>
            </div>

            {/* Quick District Grid Access */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">All 38 Districts of Tamil Nadu</h3>
                  <p className="text-xs text-slate-400">Click any district to view its full administrative dossier</p>
                </div>
                <button
                  onClick={() => onNavigate('districts')}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300"
                >
                  View Full Directory &rarr;
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {DISTRICTS_RECORDS.map((d) => (
                  <button
                    key={d.district_id}
                    onClick={() => {
                      if (onSelectDistrict) onSelectDistrict(d.district_id);
                      onNavigate('districts');
                    }}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 text-left transition-all group"
                  >
                    <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 truncate">
                      {d.district_name}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center justify-between mt-1">
                      <span>LGD: {d.official_code}</span>
                      <span className="text-emerald-400">{d.assembly_constituencies_count} ACs</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'structure' && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-white">Administrative Hierarchy of Tamil Nadu</h3>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Level 1: State Government</span>
                <p>
                  Constitutional head: Governor. Head of Government: Chief Minister and Council of Ministers.
                  Chief Secretary leads the civil administration via the Secretariat in Fort St. George, Chennai.
                </p>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Level 2: Revenue Administration (38 Districts)</span>
                <p>
                  Headed by District Collectors (IAS). Subdivided into Revenue Divisions under Sub-Collectors / RDOs,
                  Taluks under Tahsildars, Firkas under Revenue Inspectors, and Revenue Villages under Village Administrative Officers (VAOs).
                </p>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Level 3: Local Self-Government (Urban & Rural)</span>
                <p>
                  <strong>Urban:</strong> 21 City Municipal Corporations, 138 Municipalities, and 490 Town Panchayats.
                  <br />
                  <strong>Rural:</strong> 37 District Panchayats (across 37 Rural Districts; Chennai has 0 rural bodies), 388 Panchayat Unions (Blocks), and 12,525 Village Panchayats.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reorganisation' && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white">District Formations & Bifurcations (2019–2020)</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Between 2019 and 2020, the Government of Tamil Nadu carried out administrative re-organizations to improve
              public service delivery, creating six new districts:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1 text-xs">
                <span className="font-bold text-emerald-400">Chengalpattu (LGD 729)</span>
                <p className="text-slate-300">Carved out of Kancheepuram District via G.O. Ms. No. 428.</p>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1 text-xs">
                <span className="font-bold text-emerald-400">Tenkasi (LGD 732)</span>
                <p className="text-slate-300">Carved out of Tirunelveli District via G.O. Ms. No. 426.</p>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1 text-xs">
                <span className="font-bold text-emerald-400">Tirupathur (LGD 734)</span>
                <p className="text-slate-300">Carved out of Vellore District via G.O. Ms. No. 427.</p>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1 text-xs">
                <span className="font-bold text-emerald-400">Ranipet (LGD 731)</span>
                <p className="text-slate-300">Carved out of Vellore District via G.O. Ms. No. 427.</p>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1 text-xs">
                <span className="font-bold text-emerald-400">Kallakurichi (LGD 730)</span>
                <p className="text-slate-300">Carved out of Viluppuram District via G.O. Ms. No. 423.</p>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1 text-xs">
                <span className="font-bold text-emerald-400">Mayiladuthurai (LGD 733)</span>
                <p className="text-slate-300">38th District, carved out of Nagapattinam District via G.O. Ms. No. 367.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white">Historical Context & Gazette Record</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tamil Nadu was formerly known as Madras State. On 14 January 1969, under the leadership of Chief Minister
              C. N. Annadurai and the approval of the Government of India, the state was officially renamed Tamil Nadu.
              Its legislative traditions date back to the Madras Legislative Council formed in 1861 under the Indian
              Councils Act.
            </p>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300">
              <span className="font-bold text-emerald-400">Data Preservation Mandate:</span> All administrative records
              in this portal are versioned and tied directly to official Gazette citations to ensure compliance with
              statutory data integrity mandates.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
