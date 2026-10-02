import React, { useState } from 'react';
import { TourProvider, useTour } from './context/TourContext';
import { LanguageProvider, useTranslation } from './i18n/LanguageContext';
import type { SupportedLanguage } from './i18n/translations';
import type { StakeholderRole } from './types/tour';
import { TopAppBar } from './components/layout/TopAppBar';
import { AgentView } from './components/agent/AgentView';
import { OperatorView } from './components/operator/OperatorView';
import { TravellerView } from './components/traveller/TravellerView';
import { SplitView } from './components/layout/SplitView';
import { RoleSelectionScreen } from './components/onboarding/RoleSelectionScreen';

const MainContent: React.FC = () => {
  const { role, setRole } = useTour();
  const { setLanguage } = useTranslation();

  // Screen navigation state: 'role_select' | 'dashboard'
  const [screen, setScreen] = useState<'role_select' | 'dashboard'>('role_select');
  const [splitView, setSplitView] = useState(false);

  // Flow handlers
  const handleEnterDashboard = (selectedRole: StakeholderRole, selectedLang: SupportedLanguage) => {
    setRole(selectedRole);
    setLanguage(selectedLang);
    setSplitView(false);
    setScreen('dashboard');
  };

  const handleBackToRoleSelect = () => {
    setScreen('role_select');
  };

  // If in Role Decider screen
  if (screen === 'role_select') {
    return (
      <RoleSelectionScreen
        onEnterDashboard={handleEnterDashboard}
      />
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen flex flex-col bg-surface animate-in fade-in duration-200">
      <TopAppBar
        splitView={splitView}
        onToggleSplitView={() => setSplitView(!splitView)}
        onBackToRoleSelect={handleBackToRoleSelect}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {splitView ? (
          <SplitView />
        ) : (
          <div className="animate-in fade-in duration-200">
            {role === 'agent' && <AgentView />}
            {role === 'operator' && <OperatorView />}
            {role === 'traveller' && (
              <div className="max-w-lg mx-auto">
                <TravellerView />
              </div>
            )}
          </div>
        )}
      </main>

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
            <span className="hidden md:inline font-mono">v1.0.0-release</span>
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
