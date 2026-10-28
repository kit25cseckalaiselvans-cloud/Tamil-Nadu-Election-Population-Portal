import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PageId } from '../types';
import {
  ShieldCheck,
  User,
  Lock,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Home,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  KeyRound,
  FileCheck,
} from 'lucide-react';

interface AuthPageProps {
  onNavigate: (page: PageId) => void;
  initialMode?: 'login' | 'register';
}

const TN_DISTRICTS = [
  'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore',
  'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram',
  'Kanniyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai',
  'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai',
  'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi',
  'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli',
  'Tirupattur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur',
  'Vellore', 'Viluppuram', 'Virudhunagar'
];

export const AuthPage: React.FC<AuthPageProps> = ({ onNavigate, initialMode = 'login' }) => {
  const { login, register, user } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [district, setDistrict] = useState('Chennai');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!loginIdentifier || !loginPassword) {
      setError('Please provide your Email or Unique User ID and password.');
      return;
    }

    setIsLoading(true);
    const res = await login(loginIdentifier, loginPassword);
    setIsLoading(false);

    if (!res.success) {
      setError(res.error || 'Login failed. Please check your credentials.');
    } else {
      setSuccessMsg('Authentication successful. Redirecting...');
      setTimeout(() => {
        onNavigate('my-account');
      }, 700);
    }
  };

  // Handle Register
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!fullName || !email || !mobile || !dob || !district || !password) {
      setError('Please complete all mandatory registration fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    if (password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    if (!/^\d{10}$/.test(mobile.replace(/\D/g, ''))) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }

    if (!consentChecked) {
      setError('Please accept the Citizen Terms of Service and Privacy Policy to register.');
      return;
    }

    setIsLoading(true);
    const res = await register({
      full_name: fullName,
      email,
      mobile,
      date_of_birth: dob,
      district,
      address,
      password,
      role: 'Citizen',
    });
    setIsLoading(false);

    if (!res.success) {
      setError(res.error || 'Registration failed. Please try again.');
    } else {
      setSuccessMsg(`Registration successful! Your Unique User ID: ${res.user?.unique_user_id}. Redirecting to your dashboard...`);
      setTimeout(() => {
        onNavigate('my-account');
      }, 1000);
    }
  };

  // Demo Login Quick Fill
  const fillDemoAccount = (role: 'Citizen' | 'Officer' | 'Admin') => {
    setError(null);
    setMode('login');
    if (role === 'Citizen') {
      setLoginIdentifier('citizen@tn.gov.in');
      setLoginPassword('Citizen@2026');
    } else if (role === 'Officer') {
      setLoginIdentifier('officer@tn.gov.in');
      setLoginPassword('Officer@2026');
    } else {
      setLoginIdentifier('admin@tn.gov.in');
      setLoginPassword('Admin@2026');
    }
  };

  if (user) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-2xl border border-slate-200 shadow-md text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Already Authenticated</h2>
        <p className="text-slate-600 mt-2 text-sm">
          You are currently signed in as <strong className="text-slate-800">{user.full_name}</strong> (ID: {user.unique_user_id}).
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => onNavigate('my-account')}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-sm transition-colors shadow-sm"
          >
            Go to My Account Dashboard
          </button>
          {user.role !== 'Citizen' && (
            <button
              onClick={() => onNavigate('admin-dashboard')}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-sm transition-colors"
            >
              Go to Admin Dashboard
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-emerald-50/20 min-h-[calc(100vh-140px)]">
      <div className="max-w-2xl mx-auto">
        {/* Header Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold border border-emerald-300/60 mb-3">
            <ShieldCheck className="w-4 h-4" />
            Tamil Nadu Citizen Digital Identity
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {mode === 'login' ? 'Citizen & Official Portal Login' : 'New Citizen Registration'}
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-md mx-auto">
            Access state demographics, official voter services, and AI-assisted identity verification with your unique state citizen ID.
          </p>
        </div>

        {/* Quick Demo Credentials Bar */}
        <div className="mb-6 p-3.5 bg-amber-50 rounded-xl border border-amber-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-900 font-semibold">
            <KeyRound className="w-4 h-4 text-amber-700" />
            <span>Fast-Track Demo Credentials:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fillDemoAccount('Citizen')}
              className="px-2.5 py-1 bg-white hover:bg-amber-100 text-slate-800 font-medium rounded border border-amber-300 transition-colors shadow-2xs"
            >
              Citizen (Kalaiselvan)
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('Officer')}
              className="px-2.5 py-1 bg-white hover:bg-amber-100 text-slate-800 font-medium rounded border border-amber-300 transition-colors shadow-2xs"
            >
              Officer (Kavitha DRO)
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('Admin')}
              className="px-2.5 py-1 bg-white hover:bg-amber-100 text-slate-800 font-medium rounded border border-amber-300 transition-colors shadow-2xs"
            >
              Admin (Dr. Sundaram IAS)
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Tab Switcher */}
          <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1.5">
            <button
              id="tab-login"
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
                setSuccessMsg(null);
              }}
              className={`py-2.5 text-sm font-bold rounded-xl transition-all ${
                mode === 'login'
                  ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Existing User Login
            </button>
            <button
              id="tab-register"
              type="button"
              onClick={() => {
                setMode('register');
                setError(null);
                setSuccessMsg(null);
              }}
              className={`py-2.5 text-sm font-bold rounded-xl transition-all ${
                mode === 'register'
                  ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Register New Citizen Account
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {/* Feedback Alerts */}
            {error && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            {successMsg && (
              <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-start gap-2 animate-in fade-in">
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* LOGIN FORM */}
            {mode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address or Unique User ID <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="login-identifier"
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="e.g. citizen@tn.gov.in or TN-CIT-2026-000003"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Accepts your registered email or the assigned ID (e.g. TN-CIT-2026-000001).
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="login-password"
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    id="login-submit-btn"
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-lg text-sm transition-colors shadow flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <span>Authenticating Securely...</span>
                    ) : (
                      <>
                        <span>Sign In to Citizen Portal</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center pt-3 text-xs text-slate-500">
                  <span>Don't have an individual citizen account? </span>
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="font-bold text-emerald-700 hover:underline"
                  >
                    Register now
                  </button>
                </div>
              </form>
            ) : (
              /* REGISTRATION FORM */
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80 mb-4 text-xs text-emerald-900">
                  <p className="font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                    Automatic Unique ID Generation:
                  </p>
                  <p className="text-slate-600 mt-0.5">
                    Upon successful registration, the portal will automatically allocate a unique sequence ID (format: <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-300 font-mono text-[11px] font-bold">TN-CIT-2026-000001</code>) that cannot be duplicated.
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name (as in official government ID) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="reg-fullname"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. S. Kalaiselvan"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Email and Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="reg-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@domain.com"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        id="reg-mobile"
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="9876543210"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Date of Birth and District */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <input
                        id="reg-dob"
                        type="date"
                        required
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tamil Nadu District <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <select
                        id="reg-district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                      >
                        {TN_DISTRICTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Residential Address in Tamil Nadu
                  </label>
                  <div className="relative">
                    <div className="absolute top-2.5 left-3 pointer-events-none text-slate-400">
                      <Home className="w-4 h-4" />
                    </div>
                    <textarea
                      id="reg-address"
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Door No, Street Name, Taluk, Pincode"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-none"
                    />
                  </div>
                </div>

                {/* Password and Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Password (min. 8 chars) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        id="reg-password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        id="reg-confirmpassword"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms and Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                    <input
                      id="reg-consent"
                      type="checkbox"
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>
                      I declare that the information provided is true to the best of my knowledge. I agree to the{' '}
                      <strong className="text-slate-800">Tamil Nadu Citizen Privacy & Data Protection Charter</strong> and understand my identity data is hashed and encrypted according to statutory retention rules.
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    id="register-submit-btn"
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-lg text-sm transition-colors shadow flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <span>Creating Account & Assigning Unique ID...</span>
                    ) : (
                      <>
                        <FileCheck className="w-4 h-4" />
                        <span>Register & Generate Unique User ID</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center pt-2 text-xs text-slate-500">
                  <span>Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="font-bold text-emerald-700 hover:underline"
                  >
                    Sign in here
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Security & Password Hashing Badge */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            bcrypt Password Hashing
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-emerald-600" />
            JWT Role-Based Access Control
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            Audit Logging Enabled
          </span>
        </div>
      </div>
    </div>
  );
};
