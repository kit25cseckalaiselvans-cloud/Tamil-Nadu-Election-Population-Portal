import React, { useState, useEffect } from 'react';
import { GovernmentLinkItem, PageId } from '../types';
import {
  Building2,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Landmark,
  FileText,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface GovernmentServicesPageProps {
  onNavigate: (page: PageId) => void;
}

export const GovernmentServicesPage: React.FC<GovernmentServicesPageProps> = ({ onNavigate }) => {
  const [links, setLinks] = useState<GovernmentLinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetch('/api/services/government-links')
      .then((res) => res.json())
      .then((data) => {
        setLinks(data.links || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load links:', err);
        setLoading(false);
      });
  }, []);

  const categories = [
    'All',
    'Election',
    'State Government',
    'National',
    'Civil Registration',
    'Public Records',
  ];

  const filteredLinks = links.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.service_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" />
            Verified Government Directory
          </span>
          <span className="text-slate-400 text-xs">|</span>
          <span className="text-slate-300 text-xs">Direct Routing to Official State & Union Portals</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Official Government Services Directory
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Access verified, authenticated links to the Election Commission of India, Chief Electoral Officer Tamil Nadu, e-Sevai citizen portals, Civil Registration, and the Census of India.
        </p>
      </div>

      {/* Critical Statutory Disclaimer Banner */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 text-amber-950 text-xs leading-relaxed flex items-start gap-3 shadow-2xs">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-900 font-bold">Official Redirection Directive:</strong>
          <p className="mt-0.5">
            This portal does not create simulated government submission forms. All official applications, birth/death certificate downloads, and electoral submissions redirect directly to authorized, encrypted government domain endpoints (such as <code>.gov.in</code> and <code>.nic.in</code>).
          </p>
        </div>
      </div>

      {/* Filter and Search Controls */}
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
            placeholder="Search departments or services..."
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Directory Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs text-slate-500">
          Loading verified government directory records...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLinks.map((link) => (
            <div
              key={link.id}
              className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {link.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified {link.last_verified}
                  </span>
                </div>

                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {link.department}
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1 leading-snug">
                  {link.service_name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {link.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <a
                  href={link.official_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
