import React from 'react';
import { useTour } from '../../context/TourContext';
import { useTranslation } from '../../i18n/LanguageContext';
import { M3Icon } from '../m3/M3Icon';

interface TopAppBarProps {
  onBackToRoleSelect: () => void;
  onBackToMarketing?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  onBackToRoleSelect,
  onBackToMarketing,
}) => {
  const { role, tour, activeSosAlert, dismissSOS } = useTour();
  const { t } = useTranslation();

  const getRoleBadge = () => {
    switch (role) {
      case 'agent':
        return {
          label: t.agent.badge || 'Origin Agent HQ',
          classes: 'bg-primary-container text-on-primary-container',
        };
      case 'operator':
        return {
          label: t.operator.badge || 'Ground Operator DMC',
          classes: 'bg-secondary-container text-on-secondary-container',
        };
      case 'traveller':
        return {
          label: t.traveller.passTitle || 'Guest Pass',
          classes: 'bg-tertiary-container text-on-tertiary-container',
        };
    }
  };

  const roleBadge = getRoleBadge();

  return (
    <header className="sticky top-0 z-40 w-full bg-surface-container border-b border-outline-variant/40 shadow-xs select-none">
      {/* Emergency SOS Banner if active */}
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

      {/* Main Clean Role Header */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left: Bold Brand + Role Badge + Tour Code */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBackToMarketing || onBackToRoleSelect}
            className="font-black text-2xl tracking-tighter text-on-surface hover:opacity-80 transition-opacity cursor-pointer shrink-0"
            title="Return to Travelflow"
          >
            Travelflow
          </button>

          <span className="text-outline-variant font-light text-lg">/</span>

          <span
            className={`text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-m3-full shrink-0 ${roleBadge.classes}`}
          >
            {roleBadge.label}
          </span>

          <div className="hidden sm:flex items-center gap-2 text-xs text-on-surface-variant truncate">
            <span className="font-mono font-bold text-[11px] px-1.5 py-0.5 rounded-xs bg-surface-container-highest text-on-surface">
              {tour.code}
            </span>
            <span className="truncate text-on-surface-variant hidden md:inline">
              {tour.name}
            </span>
          </div>
        </div>

        {/* Right: Only One Action Button - Switch Role */}
        <div className="flex items-center">
          <button
            onClick={onBackToRoleSelect}
            className="h-9 px-3.5 rounded-m3-full border border-outline-variant/60 bg-surface-container-lowest hover:bg-surface-container-high transition-all text-xs font-bold text-on-surface flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
            title="Change active role"
          >
            <M3Icon name="swap_horiz" size={16} className="text-primary" />
            <span>{t.roleSelection.changeRoleBtn}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
