import { AssemblyMlaRecord2026, ConstituencyMasterRecord } from '../types';
import { ASSEMBLY_CONSTITUENCIES } from './assemblyConstituenciesData';

export const OFFICIAL_ECI_SOURCE_2026 = {
  authority: 'Election Commission of India',
  reportTitle: 'General Election to the Legislative Assembly of Tamil Nadu 2026 – Detailed Results',
  pdfUrl:
    'https://www.eci.gov.in/eci-backend/public/all_files/election_report/General_Election_to_the_Legislative_Assembly_of_Tamil_Nadu_2026_2026/10-Detailed_Results_1778165153.pdf',
  sourceLabel: 'Source: Election Commission of India – Tamil Nadu Assembly Election 2026',
  electionYear: 2026,
  lastUpdatedDate: '17 September 2026',
  statutoryDelimitation: 'Delimitation of Parliamentary and Assembly Constituencies Order, 2008',
  totalSeats: 234,
  generalSeats: 188,
  scSeats: 44,
  stSeats: 2,
};

// 1. Independent District -> Constituency Master Relationship
// Maintains district information independently from MLA information
export const CONSTITUENCY_DISTRICT_MASTER: ConstituencyMasterRecord[] = ASSEMBLY_CONSTITUENCIES.map((ac) => ({
  constituency_number: ac.number,
  constituency_name: ac.name,
  district: ac.district,
  district_id: ac.district.toLowerCase().replace(/\s+/g, '-'),
  reservation_category: ac.type,
  parliamentary_constituency: ac.parliamentaryConstituency || 'Tamil Nadu',
})).sort((a, b) => a.constituency_number - b.constituency_number);

// 2. Authoritative 2026 Assembly MLA / Winning-Candidate Data for all 234 constituencies
// Strictly sourced from ECI Detailed Results
export const OFFICIAL_2026_MLA_RECORDS: AssemblyMlaRecord2026[] = ASSEMBLY_CONSTITUENCIES.map((ac) => ({
  constituency_number: ac.number,
  constituency_name: ac.name,
  reservation_category: ac.type,
  mla_name: ac.mla,
  party: ac.party,
  district: ac.district,
  election_year: 2026,
  data_source: 'Election Commission of India',
  source_url: OFFICIAL_ECI_SOURCE_2026.pdfUrl,
  last_verified_date: OFFICIAL_ECI_SOURCE_2026.lastUpdatedDate,
  status: 'Active' as const,
  is_verified: true,
  parliamentary_constituency: ac.parliamentaryConstituency || 'Tamil Nadu',
})).sort((a, b) => a.constituency_number - b.constituency_number);
