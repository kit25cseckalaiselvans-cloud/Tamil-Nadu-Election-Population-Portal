import { YearlyPopulationRecord, HistoryDashboardMetrics } from '../types';
import {
  buildYearlyPopulationRecords,
  RAW_YEARLY_POPULATION_DATA,
} from '../data/yearlyPopulationData';
import { calculatePopulationEstimate } from './populationService';

const STORAGE_KEY_YEARLY_OVERRIDES = 'tn_portal_yearly_population_overrides_v1';

/**
 * Get the full 2010–2026 dataset, automatically calibrating 2026
 * with the latest daily demographic estimate.
 */
export function getYearlyPopulationData(): YearlyPopulationRecord[] {
  // Obtain dynamic 2026 calculated estimate from the central populationService
  let active2026Estimate: number | undefined;
  try {
    const currentEstimate = calculatePopulationEstimate(new Date());
    if (currentEstimate && currentEstimate.currentEstimatedPopulation > 70000000) {
      active2026Estimate = currentEstimate.currentEstimatedPopulation;
    }
  } catch (e) {
    console.error('Failed to get dynamic 2026 estimate', e);
  }

  const baseRecords = buildYearlyPopulationRecords(active2026Estimate);

  // Check for any client/admin local storage overrides
  try {
    const stored = localStorage.getItem(STORAGE_KEY_YEARLY_OVERRIDES);
    if (stored) {
      const overrides: Record<number, Partial<YearlyPopulationRecord>> = JSON.parse(stored);
      return baseRecords.map((record) => {
        if (overrides[record.year]) {
          return {
            ...record,
            ...overrides[record.year],
          };
        }
        return record;
      });
    }
  } catch (e) {
    console.warn('Could not parse stored yearly overrides', e);
  }

  return baseRecords;
}

/**
 * Retrieve record for a specific year
 */
export function getYearlyRecord(year: number): YearlyPopulationRecord | undefined {
  const records = getYearlyPopulationData();
  return records.find((r) => r.year === year);
}

/**
 * Calculate the key dashboard metrics required:
 * - Population in 2010
 * - Population in 2020
 * - Population in 2025
 * - Population in 2026
 * - Total population growth from 2010 to 2026 (absolute & %)
 * - Average annual growth rate
 */
export function getHistoryDashboardMetrics(): HistoryDashboardMetrics {
  const records = getYearlyPopulationData();

  const rec2010 = records.find((r) => r.year === 2010) || records[0];
  const rec2020 = records.find((r) => r.year === 2020) || records[10];
  const rec2025 = records.find((r) => r.year === 2025) || records[15];
  const rec2026 = records.find((r) => r.year === 2026) || records[records.length - 1];

  const pop2010 = rec2010.totalPopulation;
  const pop2020 = rec2020.totalPopulation;
  const pop2025 = rec2025.totalPopulation;
  const pop2026 = rec2026.totalPopulation;

  const totalGrowthAbsolute = pop2026 - pop2010;
  const totalGrowthPercent = Number(
    (((pop2026 - pop2010) / pop2010) * 100).toFixed(2)
  );

  // Compound Annual Growth Rate (CAGR) over 16 years (2010 to 2026):
  // CAGR = ((P_2026 / P_2010)^(1/16) - 1) * 100
  const yearsSpan = 2026 - 2010; // 16
  const cagr = (Math.pow(pop2026 / pop2010, 1 / yearsSpan) - 1) * 100;
  const averageAnnualGrowth = Number(cagr.toFixed(2));

  return {
    pop2010,
    pop2020,
    pop2025,
    pop2026,
    totalGrowthAbsolute,
    totalGrowthPercent,
    averageAnnualGrowth,
    is2026Estimated: rec2026.status === 'Estimated',
  };
}

/**
 * Update an existing year's record (e.g. when an official 2026 or 2027 census is announced)
 */
export function updateYearlyRecord(
  year: number,
  updates: Partial<YearlyPopulationRecord>
): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_YEARLY_OVERRIDES);
    const overrides: Record<number, Partial<YearlyPopulationRecord>> = stored
      ? JSON.parse(stored)
      : {};
    overrides[year] = {
      ...(overrides[year] || {}),
      ...updates,
    };
    localStorage.setItem(STORAGE_KEY_YEARLY_OVERRIDES, JSON.stringify(overrides));
    window.dispatchEvent(new Event('tn_yearly_population_changed'));
  } catch (e) {
    console.error('Failed to update yearly record', e);
  }
}

/**
 * Reset yearly data to default
 */
export function resetYearlyRecordsToDefault(): void {
  localStorage.removeItem(STORAGE_KEY_YEARLY_OVERRIDES);
  window.dispatchEvent(new Event('tn_yearly_population_changed'));
}

/**
 * Export 2010–2026 dataset to CSV
 */
export function exportYearlyDataToCSV(data: YearlyPopulationRecord[]): void {
  const headers = [
    'Year',
    'Total Population',
    'Male Population',
    'Female Population',
    'Male %',
    'Female %',
    'Growth Rate (%)',
    'Growth Absolute',
    'Status',
    'Source',
    'Methodology',
  ];

  const rows = data.map((r) => [
    r.year,
    r.totalPopulation,
    r.malePopulation,
    r.femalePopulation,
    `${r.malePercentage}%`,
    `${r.femalePercentage}%`,
    `${r.growthRatePercent}%`,
    r.growthAbsolute,
    r.status,
    `"${r.source.replace(/"/g, '""')}"`,
    `"${r.methodology.replace(/"/g, '""')}"`,
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'tamil_nadu_population_history_2010_2026.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
