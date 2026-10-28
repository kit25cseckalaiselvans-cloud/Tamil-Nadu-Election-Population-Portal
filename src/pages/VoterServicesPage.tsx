import React, { useState } from 'react';
import { PageId } from '../types';
import {
  Vote,
  UserPlus,
  Search,
  CreditCard,
  PhoneCall,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Landmark,
  FileText,
  Calendar,
  HelpCircle,
  ShieldCheck,
  Building2,
  ArrowRight,
} from 'lucide-react';

interface VoterServicesPageProps {
  onNavigate: (page: PageId) => void;
}

export const VoterServicesPage: React.FC<VoterServicesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const officialServices = [
    {
      id: 'form6',
      title: 'New Voter Registration (Form 6)',
      category: 'Registration',
      icon: <UserPlus className="w-6 h-6 text-emerald-600" />,
      description:
        'Application for inclusion of name in the Electoral Roll for first-time voters or citizens who have turned 18 years of age.',
      eligibility:
        'Indian citizen residing in Tamil Nadu who has attained 18 years of age on the qualifying dates (1 Jan, 1 Apr, 1 Jul, 1 Oct).',
      formNumber: 'Form 6',
      officialUrl: 'https://voters.eci.gov.in/form6',
      authority: 'Election Commission of India (ECI)',
      lastVerified: '2026-03-01',
      actionType: 'external',
      badge: 'Official ECI Form',
    },
    {
      id: 'electoral-search',
      title: 'Search Name in Electoral Roll',
      category: 'Electoral Roll',
      icon: <Search className="w-6 h-6 text-blue-600" />,
      description:
        'Verify your voter registration status, polling station location, assembly constituency, and Part number across all 234 ACs.',
      eligibility: 'All registered electors holding an EPIC Number or demographic details.',
      formNumber: 'National Voter Search',
      officialUrl: 'https://electoralsearch.eci.gov.in',
      authority: 'Election Commission of India (ECI)',
      lastVerified: '2026-03-01',
      actionType: 'external',
      badge: 'Direct Search',
    },
    {
      id: 'epic-download',
      title: 'Download Electronic Voter ID (e-EPIC)',
      category: 'Card Services',
      icon: <CreditCard className="w-6 h-6 text-purple-600" />,
      description:
        'Download a secure, portable, digitally signed PDF version of your Electoral Photo Identity Card on your mobile or computer.',
      eligibility: 'Voters registered with a verified unique mobile number in the ECI database.',
      formNumber: 'e-EPIC Portal',
      officialUrl: 'https://voters.eci.gov.in',
      authority: 'Election Commission of India',
      lastVerified: '2026-03-01',
      actionType: 'external',
      badge: 'Digitally Signed',
    },
    {
      id: 'assembly-seats-directory',
      title: 'Tamil Nadu Legislative Assembly Seats (234)',
      category: 'Information',
      icon: <Landmark className="w-6 h-6 text-amber-600" />,
      description:
        'Comprehensive directory of all 234 Legislative Assembly Constituencies in Tamil Nadu organized district-wise with MLA and category details.',
      eligibility: 'Open to all citizens and researchers.',
      formNumber: 'Constituency Registry',
      officialUrl: 'https://elections.tn.gov.in',
      authority: 'Chief Electoral Officer (CEO), Tamil Nadu',
      lastVerified: '2026-03-01',
      actionType: 'internal',
      internalPage: 'assembly-seats' as PageId,
      badge: 'Interactive Directory',
    },
    {
      id: 'form8-correction',
      title: 'Correction of Entries & Shifting (Form 8)',
      category: 'Correction',
      icon: <FileText className="w-6 h-6 text-teal-600" />,
      description:
        'Application for shifting of residence within or outside assembly constituency, correction of name, age, photo, or replacement of lost EPIC.',
      eligibility: 'Existing registered electors whose details have changed or require correction.',
      formNumber: 'Form 8',
      officialUrl: 'https://voters.eci.gov.in/form8',
      authority: 'Election Commission of India',
      lastVerified: '2026-03-01',
      actionType: 'external',
      badge: 'Correction Service',
    },
    {
      id: 'helpline-1950',
      title: 'Voter Voter Helpline (Call 1950)',
      category: 'Information',
      icon: <PhoneCall className="w-6 h-6 text-red-600" />,
      description:
        'Toll-free national voter helpline operating 24x7 in Tamil and English for voter card tracking, polling booth inquiries, and grievances.',
      eligibility: 'Free for any citizen calling from within Tamil Nadu.',
      formNumber: 'Helpline 1950',
      officialUrl: 'https://elections.tn.gov.in/tollfree.aspx',
      authority: 'CEO Tamil Nadu Call Center',
      lastVerified: '2026-03-01',
      actionType: 'external',
      badge: 'Toll-Free 24x7',
    },
  ];

  const categories = ['All', 'Registration', 'Electoral Roll', 'Card Services', 'Correction', 'Information'];

  const filteredServices = officialServices.filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.formNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
            <Vote className="w-3.5 h-3.5" />
            Verified Electoral Services
          </span>
          <span className="text-slate-400 text-xs">|</span>
          <span className="text-slate-300 text-xs">
            Chief Electoral Officer, Tamil Nadu & Election Commission of India
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Tamil Nadu Voter-Related Services
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Access official Election Commission of India forms, check your electoral roll entry, download e-EPIC cards, and explore all 234 Tamil Nadu Legislative Assembly Constituencies.
        </p>
      </div>

      {/* Mandatory Official Redirection Notice */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 text-amber-950 text-xs leading-relaxed flex items-start gap-3 shadow-2xs">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-900">Official Government Submission Notice:</strong>
          <p className="mt-0.5">
            This portal provides verified information and direct routing to statutory services. Official voter registration and form submissions are legally handled by the <strong>Election Commission of India (ECI)</strong>. Clicking any application form will route you directly to the verified government portal (<code>voters.eci.gov.in</code>).
          </p>
        </div>
      </div>

      {/* Step-by-Step New Voter Registration Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <UserPlus className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                New Voter Registration Guide (Form 6)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Statutory guidance for first-time electors and citizens turning 18 in Tamil Nadu.
            </p>
          </div>

          <a
            href="https://voters.eci.gov.in/form6"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center gap-2 self-start sm:self-auto"
          >
            <span>Apply on Official Government Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              1. Statutory Eligibility
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Must be an Indian citizen and ordinarily resident at the given Tamil Nadu address. Must be 18 years old on any of the 4 qualifying dates: <strong>1st Jan, 1st Apr, 1st Jul, 1st Oct</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              2. Required Documents
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              • Proof of Age: Birth Certificate, Aadhaar, Passport, or 10th Marksheet.<br />
              • Proof of Residence: Electricity bill, Ration card, or Rent agreement.<br />
              • Recent passport-size color photograph.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              3. Verification & Dispatch
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your local Booth Level Officer (BLO) performs field verification. Upon approval, your name is inscribed in the electoral roll and a free EPIC card is dispatched via Speed Post.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid with Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services or forms..."
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                    {srv.icon}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">
                    {srv.badge}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {srv.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                  <div><strong>Authority:</strong> {srv.authority}</div>
                  <div><strong>Verified:</strong> {srv.lastVerified}</div>
                </div>
              </div>

              <div className="mt-5 pt-3">
                {srv.actionType === 'internal' ? (
                  <button
                    onClick={() => srv.internalPage && onNavigate(srv.internalPage)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>Open 234 Assembly Seats Directory</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <a
                    href={srv.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>Access Official ECI Service</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
