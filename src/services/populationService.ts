import { PopulationConfig, PopulationEstimate, PopulationHistoryEntry } from '../types';
import { DEFAULT_POPULATION_CONFIG } from '../data/populationData';

const CONFIG_STORAGE_KEY = 'tn_portal_population_config';
const HISTORY_STORAGE_KEY = 'tn_portal_population_history_v2';

/**
 * Validates population configuration parameters before calculation.
 */
export function validatePopulationConfig(config: Partial<PopulationConfig>): { isValid: boolean; error?: string } {
  if (!config.baselinePopulation || isNaN(Number(config.baselinePopulation)) || Number(config.baselinePopulation) <= 0) {
    return { isValid: false, error: 'Baseline population must be a positive valid number.' };
  }

  if (!config.baselineDate || isNaN(new Date(config.baselineDate).getTime())) {
    return { isValid: false, error: 'Baseline date must be a valid calendar date.' };
  }

  const baselineTime = new Date(config.baselineDate).getTime();
  if (baselineTime > Date.now()) {
    return { isValid: false, error: 'Baseline date cannot be in the future.' };
  }

  if (config.annualGrowthRate === undefined || isNaN(Number(config.annualGrowthRate))) {
    return { isValid: false, error: 'Annual population growth rate is required.' };
  }

  const growth = Number(config.annualGrowthRate);
  if (growth < -5 || growth > 15) {
    return { isValid: false, error: 'Annual population growth rate must be realistic (between -5% and 15%).' };
  }

  if (!config.sourceName || config.sourceName.trim().length === 0) {
    return { isValid: false, error: 'Official source name must be provided.' };
  }

  return { isValid: true };
}

/**
 * Retrieves the active population configuration from localStorage or default.
 */
export function getPopulationConfig(): PopulationConfig {
  try {
    const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const validation = validatePopulationConfig(parsed);
      if (validation.isValid) {
        return {
          baselinePopulation: Number(parsed.baselinePopulation),
          baselineYear: String(parsed.baselineYear || '2011'),
          baselineDate: String(parsed.baselineDate),
          annualGrowthRate: Number(parsed.annualGrowthRate),
          sourceName: String(parsed.sourceName),
          sourceURL: String(parsed.sourceURL || 'https://censusindia.gov.in'),
          notes: parsed.notes || '',
          lastUpdatedByAdmin: parsed.lastUpdatedByAdmin || '',
        };
      }
    }
  } catch (err) {
    console.warn('Error reading stored population config, falling back to default:', err);
  }
  return { ...DEFAULT_POPULATION_CONFIG };
}

/**
 * Saves a new configuration to localStorage.
 */
export function savePopulationConfig(config: PopulationConfig): { success: boolean; error?: string } {
  const validation = validatePopulationConfig(config);
  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    // Clear history cache so it regenerates based on the new baseline
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('tn_population_config_changed', { detail: config }));
    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Failed to save configuration' };
  }
}

/**
 * Resets the population configuration to official defaults.
 */
export function resetPopulationConfig(): PopulationConfig {
  localStorage.removeItem(CONFIG_STORAGE_KEY);
  localStorage.removeItem(HISTORY_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('tn_population_config_changed', { detail: DEFAULT_POPULATION_CONFIG }));
  return { ...DEFAULT_POPULATION_CONFIG };
}

/**
 * Calculates the estimated population for any given date and time.
 */
