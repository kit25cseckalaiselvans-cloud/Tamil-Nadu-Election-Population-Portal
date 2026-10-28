export type PageId =
  | 'home'
  | 'tamil-nadu'
  | 'districts'
  | 'district-detail'
  | 'assembly-constituencies'
  | 'assembly-seats'
  | 'mlas'
  | 'village-panchayats'
  | 'villages'
  | 'local-government'
  | 'elected-representatives'
  | 'government-sources'
  | 'sources'
  | 'admin'
  | 'data-quality'
  | 'population'
  | 'voter-services'
  | 'government-services'
  | 'my-account'
  | 'auth'
  | 'admin-dashboard'
  | 'new-voter'
  | 'population-history'
  | 'election-commission'
  | 'voter-eligibility'
  | 'voter-list'
  | 'birth-death'
  | 'election-stats'
  | 'about'
  | 'methodology'
  | 'data-source';

// ==========================================
// 11 CORE DATABASE ENTITIES (TABLE SCHEMAS)
// ==========================================

export interface DistrictRecord {
  district_id: string;
  district_name: string;
  official_code: string; // LGD Code
  headquarters: string;
  region: 'Northern' | 'Western' | 'Central' | 'Southern' | 'Coastal';
  area_sq_km: number;
  population_census_2011: number;
  population_projected_2026: number;
  revenue_divisions_count: number;
  taluks_count: number;
  blocks_count: number;
  village_panchayats_count: number;
  town_panchayats_count: number;
  municipalities_count: number;
  corporations_count: number;
  assembly_constituencies_count: number;
  source_url: string;
  source_department: string;
  source_dataset: string;
  data_year: string;
  last_verified: string;
  official_portal: string;
}

export interface AssemblyConstituencyRecord {
  constituency_id: string;
  constituency_number: number;
  constituency_name: string;
  district_id: string;
  district_name: string;
  reservation_category: 'General' | 'SC' | 'ST';
  parliamentary_constituency: string;
  source_department: string;
  source_dataset: string;
  source_url: string;
  last_verified: string;
  data_year: string;
}

export interface AssemblyMlaRecord2026 {
  constituency_number: number;
  constituency_name: string;
  reservation_category: 'General' | 'SC' | 'ST';
  mla_name: string;
  party: string;
  district: string;
  election_year: number; // 2026
  data_source: string; // "Election Commission of India"
  source_url: string; // ECI official Detailed Results PDF URL
  last_verified_date: string;
  status: 'Active' | 'Current MLA' | 'Gazette Notified' | 'Bye-Election Concluded';
  is_verified: boolean;
  parliamentary_constituency?: string;
}

export interface ConstituencyMasterRecord {
  constituency_number: number;
  constituency_name: string;
  district: string;
  district_id: string;
  reservation_category: 'General' | 'SC' | 'ST';
  parliamentary_constituency: string;
}

export interface MlaAuditLogEntry {
  id: string;
  constituency_number: number;
  constituency_name: string;
  field_changed: string;
  old_value: string;
  new_value: string;
  timestamp: string;
  admin_action: string;
  admin_user: string;
}

export interface DataValidationReport {
  isValid: boolean;
  totalConstituencies: number;
  expectedConstituencies: number;
  checks: {
    id: string;
    label: string;
    passed: boolean;
    details: string;
  }[];
  errors: string[];
}

export interface AssemblyMemberRecord {
  member_id: string;
  constituency_id: string;
  constituency_number: number;
  constituency_name: string;
  district_name: string;
  member_name: string;
  party: string;
  election_year: string;
  status: 'Active' | 'Vacant' | 'Bye-Election Concluded' | 'Gazette Notification';
  source_department: string;
  source_dataset: string;
  source_url: string;
  verified_date: string;
  is_officially_verified: boolean;
  gazette_reference?: string;
  notes?: string;
}

export interface BlockRecord {
  block_id: string;
  district_id: string;
  district_name: string;
  block_name: string;
  official_code: string; // LGD Block Code
  total_panchayats: number;
  source_department: string;
  source_url: string;
  last_verified: string;
}

