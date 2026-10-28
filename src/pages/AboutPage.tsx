import React from 'react';
import { PageId } from '../types';
import {
  GraduationCap,
  Code2,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
  ExternalLink,
  Lock,
  ArrowRight,
  Database,
  CheckCircle2,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold w-fit mb-3 border border-amber-200">
          <GraduationCap className="w-3.5 h-3.5" />
          Academic College Capstone Project
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
          About the Tamil Nadu Election & Population Portal
        </h1>
        <p className="mt-2 text-slate-600 text-sm leading-relaxed">
          An academic demonstration project built to bridge the gap between complex civic statistics, electoral literacy, and modern interactive web engineering.
        </p>
      </div>

      {/* PROJECT PURPOSE & MISSION */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            Project Objective & Scope
          </h2>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          Public demographic records, voter registration rules, and electoral metrics are often dispersed across dozens of disparate gazettes, static PDF reports, and separate government repositories. 
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          The <strong>Tamil Nadu Election & Population Portal</strong> synthesizes official open data into an accessible, responsive, single-page application. It provides college students, researchers, first-time voters, and the general public with clear visual insights into the demographic growth, gender dynamics, and democratic participation of all 38 districts of Tamil Nadu.
        </p>
      </section>

      {/* MANDATORY STATUTORY DISCLAIMER BOX */}
      <section
        id="about-academic-disclaimer"
        className="bg-amber-50/90 border-2 border-amber-400 rounded-2xl p-6 shadow-sm space-y-3"
      >
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-950 uppercase tracking-wider mb-1">
              Statutory College Project Disclaimer
            </h3>
            <p className="text-sm font-bold text-slate-900 leading-relaxed">
              “This is a college project and an informational website. It is not an official website of the Election Commission of India or the Government of Tamil Nadu. For official voter registration, electoral-roll verification and election services, use the official government portals.”
            </p>
            <p className="text-xs text-slate-600 mt-2">
              All official voter registration forms (Form 6, Form 7, Form 8) and official electoral roll lookups must be performed directly at <strong>voters.eci.gov.in</strong> or <strong>elections.tn.gov.in</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* TECH STACK ARCHITECTURE */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-600" />
            Engineering & Technology Stack
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Built using modern, industry-standard front-end web engineering practices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-blue-600" />
              React 18 & TypeScript
            </div>
            <p className="text-slate-600">
              Component-based modular architecture, strict type safety, zero runtime exceptions, and reactive local state management.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Tailwind CSS
            </div>
            <p className="text-slate-600">
              Custom design system adhering to strict anti-slop guidelines: balanced typography, high contrast, warm slate neutrals, and responsive layouts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600" />
              Recharts & SVG
            </div>
            <p className="text-slate-600">
              Interactive vector charts (multi-series lines, bar charts, and demographic donuts) plus an interactive regional SVG map of Tamil Nadu.
            </p>
          </div>
        </div>
      </section>

      {/* PRIVACY & SECURITY ETHICS */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-600" />
          Ethical Computing & Zero Data Collection Principles
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Adhering strictly to user privacy and cybersecurity best practices:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
          <li className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>No Aadhaar Collection:</strong> Aadhaar numbers are never requested or handled.</span>
          </li>
          <li className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>No OTP or Passwords:</strong> We do not ask for or store login credentials.</span>
          </li>
          <li className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>No Banking Information:</strong> Zero financial or biometric transactions.</span>
          </li>
          <li className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Transparent Redirection:</strong> All legal applications redirect directly to official ECI portals.</span>
          </li>
        </ul>
      </section>

      {/* QUICK DEMONSTRATION NAVIGATOR */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-md">
        <h3 className="text-lg font-bold font-display">Demonstrate Key Portal Capabilities</h3>
        <p className="text-xs text-slate-300">
          Jump directly to any module to explore data visualizations, tables, or interactive tools:
        </p>

        <div className="flex flex-wrap gap-2.5 pt-2">
          <button
            onClick={() => onNavigate('home')}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            Dashboard Home
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
          <button
            onClick={() => onNavigate('population')}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            Population Directory
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
          <button
            onClick={() => onNavigate('voter-eligibility')}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            Eligibility Checker
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
          <button
            onClick={() => onNavigate('districts')}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            38 District Explorer
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
          <button
            onClick={() => onNavigate('birth-death')}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            Vital CRS Trends
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
          <button
            onClick={() => onNavigate('election-stats')}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            Turnout Analytics
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
