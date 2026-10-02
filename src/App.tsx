import React, { useState, useEffect } from 'react';
import { TourProvider, useTour } from './context/TourContext';
import { LanguageProvider, useTranslation } from './i18n/LanguageContext';
import type { SupportedLanguage } from './i18n/translations';
import type { StakeholderRole } from './types/tour';
import { TopAppBar } from './components/layout/TopAppBar';
import { AgentView } from './components/agent/AgentView';
import { OperatorView } from './components/operator/OperatorView';
import { TravellerView } from './components/traveller/TravellerView';
import { RoleSelectionScreen } from './components/onboarding/RoleSelectionScreen';
import { MarketingPage } from './components/marketing/MarketingPage';
import { TravellerDetailModal } from './components/common/TravellerDetailModal';

const detectInitialView = (): 'marketing' | 'demo' => {
  if (typeof window === 'undefined') return 'marketing';
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  const search = window.location.search;

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
  const { role, setRole } = useTour();
  const { setLanguage } = useTranslation();

  const [view, setView] = useState<'marketing' | 'demo'>(detectInitialView);
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
      window.location.href = 'https://travelflow.neralab.id';
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

  // 1. If on Marketing Website (travelflow.neralab.id)
  if (view === 'marketing') {
    return <MarketingPage onLaunchDemo={handleLaunchDemoFromMarketing} />;
  }

  // 2. If on Demo App: Welcome Role Selection Screen (demo.travelflow.neralab.id)
  if (screen === 'role_select') {
    return (
      <RoleSelectionScreen
        onEnterDashboard={handleEnterDashboard}
        onBackToMarketing={handleBackToMarketing}
      />
    );
  }

  // 3. If on Demo App: Role-Specific Dashboard Screen
  return (
    <div className="min-h-screen flex flex-col bg-surface animate-in fade-in duration-200">
      <TopAppBar
        onBackToRoleSelect={handleBackToRoleSelect}
        onBackToMarketing={handleBackToMarketing}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="animate-in fade-in duration-200">
          {role === 'agent' && <AgentView />}
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
            <span className="font-semibold text-on-surface">Material Design 3 Engine</span>
            <span>•</span>
            <button
              onClick={handleBackToRoleSelect}
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              Switch Role / Restart Demo
            </button>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Tri-Party Outbound Coordination: Agent ➔ Operator ➔ Traveller</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline font-mono">demo.travelflow.neralab.id</span>
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
