import React from 'react';
import {
  Building2,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Vote,
  Users,
  FileCheck,
  Eye,
  Smartphone,
  PhoneCall,
  Scale,
  Award,
} from 'lucide-react';

export const ElectionCommissionPage: React.FC = () => {
  return (
    <div className="space-y-10 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-8 shadow-md border border-slate-700">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5" />
            Constitutional Framework • Article 324
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            Election Commission & Chief Electoral Officer
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Understanding the constitutional authority of the Election Commission of India (ECI)
            and the executive machinery of the Chief Electoral Officer (CEO), Tamil Nadu responsible for free, fair, and accessible elections.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              id="btn-visit-official-election-website"
              href="https://elections.tn.gov.in"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>Visit Official Election Website (CEO Tamil Nadu)</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://eci.gov.in"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-600 transition-all flex items-center gap-2"
            >
              <span>Election Commission of India (ECI)</span>
              <ExternalLink className="w-4 h-4 text-amber-400" />
            </a>
          </div>
        </div>
      </div>

      {/* SECTION 1: ELECTION COMMISSION OF INDIA */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                Election Commission of India (ECI)
              </h2>
              <p className="text-xs text-slate-500">
                Established under Article 324 of the Constitution of India on 25th January 1950 (National Voters' Day).
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200 w-fit">
            Apex Autonomous Constitutional Body
          </span>
        </div>

        {/* Purpose */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            Purpose & Mandate
          </h3>
          <p className="text-slate-700 text-sm leading-relaxed">
            The Election Commission of India is an autonomous constitutional authority responsible for administering Union and State election processes across India. The Commission oversees elections to the Parliament (Lok Sabha & Rajya Sabha), State Legislative Assemblies, State Legislative Councils, and the offices of the President and Vice-President of India.
          </p>
        </div>

        {/* Responsibilities Grid */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
            Key Responsibilities of ECI
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 w-fit mb-3">
                <Vote className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Election Management</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Formulates election schedules, designates polling stations, deploys central observers, and oversees secure ballot counting with Electronic Voting Machines (EVM) and VVPAT.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 w-fit mb-3">
                <FileCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Electoral Roll Management</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Conducts annual Special Summary Revisions (SSR), prevents duplicate entries, and publishes clean electoral rolls with photograph-linked voter entries.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-300 transition-colors">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600 w-fit mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Voter Registration</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Facilitates inclusive enrollment via Form 6, overseas voter inclusion (Form 6A), modifications (Form 8), and issues Electors Photo Identity Cards (EPIC).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-300 transition-colors">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600 w-fit mb-3">
                <Eye className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Election Monitoring</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Enforces the Model Code of Conduct (MCC), investigates expenditure violations, monitors media propaganda, and addresses citizen complaints via the cVIGIL application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CHIEF ELECTORAL OFFICER – TAMIL NADU */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                Chief Electoral Officer (CEO) – Tamil Nadu
              </h2>
              <p className="text-xs text-slate-500">
                State Nodal Authority functioning under the superintendence, direction, and control of the ECI.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200 w-fit">
            Secretariat, Fort St. George, Chennai
          </span>
        </div>

        {/* Roles & Administrative Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Role & Key Functions in Tamil Nadu
            </h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Executive Direction:</strong> Supervises election operations across all 38 revenue districts, 39 Parliamentary Constituencies, and 234 Assembly Constituencies in Tamil Nadu.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Electoral Roll Preparation:</strong> Directs the District Election Officers (DEOs / District Collectors) and Electoral Registration Officers (EROs) for annual roll revisions and door-to-door verification.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Booth Level Officer (BLO) Supervision:</strong> Oversees ~68,000+ BLOs stationed at polling areas who serve as the grassroots link for verifying voter eligibility.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Logistics & Security Deployment:</strong> Coordinates EVM/VVPAT first-level checking (FLC), training polling personnel, and managing state police/CAPF deployment for peaceful polling.
                </span>
              </li>
            </ul>
          </div>

          {/* Election-Related Citizen Services */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Official Citizen Services Managed
            </h3>
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Electoral Roll PDF Downloads</div>
                  <div className="text-slate-500">Part-wise electoral rolls published in Tamil & English</div>
                </div>
                <a
                  href="https://elections.tn.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-600 font-bold hover:underline"
                >
                  Access
                </a>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Voter Helpline Toll-Free 1950</div>
                  <div className="text-slate-500">24x7 state call center in Tamil & English</div>
                </div>
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <PhoneCall className="w-3 h-3 text-emerald-600" /> 1950
                </span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">cVIGIL Complaint Monitoring</div>
                  <div className="text-slate-500">Report MCC model code violations with geo-tagged photos</div>
                </div>
                <span className="text-emerald-700 font-medium">100-min resolution</span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Saksham App for PwD Voters</div>
                  <div className="text-slate-500">Wheelchair assistance and transport requests at booths</div>
                </div>
                <span className="text-blue-700 font-medium">Accessible Polling</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button Banner */}
        <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-amber-50/50 rounded-xl p-4 border border-amber-200">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Official Portal of CEO Tamil Nadu</h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Access the official government portal for gazettes, election notifications, and voter forms.
            </p>
          </div>
          <a
            href="https://elections.tn.gov.in"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>Visit Official Election Website</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Official Digital Ecosystem Apps */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-amber-400" />
          Official Mobile Applications by Election Commission of India
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <h4 className="font-bold text-amber-400 text-sm">Voter Helpline App</h4>
            <p className="text-slate-300 mt-1">Search electoral roll, submit Form 6/7/8, download e-EPIC, and track application status.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <h4 className="font-bold text-amber-400 text-sm">cVIGIL App</h4>
            <p className="text-slate-300 mt-1">Report Model Code of Conduct violations with live geo-stamped photos and videos during elections.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <h4 className="font-bold text-amber-400 text-sm">Saksham App</h4>
            <p className="text-slate-300 mt-1">Dedicated accessibility app for Persons with Disabilities (PwD) and senior citizens (85+ years).</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <h4 className="font-bold text-amber-400 text-sm">KYC (Know Your Candidate)</h4>
            <p className="text-slate-300 mt-1">View criminal antecedents, financial affidavits, and qualifications of contesting candidates.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
