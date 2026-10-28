import React, { useState, useEffect } from 'react';
import { PageId, YearlyPopulationRecord } from '../types';
import {
  getYearlyPopulationData,
  getHistoryDashboardMetrics,
} from '../services/yearlyPopulationService';
import { HistoryDashboardCards } from '../components/HistoryDashboardCards';
import { PopulationTimeline } from '../components/PopulationTimeline';
import { YearSelectorCard } from '../components/YearSelectorCard';
import { YearlyPopulationChart } from '../components/YearlyPopulationChart';
import { MaleFemaleChart } from '../components/MaleFemaleChart';
import { YearlyPopulationTable } from '../components/YearlyPopulationTable';
import { YearlySourcesMethodology } from '../components/YearlySourcesMethodology';
import { YearDetailModal } from '../components/YearDetailModal';
import {
  Calendar,
  ArrowLeft,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';

interface PopulationHistoryPageProps {
  onNavigate: (page: PageId) => void;
}

export const PopulationHistoryPage: React.FC<PopulationHistoryPageProps> = ({ onNavigate }) => {
  const [records, setRecords] = useState<YearlyPopulationRecord[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedRecordForModal, setSelectedRecordForModal] = useState<YearlyPopulationRecord | null>(null);

  // Load records and listen for updates
  const loadData = () => {
    const data = getYearlyPopulationData();
    setRecords(data);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('tn_yearly_population_changed', loadData);
    window.addEventListener('tn_population_config_changed', loadData);
    return () => {
      window.removeEventListener('tn_yearly_population_changed', loadData);
      window.removeEventListener('tn_population_config_changed', loadData);
    };
  }, []);

  const metrics = getHistoryDashboardMetrics();

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-amber-600 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate('population')}
            className="hover:text-amber-600 transition-colors"
          >
            Population Center
          </button>
          <span>/</span>
          <span className="text-slate-900 font-bold">Population History (2010–2026)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('population')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 transition-all shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
            <span>Back to Live Population Center</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
            <Calendar className="w-3.5 h-3.5" />
            <span>Decadal Demographic Series (17-Year Record)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Tamil Nadu Population – 2010 to 2026
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Verified longitudinal demographic archive presenting historical Census headcounts, official Registrar General of India (RGI) cohort projections, gender distributions, and annual growth trajectories for the state of Tamil Nadu.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              <strong>Official Baseline:</strong> Census 2011 (72,147,030)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <strong>2026 Projected Population:</strong> {(metrics.pop2026 / 10000000).toFixed(2)} Cr (Estimated)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              Academic Research Portal
            </span>
          </div>
        </div>
      </div>

      {/* 1. Population Dashboard Cards (Requirement 4) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            <span>Longitudinal Population Dashboard</span>
          </h2>
          <span className="text-xs text-slate-500">Benchmark milestones & net changes</span>
        </div>
        <HistoryDashboardCards metrics={metrics} onSelectYear={setSelectedYear} />
      </div>

      {/* 2. Interactive Year Selection & Inspector (Requirement 6) */}
      <YearSelectorCard
        records={records}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
        onViewSource={(rec) => setSelectedRecordForModal(rec)}
      />

      {/* 3. 2010–2026 Visual Timeline (Requirement 8) */}
      <PopulationTimeline
        records={records}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
      />

      {/* 4. Interactive Population Chart (Requirement 3: Line & Bar Chart) */}
      <YearlyPopulationChart
        records={records}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
      />

      {/* 5. Male vs Female Population Chart (Requirement 5) */}
      <MaleFemaleChart
        records={records}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
      />

      {/* 6. Clean Population Data Table (Requirement 1 & 2) */}
      <YearlyPopulationTable
        records={records}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
        onViewSource={(rec) => setSelectedRecordForModal(rec)}
      />

      {/* 7. Population Sources & Methodology Section (Requirement 11) */}
      <YearlySourcesMethodology />

      {/* Detail Modal for View Source */}
      <YearDetailModal
        record={selectedRecordForModal}
        onClose={() => setSelectedRecordForModal(null)}
      />
    </div>
  );
};
