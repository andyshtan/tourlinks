import React, { useState, useEffect } from 'react';
import { TourProvider, useTour } from './context/TourContext';
import { LanguageProvider, useTranslation } from './i18n/LanguageContext';
import type { SupportedLanguage } from './i18n/translations';
import type { StakeholderRole } from './types/tour';
import { TopAppBar } from './components/layout/TopAppBar';
import { AgentView } from './components/agent/AgentView';
import { OperatorView } from './components/operator/OperatorView';
import { TourLeaderView } from './components/leader/TourLeaderView';
import { TravellerView } from './components/traveller/TravellerView';
import { RoleSelectionScreen } from './components/onboarding/RoleSelectionScreen';
import { MarketingPage } from './components/marketing/MarketingPage';
import { TravellerDetailModal } from './components/common/TravellerDetailModal';
import { DocumentViewerModal } from './components/common/DocumentViewerModal';
import type { DocumentType } from './utils/documentUtils';

const detectInitialView = (): 'marketing' | 'demo' | 'document' => {
  if (typeof window === 'undefined') return 'marketing';
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  const search = window.location.search;

  // Direct document copy link detection (e.g. /docs?passenger=p1&type=passport)
  if (
    pathname.startsWith('/docs') ||
    search.includes('view=doc') ||
    (search.includes('passenger=') && search.includes('type='))
  ) {
    return 'document';
  }

  // If on demo subdomain, /demo path, or ?view=demo
  if (
    hostname.startsWith('demo.') ||
    pathname.startsWith('/demo') ||
    search.includes('view=demo')
  ) {
    return 'demo';
  }
  return 'marketing';
};

const MainContent: React.FC = () => {
  const { role, setRole, passengers } = useTour();
  const { setLanguage } = useTranslation();

  const [view, setView] = useState<'marketing' | 'demo' | 'document'>(detectInitialView);
  const [screen, setScreen] = useState<'role_select' | 'dashboard'>('role_select');

  // Sync browser URL or popstate if needed
  useEffect(() => {
    const handlePopState = () => {
      setView(detectInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Flow handlers
  const handleLaunchDemoFromMarketing = () => {
    setView('demo');
    setScreen('role_select');
    // Ensure English default on welcome screen
    setLanguage('en');
    if (window.history && window.history.pushState) {
      window.history.pushState({}, '', '/demo');
    }
  };

  const handleBackToMarketing = () => {
    if (typeof window !== 'undefined' && window.location.hostname.startsWith('demo.')) {
      window.location.href = `https://${window.location.hostname.replace(/^demo\./, '')}`;
      return;
    }
    setView('marketing');
    if (window.history && window.history.pushState) {
      window.history.pushState({}, '', '/');
    }
  };

  const handleEnterDashboard = (selectedRole: StakeholderRole, selectedLang: SupportedLanguage) => {
    setRole(selectedRole);
    setLanguage(selectedLang);
    setScreen('dashboard');
  };

  const handleBackToRoleSelect = () => {
    setScreen('role_select');
    setLanguage('en');
  };

  // 1. Direct Shareable Document Viewer (when opening a copied document link)
  if (view === 'document') {
    const params =
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams();
    const passengerId = params.get('passenger') || 'p1';
    const docType = (params.get('type') as DocumentType) || 'passport';
    const targetPassenger =
      passengers.find((p) => p.id === passengerId) || passengers[0];

    return (
      <div className="min-h-screen bg-surface-container-lowest">
        {/* Navigation Bar */}
        <header className="bg-surface border-b border-outline-variant/40 px-4 py-3 flex items-center justify-between shadow-xs">
          <button
            onClick={() => {
              setView('demo');
              setScreen('dashboard');
              if (window.history && window.history.pushState) {
                window.history.pushState({}, '', '/demo');
              }
            }}
            className="font-black text-2xl tracking-tighter text-on-surface hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-2"
          >
            <span>Tourlinks</span>
            <span className="text-xs font-mono font-normal text-on-surface-variant">
              / Document Archive
            </span>
          </button>

          <button
            onClick={() => {
              setView('demo');
              setScreen('dashboard');
              if (window.history && window.history.pushState) {
                window.history.pushState({}, '', '/demo');
              }
            }}
            className="px-4 py-2 rounded-m3-full bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-all cursor-pointer shadow-xs"
          >
            ← Back to Tourlinks Operations
          </button>
        </header>

        <DocumentViewerModal
          passenger={targetPassenger}
          initialType={docType}
          isOpen={true}
          isStandalone={true}
          onClose={() => {
            setView('demo');
            setScreen('dashboard');
          }}
        />
      </div>
    );
  }

  // 2. If on Marketing Website (tourlinks.co)
  if (view === 'marketing') {
    return <MarketingPage onLaunchDemo={handleLaunchDemoFromMarketing} />;
  }

  // 3. If on Demo App: Welcome Role Selection Screen (demo.tourlinks.co)
  if (screen === 'role_select') {
    return (
      <RoleSelectionScreen
        onEnterDashboard={handleEnterDashboard}
        onBackToMarketing={handleBackToMarketing}
      />
    );
  }

  // 4. If on Demo App: Role-Specific Dashboard Screen
  return (
    <div className="min-h-screen flex flex-col bg-surface animate-in fade-in duration-200">
      <TopAppBar
        onBackToRoleSelect={handleBackToRoleSelect}
        onBackToMarketing={handleBackToMarketing}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="animate-in fade-in duration-200">
          {role === 'agent' && <AgentView />}
          {role === 'leader' && <TourLeaderView />}
          {role === 'operator' && <OperatorView />}
          {role === 'traveller' && (
            <div className="max-w-lg mx-auto">
              <TravellerView />
            </div>
          )}
        </div>
      </main>

      {/* Universal 1-Click Traveler Detail Inspection Modal */}
      <TravellerDetailModal />

      {/* Material 3 Bottom Bar */}
      <footer className="w-full bg-surface-container border-t border-outline-variant/30 py-4 px-6 text-xs text-on-surface-variant select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            <span className="font-semibold text-on-surface">Interactive demo • sample data</span>
            <span>•</span>
            <button
              onClick={handleBackToRoleSelect}
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              Switch Role / Restart Demo
            </button>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Agent ➔ Tour Leader ➔ Ground DMC ➔ Traveller</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline font-mono">demo.tourlinks.co</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <TourProvider>
        <MainContent />
      </TourProvider>
    </LanguageProvider>
  );
}

export default App;
