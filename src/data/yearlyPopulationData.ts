import { YearlyPopulationRecord } from '../types';

/**
 * TAMIL NADU YEARLY POPULATION DATA (2010 – 2026)
 * Central Data Repository for 2010–2026 Population History.
 * 
 * Sources:
 * - 2011: Official Census of India 2011 (Primary Census Abstract - Office of the Registrar General & Census Commissioner, India)
 * - 2010: Office of the Registrar General of India (RGI) Intercensal Projection Baseline
 * - 2012–2036: Report of the Technical Group on Population Projections (National Commission on Population, Ministry of Health and Family Welfare / RGI)
 * 
 * Note: Status is strictly classified as 'Official' (direct census count) or 'Estimated' (mathematical projection).
 */

export const RAW_YEARLY_POPULATION_DATA: Omit<YearlyPopulationRecord, 'growthRatePercent' | 'growthAbsolute' | 'malePercentage' | 'femalePercentage'>[] = [
  {
    year: 2010,
    totalPopulation: 71280000,
    malePopulation: 35740000,
    femalePopulation: 35540000,
    status: 'Estimated',
    source: 'Registrar General of India (Pre-Census Intercensal Projection)',
    sourceURL: 'https://censusindia.gov.in',
    methodology: 'Cohort Component Demographic Projection from 2001 Census base adjusted for SRS fertility & mortality rates.',
    notes: 'Pre-census benchmark prior to the nationwide 2011 decennial headcount.',
  },
  {
    year: 2011,
    totalPopulation: 72147030,
    malePopulation: 36137975,
    femalePopulation: 36009055,
    status: 'Official',
    isBaseline: true,
    source: 'Census of India 2011 (Primary Census Abstract, ORGI)',
    sourceURL: 'https://censusindia.gov.in/census.website/data/census-tables',
    methodology: '100% Door-to-Door Headcount Enumeration conducted by the Office of the Registrar General & Census Commissioner, Government of India.',
    notes: 'Official statutory decennial census enumeration. Sex ratio: 996 females per 1,000 males.',
  },
  {
    year: 2012,
    totalPopulation: 72690000,
    malePopulation: 36396000,
    femalePopulation: 36294000,
    status: 'Estimated',
    source: 'RGI Technical Group on Population Projections (MoHFW)',
    sourceURL: 'https://main.mohfw.gov.in',
    methodology: 'Component Method projecting post-2011 census cohort survival, fertility decline, and inter-state net migration.',
    notes: 'Projected mid-year population as of 1st July 2012.',
  },
  {
    year: 2013,
    totalPopulation: 73190000,
    malePopulation: 36632000,
    femalePopulation: 36558000,
    status: 'Estimated',
    source: 'RGI Technical Group on Population Projections (MoHFW)',
    sourceURL: 'https://main.mohfw.gov.in',
    methodology: 'Mathematical demographic projection incorporating SRS age-specific fertility rates (ASFR).',
    notes: 'Projected mid-year population as of 1st July 2013.',
  },
  {
    year: 2014,
    totalPopulation: 73680000,
    malePopulation: 36862000,
    femalePopulation: 36818000,
    status: 'Estimated',
    source: 'RGI Technical Group on Population Projections (MoHFW)',
    sourceURL: 'https://main.mohfw.gov.in',
    methodology: 'Demographic component projection using life tables and SRS mortality schedule.',
    notes: 'Projected mid-year population as of 1st July 2014.',
  },
  {
    year: 2015,
    totalPopulation: 74160000,
    malePopulation: 37087000,
    femalePopulation: 37073000,
    status: 'Estimated',
    source: 'RGI Technical Group on Population Projections (MoHFW)',
    sourceURL: 'https://main.mohfw.gov.in',
    methodology: 'Mid-decade cohort survival progression calibrated with National Family Health Survey (NFHS-4) trends.',
    notes: 'Projected mid-year population as of 1st July 2015.',
  },
  {
    year: 2016,
    totalPopulation: 74620000,
    malePopulation: 37302000,
    femalePopulation: 37318000,
    status: 'Estimated',
    source: 'RGI Technical Group on Population Projections (MoHFW)',
    sourceURL: 'https://main.mohfw.gov.in',
    methodology: 'Cohort-component demographic model accounting for below-replacement TFR (1.6).',
    notes: 'Projected mid-year population as of 1st July 2016. Sex ratio approaches 1000 females/1000 males.',
  },
  {
    year: 2017,
    totalPopulation: 75060000,
    malePopulation: 37507000,
    femalePopulation: 37553000,
    status: 'Estimated',
    source: 'RGI Technical Group on Population Projections (MoHFW)',
    sourceURL: 'https://main.mohfw.gov.in',
    methodology: 'Standard RGI projection accounting for urban growth momentum in Tamil Nadu.',
    notes: 'Projected mid-year population as of 1st July 2017.',
  },
  {
    year: 2018,
    totalPopulation: 75480000,
    malePopulation: 37702000,
    femalePopulation: 37778000,
    status: 'Estimated',
    source: 'RGI Technical Group on Population Projections (MoHFW)',
    sourceURL: 'https://main.mohfw.gov.in',
    methodology: 'Component projection with SRS life expectancy improvements (male 70.8, female 73.7).',
    notes: 'Projected mid-year population as of 1st July 2018.',
  },
  {
    year: 2019,
    totalPopulation: 75880000,
    malePopulation: 37887000,
    femalePopulation: 37993000,
    status: 'Estimated',
    source: 'RGI Technical Group on Population Projections (MoHFW)',
    sourceURL: 'https://main.mohfw.gov.in',
    methodology: 'Demographic model integrating Sample Registration System (SRS) statistical report data.',
    notes: 'Projected mid-year population as of 1st July 2019.',
  },
  {
    year: 2020,
    totalPopulation: 76260000,
    malePopulation: 38061000,
    femalePopulation: 38199000,
    status: 'Estimated',
    source: 'RGI Technical Group on Population Projections (MoHFW)',
    sourceURL: 'https://main.mohfw.gov.in',
    methodology: 'National Commission on Population 2011–2036 report milestone benchmark.',
    notes: 'Decadal milestone projection. Population crossed 7.6 Crore citizens in 2020.',
  },
  {
    year: 2021,
    totalPopulation: 76610000,
    malePopulation: 38220000,
    femalePopulation: 38390000,
    status: 'Estimated',
    source: 'RGI Technical Group on Population Projections (MoHFW)',
    sourceURL: 'https://main.mohfw.gov.in',
    methodology: 'Projection used for central and state scheme allocation in absence of decennial 2021 census.',
    notes: 'Decennial census 2021 was deferred nationwide due to COVID-19 pandemic protocols.',
  },
  {
    year: 2022,
    totalPopulation: 76940000,
    malePopulation: 38369000,
    femalePopulation: 38571000,
    status: 'Estimated',
    source: 'RGI Technical Group on Population Projections (MoHFW)',
    sourceURL: 'https://main.mohfw.gov.in',
    methodology: 'Calibrated using NFHS-5 state indicators (TFR 1.4, Sex ratio 1,088 per 1,000 males in survey).',
    notes: 'Projected mid-year population as of 1st July 2022.',
  },
  {
    year: 2023,
    totalPopulation: 77240000,
    malePopulation: 38504000,
    femalePopulation: 38736000,
    status: 'Estimated',
    source: 'RGI Technical Group on Population Projections (MoHFW)',
    sourceURL: 'https://main.mohfw.gov.in',
    methodology: 'Demographic cohort projection with declining rate of natural increase (RNI ~0.40%).',
    notes: 'Projected mid-year population as of 1st July 2023.',
  },
  {
    year: 2024,
    totalPopulation: 77510000,
    malePopulation: 38623000,
    femalePopulation: 38887000,
    status: 'Estimated',
    source: 'RGI Technical Group on Population Projections (MoHFW / NCP)',
    sourceURL: 'https://main.mohfw.gov.in',
    methodology: 'Official projected mid-year population benchmark utilized for 2024 General Election electorate ratios.',
    notes: 'Electoral ratio: 6.23 Crore registered voters out of ~7.75 Crore population (80.4% voter coverage).',
  },
  {
    year: 2025,
    totalPopulation: 77750000,
    malePopulation: 38727000,
    femalePopulation: 39023000,
    status: 'Estimated',
    source: 'RGI Technical Group on Population Projections (MoHFW)',
    sourceURL: 'https://main.mohfw.gov.in',
    methodology: 'Mid-term forecast benchmark of the 2011–2036 National Commission on Population schedule.',
    notes: 'Projected mid-year population as of 1st July 2025.',
  },
  {
    year: 2026,
    totalPopulation: 77960000, // May be dynamically calibrated with current active day
    malePopulation: 38817000,
    femalePopulation: 39143000,
    status: 'Estimated',
    source: 'Demographic Projection Model (RGI 2011–2036 Series & Daily Calculation)',
    sourceURL: 'https://censusindia.gov.in',
    methodology: 'Calculated using official baseline Census/RGI rate + daily elapsed mathematical projection.',
    notes: '2026 Population: Estimated. This is a statistical estimate and should not be interpreted as an official daily census count.',
  },
];

