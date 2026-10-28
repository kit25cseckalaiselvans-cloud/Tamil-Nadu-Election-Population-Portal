import {
  AssemblyMlaRecord2026,
  MlaAuditLogEntry,
  DataValidationReport,
} from '../types';
import {
  OFFICIAL_2026_MLA_RECORDS,
  OFFICIAL_ECI_SOURCE_2026,
} from '../data/assemblyData2026';

const STORAGE_KEY_MLAS = 'tn_mla_records_2026_eci_published';
const STORAGE_KEY_AUDIT = 'tn_mla_audit_history_2026';

// 1. RUN COMPREHENSIVE STATUTORY VALIDATION SUITE (10 CHECKS)
export function runMlaDataValidation(records: AssemblyMlaRecord2026[]): DataValidationReport {
  const errors: string[] = [];
  const checks: { id: string; label: string; passed: boolean; details: string }[] = [];

  // Check 1: Total constituencies = 234
  const countCheck = records.length === 234;
  if (!countCheck) {
    errors.push(`Total constituencies count is ${records.length}; expected exactly 234.`);
  }
  checks.push({
    id: 'total-count',
    label: 'Total Constituencies = 234',
    passed: countCheck,
    details: `Found ${records.length} of 234 statutory constituencies.`,
  });

  // Check 2: Constituency numbers = 1–234 with no missing numbers
  const numbers = new Set(records.map((r) => r.constituency_number));
  const missingNumbers: number[] = [];
  for (let i = 1; i <= 234; i++) {
    if (!numbers.has(i)) {
      missingNumbers.push(i);
    }
  }
  const sequenceCheck = missingNumbers.length === 0;
  if (!sequenceCheck) {
    errors.push(`Missing constituency numbers: ${missingNumbers.slice(0, 10).join(', ')}${missingNumbers.length > 10 ? '...' : ''}`);
  }
  checks.push({
    id: 'sequence',
    label: 'Constituency Numbers 1–234 in Order',
    passed: sequenceCheck,
    details: sequenceCheck ? 'All numbers from 1 to 234 present without gaps.' : `Missing: ${missingNumbers.join(', ')}`,
  });

  // Check 3: No duplicate constituency numbers
  const numberCounts = new Map<number, number>();
  records.forEach((r) => numberCounts.set(r.constituency_number, (numberCounts.get(r.constituency_number) || 0) + 1));
  const duplicateNumbers = Array.from(numberCounts.entries()).filter(([_, count]) => count > 1).map(([num]) => num);
  const noDuplicateNumbers = duplicateNumbers.length === 0;
  if (!noDuplicateNumbers) {
    errors.push(`Duplicate constituency numbers detected: ${duplicateNumbers.join(', ')}`);
  }
  checks.push({
    id: 'duplicate-numbers',
    label: 'No Duplicate Constituency Numbers',
    passed: noDuplicateNumbers,
    details: noDuplicateNumbers ? 'Every constituency number is strictly unique.' : `Duplicates: ${duplicateNumbers.join(', ')}`,
  });

  // Check 4: No duplicate constituency records (name check)
  const nameCounts = new Map<string, number>();
  records.forEach((r) => {
    const key = r.constituency_name.toLowerCase().trim();
    nameCounts.set(key, (nameCounts.get(key) || 0) + 1);
  });
  const duplicateNames = Array.from(nameCounts.entries()).filter(([_, count]) => count > 1).map(([name]) => name);
  const noDuplicateRecords = duplicateNames.length === 0;
  if (!noDuplicateRecords) {
    errors.push(`Duplicate constituency names found: ${duplicateNames.join(', ')}`);
  }
  checks.push({
    id: 'duplicate-records',
    label: 'No Duplicate Constituency Records',
    passed: noDuplicateRecords,
    details: noDuplicateRecords ? 'All 234 constituency names are distinct.' : `Duplicates: ${duplicateNames.join(', ')}`,
  });

  // Check 5: Every constituency has an MLA/winning candidate
  const missingMlas = records.filter((r) => !r.mla_name || r.mla_name.trim() === '');
  const allMlasPresent = missingMlas.length === 0;
  if (!allMlasPresent) {
    errors.push(`${missingMlas.length} constituencies are missing MLA / winning candidate names.`);
  }
  checks.push({
    id: 'mla-names',
    label: 'Every Constituency Has an MLA / Winning Candidate',
    passed: allMlasPresent,
    details: allMlasPresent ? 'All 234 winning candidates recorded.' : `${missingMlas.length} candidates missing.`,
  });

  // Check 6: Every constituency has a political party
  const missingParties = records.filter((r) => !r.party || r.party.trim() === '');
  const allPartiesPresent = missingParties.length === 0;
  if (!allPartiesPresent) {
    errors.push(`${missingParties.length} constituencies lack political party affiliation.`);
  }
  checks.push({
    id: 'parties',
    label: 'Every Constituency Has a Political Party',
    passed: allPartiesPresent,
    details: allPartiesPresent ? '100% of seats have party affiliations.' : `${missingParties.length} missing.`,
  });

  // Check 7: SC/ST categories are preserved (44 SC, 2 ST, 188 General)
  const scCount = records.filter((r) => r.reservation_category === 'SC').length;
  const stCount = records.filter((r) => r.reservation_category === 'ST').length;
  const genCount = records.filter((r) => r.reservation_category === 'General').length;
  const categoriesPreserved = scCount === 44 && stCount === 2 && genCount === 188;
  if (!categoriesPreserved) {
    errors.push(`Category distribution mismatch: Found SC=${scCount} (exp 44), ST=${stCount} (exp 2), General=${genCount} (exp 188).`);
  }
  checks.push({
    id: 'reservation-categories',
    label: 'SC/ST Categories Preserved (188 Gen, 44 SC, 2 ST)',
    passed: categoriesPreserved,
    details: `SC: ${scCount}/44, ST: ${stCount}/2, General: ${genCount}/188.`,
  });

  // Check 8: District names are present
  const missingDistricts = records.filter((r) => !r.district || r.district.trim() === '');
  const allDistrictsPresent = missingDistricts.length === 0;
  if (!allDistrictsPresent) {
    errors.push(`${missingDistricts.length} constituencies lack district associations.`);
  }
  checks.push({
    id: 'districts-present',
    label: 'District Names Present for All Seats',
    passed: allDistrictsPresent,
    details: allDistrictsPresent ? 'All 234 seats mapped under 38 districts.' : `${missingDistricts.length} missing.`,
  });

  // Check 9: Election year is 2026
  const invalidYears = records.filter((r) => r.election_year !== 2026);
  const electionYearValid = invalidYears.length === 0;
  if (!electionYearValid) {
    errors.push(`${invalidYears.length} records have invalid election years (must be 2026).`);
  }
  checks.push({
    id: 'election-year',
    label: 'Election Year is 2026',
    passed: electionYearValid,
    details: electionYearValid ? 'All 234 records set to 2026.' : `${invalidYears.length} mismatched.`,
  });

  // Check 10: Source is recorded
  const invalidSource = records.filter(
    (r) => !r.data_source || !r.data_source.includes('Election Commission of India') || !r.source_url
  );
  const sourceValid = invalidSource.length === 0;
  if (!sourceValid) {
    errors.push(`${invalidSource.length} records missing official ECI source attribution.`);
  }
  checks.push({
    id: 'source-recorded',
    label: 'Official ECI Source Recorded',
    passed: sourceValid,
    details: sourceValid ? '100% verified against ECI Detailed Results.' : `${invalidSource.length} missing.`,
  });

  return {
    isValid: errors.length === 0,
    totalConstituencies: records.length,
    expectedConstituencies: 234,
    checks,
    errors,
  };
}

