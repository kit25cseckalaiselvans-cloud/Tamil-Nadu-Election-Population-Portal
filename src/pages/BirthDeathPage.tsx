import React, { useState } from 'react';
import { STATE_OVERVIEW, VITAL_TRENDS, DISTRICTS_DATA } from '../data/tnData';
import { StatCard } from '../components/StatCard';
import {
  HeartPulse,
  Activity,
  Calendar,
  ShieldCheck,
  TrendingUp,
  FileCheck2,
  Users,
  Baby,
  Skull,
  Award,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const BirthDeathPage: React.FC = () => {
  const { vitalStats } = STATE_OVERVIEW;
  const [selectedYear, setSelectedYear] = useState<string>('2023');

  // Trend data for charts
  const birthTrendData = VITAL_TRENDS.map((t) => ({
    year: t.year,
    Births: t.births,
    Rate: t.crudeBirthRate,
  }));

  const deathTrendData = VITAL_TRENDS.map((t) => ({
    year: t.year,
    Deaths: t.deaths,
    Rate: t.crudeDeathRate,
  }));

  const comparisonData = VITAL_TRENDS.map((t) => ({
    year: t.year,
    Births: t.births,
    Deaths: t.deaths,
    NaturalIncrease: t.naturalIncrease,
  }));

  // Gender breakdown for births
  const birthGenderData = [
    { name: 'Male Births (51.5%)', value: vitalStats.maleBirths, color: '#3b82f6' },
    { name: 'Female Births (48.5%)', value: vitalStats.femaleBirths, color: '#ec4899' },
  ];

  // Gender breakdown for deaths
  const deathGenderData = [
    { name: 'Male Deaths (56.8%)', value: vitalStats.maleDeaths, color: '#475569' },
    { name: 'Female Deaths (43.2%)', value: vitalStats.femaleDeaths, color: '#94a3b8' },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold mb-3 border border-rose-200">
            <HeartPulse className="w-3.5 h-3.5" />
            Civil Registration System (CRS) • Govt. of Tamil Nadu & ORGI
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Birth & Death Vital Statistics
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            Comprehensive vital statistics dashboard for Tamil Nadu. All statistics reported represent 100% legally registered vital events under the Registration of Births and Deaths (RBD) Act, 1969.
          </p>
        </div>

        {/* Data Governance Assurance */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              <strong>Registration Compliance:</strong> Tamil Nadu has achieved near 100% institutional delivery rate (99.8%) and medical certification of vital events.
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-500">
            Year: 2022-2023 CRS Report • Source: Chief Registrar of Births and Deaths, TN
          </span>
        </div>
      </div>

      {/* SECTION 1: BIRTH STATISTICS */}
      <section id="birth-statistics-section" className="space-y-6">
        <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Baby className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                1. Birth Statistics Dashboard
              </h2>
              <p className="text-xs text-slate-500">
                Total registered live births, sex ratio at birth, and birth rate trends.
              </p>
            </div>
          </div>
          <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-medium w-fit">
            Registered Events (Official CRS)
          </span>
        </div>

        {/* Birth Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            id="stat-total-births"
            title="Total Registered Births"
            value={vitalStats.annualBirths}
            subtext="Annual registered live births across 38 districts"
            icon={<Baby className="w-5 h-5 text-emerald-600" />}
            year={vitalStats.year}
            source={vitalStats.source}
            isOfficial={vitalStats.isOfficial}
            accentColor="emerald"
          />
          <StatCard
            id="stat-male-births"
            title="Male Births"
            value={vitalStats.maleBirths}
            subtext="51.5% of total live births"
            icon={<Users className="w-5 h-5 text-blue-600" />}
            year={vitalStats.year}
            source={vitalStats.source}
            isOfficial={vitalStats.isOfficial}
            accentColor="blue"
          />
          <StatCard
            id="stat-female-births"
            title="Female Births"
            value={vitalStats.femaleBirths}
            subtext="48.5% of total live births (Sex Ratio at Birth: 942)"
            icon={<Users className="w-5 h-5 text-rose-500" />}
            year={vitalStats.year}
            source={vitalStats.source}
            isOfficial={vitalStats.isOfficial}
            accentColor="rose"
          />
          <StatCard
            id="stat-birth-rate"
            title="Crude Birth Rate (CBR)"
            value={`${vitalStats.birthRate}`}
            subtext="Per 1,000 population (National CBR: 19.5)"
            icon={<TrendingUp className="w-5 h-5 text-amber-600" />}
            year={vitalStats.year}
            source={vitalStats.source}
            isOfficial={vitalStats.isOfficial}
            accentColor="amber"
          />
        </div>

        {/* Birth Trend Chart & Gender Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Birth Trend (2018 - 2023)</h3>
                <p className="text-xs text-slate-500">Year-wise total registered births in Tamil Nadu</p>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                CRS Time-Series
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={birthTrendData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis
                    domain={[850000, 1000000]}
                    tickFormatter={(val) => `${(val / 100000).toFixed(1)}L`}
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip formatter={(val: number) => [val.toLocaleString('en-IN'), 'Registered Births']} />
                  <Line
                    type="monotone"
                    dataKey="Births"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-500 text-center mt-2">
              Stabilized fertility rate reflecting mature demographic transition and women's health development.
            </p>
          </div>

          {/* Gender distribution donut */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Gender Distribution at Birth</h3>
              <p className="text-xs text-slate-500">Live births by sex ratio</p>
              <div className="h-44 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={birthGenderData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {birthGenderData.map((entry, index) => (
                        <Cell key={`birth-gender-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val: number) => [val.toLocaleString('en-IN'), '']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="space-y-1.5 text-xs border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Male Births:</span>
                <span className="font-bold text-blue-600">{vitalStats.maleBirths.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Female Births:</span>
                <span className="font-bold text-rose-600">{vitalStats.femaleBirths.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100 text-[11px] text-slate-500">
                <span>Institutional Rate:</span>
                <span className="font-bold text-emerald-600">99.8% in hospitals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DEATH STATISTICS */}
      <section id="death-statistics-section" className="space-y-6">
        <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-800 border border-slate-300">
              <Skull className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                2. Death Statistics Dashboard
              </h2>
              <p className="text-xs text-slate-500">
                Total registered deaths, mortality rates, and epidemiological trends.
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-700 bg-slate-100 border border-slate-300 px-2.5 py-1 rounded-full font-medium w-fit">
            Registered Deaths (CRS Civil Registry)
          </span>
        </div>

        {/* Death Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            id="stat-total-deaths"
            title="Total Registered Deaths"
            value={vitalStats.annualDeaths}
            subtext="Annual registered deaths across all districts"
            icon={<Skull className="w-5 h-5 text-slate-700" />}
            year={vitalStats.year}
            source={vitalStats.source}
            isOfficial={vitalStats.isOfficial}
            accentColor="slate"
          />
          <StatCard
            id="stat-male-deaths"
            title="Male Deaths"
            value={vitalStats.maleDeaths}
            subtext="56.8% of total registered deaths"
            icon={<Users className="w-5 h-5 text-slate-600" />}
            year={vitalStats.year}
            source={vitalStats.source}
            isOfficial={vitalStats.isOfficial}
            accentColor="slate"
          />
          <StatCard
            id="stat-female-deaths"
            title="Female Deaths"
            value={vitalStats.femaleDeaths}
            subtext="43.2% of total registered deaths"
            icon={<Users className="w-5 h-5 text-slate-500" />}
            year={vitalStats.year}
            source={vitalStats.source}
            isOfficial={vitalStats.isOfficial}
            accentColor="slate"
          />
          <StatCard
            id="stat-death-rate"
            title="Crude Death Rate (CDR)"
            value={`${vitalStats.deathRate}`}
            subtext="Per 1,000 population (National CDR: 6.0)"
            icon={<Activity className="w-5 h-5 text-indigo-600" />}
            year={vitalStats.year}
            source={vitalStats.source}
            isOfficial={vitalStats.isOfficial}
            accentColor="indigo"
          />
        </div>

        {/* Death Trend Chart & Gender Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Death Trend (2018 - 2023)</h3>
                <p className="text-xs text-slate-500">Annual mortality events (Noticeable spike in 2021 pandemic peak)</p>
              </div>
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-300">
                CRS Official
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={deathTrendData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis
                    domain={[500000, 850000]}
                    tickFormatter={(val) => `${(val / 100000).toFixed(1)}L`}
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip formatter={(val: number) => [val.toLocaleString('en-IN'), 'Registered Deaths']} />
                  <Line
                    type="monotone"
                    dataKey="Deaths"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-500 text-center mt-2">
              Normal mortality rates returned to ~6.1 Lakhs post-2021 with enhanced public health response.
            </p>
          </div>

          {/* Gender breakdown donut */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Mortality Gender Ratio</h3>
              <p className="text-xs text-slate-500">Registered deaths by gender</p>
              <div className="h-44 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deathGenderData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {deathGenderData.map((entry, index) => (
                        <Cell key={`death-gender-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val: number) => [val.toLocaleString('en-IN'), '']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="space-y-1.5 text-xs border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Male Deaths:</span>
                <span className="font-bold text-slate-800">{vitalStats.maleDeaths.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Female Deaths:</span>
                <span className="font-bold text-slate-800">{vitalStats.femaleDeaths.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100 text-[11px] text-slate-500">
                <span>Infant Mortality Rate (IMR):</span>
                <span className="font-bold text-emerald-600">13 per 1,000 live births</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: BIRTHS VS DEATHS COMPARATIVE CHART */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              3. Comparative Dynamics: Births vs Deaths
            </h3>
            <p className="text-xs text-slate-500">
              Natural annual growth calculation (Births minus Deaths) over the past 6 reporting years.
            </p>
          </div>
          <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium border border-indigo-200 w-fit">
            Natural Increase: ~3.16 Lakhs / Year
          </span>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis
                tickFormatter={(val) => `${(val / 100000).toFixed(1)}L`}
                tick={{ fontSize: 11 }}
              />
              <Tooltip formatter={(val: number) => [val.toLocaleString('en-IN'), '']} />
              <Legend />
              <Bar dataKey="Births" fill="#10b981" radius={[4, 4, 0, 0]} name="Annual Births" />
              <Bar dataKey="Deaths" fill="#ef4444" radius={[4, 4, 0, 0]} name="Annual Deaths" />
              <Bar dataKey="NaturalIncrease" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Natural Increase" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Metrics Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl mt-4">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                <th className="py-2.5 px-4">Reporting Year</th>
                <th className="py-2.5 px-4 text-right">Registered Births</th>
                <th className="py-2.5 px-4 text-right">Registered Deaths</th>
                <th className="py-2.5 px-4 text-right">Natural Increase</th>
                <th className="py-2.5 px-4 text-right">Crude Birth Rate</th>
                <th className="py-2.5 px-4 text-right">Crude Death Rate</th>
                <th className="py-2.5 px-4">Official Measure Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {VITAL_TRENDS.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50">
                  <td className="py-2 px-4 font-bold">{row.year}</td>
                  <td className="py-2 px-4 text-right font-medium text-emerald-700">
                    {row.births.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2 px-4 text-right font-medium text-rose-700">
                    {row.deaths.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2 px-4 text-right font-bold text-blue-700">
                    {row.naturalIncrease.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2 px-4 text-right">{row.crudeBirthRate} / 1000</td>
                  <td className="py-2 px-4 text-right">{row.crudeDeathRate} / 1000</td>
                  <td className="py-2 px-4 text-slate-500">Civil Registration System (CRS)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-2 text-[11px] text-slate-500 flex flex-wrap justify-between items-center">
          <span>Year: 2018 - 2023 CRS Annual Compendium</span>
          <span>Source: Office of the Chief Registrar of Births and Deaths & Directorate of Public Health, Tamil Nadu</span>
        </div>
      </section>
    </div>
  );
};
