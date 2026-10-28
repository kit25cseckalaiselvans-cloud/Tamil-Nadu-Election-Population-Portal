import React, { useState, useEffect } from 'react';
import { Methodology } from '../components/Methodology';
import { PopulationEstimate, PageId } from '../types';
import { calculatePopulationEstimate } from '../services/populationService';
import { ArrowLeft, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';

interface MethodologyPageProps {
  onNavigate?: (page: PageId) => void;
}

export const MethodologyPage: React.FC<MethodologyPageProps> = ({ onNavigate }) => {
  const [estimate, setEstimate] = useState<PopulationEstimate>(() =>
    calculatePopulationEstimate(new Date())
  );

  useEffect(() => {
    setEstimate(calculatePopulationEstimate(new Date()));
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate && onNavigate('population')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Population Dashboard
        </button>

        <div className="flex items-center gap-2">
          {onNavigate && (
            <button
              onClick={() => onNavigate('sources')}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 transition-colors flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Official Sources
            </button>
          )}
        </div>
      </div>

      {/* Main Methodology Component */}
      <Methodology estimate={estimate} />
    </div>
  );
};