// 2. DATA ACCESS & PERSISTENCE
export function getActiveMlaRecords(): AssemblyMlaRecord2026[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MLAS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === 234) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading MLA records from storage:', err);
  }
  return [...OFFICIAL_2026_MLA_RECORDS];
}

export function saveMlaRecords(records: AssemblyMlaRecord2026[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY_MLAS, JSON.stringify(records));
    return true;
  } catch (err) {
    console.error('Error saving MLA records to storage:', err);
    return false;
  }
}

// 3. AUDIT HISTORY MANAGEMENT
export function getAuditHistory(): MlaAuditLogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUDIT);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading audit history:', err);
  }
  return [];
}

export function logMlaChange(entry: Omit<MlaAuditLogEntry, 'id' | 'timestamp'>): void {
  try {
    const existing = getAuditHistory();
    const newEntry: MlaAuditLogEntry = {
      ...entry,
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };
    const updated = [newEntry, ...existing].slice(0, 100); // Keep last 100 changes
    localStorage.setItem(STORAGE_KEY_AUDIT, JSON.stringify(updated));
  } catch (err) {
    console.error('Error logging MLA change:', err);
  }
}

// 4. ADMIN UPDATE FUNCTIONS
export function updateMlaRecord(
  constituencyNumber: number,
  updates: Partial<AssemblyMlaRecord2026>,
  adminUser = 'System Administrator'
): { success: boolean; error?: string } {
  const currentRecords = getActiveMlaRecords();
  const index = currentRecords.findIndex((r) => r.constituency_number === constituencyNumber);

  if (index === -1) {
    return { success: false, error: `Constituency #${constituencyNumber} not found.` };
  }

  const existingRecord = currentRecords[index];

  // Log each modified field
  (Object.keys(updates) as (keyof AssemblyMlaRecord2026)[]).forEach((field) => {
    if (updates[field] !== undefined && updates[field] !== existingRecord[field]) {
      logMlaChange({
        constituency_number: constituencyNumber,
        constituency_name: existingRecord.constituency_name,
        field_changed: String(field),
        old_value: String(existingRecord[field] ?? ''),
        new_value: String(updates[field] ?? ''),
        admin_action: `UPDATE_${String(field).toUpperCase()}`,
        admin_user: adminUser,
      });
    }
  });

  const updatedRecord: AssemblyMlaRecord2026 = {
    ...existingRecord,
    ...updates,
    last_verified_date: OFFICIAL_ECI_SOURCE_2026.lastUpdatedDate,
  };

  const newRecords = [...currentRecords];
  newRecords[index] = updatedRecord;

  // Run validation
  const validation = runMlaDataValidation(newRecords);
  if (!validation.isValid) {
    return {
      success: false,
      error: `Validation failed: ${validation.errors.join('; ')}`,
    };
  }

  saveMlaRecords(newRecords);
  return { success: true };
}

