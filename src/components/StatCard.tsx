import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface StatCardProps {
  id?: string;
  title: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  year: string;
  source: string;
  isOfficial?: boolean;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  accentColor?: 'emerald' | 'amber' | 'blue' | 'indigo' | 'rose' | 'slate';
}

export const StatCard: React.FC<StatCardProps> = ({
  id,
  title,
  value,
  subtext,
  icon,
  year,
  source,
  isOfficial = true,
  trend,
  accentColor = 'blue',
}) => {
  const colorMap = {
    emerald: 'border-emerald-200 bg-emerald-50/50 text-emerald-700',
    amber: 'border-amber-200 bg-amber-50/50 text-amber-700',
    blue: 'border-blue-200 bg-blue-50/50 text-blue-700',
    indigo: 'border-indigo-200 bg-indigo-50/50 text-indigo-700',
    rose: 'border-rose-200 bg-rose-50/50 text-rose-700',
    slate: 'border-slate-200 bg-slate-50/50 text-slate-700',
  };

  const badgeColor = isOfficial
    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
    : 'bg-amber-50 text-amber-800 border-amber-200';

  return (
    <div
      id={id}
      className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden"
    >
      {/* Top row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            {icon && (
              <div className={`p-2 rounded-lg border ${colorMap[accentColor]}`}>
                {icon}
              </div>
            )}
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
              {title}
            </h3>
          </div>
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border ${badgeColor}`}
            title={isOfficial ? 'Verified Official Government Dataset' : 'Demo Projection Data'}
          >
            {isOfficial ? (
              <>
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Official
              </>
            ) : (
              <>
                <Info className="w-3 h-3 text-amber-600" />
                Demo Data
              </>
            )}
          </span>
        </div>

        {/* Value */}
        <div className="mt-2">
          <div className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight font-display">
            {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
          </div>
          {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
        </div>

        {/* Trend if available */}
        {trend && (
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            <span
              className={`font-semibold ${
                trend.isPositive ? 'text-emerald-700' : 'text-slate-600'
              }`}
            >
              {trend.value}
            </span>
            {trend.label && <span className="text-slate-500">{trend.label}</span>}
          </div>
        )}
      </div>

      {/* Footer: Mandatory Number + Year + Source */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-0.5 text-[11px] text-slate-500">
        <div className="flex items-center justify-between">
          <span className="font-medium text-slate-600">Year: {year}</span>
        </div>
        <div className="text-[10px] text-slate-400 line-clamp-1" title={source}>
          Source: {source}
        </div>
      </div>
    </div>
  );
};
