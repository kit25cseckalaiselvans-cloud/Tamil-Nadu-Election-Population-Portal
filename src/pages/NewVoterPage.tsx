import React, { useState } from 'react';
import { PageId } from '../types';
import {
  UserPlus,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  FileCheck,
  Smartphone,
  ArrowRight,
  ClipboardList,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';

interface NewVoterPageProps {
  onNavigate: (page: PageId) => void;
}

export const NewVoterPage: React.FC<NewVoterPageProps> = ({ onNavigate }) => {
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const steps = [
    {
      step: 1,
      title: 'Step 1: Check Voter Eligibility',
      desc: 'Confirm you are an Indian citizen, at least 18 years of age (or qualifying soon), and an ordinary resident of your constituency.',
      action: 'Check Eligibility Now',
      page: 'voter-eligibility' as PageId,
    },
    {
      step: 2,
      title: 'Step 2: Visit Official ECI Portal',
      desc: 'Navigate to the National Voters’ Service Portal (voters.eci.gov.in) or launch the official Voter Helpline App on Android/iOS.',
      url: 'https://voters.eci.gov.in',
    },
    {
      step: 3,
      title: 'Step 3: Select Form 6 (New Registration)',
      desc: 'Log in or sign up with your mobile number. Click “Register as a New Elector/Voter” to open Form 6 for Indian citizens.',
      url: 'https://voters.eci.gov.in/form6',
    },
    {
      step: 4,
      title: 'Step 4: Enter Required Information',
      desc: 'Fill your personal details, parent/spouse names, date of birth, current and permanent address in Tamil Nadu, and upload valid documents.',
    },
    {
      step: 5,
      title: 'Step 5: Submit Application & Save Reference ID',
      desc: 'Review the preview form. Submit your application. Note down the 12-digit alphanumeric Reference ID (e.g. TN24XXXXXXXX).',
    },
    {
      step: 6,
      title: 'Step 6: Track Status & Field Verification',
      desc: 'A Booth Level Officer (BLO) will conduct physical verification. Track status online until your EPIC number is generated and your voter card is delivered.',
      url: 'https://voters.eci.gov.in/track',
    },
  ];

  return (
    <div className="space-y-10 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold w-fit mb-3 border border-amber-200">
          <UserPlus className="w-3.5 h-3.5" />
          Form 6 • Electoral Enrollment Guide
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
          Register as a New Voter
        </h1>

        <p className="mt-2 text-slate-600 text-sm leading-relaxed">
          Comprehensive step-by-step roadmap for first-time voters and new residents applying for enrollment on the official Tamil Nadu electoral roll under the Election Commission of India.
        </p>

        {/* PROMINENT BUTTON AS REQUESTED */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
          <a
            id="btn-register-on-official-portal"
            href="https://voters.eci.gov.in"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 tracking-tight group"
          >
            <span>Register on Official Portal</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <span className="text-xs text-slate-500 text-center sm:text-left">
            Direct link to official National Voters' Services Portal: <br />
            <code className="text-[11px] text-amber-700 bg-amber-50 px-1 py-0.5 rounded font-mono">
              voters.eci.gov.in
            </code>
          </span>
        </div>
      </div>

      {/* MANDATORY DISCLAIMER AS REQUESTED */}
      <section
        id="statutory-new-voter-notice"
        className="bg-amber-50/90 border-2 border-amber-400 rounded-2xl p-5 shadow-sm flex items-start gap-3.5"
      >
        <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-slate-950 uppercase tracking-wider mb-1">
            Official Project Boundary Notice
          </h3>
          <p className="text-sm font-semibold text-slate-900 leading-relaxed">
            “This website is an informational college project and does not process voter-registration applications.”
          </p>
          <p className="text-xs text-slate-600 mt-1">
            All legitimate voter registration, biometric linkage, and EPIC card generation must be executed strictly through the official Election Commission portal linked above.
          </p>
        </div>
      </section>

      {/* 6-STEP ENROLLMENT PROCESS AS REQUESTED */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-amber-600" />
            The 6-Step Registration Walkthrough
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Follow this sequential guideline to submit your Form 6 application successfully.
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((item) => (
            <div
              key={item.step}
              id={`reg-step-${item.step}`}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 font-extrabold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-xl">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                {item.page && (
                  <button
                    onClick={() => onNavigate(item.page!)}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>{item.action}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>Official Link</span>
                    <ExternalLink className="w-3 h-3 text-amber-400" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DOCUMENT PREPARATION CHECKLIST */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-600" />
            Pre-Registration Document Checklist (Interactive)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Check off the documents you have ready before clicking into the official ECI Form 6 portal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Proof of Age */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 text-blue-800">
              A. Proof of Date of Birth (Any 1)
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { id: 'age-birth-cert', label: 'Birth Certificate issued by Municipal / CRS' },
                { id: 'age-aadhaar', label: 'Aadhaar Card' },
                { id: 'age-pan', label: 'PAN Card' },
                { id: 'age-dl', label: 'Driving Licence' },
                { id: 'age-mark-sheet', label: 'Class 10th / 12th Board Marksheet' },
                { id: 'age-passport', label: 'Indian Passport' },
              ].map((doc) => (
                <label
                  key={doc.id}
                  className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900"
                >
                  <input
                    type="checkbox"
                    checked={!!checkedDocs[doc.id]}
                    onChange={() => toggleDoc(doc.id)}
                    className="rounded text-amber-500 focus:ring-amber-400"
                  />
                  <span>{doc.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Proof of Residence */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 text-emerald-800">
              B. Proof of Ordinary Residence (Any 1)
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { id: 'res-electricity', label: 'Water / Electricity / Gas Connection Bill (within 1 yr)' },
                { id: 'res-aadhaar', label: 'Aadhaar Card with Tamil Nadu address' },
                { id: 'res-bank', label: 'Current Bank / Post Office Passbook' },
                { id: 'res-passport', label: 'Indian Passport' },
                { id: 'res-deed', label: 'Registered Rent Agreement / Sale Deed' },
              ].map((doc) => (
                <label
                  key={doc.id}
                  className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900"
                >
                  <input
                    type="checkbox"
                    checked={!!checkedDocs[doc.id]}
                    onChange={() => toggleDoc(doc.id)}
                    className="rounded text-amber-500 focus:ring-amber-400"
                  />
                  <span>{doc.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Photograph Specifications */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">Photograph Specification for Upload:</div>
            <div>Recent passport-size color photograph (200 KB max, JPG/JPEG format) with clean white background, full face looking directly into the camera.</div>
          </div>
        </div>
      </section>

      {/* FINAL DIRECT REGISTRATION LINK */}
      <div className="text-center p-8 bg-gradient-to-br from-slate-900 to-amber-950 rounded-2xl text-white shadow-md">
        <h3 className="text-xl font-bold font-display">Ready with your documents?</h3>
        <p className="text-xs text-slate-300 mt-2 max-w-xl mx-auto">
          Visit the official Election Commission portal now to fill out Form 6.
        </p>
        <a
          href="https://voters.eci.gov.in/form6"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg transition-all"
        >
          <span>Register on Official Portal</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
