import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  unique_user_id: string;
  full_name: string;
  email: string;
  mobile: string;
  date_of_birth: string;
  district: string;
  address: string;
  password_hash: string;
  role: 'Citizen' | 'Officer' | 'Administrator';
  account_status: 'Active' | 'Pending Verification' | 'Suspended';
  is_verified_citizen: boolean;
  created_at: string;
  updated_at: string;
}

export interface IdentityVerification {
  verification_id: string;
  user_id: string;
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

export interface PopulationRecord {
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

export interface PopulationDataVersion {
  id: string;
  record_id: string;
  year: number;
  district: string;
  total_population: number;
  version: number;
  source_organization: string;
  source_document: string;
  source_url: string;
  publication_date: string;
  import_date: string;
  verified_date: string;
  previous_version?: number;
  changed_by: string;
  change_reason: string;
}

export interface GovernmentLink {
  id: string;
  service_name: string;
  department: string;
  category: 'Election' | 'State Government' | 'National' | 'Civil Registration' | 'Public Records';
  official_url: string;
  description: string;
  last_verified: string;
  is_active: boolean;
}

export interface VoterService {
  id: string;
  service_name: string;
  category: 'Registration' | 'Electoral Roll' | 'Correction' | 'Card Services' | 'Information';
  description: string;
  eligibility: string;
  form_number?: string;
  official_url: string;
  last_verified: string;
}

export interface AuditLog {
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

interface DatabaseSchema {
  users: User[];
  identity_verification: IdentityVerification[];
  population_data: PopulationRecord[];
  population_data_versions: PopulationDataVersion[];
  government_links: GovernmentLink[];
  voter_services: VoterService[];
  audit_logs: AuditLog[];
  sequences: {
    citizen_seq: number;
    officer_seq: number;
    admin_seq: number;
    verification_seq: number;
  };
}

const DB_FILE = path.join(process.cwd(), 'portal_database.json');

class DatabaseEngine {
  private data: DatabaseSchema = {
    users: [],
    identity_verification: [],
    population_data: [],
    population_data_versions: [],
    government_links: [],
    voter_services: [],
    audit_logs: [],
    sequences: {
      citizen_seq: 100,
      officer_seq: 20,
      admin_seq: 10,
      verification_seq: 500,
    },
  };

  constructor() {
    this.load();
    if (this.data.users.length === 0) {
      this.seedInitialData();
    }
  }

  private load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        this.data = JSON.parse(raw);
      }
    } catch (err) {
      console.error('Error loading database file, initializing defaults:', err);
    }
  }

