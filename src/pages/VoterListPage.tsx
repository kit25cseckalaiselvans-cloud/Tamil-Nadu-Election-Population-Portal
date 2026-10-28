import React, { useState } from 'react';
import {
  Search,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  FileText,
  MapPin,
  QrCode,
  Smartphone,
  CheckCircle,
  Info,
  CreditCard,
  Building,
} from 'lucide-react';

export const VoterListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'epic' | 'details' | 'mobile'>('epic');

  return (
    <div className="space-y-10 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold w-fit mb-3 border border-blue-200">
          <Search className="w-3.5 h-3.5" />
          Electoral Roll & Polling Station Guidance
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
          Check Your Voter List & Electoral Roll Information
        </h1>
        <p className="mt-2 text-slate-600 text-sm leading-relaxed">
          Learn how to search your name on the verified Electoral Roll of Tamil Nadu, locate your assigned Polling Station, retrieve your EPIC number, and identify your Assembly Constituency on the official government server.
        </p>

        {/* PRIMARY ACTION BUTTON AS REQUIRED */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
          <a
            id="btn-check-official-voter-info"
            href="https://electoralsearch.eci.gov.in"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 tracking-tight group"
          >
            <span>Check Official Voter Information</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <span className="text-xs text-slate-500 text-center sm:text-left">
            Redirects directly to the secure Election Commission of India server: <br />
            <code className="text-[11px] text-amber-700 bg-amber-50 px-1 py-0.5 rounded font-mono">
              electoralsearch.eci.gov.in
            </code>
          </span>
        </div>
      </div>

      {/* STRICT STATUTORY WARNING FROM PROMPT */}
      <section
        id="statutory-voter-list-notice"
        className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 shrink-0 mt-0.5">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
            <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider">
              Educational Project Notice: No Fake Voter Database
            </h3>
            <p className="font-medium text-slate-900">
              Important: This portal does NOT host a private or fake voter database, and DOES NOT claim to verify any citizen's electoral roll registration directly.
            </p>
            <p>
              Voter status and electoral roll entries can <strong>only</strong> be authoritatively verified through the official Election Commission of India database. We provide step-by-step guidance below to help you navigate the official ECI portal safely.
            </p>
          </div>
        </div>
      </section>

      {/* 3 WAYS TO SEARCH ON OFFICIAL ECI PORTAL */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-600" />
            Official Electoral Search Methods Explained
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            The Election Commission of India provides 3 official query modes on electoralsearch.eci.gov.in
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl border border-slate-200 bg-slate-100 p-1">
          <button
            onClick={() => setActiveTab('epic')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'epic'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <CreditCard className="w-4 h-4 text-blue-600" />
            1. Search by EPIC Number
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'details'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            2. Search by Details
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'mobile'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <Smartphone className="w-4 h-4 text-purple-600" />
            3. Search by Mobile OTP
          </button>
        </div>

        {/* Tab Content 1: EPIC */}
        {activeTab === 'epic' && (
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Method A: Search by EPIC (Electors Photo Identity Card Number)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              This is the fastest and most accurate method. Your EPIC number is the alphanumeric identifier printed on the front of your Voter ID card (typically 3 letters followed by 7 digits, e.g. <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">ABC1234567</code>).
            </p>

            <div className="space-y-2 text-xs text-slate-700 bg-white p-4 rounded-lg border border-slate-200">
              <div className="font-semibold text-slate-900 mb-2">Required Fields on Official Form:</div>
              <ul className="list-decimal list-inside space-y-1.5">
                <li>Select Language (English / Tamil / Regional)</li>
                <li>Enter EPIC Number (Electors Photo Identity Card No.)</li>
                <li>Select State: <strong>Tamil Nadu (S22)</strong></li>
                <li>Enter Captcha code displayed on screen</li>
                <li>Click <strong>“Search”</strong></li>
              </ul>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
              <strong>Tip:</strong> If your card is old or lost, you can also look up your EPIC via Method B (Details Search) or download your digital e-EPIC on voters.eci.gov.in.
            </div>
          </div>
        )}

        {/* Tab Content 2: Details */}
        {activeTab === 'details' && (
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Method B: Search by Personal Details (Name, Relative, Age)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use this mode if you do not remember your EPIC number. The official algorithm matches phonetic spellings in both Tamil and English scripts.
            </p>

            <div className="space-y-2 text-xs text-slate-700 bg-white p-4 rounded-lg border border-slate-200">
              <div className="font-semibold text-slate-900 mb-2">Required Fields on Official Form:</div>
              <ul className="list-decimal list-inside space-y-1.5">
                <li>Select State: <strong>Tamil Nadu</strong></li>
                <li>Select District (one of Tamil Nadu's 38 districts)</li>
                <li>Select Assembly Constituency (e.g. 018-Harur, 126-Madurai Central)</li>
                <li>Enter Name of Elector & Father's/Husband's Name</li>
                <li>Enter Date of Birth or approximate Age</li>
                <li>Enter Captcha & Click Search</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab Content 3: Mobile */}
        {activeTab === 'mobile' && (
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Method C: Search by Registered Mobile Number
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Applicable if your mobile number was previously linked to your voter record (Form 8 or online registration). ECI will dispatch an OTP to verify your identity before showing voter records linked to that number.
            </p>

            <div className="space-y-2 text-xs text-slate-700 bg-white p-4 rounded-lg border border-slate-200">
              <div className="font-semibold text-slate-900 mb-2">Required Steps on Official Form:</div>
              <ul className="list-decimal list-inside space-y-1.5">
                <li>Select State: <strong>Tamil Nadu</strong></li>
                <li>Enter Registered 10-Digit Mobile Number</li>
                <li>Enter Captcha & click “Send OTP”</li>
                <li>Enter the 6-digit OTP received from ECI</li>
                <li>View all enrolled family members linked to the phone number</li>
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* ANATOMY OF ELECTORAL ROLL SLIP */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Info className="w-5 h-5 text-amber-600" />
          Key Information Disclosed on Your Official Voter Information Slip (VIS)
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          When you perform an official search or receive a Voter Information Slip prior to election day, verify the following five crucial parameters:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-blue-600" />
              1. Assembly Constituency (AC)
            </div>
            <p className="text-slate-600">
              The exact Tamil Nadu Legislative Assembly constituency number and name (e.g., AC-24 Thiru-Vi-Ka Nagar, AC-210 Tirunelveli).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-600" />
              2. Part Number & Serial Number
            </div>
            <p className="text-slate-600">
              The specific polling booth part section (e.g. Part No. 45) and your serial index number in the booth roll (e.g. Sl. No. 642).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-600" />
              3. Polling Station Name & Address
            </div>
            <p className="text-slate-600">
              The exact building, school, or community hall address where your electronic voting machine (EVM) booth is physically located.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-purple-600" />
              4. Booth Level Officer (BLO) Contact
            </div>
            <p className="text-slate-600">
              The official government teacher or municipal staff member designated as your local BLO, with mobile contact for inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION BUTTON */}
      <div className="text-center p-8 bg-gradient-to-br from-slate-900 to-amber-950 rounded-2xl text-white shadow-md">
        <h3 className="text-xl font-bold font-display">Ready to verify your official electoral registration?</h3>
        <p className="text-xs text-slate-300 mt-2 max-w-xl mx-auto">
          Click below to open the Election Commission of India search engine in a secure window.
        </p>
        <a
          href="https://electoralsearch.eci.gov.in"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg transition-all"
        >
          <span>Check Official Voter Information</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
