import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { useTranslation } from '../../i18n/LanguageContext';
import type { SupportedLanguage } from '../../i18n/translations';
import { M3Icon } from '../m3/M3Icon';
import { M3Button } from '../m3/M3Button';
import { M3Dialog } from '../m3/M3Dialog';

interface TopAppBarProps {
  splitView: boolean;
  onToggleSplitView: () => void;
  onBackToRoleSelect: () => void;
  onBackToMarketing?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  splitView,
  onToggleSplitView,
  onBackToRoleSelect,
  onBackToMarketing,
}) => {
  const {
    role,
    tour,
    passengers,
    activeSosAlert,
    dismissSOS,
    setSelectedPassenger,
  } = useTour();
  const { language, setLanguage, t } = useTranslation();

  const [travellerListOpen, setTravellerListOpen] = useState(false);

  const flaggedCount = passengers.filter((p) => !p.isPassportValid).length;
  const presentCount = passengers.filter((p) => p.rollCallStatus === 'present').length;

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

      {/* Main Role-Specific Top Bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Left: Role-Specific Identity & Active Tour */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBackToMarketing}
            className={`w-10 h-10 rounded-m3-md flex items-center justify-center shadow-xs shrink-0 cursor-pointer hover:opacity-90 transition-opacity ${
              role === 'agent'
                ? 'bg-primary text-on-primary'
                : role === 'operator'
                ? 'bg-secondary text-on-secondary'
                : 'bg-tertiary text-on-tertiary'
            }`}
            title="Return to TravelFlow Home"
          >
            <M3Icon
              name={
                role === 'agent'
                  ? 'corporate_fare'
                  : role === 'operator'
                  ? 'commute'
                  : 'badge'
              }
              filled
              size={24}
            />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-on-surface truncate">
                {role === 'agent'
                  ? `${tour.agentName}`
                  : role === 'operator'
                  ? `${tour.operatorName}`
                  : `${tour.name} • Guest Pass`}
              </span>

              {/* Role Badge */}
              <span
                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-m3-full hidden sm:inline-block ${
                  role === 'agent'
                    ? 'bg-primary-container text-on-primary-container'
                    : role === 'operator'
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'bg-tertiary-container text-on-tertiary-container'
                }`}
              >
                {role === 'agent'
                  ? 'Origin Agent HQ'
                  : role === 'operator'
                  ? 'Ground DMC Tokyo'
                  : 'Traveler'}
              </span>
            </div>

            {/* Tour Subtitle */}
            <div className="flex items-center gap-2 text-xs text-on-surface-variant truncate">
              <span className="font-mono font-bold text-[11px] px-1.5 py-0.2 rounded-xs bg-surface-container-highest text-on-surface">
                {tour.code}
              </span>
              <span className="truncate text-on-surface-variant hidden md:inline">
                {tour.name}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Role-Relevant Clocks & Indicators */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Agent: Shows Home Time & Destination Flight */}
          {role === 'agent' && (
            <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-m3-full bg-surface-container-high border border-outline-variant/40 text-xs font-roboto">
              <div className="flex items-center gap-1.5 text-on-surface">
                <M3Icon name="home_pin" size={16} className="text-primary" />
                <span className="text-on-surface-variant">Jakarta:</span>
                <span className="font-bold">14:15 WIB</span>
              </div>
              <span className="text-outline-variant">|</span>
              <div className="flex items-center gap-1.5 text-on-surface">
                <M3Icon name="flight_land" size={16} className="text-secondary" />
                <span className="text-on-surface-variant">Tokyo:</span>
                <span className="font-bold text-secondary">16:15 JST (+2h)</span>
              </div>
            </div>
          )}

          {/* Operator: Shows Tokyo Local Time & Chauffeur Gate */}
          {role === 'operator' && (
            <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-m3-full bg-surface-container-high border border-outline-variant/40 text-xs font-roboto">
              <div className="flex items-center gap-1.5 text-on-surface">
                <M3Icon name="schedule" size={16} className="text-secondary" />
                <span className="text-on-surface-variant">現地時間:</span>
                <span className="font-bold text-secondary">16:15 JST</span>
              </div>
              <span className="text-outline-variant">|</span>
              <div className="flex items-center gap-1.5 text-on-surface">
                <M3Icon name="directions_bus" size={16} className="text-primary" />
                <span className="font-bold text-primary">4号車 • 待機中</span>
              </div>
            </div>
          )}

          {/* Traveler: Shows Local Weather & Flight Status */}
          {role === 'traveller' && (
            <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-m3-full bg-surface-container-high border border-outline-variant/40 text-xs font-roboto">
              <div className="flex items-center gap-1.5 text-on-surface">
                <M3Icon name="partly_cloudy_day" size={16} className="text-primary" />
                <span>Tokyo: 19°C Autumn</span>
              </div>
              <span className="text-outline-variant">|</span>
              <div className="flex items-center gap-1.5 text-on-surface">
                <span className="font-bold text-primary">Narita T1 • Pillar #17</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Quick Passenger Detail Drawer Trigger + Clean Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Click to View All Travellers with 1-Click Detail */}
          <button
            onClick={() => setTravellerListOpen(true)}
            className="h-9 px-3 rounded-m3-full bg-surface-container-lowest border border-outline-variant/60 hover:bg-surface-container-high transition-all text-xs font-roboto font-bold text-on-surface flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
            title="Click to view all travellers and inspect details"
          >
            <M3Icon name="groups" size={16} className="text-primary" />
            <span className="hidden sm:inline">Travellers ({passengers.length})</span>
            <span className="sm:hidden">({passengers.length})</span>
            {role === 'agent' && flaggedCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-error" />
            )}
            {role === 'operator' && (
              <span className="text-[10px] text-green-700 bg-green-100 px-1.5 rounded-full font-mono hidden md:inline">
                {presentCount}/{passengers.length}
              </span>
            )}
          </button>

          {/* Tri-Party Sync View Toggle */}
          <M3Button
            variant={splitView ? 'filled' : 'tonal'}
            size="sm"
            icon="splitscreen"
            onClick={onToggleSplitView}
            className="hidden xl:inline-flex"
            title="Side-by-side view"
          >
            <span>{splitView ? 'Single' : 'Tri-Party'}</span>
          </M3Button>

          {/* Switch Role Button */}
          <M3Button
            variant="outlined"
            size="sm"
            icon="swap_horiz"
            onClick={onBackToRoleSelect}
            className="cursor-pointer"
            title="Change active role"
          >
            <span className="hidden sm:inline">{t.roleSelection.changeRoleBtn}</span>
          </M3Button>

          {/* Language Selector Dropdown */}
          <div className="relative flex items-center bg-surface-container-lowest rounded-m3-full border border-outline-variant/60 px-2 py-1 text-xs">
            <M3Icon name="translate" size={16} className="text-primary mr-1" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent font-bold text-xs text-on-surface focus:outline-none cursor-pointer pr-1"
            >
              <option value="en">🇺🇸 EN</option>
              <option value="id">🇮🇩 ID</option>
              <option value="ja">🇯🇵 JA</option>
              <option value="th">🇹🇭 TH</option>
              <option value="zh">🇨🇳 ZH</option>
              <option value="ko">🇰🇷 KO</option>
              <option value="es">🇪🇸 ES</option>
              <option value="hi">🇮🇳 HI</option>
              <option value="ar">🇸🇦 AR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick All-Travellers Modal (Click any traveller to open their full detail profile!) */}
      <M3Dialog
        open={travellerListOpen}
        onClose={() => setTravellerListOpen(false)}
        headline="14 Travellers Manifest"
        supportingText="Click any traveller below to inspect their full passport, rooming, flight, and health details."
        maxWidth="lg"
        actions={
          <M3Button variant="filled" onClick={() => setTravellerListOpen(false)}>
            Close
          </M3Button>
        }
      >
        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {passengers.map((p) => {
            const isExpiringSoon = !p.isPassportValid;
            const isPresent = p.rollCallStatus === 'present';

            return (
              <div
                key={p.id}
                onClick={() => {
                  setTravellerListOpen(false);
                  setSelectedPassenger(p);
                }}
                className="p-3 rounded-m3-md bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/40 flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">
                    {p.gender === 'F' ? '👩' : '👨'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
                        {p.name}
                      </p>
                      {isExpiringSoon && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-xs bg-error text-on-error flex items-center gap-0.5">
                          <M3Icon name="warning" size={10} filled />
                          &lt;6mo
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-on-surface-variant font-mono">
                      Pass: {p.passportNumber} • Room {p.roomNumber} ({p.dietary})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-m3-full ${
                      isPresent
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {isPresent ? 'Present' : 'Missing'}
                  </span>

                  <span className="text-primary font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Detail</span>
                    <M3Icon name="chevron_right" size={16} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </M3Dialog>
    </header>
  );
};