export interface VillagePanchayatRecord {
  panchayat_id: string;
  block_id: string;
  block_name: string;
  district_id: string;
  district_name: string;
  panchayat_name: string;
  official_code: string; // LGD Panchayat Code
  habitations_count: number;
  president_name: string | null; // NULL if not officially published
  president_status: string;
  election_year: string;
  secretary_contact_available: boolean;
  source_department: string;
  source_dataset: string;
  source_url: string;
  last_verified: string;
}

export interface VillageHabitationRecord {
  village_id: string;
  panchayat_id: string;
  panchayat_name: string;
  district_name: string;
  block_name: string;
  village_name: string;
  official_code: string;
  type: 'Habitation' | 'Revenue Village' | 'Hamlet';
  source_department: string;
  source_url: string;
  last_verified: string;
}

export interface PanchayatPresidentRecord {
  president_id: string;
  panchayat_id: string;
  panchayat_name: string;
  block_name: string;
  district_name: string;
  president_name: string | null;
  election_year: string;
  status: 'Active' | 'Vacant' | 'Suspended' | 'Requires Official Verification';
  source_department: string;
  source_url: string;
  verified_date: string;
  notes?: string;
}

export interface LocalBodyRecord {
  local_body_id: string;
  body_id?: string;
  district_id: string;
  district_name: string;
  name: string;
  type: 'Municipal Corporation' | 'Municipality' | 'Town Panchayat' | 'Panchayat Union' | 'District Panchayat';
  category: 'Urban Local Body' | 'Rural Local Body';
  official_code: string;
  total_wards?: number;
  wards_count?: number;
  head_title: 'Mayor' | 'Municipal Chairman' | 'Town Panchayat President' | 'Panchayat Union Chairman' | 'District Panchayat Chairman';
  head_name: string | null;
  source_department: string;
  source_url: string;
  last_verified: string;
}

export interface ElectedRepresentativeRecord {
  representative_id?: string;
  rep_id?: string;
  local_body_id?: string;
  local_body_name: string;
  district_name: string;
  ward?: string;
  name: string;
  party?: string;
  term_start?: string;
  term_end?: string;
  official_gazette_notification?: string;
  position: 'Mayor' | 'Deputy Mayor' | 'Municipal Chairman' | 'Panchayat Union Chairman' | 'District Panchayat Chairman' | 'Councillor' | 'Ward Member';
  election_year?: string;
  status?: string;
  source_department?: string;
  source_url?: string;
  last_verified?: string;
}

export interface DataSourceRecord {
  source_id: string;
  organization?: string;
  department_name?: string;
  dataset?: string;
  document_name?: string;
  source_url: string;
  publication_date?: string;
  retrieved_date?: string;
  verified_date?: string;
  data_year?: string;
  last_verified?: string;
  version?: string;
  priority_level: 'LEVEL 1' | 'LEVEL 2' | 'LEVEL 3' | 'LEVEL 4' | number;
  description: string;
}

export interface AuditLogRecord {
  log_id: string;
  administrator_id: string;
  action: string;
  record_type: string;
  record_id: string;
  timestamp: string;
  old_value?: string;
  new_value?: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
  details: string;
}

export interface DataQualitySummary {
  totalDistricts: number;
  totalRuralDistricts?: number;
  totalDistrictPanchayats?: number;
  totalConstituencies: number;
  totalBlocks: number;
  totalPanchayatUnions?: number;
  totalVillagePanchayats: number;
  totalLocalBodies: number;
  recordsWithVerifiedSources: number;
  recordsNeedingVerification: number;
  missingMlaRecords: number;
  missingPresidentRecords: number;
  duplicateVillagesDetected: number;
  invalidDistrictRelationships: number;
  lastSuccessfulUpdate: string;
}

export interface AuthUser {
  id: string;
  unique_user_id: string;
  full_name: string;
  email: string;
  mobile: string;
  date_of_birth: string;
  district: string;
  address: string;
  role: 'Citizen' | 'Officer' | 'Administrator';
  account_status: 'Active' | 'Pending Verification' | 'Suspended';
  is_verified_citizen: boolean;
  created_at: string;
}

