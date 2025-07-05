import React, { useState } from 'react';
import { Users, Shield, Activity, FileText } from 'lucide-react';
import SurveyWidget from './SurveyWidget';
import SurveyFlow from './SurveyFlow';

interface HRDashboardProps {
  onSurveyComplete: (responses: unknown[]) => void;
  setCurrentView: React.Dispatch<React.SetStateAction<'dashboard' | 'admin' | 'policies'>>;
}

const HRDashboard: React.FC<HRDashboardProps> = ({ onSurveyComplete, setCurrentView }) => {
  const [showSurveyWidget, setShowSurveyWidget] = useState(true);
  const [showSurveyFlow, setShowSurveyFlow] = useState(false);

  const handleStartSurvey = () => {
    setShowSurveyWidget(false);
    setShowSurveyFlow(true);
  };

  const handleSurveyComplete = (responses: unknown[]) => {
    setShowSurveyFlow(false);
    onSurveyComplete(responses);
  };

  const handleCloseSurvey = () => {
    setShowSurveyFlow(false);
  };

  const handleRemindLater = () => {
    setShowSurveyWidget(false);
  };

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
          <div className="flex items-center space-x-12">
            <div className="flex items-center">
              {/* Brand as text, not SVG */}
              <span className="text-2xl font-bold tracking-tight" style={{ color: '#17696A', fontFamily: 'system-ui, -apple-system, sans-serif' }}>loop</span>
            </div>
            <nav className="flex space-x-12 items-center flex-1">
              <button className="font-medium text-gray-900 text-base px-0 pb-2 border-b-4 border-teal-400 focus:outline-none">Endorsements</button>
              <button className="text-gray-500 text-base font-medium px-0 pb-2 focus:outline-none">Claims</button>
              <button onClick={() => setCurrentView('policies')} className="text-gray-500 text-base font-medium px-0 pb-2 focus:outline-none">Policies</button>
              <button className="text-gray-500 text-base font-medium px-0 pb-2 focus:outline-none">Employees</button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 pt-32">
        {/* First Fold: Banner and Template Download */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Banner */}
          <div className="md:col-span-2 flex">
            <div className="bg-loop-green rounded-2xl flex flex-col md:flex-row items-center justify-between p-6 w-full h-full relative overflow-hidden">
              {/* Banner Text */}
              <div className="flex-1 min-w-0 flex flex-col items-start justify-center">
                <h1 className="heading-xl mb-2" style={{color: 'var(--loop-offwhite)', fontSize: '1.5rem'}}>Manage policies with <span style={{fontWeight: 900}}>one excel sheet!</span></h1>
                <p className="text-base mb-4" style={{color: 'var(--loop-offwhite)', opacity: 0.85, fontWeight: 500}}>Add, remove or update employees and dependants in bulk with ease, or quickly upload any past error records</p>
                <div className="flex flex-row items-center gap-3">
                  <button className="btn-cta" style={{padding: '0.6rem 1.4rem', fontSize: '1rem', fontWeight: 600}}>Endorse members</button>
                  <button className="text-accent text-base font-semibold flex items-center gap-2 bg-transparent border-0 p-0 hover:underline" style={{color: 'var(--loop-accent)'}}>Learn how it works <span aria-hidden>→</span></button>
                </div>
              </div>
              {/* Illustration */}
              <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-6 flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 md:w-32 md:h-32">
                  <rect x="10" y="20" width="100" height="90" rx="12" fill="#1A9A8B" stroke="#137863" strokeWidth="3"/>
                  <rect x="25" y="35" width="18" height="18" rx="3" fill="#fff"/>
                  <rect x="51" y="35" width="18" height="18" rx="3" fill="#fff"/>
                  <rect x="77" y="35" width="18" height="18" rx="3" fill="#fff"/>
                  <rect x="25" y="61" width="18" height="18" rx="3" fill="#fff"/>
                  <rect x="51" y="61" width="18" height="18" rx="3" fill="#fff"/>
                  <rect x="77" y="61" width="18" height="18" rx="3" fill="#fff"/>
                  <rect x="25" y="87" width="18" height="18" rx="3" fill="#fff"/>
                  <rect x="51" y="87" width="18" height="18" rx="3" fill="#fff"/>
                  <rect x="77" y="87" width="18" height="18" rx="3" fill="#fff"/>
                  <rect x="30" y="10" width="8" height="16" rx="4" fill="#fff" stroke="#137863" strokeWidth="2"/>
                  <rect x="82" y="10" width="8" height="16" rx="4" fill="#fff" stroke="#137863" strokeWidth="2"/>
                  {/* Checkmark */}
                  <path d="M70 75l8 8 14-14" stroke="#D6F04A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          {/* Template Download Card */}
          <div className="flex flex-col h-full justify-between">
            <div className="bg-white rounded-2xl shadow p-8 flex flex-col h-full justify-between">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Download templates that streamline <span className="text-accent">Endorsements</span></h3>
              <p className="text-sm text-gray-600 mb-4">Eliminate margin for error by using templates pre-made for you.</p>
              <div className="flex items-center space-x-2 mt-auto">
                <input className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Search template..." />
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <FileText className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Track Endorsements Section */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Track Endorsements</h3>
          <div className="flex space-x-8 mb-8">
            <button className="border-b-4 border-teal-400 text-gray-900 font-bold pb-2 px-2 text-lg">Ongoing</button>
            <button className="text-gray-400 font-semibold pb-2 px-2 text-lg">Completed</button>
          </div>
          <div className="space-y-6">
            {/* Endorsement Card 1 */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center md:items-stretch p-6 gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-yellow-100 border border-gray-100 shadow-sm">
                {/* Aviva Logo */}
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-yellow-100 border border-gray-200">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="44" height="44" rx="12" fill="#FFE44D" stroke="#B9A800" strokeWidth="2"/>
                    <rect x="13" y="10" width="12" height="18" fill="#0057A8"/>
                    <rect x="25" y="10" width="8" height="18" fill="#7AC143"/>
                    <text x="24" y="38" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="10" fill="#0057A8">AVIVA</text>
                  </svg>
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">Endorsement open</span>
                  <span className="text-base font-bold text-gray-900">Group Medical Coverage (GMC)</span>
                </div>
                <div className="text-xs text-gray-600 mb-2">Aviva &bull; Policy ID: XYZ-0002 &bull; Month: June</div>
                <div className="flex flex-wrap gap-4 mb-4 text-xs text-gray-700">
                  <div>
                    <span className="block text-[10px] text-muted">876 Members</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-muted">Additions 508</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-muted">Deletions 22</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-muted">Corrections 12</span>
                  </div>
                </div>
                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">View details</button>
              </div>
              <div className="flex flex-col items-end justify-between h-full">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">Endorsement open</span>
                <span className="text-xs text-gray-400">Accepting changes in data till 14/08/2025</span>
              </div>
            </div>
            {/* Endorsement Card 2 */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center md:items-stretch p-6 gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-red-100 border border-gray-100 shadow-sm">
                {/* Kotak Logo */}
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-red-100 border border-gray-200">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="44" height="44" rx="12" fill="#E53935" stroke="#B71C1C" strokeWidth="2"/>
                    <ellipse cx="16" cy="24" rx="7" ry="7" fill="#fff"/>
                    <ellipse cx="32" cy="24" rx="7" ry="7" fill="#fff"/>
                    <path d="M12 24c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4zm16 0c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z" fill="#223A5E"/>
                    <path d="M14 24c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm16 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" fill="#E53935"/>
                    <text x="24" y="38" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="10" fill="#fff">kotak</text>
                  </svg>
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">Endorsement open</span>
                  <span className="text-base font-bold text-gray-900">Group Medical Coverage (GMC)</span>
                </div>
                <div className="text-xs text-gray-600 mb-2">Kotak Life &bull; Policy ID: XYZ-0003 &bull; Month: June</div>
                <div className="flex flex-wrap gap-4 mb-4 text-xs text-gray-700">
                  <div>
                    <span className="block text-[10px] text-muted">904 Members</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-muted">Additions 290</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-muted">Deletions 18</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-muted">Corrections 10</span>
                  </div>
                </div>
                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">View details</button>
              </div>
              <div className="flex flex-col items-end justify-between h-full">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">Endorsement open</span>
                <span className="text-xs text-gray-400">Accepting changes in data till 14/08/2025</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Survey Components */}
      <SurveyWidget 
        onStartSurvey={handleStartSurvey}
        isVisible={showSurveyWidget}
        onClose={() => setShowSurveyWidget(false)}
        onRemindLater={handleRemindLater}
      />
      
      <SurveyFlow 
        isOpen={showSurveyFlow}
        onClose={handleCloseSurvey}
        onComplete={handleSurveyComplete}
      />
    </div>
  );
};

export default HRDashboard;