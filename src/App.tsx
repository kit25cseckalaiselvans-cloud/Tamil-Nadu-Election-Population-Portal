import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Core Application Pages
import { HomePage } from './pages/HomePage';
import { TamilNaduPage } from './pages/TamilNaduPage';
import { DistrictPage } from './pages/DistrictPage';
import { DistrictDetailPage } from './pages/DistrictDetailPage';
import { AssemblyConstituenciesPage } from './pages/AssemblyConstituenciesPage';
import { AssemblySeatsPage } from './pages/AssemblySeatsPage';
import { MlasPage } from './pages/MlasPage';
import { VillagePanchayatsPage } from './pages/VillagePanchayatsPage';
import { VillagesPage } from './pages/VillagesPage';
import { LocalGovernmentPage } from './pages/LocalGovernmentPage';
import { ElectedRepresentativesPage } from './pages/ElectedRepresentativesPage';
import { GovernmentSourcesPage } from './pages/GovernmentSourcesPage';
import { DataQualityPage } from './pages/DataQualityPage';
import { ElectionCommissionPage } from './pages/ElectionCommissionPage';
import { PopulationPage } from './pages/PopulationPage';
import { VoterEligibilityPage } from './pages/VoterEligibilityPage';
import { VoterListPage } from './pages/VoterListPage';
import { NewVoterPage } from './pages/NewVoterPage';
import { BirthDeathPage } from './pages/BirthDeathPage';
import { ElectionStatsPage } from './pages/ElectionStatsPage';
import { SourcesPage } from './pages/SourcesPage';
import { AboutPage } from './pages/AboutPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { AdminPage } from './pages/AdminPage';
import { PopulationHistoryPage } from './pages/PopulationHistoryPage';
import { VoterServicesPage } from './pages/VoterServicesPage';
import { GovernmentServicesPage } from './pages/GovernmentServicesPage';
import { AuthPage } from './pages/AuthPage';
import { MyAccountPage } from './pages/MyAccountPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { DataSource } from './components/DataSource';
import { calculatePopulationEstimate } from './services/populationService';

export default function App() {
  // Read initial page from hash if present
  const getInitialPage = (): PageId => {
    const hash = window.location.hash.replace('#', '') as PageId;
    const validPages: PageId[] = [
      'home',
      'tamil-nadu',
      'districts',
      'district-detail',
      'assembly-constituencies',
      'assembly-seats',
      'mlas',
      'village-panchayats',
      'villages',
      'local-government',
      'elected-representatives',
      'government-sources',
      'sources',
      'admin',
      'data-quality',
      'election-commission',
      'population',
      'population-history',
      'voter-eligibility',
      'voter-list',
      'new-voter',
      'birth-death',
      'election-stats',
      'voter-services',
      'government-services',
      'auth',
      'my-account',
      'admin-dashboard',
      'about',
      'methodology',
      'data-source',
    ];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('chennai');

  // Sync state with URL hash
  useEffect(() => {
    window.location.hash = currentPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (hash && hash !== currentPage) {
        setCurrentPage(getInitialPage());
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
  };

  const handleSelectDistrict = (districtId: string) => {
    setSelectedDistrictId(districtId);
    setCurrentPage('district-detail');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'tamil-nadu':
        return <TamilNaduPage onNavigate={handleNavigate} onSelectDistrict={handleSelectDistrict} />;
      case 'districts':
        return <DistrictPage />;
      case 'district-detail':
        return (
          <DistrictDetailPage
            districtId={selectedDistrictId}
            onNavigate={handleNavigate}
            onSelectDistrict={(id) => setSelectedDistrictId(id)}
          />
        );
      case 'assembly-constituencies':
        return <AssemblyConstituenciesPage onNavigate={handleNavigate} onSelectDistrict={handleSelectDistrict} />;
      case 'assembly-seats':
        return <AssemblySeatsPage onNavigate={handleNavigate} />;
      case 'mlas':
        return <MlasPage onNavigate={handleNavigate} onSelectDistrict={handleSelectDistrict} />;
      case 'village-panchayats':
        return <VillagePanchayatsPage onNavigate={handleNavigate} onSelectDistrict={handleSelectDistrict} />;
      case 'villages':
        return <VillagesPage onNavigate={handleNavigate} onSelectDistrict={handleSelectDistrict} />;
      case 'local-government':
        return <LocalGovernmentPage onNavigate={handleNavigate} onSelectDistrict={handleSelectDistrict} />;
      case 'elected-representatives':
        return <ElectedRepresentativesPage onNavigate={handleNavigate} onSelectDistrict={handleSelectDistrict} />;
      case 'government-sources':
        return <GovernmentSourcesPage onNavigate={handleNavigate} />;
      case 'data-quality':
        return <DataQualityPage onNavigate={handleNavigate} />;
      case 'admin':
        return <DataQualityPage onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return <AdminDashboardPage onNavigate={handleNavigate} />;
      case 'population':
        return <PopulationPage onNavigate={handleNavigate} />;
      case 'population-history':
        return <PopulationHistoryPage onNavigate={handleNavigate} />;
      case 'election-commission':
        return <ElectionCommissionPage />;
      case 'voter-eligibility':
        return <VoterEligibilityPage onNavigate={handleNavigate} />;
      case 'voter-list':
        return <VoterListPage />;
      case 'new-voter':
        return <NewVoterPage onNavigate={handleNavigate} />;
      case 'birth-death':
        return <BirthDeathPage />;
      case 'election-stats':
        return <ElectionStatsPage onNavigate={handleNavigate} />;
      case 'voter-services':
        return <VoterServicesPage onNavigate={handleNavigate} />;
      case 'government-services':
        return <GovernmentServicesPage onNavigate={handleNavigate} />;
      case 'auth':
        return <AuthPage onNavigate={handleNavigate} />;
      case 'my-account':
        return <MyAccountPage onNavigate={handleNavigate} />;
      case 'sources':
        return <SourcesPage />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'methodology':
        return <MethodologyPage onNavigate={handleNavigate} />;
      case 'data-source':
        return (
          <div className="max-w-4xl mx-auto py-4">
            <DataSource
              estimate={calculatePopulationEstimate(new Date())}
              onClose={() => handleNavigate('population')}
              onOpenAdmin={() => handleNavigate('admin')}
            />
          </div>
        );
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navigation Bar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 w-full">
        {renderPage()}
      </main>

      {/* Official Footer with Mandatory Statutory Disclaimer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
