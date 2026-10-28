import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { PageId, VerificationItem } from '../types';
import {
  ShieldCheck,
  ShieldAlert,
  Clock,
  CheckCircle,
  AlertTriangle,
  Upload,
  FileText,
  Lock,
  Eye,
  KeyRound,
  LogOut,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Sparkles,
  Info,
  ChevronRight,
  ExternalLink,
  Shield,
  HelpCircle,
} from 'lucide-react';

interface MyAccountPageProps {
  onNavigate: (page: PageId) => void;
}

export const MyAccountPage: React.FC<MyAccountPageProps> = ({ onNavigate }) => {
  const { user, logout, token, refreshUser } = useAuth();
  const [verifications, setVerifications] = useState<VerificationItem[]>([]);
  const [loadingVerifications, setLoadingVerifications] = useState(false);

  // Verification Upload Form state
  const [docType, setDocType] = useState<'Aadhaar' | 'Voter ID' | 'Passport' | 'Driving Licence' | 'PAN' | 'Other'>('Aadhaar');
  const [docNumberInput, setDocNumberInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [privacyConsentGiven, setPrivacyConsentGiven] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [submittingDoc, setSubmittingDoc] = useState(false);
  const [docError, setDocError] = useState<string | null>(null);
  const [docSuccess, setDocSuccess] = useState<VerificationItem | null>(null);

  // Change Password state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState<{ text: string; isError: boolean } | null>(null);

  // Fetch verifications
  const loadVerifications = async () => {
    if (!token) return;
    setLoadingVerifications(true);
    try {
      const res = await fetch('/api/verify/my-verifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setVerifications(data.verifications || []);
      }
    } catch (e) {
      console.error('Failed to load verifications', e);
    } finally {
      setLoadingVerifications(false);
    }
  };

  useEffect(() => {
    loadVerifications();
  }, [token]);

  // Handle File Input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Sample file load for quick testing
  const loadSampleDocument = () => {
    setDocNumberInput('984321098765');
    // Simple 1x1 transparent png / mock placeholder for instant testing
    setFileBase64('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=');
    setSelectedFile(new File(['sample'], 'government_id_scan.png', { type: 'image/png' }));
  };

  // Submit Document
  const handleDocSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDocError(null);
    setDocSuccess(null);

    if (!privacyConsentGiven) {
      setDocError('You must review and accept the Statutory Privacy & Consent declaration.');
      return;
    }

    setSubmittingDoc(true);
    try {
      const res = await fetch('/api/verify/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          document_type: docType,
          document_number_input: docNumberInput,
          image_base64: fileBase64,
          mime_type: selectedFile?.type || 'image/png',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setDocError(data.error || 'Failed to analyze document.');
      } else {
        setDocSuccess(data.verification);
        setSelectedFile(null);
        setFileBase64(null);
        setDocNumberInput('');
        await loadVerifications();
        await refreshUser();
      }
    } catch (err: any) {
      setDocError('Network error while transmitting document to verification service.');
    } finally {
      setSubmittingDoc(false);
    }
  };

  // Handle Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMsg(null);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: currentPwd,
          new_password: newPwd,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPwdMsg({ text: data.error || 'Failed to update password', isError: true });
      } else {
        setPwdMsg({ text: 'Password successfully updated!', isError: false });
        setCurrentPwd('');
        setNewPwd('');
        setTimeout(() => setShowPasswordModal(false), 1500);
      }
    } catch (err) {
      setPwdMsg({ text: 'Network error updating password', isError: true });
    }
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-2xl border border-slate-200 shadow text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Sign In Required</h2>
        <p className="text-slate-600 text-sm mt-2">
          You must be logged in to view your citizen account profile and identity verifications.
        </p>
        <button
          onClick={() => onNavigate('auth')}
          className="mt-6 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-sm transition-colors shadow-sm"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const latestVerification = verifications[0];

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      {/* 1. CITIZEN WELCOME & IDENTITY BANNER */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700/60 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                State Citizen Profile
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-mono font-semibold border border-slate-700">
                Role: {user.role}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  user.account_status === 'Active'
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50'
                    : 'bg-amber-950/80 text-amber-300 border-amber-600/50'
                }`}
              >
                ● {user.account_status}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Welcome, {user.full_name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800 font-mono">
                <span className="text-slate-400">Unique ID:</span>
                <span className="font-bold text-amber-300">{user.unique_user_id}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{user.district}, Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+91 {user.mobile}</span>
              </div>
            </div>
          </div>

          {/* Action buttons on header */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {user.role !== 'Citizen' && (
              <button
                onClick={() => onNavigate('admin-dashboard')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                Official Admin Portal
              </button>
            )}
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition-colors border border-slate-600 flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" />
              Password
            </button>
            <button
              onClick={logout}
              className="px-3.5 py-2 bg-red-950/60 hover:bg-red-900/80 text-red-200 font-semibold rounded-xl text-xs transition-colors border border-red-800 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        {/* Verification Status Banner Card */}
        <div className="mt-6 pt-5 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                user.is_verified_citizen
                  ? 'bg-emerald-500 text-slate-950'
                  : latestVerification
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {user.is_verified_citizen ? (
                <ShieldCheck className="w-5 h-5" />
              ) : latestVerification ? (
                <Clock className="w-5 h-5" />
              ) : (
                <ShieldAlert className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Identity Verification Status</div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                {user.is_verified_citizen ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    Officially Verified Citizen
                  </span>
                ) : latestVerification ? (
                  <span className="text-amber-300">
                    AI Check: {latestVerification.ai_check_status} (Pending Official Review)
                  </span>
                ) : (
                  <span className="text-slate-300">Not Submitted</span>
                )}
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 max-w-sm">
            {user.is_verified_citizen ? (
              <span className="text-emerald-300">
                Verified against state electoral and civil registry records by an authorized officer.
              </span>
            ) : (
              <span>
                Submit a recognized statutory ID document below for AI quality analysis and officer verification.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. IDENTITY DOCUMENT VERIFICATION USING AI */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900">Identity Document Verification Using AI</h2>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Submit an identity document when identity verification is legally required for electoral and civic services.
            </p>
          </div>

          {/* View Privacy Notice Button */}
          <button
            type="button"
            onClick={() => setShowPrivacyModal(true)}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 underline flex items-center gap-1 self-start sm:self-auto"
          >
            <Info className="w-4 h-4" />
            Statutory Privacy & Retention Charter
          </button>
        </div>

        {/* Highlighted Mandate Box */}
        <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs leading-relaxed space-y-1">
          <p className="font-bold flex items-center gap-1.5 text-amber-900">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
            Mandatory Verification Transparency Directive:
          </p>
          <p>
            AI performs optical character recognition, layout checks, and internal consistency checks. <strong>AI checks CANNOT claim an ID is officially genuine.</strong> Only authorized government verification services or designated officers can designate an identity as <strong>“Officially Verified”</strong>.
          </p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleDocSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Document Type Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                1. Select Document Type <span className="text-red-500">*</span>
              </label>
              <select
                id="doc-type-select"
                value={docType}
                onChange={(e) => setDocType(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                <option value="Aadhaar">Aadhaar Card (UIDAI)</option>
                <option value="Voter ID">Voter ID (EPIC - Election Commission)</option>
                <option value="Passport">Indian Passport (MEA)</option>
                <option value="Driving Licence">Driving Licence (TN Transport Dept)</option>
                <option value="PAN">Permanent Account Number (PAN)</option>
                <option value="Other">Other Officially Valid Document (OVD)</option>
              </select>
            </div>

            {/* Document Number Input (will be masked automatically) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                2. Document Number <span className="text-slate-400 font-normal">(Last 4 digits kept)</span>
              </label>
              <input
                id="doc-number-input"
                type="text"
                value={docNumberInput}
                onChange={(e) => setDocNumberInput(e.target.value)}
                placeholder="e.g. 12-digit Aadhaar / EPIC No."
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Number is immediately masked (e.g., <code className="font-mono text-emerald-800">XXXX-XXXX-1234</code>) on receipt.
              </p>
            </div>

            {/* Upload File */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                3. Upload Document Scan / Photo <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2.5 bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 rounded-xl text-xs font-semibold text-slate-700 transition-colors">
                  <Upload className="w-4 h-4 text-emerald-700" />
                  <span className="truncate">
                    {selectedFile ? selectedFile.name : 'Choose Scan or PDF'}
                  </span>
                  <input
                    id="doc-file-input"
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={loadSampleDocument}
                  title="Use a simulated government sample document to test immediately"
                  className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors whitespace-nowrap"
                >
                  Quick Demo Scan
                </button>
              </div>
            </div>
          </div>

          {/* Privacy & Consent Checkbox */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                id="doc-privacy-consent"
                type="checkbox"
                checked={privacyConsentGiven}
                onChange={(e) => setPrivacyConsentGiven(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>
                <strong>Mandatory Statutory Consent:</strong> I voluntarily submit this document for optical verification of eligibility for Tamil Nadu civic services. I confirm that this document belongs to me, that no biometric data is included, and I consent to a 90-day maximum statutory retention window after which document hashes are archived according to state data retention laws.
              </span>
            </label>
          </div>

          {docError && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{docError}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="text-[11px] text-slate-500">
              * Protected by SHA-256 integrity digest and AES-256 in-flight encryption.
            </div>
            <button
              id="doc-submit-btn"
              type="submit"
              disabled={submittingDoc}
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-all shadow-sm flex items-center gap-2"
            >
              {submittingDoc ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing OCR & AI Conformity Checks...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run AI Check & Submit for Review</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* RESULT CARD (if recently submitted) */}
        {docSuccess && (
          <div className="mt-8 p-6 bg-emerald-50/50 border-2 border-emerald-300 rounded-2xl animate-in fade-in space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-200 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-slate-900 text-base">
                  AI Analysis Completed & Queued for Official Review
                </h3>
              </div>
              <span className="font-mono text-xs text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                Verification ID: {docSuccess.verification_id}
              </span>
            </div>

            {/* AI Status & Required Disclaimer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-2xs space-y-2">
                <div className="text-xs text-slate-500 font-semibold">AI Conformity Check Result:</div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      docSuccess.ai_check_status === 'Passed'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    AI Check: {docSuccess.ai_check_status}
                  </span>
                  <span className="text-xs text-slate-500">
                    Masked No: <strong className="font-mono text-slate-800">{docSuccess.masked_document_number}</strong>
                  </span>
                </div>

                <div className="text-xs text-slate-600 pt-2 border-t border-slate-100 space-y-1">
                  <div><strong>Quality:</strong> {docSuccess.ai_analysis_report?.image_quality}</div>
                  <div><strong>Structure:</strong> {docSuccess.ai_analysis_report?.structural_integrity}</div>
                </div>
              </div>

              {/* Mandated Statutory Disclaimer */}
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-300 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-1.5">
                    <Info className="w-4 h-4 text-amber-700" />
                    Statutory AI Analysis Notice
                  </div>
                  <p className="text-xs text-amber-950 font-semibold italic">
                    “{docSuccess.ai_analysis_report?.official_disclaimer}”
                  </p>
                  <p className="text-[11px] text-amber-800 mt-2">
                    Current Official Status: <strong>{docSuccess.official_verification_status}</strong> (Pending manual review by an authorized Officer).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. VERIFICATION HISTORY TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-1">Citizen Verification Records</h3>
        <p className="text-xs text-slate-500 mb-5">
          History of documents processed, masked identifiers, AI verification flags, and official reviewer determinations.
        </p>

        {loadingVerifications ? (
          <div className="py-8 text-center text-xs text-slate-500">Loading verification records...</div>
        ) : verifications.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-slate-100">
            No verification documents submitted yet. Submit a document above to begin identity verification.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <th className="py-3 px-3">Verification ID</th>
                  <th className="py-3 px-3">Document Type</th>
                  <th className="py-3 px-3">Masked Number</th>
                  <th className="py-3 px-3">AI Check</th>
                  <th className="py-3 px-3">Official Status</th>
                  <th className="py-3 px-3">Submission Date</th>
                  <th className="py-3 px-3">Retention Expiry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {verifications.map((v) => (
                  <tr key={v.verification_id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-emerald-800">
                      {v.verification_id}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-900">{v.document_type}</td>
                    <td className="py-3 px-3 font-mono text-slate-700">{v.masked_document_number}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          v.ai_check_status === 'Passed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {v.ai_check_status}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          v.official_verification_status === 'Officially Verified'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {v.official_verification_status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      {new Date(v.submitted_at).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                      {new Date(v.retention_expiry).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. PRIVACY & STATUTORY CONSENT MODAL */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
                <Shield className="w-5 h-5" />
                Statutory Privacy & Citizen Data Protection Charter
              </div>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
              <section>
                <h4 className="font-bold text-slate-900">1. Why Identity Verification is Requested</h4>
                <p>
                  To prevent unauthorized voting proxies, verify residency within Tamil Nadu constituencies, and provide authenticated citizen access to statutory state e-governance registers.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-slate-900">2. What Information is Extracted & Stored</h4>
                <p>
                  The system extracts applicant name, date of birth, district, and masks the ID number (retaining only the final 4 characters). <strong>No biometric data (fingerprints or iris scans) is EVER collected, parsed, or stored.</strong>
                </p>
              </section>

              <section>
                <h4 className="font-bold text-slate-900">3. Access Controls & Reviewers</h4>
                <p>
                  Document files are accessible exclusively by designated District Revenue Officers (DRO) and Electoral Registration Officers (ERO) with two-factor authorization and cryptographic audit logs.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-slate-900">4. Retention Policy</h4>
                <p>
                  Identity document scans are securely stored for a maximum statutory retention period of <strong>90 days</strong>, after which the document images are permanently purged, leaving only irreversible SHA-256 hashes and verification confirmation logs.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-slate-900">5. AI vs. Official Verification</h4>
                <p>
                  AI analysis provides quality, resolution, and format pre-checks. AI is strictly prohibited from claiming a document is officially valid. Only authenticated government databases or designated state officers can issue an <strong>“Officially Verified”</strong> designation.
                </p>
              </section>
            </div>

            <div className="pt-3 border-t border-slate-200 text-right">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. CHANGE PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-emerald-700" />
                Change Citizen Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {pwdMsg && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  pwdMsg.isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                {pwdMsg.isError ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                <span>{pwdMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">New Password (min. 8 chars)</label>
                <input
                  type="password"
                  required
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
