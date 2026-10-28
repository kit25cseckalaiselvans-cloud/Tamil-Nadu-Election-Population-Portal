import React, { useState, useMemo } from 'react';
import { PageId, AssemblyConstituency } from '../types';
import {
  ASSEMBLY_CONSTITUENCIES,
  ALL_DISTRICT_NAMES,
  getDistrictWiseAssemblyData,
  ASSEMBLY_SUMMARY_METRICS,
  OFFICIAL_DATA_METADATA,
} from '../data/assemblyConstituenciesData';
import { AssemblyConstituencyModal } from '../components/AssemblyConstituencyModal';
import {
  Search,
  Building2,
  Users,
  Shield,
  Award,
  ChevronRight,
  ChevronDown,
  Filter,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Info,
  BarChart2,
  Grid,
  List,
  FolderTree,
  RotateCcw,
  Sparkles,
  Landmark,
  FileText,
  HelpCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts';

interface AssemblySeatsPageProps {
  onNavigate?: (page: PageId) => void;
}

type ViewMode = 'tree' | 'grid' | 'table';
type TypeFilter = 'ALL' | 'General' | 'SC' | 'ST';

export const AssemblySeatsPage: React.FC<AssemblySeatsPageProps> = ({ onNavigate }) => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('ALL');
  const [viewMode, setViewMode] = useState<ViewMode>('tree');
  const [chartSortBy, setChartSortBy] = useState<'seats' | 'alpha'>('seats');
  const [selectedConstituency, setSelectedConstituency] = useState<AssemblyConstituency | null>(null);

  // Expanded districts in tree view
  const [expandedDistricts, setExpandedDistricts] = useState<Record<string, boolean>>(() => {
    // Default open Chennai and Tiruvallur
    const initial: Record<string, boolean> = {};
    ALL_DISTRICT_NAMES.forEach((d) => {
      initial[d] = false;
    });
    initial['Chennai'] = true;
    initial['Coimbatore'] = true;
    initial['Madurai'] = true;
    initial['Salem'] = true;
    return initial;
  });

  const toggleDistrict = (districtName: string) => {
    setExpandedDistricts((prev) => ({
      ...prev,
      [districtName]: !prev[districtName],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    ALL_DISTRICT_NAMES.forEach((d) => {
      all[d] = true;
    });
    setExpandedDistricts(all);
  };

  const collapseAll = () => {
    const all: Record<string, boolean> = {};
    ALL_DISTRICT_NAMES.forEach((d) => {
      all[d] = false;
    });
    setExpandedDistricts(all);
  };

  // Filtered constituencies
  const filteredConstituencies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return ASSEMBLY_CONSTITUENCIES.filter((ac) => {
      // District filter
      if (selectedDistrict !== 'ALL' && ac.district !== selectedDistrict) {
        return false;
      }

      // Type filter
      if (typeFilter !== 'ALL' && ac.type !== typeFilter) {
        return false;
      }

      // Search query: match name, number, district, mla, party
      if (query) {
        const matchesName = ac.name.toLowerCase().includes(query);
        const matchesNumber = ac.number.toString() === query || ac.number.toString().includes(query);
        const matchesDistrict = ac.district.toLowerCase().includes(query);
        const matchesMla = ac.mla.toLowerCase().includes(query);
        const matchesParty = ac.party.toLowerCase().includes(query);
        return matchesName || matchesNumber || matchesDistrict || matchesMla || matchesParty;
      }

      return true;
    });
  }, [searchQuery, selectedDistrict, typeFilter]);

  // District-wise groups for filtered data
  const filteredDistrictGroups = useMemo(() => {
    const map = new Map<string, AssemblyConstituency[]>();

    filteredConstituencies.forEach((ac) => {
      const list = map.get(ac.district);
      if (list) {
        list.push(ac);
      } else {
        map.set(ac.district, [ac]);
      }
    });

    const groups: {
      districtName: string;
      totalSeats: number;
      generalSeats: number;
      scSeats: number;
      stSeats: number;
      constituencies: AssemblyConstituency[];
    }[] = [];

    map.forEach((constituencies, districtName) => {
      const sorted = constituencies.sort((a, b) => a.number - b.number);
      groups.push({
        districtName,
        totalSeats: sorted.length,
        generalSeats: sorted.filter((c) => c.type === 'General').length,
        scSeats: sorted.filter((c) => c.type === 'SC').length,
        stSeats: sorted.filter((c) => c.type === 'ST').length,
        constituencies: sorted,
      });
    });

    return groups.sort((a, b) => a.districtName.localeCompare(b.districtName));
  }, [filteredConstituencies]);

  // Chart data: all 38 districts
  const districtChartData = useMemo(() => {
    const allGroups = getDistrictWiseAssemblyData();
    const formatted = allGroups.map((g) => ({
      district: g.districtName,
      seats: g.totalSeats,
      general: g.generalSeats,
      sc: g.scSeats,
      st: g.stSeats,
    }));

    if (chartSortBy === 'seats') {
      return formatted.sort((a, b) => b.seats - a.seats || a.district.localeCompare(b.district));
    }
    return formatted.sort((a, b) => a.district.localeCompare(b.district));
  }, [chartSortBy]);

  // Reservation pie chart data
  const reservationChartData = useMemo(() => {
    return [
      { name: 'General', value: ASSEMBLY_SUMMARY_METRICS.generalSeats, color: '#10b981' },
      { name: 'Reserved SC', value: ASSEMBLY_SUMMARY_METRICS.scReservedSeats, color: '#3b82f6' },
      { name: 'Reserved ST', value: ASSEMBLY_SUMMARY_METRICS.stReservedSeats, color: '#8b5cf6' },
    ];
  }, []);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDistrict('ALL');
    setTypeFilter('ALL');
  };

  const getBadgeForType = (type: 'General' | 'SC' | 'ST') => {
    switch (type) {
      case 'SC':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <Shield className="w-3 h-3 text-blue-600" />
            SC Reserved
          </span>
        );
      case 'ST':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
            <Shield className="w-3 h-3 text-purple-600" />
            ST Reserved
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Award className="w-3 h-3 text-emerald-600" />
            General
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 font-medium">
        <button
          onClick={() => onNavigate?.('home')}
          className="hover:text-amber-600 transition-colors flex items-center gap-1"
        >
          <Landmark className="w-3 h-3" />
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400" />
        <button
          onClick={() => onNavigate?.('election-stats')}
          className="hover:text-amber-600 transition-colors"
        >
          Elections
        </button>
        <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">Legislative Assembly Seats</span>
      </nav>

      {/* 2. Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-amber-500/20">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wide">
            <Building2 className="w-3.5 h-3.5" />
            Official Tamil Nadu Legislative Assembly Constituency Directory
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Tamil Nadu Legislative Assembly Seats
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Complete district-wise register of all <strong>234 Assembly Constituencies</strong> across all{' '}
            <strong>38 districts</strong> of Tamil Nadu, as designated under the{' '}
            <em>Delimitation of Parliamentary and Assembly Constituencies Order, 2008</em> and verified
            against the Chief Electoral Officer, Tamil Nadu (CEO) & Election Commission of India (ECI).
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official 234 Constituencies Verified</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>Last Verified: {OFFICIAL_DATA_METADATA.lastUpdated}</span>
            </div>
            <a
              href={OFFICIAL_DATA_METADATA.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm"
              id="view-official-source-btn"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Official Source (CEO Tamil Nadu)
            </a>
          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute right-4 -bottom-6 opacity-5 pointer-events-none">
          <Building2 className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* 3. Assembly Seat Summary Dashboard Cards */}
      <section aria-labelledby="summary-cards-heading">
        <div className="flex items-center justify-between mb-3">
          <h2 id="summary-cards-heading" className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Assembly Seat Summary Dashboard
          </h2>
          <span className="text-xs text-slate-500">Click a card to filter seats</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Card 1: Total Constituencies */}
          <button
            onClick={() => setTypeFilter('ALL')}
            className={`p-4 rounded-xl border text-left transition-all ${
              typeFilter === 'ALL'
                ? 'bg-amber-50 border-amber-400 shadow-md ring-2 ring-amber-400/50'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
              <span>Total Seats</span>
              <Building2 className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {ASSEMBLY_SUMMARY_METRICS.totalConstituencies}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              All 234 Assembly Seats
            </p>
          </button>

          {/* Card 2: Total Districts */}
          <button
            onClick={() => setSelectedDistrict('ALL')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedDistrict === 'ALL'
                ? 'bg-slate-50 border-slate-400 shadow-md ring-2 ring-slate-400/40'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
              <span>Total Districts</span>
              <MapPin className="w-4 h-4 text-slate-700" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {ASSEMBLY_SUMMARY_METRICS.totalDistricts}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              100% Districts Covered
            </p>
          </button>

          {/* Card 3: General Constituencies */}
          <button
            onClick={() => setTypeFilter('General')}
            className={`p-4 rounded-xl border text-left transition-all ${
              typeFilter === 'General'
                ? 'bg-emerald-50 border-emerald-400 shadow-md ring-2 ring-emerald-400/50'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold mb-1">
              <span>General Seats</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-950">
              {ASSEMBLY_SUMMARY_METRICS.generalSeats}
            </div>
            <p className="text-[11px] text-emerald-700/80 mt-1 font-medium">
              80.34% of Assembly
            </p>
          </button>

          {/* Card 4: Reserved SC Constituencies */}
          <button
            onClick={() => setTypeFilter('SC')}
            className={`p-4 rounded-xl border text-left transition-all ${
              typeFilter === 'SC'
                ? 'bg-blue-50 border-blue-400 shadow-md ring-2 ring-blue-400/50'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between text-blue-700 text-xs font-semibold mb-1">
              <span>Reserved SC</span>
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-blue-950">
              {ASSEMBLY_SUMMARY_METRICS.scReservedSeats}
            </div>
            <p className="text-[11px] text-blue-700/80 mt-1 font-medium">
              18.80% of Assembly
            </p>
          </button>

          {/* Card 5: Reserved ST Constituencies */}
          <button
            onClick={() => setTypeFilter('ST')}
            className={`col-span-2 sm:col-span-1 p-4 rounded-xl border text-left transition-all ${
              typeFilter === 'ST'
                ? 'bg-purple-50 border-purple-400 shadow-md ring-2 ring-purple-400/50'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between text-purple-700 text-xs font-semibold mb-1">
              <span>Reserved ST</span>
              <Shield className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-purple-950">
              {ASSEMBLY_SUMMARY_METRICS.stReservedSeats}
            </div>
            <p className="text-[11px] text-purple-700/80 mt-1 font-medium">
              Yercaud & Senthamangalam
            </p>
          </button>
        </div>
      </section>

      {/* 4. Visual Statistics (Charts) */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-amber-500" />
              Number of Legislative Assembly Constituencies by District
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparative distribution of the 234 assembly seats across all 38 districts of Tamil Nadu
            </p>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Order:</span>
            <button
              onClick={() => setChartSortBy('seats')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                chartSortBy === 'seats'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Highest Seats
            </button>
            <button
              onClick={() => setChartSortBy('alpha')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                chartSortBy === 'alpha'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              A – Z
            </button>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Bar Chart (2 cols) */}
          <div className="lg:col-span-2 h-72 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtChartData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="district"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  tick={{ fontSize: 9, fill: '#475569' }}
                  height={55}
                />
                <YAxis
                  allowDecimals={false}
                  domain={[0, 18]}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white text-xs p-3 rounded-xl shadow-xl border border-slate-700 space-y-1">
                          <p className="font-bold text-amber-400 text-sm">{data.district} District</p>
                          <p className="font-semibold">Total Assembly Seats: {data.seats}</p>
                          <div className="text-[11px] text-slate-300 pt-1 border-t border-slate-800 space-y-0.5">
                            <p>• General: {data.general}</p>
                            <p>• SC Reserved: {data.sc}</p>
                            {data.st > 0 && <p>• ST Reserved: {data.st}</p>}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="seats" fill="#d97706" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Donut Chart: Reservation Breakdown (1 col) */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Seat Reservation Profile
              </h3>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={reservationChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={4}
                    >
                      {reservationChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0];
                          const percent = ((Number(data.value) / 234) * 100).toFixed(1);
                          return (
                            <div className="bg-slate-900 text-white text-xs p-2 rounded-lg shadow border border-slate-700">
                              <p className="font-bold">{data.name}</p>
                              <p>{data.value} Seats ({percent}%)</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  General (Open)
                </span>
                <span className="font-bold text-slate-900">188 (80.3%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                  Scheduled Castes (SC)
                </span>
                <span className="font-bold text-slate-900">44 (18.8%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
                  Scheduled Tribes (ST)
                </span>
                <span className="font-bold text-slate-900">2 (0.9%)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Filters, Search, & View Controls */}
      <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="search-assembly-constituency"
              placeholder="Search Assembly Constituency (by name, number, district, MLA, party)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm outline-none transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* District Dropdown Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="district-select" className="text-xs font-bold text-slate-600 whitespace-nowrap">
              District:
            </label>
            <select
              id="district-select"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-medium text-slate-800 bg-white outline-none transition-all cursor-pointer"
            >
              <option value="ALL">All Districts (38)</option>
              {ALL_DISTRICT_NAMES.map((d) => {
                const count = ASSEMBLY_CONSTITUENCIES.filter((c) => c.district === d).length;
                return (
                  <option key={d} value={d}>
                    {d} ({count} seats)
                  </option>
                );
              })}
            </select>
          </div>

          {/* Reservation Category Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="category-select" className="text-xs font-bold text-slate-600 whitespace-nowrap">
              Category:
            </label>
            <select
              id="category-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
              className="px-3 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-medium text-slate-800 bg-white outline-none transition-all cursor-pointer"
            >
              <option value="ALL">All Categories (234)</option>
              <option value="General">General (188)</option>
              <option value="SC">Reserved SC (44)</option>
              <option value="ST">Reserved ST (2)</option>
            </select>
          </div>
        </div>

        {/* View Switcher & Results Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="font-semibold text-slate-900">
              Showing {filteredConstituencies.length} of 234 Constituencies
            </span>
            <span>across {filteredDistrictGroups.length} Districts</span>
            {(searchQuery || selectedDistrict !== 'ALL' || typeFilter !== 'ALL') && (
              <button
                onClick={resetFilters}
                className="ml-2 inline-flex items-center gap-1 text-amber-700 hover:text-amber-800 font-bold underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset all filters
              </button>
            )}
          </div>

          {/* View Mode Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('tree')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'tree'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FolderTree className="w-3.5 h-3.5 text-amber-600" />
              District Tree
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5 text-blue-600" />
              Cards Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5 text-emerald-600" />
              Full Table
            </button>
          </div>
        </div>
      </section>

      {/* 6. Main Data Display: Branch/Tree View vs Grid vs Table */}

      {/* 6A. DISTRICT TREE / HIERARCHY VIEW */}
      {viewMode === 'tree' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Click any district header to expand or collapse assembly branches</span>
            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-2.5 py-1 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-2.5 py-1 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>

          {filteredDistrictGroups.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <p className="text-base font-bold text-slate-800">No matching constituencies found</p>
              <p className="text-xs text-slate-500 mt-1">Try adjusting your search keywords or filters</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredDistrictGroups.map((districtGroup) => {
              const isExpanded = expandedDistricts[districtGroup.districtName] ?? false;

              return (
                <div
                  key={districtGroup.districtName}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all"
                >
                  {/* District Header Bar */}
                  <button
                    onClick={() => toggleDistrict(districtGroup.districtName)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors border-b border-slate-100"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-700">
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                          <span>{districtGroup.districtName} District</span>
                        </h3>
                        <p className="text-xs text-slate-500">
                          {districtGroup.totalSeats} Assembly {districtGroup.totalSeats === 1 ? 'Seat' : 'Seats'} (
                          {districtGroup.generalSeats} General
                          {districtGroup.scSeats > 0 ? `, ${districtGroup.scSeats} SC` : ''}
                          {districtGroup.stSeats > 0 ? `, ${districtGroup.stSeats} ST` : ''})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        Total Assembly Seats: {districtGroup.totalSeats}
                      </span>
                      <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                        {isExpanded ? 'Collapse' : 'Expand Seats'}
                      </span>
                    </div>
                  </button>

                  {/* Expandable Tree Branch Content */}
                  {isExpanded && (
                    <div className="p-5 bg-slate-50/50 border-t border-slate-100">
                      {/* Tree Branch Header */}
                      <div className="text-xs font-semibold text-slate-500 mb-3 flex items-center gap-1.5">
                        <FolderTree className="w-3.5 h-3.5 text-amber-600" />
                        <span>Constituency Branches (Click to view full detail):</span>
                      </div>

                      {/* Tree List / Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {districtGroup.constituencies.map((ac) => (
                          <div
                            key={ac.number}
                            onClick={() => setSelectedConstituency(ac)}
                            className="group relative p-3.5 rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <span className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-slate-900 text-amber-400">
                                  No. {ac.number}
                                </span>
                                {getBadgeForType(ac.type)}
                              </div>
                              <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                                {ac.name}
                              </h4>
                              <p className="text-xs text-slate-500 mt-0.5">
                                District: <span className="font-semibold text-slate-700">{ac.district}</span>
                              </p>
                            </div>

                            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                              <div>
                                <span className="text-[11px] text-slate-400 block font-medium">MLA</span>
                                <span className="font-bold text-slate-800 truncate max-w-[140px] block">
                                  {ac.mla}
                                </span>
                              </div>
                              <span className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-slate-100 text-slate-800 border border-slate-200">
                                {ac.party}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* 6B. CARDS GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="space-y-4">
          {filteredConstituencies.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <p className="text-base font-bold text-slate-800">No matching constituencies found</p>
              <p className="text-xs text-slate-500 mt-1">Try clearing filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredConstituencies.map((ac) => (
                <div
                  key={ac.number}
                  onClick={() => setSelectedConstituency(ac)}
                  className="group p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-400 text-xs font-extrabold">
                        Constituency No.: {ac.number}
                      </span>
                      {getBadgeForType(ac.type)}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                      {ac.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>District: </span>
                      <span className="font-semibold text-slate-800">{ac.district}</span>
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      <span>Type: </span>
                      <span className="font-semibold text-slate-800">{ac.type}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Current MLA</span>
                      <span className="font-bold text-slate-900 block truncate max-w-[150px]">
                        {ac.mla}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block font-medium">Party</span>
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-extrabold bg-slate-800 text-white">
                        {ac.party}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 6C. COMPREHENSIVE TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">No.</th>
                  <th className="py-3 px-4">Constituency Name</th>
                  <th className="py-3 px-4">District</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Current MLA</th>
                  <th className="py-3 px-4">Political Party</th>
                  <th className="py-3 px-4">Parliamentary Segment</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredConstituencies.map((ac) => (
                  <tr
                    key={ac.number}
                    className="hover:bg-amber-50/60 transition-colors cursor-pointer"
                    onClick={() => setSelectedConstituency(ac)}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      #{ac.number}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {ac.name}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-700">
                      {ac.district}
                    </td>
                    <td className="py-3 px-4">
                      {getBadgeForType(ac.type)}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {ac.mla}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded font-extrabold bg-slate-100 text-slate-800 border border-slate-200">
                        {ac.party}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {ac.parliamentaryConstituency || 'Tamil Nadu'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedConstituency(ac);
                        }}
                        className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. Official Verification & Authority Card */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white border border-slate-700 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              Statutory Delimitation & Official Verification
            </div>
            <h3 className="text-lg font-bold text-white">
              Sourced directly from Election Commission of India Gazette
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              All 234 assembly seat numbers, territorial demarcations, and reservation designations (188
              General, 44 SC, 2 ST) are established pursuant to the{' '}
              <strong>Delimitation of Parliamentary and Assembly Constituencies Order, 2008 (Schedule XXVI)</strong>.
              Incumbent representative names reflect the 16th Tamil Nadu Legislative Assembly results and
              official bye-elections certified by Chief Electoral Officer Tamil Nadu.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full md:w-auto">
            <a
              href="https://elections.tn.gov.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
            >
              <Building2 className="w-4 h-4" />
              CEO Tamil Nadu Portal
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://assembly.tn.gov.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-600 transition-colors"
            >
              <Landmark className="w-4 h-4 text-amber-400" />
              TN Legislative Assembly
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. Mandatory College Project Disclaimer */}
      <section className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-300 text-amber-950 text-xs shadow-sm">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-950 text-xs uppercase tracking-wide">
              Mandatory Project Disclaimer & Academic Notice
            </h4>
            <p className="text-amber-900 leading-relaxed font-medium">
              “This is a college project and an informational website. Constituency and election information
              may change following official notifications. For the latest and legally authoritative information,
              refer to the Election Commission of India, Chief Electoral Officer Tamil Nadu, and Tamil Nadu
              Legislative Assembly.”
            </p>
          </div>
        </div>
      </section>

      {/* 9. Constituency Detail Modal */}
      <AssemblyConstituencyModal
        constituency={selectedConstituency}
        onClose={() => setSelectedConstituency(null)}
      />
    </div>
  );
};
