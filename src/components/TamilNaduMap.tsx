import React, { useState } from 'react';
import { DistrictData } from '../types';
import { MapPin, Users, Vote, HeartPulse } from 'lucide-react';

interface TamilNaduMapProps {
  districts: DistrictData[];
  selectedDistrictId?: string;
  onSelectDistrict: (district: DistrictData) => void;
}

export const TamilNaduMap: React.FC<TamilNaduMapProps> = ({
  districts,
  selectedDistrictId,
  onSelectDistrict,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [metric, setMetric] = useState<'population' | 'voters' | 'sexRatio' | 'density'>('population');

  const regions = ['All', 'Northern', 'Western', 'Central', 'Southern', 'Coastal'];

  const filteredDistricts = selectedRegion === 'All'
    ? districts
    : districts.filter((d) => d.region === selectedRegion);

  const selectedDistrict = districts.find((d) => d.id === selectedDistrictId) || districts[0];

  // Helper for color coding based on metric
  const getMetricValue = (d: DistrictData) => {
    switch (metric) {
      case 'population':
        return d.totalPopulation;
      case 'voters':
        return d.registeredVoters;
      case 'sexRatio':
        return d.sexRatio;
      case 'density':
        return d.density;
    }
  };

  const getMetricLabel = (d: DistrictData) => {
    switch (metric) {
      case 'population':
        return `${(d.totalPopulation / 100000).toFixed(1)} L`;
      case 'voters':
        return `${(d.registeredVoters / 100000).toFixed(1)} L`;
      case 'sexRatio':
        return `${d.sexRatio}`;
      case 'density':
        return `${d.density}/km²`;
    }
  };

  // Region colors
  const regionBadges: Record<string, string> = {
    Northern: 'bg-blue-100 text-blue-800 border-blue-200',
    Western: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Central: 'bg-amber-100 text-amber-800 border-amber-200',
    Southern: 'bg-purple-100 text-purple-800 border-purple-200',
    Coastal: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold text-slate-900">Tamil Nadu District Demographics Map</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Click any district to inspect population, registered electors, sex ratio and vital stats.
          </p>
        </div>

        {/* Metric and Region filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Metric Selector */}
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1 text-xs">
            <button
              onClick={() => setMetric('population')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                metric === 'population' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Population
            </button>
            <button
              onClick={() => setMetric('voters')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                metric === 'voters' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Electors
            </button>
            <button
              onClick={() => setMetric('sexRatio')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                metric === 'sexRatio' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sex Ratio
            </button>
            <button
              onClick={() => setMetric('density')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                metric === 'density' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Density
            </button>
          </div>

          {/* Region Tabs */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r === 'All' ? 'All 38 Districts' : `${r} Region`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* District Tiles Grid */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[420px] overflow-y-auto pr-1">
            {filteredDistricts.map((district) => {
              const isSelected = district.id === selectedDistrict?.id;
              return (
                <button
                  key={district.id}
                  id={`district-tile-${district.id}`}
                  onClick={() => onSelectDistrict(district)}
                  className={`text-left p-2.5 rounded-lg border transition-all relative ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-400/30'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {district.name}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded border uppercase font-medium ${
                        regionBadges[district.region]
                      }`}
                    >
                      {district.region.slice(0, 4)}
                    </span>
                  </div>
                  <div className="mt-1 flex items-baseline justify-between text-[11px]">
                    <span className="text-slate-500 capitalize">{metric}:</span>
                    <span className="font-semibold text-slate-800">
                      {getMetricLabel(district)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-400 mt-2 italic">
            Showing {filteredDistricts.length} of {districts.length} districts in Tamil Nadu. Sorted by geographic administrative order.
          </p>
        </div>

        {/* Selected District Spotlight Preview Card */}
        <div className="lg:col-span-4 bg-slate-50 rounded-xl border border-slate-200 p-4.5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
                  District Profile
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-0.5">{selectedDistrict.name}</h4>
                <p className="text-xs text-slate-500">HQ: {selectedDistrict.headquarters} • {selectedDistrict.region} Region</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded border font-semibold ${regionBadges[selectedDistrict.region]}`}>
                {selectedDistrict.region}
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="mt-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white border border-slate-200/80">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  Total Population
                </span>
                <span className="font-bold text-slate-900">
                  {selectedDistrict.totalPopulation.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white border border-slate-200/80">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Vote className="w-3.5 h-3.5 text-emerald-600" />
                  Registered Voters
                </span>
                <span className="font-bold text-slate-900">
                  {selectedDistrict.registeredVoters.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white border border-slate-200/80">
                <span className="text-slate-600">Sex Ratio (F/1000 M)</span>
                <span className={`font-bold ${selectedDistrict.sexRatio >= 1000 ? 'text-emerald-600' : 'text-slate-800'}`}>
                  {selectedDistrict.sexRatio}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white border border-slate-200/80">
                <span className="text-slate-600">2024 Lok Sabha Turnout</span>
                <span className="font-bold text-slate-900">
                  {selectedDistrict.voterTurnout2024}%
                </span>
              </div>

              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white border border-slate-200/80">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                  Annual Registered Births
                </span>
                <span className="font-bold text-slate-900">
                  {selectedDistrict.annualBirths.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
            <div>Parliamentary Constituency: <span className="font-medium text-slate-700">{selectedDistrict.lokSabhaConstituency}</span></div>
            <div className="text-[10px] text-slate-400 mt-0.5">Source: {selectedDistrict.source} ({selectedDistrict.dataYear})</div>
          </div>
        </div>
      </div>
    </div>
  );
};