export function calculatePopulationEstimate(
  targetDate: Date = new Date(),
  customConfig?: PopulationConfig
): PopulationEstimate {
  const config = customConfig || getPopulationConfig();
  const validation = validatePopulationConfig(config);

  if (!validation.isValid) {
    return {
      currentEstimatedPopulation: config.baselinePopulation || 72147030,
      baselinePopulation: config.baselinePopulation || 72147030,
      baselineYear: config.baselineYear || '2011',
      baselineDate: config.baselineDate || '2011-03-01',
      annualGrowthRate: config.annualGrowthRate || 0.58,
      sourceName: config.sourceName || 'Census of India',
      sourceURL: config.sourceURL || 'https://censusindia.gov.in',
      daysElapsed: 0,
      estimatedDailyChange: 0,
      estimatedPerSecondChange: 0,
      estimatedMalePopulation: 0,
      estimatedFemalePopulation: 0,
      estimatedSexRatio: 996,
      lastCalculatedTime: targetDate.toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'medium',
      }),
      updatedDateString: targetDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      officialDataYear: config.baselineYear || '2011',
      isValid: false,
      validationError: validation.error,
    };
  }

  const baselineTime = new Date(config.baselineDate).getTime();
  const currentTime = targetDate.getTime();
  const diffMilliseconds = Math.max(0, currentTime - baselineTime);
  const daysElapsed = diffMilliseconds / (1000 * 60 * 60 * 24);

  // Annual change: Baseline * (growthRate / 100)
  const annualIncrease = config.baselinePopulation * (config.annualGrowthRate / 100);
  // Daily change: Annual increase divided by 365.25 days (accounting for leap years)
  const estimatedDailyChange = annualIncrease / 365.25;
  // Per-second change
  const estimatedPerSecondChange = estimatedDailyChange / 86400;

  // Linear projection based on elapsed days
  const currentEstimatedPopulation = Math.floor(
    config.baselinePopulation + estimatedDailyChange * daysElapsed
  );

  // Sex distribution based on Tamil Nadu Census baseline sex ratio (996 females per 1000 males)
  // Male ratio: 1000 / 1996 ≈ 0.501002; Female ratio: 996 / 1996 ≈ 0.498998
  const maleRatio = 1000 / 1996;
  const estimatedMalePopulation = Math.round(currentEstimatedPopulation * maleRatio);
  const estimatedFemalePopulation = currentEstimatedPopulation - estimatedMalePopulation;
  const estimatedSexRatio = Math.round((estimatedFemalePopulation / estimatedMalePopulation) * 1000);

  // Formatting dates
  const lastCalculatedTime = targetDate.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const updatedDateString = targetDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return {
    currentEstimatedPopulation,
    baselinePopulation: config.baselinePopulation,
    baselineYear: config.baselineYear,
    baselineDate: config.baselineDate,
    annualGrowthRate: config.annualGrowthRate,
    sourceName: config.sourceName,
    sourceURL: config.sourceURL,
    daysElapsed: Math.floor(daysElapsed),
    estimatedDailyChange: Math.round(estimatedDailyChange),
    estimatedPerSecondChange,
    estimatedMalePopulation,
    estimatedFemalePopulation,
    estimatedSexRatio,
    lastCalculatedTime,
    updatedDateString,
    officialDataYear: config.baselineYear,
    isValid: true,
  };
}

/**
 * Generates the 30-day daily update history log.
 */
export function getPopulationHistory(days: number = 30): PopulationHistoryEntry[] {
  const config = getPopulationConfig();
  const history: PopulationHistoryEntry[] = [];
  const today = new Date();

  // Ensure consistent midnight boundaries for clean daily entries
  for (let i = 0; i < days; i++) {
    const target = new Date(today);
    target.setDate(today.getDate() - i);
    target.setHours(12, 0, 0, 0); // Noon anchor

    const estimate = calculatePopulationEstimate(target, config);

    const dayStr = String(target.getDate()).padStart(2, '0');
    const monthStr = String(target.getMonth() + 1).padStart(2, '0');
    const yearStr = target.getFullYear();
    const dateFormatted = `${dayStr}-${monthStr}-${yearStr}`;

    history.push({
      date: dateFormatted,
      dateISO: target.toISOString().split('T')[0],
      estimatedPopulation: estimate.currentEstimatedPopulation,
      baseline: `Official baseline (${config.baselineYear})`,
      status: 'Estimated',
      dailyChange: estimate.estimatedDailyChange,
    });
  }

  return history;
}
