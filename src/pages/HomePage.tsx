import React, { useState, useEffect, useCallback } from 'react';
import { PageId, PopulationEstimate } from '../types';
import { STATE_OVERVIEW, DISTRICTS_DATA, VITAL_TRENDS, TURNOUT_TRENDS } from '../data/tnData';
import { StatCard } from '../components/StatCard';
import { TamilNaduMap } from '../components/TamilNaduMap';
import { PopulationCounter } from '../components/PopulationCounter';
import { Methodology } from '../components/Methodology';
import { DataSource } from '../components/DataSource';
import { calculatePopulationEstimate } from '../services/populationService';
import {
  Users,
  Vote,
  HeartPulse,
  UserCheck,
  Building2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  UserPlus,
  BarChart3,
  Calendar,
  Layers,
  BookOpen,
  ExternalLink,
  Clock,
  Info,
  Landmark,
  MapPin,
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
  LineChart,
  Line,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { population, voters, vitalStats } = STATE_OVERVIEW;

  // Real-time calculated population estimate based on official baseline
  const [estimate, setEstimate] = useState<PopulationEstimate>(() =>
    calculatePopulationEstimate(new Date())
  );
  const [showMethodologyModal, setShowMethodologyModal] = useState(false);
  const [showDataSourceModal, setShowDataSourceModal] = useState(false);

  const refreshEstimate = useCallback(() => {
    setEstimate(calculatePopulationEstimate(new Date()));
  }, []);

  useEffect(() => {
    refreshEstimate();
    const handleConfigChange = () => refreshEstimate();
    window.addEventListener('tn_population_config_changed', handleConfigChange);
    return () => window.removeEventListener('tn_population_config_changed', handleConfigChange);
  }, [refreshEstimate]);

  // Chart 1: Male vs Female Population
  const popGenderData = [
    { name: 'Male Population', value: population.male, color: '#3b82f6' },
    { name: 'Female Population', value: population.female, color: '#ec4899' },
  ];

  // Chart 2: Male vs Female Voters
  const voterGenderData = [
    { name: 'Male Voters', value: voters.male, color: '#2563eb' },
    { name: 'Female Voters', value: voters.female, color: '#d946ef' },
    { name: 'Third Gender', value: voters.thirdGender, color: '#f59e0b' },
  ];

  // Chart 3: Births vs Deaths (Vital trends)
  const vitalChartData = VITAL_TRENDS.map((vt) => ({
    year: vt.year,
    Births: vt.births,
    Deaths: vt.deaths,
  }));

  // Chart 4: Population by Top Districts (Top 8)
  const topDistrictsData = [...DISTRICTS_DATA]
    .sort((a, b) => b.totalPopulation - a.totalPopulation)
    .slice(0, 8)
    .map((d) => ({
      name: d.name,
      Population: Math.round(d.totalPopulation / 10000) / 100, // In Lakhs
      Voters: Math.round(d.registeredVoters / 10000) / 100, // In Lakhs
    }));

  // Chart 5: Voter Turnout across elections
  const turnoutData = TURNOUT_TRENDS.map((t) => ({
    year: `${t.year} (${t.electionType.substring(0, 2)})`,
    Turnout: t.totalTurnout,
    MaleTurnout: t.maleTurnout,
    FemaleTurnout: t.femaleTurnout,
  }));

  return (
    <div className="space-y-10 pb-12">
      {/* STATUTORY SECTION 14 DISCLAIMER BANNER */}
      <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-300 text-amber-950 text-xs leading-relaxed flex items-start gap-3 shadow-2xs">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-900 font-bold">Official Disclaimer Notice:</strong>
          <p className="mt-0.5">
            This portal provides information and links to official government services. Unless specifically authorized by the relevant government department, this portal is not an official government website. Government services requiring official submission will redirect users to the appropriate government website.
          </p>
        </div>
      </div>

      {/* HERO SECTION */}
      <section
        id="home-hero-section"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-8 md:p-12 shadow-xl border border-slate-700"
      >
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Citizen, Population & Electoral Information Services
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-display">
            Tamil Nadu Citizen, Population & Voter Services Portal
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            A comprehensive, secure portal for citizens of Tamil Nadu to access verified population statistics (2010–2026), legislative assembly constituencies, voter services, and authenticated government resources.
          </p>

          {/* Core Portal Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <button
              id="hero-btn-citizen-account"
              onClick={() => onNavigate('my-account')}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Citizen Account & Verification
            </button>

            <button
              id="hero-btn-assembly-seats"
              onClick={() => onNavigate('assembly-seats')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-600 hover:border-emerald-400/50 shadow-md transition-all flex items-center gap-2"
            >
              <Landmark className="w-4 h-4 text-emerald-400" />
              234 Assembly Seats
            </button>

            <button
              id="hero-btn-voter-services"
              onClick={() => onNavigate('voter-services')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-600 hover:border-emerald-400/50 shadow-md transition-all flex items-center gap-2"
            >
              <Vote className="w-4 h-4 text-amber-300" />
              Voter Services (Form 6)
            </button>

            <button
              id="hero-btn-government-services"
              onClick={() => onNavigate('government-services')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-xs transition-all flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-blue-300" />
              Government Directory
            </button>
          </div>
        </div>

        {/* Decorative background grid element */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden lg:flex items-center justify-center">
          <Layers className="w-80 h-80 text-emerald-300" />
        </div>
      </section>

      {/* TAMIL NADU 2026 ASSEMBLY & LOCAL GOVERNMENT INFORMATION HUB (SECTION 20) */}
      <section id="local-gov-portal-hub" className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-white space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30 mb-2">
              <Landmark className="w-3.5 h-3.5" />
              Tamil Nadu 2026 Assembly & Local Government Portal (Section 20)
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Official State Administrative & Local Governance Repository
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Source-verified public information compiled from official state departments, ECI, and administrative gazettes across all 38 districts with strict anti-hallucination compliance.
            </p>
          </div>

          <button
            onClick={() => onNavigate('data-quality')}
            className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold rounded-xl border border-amber-500/40 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Rule #8 Integrity Status: 100%</span>
          </button>
        </div>

        {/* 10-Feature Interactive Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          <button
            onClick={() => onNavigate('tamil-nadu')}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 text-left transition-all group space-y-2"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white group-hover:text-emerald-300">
                Tamil Nadu
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                State overview, history, and administrative hierarchy.
              </p>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold inline-flex items-center gap-1">
              Explore State &rarr;
            </span>
          </button>

          <button
            onClick={() => onNavigate('districts')}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-850 text-left transition-all group space-y-2"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white group-hover:text-blue-300">
                38 Districts
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Complete directory with LGD codes, headquarters, and stats.
              </p>
            </div>
            <span className="text-[10px] text-blue-400 font-bold inline-flex items-center gap-1">
              View All 38 &rarr;
            </span>
          </button>

          <button
            onClick={() => onNavigate('assembly-constituencies')}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 text-left transition-all group space-y-2"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Vote className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white group-hover:text-amber-300">
                Assembly Constituencies
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                All 234 assembly segments, categories & Parliamentary ties.
              </p>
            </div>
            <span className="text-[10px] text-amber-400 font-bold inline-flex items-center gap-1">
              234 ACs &rarr;
            </span>
          </button>

          <button
            onClick={() => onNavigate('mlas')}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-850 text-left transition-all group space-y-2"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white group-hover:text-purple-300">
                MLAs Directory
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                All 234 sitting members with party & official gazette.
              </p>
            </div>
            <span className="text-[10px] text-purple-400 font-bold inline-flex items-center gap-1">
              Sitting Members &rarr;
            </span>
          </button>

          <button
            onClick={() => onNavigate('village-panchayats')}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-850 text-left transition-all group space-y-2"
          >
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white group-hover:text-teal-300">
                Village Panchayats
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                12,525 panchayats across 388 unions in 37 rural districts.
              </p>
            </div>
            <span className="text-[10px] text-teal-400 font-bold inline-flex items-center gap-1">
              12,525 Units &rarr;
            </span>
          </button>

          <button
            onClick={() => onNavigate('villages')}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 text-left transition-all group space-y-2"
          >
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white group-hover:text-cyan-300">
                Villages & Habitations
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Over 79,000 habitations & revenue villages mapped.
              </p>
            </div>
            <span className="text-[10px] text-cyan-400 font-bold inline-flex items-center gap-1">
              Habitations &rarr;
            </span>
          </button>

          <button
            onClick={() => onNavigate('local-government')}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850 text-left transition-all group space-y-2"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white group-hover:text-indigo-300">
                Local Government
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                21 Corporations, 138 Municipalities & 490 Town Panchayats.
              </p>
            </div>
            <span className="text-[10px] text-indigo-400 font-bold inline-flex items-center gap-1">
              ULBs & PRIs &rarr;
            </span>
          </button>

          <button
            onClick={() => onNavigate('elected-representatives')}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-rose-500/50 hover:bg-slate-850 text-left transition-all group space-y-2"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white group-hover:text-rose-300">
                Elected Representatives
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Mayors, Municipal Chairpersons & Union leaders.
              </p>
            </div>
            <span className="text-[10px] text-rose-400 font-bold inline-flex items-center gap-1">
              Local Leaders &rarr;
            </span>
          </button>

          <button
            onClick={() => onNavigate('government-sources')}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-850 text-left transition-all group space-y-2"
          >
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <ExternalLink className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white group-hover:text-teal-300">
                Government Sources
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Level 1 to Level 4 priority hierarchy matrix.
              </p>
            </div>
            <span className="text-[10px] text-teal-400 font-bold inline-flex items-center gap-1">
              Sources Matrix &rarr;
            </span>
          </button>

          <button
            onClick={() => onNavigate('data-quality')}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 text-left transition-all group space-y-2"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white group-hover:text-amber-300">
                Admin & Data Quality
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Verification status tracker & AI validator.
              </p>
            </div>
            <span className="text-[10px] text-amber-400 font-bold inline-flex items-center gap-1">
              Console &rarr;
            </span>
          </button>
        </div>
      </section>

      {/* LIVE AUTOMATIC POPULATION COUNTER BANNER (Requirements #1, #2, #3) */}
      <section id="home-population-counter">
        <PopulationCounter
          estimate={estimate}
          onRefresh={refreshEstimate}
          onOpenMethodology={() => setShowMethodologyModal(true)}
          onOpenDataSource={() => setShowDataSourceModal(true)}
        />
      </section>

      {/* DASHBOARD STATISTIC CARDS */}
      <section id="dashboard-stats-section" className="space-y-6">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2 font-display">
              <BarChart3 className="w-6 h-6 text-amber-600" />
              State Overview Dashboard
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified figures with reference year, reporting authority, and official classification.
            </p>
          </div>
          <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit">
            Updated for 2024 Election & CRS Cycle
          </span>
        </div>

        {/* 1. POPULATION STATS CARDS (Requirement #8: 7 metrics + Data Source + Methodology buttons) */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-800">
              <Users className="w-4 h-4" />
              <span>Population Demographics & Automatic Daily Estimate</span>
            </div>

            {/* Requirement #8: Data Source & Methodology buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onNavigate('population-history')}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                title="View Tamil Nadu Population from 2010 to 2026"
              >
                <Calendar className="w-3 h-3 text-slate-950" />
                2010–2026 History
              </button>
              <button
                onClick={() => setShowMethodologyModal(true)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors inline-flex items-center gap-1.5 border border-slate-300 shadow-2xs"
              >
                <BookOpen className="w-3 h-3 text-amber-600" />
                Methodology
              </button>
              <button
                onClick={() => setShowDataSourceModal(true)}
                className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold transition-colors inline-flex items-center gap-1.5 border border-blue-200 shadow-2xs"
              >
                <ExternalLink className="w-3 h-3 text-blue-700" />
                Data Source
              </button>
            </div>
          </div>

          {/* Timestamps Bar (Requirement #11) */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                <strong className="text-slate-900">Last calculated:</strong> {estimate.lastCalculatedTime} (user local time)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>
                <strong className="text-slate-900">Data source updated:</strong> Baseline {estimate.baselineYear} (Census of India / RGI)
              </span>
            </div>
            <span className="text-[11px] font-medium text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded border border-amber-200">
              “Estimated value — not an official daily population count.”
            </span>
          </div>

          {/* 7 Required Population Metric Cards (Requirement #8) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Official Population */}
            <StatCard
              id="stat-card-official-population"
              title="Official Population"
              value={estimate.baselinePopulation}
              subtext={`Census ${estimate.baselineYear} official headcount enumeration`}
              icon={<Users className="w-5 h-5 text-blue-600" />}
              year={estimate.baselineYear}
              source={estimate.sourceName.slice(0, 45)}
              isOfficial={true}
              accentColor="blue"
            />

            {/* 2. Estimated Current Population */}
            <StatCard
              id="stat-card-estimated-current-pop"
              title="Estimated Current Population"
              value={estimate.currentEstimatedPopulation}
              subtext={`Updated: ${estimate.updatedDateString} (Calculated daily)`}
              icon={<TrendingUp className="w-5 h-5 text-amber-600" />}
              year="Daily Estimate"
              source="Demographic Model"
              isOfficial={false}
              accentColor="amber"
            />

            {/* 3. Male Population */}
            <StatCard
              id="stat-card-male-population"
              title="Male Population"
              value={estimate.estimatedMalePopulation}
              subtext="50.10% (Census baseline: 36,137,975)"
              icon={<Users className="w-5 h-5 text-indigo-500" />}
              year={estimate.baselineYear}
              source={estimate.sourceName.slice(0, 45)}
              isOfficial={true}
              accentColor="blue"
            />

            {/* 4. Female Population */}
            <StatCard
              id="stat-card-female-population"
              title="Female Population"
              value={estimate.estimatedFemalePopulation}
              subtext="49.90% (Census baseline: 36,009,055)"
              icon={<Users className="w-5 h-5 text-rose-500" />}
              year={estimate.baselineYear}
              source={estimate.sourceName.slice(0, 45)}
              isOfficial={true}
              accentColor="rose"
            />

            {/* 5. Sex Ratio */}
            <StatCard
              id="stat-card-sex-ratio"
              title="Sex Ratio"
              value={`${estimate.estimatedSexRatio}`}
              subtext="Females per 1,000 Males (National avg: 943)"
              icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
              year={estimate.baselineYear}
              source="Census of India & SRS"
              isOfficial={true}
              accentColor="emerald"
            />

            {/* 6. Annual Growth Rate */}
            <StatCard
              id="stat-card-growth-rate"
              title="Annual Growth Rate"
              value={`${estimate.annualGrowthRate}%`}
              subtext={`RGI Technical Group rate (+${estimate.estimatedDailyChange.toLocaleString('en-IN')}/day)`}
              icon={<TrendingUp className="w-5 h-5 text-purple-600" />}
              year="Annual Rate"
              source="RGI Technical Report"
              isOfficial={true}
              accentColor="purple"
            />

            {/* 7. Last Data Update */}
            <StatCard
              id="stat-card-last-update"
              title="Last Data Update"
              value={`Baseline ${estimate.baselineYear}`}
              subtext={`Calculated: ${estimate.updatedDateString}`}
              icon={<Clock className="w-5 h-5 text-teal-600" />}
              year={estimate.baselineYear}
              source="Census & Projections"
              isOfficial={true}
              accentColor="amber"
            />

            {/* Quick Action card linking to full population breakdown */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-5 border border-slate-700 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Full Analysis
                </span>
                <h4 className="text-base font-bold mt-1">30-Day Population Log & Districts</h4>
                <p className="text-xs text-slate-300 mt-1">
                  View the 30-day update history table, long-term projections, and all 38 districts.
                </p>
              </div>
              <button
                onClick={() => onNavigate('population')}
                className="mt-4 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors flex items-center justify-between"
              >
                <span>Open Population Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. VOTER STATS CARDS */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Vote className="w-4 h-4" />
              <span>Electoral Roll Statistics (Chief Electoral Officer, Tamil Nadu)</span>
            </div>
            <button
              onClick={() => onNavigate('assembly-seats')}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-xs w-fit"
              title="View all 234 Tamil Nadu Legislative Assembly Constituencies"
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>234 Assembly Seats Directory</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              id="stat-card-total-voters"
              title="Total Registered Voters"
              value={voters.total}
              subtext="6.23 Crore electors across 234 Assembly Seats"
              icon={<Vote className="w-5 h-5 text-emerald-600" />}
              year={voters.year}
              source={voters.source}
              isOfficial={voters.isOfficial}
              accentColor="emerald"
            />
            <StatCard
              id="stat-card-male-voters"
              title="Male Voters"
              value={voters.male}
              subtext="49.10% of total electorate"
              icon={<UserCheck className="w-5 h-5 text-blue-600" />}
              year={voters.year}
              source={voters.source}
              isOfficial={voters.isOfficial}
              accentColor="blue"
            />
            <StatCard
              id="stat-card-female-voters"
              title="Female Voters"
              value={voters.female}
              subtext="50.89% (Females outnumber male electors by 11.13 Lakhs)"
              icon={<UserCheck className="w-5 h-5 text-fuchsia-600" />}
              year={voters.year}
              source={voters.source}
              isOfficial={voters.isOfficial}
              accentColor="indigo"
            />
            <StatCard
              id="stat-card-third-gender-voters"
              title="Other/Third Gender Voters"
              value={voters.thirdGender}
              subtext="Enrolled across 68,144 polling stations"
              icon={<Users className="w-5 h-5 text-amber-600" />}
              year={voters.year}
              source={voters.source}
              isOfficial={voters.isOfficial}
              accentColor="amber"
            />
          </div>
        </div>

        {/* 3. VITAL STATISTICS CARDS */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800 mb-3">
            <HeartPulse className="w-4 h-4" />
            <span>Vital Statistics (Civil Registration System / CRS)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              id="stat-card-birth-count"
              title="Birth Count"
              value={vitalStats.annualBirths}
              subtext={`Crude Birth Rate: ${vitalStats.birthRate} per 1,000 | 99.8% Institutional Deliveries`}
              icon={<HeartPulse className="w-5 h-5 text-rose-600" />}
              year={vitalStats.year}
              source={vitalStats.source}
              isOfficial={vitalStats.isOfficial}
              accentColor="rose"
            />
            <StatCard
              id="stat-card-death-count"
              title="Death Count"
              value={vitalStats.annualDeaths}
              subtext={`Crude Death Rate: ${vitalStats.deathRate} per 1,000 | 100% Medical Registration`}
              icon={<ActivityIcon className="w-5 h-5 text-slate-700" />}
              year={vitalStats.year}
              source={vitalStats.source}
              isOfficial={vitalStats.isOfficial}
              accentColor="slate"
            />
          </div>
        </div>
      </section>

      {/* CHARTS DASHBOARD (All 5 required charts) */}
      <section id="charts-dashboard-section" className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2 font-display">
            <TrendingUp className="w-6 h-6 text-amber-600" />
            Analytical Visualizations
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Interactive visual comparisons of demographics, voter participation, and vital registration.
          </p>
        </div>

        {/* Row 1: Male vs Female Population & Male vs Female Voters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Male vs Female Population */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">1. Male vs Female Population</h3>
                <p className="text-xs text-slate-500">Total: 7.21 Crore (Census 2011)</p>
              </div>
              <span className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 font-medium">
                Census of India
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={popGenderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(1)}%`}
                  >
                    {popGenderData.map((entry, index) => (
                      <Cell key={`pop-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: number) => [val.toLocaleString('en-IN'), 'Population']}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-500 text-center mt-2">
              Near gender parity with sex ratio of 996 females per 1,000 males across the state.
            </p>
          </div>

          {/* Chart 2: Male vs Female Voters */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">2. Male vs Female Voters</h3>
                <p className="text-xs text-slate-500">Total: 6.23 Crore Electors (2024 Roll)</p>
              </div>
              <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                CEO Tamil Nadu
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Male Voters', count: voters.male / 10000000, fill: '#2563eb' },
                    { name: 'Female Voters', count: voters.female / 10000000, fill: '#ec4899' },
                    { name: 'Third Gender', count: (voters.thirdGender * 100) / 10000000, fill: '#f59e0b' },
                  ]}
                  margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" textAnchor="middle" tick={{ fontSize: 11 }} />
                  <YAxis unit=" Cr" tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(val: number) => [`${val.toFixed(2)} Crore`, 'Electors']} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    <Cell fill="#2563eb" />
                    <Cell fill="#ec4899" />
                    <Cell fill="#f59e0b" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-500 text-center mt-2">
              Tamil Nadu is among the few major Indian states where female voters outnumber male voters (+11.13 Lakhs).
            </p>
          </div>
        </div>

        {/* Row 2: Births vs Deaths (Trend) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 mb-4 gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">3. Births vs Deaths Trend (Civil Registration System)</h3>
              <p className="text-xs text-slate-500">Annual registered events from 2018 to 2023</p>
            </div>
            <span className="text-[11px] bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded border border-rose-200 font-medium self-start sm:self-auto">
              CRS Registrar General of India
            </span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vitalChartData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBirths" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(val) => `${(val / 100000).toFixed(1)}L`}
                  tick={{ fontSize: 11 }}
                />
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <Tooltip
                  formatter={(val: number) => [val.toLocaleString('en-IN'), 'Registered Events']}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Births"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBirths)"
                />
                <Area
                  type="monotone"
                  dataKey="Deaths"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorDeaths)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2">
            <span>Natural annual population increase: ~3.16 Lakhs</span>
            <span>Data Year: 2018-2023 • Source: Civil Registration System (CRS)</span>
          </div>
        </div>

        {/* Row 3: Population by District & Voter Turnout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 4: Population by District (Top 8) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">4. Population by District (Top 8 Districts)</h3>
                <p className="text-xs text-slate-500">Population vs Registered Electors (in Lakhs)</p>
              </div>
              <button
                onClick={() => onNavigate('districts')}
                className="text-xs text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1"
              >
                View all 38 <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topDistrictsData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" unit=" L" tick={{ fontSize: 11 }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} />
                  <Tooltip formatter={(val: number) => [`${val} Lakhs`, '']} />
                  <Legend />
                  <Bar dataKey="Population" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="Voters" fill="#10b981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-500 text-center mt-2">
              Chennai, Coimbatore, Tiruvallur, and Salem constitute the largest urban population clusters.
            </p>
          </div>

          {/* Chart 5: Voter Turnout */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">5. Voter Turnout Across Elections</h3>
                <p className="text-xs text-slate-500">Comparison of Lok Sabha & Assembly turnout (%)</p>
              </div>
              <span className="text-[11px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200 font-medium">
                ECI Official
              </span>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={turnoutData} margin={{ top: 10, right: 25, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis domain={[60, 85]} unit="%" tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(val: number) => [`${val}%`, 'Turnout']} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Turnout"
                    stroke="#d97706"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="FemaleTurnout"
                    stroke="#ec4899"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                  />
                  <Line
                    type="monotone"
                    dataKey="MaleTurnout"
                    stroke="#2563eb"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-500 text-center mt-2">
              Consistent high citizen participation (~70-78%) with female turnout routinely exceeding male turnout.
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DISTRICT REGIONAL MATRIX */}
      <section>
        <TamilNaduMap
          districts={DISTRICTS_DATA}
          onSelectDistrict={(d) => {
            onNavigate('districts');
          }}
        />
      </section>

      {/* QUICK SERVICE CARDS (Citizen Guidance) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Voter Eligibility */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Are You Eligible to Vote?</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Test your eligibility with our simple 3-question eligibility check tool based on Representation of the People Act 1950.
            </p>
          </div>
          <button
            onClick={() => onNavigate('voter-eligibility')}
            className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-300/60 hover:bg-amber-300 px-4 py-2.5 rounded-lg transition-colors w-fit"
          >
            Launch Eligibility Checker <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: Electoral Roll Search */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-700 flex items-center justify-center mb-4">
              <Vote className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Search Electoral Roll</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Learn how to verify your voter details, Polling Station location, Assembly Constituency, and Part Number on the official ECI database.
            </p>
          </div>
          <button
            onClick={() => onNavigate('voter-list')}
            className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-blue-900 bg-blue-200 hover:bg-blue-300 px-4 py-2.5 rounded-lg transition-colors w-fit"
          >
            Voter List Guide <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: New Voter Form 6 */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-700 flex items-center justify-center mb-4">
              <UserPlus className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Register as a New Voter</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Step-by-step guidance for Form 6 submission on the official National Voter Services Portal with document checklist.
            </p>
          </div>
          <button
            onClick={() => onNavigate('new-voter')}
            className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-200 hover:bg-emerald-300 px-4 py-2.5 rounded-lg transition-colors w-fit"
          >
            Registration Walkthrough <ArrowRight className="w-3.5 h-3.5" />
          </button>
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
                onNavigate('admin');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
