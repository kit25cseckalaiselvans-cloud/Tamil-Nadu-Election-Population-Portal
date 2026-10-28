import React, { useState } from 'react';
import { PageId } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  Vote,
  Users,
  Building2,
  CheckCircle2,
  Search,
  UserPlus,
  MapPin,
  BarChart3,
  ExternalLink,
  Menu,
  X,
  Landmark,
  BookOpen,
  Calendar,
  ChevronDown,
  User,
  ShieldAlert,
  LogOut,
  FileCheck2,
  Layers,
  Home,
  UserCheck,
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { user, isOfficer, isAdmin, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Requirement #20: Exact Official Navigation Structure
  const officialNavItems: { id: PageId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'tamil-nadu', label: 'Tamil Nadu', icon: <Landmark className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'districts', label: '38 Districts', icon: <MapPin className="w-3.5 h-3.5 text-blue-400" />, badge: '38' },
    { id: 'assembly-constituencies', label: 'Assembly Constituencies', icon: <Vote className="w-3.5 h-3.5 text-amber-400" />, badge: '234' },
    { id: 'mlas', label: 'MLAs', icon: <Users className="w-3.5 h-3.5 text-purple-400" /> },
    { id: 'village-panchayats', label: 'Village Panchayats', icon: <Building2 className="w-3.5 h-3.5 text-teal-400" />, badge: '12,525' },
    { id: 'villages', label: 'Villages', icon: <Layers className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'local-government', label: 'Local Government', icon: <Building2 className="w-3.5 h-3.5 text-indigo-400" /> },
    { id: 'elected-representatives', label: 'Elected Representatives', icon: <UserCheck className="w-3.5 h-3.5 text-rose-400" /> },
    { id: 'government-sources', label: 'Government Sources', icon: <ExternalLink className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'admin', label: 'Admin', icon: <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />, badge: 'Quality' },
  ];

  // Ancillary Citizen & Voter Services items
  const extraServices: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'population', label: 'Population Projections', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'voter-services', label: 'Voter Services', icon: <Vote className="w-3.5 h-3.5" /> },
    { id: 'election-stats', label: 'Election Statistics', icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { id: 'methodology', label: 'Data Methodology', icon: <BookOpen className="w-3.5 h-3.5" /> },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950 text-white shadow-xl border-b border-emerald-500/30">
      {/* Top Statutory Banner */}
      <div className="bg-slate-900 px-4 py-1.5 border-b border-slate-800 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-500/30">
              <Building2 className="w-3 h-3" />
              Government of Tamil Nadu Public Information Portal
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400 text-[11px]">
              Verified Administrative & Electoral Repository (38 Districts • 234 ACs • 388 Blocks • 12,525 Village Panchayats)
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1 text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30 font-medium">
              <ShieldAlert className="w-3 h-3" />
              Rule #8 Strict Data Integrity Active
            </span>
            <a
              href="https://tnrd.tn.gov.in"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 hidden md:inline-flex items-center gap-1 transition-colors"
            >
              tnrd.tn.gov.in
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header & Brand */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portal Title */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none shrink-0"
            id="portal-brand-btn"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-slate-900 p-0.5 shadow-md flex items-center justify-center shrink-0 border border-emerald-500/40">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Landmark className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="text-sm sm:text-base font-black tracking-tight text-white leading-tight flex items-center gap-1.5">
                <span>Tamil Nadu 2026 Assembly & Local Government Portal</span>
              </div>
              <p className="text-[10px] text-emerald-400/90 font-medium hidden sm:block">
                தமிழ்நாடு சட்டப்பேரவை தொகுதி & உள்ளாட்சி அரசு தகவல் தளம்
              </p>
            </div>
          </button>

          {/* User Account / Auth Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('my-account')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                    currentPage === 'my-account'
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700'
                  }`}
                  title={`Logged in as ${user.full_name} (${user.role})`}
                >
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono text-[11px] font-extrabold">{user.unique_id}</span>
                </button>

                <button
                  onClick={async () => {
                    await logout();
                    handleNavClick('home');
                  }}
                  className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('auth')}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Citizen Login / Register</span>
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Requirement #20: Statutory Primary Navigation Strip (Full width desktop bar) */}
      <nav className="hidden xl:block bg-slate-900 border-t border-slate-800/80 px-4 py-1">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto scrollbar-none gap-1 py-0.5">
          <div className="flex items-center gap-1 shrink-0">
            {officialNavItems.map((item, index) => {
              const isActive =
                currentPage === item.id ||
                (item.id === 'assembly-constituencies' && currentPage === 'assembly-seats') ||
                (item.id === 'government-sources' && currentPage === 'sources') ||
                (item.id === 'admin' && (currentPage === 'data-quality' || currentPage === 'admin-dashboard'));

              return (
                <React.Fragment key={item.id}>
                  {index > 0 && <span className="text-slate-600 px-0.5 select-none">|</span>}
                  <button
                    id={`nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold ${
                          isActive
                            ? 'bg-slate-950 text-emerald-300'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          {/* Ancillary Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1 whitespace-nowrap"
            >
              <span>More Services</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isMoreMenuOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                {extraServices.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => handleNavClick(svc.id)}
                    className="w-full px-3 py-2 text-left text-xs text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2"
                  >
                    {svc.icon}
                    <span>{svc.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer (When screen < xl) */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-t border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2">
          <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold px-2 flex items-center justify-between">
            <span>Official Portal Navigation (Section 20)</span>
            <span className="text-[10px] text-slate-400 font-normal">Tamil Nadu 2026</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {officialNavItems.map((item) => {
              const isActive =
                currentPage === item.id ||
                (item.id === 'assembly-constituencies' && currentPage === 'assembly-seats') ||
                (item.id === 'government-sources' && currentPage === 'sources') ||
                (item.id === 'admin' && (currentPage === 'data-quality' || currentPage === 'admin-dashboard'));

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between gap-2 border transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white font-bold border-emerald-400'
                      : 'bg-slate-800 text-slate-200 border-slate-700/80 hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-slate-900 text-emerald-400 border border-slate-700">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold px-2 mb-2">
              Ancillary Services
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {extraServices.map((svc) => (
                <button
                  key={svc.id}
                  onClick={() => handleNavClick(svc.id)}
                  className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-800 text-slate-300 hover:text-white flex items-center gap-2"
                >
                  {svc.icon}
                  <span className="truncate">{svc.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
