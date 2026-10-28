import React, { useState, useEffect } from 'react';
import { PopulationConfig, PopulationEstimate } from '../types';
import {
  getPopulationConfig,
  savePopulationConfig,
  resetPopulationConfig,
  validatePopulationConfig,
  calculatePopulationEstimate,
} from '../services/populationService';
import { OFFICIAL_PRESETS } from '../data/populationData';
import {
  Lock,
  Unlock,
  KeyRound,
  Save,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Calculator,
  ExternalLink,
  Info,
} from 'lucide-react';

interface AdminPageProps {
  onNavigate?: (page: any) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  // Authentication PIN protection (Default: admin2026)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('tn_portal_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Form states
  const [config, setConfig] = useState<PopulationConfig>(getPopulationConfig);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Live preview calculation based on form values
  const [previewEstimate, setPreviewEstimate] = useState<PopulationEstimate>(() =>
    calculatePopulationEstimate(new Date(), config)
  );

  useEffect(() => {
    // Recalculate preview whenever form config values change
    const est = calculatePopulationEstimate(new Date(), config);
    setPreviewEstimate(est);
    setSaveSuccess(false);
  }, [config]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'admin2026' || pinInput === '1950' || pinInput === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('tn_portal_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid administrator PIN. Please use "admin2026" or click the Demo Unlock button.');
    }
  };

  const handleDemoUnlock = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('tn_portal_admin_auth', 'true');
    setAuthError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('tn_portal_admin_auth');
    setPinInput('');
  };

  const handleApplyPreset = (presetConfig: PopulationConfig) => {
    setConfig({
      ...presetConfig,
      lastUpdatedByAdmin: `Applied preset: ${presetConfig.baselineYear} baseline on ${new Date().toLocaleDateString()}`,
    });
    setSaveSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError('');
    setSaveSuccess(false);

    const validation = validatePopulationConfig(config);
    if (!validation.isValid) {
      setSaveError(validation.error || 'Validation failed. Please check form values.');
      return;
    }

    const payload: PopulationConfig = {
      ...config,
      baselinePopulation: Number(config.baselinePopulation),
      annualGrowthRate: Number(config.annualGrowthRate),
      lastUpdatedByAdmin: `Updated by Admin on ${new Date().toLocaleString('en-IN')}`,
    };

    const res = savePopulationConfig(payload);
    if (res.success) {
      setSaveSuccess(true);
      setConfig(payload);
    } else {
      setSaveError(res.error || 'Failed to save configuration');
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all population parameters to official factory defaults?')) {
      const def = resetPopulationConfig();
      setConfig(def);
      setSaveSuccess(true);
      setSaveError('');
    }
  };

  // If not authenticated, render the PIN protection screen (Requirement #7)
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md text-center space-y-6">
        <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <Lock className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Authorized Personnel Only
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Demographic Admin Panel
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Restricted interface for configuring the official population baseline, demographic growth assumptions, and authoritative citation sources.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-slate-400" />
              Administrator PIN
            </label>
            <input
              type="password"
              placeholder="Enter PIN (Demo: admin2026)"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono tracking-widest"
              autoFocus
            />
          </div>

          {authError && (
            <div className="p-3 bg-red-50 text-red-900 text-xs rounded-xl border border-red-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <div className="flex flex-col gap-2 pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Unlock className="w-4 h-4 text-amber-400" />
              Unlock Admin Controls
            </button>

            <button
              type="button"
              onClick={handleDemoUnlock}
              className="w-full py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 transition-colors"
            >
              Quick Demo Unlock (Academic Review)
            </button>
          </div>
        </form>

        <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-100">
          Academic Project Security: Controls are restricted to prevent casual or accidental tampering with baseline demographic statistics.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Administrator Control Panel Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Official Population Data Configuration
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Modify the official demographic baseline, growth parameters, and citation sources. The portal will automatically recalculate daily estimates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onNavigate && (
              <button
                onClick={() => onNavigate('population')}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
              >
                View Live Population →
              </button>
            )}

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-800 text-xs font-bold border border-red-200 transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-red-600" />
              Lock Panel
            </button>
          </div>
        </div>

        {/* Status messages */}
        {saveSuccess && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-bold">
                Configuration successfully saved! Daily population estimate recalculated across all portal dashboards.
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-800">
              New Estimate: {previewEstimate.currentEstimatedPopulation.toLocaleString('en-IN')}
            </span>
          </div>
        )}

        {saveError && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span className="font-bold">{saveError}</span>
          </div>
        )}

        {/* Quick Official Presets (Requirement #5) */}
        <div className="mt-6 space-y-2">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <span>Authoritative Government Presets</span>
            <span className="text-slate-400 font-normal">(Click to populate form fields)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {OFFICIAL_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset.config)}
                className="text-left p-3 rounded-2xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all text-xs space-y-1 bg-slate-50/50"
              >
                <div className="font-bold text-slate-900">{preset.label}</div>
                <div className="text-[11px] text-slate-500 line-clamp-2">{preset.description}</div>
                <div className="text-[10px] font-mono font-bold text-amber-800 pt-1">
                  Base: {preset.config.baselinePopulation.toLocaleString('en-IN')} | Rate: {preset.config.annualGrowthRate}%
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Form Fields */}
        <form onSubmit={handleSave} className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Edit Demographic Parameters
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            {/* 1. Baseline Population */}
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Baseline Population <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1000000"
                max="200000000"
                value={config.baselinePopulation}
                onChange={(e) =>
                  setConfig({ ...config, baselinePopulation: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
                required
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Official enumerated population (e.g. 72,147,030 for Census 2011).
              </p>
            </div>

            {/* 2. Baseline Year */}
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Baseline Year <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={config.baselineYear}
                onChange={(e) => setConfig({ ...config, baselineYear: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
                placeholder="2011"
                required
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Year of official headcount or projection baseline.
              </p>
            </div>

            {/* 3. Baseline Date */}
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Baseline Date (YYYY-MM-DD) <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={config.baselineDate}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setConfig({ ...config, baselineDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
                required
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Census reference moment (e.g. 2011-03-01).
              </p>
            </div>

            {/* 4. Annual Growth Rate */}
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Annual Growth Rate (%) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="-2"
                max="10"
                value={config.annualGrowthRate}
                onChange={(e) =>
                  setConfig({ ...config, annualGrowthRate: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
                required
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Documented annual rate (0.58% recommended for TN).
              </p>
            </div>

            {/* 5. Source Name */}
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-800 mb-1">
                Authoritative Source Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={config.sourceName}
                onChange={(e) => setConfig({ ...config, sourceName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                required
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Official agency (e.g. Office of Registrar General & Census Commissioner of India).
              </p>
            </div>

            {/* 6. Source URL */}
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-800 mb-1">
                Source Verification URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={config.sourceURL}
                onChange={(e) => setConfig({ ...config, sourceURL: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-mono"
                required
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Official portal web address (e.g. https://censusindia.gov.in).
              </p>
            </div>

            {/* 7. Notes */}
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-800 mb-1">
                Demographic Methodology Notes & Observations
              </label>
              <textarea
                rows={3}
                value={config.notes || ''}
                onChange={(e) => setConfig({ ...config, notes: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                placeholder="Add contextual remarks regarding sample survey reports, gazette citations, or projection cohorts..."
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              Reset to Factory Defaults
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-colors inline-flex items-center gap-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              Save & Recalculate Now
            </button>
          </div>
        </form>

        {/* Right 1 Col: Real-Time Preview Card */}
        <div className="space-y-5">
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                Live Preview
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                Formula Active
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-400">Projected Population for Today</div>
              <div className="text-3xl font-extrabold font-mono text-amber-300 tabular-nums">
                {previewEstimate.currentEstimatedPopulation.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-slate-400">
                (~{(previewEstimate.currentEstimatedPopulation / 10000000).toFixed(2)} Crore)
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Baseline Pop:</span>
                <span className="font-mono text-white">
                  {Number(config.baselinePopulation).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Baseline Year:</span>
                <span className="font-mono text-white">{config.baselineYear}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Days Elapsed:</span>
                <span className="font-mono text-white">
                  {previewEstimate.daysElapsed.toLocaleString('en-IN')} days
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Daily Growth:</span>
                <span className="font-mono text-emerald-400 font-bold">
                  +{previewEstimate.estimatedDailyChange.toLocaleString('en-IN')} / day
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Calculated Sex Ratio:</span>
                <span className="font-mono text-white">
                  {previewEstimate.estimatedSexRatio}
                </span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-slate-400 leading-relaxed border-t border-slate-800">
              Note: Changes take effect immediately across all charts, cards, and the 30-day update log upon clicking "Save & Recalculate Now".
            </div>
          </div>

          <div className="bg-amber-50 p-5 rounded-3xl border border-amber-200 text-xs text-amber-950 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <Info className="w-4 h-4 text-amber-700" />
              Academic Ethics & Non-Fabrication Policy
            </div>
            <p className="leading-relaxed">
              In accordance with project guidelines, do not enter arbitrary or unverified population figures. Always cite documented releases from the Registrar General of India, Government of Tamil Nadu, or published SRS bulletins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
