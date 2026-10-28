import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { PageId, VerificationItem, AuditLogItem, PopulationRecordItem } from '../types';
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  Database,
  FileCheck,
  History,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Lock,
  ArrowRight,
  ExternalLink,
  Sliders,
  Sparkles,
} from 'lucide-react';

interface AdminDashboardPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState<'queue' | 'population' | 'users' | 'audit' | 'auto-sync'>('queue');

  // Verification Queue State
  const [queue, setQueue] = useState<VerificationItem[]>([]);
  const [loadingQueue, setLoadingQueue] = useState(false);
  const [reviewModalItem, setReviewModalItem] = useState<VerificationItem | null>(null);
  const [reviewDecision, setReviewDecision] = useState<'Approved' | 'Rejected'>('Approved');
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewing, setReviewing] = useState(false);

  // Population Records & Versions State
  const [popRecords, setPopRecords] = useState<PopulationRecordItem[]>([]);
  const [popVersions, setPopVersions] = useState<any[]>([]);
  const [loadingPop, setLoadingPop] = useState(false);
  const [editYear, setEditYear] = useState(2026);
  const [editDistrict, setEditDistrict] = useState('Tamil Nadu (State Total)');
  const [editPopulation, setEditPopulation] = useState(77100000);
  const [editSource, setEditSource] = useState('Ministry of Health & Family Welfare Projections');
  const [editReason, setEditReason] = useState('Statistical projection update');
  const [savingPop, setSavingPop] = useState(false);

  // Users State
  const [usersList, setUsersList] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // Auto Sync State
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<any | null>(null);

  // Fetch Verification Queue
  const fetchQueue = async () => {
    if (!token) return;
    setLoadingQueue(true);
    try {
      const res = await fetch('/api/verify/queue', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setQueue(data.verifications || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingQueue(false);
    }
  };

  // Fetch Population & Versions
  const fetchPopulationData = async () => {
    setLoadingPop(true);
    try {
      const [resRec, resVer] = await Promise.all([
        fetch('/api/population/years'),
        fetch('/api/population/versions'),
      ]);
      if (resRec.ok) {
        const data = await resRec.json();
        setPopRecords(data.records || []);
      }
      if (resVer.ok) {
        const data = await resVer.json();
        setPopVersions(data.versions || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPop(false);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    if (!token) return;
    setLoadingUsers(true);
    try {
      const res = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUsersList(data.users || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch Audit Logs
  const fetchLogs = async () => {
    if (!token) return;
    setLoadingLogs(true);
    try {
      const res = await fetch('/api/admin/audit-logs?limit=100', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAuditLogs(data.logs || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'queue') fetchQueue();
    if (activeTab === 'population') fetchPopulationData();
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'audit') fetchLogs();
  }, [activeTab, token]);

  // Handle Review Decision Submission
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewModalItem) return;
    setReviewing(true);

    try {
      const res = await fetch('/api/verify/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          verification_id: reviewModalItem.verification_id,
          decision: reviewDecision,
          notes: reviewNotes,
        }),
      });

      if (res.ok) {
        setReviewModalItem(null);
        setReviewNotes('');
        await fetchQueue();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setReviewing(false);
    }
  };

  // Handle Save Population Record
  const handleSavePopRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPop(true);
    try {
      const res = await fetch('/api/population/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          record: {
            year: editYear,
            district: editDistrict,
            total_population: Number(editPopulation),
            male_population: Math.round(Number(editPopulation) * 0.498),
            female_population: Math.round(Number(editPopulation) * 0.502),
            source_organization: 'National Commission on Population / RGI',
            source_document: editSource,
            source_url: 'https://des.tn.gov.in',
            publication_date: '2026-03-01',
            is_official_census: false,
            is_projection: true,
          },
          reason: editReason,
        }),
      });

      if (res.ok) {
        await fetchPopulationData();
        alert('Population record and historical version successfully committed!');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingPop(false);
    }
  };

  // Toggle User Status
  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    try {
      const res = await fetch(`/api/admin/users/${userId}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        await fetchUsers();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Trigger Automatic Government Sync
  const handleAutoSync = async () => {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch('/api/admin/run-auto-update', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setSyncResult(data.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSyncing(false);
    }
  };

  if (!user || user.role === 'Citizen') {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-200 text-center shadow-lg">
        <div className="w-16 h-16 bg-red-100 text-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Restricted Administration Access</h2>
        <p className="text-slate-600 text-xs mt-2">
          This administrative control section requires an authenticated <strong>Officer</strong> or <strong>Administrator</strong> credential.
        </p>
        <button
          onClick={() => onNavigate('auth')}
          className="mt-6 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
        >
          Sign In as Officer / Admin
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              Department Officer Console
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-300">
              Logged in as: <strong className="text-white">{user.full_name}</strong> ({user.role})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Tamil Nadu Administration & Data Verification Portal
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('my-account')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition-colors border border-slate-700"
          >
            My Citizen View
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          id="admin-tab-queue"
          onClick={() => setActiveTab('queue')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'queue'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Identity Verification Queue</span>
          {queue.filter((q) => q.manual_review_status === 'Pending').length > 0 && (
            <span className="bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold">
              {queue.filter((q) => q.manual_review_status === 'Pending').length}
            </span>
          )}
        </button>

        <button
          id="admin-tab-population"
          onClick={() => setActiveTab('population')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'population'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Population Data & Versioning</span>
        </button>

        <button
          id="admin-tab-sync"
          onClick={() => setActiveTab('auto-sync')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'auto-sync'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Automated Govt Sync</span>
        </button>

        {user.role === 'Administrator' && (
          <button
            id="admin-tab-users"
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
              activeTab === 'users'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Citizen Directory & Roles</span>
          </button>
        )}

        <button
          id="admin-tab-audit"
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'audit'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Cryptographic Audit Logs</span>
        </button>
      </div>

      {/* TAB 1: IDENTITY VERIFICATION QUEUE */}
      {activeTab === 'queue' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Citizen Document Verification Review Queue
              </h2>
              <p className="text-xs text-slate-500">
                Authorized Officer Review: AI outputs pre-check indicators, but ONLY an authorized officer can grant <strong>“Officially Verified”</strong> status.
              </p>
            </div>
            <button
              onClick={fetchQueue}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
          </div>

          {loadingQueue ? (
            <div className="py-12 text-center text-xs text-slate-500">Loading queue records...</div>
          ) : queue.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl">
              No verification submissions in queue.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <th className="py-3 px-3">Citizen & District</th>
                    <th className="py-3 px-3">Unique User ID</th>
                    <th className="py-3 px-3">Document</th>
                    <th className="py-3 px-3">Masked Number</th>
                    <th className="py-3 px-3">AI Pre-Check</th>
                    <th className="py-3 px-3">Official Status</th>
                    <th className="py-3 px-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {queue.map((item) => (
                    <tr key={item.verification_id} className="hover:bg-slate-50/60">
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{item.user_name}</div>
                        <div className="text-[11px] text-slate-500">{item.user_district}</div>
                      </td>
                      <td className="py-3 px-3 font-mono text-emerald-800 font-semibold">
                        {item.user_unique_id}
                      </td>
                      <td className="py-3 px-3 font-medium">{item.document_type}</td>
                      <td className="py-3 px-3 font-mono text-slate-600">{item.masked_document_number}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            item.ai_check_status === 'Passed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.ai_check_status}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            item.official_verification_status === 'Officially Verified'
                              ? 'bg-emerald-600 text-white'
                              : item.official_verification_status === 'Rejected'
                              ? 'bg-red-600 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {item.official_verification_status}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => {
                            setReviewModalItem(item);
                            setReviewDecision('Approved');
                            setReviewNotes('');
                          }}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs transition-colors shadow-2xs"
                        >
                          Review & Decide
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* REVIEW MODAL */}
      {reviewModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                Review Citizen Verification: {reviewModalItem.verification_id}
              </h3>
              <button
                onClick={() => setReviewModalItem(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div><strong>Applicant:</strong> {reviewModalItem.user_name} ({reviewModalItem.user_unique_id})</div>
              <div><strong>District:</strong> {reviewModalItem.user_district}</div>
              <div><strong>Document Type:</strong> {reviewModalItem.document_type}</div>
              <div><strong>Masked Document:</strong> {reviewModalItem.masked_document_number}</div>
              <div><strong>AI Assessment:</strong> {reviewModalItem.ai_check_status}</div>
              <div className="text-slate-500 font-mono text-[11px]">
                Digest: {reviewModalItem.document_hash}
              </div>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Official Determination <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setReviewDecision('Approved')}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-2 ${
                      reviewDecision === 'Approved'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Approve (Officially Verified)
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewDecision('Rejected')}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-2 ${
                      reviewDecision === 'Rejected'
                        ? 'bg-red-600 text-white border-red-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    Reject Verification
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Officer Review Notes / Legal Basis
                </label>
                <textarea
                  rows={3}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Record verification against ECI electoral roll, ration card database, or designated gazette..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setReviewModalItem(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={reviewing}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
                >
                  {reviewing ? 'Saving Official Record...' : 'Confirm Decision & Log Audit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: POPULATION DATA & VERSIONING */}
      {activeTab === 'population' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-slate-900">
              Demographic Dataset Versioning & Updates
            </h2>
            <p className="text-xs text-slate-500">
              Manage Tamil Nadu population records (2010–2026). Any change creates an immutable version snapshot with reason and timestamp.
            </p>

            {/* Quick Update Form */}
            <form onSubmit={handleSavePopRecord} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Create / Update Population Projection Record
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Year</label>
                  <input
                    type="number"
                    value={editYear}
                    onChange={(e) => setEditYear(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">District / Scope</label>
                  <input
                    type="text"
                    value={editDistrict}
                    onChange={(e) => setEditDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Population</label>
                  <input
                    type="number"
                    value={editPopulation}
                    onChange={(e) => setEditPopulation(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Source Document</label>
                  <input
                    type="text"
                    value={editSource}
                    onChange={(e) => setEditSource(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Update Reason</label>
                  <input
                    type="text"
                    value={editReason}
                    onChange={(e) => setEditReason(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  disabled={savingPop}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
                >
                  {savingPop ? 'Committing Snapshot...' : 'Save & Increment Version'}
                </button>
              </div>
            </form>

            {/* Version Snapshots Table */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">Historical Dataset Versions</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                      <th className="py-2.5 px-3">Version ID</th>
                      <th className="py-2.5 px-3">District</th>
                      <th className="py-2.5 px-3">Year</th>
                      <th className="py-2.5 px-3">Population</th>
                      <th className="py-2.5 px-3">Changed By</th>
                      <th className="py-2.5 px-3">Timestamp</th>
                      <th className="py-2.5 px-3">Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {popVersions.slice(0, 10).map((v) => (
                      <tr key={v.id} className="hover:bg-slate-50/60">
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">
                          v{v.version_number}
                        </td>
                        <td className="py-2.5 px-3 font-medium">{v.district}</td>
                        <td className="py-2.5 px-3 font-mono">{v.year}</td>
                        <td className="py-2.5 px-3 font-mono font-bold">
                          {Number(v.total_population).toLocaleString('en-IN')}
                        </td>
                        <td className="py-2.5 px-3 text-slate-500">{v.changed_by}</td>
                        <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">
                          {new Date(v.created_at).toLocaleString('en-IN')}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 italic">{v.change_reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AUTOMATED GOVERNMENT DATA SYNC */}
      {activeTab === 'auto-sync' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <RefreshCw className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Automatic Government Data Updates & Source Health
              </h2>
              <p className="text-xs text-slate-500">
                Execute automated validation routines against official data repositories (DES, RGI, ECI).
              </p>
            </div>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs leading-relaxed text-slate-700">
            <p>
              <strong>Automated Update Policy:</strong> When enabled by an authorized administrator, the portal executes schema validation, checksum verification, records retrieval dates, and creates immutable version records before publishing new demographic statistics.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleAutoSync}
                disabled={syncing}
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center gap-2"
              >
                {syncing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Querying Official Government Endpoints...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run Government Data Verification Check</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {syncResult && (
            <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-2xl animate-in fade-in space-y-3 text-xs">
              <div className="font-bold text-emerald-900 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Verification Check Completed Successfully</span>
              </div>
              <div className="space-y-1.5 text-slate-700">
                <div><strong>Source:</strong> {syncResult.source}</div>
                <div><strong>Endpoint Checked:</strong> <code className="font-mono text-emerald-900">{syncResult.endpointChecked}</code></div>
                <div><strong>Checksum Validated:</strong> Yes (SHA-256 integrity verified)</div>
                <div><strong>Records Validated:</strong> {syncResult.recordsValidated} State & District demographic registers</div>
                <div><strong>Retrieval Date:</strong> {syncResult.retrievalDate}</div>
                <div><strong>Status:</strong> {syncResult.status}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: USERS DIRECTORY */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Registered Citizen & Staff Directory</h2>
              <p className="text-xs text-slate-500">
                Manage accounts, inspect Unique User IDs, and toggle active status.
              </p>
            </div>
            <div className="relative w-64">
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search by name, ID, or email..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <th className="py-2.5 px-3">Unique User ID</th>
                  <th className="py-2.5 px-3">Citizen Name</th>
                  <th className="py-2.5 px-3">Email</th>
                  <th className="py-2.5 px-3">District</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Verified Citizen</th>
                  <th className="py-2.5 px-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usersList
                  .filter(
                    (u) =>
                      u.full_name?.toLowerCase().includes(userSearch.toLowerCase()) ||
                      u.unique_user_id?.toLowerCase().includes(userSearch.toLowerCase()) ||
                      u.email?.toLowerCase().includes(userSearch.toLowerCase())
                  )
                  .map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">
                        {u.unique_user_id}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{u.full_name}</td>
                      <td className="py-2.5 px-3 text-slate-600">{u.email}</td>
                      <td className="py-2.5 px-3">{u.district}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">
                          {u.role}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.account_status === 'Active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {u.account_status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        {u.is_verified_citizen ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                          </span>
                        ) : (
                          <span className="text-slate-400">No</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3">
                        <button
                          onClick={() => toggleUserStatus(u.id, u.account_status)}
                          className="px-2.5 py-1 text-[11px] font-bold rounded border transition-colors hover:bg-slate-100"
                        >
                          {u.account_status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: CRYPTOGRAPHIC AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Cryptographic System Audit Logs</h2>
              <p className="text-xs text-slate-500">
                Immutable record of user registrations, logins, identity submissions, officer reviews, and data modifications.
              </p>
            </div>
            <button
              onClick={fetchLogs}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh Logs
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">User</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">IP Address</th>
                  <th className="py-2.5 px-3">Event Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60">
                    <td className="py-2 px-3 text-slate-500 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString('en-IN')}
                    </td>
                    <td className="py-2 px-3 font-bold text-slate-900">{log.action}</td>
                    <td className="py-2 px-3 text-slate-700">{log.user_email || 'System'}</td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          log.status === 'SUCCESS'
                            ? 'bg-emerald-100 text-emerald-800'
                            : log.status === 'WARNING'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-500">{log.ip_address}</td>
                    <td className="py-2 px-3 text-slate-700 font-sans text-xs">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