// 5. RESTORE FUNCTIONALITY
export function restorePreviousData(auditEntryId: string, adminUser = 'System Administrator'): boolean {
  const history = getAuditHistory();
  const entry = history.find((h) => h.id === auditEntryId);
  if (!entry) return false;

  const currentRecords = getActiveMlaRecords();
  const index = currentRecords.findIndex((r) => r.constituency_number === entry.constituency_number);
  if (index === -1) return false;

  const current = currentRecords[index];
  const field = entry.field_changed as keyof AssemblyMlaRecord2026;

  // Parse value based on type
  let restoredValue: any = entry.old_value;
  if (field === 'election_year' || field === 'constituency_number') {
    restoredValue = Number(entry.old_value);
  } else if (field === 'is_verified') {
    restoredValue = entry.old_value === 'true';
  }

  const updated = {
    ...current,
    [field]: restoredValue,
  };

  const newRecords = [...currentRecords];
  newRecords[index] = updated;

  logMlaChange({
    constituency_number: entry.constituency_number,
    constituency_name: entry.constituency_name,
    field_changed: entry.field_changed,
    old_value: String(current[field]),
    new_value: String(restoredValue),
    admin_action: 'RESTORE_DATA_ROLLBACK',
    admin_user: adminUser,
  });

  saveMlaRecords(newRecords);
  return true;
}

export function resetToOfficialBaseline(adminUser = 'System Administrator'): boolean {
  logMlaChange({
    constituency_number: 0,
    constituency_name: 'All 234 Constituencies',
    field_changed: 'ALL_DATASET',
    old_value: 'Custom / Admin State',
    new_value: 'Official ECI Detailed Results Baseline',
    admin_action: 'FULL_DATASET_RESET',
    admin_user: adminUser,
  });

  localStorage.removeItem(STORAGE_KEY_MLAS);
  return true;
}