export interface VerificationItem {
  verification_id: string;
  user_id: string;
  user_name?: string;
  user_email?: string;
  user_unique_id?: string;
  user_district?: string;
  document_type: 'Aadhaar' | 'Voter ID' | 'Passport' | 'Driving Licence' | 'PAN' | 'Other';
  masked_document_number: string;
  document_hash: string;
  ai_check_status: 'Passed' | 'Failed' | 'Needs Review';
  official_verification_status: 'Unconfirmed' | 'Officially Verified' | 'Rejected';
  manual_review_status: 'Pending' | 'Approved' | 'Rejected';
  reviewer_id?: string;
  reviewer_name?: string;
  review_notes?: string;
  submitted_at: string;
  verified_at?: string;
  retention_expiry: string;
  extracted_data?: {
    full_name?: string;
    dob?: string;
    gender?: string;
    district?: string;
    address_snippet?: string;
  };
  ai_analysis_report?: {
    image_quality: string;
    required_fields_present: boolean;
    date_expiry_valid: boolean;
    structural_integrity: string;
    internal_consistency: boolean;
    possible_alterations_detected: boolean;
    summary_notes: string[];
    official_disclaimer: string;
  };
}

export interface GovernmentLinkItem {
  id: string;
  service_name: string;
  department: string;
  category: 'Election' | 'State Government' | 'National' | 'Civil Registration' | 'Public Records';
  official_url: string;
  description: string;
  last_verified: string;
  is_active: boolean;
}

export interface VoterServiceItem {
  id: string;
  service_name: string;
  category: 'Registration' | 'Electoral Roll' | 'Correction' | 'Card Services' | 'Information';
  description: string;
  eligibility: string;
  form_number?: string;
  official_url: string;
  last_verified: string;
}

export interface AuditLogItem {
  id: string;
  user_id?: string;
  user_email?: string;
  action: string;
  timestamp: string;
  ip_address: string;
  user_agent: string;
  status: 'SUCCESS' | 'FAILED' | 'WARNING';
  details: string;
}

export interface PopulationRecordItem {
  id: string;
  district: string;
  year: number;
  total_population: number;
  male_population: number;
  female_population: number;
  other_population: number;
  urban_population: number;
  rural_population: number;
  source_organization: string;
  source_document: string;
  source_url: string;
  publication_date: string;
  verified_date: string;
  is_official_census: boolean;
  is_projection: boolean;
  growth_rate_pct?: number;
  births_registered?: number;
  deaths_registered?: number;
  version: number;
}


export interface AssemblyConstituency {
  number: number;
  name: string;
  district: string;
  type: 'General' | 'SC' | 'ST';
  mla: string;
  party: string;
  parliamentaryConstituency?: string;
  source: string;
  sourceUrl?: string;
  electionYear?: string;
  lastUpdated?: string;
  notes?: string;
}

export interface DistrictAssemblyGroup {
  districtName: string;
  totalSeats: number;
  generalSeats: number;
  scSeats: number;
  stSeats: number;
  constituencies: AssemblyConstituency[];
}

export interface YearlyPopulationRecord {
  year: number;
  totalPopulation: number;
  malePopulation: number;
  femalePopulation: number;
  malePercentage: number;
  femalePercentage: number;
  growthRatePercent: number; // ((current - previous) / previous) * 100
  growthAbsolute: number;
  status: 'Official' | 'Estimated';
  source: string;
  sourceURL?: string;
  methodology: string;
  notes?: string;
  isBaseline?: boolean;
}

export interface HistoryDashboardMetrics {
  pop2010: number;
  pop2020: number;
  pop2025: number;
  pop2026: number;
  totalGrowthAbsolute: number; // 2010 to 2026
  totalGrowthPercent: number; // ((pop2026 - pop2010) / pop2010) * 100
  averageAnnualGrowth: number; // Compound or annualized average %
  is2026Estimated: boolean;
}

