import React from 'react';
import { useTour } from '../../context/TourContext';
import { useTranslation } from '../../i18n/LanguageContext';
import type { SupportedLanguage } from '../../i18n/translations';
import { M3Icon } from '../m3/M3Icon';
import { M3Button } from '../m3/M3Button';
import type { StakeholderRole } from '../../types/tour';

interface TopAppBarProps {
  splitView: boolean;
  onToggleSplitView: () => void;
  onBackToRoleSelect: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  splitView,
  onToggleSplitView,
  onBackToRoleSelect,
}) => {
  const { role, setRole, tour, activeSosAlert, dismissSOS } = useTour();
  const { language, setLanguage, t } = useTranslation();

  const rolesList: { id: StakeholderRole; icon: string; label: string; badge?: string }[] = [
    { id: 'agent', icon: 'corporate_fare', label: t.roles.agent, badge: 'HQ' },
    { id: 'operator', icon: 'commute', label: t.roles.operator, badge: 'Tokyo' },
    { id: 'traveller', icon: 'badge', label: t.roles.traveller, badge: 'Guest' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-surface-container border-b border-outline-variant/40 shadow-xs select-none">
      {/* SOS Alert Bar if active */}
      {activeSosAlert && (
        <div className="bg-error text-on-error px-4 py-2 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <M3Icon name="emergency" filled size={20} />
            <span>
              EMERGENCY SOS: {activeSosAlert.passengerName} signaled for help at{' '}
              {activeSosAlert.location} ({activeSosAlert.time})!
            </span>
          </div>
          <button
            onClick={dismissSOS}
            className="px-3 py-1 rounded-m3-full bg-on-error text-error text-xs font-bold hover:bg-white/90 cursor-pointer"
          >
            Acknowledge & Dispatch Guide
          </button>
        </div>
      )}

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand & Active Trip */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBackToRoleSelect}
            className="w-10 h-10 rounded-m3-md bg-primary flex items-center justify-center text-on-primary shadow-xs hover:bg-[#004FAF] transition-all cursor-pointer"
            title="Return to Role Decider"
          >
            <M3Icon name="flight_takeoff" filled size={24} />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-on-surface">
                {t.appName}
              </span>
              <button
                onClick={onBackToRoleSelect}
                className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-m3-full text-[10px] font-bold uppercase bg-surface-container-highest text-on-surface hover:bg-outline-variant/50 transition-colors cursor-pointer"
              >
                <M3Icon name="swap_horiz" size={12} />
                <span>{t.roleSelection.changeRoleBtn}</span>
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant truncate">
              <span className="font-mono font-extrabold text-[11px] px-1.5 py-0.5 rounded-m3-xs bg-primary-container text-on-primary-container">
                {tour.code}
              </span>
              <span className="truncate font-semibold text-on-surface flex items-center gap-1">
                <span>🇯🇵</span>
                <span>{tour.name}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Timezone Clocks (Origin vs Destination) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-m3-full bg-surface-container-high text-xs font-roboto border border-outline-variant/40">
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <M3Icon name="home_pin" size={16} className="text-secondary" />
            <span className="font-medium">Jakarta</span>
            <span className="font-bold text-on-surface">14:15 WIB</span>
          </div>
          <span className="text-outline-variant">|</span>
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <M3Icon name="flight_land" size={16} className="text-primary" />
            <span className="font-medium">Tokyo</span>
            <span className="font-bold text-primary">16:15 JST</span>
            <span className="text-[10px] bg-primary/10 text-primary font-bold px-1 rounded-sm">
              +2 hrs
            </span>
          </div>
        </div>

        {/* Persona Switcher Buttons (Primary M3 Segmented Bar) */}
        <div className="flex items-center gap-1.5 bg-surface-container-lowest p-1 rounded-m3-full border border-outline-variant/60 shadow-xs">
          {rolesList.map((r) => {
            const isSelected = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`relative px-3.5 py-1.5 rounded-m3-full text-xs font-roboto font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <M3Icon name={r.icon} size={16} filled={isSelected} />
                <span className="hidden sm:inline">{r.label}</span>
                {r.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? 'bg-on-primary text-primary'
                        : 'bg-surface-container-highest text-on-surface-variant'
                    }`}
                  >
                    {r.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Tools: Split View & Language Selector */}
        <div className="flex items-center gap-2">
          {/* Tri-Party Live Split View Toggle */}
          <M3Button
            variant={splitView ? 'filled' : 'tonal'}
            size="sm"
            icon="splitscreen"
            onClick={onToggleSplitView}
            className="hidden md:inline-flex"
            title="Compare all 3 stakeholders side-by-side"
          >
            <span>{splitView ? 'Single View' : 'Tri-Party Sync'}</span>
          </M3Button>

          {/* Change Role Button for compact screens */}
          <M3Button
            variant="text"
            size="sm"
            icon="switch_account"
            onClick={onBackToRoleSelect}
            className="sm:hidden"
            title="Switch Role"
          />

          {/* Language Selector Dropdown */}
          <div className="relative flex items-center bg-surface-container-lowest rounded-m3-full border border-outline-variant/60 px-2 py-1 text-xs">
            <M3Icon name="translate" size={16} className="text-primary mr-1" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent font-medium text-xs text-on-surface focus:outline-none cursor-pointer pr-1"
            >
              <option value="en">🇺🇸 EN</option>
              <option value="id">🇮🇩 ID</option>
              <option value="ja">🇯🇵 JA</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
