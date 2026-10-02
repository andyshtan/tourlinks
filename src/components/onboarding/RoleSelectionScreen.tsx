import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { useTranslation } from '../../i18n/LanguageContext';
import type { SupportedLanguage } from '../../i18n/translations';
import type { StakeholderRole } from '../../types/tour';
import { M3Icon } from '../m3/M3Icon';

interface RoleSelectionScreenProps {
  onEnterDashboard: (selectedRole: StakeholderRole, selectedLang: SupportedLanguage) => void;
}

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({
  onEnterDashboard,
}) => {
  const { tour } = useTour();
  const { language, setLanguage, t } = useTranslation();

  const [selectedRole, setSelectedRole] = useState<StakeholderRole>('agent');
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(language);

  const roleConfigs: {
    id: StakeholderRole;
    icon: string;
    title: string;
    badge: string;
    summary: string;
    recommendedLang: SupportedLanguage;
    recommendedLangLabel: string;
    colorAccent: string;
    bgAccent: string;
    features: string[];
  }[] = [
    {
      id: 'agent',
      icon: 'corporate_fare',
      title: t.roles.agent,
      badge: t.roleSelection.agentBadge,
      summary: t.roleSelection.agentSummary,
      recommendedLang: 'id',
      recommendedLangLabel: '🇮🇩 Bahasa Indonesia',
      colorAccent: 'text-primary',
      bgAccent: 'bg-primary-container text-on-primary-container',
      features: [
        'Passport Expiry Guard (<6 months) with 1-Click WhatsApp Nudge',
        'Standardized 14-Pax Manifest & Rooming Allocation',
        'Live In-Transit Flight Radar (JL720 CGK ➔ NRT)',
        'DMC Contract & Net-Rate Ledger Sign-Off ($14,800)',
      ],
    },
    {
      id: 'operator',
      icon: 'commute',
      title: t.roles.operator,
      badge: t.roleSelection.operatorBadge,
      summary: t.roleSelection.operatorSummary,
      recommendedLang: 'ja',
      recommendedLangLabel: '🇯🇵 日本語 (Japanese)',
      colorAccent: 'text-secondary',
      bgAccent: 'bg-secondary-container text-on-secondary-container',
      features: [
        'Dedicated Chauffeur (Kenji) & Guide (Yumi) Dispatch',
        'Full-Screen iPad Digital Arrival Paging Signboard',
        '1-Tap Airport Arrival Handshake (Standby ➔ Boarded)',
        'Dynamic Schedule Delay (+20m) & Shibuya Gathering Pin',
      ],
    },
    {
      id: 'traveller',
      icon: 'badge',
      title: t.roles.traveller,
      badge: t.roleSelection.travellerBadge,
      summary: t.roleSelection.travellerSummary,
      recommendedLang: 'en',
      recommendedLangLabel: '🇺🇸 English',
      features: [
        'Offline-Ready Mobile Web Pass (Cached Vouchers & Wi-Fi)',
        'Narita T1 Meeting Point Photo (Pillar #17 Near Starbucks)',
        '1-Tap "I Have Cleared Customs! Heading to Exit"',
        'Japanese Taxi Address Card & Emergency SOS Radar',
      ],
      colorAccent: 'text-tertiary',
      bgAccent: 'bg-tertiary-container text-on-tertiary-container',
    },
  ];

  const handleRoleSelect = (roleId: StakeholderRole, defaultLang: SupportedLanguage) => {
    setSelectedRole(roleId);
    setSelectedLang(defaultLang);
    setLanguage(defaultLang);
  };

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setSelectedLang(lang);
    setLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between p-4 sm:p-6 lg:p-10 select-none animate-in fade-in duration-300">
      <div className="max-w-6xl w-full mx-auto space-y-8">
        {/* Brand & Hero Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-m3-full bg-primary-container text-on-primary-container text-xs font-bold tracking-wide uppercase shadow-xs">
            <M3Icon name="flight_takeoff" filled size={16} />
            <span>Interactive Outbound Tour Workflow Demo</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-roboto tracking-tight text-on-surface">
            {t.roleSelection.heroTitle}
          </h1>

          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            {t.roleSelection.heroSubtitle}
          </p>

          {/* Standout Active Tour Showcase Capsule */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 sm:p-2 sm:pr-4 rounded-m3-full bg-surface-container-lowest m3-elevation-2 border border-primary/20 shadow-md hover:m3-elevation-3 transition-all duration-300">
              {/* Tour Code Badge with Live Pulse */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-m3-full bg-primary text-on-primary font-mono font-extrabold text-xs tracking-wider shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                <M3Icon name="confirmation_number" size={14} />
                <span>{tour.code}</span>
              </div>

              {/* Tour Name with Destination Flag */}
              <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm text-on-surface tracking-tight px-1">
                <span className="text-base" role="img" aria-label="Japan">🇯🇵</span>
                <span className="text-on-surface hover:text-primary transition-colors">
                  {tour.name}
                </span>
              </div>

              {/* Date & Duration Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-m3-full bg-secondary-container text-on-secondary-container text-xs font-bold font-roboto">
                <M3Icon name="calendar_month" size={14} className="text-secondary" />
                <span>{tour.dates}</span>
              </div>

              {/* Live Flight & Ground Radar Badge */}
              <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-m3-full bg-[#D4F7DC] text-[#0A6324] text-[11px] font-extrabold font-roboto border border-[#A1E8B2]">
                <M3Icon name="flight_land" size={14} />
                <span>JL720 • Landed at NRT T1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Language Selector Pills */}
        <div className="max-w-md mx-auto p-2 rounded-m3-full bg-surface-container border border-outline-variant/60 flex items-center justify-between text-xs">
          <span className="pl-3 font-semibold text-on-surface-variant text-[11px] uppercase tracking-wider">
            {t.roleSelection.languagePrompt}:
          </span>
          <div className="flex items-center gap-1">
            {(
              [
                { id: 'en', label: '🇺🇸 English' },
                { id: 'id', label: '🇮🇩 Indonesia' },
                { id: 'ja', label: '🇯🇵 日本語' },
              ] as const
            ).map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => handleLanguageChange(l.id)}
                className={`px-3 py-1.5 rounded-m3-full text-xs font-bold transition-all cursor-pointer ${
                  selectedLang === l.id
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roleConfigs.map((cfg) => {
            const isSelected = selectedRole === cfg.id;

            return (
              <div
                key={cfg.id}
                onClick={() => handleRoleSelect(cfg.id, cfg.recommendedLang)}
                className={`group relative rounded-m3-xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between border-2 ${
                  isSelected
                    ? 'bg-surface-container-lowest border-primary shadow-xl ring-4 ring-primary/10 scale-[1.02]'
                    : 'bg-surface-container-low border-outline-variant/50 hover:border-outline hover:bg-surface-container shadow-xs'
                }`}
              >
                <div>
                  {/* Top Badge & Radio Indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-m3-full uppercase tracking-wider ${cfg.bgAccent}`}
                    >
                      {cfg.badge}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-primary text-on-primary shadow-xs'
                          : 'border-2 border-outline-variant group-hover:border-primary'
                      }`}
                    >
                      {isSelected && <M3Icon name="check" size={16} />}
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-m3-lg flex items-center justify-center ${cfg.bgAccent} shadow-xs`}
                    >
                      <M3Icon name={cfg.icon} filled size={28} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg sm:text-xl font-roboto text-on-surface tracking-tight leading-tight">
                        {cfg.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                    {cfg.summary}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-2 pt-3 border-t border-outline-variant/30">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/80 block">
                      Workflow Responsibilities:
                    </span>
                    {cfg.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-on-surface"
                      >
                        <span className={`shrink-0 mt-0.5 ${cfg.colorAccent}`}>
                          <M3Icon name="check_circle" filled size={14} />
                        </span>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Quick Language Preset */}
                <div className="mt-6 pt-4 border-t border-outline-variant/40 space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-on-surface-variant font-medium">
                      Default Language:
                    </span>
                    <span className="font-bold text-on-surface">
                      {cfg.recommendedLangLabel}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEnterDashboard(cfg.id, selectedLang);
                    }}
                    className={`w-full py-3 px-4 rounded-m3-full text-xs font-bold font-roboto transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98 ${
                      isSelected
                        ? 'bg-primary text-on-primary hover:bg-[#004FAF] shadow-md'
                        : 'bg-surface-container-highest text-on-surface hover:bg-outline-variant/40'
                    }`}
                  >
                    <span>
                      {t.roleSelection.launchBtn} {cfg.title.split(' ')[0]}
                    </span>
                    <M3Icon name="arrow_forward" size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center pt-8 text-xs text-on-surface-variant">
        <span>Google Material Design 3 • Multi-Lingual Architecture (EN / ID / JA) • Outbound Travel Ecosystem</span>
      </footer>
    </div>
  );
};
