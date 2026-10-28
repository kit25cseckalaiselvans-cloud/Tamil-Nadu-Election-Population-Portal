import React from 'react';
import { PageId } from '../types';
import { STATE_OVERVIEW, TURNOUT_TRENDS, DISTRICTS_DATA } from '../data/tnData';
import { StatCard } from '../components/StatCard';
import {
  Vote,
  TrendingUp,
  BarChart3,
  Calendar,
  Building,
  CheckCircle2,
  Users,
  Award,
  ExternalLink,
  Percent,
  Landmark,
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
} from 'recharts';

interface ElectionStatsPageProps {
  onNavigate?: (page: PageId) => void;
}

export const ElectionStatsPage: React.FC<ElectionStatsPageProps> = ({ onNavigate }) => {
  const { voters, latestElection } = STATE_OVERVIEW;

  // Historical Turnout Trend
  const turnoutChartData = TURNOUT_TRENDS.map((t) => ({
    election: `${t.year} (${t.electionType.substring(0, 2)})`,
    TotalTurnout: t.totalTurnout,
    MaleTurnout: t.maleTurnout,
    FemaleTurnout: t.femaleTurnout,
  }));

  // Top Turnout vs Urban Turnout comparison in 2024
  const turnoutComparisonDistricts = [
    { district: 'Dharmapuri', turnout: 81.48, type: 'Highest Rural Turnout' },
    { district: 'Ariyalur', turnout: 79.80, type: 'High Turnout' },
    { district: 'Kallakurichi', turnout: 79.25, type: 'High Turnout' },
    { district: 'Karur', turnout: 78.70, type: 'High Turnout' },
    { district: 'Salem', turnout: 78.13, type: 'High Turnout' },
    { district: 'State Average', turnout: 69.72, type: 'Tamil Nadu State' },
    { district: 'Coimbatore', turnout: 64.81, type: 'Urban Center' },
    { district: 'Madurai', turnout: 62.04, type: 'Urban Center' },
    { district: 'Chennai', turnout: 56.45, type: 'Metropolitan Urban' },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-3 border border-amber-200">
            <Vote className="w-3.5 h-3.5" />
            Election Commission of India & CEO Tamil Nadu
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Tamil Nadu Election Statistics
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            Analytical compendium of Parliamentary and Legislative Assembly elections in Tamil Nadu, tracking voter participation, gender voting patterns, and historical turnout trends from 2009 to 2024.
          </p>
        </div>

        {/* Action button to ECI results & Legislative Assembly Seats */}
        <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs text-slate-500">
            Official Data Source: ECI General Election Report 2024 & CEO TN Gazette
          </span>
          <div className="flex items-center gap-2">
            {onNavigate && (
              <button
                onClick={() => onNavigate('assembly-seats')}
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-sm"
                title="View all 234 Legislative Assembly Constituencies"
              >
                <Landmark className="w-3.5 h-3.5 text-amber-400" />
                <span>234 Legislative Assembly Seats</span>
              </button>
            )}
            <a
              href="https://eci.gov.in"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
            >
              <span>Visit ECI Results Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* LATEST ELECTION SPOTLIGHT CARDS (2024 Lok Sabha General Elections) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Latest Election Overview
            </span>
            <h2 className="text-xl font-bold text-slate-900 font-display mt-0.5">
              {latestElection.name} ({latestElection.year})
            </h2>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 w-fit">
            Official ECI Results Certified
          </span>
        </div>

        {/* 7 Required Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            id="stat-lok-sabha-seats"
            title="Lok Sabha Constituencies"
            value={`${voters.lokSabhaConstituencies} Seats`}
            subtext="39 Parliamentary Constituencies (7 Reserved for SC)"
            icon={<Building className="w-5 h-5 text-blue-600" />}
            year={latestElection.year}
            source={latestElection.source}
            isOfficial={true}
            accentColor="blue"
          />
          <StatCard
            id="stat-assembly-seats"
            title="Legislative Assembly Seats"
            value={`${voters.assemblyConstituencies} Seats`}
            subtext="234 Constituencies (44 SC, 2 ST Reserved)"
            icon={<Building className="w-5 h-5 text-indigo-600" />}
            year={latestElection.year}
            source={latestElection.source}
            isOfficial={true}
            accentColor="indigo"
          />
          <StatCard
            id="stat-registered-electors"
            title="Registered Electors"
            value={latestElection.totalElectors}
            subtext="6.23 Crore registered voters on final roll"
            icon={<Users className="w-5 h-5 text-emerald-600" />}
            year={latestElection.year}
            source={latestElection.source}
            isOfficial={true}
            accentColor="emerald"
          />
          <StatCard
            id="stat-votes-polled"
            title="Total Votes Polled"
            value={latestElection.votesPolled}
            subtext="4.34 Crore citizen votes cast across 68,144 booths"
            icon={<Vote className="w-5 h-5 text-amber-600" />}
            year={latestElection.year}
            source={latestElection.source}
            isOfficial={true}
            accentColor="amber"
          />
          <StatCard
            id="stat-overall-turnout"
            title="Voter Turnout"
            value={`${latestElection.turnoutPercentage}%`}
            subtext="Statewide polling percentage across Tamil Nadu"
            icon={<Percent className="w-5 h-5 text-emerald-600" />}
            year={latestElection.year}
            source={latestElection.source}
            isOfficial={true}
            accentColor="emerald"
          />
          <StatCard
            id="stat-male-turnout"
            title="Male Turnout"
            value={`${latestElection.maleTurnout}%`}
            subtext="Turnout percentage among enrolled male voters"
            icon={<Users className="w-5 h-5 text-blue-600" />}
            year={latestElection.year}
            source={latestElection.source}
            isOfficial={true}
            accentColor="blue"
          />
          <StatCard
            id="stat-female-turnout"
            title="Female Turnout"
            value={`${latestElection.femaleTurnout}%`}
            subtext="Higher than male turnout by +0.86% in 2024"
            icon={<Users className="w-5 h-5 text-rose-500" />}
            year={latestElection.year}
            source={latestElection.source}
            isOfficial={true}
            accentColor="rose"
          />
          <StatCard
            id="stat-polling-stations"
            title="Polling Stations"
            value={voters.pollingStations}
            subtext="100% webcasting coverage and EVM-VVPAT deployment"
            icon={<CheckCircle2 className="w-5 h-5 text-purple-600" />}
            year={latestElection.year}
            source={latestElection.source}
            isOfficial={true}
            accentColor="indigo"
          />
        </div>
      </section>

      {/* REQUIRED CHART: TURNOUT COMPARISON ACROSS ELECTIONS */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Historical Voter Turnout Comparison (2009 – 2024)
            </h3>
            <p className="text-xs text-slate-500">
              Comparative analysis of voter participation across Lok Sabha (LS) and Assembly (AE) elections.
            </p>
          </div>
          <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full font-medium border border-amber-200 w-fit">
            Election Commission of India Records
          </span>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={turnoutChartData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="election" tick={{ fontSize: 11 }} />
              <YAxis domain={[65, 82]} unit="%" tick={{ fontSize: 11 }} />
              <Tooltip formatter={(val: number) => [`${val}%`, 'Turnout']} />
              <Legend />
              <Line
                type="monotone"
                dataKey="TotalTurnout"
                stroke="#d97706"
                strokeWidth={3}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
                name="Overall Turnout"
              />
              <Line
                type="monotone"
                dataKey="FemaleTurnout"
                stroke="#ec4899"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Female Turnout"
              />
              <Line
                type="monotone"
                dataKey="MaleTurnout"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Male Turnout"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Historical Turnout Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl mt-4">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                <th className="py-2.5 px-4">Election & Year</th>
                <th className="py-2.5 px-4">Type</th>
                <th className="py-2.5 px-4 text-right">Total Electors</th>
                <th className="py-2.5 px-4 text-right">Turnout (%)</th>
                <th className="py-2.5 px-4 text-right">Male Turnout (%)</th>
                <th className="py-2.5 px-4 text-right">Female Turnout (%)</th>
                <th className="py-2.5 px-4">Official Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {TURNOUT_TRENDS.map((item) => (
                <tr key={item.year + item.electionType} className="hover:bg-slate-50">
                  <td className="py-2 px-4 font-bold">{item.year} Elections</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        item.electionType === 'Lok Sabha'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.electionType}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-right font-medium">
                    {item.totalElectors.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2 px-4 text-right font-bold text-amber-700">
                    {item.totalTurnout}%
                  </td>
                  <td className="py-2 px-4 text-right">{item.maleTurnout}%</td>
                  <td className="py-2 px-4 text-right font-semibold text-rose-700">
                    {item.femaleTurnout}%
                  </td>
                  <td className="py-2 px-4 text-slate-500">ECI Certified Report</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* URBAN VS RURAL TURNOUT CONTRAST IN 2024 */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 font-display">
            Constituency Turnout Analysis: Rural Enthusiasm vs. Urban Apathy (2024)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Demonstrates the significant voting disparity between rural agrarian constituencies and metropolitan urban centers.
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={turnoutComparisonDistricts}
              margin={{ top: 10, right: 20, left: 0, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="district"
                angle={-25}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 11 }}
              />
              <YAxis domain={[50, 90]} unit="%" tick={{ fontSize: 11 }} />
              <Tooltip formatter={(val: number) => [`${val}%`, 'Turnout']} />
              <Bar dataKey="turnout" fill="#d97706" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <strong>Key Analytical Takeaway:</strong> Dharmapuri district recorded the state's highest turnout at <strong>81.48%</strong>, followed by Ariyalur (79.80%) and Kallakurichi (79.25%). In contrast, Chennai recorded <strong>56.45%</strong>, illustrating significant urban apathy despite extensive SVEEP awareness drives by the CEO of Tamil Nadu.
        </div>
      </section>
    </div>
  );
};
