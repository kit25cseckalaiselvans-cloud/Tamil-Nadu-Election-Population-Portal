import React from 'react';
import { PageId } from '../types';
import { ShieldAlert, ExternalLink, GraduationCap, Vote, Award } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* MANDATORY COLLEGE PROJECT DISCLAIMER BANNER */}
        <div
          id="official-college-disclaimer"
          className="bg-amber-950/40 border-2 border-amber-500/40 rounded-xl p-5 mb-10 shadow-lg"
        >
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-amber-300 text-sm font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                Mandatory Website & Statutory Disclaimer Notice
              </h4>
              <p className="text-slate-200 text-sm leading-relaxed">
                “This portal provides information and links to official government services. Unless specifically authorized by the relevant government department, this portal is not an official government website. Government services requiring official submission will redirect users to the appropriate government website.”
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-amber-200/90 font-medium">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                  Educational & Citizen Information Portal
                </span>
                <span>•</span>
                <span>Zero Storage of Plain-text Passwords or Sensitive Identity Documents</span>
                <span>•</span>
                <span>AI-Assisted Analysis Labeled as Pre-Screening Only</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <Vote className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">TN Election & Population Portal</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Comprehensive educational data portal presenting verified statistics from Census of India, Chief Electoral Officer Tamil Nadu, and Civil Registration System for academic demonstration and research.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Covers 38 Districts & 234 Assembly Constituencies</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Portal Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Dashboard Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('election-commission')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Election Commission Roles & CEO TN
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('population')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  District Population Demographics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('population-history')}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>Tamil Nadu Population (2010–2026)</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">
                    Archive
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('voter-eligibility')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Interactive Voter Eligibility Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('voter-list')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Electoral Roll Verification Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('new-voter')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  New Voter Form 6 Step-by-Step
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Secondary Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Analytical Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('birth-death')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Birth & Death Vital Statistics (CRS)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('districts')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  38-District Deep Dive Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('election-stats')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Lok Sabha & Assembly Turnout Trends
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sources')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Official Government Data Sources
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('methodology')}
                  className="text-amber-400/90 hover:text-amber-300 font-medium transition-colors"
                >
                  Daily Population Methodology & Model
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Demographic Admin Panel (Protected)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  About This College Project
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Portals */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Official Government Portals
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://voters.eci.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>ECI Voters' Service Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://electoralsearch.eci.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>Electoral Search (Check Roll)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://elections.tn.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>Chief Electoral Officer, Tamil Nadu</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://censusindia.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>Census of India</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://crsorgi.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>Civil Registration System (CRS)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and metadata */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Tamil Nadu Election & Population Portal. College Project for Demonstration.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>State: Tamil Nadu (TN)</span>
            <span>•</span>
            <span>Districts: 38</span>
            <span>•</span>
            <span>Assembly Seats: 234</span>
            <span>•</span>
            <span>Lok Sabha Seats: 39</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
