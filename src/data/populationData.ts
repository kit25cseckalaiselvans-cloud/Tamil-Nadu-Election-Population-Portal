import { PopulationConfig } from '../types';

export const DEFAULT_POPULATION_CONFIG: PopulationConfig = {
  baselinePopulation: 72147030,
  baselineYear: '2011',
  baselineDate: '2011-03-01',
  annualGrowthRate: 0.58, // 0.58% annual growth rate as per RGI Report on Population Projections for TN (TFR ~1.4)
  sourceName: 'Office of the Registrar General & Census Commissioner, India (Census 2011 & RGI Technical Group)',
  sourceURL: 'https://censusindia.gov.in',
  notes: 'Official Census of India 2011 headcount for Tamil Nadu, with compound projection based on Registrar General of India (RGI) Technical Group on Population Projections.',
  lastUpdatedByAdmin: 'Official Default Configuration',
};

export interface PopulationPreset {
  id: string;
  label: string;
  description: string;
  config: PopulationConfig;
}

export const OFFICIAL_PRESETS: PopulationPreset[] = [
  {
    id: 'census-2011-rgi',
    label: 'Census 2011 + RGI Technical Group (Recommended)',
    description: 'Official 2011 Census enumeration (7.21 Cr) projected at 0.58%/yr derived from Ministry of Health & Family Welfare / RGI 2011-2036 cohort component projections.',
    config: {
      baselinePopulation: 72147030,
      baselineYear: '2011',
      baselineDate: '2011-03-01',
      annualGrowthRate: 0.58,
      sourceName: 'Registrar General & Census Commissioner of India (Census 2011 + RGI)',
      sourceURL: 'https://censusindia.gov.in',
      notes: 'Standard demographic methodology recommended for Tamil Nadu due to below-replacement Total Fertility Rate (TFR 1.4).',
    },
  },
  {
    id: 'rgi-2024-midyear',
    label: 'RGI 2024 Mid-Year Projected Baseline',
    description: 'Official projected mid-year baseline of 76,860,000 for 1 July 2024 with 0.55%/yr ongoing projection.',
    config: {
      baselinePopulation: 76860000,
      baselineYear: '2024',
      baselineDate: '2024-07-01',
      annualGrowthRate: 0.55,
      sourceName: 'Report of Technical Group on Population Projections (MoHFW / RGI)',
      sourceURL: 'https://main.mohfw.gov.in',
      notes: 'Mid-year population projection published in the National Commission on Population Technical Report.',
    },
  },
  {
    id: 'census-decadal',
    label: 'Census 2001-2011 Decadal Average (1.46%/yr)',
    description: 'Historical decadal growth rate of 15.6% between 2001 and 2011 (annual rate of ~1.46%).',
    config: {
      baselinePopulation: 72147030,
      baselineYear: '2011',
      baselineDate: '2011-03-01',
      annualGrowthRate: 1.46,
      sourceName: 'Census of India (Decadal Growth Series 2001-2011)',
      sourceURL: 'https://censusindia.gov.in',
      notes: 'Historical decadal average for comparison; does not account for modern fertility decline in Tamil Nadu.',
    },
  },
];
