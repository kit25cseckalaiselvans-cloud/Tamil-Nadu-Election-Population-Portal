import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { STATE_OVERVIEW, DISTRICTS_DATA } from '../data/tnData';
import { DistrictData, PageId, PopulationEstimate, PopulationHistoryEntry } from '../types';
import { StatCard } from '../components/StatCard';
import { TamilNaduMap } from '../components/TamilNaduMap';
import { PopulationCounter } from '../components/PopulationCounter';
import { PopulationCard } from '../components/PopulationCard';
import { PopulationChart } from '../components/PopulationChart';
import { PopulationHistory } from '../components/PopulationHistory';
import { Methodology } from '../components/Methodology';
import { DataSource } from '../components/DataSource';
import { YearlyPopulationDashboard } from '../components/YearlyPopulationDashboard';
import {
  calculatePopulationEstimate,
  getPopulationHistory,
} from '../services/populationService';
import {
  Users,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  Filter,
  PieChart as PieChartIcon,
  TrendingUp,
  Building,
  TreePine,
  MapPin,
  RefreshCw,
  X,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface PopulationPageProps {
  onNavigate?: (page: PageId) => void;
}

export const PopulationPage: React.FC<PopulationPageProps> = ({ onNavigate }) => {
  const { population } = STATE_OVERVIEW;

  // Active calculated estimate & 30-day history state
  const [estimate, setEstimate] = useState<PopulationEstimate>(() =>
    calculatePopulationEstimate(new Date())
  );
  const [history, setHistory] = useState<PopulationHistoryEntry[]>(() =>
    getPopulationHistory(30)
  );

  // Modal states for in-page quick inspection
  const [showMethodologyModal, setShowMethodologyModal] = useState(false);
  const [showDataSourceModal, setShowDataSourceModal] = useState(false);

  const refreshEstimate = useCallback(() => {
    setEstimate(calculatePopulationEstimate(new Date()));
    setHistory(getPopulationHistory(30));
  }, []);

  // Listen to configuration updates from admin panel or storage changes
  useEffect(() => {
    refreshEstimate();

    const handleConfigChange = () => {
      refreshEstimate();
    };

    window.addEventListener('tn_population_config_changed', handleConfigChange);
    return () => {
      window.removeEventListener('tn_population_config_changed', handleConfigChange);
    };
  }, [refreshEstimate]);

  // District filtering & sorting states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [sortField, setSortField] = useState<keyof DistrictData>('totalPopulation');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData>(DISTRICTS_DATA[0]);

  // Urban vs Rural data
  const urbanRuralData = [
    {
      name: 'Rural Population (51.6%)',
      value: Math.round(estimate.currentEstimatedPopulation * (population.ruralPercentage / 100)),
      color: '#10b981',
    },
    {
      name: 'Urban Population (48.4%)',
      value: Math.round(estimate.currentEstimatedPopulation * (population.urbanPercentage / 100)),
      color: '#3b82f6',
    },
  ];

  // Filtering & Sorting
  const filteredDistricts = useMemo(() => {
    return DISTRICTS_DATA.filter((district) => {
      const matchesSearch =
        district.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        district.headquarters.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRegion =
        selectedRegion === 'All' || district.region === selectedRegion;

      let matchesTier = true;
      if (selectedTier === '>30L') matchesTier = district.totalPopulation >= 3000000;
      else if (selectedTier === '20L-30L')
        matchesTier =
          district.totalPopulation >= 2000000 && district.totalPopulation < 3000000;
      else if (selectedTier === '10L-20L')
        matchesTier =
          district.totalPopulation >= 1000000 && district.totalPopulation < 2000000;
      else if (selectedTier === '<10L') matchesTier = district.totalPopulation < 1000000;

      return matchesSearch && matchesRegion && matchesTier;
    }).sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }
      return sortDirection === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [searchTerm, selectedRegion, selectedTier, sortField, sortDirection]);

  const handleSort = (field: keyof DistrictData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const exportCSV = () => {
    const headers =
      'District,Headquarters,Region,Total Population,Male,Female,Sex Ratio,Density (per sq km),Literacy Rate (%),Source\n';
    const rows = filteredDistricts
      .map(
        (d) =>
          `"${d.name}","${d.headquarters}","${d.region}",${d.totalPopulation},${d.malePopulation},${d.femalePopulation},${d.sexRatio},${d.density},${d.literacyRate},"${d.source}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'tamil_nadu_district_population_census.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Top Page Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-3 border border-blue-200">
              <Users className="w-3.5 h-3.5" />
              Census of India & Government of Tamil Nadu
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Tamil Nadu Population & Demographics
            </h1>
            <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
              Synthesizing official decennial census baselines with an automated daily mathematical projection system, detailed district demographics, urbanization metrics, and vital statistics across all 38 districts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
            {onNavigate && (
              <button
                onClick={() => onNavigate('population-history')}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all shadow-xs flex items-center gap-1.5"
                title="View Tamil Nadu Population – 2010 to 2026 Yearly Longitudinal Archive"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>2010–2026 History</span>
              </button>
            )}
            <button
              onClick={() => setShowMethodologyModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors border border-slate-300"
            >
              Methodology
            </button>
            <button
              onClick={() => setShowDataSourceModal(true)}
              className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold transition-colors border border-blue-200"
            >
              Data Source
            </button>
            {onNavigate && (
              <button
                onClick={() => onNavigate('admin')}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                title="Admin Population Configuration"
              >
                ⚙ Admin Panel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2010–2026 History Feature Banner */}
      {onNavigate && (
        <div className="bg-gradient-to-r from-amber-500/15 via-slate-900/5 to-amber-500/10 border-2 border-amber-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Tamil Nadu Population Archive: 2010 to 2026
              </h3>
              <p className="text-xs text-slate-600">
                Detailed 17-year longitudinal progression, interactive growth charts, male vs female comparison, and official source audit trail.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('population-history')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-xs"
          >
            <span>Explore 2010–2026 History</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Yearly Population Dashboard with 2010-2026 Selector and Official Notices */}
      <section id="yearly-population-selector-section">
        <YearlyPopulationDashboard />
      </section>

      {/* 1. LIVE COUNT-DOWN STYLE DISPLAY & AUTO-UPDATE (Requirements #1, #2, #3) */}
      <section id="population-counter-section">
        <PopulationCounter
          estimate={estimate}
          onRefresh={refreshEstimate}
          onOpenMethodology={() => setShowMethodologyModal(true)}
          onOpenDataSource={() => setShowDataSourceModal(true)}
        />
      </section>

      {/* 2. DEMOGRAPHIC INDICATOR DASHBOARD CARDS (Requirements #8, #11, #13) */}
      <section id="population-dashboard-cards">
        <PopulationCard
          estimate={estimate}
          onOpenMethodology={() => setShowMethodologyModal(true)}
          onOpenDataSource={() => setShowDataSourceModal(true)}
          onOpenAdmin={() => onNavigate && onNavigate('admin')}
        />
      </section>

      {/* 3. VISUALIZATION CHARTS & 30-DAY PROJECTIONS (Requirement #12) */}
      <section id="population-charts-section">
        <PopulationChart history={history} estimate={estimate} />
      </section>

      {/* 4. DAILY UPDATE LOG - 30 DAYS (Requirement #4) */}
      <section id="population-history-section">
        <PopulationHistory history={history} />
      </section>

      {/* 5. URBAN VS RURAL DISTRIBUTION & SUMMARY STATS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urban vs Rural Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Urbanization
              </span>
              <span>Census 2011 Ratio</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Rural vs Urban Distribution</h3>
            <p className="text-xs text-slate-600 mt-1">
              Tamil Nadu is the most urbanized major state in India with 48.4% urban population.
            </p>

            <div className="h-52 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={urbanRuralData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {urbanRuralData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => [
                      `${Number(value).toLocaleString('en-IN')} citizens`,
                      '',
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
              <div>
                <div className="font-semibold text-slate-900">Rural: 51.6%</div>
                <div className="text-[10px] text-slate-500">~3.72 Cr</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
              <div>
                <div className="font-semibold text-slate-900">Urban: 48.4%</div>
                <div className="text-[10px] text-slate-500">~3.49 Cr</div>
              </div>
            </div>
          </div>
        </div>

        {/* State Vital Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider text-[10px] text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Density & Literacy
              </span>
              <span>Key Benchmarks</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Demographic Vitality</h3>
            <p className="text-xs text-slate-600 mt-1">
              Statewide literacy and population density metrics.
            </p>

            <div className="mt-5 space-y-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-slate-700">Population Density</span>
                  <span className="font-extrabold text-slate-900 font-mono text-sm">
                    {population.density} / km²
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">
                  National Average: 382 / km² (Ranked #11 nationally)
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-slate-700">Decadal Growth Rate</span>
                  <span className="font-extrabold text-slate-900 font-mono text-sm">
                    {population.growthRate}%
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">
                  2001–2011 decadal census growth series
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-slate-700">Total Fertility Rate (TFR)</span>
                  <span className="font-extrabold text-emerald-700 font-mono text-sm">
                    ~1.4
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Below national replacement level (2.1) as per SRS reports
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic">
            Source: Registrar General of India Sample Registration System (SRS)
          </div>
        </div>

        {/* District Highlight Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between border border-slate-700">
          <div>
            <div className="flex items-center justify-between text-xs text-amber-300 mb-2">
              <span className="font-bold uppercase tracking-wider text-[10px] bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                District Spotlight
              </span>
              <span>{selectedDistrict.region} Region</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">{selectedDistrict.name}</h3>
            <div className="text-xs text-slate-400">Headquarters: {selectedDistrict.headquarters}</div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-700/60">
                <span className="text-slate-400">Census Population:</span>
                <span className="font-mono font-bold text-white">
                  {selectedDistrict.totalPopulation.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-700/60">
                <span className="text-slate-400">Sex Ratio:</span>
                <span className="font-mono font-bold text-emerald-400">
                  {selectedDistrict.sexRatio} females / 1000 males
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-700/60">
                <span className="text-slate-400">Literacy Rate:</span>
                <span className="font-mono font-bold text-amber-300">
                  {selectedDistrict.literacyRate}%
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-700/60">
                <span className="text-slate-400">Registered Electors:</span>
                <span className="font-mono font-bold text-blue-300">
                  {selectedDistrict.registeredVoters.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-2">
            {onNavigate && (
              <button
                onClick={() => onNavigate('districts')}
                className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors text-center"
              >
                Explore All 38 District Profiles →
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 6. DISTRICT POPULATION DIRECTORY TABLE WITH FILTERS & CSV EXPORT */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              38 District Census & Demographic Directory
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Official baseline counts across all administrative revenue districts of Tamil Nadu.
            </p>
          </div>

          <button
            id="btn-export-district-csv"
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-sm self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Export District CSV</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              id="district-search-input"
              type="text"
              placeholder="Search district or headquarters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 shrink-0 font-medium">Region:</span>
            <select
              id="district-region-select"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="All">All Regions (38)</option>
              <option value="Northern">Northern</option>
              <option value="Western">Western</option>
              <option value="Central">Central</option>
              <option value="Southern">Southern</option>
              <option value="Coastal">Coastal</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 shrink-0 font-medium">Size:</span>
            <select
              id="district-tier-select"
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="All">All Population Tiers</option>
              <option value=">30L">&gt; 30 Lakhs</option>
              <option value="20L-30L">20 Lakhs – 30 Lakhs</option>
              <option value="10L-20L">10 Lakhs – 20 Lakhs</option>
              <option value="<10L">&lt; 10 Lakhs</option>
            </select>
          </div>
        </div>

        {/* District Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <th
                  onClick={() => handleSort('name')}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>District</span>
                    {sortField === 'name' ? (
                      sortDirection === 'asc' ? (
                        <ArrowUp className="w-3 h-3 text-blue-600" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-blue-600" />
                      )
                    ) : (
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('totalPopulation')}
                  className="py-3 px-4 text-right cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Census Pop.</span>
                    {sortField === 'totalPopulation' ? (
                      sortDirection === 'asc' ? (
                        <ArrowUp className="w-3 h-3 text-blue-600" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-blue-600" />
                      )
                    ) : (
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 text-right text-slate-500">Male</th>
                <th className="py-3 px-4 text-right text-slate-500">Female</th>
                <th
                  onClick={() => handleSort('sexRatio')}
                  className="py-3 px-4 text-right cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Sex Ratio</span>
                    {sortField === 'sexRatio' ? (
                      sortDirection === 'asc' ? (
                        <ArrowUp className="w-3 h-3 text-blue-600" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-blue-600" />
                      )
                    ) : (
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 text-right text-slate-500 hidden md:table-cell">Density</th>
                <th className="py-3 px-4 text-right text-slate-500 hidden lg:table-cell">Literacy</th>
                <th className="py-3 px-4 text-center">Region</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredDistricts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500 font-sans">
                    No districts match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredDistricts.map((d, index) => (
                  <tr
                    key={d.id}
                    onClick={() => setSelectedDistrict(d)}
                    className={`cursor-pointer hover:bg-amber-50/60 transition-colors ${
                      selectedDistrict.id === d.id
                        ? 'bg-amber-50 font-semibold'
                        : index % 2 === 0
                        ? 'bg-white'
                        : 'bg-slate-50/40'
                    }`}
                  >
                    <td className="py-2.5 px-4 font-semibold text-slate-900 font-sans">
                      <div className="flex items-center gap-1.5">
                        <span>{d.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          ({d.headquarters})
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-900">
                      {d.totalPopulation.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-600">
                      {d.malePopulation.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-600">
                      {d.femalePopulation.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-4 text-right font-semibold">
                      <span
                        className={
                          d.sexRatio >= 1000 ? 'text-emerald-700 font-bold' : 'text-slate-800'
                        }
                      >
                        {d.sexRatio}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-600 hidden md:table-cell">
                      {d.density.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-4 text-right font-medium hidden lg:table-cell">
                      {d.literacyRate.toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-4 text-center font-sans">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {d.region}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 pt-2">
          <span>
            Total aggregated in view: {filteredDistricts.reduce((a, b) => a + b.totalPopulation, 0).toLocaleString('en-IN')} citizens
          </span>
          <span className="text-[11px] text-slate-400">
            Source: Primary Census Abstract (PCA), Census of India & Govt of Tamil Nadu Gazette
          </span>
        </div>
      </section>

      {/* MODAL: METHODOLOGY (Requirement #9) */}
      {showMethodologyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl">
            <Methodology
              estimate={estimate}
              onClose={() => setShowMethodologyModal(false)}
            />
          </div>
        </div>
      )}

      {/* MODAL: DATA SOURCE (Requirement #10) */}
      {showDataSourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl">
            <DataSource
              estimate={estimate}
              onClose={() => setShowDataSourceModal(false)}
              onOpenAdmin={() => {
                setShowDataSourceModal(false);
                if (onNavigate) onNavigate('admin');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
