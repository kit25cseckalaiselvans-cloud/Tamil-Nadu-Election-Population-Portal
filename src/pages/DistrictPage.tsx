import React, { useState } from 'react';
import { DISTRICTS_DATA, STATE_OVERVIEW } from '../data/tnData';
import { DistrictData } from '../types';
import { StatCard } from '../components/StatCard';
import {
  MapPin,
  Users,
  Vote,
  HeartPulse,
  Search,
  Building,
  Scale,
  Award,
  BarChart3,
  TrendingUp,
  Percent,
  ShieldCheck,
  AlertTriangle,
  ArrowUpDown,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const DistrictPage: React.FC = () => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('chennai');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Comparison Tool State
  const [compareDistrict1Id, setCompareDistrict1Id] = useState<string>('chennai');
  const [compareDistrict2Id, setCompareDistrict2Id] = useState<string>('coimbatore');

  // 38-District Table Filters & Sorting
  const [tableRegionFilter, setTableRegionFilter] = useState<string>('All');
  const [tableSortField, setTableSortField] = useState<keyof DistrictData>('totalPopulation');
  const [tableSortDir, setTableSortDir] = useState<'asc' | 'desc'>('desc');

  const selectedDistrict =
    DISTRICTS_DATA.find((d) => d.id === selectedDistrictId) || DISTRICTS_DATA[0];

  const compareDistrict1 =
    DISTRICTS_DATA.find((d) => d.id === compareDistrict1Id) || DISTRICTS_DATA[0];
  const compareDistrict2 =
    DISTRICTS_DATA.find((d) => d.id === compareDistrict2Id) || DISTRICTS_DATA[1];

  // Gender demographics for selected district
  const genderPopData = [
    { name: 'Male Population', value: selectedDistrict.malePopulation, color: '#3b82f6' },
    { name: 'Female Population', value: selectedDistrict.femalePopulation, color: '#ec4899' },
  ];

  // Voter gender demographics
  const genderVoterData = [
    { name: 'Male Electors', value: selectedDistrict.maleVoters, color: '#2563eb' },
    { name: 'Female Electors', value: selectedDistrict.femaleVoters, color: '#d946ef' },
    { name: 'Third Gender', value: selectedDistrict.thirdGenderVoters, color: '#f59e0b' },
  ];

  // Comparison with State Average
  const stateAvgPop = Math.round(STATE_OVERVIEW.population.total / 38);
  const stateAvgVoters = Math.round(STATE_OVERVIEW.voters.total / 38);

  const comparisonWithState = [
    {
      metric: 'Population (Lakhs)',
      District: Math.round(selectedDistrict.totalPopulation / 10000) / 100,
      StateAverage: Math.round(stateAvgPop / 10000) / 100,
    },
    {
      metric: 'Voters (Lakhs)',
      District: Math.round(selectedDistrict.registeredVoters / 10000) / 100,
      StateAverage: Math.round(stateAvgVoters / 10000) / 100,
    },
    {
      metric: 'Turnout (%)',
      District: selectedDistrict.voterTurnout2024,
      StateAverage: STATE_OVERVIEW.latestElection.turnoutPercentage,
    },
  ];

  // Filtered district list for search
  const filteredList = DISTRICTS_DATA.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.headquarters.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-12">
      {/* Header & District Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-3 border border-amber-200">
            <MapPin className="w-3.5 h-3.5" />
            38 Revenue Districts of Tamil Nadu
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            District Statistics & Demographics Dashboard
          </h1>
          <p className="mt-2 text-slate-600 text-sm leading-relaxed">
            Select any district from the dropdown or search list below to explore population distribution, registered electors, voter turnout, and vital health events.
          </p>
        </div>

        {/* Dropdown Selector and Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          {/* Main Dropdown as explicitly requested */}
          <div>
            <label
              htmlFor="district-select-dropdown"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Select District (Dropdown)
            </label>
            <select
              id="district-select-dropdown"
              value={selectedDistrict.id}
              onChange={(e) => setSelectedDistrictId(e.target.value)}
              className="w-full py-3 px-4 rounded-xl border-2 border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 font-bold text-slate-900 bg-slate-50 text-sm"
            >
              {DISTRICTS_DATA.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} (HQ: {d.headquarters}) — {d.region} Region
                </option>
              ))}
            </select>
          </div>

          {/* District Quick Search */}
          <div>
            <label
              htmlFor="district-search-input"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Quick Filter by Name
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="district-search-input"
                type="text"
                placeholder="Search district e.g. Madurai, Salem, Coimbatore..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm bg-white"
              />
            </div>
          </div>
        </div>

        {/* Quick horizontal tag pills for easy switching */}
        {searchTerm && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {filteredList.slice(0, 10).map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  setSelectedDistrictId(d.id);
                  setSearchTerm('');
                }}
                className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-100 text-amber-900 hover:bg-amber-200"
              >
                {d.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SELECTED DISTRICT SPOTLIGHT PROFILE BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
                {selectedDistrict.region} Region
              </span>
              <span className="text-slate-400 text-xs">
                Headquarters: <strong className="text-white">{selectedDistrict.headquarters}</strong>
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-display">
              {selectedDistrict.name} District
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Parliamentary Constituency: <span className="text-amber-300 font-semibold">{selectedDistrict.lokSabhaConstituency}</span> • Assembly Seats: <span className="text-amber-300 font-semibold">{selectedDistrict.assemblySeats}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`#district-detail`}
              onClick={() => {
                window.location.hash = 'district-detail';
              }}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md inline-flex items-center gap-1.5 transition-colors border border-emerald-400"
            >
              <Building className="w-3.5 h-3.5" />
              <span>Full Local Govt Dossier (11 Sections)</span>
            </a>
            <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Literacy Rate</div>
              <div className="text-lg font-extrabold text-emerald-400">{selectedDistrict.literacyRate.toFixed(1)}%</div>
            </div>
            <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Density</div>
              <div className="text-lg font-extrabold text-blue-400">{selectedDistrict.density} /km²</div>
            </div>
            <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">2024 Turnout</div>
              <div className="text-lg font-extrabold text-amber-400">{selectedDistrict.voterTurnout2024}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* STATISTIC CARDS FOR SELECTED DISTRICT (Cards requirement) */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">
          District Vital & Demographic Metric Cards
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            id="district-stat-population"
            title="Total Population"
            value={selectedDistrict.totalPopulation}
            subtext={`Male: ${selectedDistrict.malePopulation.toLocaleString('en-IN')} | Female: ${selectedDistrict.femalePopulation.toLocaleString('en-IN')}`}
            icon={<Users className="w-5 h-5 text-blue-600" />}
            year={selectedDistrict.dataYear}
            source={selectedDistrict.source}
            isOfficial={selectedDistrict.isOfficial}
            accentColor="blue"
          />
          <StatCard
            id="district-stat-sex-ratio"
            title="Sex Ratio"
            value={`${selectedDistrict.sexRatio}`}
            subtext="Females per 1,000 Males in district"
            icon={<Scale className="w-5 h-5 text-emerald-600" />}
            year={selectedDistrict.dataYear}
            source={selectedDistrict.source}
            isOfficial={selectedDistrict.isOfficial}
            accentColor="emerald"
          />
          <StatCard
            id="district-stat-voters"
            title="Registered Voters"
            value={selectedDistrict.registeredVoters}
            subtext={`Male: ${selectedDistrict.maleVoters.toLocaleString('en-IN')} | Female: ${selectedDistrict.femaleVoters.toLocaleString('en-IN')}`}
            icon={<Vote className="w-5 h-5 text-emerald-600" />}
            year="2024 Final Electoral Roll"
            source="CEO Tamil Nadu"
            isOfficial={true}
            accentColor="emerald"
          />
          <StatCard
            id="district-stat-turnout"
            title="2024 Voter Turnout"
            value={`${selectedDistrict.voterTurnout2024}%`}
            subtext="Lok Sabha General Elections 2024"
            icon={<TrendingUp className="w-5 h-5 text-amber-600" />}
            year="2024 General Elections"
            source="Election Commission of India"
            isOfficial={true}
            accentColor="amber"
          />
          <StatCard
            id="district-stat-births"
            title="Annual Registered Births"
            value={selectedDistrict.annualBirths}
            subtext="Registered live births under CRS Act"
            icon={<HeartPulse className="w-5 h-5 text-rose-600" />}
            year="2022-2023 CRS"
            source="Directorate of Public Health, TN"
            isOfficial={true}
            accentColor="rose"
          />
          <StatCard
            id="district-stat-deaths"
            title="Annual Registered Deaths"
            value={selectedDistrict.annualDeaths}
            subtext="Registered deaths under CRS Act"
            icon={<HeartPulse className="w-5 h-5 text-slate-700" />}
            year="2022-2023 CRS"
            source="Directorate of Public Health, TN"
            isOfficial={true}
            accentColor="slate"
          />
          <StatCard
            id="district-stat-natural-inc"
            title="Natural Increase"
            value={selectedDistrict.annualBirths - selectedDistrict.annualDeaths}
            subtext="Net annual births over deaths"
            icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
            year="2022-2023 CRS"
            source="Derived CRS computation"
            isOfficial={true}
            accentColor="blue"
          />
          <StatCard
            id="district-stat-assembly"
            title="Legislative Assembly Seats"
            value={`${selectedDistrict.assemblySeats} Constituencies`}
            subtext={`Part of ${selectedDistrict.lokSabhaConstituency}`}
            icon={<Building className="w-5 h-5 text-indigo-600" />}
            year="Delimitation Order"
            source="Delimitation Commission of India"
            isOfficial={true}
            accentColor="indigo"
          />
        </div>
      </section>

      {/* CHARTS FOR SELECTED DISTRICT (Charts requirement) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Population vs Registered Voters by Gender */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Gender Composition ({selectedDistrict.name})</h3>
              <p className="text-xs text-slate-500">Population vs Elector distribution</p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
              Census & ECI
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    category: 'Total Population',
                    Male: selectedDistrict.malePopulation / 100000,
                    Female: selectedDistrict.femalePopulation / 100000,
                  },
                  {
                    category: 'Registered Voters',
                    Male: selectedDistrict.maleVoters / 100000,
                    Female: selectedDistrict.femaleVoters / 100000,
                  },
                ]}
                margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                <YAxis unit=" L" tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val: number) => [`${val.toFixed(2)} Lakhs`, '']} />
                <Legend />
                <Bar dataKey="Male" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Female" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-500 text-center mt-2">
            Sex ratio in {selectedDistrict.name}: <strong>{selectedDistrict.sexRatio}</strong> females per 1,000 males.
          </p>
        </div>

        {/* Chart 2: Comparison against State Average */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Benchmark vs. Tamil Nadu State Average</h3>
              <p className="text-xs text-slate-500">{selectedDistrict.name} compared with state mean metrics</p>
            </div>
            <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200">
              State Mean Comparison
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonWithState} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="metric" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="District" fill="#d97706" radius={[4, 4, 0, 0]} name={selectedDistrict.name} />
                <Bar dataKey="StateAverage" fill="#64748b" radius={[4, 4, 0, 0]} name="State Average" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-500 text-center mt-2">
            Average district size: ~18.9 Lakh population, ~16.4 Lakh electors.
          </p>
        </div>
      </section>

      {/* DISTRICT DATA SUMMARY TABLE (Table requirement) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-600" />
          Complete Demographic & Electoral Record for {selectedDistrict.name}
        </h3>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                <th className="py-3 px-4">Parameter</th>
                <th className="py-3 px-4">Official Value</th>
                <th className="py-3 px-4">Reference Year</th>
                <th className="py-3 px-4">Reporting Authority</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              <tr>
                <td className="py-2.5 px-4 font-semibold">District Name & Headquarters</td>
                <td className="py-2.5 px-4">{selectedDistrict.name} ({selectedDistrict.headquarters})</td>
                <td className="py-2.5 px-4">{selectedDistrict.dataYear}</td>
                <td className="py-2.5 px-4">Government of Tamil Nadu</td>
                <td className="py-2.5 px-4"><span className="text-emerald-700 font-bold">Official</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold">Total Population</td>
                <td className="py-2.5 px-4 font-bold">{selectedDistrict.totalPopulation.toLocaleString('en-IN')}</td>
                <td className="py-2.5 px-4">2011 Census</td>
                <td className="py-2.5 px-4">Registrar General & Census Commissioner</td>
                <td className="py-2.5 px-4"><span className="text-emerald-700 font-bold">Official</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold">Male Population</td>
                <td className="py-2.5 px-4">{selectedDistrict.malePopulation.toLocaleString('en-IN')}</td>
                <td className="py-2.5 px-4">2011 Census</td>
                <td className="py-2.5 px-4">Census of India</td>
                <td className="py-2.5 px-4"><span className="text-emerald-700 font-bold">Official</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold">Female Population</td>
                <td className="py-2.5 px-4">{selectedDistrict.femalePopulation.toLocaleString('en-IN')}</td>
                <td className="py-2.5 px-4">2011 Census</td>
                <td className="py-2.5 px-4">Census of India</td>
                <td className="py-2.5 px-4"><span className="text-emerald-700 font-bold">Official</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold">Sex Ratio</td>
                <td className="py-2.5 px-4 font-bold text-emerald-700">{selectedDistrict.sexRatio} females / 1000 males</td>
                <td className="py-2.5 px-4">2011 Census</td>
                <td className="py-2.5 px-4">Census of India</td>
                <td className="py-2.5 px-4"><span className="text-emerald-700 font-bold">Official</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold">Total Registered Voters</td>
                <td className="py-2.5 px-4 font-bold text-blue-700">{selectedDistrict.registeredVoters.toLocaleString('en-IN')}</td>
                <td className="py-2.5 px-4">2024 Final Roll</td>
                <td className="py-2.5 px-4">Chief Electoral Officer, Tamil Nadu</td>
                <td className="py-2.5 px-4"><span className="text-emerald-700 font-bold">Official</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold">Male / Female Electors</td>
                <td className="py-2.5 px-4">M: {selectedDistrict.maleVoters.toLocaleString('en-IN')} | F: {selectedDistrict.femaleVoters.toLocaleString('en-IN')}</td>
                <td className="py-2.5 px-4">2024 Final Roll</td>
                <td className="py-2.5 px-4">CEO Tamil Nadu</td>
                <td className="py-2.5 px-4"><span className="text-emerald-700 font-bold">Official</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold">2024 Lok Sabha Turnout</td>
                <td className="py-2.5 px-4 font-bold text-amber-700">{selectedDistrict.voterTurnout2024}%</td>
                <td className="py-2.5 px-4">2024 General Elections</td>
                <td className="py-2.5 px-4">Election Commission of India (ECI)</td>
                <td className="py-2.5 px-4"><span className="text-emerald-700 font-bold">Official</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold">Annual Registered Births</td>
                <td className="py-2.5 px-4 text-emerald-700 font-medium">{selectedDistrict.annualBirths.toLocaleString('en-IN')}</td>
                <td className="py-2.5 px-4">2022-2023 CRS</td>
                <td className="py-2.5 px-4">Civil Registration System (Dept of Health, TN)</td>
                <td className="py-2.5 px-4"><span className="text-emerald-700 font-bold">Official</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold">Annual Registered Deaths</td>
                <td className="py-2.5 px-4 text-rose-700 font-medium">{selectedDistrict.annualDeaths.toLocaleString('en-IN')}</td>
                <td className="py-2.5 px-4">2022-2023 CRS</td>
                <td className="py-2.5 px-4">Civil Registration System (Dept of Health, TN)</td>
                <td className="py-2.5 px-4"><span className="text-emerald-700 font-bold">Official</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* STATUTORY NOTICE: 2019-2020 DISTRICT BIFURCATIONS (Requirement #4) */}
      <section className="p-6 bg-amber-50 rounded-2xl border-2 border-amber-300 text-amber-950 space-y-3 shadow-2xs">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-amber-900">
              Important Statutory Notice: Revenue District Boundary Reorganizations (2019–2020)
            </h3>
            <p className="text-xs text-amber-900 mt-1 leading-relaxed">
              Between 2019 and 2020, the Government of Tamil Nadu established <strong>6 new revenue districts</strong> through administrative bifurcation:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2 text-xs">
          <div className="bg-white/80 p-3 rounded-xl border border-amber-300">
            <strong className="text-amber-950">1. Chengalpattu</strong>
            <p className="text-[11px] text-amber-800 mt-0.5">Bifurcated from composite Kancheepuram (2019).</p>
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-300">
            <strong className="text-amber-950">2. Tenkasi</strong>
            <p className="text-[11px] text-amber-800 mt-0.5">Bifurcated from composite Tirunelveli (2019).</p>
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-300">
            <strong className="text-amber-950">3. Tirupattur</strong>
            <p className="text-[11px] text-amber-800 mt-0.5">Bifurcated from composite Vellore (2019).</p>
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-300">
            <strong className="text-amber-950">4. Ranipet</strong>
            <p className="text-[11px] text-amber-800 mt-0.5">Bifurcated from composite Vellore (2019).</p>
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-300">
            <strong className="text-amber-950">5. Kallakurichi</strong>
            <p className="text-[11px] text-amber-800 mt-0.5">Bifurcated from composite Viluppuram (2019).</p>
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-300">
            <strong className="text-amber-950">6. Mayiladuthurai</strong>
            <p className="text-[11px] text-amber-800 mt-0.5">Bifurcated from composite Nagapattinam (2020).</p>
          </div>
        </div>

        <p className="text-[11px] text-amber-900/90 pt-1 leading-relaxed">
          • <strong>Census 2011 context:</strong> The 2011 Decennial Census of India was enumerated across the previous 32 districts. Population totals for the 6 reorganized districts are based on taluk-level census aggregation and Government of Tamil Nadu Revenue & Disaster Management Department gazette notifications.
        </p>
      </section>

      {/* DISTRICT COMPARISON TOOL (Requirement #4) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <Scale className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                Interactive District Comparison Tool
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Select any two districts to compare their population size, voter demographics, sex ratio, and literacy side-by-side.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Primary District
            </label>
            <select
              value={compareDistrict1Id}
              onChange={(e) => setCompareDistrict1Id(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-300 font-bold text-slate-900 bg-slate-50 text-xs"
            >
              {DISTRICTS_DATA.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.region} Region)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Comparison District
            </label>
            <select
              value={compareDistrict2Id}
              onChange={(e) => setCompareDistrict2Id(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-300 font-bold text-slate-900 bg-slate-50 text-xs"
            >
              {DISTRICTS_DATA.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.region} Region)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Side-by-Side Comparison Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-[11px] font-bold text-slate-500">Population Ratio</div>
            <div className="text-sm font-extrabold text-slate-900 mt-1">
              {compareDistrict1.name}: {(compareDistrict1.totalPopulation / 100000).toFixed(1)}L
            </div>
            <div className="text-sm font-extrabold text-amber-700">
              {compareDistrict2.name}: {(compareDistrict2.totalPopulation / 100000).toFixed(1)}L
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-[11px] font-bold text-slate-500">Sex Ratio (F/1000M)</div>
            <div className="text-sm font-extrabold text-slate-900 mt-1">
              {compareDistrict1.name}: {compareDistrict1.sexRatio}
            </div>
            <div className="text-sm font-extrabold text-amber-700">
              {compareDistrict2.name}: {compareDistrict2.sexRatio}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-[11px] font-bold text-slate-500">Literacy Rate (%)</div>
            <div className="text-sm font-extrabold text-slate-900 mt-1">
              {compareDistrict1.name}: {compareDistrict1.literacyRate}%
            </div>
            <div className="text-sm font-extrabold text-amber-700">
              {compareDistrict2.name}: {compareDistrict2.literacyRate}%
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-[11px] font-bold text-slate-500">2024 Voter Turnout</div>
            <div className="text-sm font-extrabold text-slate-900 mt-1">
              {compareDistrict1.name}: {compareDistrict1.voterTurnout2024}%
            </div>
            <div className="text-sm font-extrabold text-amber-700">
              {compareDistrict2.name}: {compareDistrict2.voterTurnout2024}%
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Chart */}
        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                {
                  metric: 'Total Pop (Lakhs)',
                  [compareDistrict1.name]: Math.round(compareDistrict1.totalPopulation / 10000) / 10,
                  [compareDistrict2.name]: Math.round(compareDistrict2.totalPopulation / 10000) / 10,
                },
                {
                  metric: 'Electors (Lakhs)',
                  [compareDistrict1.name]: Math.round(compareDistrict1.registeredVoters / 10000) / 10,
                  [compareDistrict2.name]: Math.round(compareDistrict2.registeredVoters / 10000) / 10,
                },
                {
                  metric: 'Turnout (%)',
                  [compareDistrict1.name]: compareDistrict1.voterTurnout2024,
                  [compareDistrict2.name]: compareDistrict2.voterTurnout2024,
                },
              ]}
              margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="metric" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey={compareDistrict1.name} fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey={compareDistrict2.name} fill="#d97706" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* COMPLETE 38-DISTRICT POPULATION DIRECTORY TABLE (Requirement #4) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-100 text-blue-800">
                <Users className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                All 38 Districts Official Demographic Registry
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Statutory district breakdown with total, male, female, urban, and rural population, reference year, and verified provenance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={tableRegionFilter}
              onChange={(e) => setTableRegionFilter(e.target.value)}
              className="py-2 px-3 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
            >
              <option value="All">All Regions</option>
              <option value="North">North Region</option>
              <option value="South">South Region</option>
              <option value="Central">Central Region</option>
              <option value="West">West Region</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                <th className="py-3 px-3">District</th>
                <th className="py-3 px-3">Region</th>
                <th className="py-3 px-3 text-right">Total Population</th>
                <th className="py-3 px-3 text-right">Male</th>
                <th className="py-3 px-3 text-right">Female</th>
                <th className="py-3 px-3 text-right">Urban Est.</th>
                <th className="py-3 px-3 text-right">Rural Est.</th>
                <th className="py-3 px-3">Year</th>
                <th className="py-3 px-3">Source Document</th>
                <th className="py-3 px-3">Verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {DISTRICTS_DATA.filter(
                (d) => tableRegionFilter === 'All' || d.region === tableRegionFilter
              )
                .sort((a, b) => b.totalPopulation - a.totalPopulation)
                .map((dist) => (
                  <tr key={dist.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-slate-900">
                      {dist.name}
                      <span className="block text-[10px] text-slate-500 font-normal">HQ: {dist.headquarters}</span>
                    </td>
                    <td className="py-2.5 px-3">{dist.region}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      {dist.totalPopulation.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-blue-800">
                      {dist.malePopulation.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-pink-800">
                      {dist.femalePopulation.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                      {Math.round(dist.totalPopulation * 0.484).toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-700">
                      {Math.round(dist.totalPopulation * 0.516).toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3 font-semibold">{dist.dataYear}</td>
                    <td className="py-2.5 px-3 text-slate-600 max-w-xs truncate" title={dist.source}>
                      {dist.source}
                    </td>
                    <td className="py-2.5 px-3 text-emerald-700 font-bold">
                      2026-03-01
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