/**
 * Compute derived fields: growth rate %, growth absolute, male/female percentages
 */
export function buildYearlyPopulationRecords(
  custom2026Population?: number
): YearlyPopulationRecord[] {
  const previousBase2009 = 70410000; // Baseline reference to calculate 2010 growth rate

  return RAW_YEARLY_POPULATION_DATA.map((item, index, array) => {
    let total = item.totalPopulation;
    let male = item.malePopulation;
    let female = item.femalePopulation;

    // If dynamic 2026 population is passed in, calibrate 2026
    if (item.year === 2026 && custom2026Population && custom2026Population > 70000000) {
      total = custom2026Population;
      // Maintain realistic gender ratio (approx 49.80% male, 50.20% female)
      male = Math.round(total * 0.4979);
      female = total - male;
    }

    const prevPopulation =
      index === 0 ? previousBase2009 : array[index - 1].totalPopulation;
    const growthAbsolute = total - prevPopulation;
    const growthRatePercent = Number(
      (((total - prevPopulation) / prevPopulation) * 100).toFixed(2)
    );

    const malePercentage = Number(((male / total) * 100).toFixed(2));
    const femalePercentage = Number(((female / total) * 100).toFixed(2));

    return {
      ...item,
      totalPopulation: total,
      malePopulation: male,
      femalePopulation: female,
      malePercentage,
      femalePercentage,
      growthAbsolute,
      growthRatePercent,
    };
  });
}