export interface PopulationConfig {
  baselinePopulation: number;
  baselineYear: string;
  baselineDate: string; // ISO date 'YYYY-MM-DD'
  annualGrowthRate: number; // percentage e.g. 0.62%
  sourceName: string;
  sourceURL: string;
  notes?: string;
  lastUpdatedByAdmin?: string;
}

export interface PopulationEstimate {
  currentEstimatedPopulation: number;
  baselinePopulation: number;
  baselineYear: string;
  baselineDate: string;
  annualGrowthRate: number;
  sourceName: string;
  sourceURL: string;
  daysElapsed: number;
  estimatedDailyChange: number;
  estimatedPerSecondChange: number;
  estimatedMalePopulation: number;
  estimatedFemalePopulation: number;
  estimatedSexRatio: number;
  lastCalculatedTime: string; // e.g. "08 Sep 2026, 03:49:30 PM"
  updatedDateString: string; // e.g. "8 September 2026"
  officialDataYear: string;
  isValid: boolean;
  validationError?: string;
}

export interface PopulationHistoryEntry {
  date: string; // e.g. "08-09-2026"
  dateISO: string;
  estimatedPopulation: number;
  baseline: string; // e.g. "Census 2011 (72,147,030)"
  status: 'Estimated';
  dailyChange: number;
}

export interface DataSourceStatus {
  sourceName: string;
  officialYear: string;
  lastCheckedDate: string;
  isApiAvailable: boolean;
  apiEndpointDesc: string;
  hasUpdateAvailable: boolean;
  statusMessage: string;
}

export interface DistrictData {
  id: string;
  name: string;
  headquarters: string;
  region: 'Northern' | 'Western' | 'Central' | 'Southern' | 'Coastal';
  totalPopulation: number;
  malePopulation: number;
  femalePopulation: number;
  sexRatio: number; // Females per 1000 males
  density: number; // per sq km
  literacyRate: number; // percentage
  registeredVoters: number;
  maleVoters: number;
  femaleVoters: number;
  thirdGenderVoters: number;
  assemblySeats: number;
  lokSabhaConstituency: string;
  annualBirths: number;
  annualDeaths: number;
  voterTurnout2024: number; // percentage
  dataYear: string;
  source: string;
  isOfficial: boolean;
}

export interface StateOverview {
  population: {
    total: number;
    male: number;
    female: number;
    sexRatio: number;
    ruralPercentage: number;
    urbanPercentage: number;
    density: number;
    growthRate: number;
    year: string;
    source: string;
    isOfficial: boolean;
  };
  voters: {
    total: number;
    male: number;
    female: number;
    thirdGender: number;
    pollingStations: number;
    assemblyConstituencies: number;
    lokSabhaConstituencies: number;
    year: string;
    source: string;
    isOfficial: boolean;
  };
  vitalStats: {
    annualBirths: number;
    maleBirths: number;
    femaleBirths: number;
    birthRate: number; // per 1000
    annualDeaths: number;
    maleDeaths: number;
    femaleDeaths: number;
    deathRate: number; // per 1000
    infantMortalityRate: number; // per 1000 live births
    institutionalDeliveryRate: number; // percentage
    year: string;
    source: string;
    isOfficial: boolean;
  };
  latestElection: {
    name: string;
    year: string;
    totalElectors: number;
    votesPolled: number;
    turnoutPercentage: number;
    maleTurnout: number;
    femaleTurnout: number;
    thirdGenderTurnout: number;
    source: string;
  };
}

export interface VitalTrend {
  year: string;
  births: number;
  deaths: number;
  naturalIncrease: number;
  crudeBirthRate: number;
  crudeDeathRate: number;
}

export interface TurnoutTrend {
  year: string;
  electionType: 'Lok Sabha' | 'Assembly';
  totalTurnout: number;
  maleTurnout: number;
  femaleTurnout: number;
  totalElectors: number;
}

export interface DataSourceItem {
  id: string;
  datasetName: string;
  category: 'Election' | 'Demographics' | 'Vital Statistics' | 'Administrative';
  year: string;
  sourceAuthority: string;
  description: string;
  officialUrl: string;
  status: 'Official' | 'Demo / Projection';
  notes: string;
}