  private save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('Error writing database file:', err);
    }
  }

  // --- Sequences & Unique IDs ---
  public generateUniqueUserId(role: 'Citizen' | 'Officer' | 'Administrator'): string {
    const year = new Date().getFullYear();
    let prefix = 'TN-CIT';
    let num = 1;

    if (role === 'Officer') {
      prefix = 'TN-OFF';
      this.data.sequences.officer_seq += 1;
      num = this.data.sequences.officer_seq;
    } else if (role === 'Administrator') {
      prefix = 'TN-ADM';
      this.data.sequences.admin_seq += 1;
      num = this.data.sequences.admin_seq;
    } else {
      this.data.sequences.citizen_seq += 1;
      num = this.data.sequences.citizen_seq;
    }

    this.save();
    return `${prefix}-${year}-${String(num).padStart(6, '0')}`;
  }

  public generateVerificationId(): string {
    this.data.sequences.verification_seq += 1;
    this.save();
    return `VER-${new Date().getFullYear()}-${String(this.data.sequences.verification_seq).padStart(6, '0')}`;
  }

  // --- Users API ---
  public getUsers(): User[] {
    return this.data.users;
  }

  public findUserById(id: string): User | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  public findUserByEmail(email: string): User | undefined {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  public findUserByUniqueId(uniqueId: string): User | undefined {
    return this.data.users.find((u) => u.unique_user_id.toUpperCase() === uniqueId.toUpperCase());
  }

  public createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): User {
    const user: User = {
      ...userData,
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.data.users.push(user);
    this.save();
    return user;
  }

  public updateUser(id: string, updates: Partial<User>): User | undefined {
    const idx = this.data.users.findIndex((u) => u.id === id);
    if (idx === -1) return undefined;
    this.data.users[idx] = {
      ...this.data.users[idx],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    this.save();
    return this.data.users[idx];
  }

  // --- Identity Verification API ---
  public getVerifications(): IdentityVerification[] {
    return this.data.identity_verification;
  }

  public getVerificationsByUserId(userId: string): IdentityVerification[] {
    return this.data.identity_verification.filter((v) => v.user_id === userId);
  }

  public findVerificationById(id: string): IdentityVerification | undefined {
    return this.data.identity_verification.find((v) => v.verification_id === id);
  }

  public createVerification(record: IdentityVerification): IdentityVerification {
    this.data.identity_verification.push(record);
    this.save();
    return record;
  }

  public updateVerification(id: string, updates: Partial<IdentityVerification>): IdentityVerification | undefined {
    const idx = this.data.identity_verification.findIndex((v) => v.verification_id === id);
    if (idx === -1) return undefined;
    this.data.identity_verification[idx] = {
      ...this.data.identity_verification[idx],
      ...updates,
    };
    this.save();
    return this.data.identity_verification[idx];
  }

  // --- Population Data API ---
  public getPopulationRecords(year?: number, district?: string): PopulationRecord[] {
    let list = this.data.population_data;
    if (year !== undefined) {
      list = list.filter((r) => r.year === year);
    }
    if (district !== undefined) {
      list = list.filter((r) => r.district.toLowerCase() === district.toLowerCase());
    }
    return list;
  }

  public findPopulationRecord(id: string): PopulationRecord | undefined {
    return this.data.population_data.find((r) => r.id === id);
  }

  public savePopulationRecord(record: PopulationRecord, adminId: string, reason: string): PopulationRecord {
    const existingIdx = this.data.population_data.findIndex(
      (r) => r.id === record.id || (r.year === record.year && r.district === record.district)
    );

    const versionRecord: PopulationDataVersion = {
      id: `ver_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      record_id: record.id,
      year: record.year,
      district: record.district,
      total_population: record.total_population,
      version: existingIdx !== -1 ? this.data.population_data[existingIdx].version + 1 : 1,
      source_organization: record.source_organization,
      source_document: record.source_document,
      source_url: record.source_url,
      publication_date: record.publication_date,
      import_date: new Date().toISOString(),
      verified_date: record.verified_date,
      previous_version: existingIdx !== -1 ? this.data.population_data[existingIdx].version : undefined,
      changed_by: adminId,
      change_reason: reason,
    };

    record.version = versionRecord.version;

    if (existingIdx !== -1) {
      this.data.population_data[existingIdx] = record;
    } else {
      this.data.population_data.push(record);
    }

    this.data.population_data_versions.push(versionRecord);
    this.save();
    return record;
  }

  public getPopulationVersions(recordId?: string): PopulationDataVersion[] {
    if (recordId) {
      return this.data.population_data_versions.filter((v) => v.record_id === recordId);
    }
    return this.data.population_data_versions;
  }

  // --- Government Links API ---
  public getGovernmentLinks(): GovernmentLink[] {
    return this.data.government_links;
  }

  public updateGovernmentLink(id: string, updates: Partial<GovernmentLink>): GovernmentLink | undefined {
    const idx = this.data.government_links.findIndex((l) => l.id === id);
    if (idx === -1) return undefined;
    this.data.government_links[idx] = {
      ...this.data.government_links[idx],
      ...updates,
      last_verified: new Date().toISOString().split('T')[0],
    };
    this.save();
    return this.data.government_links[idx];
  }

  // --- Voter Services API ---
  public getVoterServices(): VoterService[] {
    return this.data.voter_services;
  }

  // --- Audit Logs API ---
  public logAudit(log: Omit<AuditLog, 'id' | 'timestamp'>): AuditLog {
    const entry: AuditLog = {
      ...log,
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
    };
    this.data.audit_logs.unshift(entry);
    // Keep last 1000 logs
    if (this.data.audit_logs.length > 1000) {
      this.data.audit_logs = this.data.audit_logs.slice(0, 1000);
    }
    this.save();
    return entry;
  }

  public getAuditLogs(limit: number = 100): AuditLog[] {
    return this.data.audit_logs.slice(0, limit);
  }

  // --- Seeding Official Historical & Master Data ---
  private seedInitialData() {
    console.log('Seeding initial official records for Tamil Nadu portal...');

    // Seed Passwords (hashed with bcrypt salt 10)
    const salt = bcrypt.genSaltSync(10);
    const adminHash = bcrypt.hashSync('Admin@2026', salt);
    const officerHash = bcrypt.hashSync('Officer@2026', salt);
    const citizenHash = bcrypt.hashSync('Citizen@2026', salt);

    // Initial Users
    this.data.users = [
      {
        id: 'usr_admin_001',
        unique_user_id: 'TN-ADM-2026-000001',
        full_name: 'Dr. R. Sundaram IAS',
        email: 'admin@tn.gov.in',
        mobile: '9440012345',
        date_of_birth: '1975-04-12',
        district: 'Chennai',
        address: 'Secretariat, Fort St. George, Chennai - 600009',
        password_hash: adminHash,
        role: 'Administrator',
        account_status: 'Active',
        is_verified_citizen: true,
        created_at: new Date('2026-01-01T09:00:00Z').toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'usr_officer_002',
        unique_user_id: 'TN-OFF-2026-000002',
        full_name: 'M. Kavitha DRO',
        email: 'officer@tn.gov.in',
        mobile: '9840198765',
        date_of_birth: '1982-08-24',
        district: 'Madurai',
        address: 'Collectorate Campus, Madurai - 625020',
        password_hash: officerHash,
        role: 'Officer',
        account_status: 'Active',
        is_verified_citizen: true,
        created_at: new Date('2026-01-05T10:00:00Z').toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'usr_citizen_003',
        unique_user_id: 'TN-CIT-2026-000003',
        full_name: 'S. Kalaiselvan',
        email: 'citizen@tn.gov.in',
        mobile: '9790123456',
        date_of_birth: '1998-06-15',
        district: 'Coimbatore',
        address: '14/2 Cross Cut Road, Gandhipuram, Coimbatore - 641012',
        password_hash: citizenHash,
        role: 'Citizen',
        account_status: 'Active',
        is_verified_citizen: true,
        created_at: new Date('2026-01-10T11:30:00Z').toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    // Seed Sample Identity Verification for Citizen
    this.data.identity_verification = [
      {
        verification_id: 'VER-2026-000001',
        user_id: 'usr_citizen_003',
        document_type: 'Voter ID',
        masked_document_number: 'EPIC: XXXX8912',
        document_hash: 'sha256_e8d197609214b2d398f6d8923a',
        ai_check_status: 'Passed',
        official_verification_status: 'Officially Verified',
        manual_review_status: 'Approved',
        reviewer_id: 'usr_officer_002',
        reviewer_name: 'M. Kavitha DRO',
        review_notes: 'Verified against ECI Electoral Roll Portal record.',
        submitted_at: new Date('2026-01-10T12:00:00Z').toISOString(),
        verified_at: new Date('2026-01-10T14:30:00Z').toISOString(),
        retention_expiry: new Date(Date.now() + 90 * 86400000).toISOString(),
        extracted_data: {
          full_name: 'S. Kalaiselvan',
          dob: '1998-06-15',
          gender: 'Male',
          district: 'Coimbatore',
          address_snippet: 'Gandhipuram, Coimbatore',
        },
        ai_analysis_report: {
          image_quality: 'High Resolution, clear borders, readable fonts',
          required_fields_present: true,
          date_expiry_valid: true,
          structural_integrity: 'Conforms to standard Election Commission EPIC card format',
          internal_consistency: true,
          possible_alterations_detected: false,
          summary_notes: [
            'Card format matches standard ECI smart EPIC design',
            'Full name and DOB match applicant account details',
            'Optical OCR confirmed text readability at 98.4%',
          ],
          official_disclaimer:
            'AI checks completed. Official authenticity verified via authorized officer approval.',
        },
      },
    ];

    // Seed Yearly Population Records for Tamil Nadu (2010 to 2026)
    // Sources: Census of India 2011, RGI Technical Group on Population Projections (2011-2036),
    // and Civil Registration System vital statistics reports.
    const stateYearly: Array<Omit<PopulationRecord, 'id' | 'district' | 'version'>> = [
      {
        year: 2010,
        total_population: 71438900,
        male_population: 35840100,
        female_population: 35582600,
        other_population: 16200,
        urban_population: 34290672,
        rural_population: 37148228,
        growth_rate_pct: 1.52,
        births_registered: 1118641,
        deaths_registered: 521400,
        source_organization: 'Registrar General & Census Commissioner of India (RGI)',
        source_document: 'Sample Registration System (SRS) & Pre-Census Estimates',
        source_url: 'https://censusindia.gov.in',
        publication_date: '2011-03-31',
        verified_date: '2026-01-15',
        is_official_census: false,
        is_projection: true,
      },
      {
        year: 2011,
        total_population: 72147030,
        male_population: 36137975,
        female_population: 35992878,
        other_population: 16177,
        urban_population: 34921681,
        rural_population: 37225349,
        growth_rate_pct: 1.56,
        births_registered: 1118641,
        deaths_registered: 498300,
        source_organization: 'Census of India (Office of Registrar General)',
        source_document: 'Census 2011 Primary Census Abstract (PCA), Directorate of Census Operations, Tamil Nadu',
        source_url: 'https://censusindia.gov.in/census.website/data/census-tables',
        publication_date: '2011-04-15',
        verified_date: '2026-01-15',
        is_official_census: true,
        is_projection: false,
      },
      {
        year: 2012,
        total_population: 72680000,
        male_population: 36400000,
        female_population: 36263800,
        other_population: 16200,
        urban_population: 35395160,
        rural_population: 37284840,
        growth_rate_pct: 0.74,
        births_registered: 1045230,
        deaths_registered: 489320,
        source_organization: 'National Commission on Population / MoHFW & RGI',
        source_document: 'Report of Technical Group on Population Projections (2011-2036)',
        source_url: 'https://nhm.gov.in/New_Updates_2018/Report_Population_Projection_2019.pdf',
        publication_date: '2020-07-01',
        verified_date: '2026-01-15',
        is_official_census: false,
        is_projection: true,
      },
      {
        year: 2013,
        total_population: 73210000,
        male_population: 36660000,
        female_population: 36533800,
        other_population: 16200,
        urban_population: 35872900,
        rural_population: 37337100,
        growth_rate_pct: 0.73,
        births_registered: 1024310,
        deaths_registered: 494110,
        source_organization: 'National Commission on Population / MoHFW & RGI',
        source_document: 'Report of Technical Group on Population Projections (2011-2036)',
        source_url: 'https://nhm.gov.in/New_Updates_2018/Report_Population_Projection_2019.pdf',
        publication_date: '2020-07-01',
        verified_date: '2026-01-15',
        is_official_census: false,
        is_projection: true,
      },
      {
        year: 2014,
        total_population: 73740000,
        male_population: 36920000,
        female_population: 36803800,
        other_population: 16200,
        urban_population: 36353820,
        rural_population: 37386180,
        growth_rate_pct: 0.72,
        births_registered: 1008740,
        deaths_registered: 501240,
        source_organization: 'National Commission on Population / MoHFW & RGI',
        source_document: 'Report of Technical Group on Population Projections (2011-2036)',
        source_url: 'https://nhm.gov.in/New_Updates_2018/Report_Population_Projection_2019.pdf',
        publication_date: '2020-07-01',
        verified_date: '2026-01-15',
        is_official_census: false,
        is_projection: true,
      },
      {
        year: 2015,
        total_population: 74270000,
        male_population: 37180000,
        female_population: 37073800,
        other_population: 16200,
        urban_population: 36837920,
        rural_population: 37432080,
        growth_rate_pct: 0.72,
        births_registered: 994200,
        deaths_registered: 512300,
        source_organization: 'National Commission on Population / MoHFW & RGI',
        source_document: 'Report of Technical Group on Population Projections (2011-2036)',
        source_url: 'https://nhm.gov.in/New_Updates_2018/Report_Population_Projection_2019.pdf',
        publication_date: '2020-07-01',
        verified_date: '2026-01-15',
        is_official_census: false,
        is_projection: true,
      },
      {
        year: 2016,
        total_population: 74800000,
        male_population: 37440000,
        female_population: 37343800,
        other_population: 16200,
        urban_population: 37325200,
        rural_population: 37474800,
        growth_rate_pct: 0.71,
        births_registered: 978450,
        deaths_registered: 524100,
        source_organization: 'National Commission on Population / MoHFW & RGI',
        source_document: 'Report of Technical Group on Population Projections (2011-2036)',
        source_url: 'https://nhm.gov.in/New_Updates_2018/Report_Population_Projection_2019.pdf',
        publication_date: '2020-07-01',
        verified_date: '2026-01-15',
        is_official_census: false,
        is_projection: true,
      },
      {
        year: 2017,
        total_population: 75220000,
        male_population: 37640000,
        female_population: 37563800,
        other_population: 16200,
        urban_population: 37760440,
        rural_population: 37459560,
        growth_rate_pct: 0.56,
        births_registered: 955310,
        deaths_registered: 539400,
        source_organization: 'National Commission on Population / MoHFW & RGI',
        source_document: 'Report of Technical Group on Population Projections (2011-2036)',
        source_url: 'https://nhm.gov.in/New_Updates_2018/Report_Population_Projection_2019.pdf',
        publication_date: '2020-07-01',
        verified_date: '2026-01-15',
        is_official_census: false,
        is_projection: true,
      },
      {
        year: 2018,
        total_population: 75640000,
        male_population: 37840000,
        female_population: 37783800,
        other_population: 16200,
        urban_population: 38198200,
        rural_population: 37441800,
        growth_rate_pct: 0.56,
        births_registered: 942120,
        deaths_registered: 546200,
        source_organization: 'National Commission on Population / MoHFW & RGI',
        source_document: 'Report of Technical Group on Population Projections (2011-2036)',
        source_url: 'https://nhm.gov.in/New_Updates_2018/Report_Population_Projection_2019.pdf',
        publication_date: '2020-07-01',
        verified_date: '2026-01-15',
        is_official_census: false,
        is_projection: true,
      },
      {
        year: 2019,
        total_population: 76060000,
        male_population: 38040000,
        female_population: 38003800,
        other_population: 16200,
        urban_population: 38638480,
        rural_population: 37421520,
        growth_rate_pct: 0.55,
        births_registered: 931400,
        deaths_registered: 554300,
        source_organization: 'National Commission on Population / MoHFW & RGI',
        source_document: 'Report of Technical Group on Population Projections (2011-2036)',
        source_url: 'https://nhm.gov.in/New_Updates_2018/Report_Population_Projection_2019.pdf',
        publication_date: '2020-07-01',
        verified_date: '2026-01-15',
        is_official_census: false,
        is_projection: true,
      },
      {
        year: 2020,
        total_population: 76480000,
        male_population: 38240000,
        female_population: 38223800,
        other_population: 16200,
        urban_population: 39081280,
        rural_population: 37398720,
        growth_rate_pct: 0.55,
        births_registered: 915200,
        deaths_registered: 578400,
        source_organization: 'National Commission on Population / MoHFW & RGI',
        source_document: 'Report of Technical Group on Population Projections (2011-2036)',
        source_url: 'https://nhm.gov.in/New_Updates_2018/Report_Population_Projection_2019.pdf',
        publication_date: '2020-07-01',
        verified_date: '2026-01-15',
        is_official_census: false,
        is_projection: true,
      },
      {
        year: 2021,
        total_population: 76860000,
        male_population: 38420000,
        female_population: 38423800,
        other_population: 16200,
        urban_population: 39506040,
        rural_population: 37353960,
        growth_rate_pct: 0.50,
        births_registered: 902140,
        deaths_registered: 612800,
        source_organization: 'National Commission on Population / MoHFW & RGI',
        source_document: 'Report of Technical Group on Population Projections (2011-2036)',
        source_url: 'https://nhm.gov.in/New_Updates_2018/Report_Population_Projection_2019.pdf',
        publication_date: '2020-07-01',
        verified_date: '2026-01-15',
        is_official_census: false,
        is_projection: true,
      },
      {
        year: 2022,
        total_population: 76400000,
        male_population: 38180000,
        female_population: 38203800,
        other_population: 16200,
        urban_population: 39422400,
        rural_population: 36977600,
        growth_rate_pct: 0.48,
        births_registered: 894300,
        deaths_registered: 598100,
        source_organization: 'Directorate of Economics and Statistics, Govt. of Tamil Nadu',
        source_document: 'Tamil Nadu An Economic Appraisal 2021-22 & 2022-23',
        source_url: 'https://des.tn.gov.in',
        publication_date: '2023-03-15',
        verified_date: '2026-01-15',
        is_official_census: false,
        is_projection: true,
      },
      {
        year: 2023,
        total_population: 76600000,
        male_population: 38280000,
        female_population: 38303800,
        other_population: 16200,
        urban_population: 39678800,
        rural_population: 36921200,
        growth_rate_pct: 0.46,
        births_registered: 887100,
        deaths_registered: 589400,
        source_organization: 'Directorate of Economics and Statistics, Govt. of Tamil Nadu',
        source_document: 'Statistical Hand Book of Tamil Nadu 2023',
        source_url: 'https://des.tn.gov.in',
        publication_date: '2023-11-20',
        verified_date: '2026-01-15',
        is_official_census: false,
        is_projection: true,
      },
      {
        year: 2024,
        total_population: 76800000,
        male_population: 38370000,
        female_population: 38413800,
        other_population: 16200,
        urban_population: 39936000,
        rural_population: 36864000,
        growth_rate_pct: 0.45,
        births_registered: 881000,
        deaths_registered: 583200,
        source_organization: 'Chief Electoral Officer, TN & MoHFW Projections',
        source_document: 'Electoral Roll Summary 2024 & Health Dept Vital Statistics',
        source_url: 'https://elections.tn.gov.in',
        publication_date: '2024-01-22',
        verified_date: '2026-01-15',
        is_official_census: false,
        is_projection: true,
      },
      {
        year: 2025,
        total_population: 76950000,
        male_population: 38440000,
        female_population: 38493800,
        other_population: 16200,
        urban_population: 40167900,
        rural_population: 36782100,
        growth_rate_pct: 0.42,
        births_registered: 875000,
        deaths_registered: 579000,
        source_organization: 'National Commission on Population / RGI Projections',
        source_document: 'State Level Projections for 2025 (Official Projection Series)',
        source_url: 'https://nhm.gov.in',
        publication_date: '2024-06-01',
        verified_date: '2026-01-15',
        is_official_census: false,
        is_projection: true,
      },
      {
        year: 2026,
        total_population: 77100000,
        male_population: 38510000,
        female_population: 38573800,
        other_population: 16200,
        urban_population: 40399400,
        rural_population: 36700600,
        growth_rate_pct: 0.40,
        births_registered: 870000,
        deaths_registered: 575000,
        source_organization: 'National Commission on Population, MoHFW (Report 2019/2020)',
        source_document: 'Population Projections for India and States 2011-2036 - Table 9 (Tamil Nadu Projection for 2026)',
        source_url: 'https://nhm.gov.in/New_Updates_2018/Report_Population_Projection_2019.pdf',
        publication_date: '2020-07-01',
        verified_date: '2026-01-15',
        is_official_census: false,
        is_projection: true,
      },
    ];

    stateYearly.forEach((r, idx) => {
      this.data.population_data.push({
        ...r,
        id: `pop_state_${r.year}`,
        district: 'Tamil Nadu (State Total)',
        version: 1,
      });

      this.data.population_data_versions.push({
        id: `ver_seed_state_${r.year}`,
        record_id: `pop_state_${r.year}`,
        year: r.year,
        district: 'Tamil Nadu (State Total)',
        total_population: r.total_population,
        version: 1,
        source_organization: r.source_organization,
        source_document: r.source_document,
        source_url: r.source_url,
        publication_date: r.publication_date,
        import_date: new Date().toISOString(),
        verified_date: r.verified_date,
        changed_by: 'usr_admin_001',
        change_reason: 'Initial Government baseline dataset migration',
      });
    });

    // Seed 38 Districts Population Data (Census 2011 Official Base + Recent Administrative Estimates)
    const districtsSeed = [
      { name: 'Ariyalur', pop2011: 754894, male: 374703, female: 380191, urban: 83526, rural: 671368, currentPop: 801200 },
      { name: 'Chengalpattu', pop2011: 2556244, male: 1290340, female: 1265904, urban: 1789370, rural: 766874, currentPop: 2980000, note: 'Bifurcated from Kancheepuram in Nov 2019 (G.O. Ms. No. 428)' },
      { name: 'Chennai', pop2011: 4646732, male: 2335844, female: 2310888, urban: 4646732, rural: 0, currentPop: 5120000 },
      { name: 'Coimbatore', pop2011: 3458045, male: 1729297, female: 1728748, urban: 2618940, rural: 839105, currentPop: 3890000 },
      { name: 'Cuddalore', pop2011: 2605914, male: 1311697, female: 1294217, urban: 885260, rural: 1720654, currentPop: 2795000 },
      { name: 'Dharmapuri', pop2011: 1506843, male: 774303, female: 732540, urban: 254600, rural: 1252243, currentPop: 1625000 },
      { name: 'Dindigul', pop2011: 2159775, male: 1080938, female: 1078837, urban: 808140, rural: 1351635, currentPop: 2310000 },
      { name: 'Erode', pop2011: 2251744, male: 1129868, female: 1121876, urban: 1157120, rural: 1094624, currentPop: 2410000 },
      { name: 'Kallakurichi', pop2011: 1370281, male: 694200, female: 676081, urban: 287750, rural: 1082531, currentPop: 1475000, note: 'Bifurcated from Viluppuram in Nov 2019 (G.O. Ms. No. 423)' },
      { name: 'Kancheepuram', pop2011: 1442454, male: 728920, female: 713534, urban: 735650, rural: 706804, currentPop: 1580000 },
      { name: 'Kanniyakumari', pop2011: 1870374, male: 926345, female: 944029, urban: 1541460, rural: 328914, currentPop: 1965000 },
      { name: 'Karur', pop2011: 1064493, male: 528184, female: 536309, urban: 434980, rural: 629513, currentPop: 1140000 },
      { name: 'Krishnagiri', pop2011: 1879809, male: 960732, female: 919077, urban: 428400, rural: 1451409, currentPop: 2030000 },
      { name: 'Madurai', pop2011: 3038252, male: 1526475, female: 1511777, urban: 1845100, rural: 1193152, currentPop: 3290000 },
      { name: 'Mayiladuthurai', pop2011: 918356, male: 452100, female: 466256, urban: 247950, rural: 670406, currentPop: 985000, note: 'Bifurcated from Nagapattinam in Dec 2020 (G.O. Ms. No. 835)' },
      { name: 'Nagapattinam', pop2011: 697069, male: 341850, female: 355219, urban: 202140, rural: 494929, currentPop: 745000 },
      { name: 'Namakkal', pop2011: 1726601, male: 869280, female: 857321, urban: 696140, rural: 1030461, currentPop: 1845000 },
      { name: 'Nilgiris', pop2011: 735394, male: 360143, female: 375251, urban: 435600, rural: 299794, currentPop: 765000 },
      { name: 'Perambalur', pop2011: 565223, male: 282157, female: 283066, urban: 96600, rural: 468623, currentPop: 605000 },
      { name: 'Pudukkottai', pop2011: 1618345, male: 803188, female: 815157, urban: 317100, rural: 1301245, currentPop: 1730000 },
      { name: 'Ramanathapuram', pop2011: 1353445, male: 682658, female: 670787, urban: 410400, rural: 943045, currentPop: 1445000 },
      { name: 'Ranipet', pop2011: 1210277, male: 606200, female: 604077, urban: 580930, rural: 629347, currentPop: 1315000, note: 'Bifurcated from Vellore in Nov 2019 (G.O. Ms. No. 427)' },
      { name: 'Salem', pop2011: 3482056, male: 1781838, female: 1700218, urban: 1774200, rural: 1707856, currentPop: 3740000 },
      { name: 'Sivaganga', pop2011: 1339101, male: 668672, female: 670429, urban: 412700, rural: 926401, currentPop: 1425000 },
      { name: 'Tenkasi', pop2011: 1407627, male: 694200, female: 713427, urban: 619350, rural: 788277, currentPop: 1515000, note: 'Bifurcated from Tirunelveli in Nov 2019 (G.O. Ms. No. 426)' },
      { name: 'Thanjavur', pop2011: 2405890, male: 1182416, female: 1223474, urban: 851600, rural: 1554290, currentPop: 2540000 },
      { name: 'Theni', pop2011: 1245899, male: 625127, female: 620772, urban: 670300, rural: 575599, currentPop: 1325000 },
      { name: 'Thoothukudi', pop2011: 1750176, male: 865021, female: 885155, urban: 878400, rural: 871776, currentPop: 1870000 },
      { name: 'Tiruchirappalli', pop2011: 2722290, male: 1352284, female: 1370006, urban: 1339400, rural: 1382890, currentPop: 2940000 },
      { name: 'Tirunelveli', pop2011: 1665253, male: 819200, female: 846053, urban: 839280, rural: 825973, currentPop: 1790000 },
      { name: 'Tirupattur', pop2011: 1111812, male: 556900, female: 554912, urban: 411370, rural: 700442, currentPop: 1210000, note: 'Bifurcated from Vellore in Nov 2019 (G.O. Ms. No. 427)' },
      { name: 'Tiruppur', pop2011: 2479052, male: 1246159, female: 1232893, urban: 1521400, rural: 957652, currentPop: 2790000 },
      { name: 'Tiruvallur', pop2011: 3728104, male: 1876062, female: 1852042, urban: 2427000, rural: 1301104, currentPop: 4180000 },
      { name: 'Tiruvannamalai', pop2011: 2464875, male: 1240056, female: 1224819, urban: 495400, rural: 1969475, currentPop: 2630000 },
      { name: 'Tiruvarur', pop2011: 1264277, male: 626693, female: 637584, urban: 257900, rural: 1006377, currentPop: 1345000 },
      { name: 'Vellore', pop2011: 1614242, male: 801100, female: 813142, urban: 968540, rural: 645702, currentPop: 1750000 },
      { name: 'Viluppuram', pop2011: 2090254, male: 1056400, female: 1033854, urban: 326080, rural: 1764174, currentPop: 2240000 },
      { name: 'Virudhunagar', pop2011: 1942288, male: 967709, female: 974579, urban: 980900, rural: 961388, currentPop: 2075000 },
    ];

    districtsSeed.forEach((d) => {
      // 2011 Census record
      this.data.population_data.push({
        id: `pop_dist_${d.name.toLowerCase().replace(/\s+/g, '_')}_2011`,
        district: d.name,
        year: 2011,
        total_population: d.pop2011,
        male_population: d.male,
        female_population: d.female,
        other_population: Math.round(d.pop2011 * 0.0002),
        urban_population: d.urban,
        rural_population: d.rural,
        source_organization: 'Census of India (Primary Census Abstract)',
        source_document: 'District Census Handbook (DCHB), Tamil Nadu - Census 2011',
        source_url: 'https://censusindia.gov.in/census.website/data/census-tables',
        publication_date: '2011-04-15',
        verified_date: '2026-01-15',
        is_official_census: true,
        is_projection: false,
        growth_rate_pct: 1.48,
        version: 1,
      });

      // 2024 Administrative Projection record
      this.data.population_data.push({
        id: `pop_dist_${d.name.toLowerCase().replace(/\s+/g, '_')}_2024`,
        district: d.name,
        year: 2024,
        total_population: d.currentPop,
        male_population: Math.round(d.currentPop * 0.501),
        female_population: Math.round(d.currentPop * 0.499),
        other_population: Math.round(d.currentPop * 0.00025),
        urban_population: Math.round(d.currentPop * (d.urban / d.pop2011)),
        rural_population: d.currentPop - Math.round(d.currentPop * (d.urban / d.pop2011)),
        source_organization: 'Directorate of Economics and Statistics, Govt of Tamil Nadu',
        source_document: 'District Statistical Handbook 2024 & Electoral Roll Compilation',
        source_url: 'https://des.tn.gov.in',
        publication_date: '2024-03-31',
        verified_date: '2026-01-15',
        is_official_census: false,
        is_projection: true,
        growth_rate_pct: 0.44,
        version: 1,
      });
    });

    // Seed Verified Official Government Links
    this.data.government_links = [
      {
        id: 'link_001',
        service_name: 'Election Commission of India (ECI)',
        department: 'Election Commission of India',
        category: 'Election',
        official_url: 'https://eci.gov.in',
        description: 'Apex constitutional body administering Lok Sabha, Rajya Sabha, and State Legislative Assembly elections in India.',
        last_verified: '2026-01-15',
        is_active: true,
      },
      {
        id: 'link_002',
        service_name: 'Chief Electoral Officer, Tamil Nadu (CEO TN)',
        department: 'Elections Department, Government of Tamil Nadu',
        category: 'Election',
        official_url: 'https://elections.tn.gov.in',
        description: 'State electoral authority managing voter rolls, assembly polling stations, and district electoral officers in Tamil Nadu.',
        last_verified: '2026-01-15',
        is_active: true,
      },
      {
        id: 'link_003',
        service_name: 'ECI Voters Service Portal',
        department: 'Election Commission of India',
        category: 'Election',
        official_url: 'https://voters.eci.gov.in',
        description: 'Single-window national portal for Form 6 voter registration, EPIC digital download, electoral roll search, and tracking.',
        last_verified: '2026-01-15',
        is_active: true,
      },
      {
        id: 'link_004',
        service_name: 'Government of Tamil Nadu Official Portal',
        department: 'Government of Tamil Nadu',
        category: 'State Government',
        official_url: 'https://tn.gov.in',
        description: 'Primary state portal for government orders, secretariats, gazettes, policies, welfare schemes, and official press releases.',
        last_verified: '2026-01-15',
        is_active: true,
      },
      {
        id: 'link_005',
        service_name: 'e-Sevai / TNeGA Citizen Services Portal',
        department: 'Tamil Nadu e-Governance Agency (TNeGA)',
        category: 'State Government',
        official_url: 'https://tnesevai.tn.gov.in',
        description: 'Online delivery of community certificates, income certificates, nativity certificates, and municipal services.',
        last_verified: '2026-01-15',
        is_active: true,
      },
      {
        id: 'link_006',
        service_name: 'Office of the Registrar General & Census Commissioner',
        department: 'Ministry of Home Affairs, Government of India',
        category: 'Public Records',
        official_url: 'https://censusindia.gov.in',
        description: 'Official national authority conducting decennial census, vital statistics registration, and demographic research.',
        last_verified: '2026-01-15',
        is_active: true,
      },
      {
        id: 'link_007',
        service_name: 'Civil Registration System Tamil Nadu (CRS TN)',
        department: 'Directorate of Public Health & Preventive Medicine, TN',
        category: 'Civil Registration',
        official_url: 'https://crstn.org',
        description: 'Official portal for searching, verifying, and downloading digital Birth and Death Certificates in Tamil Nadu.',
        last_verified: '2026-01-15',
        is_active: true,
      },
      {
        id: 'link_008',
        service_name: 'National Government Services Portal',
        department: 'National Informatics Centre (NIC), MeitY',
        category: 'National',
        official_url: 'https://services.india.gov.in',
        description: 'Federal aggregator of over 12,000 public services across Union ministries and state government departments.',
        last_verified: '2026-01-15',
        is_active: true,
      },
      {
        id: 'link_009',
        service_name: 'DigiLocker India',
        department: 'Ministry of Electronics & IT, Government of India',
        category: 'Public Records',
        official_url: 'https://digilocker.gov.in',
        description: 'Secure cloud repository for legally recognized digital documents including Aadhaar, Driving Licence, and Voter ID.',
        last_verified: '2026-01-15',
        is_active: true,
      },
      {
        id: 'link_010',
        service_name: 'Directorate of Economics and Statistics, Tamil Nadu',
        department: 'Planning and Development Department, TN',
        category: 'Public Records',
        official_url: 'https://des.tn.gov.in',
        description: 'State statistical agency publishing annual economic appraisals, district handbooks, and statistical abstracts.',
        last_verified: '2026-01-15',
        is_active: true,
      },
    ];

    // Seed Verified Voter Services
    this.data.voter_services = [
      {
        id: 'vs_001',
        service_name: 'New Voter Registration (General Citizen)',
        category: 'Registration',
        description: 'Application for inclusion of name in Electoral Roll for first-time electors or voters shifting to a new assembly constituency.',
        eligibility: 'Citizen of India, 18+ years of age on qualifying date (1 Jan, 1 Apr, 1 Jul, 1 Oct), resident of constituency.',
        form_number: 'Form 6',
        official_url: 'https://voters.eci.gov.in/form6',
        last_verified: '2026-01-15',
      },
      {
        id: 'vs_002',
        service_name: 'Overseas (NRI) Voter Registration',
        category: 'Registration',
        description: 'Application for inclusion in Electoral Roll for Indian citizens residing abroad who have not acquired foreign citizenship.',
        eligibility: 'Indian citizen living outside India, holding a valid Indian passport.',
        form_number: 'Form 6A',
        official_url: 'https://voters.eci.gov.in/form6A',
        last_verified: '2026-01-15',
      },
      {
        id: 'vs_003',
        service_name: 'Electoral Roll Search & Polling Booth Locator',
        category: 'Electoral Roll',
        description: 'Search voter registration details by EPIC number, mobile number, or personal details to verify inclusion and booth location.',
        eligibility: 'Any registered or prospective elector in Tamil Nadu.',
        official_url: 'https://electoralsearch.eci.gov.in',
        last_verified: '2026-01-15',
      },
      {
        id: 'vs_004',
        service_name: 'Correction of Entries in Existing Electoral Roll',
        category: 'Correction',
        description: 'Update name, address, photo, date of birth, or relative name in the existing voter register without shifting constituencies.',
        eligibility: 'Registered elector with error in existing EPIC card or roll entry.',
        form_number: 'Form 8 (Correction)',
        official_url: 'https://voters.eci.gov.in/form8',
        last_verified: '2026-01-15',
      },
      {
        id: 'vs_005',
        service_name: 'Digital e-EPIC Card Download',
        category: 'Card Services',
        description: 'Download password-protected portable PDF version of the Electoral Photo Identity Card (EPIC) on mobile or computer.',
        eligibility: 'Electors with unique mobile number registered on the ECI portal.',
        official_url: 'https://voters.eci.gov.in/epic-download',
        last_verified: '2026-01-15',
      },
      {
        id: 'vs_006',
        service_name: 'Objection to Inclusion or Deletion of Name',
        category: 'Electoral Roll',
        description: 'Application for objection against inclusion of a name or requesting deletion of name due to death or permanent shifting.',
        eligibility: 'Any elector registered in the same constituency.',
        form_number: 'Form 7',
        official_url: 'https://voters.eci.gov.in/form7',
        last_verified: '2026-01-15',
      },
      {
        id: 'vs_007',
        service_name: 'National Voter Toll-Free Helpline (1950)',
        category: 'Information',
        description: 'Direct telephonic assistance in Tamil and English for voter enrollment, grievance lodging, and polling information.',
        eligibility: 'All citizens (Call 1950 from any telephone or mobile without prefix).',
        official_url: 'https://eci.gov.in/contact-us',
        last_verified: '2026-01-15',
      },
    ];

    // Initial Audit Log
    this.data.audit_logs = [
      {
        id: 'log_seed_001',
        user_id: 'usr_admin_001',
        user_email: 'admin@tn.gov.in',
        action: 'SYSTEM_INITIALIZATION',
        timestamp: new Date('2026-01-01T09:00:00Z').toISOString(),
        ip_address: '127.0.0.1',
        user_agent: 'TN-Gov-Server/1.0',
        status: 'SUCCESS',
        details: 'Initial database schema generated and official Census 2011 & RGI population records seeded.',
      },
    ];

    this.save();
    console.log('Database seeded successfully.');
  }
}

export const db = new DatabaseEngine();
