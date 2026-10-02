import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { useTranslation } from '../../i18n/LanguageContext';
import type { SupportedLanguage } from '../../i18n/translations';
import { translations } from '../../i18n/translations';
import type { StakeholderRole } from '../../types/tour';
import { M3Icon } from '../m3/M3Icon';

interface RoleSelectionScreenProps {
  onEnterDashboard: (selectedRole: StakeholderRole, selectedLang: SupportedLanguage) => void;
  onBackToMarketing?: () => void;
}

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({
  onEnterDashboard,
  onBackToMarketing,
}) => {
  const { tour } = useTour();
  const { setLanguage, t } = useTranslation();

  const [selectedRole, setSelectedRole] = useState<StakeholderRole>('agent');

  // Guarantee Welcome Page is in English by default
  React.useEffect(() => {
    setLanguage('en');
  }, []);

  // Each card strictly configured with its respected language
  const roleConfigs: {
    id: StakeholderRole;
    icon: string;
    respectedLang: SupportedLanguage;
    langBadge: string;
    flag: string;
    title: string;
    badge: string;
    summary: string;
    responsibilitiesLabel: string;
    features: string[];
    buttonText: string;
    colorAccent: string;
    bgAccent: string;
    borderActive: string;
  }[] = [
    {
      id: 'agent',
      icon: 'corporate_fare',
      respectedLang: 'id',
      langBadge: 'Bahasa Indonesia',
      flag: '🇮🇩',
      title: translations.id.roles.agent, // 'Agen Outbound (Penjual)'
      badge: translations.id.roleSelection.agentBadge, // 'Kantor Pusat Asal • Jakarta'
      summary: translations.id.roleSelection.agentSummary,
      responsibilitiesLabel: 'Tanggung Jawab Alur Kerja:',
      features: [
        'Pengawal Paspor (<6 bulan) dengan 1-Klik Nudge WhatsApp',
        'Manifes Digital 14 Tamu & Alokasi Kamar Hotel',
        'Radar Penerbangan Langsung (JL720 CGK ➔ NRT)',
        'Tanda Tangan & Pelunasan Net Rate DMC ($14.800)',
      ],
      buttonText: 'Masuk Dashboard sebagai Agen',
      colorAccent: 'text-primary',
      bgAccent: 'bg-primary-container text-on-primary-container',
      borderActive: 'border-primary ring-primary/15',
    },
    {
      id: 'operator',
      icon: 'commute',
      respectedLang: 'ja',
      langBadge: '日本語 (Japanese)',
      flag: '🇯🇵',
      title: translations.ja.roles.operator, // '現地手配会社 (DMC / Operator)'
      badge: translations.ja.roleSelection.operatorBadge, // '着地運用オペレーター • 東京'
      summary: translations.ja.roleSelection.operatorSummary,
      responsibilitiesLabel: '現地オペレーション業務:',
      features: [
        '専属ドライバー（田中）＆ガイド（佐藤）の配車手配',
        'iPad用 フルスクリーン空港ミート看板',
        '空港到着ハンドシェイク（待機 ➔ 乗車完了）',
        '首都高渋滞による動的遅延調整（+20分）＆集合ピン',
      ],
      buttonText: 'DMCダッシュボードへ入る',
      colorAccent: 'text-secondary',
      bgAccent: 'bg-secondary-container text-on-secondary-container',
      borderActive: 'border-secondary ring-secondary/15',
    },
    {
      id: 'traveller',
      icon: 'badge',
      respectedLang: 'en',
      langBadge: 'English (Universal)',
      flag: '🇺🇸',
      title: translations.en.roles.traveller, // 'Traveller Pass'
      badge: translations.en.roleSelection.travellerBadge, // 'End User • Guest Mobile Pass'
      summary: translations.en.roleSelection.travellerSummary,
      responsibilitiesLabel: 'Guest Experience Features:',
      features: [
        'Offline-Ready Mobile Web Pass (Cached Vouchers & Wi-Fi)',
        'Narita T1 Meeting Point Photo (Pillar #17 Near Starbucks)',
        '1-Tap "I Have Cleared Customs! Heading to Exit"',
        'Japanese Taxi Address Card & Emergency SOS Radar',
      ],
      buttonText: 'Enter Dashboard as Traveller',
      colorAccent: 'text-tertiary',
      bgAccent: 'bg-tertiary-container text-on-tertiary-container',
      borderActive: 'border-tertiary ring-tertiary/15',
    },
  ];

  const handleRoleSelect = (roleId: StakeholderRole, roleLang: SupportedLanguage) => {
    setSelectedRole(roleId);
    setLanguage(roleLang);
  };

  const handleLaunch = (roleId: StakeholderRole, roleLang: SupportedLanguage) => {
    setLanguage(roleLang);
    onEnterDashboard(roleId, roleLang);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between p-4 sm:p-6 lg:p-10 select-none animate-in fade-in duration-300">
      <div className="max-w-6xl w-full mx-auto space-y-8">
        {/* Top Bar with Return to Marketing Website */}
        <div className="flex items-center justify-between">
          <a
            href={
              typeof window !== 'undefined' && window.location.hostname.includes('travelflow.neralab.id')
                ? 'https://travelflow.neralab.id'
                : '/'
            }
            onClick={(e) => {
              if (onBackToMarketing) {
                e.preventDefault();
                onBackToMarketing();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-m3-full bg-surface-container border border-outline-variant/60 text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <M3Icon name="arrow_back" size={16} />
            <span className="font-black text-sm">Travelflow</span>
          </a>

          <span className="text-[11px] font-mono font-bold text-primary px-3 py-1 rounded-m3-full bg-primary-container text-on-primary-container hidden sm:inline">
            demo.travelflow.neralab.id
          </span>
        </div>

        {/* Brand & Hero Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center px-4 py-1.5 rounded-m3-full bg-primary-container text-on-primary-container text-xs font-extrabold tracking-wide uppercase shadow-xs">
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

        {/* Interactive 9-Language Selector Ribbon */}
        <div className="max-w-4xl mx-auto p-3 rounded-m3-xl bg-surface-container border border-outline-variant/60 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-bold text-on-surface flex items-center gap-1.5">
              <M3Icon name="translate" size={16} className="text-primary" />
              <span>Choose Demo Language (9 Supported Languages):</span>
            </span>
            <span className="text-[11px] text-primary font-mono font-bold bg-primary-container px-2 py-0.5 rounded-full">
              Active: {t.common.language}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {[
              { code: 'en' as SupportedLanguage, label: 'English', flag: '🇺🇸' },
              { code: 'id' as SupportedLanguage, label: 'Indonesia', flag: '🇮🇩' },
              { code: 'ja' as SupportedLanguage, label: '日本語', flag: '🇯🇵' },
              { code: 'th' as SupportedLanguage, label: 'ไทย', flag: '🇹🇭' },
              { code: 'zh' as SupportedLanguage, label: '中文', flag: '🇨🇳' },
              { code: 'ko' as SupportedLanguage, label: '한국어', flag: '🇰🇷' },
              { code: 'es' as SupportedLanguage, label: 'Español', flag: '🇪🇸' },
              { code: 'hi' as SupportedLanguage, label: 'हिन्दी', flag: '🇮🇳' },
              { code: 'ar' as SupportedLanguage, label: 'العربية', flag: '🇸🇦' },
            ].map((l) => {
              const isActive = (t as any) && translations[l.code]?.appName === t.appName && translations[l.code]?.common?.origin === t.common?.origin;
              return (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-3 py-1.5 rounded-m3-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-xs ring-2 ring-primary/30 scale-105'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high border border-outline-variant/50'
                  }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Role Selection Cards — Each Showing Its Respected Language */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {roleConfigs.map((cfg) => {
            const isSelected = selectedRole === cfg.id;

            return (
              <div
                key={cfg.id}
                onClick={() => handleRoleSelect(cfg.id, cfg.respectedLang)}
                className={`group relative rounded-m3-xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border-2 ${
                  isSelected
                    ? `bg-surface-container-lowest ${cfg.borderActive} shadow-xl ring-4 scale-[1.02]`
                    : 'bg-surface-container-low border-outline-variant/50 hover:border-outline hover:bg-surface-container shadow-xs'
                }`}
              >
                <div className="space-y-4">
                  {/* Respected Language Tag Badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-m3-full bg-surface-container-highest text-on-surface font-extrabold text-xs tracking-wide shadow-xs border border-outline-variant/40">
                      <span>{cfg.flag}</span>
                      <span>{cfg.langBadge}</span>
                    </span>

                    {/* Radio Select Ring */}
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

                  {/* Origin Badge */}
                  <div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-m3-full uppercase tracking-wider inline-block ${cfg.bgAccent}`}
                    >
                      {cfg.badge}
                    </span>
                  </div>

                  {/* Icon & Title in Respected Language */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-m3-lg flex items-center justify-center ${cfg.bgAccent} shadow-xs shrink-0`}
                    >
                      <M3Icon name={cfg.icon} filled size={28} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg sm:text-xl font-roboto text-on-surface tracking-tight leading-tight">
                        {cfg.title}
                      </h3>
                    </div>
                  </div>

                  {/* Summary in Respected Language */}
                  <p className="text-xs text-on-surface-variant leading-relaxed min-h-[48px]">
                    {cfg.summary}
                  </p>

                  {/* Workflow Responsibilities in Respected Language */}
                  <div className="space-y-2 pt-3 border-t border-outline-variant/30">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/80 block">
                      {cfg.responsibilitiesLabel}
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

                {/* Bottom Launch Button in Respected Language */}
                <div className="mt-6 pt-4 border-t border-outline-variant/40">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLaunch(cfg.id, cfg.respectedLang);
                    }}
                    className={`w-full py-3 px-4 rounded-m3-full text-xs font-bold font-roboto transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98 ${
                      isSelected
                        ? 'bg-primary text-on-primary hover:bg-[#004FAF] shadow-md'
                        : 'bg-surface-container-highest text-on-surface hover:bg-outline-variant/40'
                    }`}
                  >
                    <span>{cfg.buttonText}</span>
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
