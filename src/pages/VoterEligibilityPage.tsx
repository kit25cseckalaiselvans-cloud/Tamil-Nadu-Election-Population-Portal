import React, { useState } from 'react';
import { PageId } from '../types';
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Lock,
  Calendar,
  FileCheck2,
  ExternalLink,
} from 'lucide-react';

interface VoterEligibilityPageProps {
  onNavigate: (page: PageId) => void;
}

export const VoterEligibilityPage: React.FC<VoterEligibilityPageProps> = ({ onNavigate }) => {
  const [answers, setAnswers] = useState<{
    q1Citizen: boolean | null;
    q2Age: boolean | null;
    q3Reside: boolean | null;
  }>({
    q1Citizen: null,
    q2Age: null,
    q3Reside: null,
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSelect = (key: 'q1Citizen' | 'q2Age' | 'q3Reside', value: boolean) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setHasSubmitted(false);
  };

  const isComplete =
    answers.q1Citizen !== null && answers.q2Age !== null && answers.q3Reside !== null;

  const isEligible =
    answers.q1Citizen === true && answers.q2Age === true && answers.q3Reside === true;

  const handleReset = () => {
    setAnswers({ q1Citizen: null, q2Age: null, q3Reside: null });
    setHasSubmitted(false);
  };

  return (
    <div className="space-y-10 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold w-fit mb-3 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          Article 326 • Representation of the People Act, 1950
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
          Voter Eligibility Checker
        </h1>
        <p className="mt-2 text-slate-600 text-sm leading-relaxed">
          Answer the three constitutional criteria below to assess whether you satisfy the fundamental criteria to register as an elector on the Tamil Nadu electoral roll.
        </p>

        {/* Zero Data Privacy Guarantee */}
        <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 text-xs text-slate-600">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900">Privacy & Security First:</span> This portal does not ask for or store your Aadhaar number, OTP, password, bank account, or any sensitive personal data. All processing occurs locally in your browser.
          </div>
        </div>
      </div>

      {/* Interactive Eligibility Questionnaire */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            Eligibility Assessment Questionnaire
          </h2>
          <p className="text-xs text-slate-500">All 3 questions must be answered to evaluate eligibility.</p>
        </div>

        {/* Question 1 */}
        <div
          id="eligibility-q1-block"
          className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Question 1
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                Are you an Indian citizen?
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Under Article 326 of the Constitution, only citizens of India are eligible to be enrolled.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                id="q1-yes"
                onClick={() => handleSelect('q1Citizen', true)}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  answers.q1Citizen === true
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Yes
              </button>
              <button
                id="q1-no"
                onClick={() => handleSelect('q1Citizen', false)}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  answers.q1Citizen === false
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div
          id="eligibility-q2-block"
          className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Question 2
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                Are you 18 years or older?
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Or turning 18 on any of the four qualifying dates: 1st January, 1st April, 1st July, or 1st October.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                id="q2-yes"
                onClick={() => handleSelect('q2Age', true)}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  answers.q2Age === true
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Yes
              </button>
              <button
                id="q2-no"
                onClick={() => handleSelect('q2Age', false)}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  answers.q2Age === false
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>

        {/* Question 3 */}
        <div
          id="eligibility-q3-block"
          className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Question 3
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                Do you ordinarily reside in the relevant constituency?
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                You must be an ordinary resident in the assembly constituency where you seek enrollment.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                id="q3-yes"
                onClick={() => handleSelect('q3Reside', true)}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  answers.q3Reside === true
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Yes
              </button>
              <button
                id="q3-no"
                onClick={() => handleSelect('q3Reside', false)}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  answers.q3Reside === false
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>

        {/* Submit or Reset CTA */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            id="btn-check-eligibility-submit"
            disabled={!isComplete}
            onClick={() => setHasSubmitted(true)}
            className={`px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 ${
              isComplete
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Evaluate Eligibility Result
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Answers
          </button>
        </div>

        {/* RESULT SECTION AFTER SUBMISSION */}
        {hasSubmitted && (
          <div
            id="eligibility-evaluation-result"
            className={`rounded-2xl p-6 border-2 transition-all ${
              isEligible
                ? 'bg-emerald-50/80 border-emerald-300'
                : 'bg-rose-50/80 border-rose-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-xl shrink-0 ${
                  isEligible ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                }`}
              >
                {isEligible ? <CheckCircle2 className="w-7 h-7" /> : <XCircle className="w-7 h-7" />}
              </div>
              <div className="space-y-2">
                <h3
                  className={`text-xl font-extrabold ${
                    isEligible ? 'text-emerald-900' : 'text-rose-900'
                  }`}
                >
                  {isEligible
                    ? '“You may be eligible to register as a voter.”'
                    : '“You may not currently meet the basic eligibility requirements.”'}
                </h3>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {isEligible
                    ? 'Based on your answers, you appear to fulfill the three basic constitutional criteria: Indian citizenship, qualifying age (18+), and ordinary residence. You can proceed to submit Form 6 on the official ECI Voters portal.'
                    : 'Based on your answers, one or more fundamental legal criteria are unfulfilled. You must be an Indian citizen, at least 18 years of age (or turning 18 on the nearest quarterly qualifying date), and ordinarily resident in the constituency.'}
                </p>

                {/* MANDATORY LEGAL CLAUSE FROM PROMPT */}
                <div className="mt-3 p-3.5 rounded-xl bg-white/80 border border-slate-200 text-xs text-slate-600 italic">
                  <strong>Important Notice:</strong> “This tool provides general information only. Final eligibility and registration are determined through the official Election Commission process.”
                </div>

                {/* Next Steps for Eligible Users */}
                {isEligible && (
                  <div className="mt-4 pt-4 border-t border-emerald-200/80 flex flex-wrap gap-3">
                    <button
                      onClick={() => onNavigate('new-voter')}
                      className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                    >
                      View Step-by-Step Form 6 Guide
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href="https://voters.eci.gov.in"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-lg bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100/50 font-bold text-xs flex items-center gap-1.5"
                    >
                      Official ECI Voter Portal
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* EDUCATIONAL REFERENCE: ECI 4 QUALIFYING DATES REFORM */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900">
            Four Qualifying Dates for Young Voters (ECI Reform)
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Previously, 1st January was the sole qualifying date. Under amended Section 14(b) of the Representation of the People Act 1950, citizens can now apply in advance if they turn 18 on any of the four qualifying dates:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
            <div className="text-xs text-blue-600 font-semibold uppercase">Quarter 1</div>
            <div className="text-sm font-bold text-blue-900 mt-1">1st January</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="text-xs text-emerald-600 font-semibold uppercase">Quarter 2</div>
            <div className="text-sm font-bold text-emerald-900 mt-1">1st April</div>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
            <div className="text-xs text-amber-600 font-semibold uppercase">Quarter 3</div>
            <div className="text-sm font-bold text-amber-900 mt-1">1st July</div>
          </div>
          <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
            <div className="text-xs text-purple-600 font-semibold uppercase">Quarter 4</div>
            <div className="text-sm font-bold text-purple-900 mt-1">1st October</div>
          </div>
        </div>
      </section>

      {/* DISQUALIFICATIONS NOTICE */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          Statutory Grounds for Disqualification
        </h4>
        <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 leading-relaxed">
          <li>Persons who are not citizens of India.</li>
          <li>Persons of unsound mind declared so by a competent court.</li>
          <li>Persons temporarily disqualified from voting under any law relating to corrupt practices and other election offences.</li>
          <li>Dual registration: An individual cannot be registered in more than one constituency, or more than once in the same constituency.</li>
        </ul>
      </section>
    </div>
  );
};
