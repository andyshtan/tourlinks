import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { useTranslation } from '../../i18n/LanguageContext';
import { M3Card } from '../m3/M3Card';
import { M3Button } from '../m3/M3Button';
import { M3Chip } from '../m3/M3Chip';
import { M3Badge } from '../m3/M3Badge';
import { M3Icon } from '../m3/M3Icon';
import { M3Dialog } from '../m3/M3Dialog';
import { getDocumentDirectUrl } from '../../utils/documentUtils';

export const AgentView: React.FC = () => {
  const {
    tour,
    passengers,
    bookingGroups,
    checkpoints,
    incidents,
    settlement,
    approveSettlement,
    nudgePassengerWhatsApp,
    addIncident,
    resolveIncident,
    setSelectedPassenger,
  } = useTour();
  const { t } = useTranslation();

  const [viewMode, setViewMode] = useState<'groups' | 'individuals'>('groups');
  const [filter, setFilter] = useState<'all' | 'flagged' | 'halal' | 'vegetarian'>('all');
  const [search, setSearch] = useState('');
  const [incidentModalOpen, setIncidentModalOpen] = useState(false);
  const [incidentTitle, setIncidentTitle] = useState('');
  const [incidentSeverity, setIncidentSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [copiedPassportId, setCopiedPassportId] = useState<string | null>(null);

  // Filter passengers
  const filteredPassengers = passengers.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.passportNumber.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'flagged') return !p.isPassportValid || p.visaStatus === 'flagged';
    if (filter === 'halal') return p.dietary === 'Halal';
    if (filter === 'vegetarian') return p.dietary === 'Vegetarian';
    return true;
  });

  const flaggedCount = passengers.filter((p) => !p.isPassportValid).length;
  const customsClearedCount = passengers.filter((p) => p.hasClearedCustoms).length;

  const handleCreateIncident = () => {
    if (!incidentTitle.trim()) return;
    addIncident(incidentTitle, incidentSeverity);
    setIncidentTitle('');
    setIncidentModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Compliance Alert */}
      {flaggedCount > 0 && (
        <div className="p-4 rounded-m3-lg bg-tertiary-container text-on-tertiary-container flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs border border-tertiary/20 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
              <M3Icon name="warning" filled size={22} />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base font-roboto">
                {t.agent.passportGuard}: {flaggedCount} Passengers Flagged
              </h4>
              <p className="text-xs sm:text-sm text-on-tertiary-container/90">
                {t.agent.passportAlert}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <M3Button
              variant="outlined"
              size="sm"
              icon="visibility"
              onClick={() => {
                const flagged = passengers.filter((p) => !p.isPassportValid);
                if (flagged.length > 0) setSelectedPassenger(flagged[0]);
              }}
              className="border-tertiary text-on-surface hover:bg-surface-container bg-surface cursor-pointer"
            >
              Inspect Flagged Guest
            </M3Button>
            <M3Button
              variant="filled"
              size="sm"
              icon="notifications_active"
              onClick={() => {
                const flagged = passengers.filter((p) => !p.isPassportValid);
                flagged.forEach((p) => nudgePassengerWhatsApp(p.phone, p.name));
              }}
              className="bg-tertiary text-on-tertiary hover:bg-[#83344f] cursor-pointer"
            >
              {t.agent.nudgeWhatsApp} (All {flaggedCount})
            </M3Button>
          </div>
        </div>
      )}

      {/* Bi-Directional Product Cross-Reference Banner */}
      <div className="p-4 rounded-m3-lg bg-surface-container border border-outline-variant/40 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-m3-md bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
            <M3Icon name="sync_alt" size={22} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-m3-full bg-primary text-on-primary font-mono">
                Retail Package: {tour.agentPackageCode}
              </span>
              <span className="text-sm font-extrabold text-on-surface">
                {tour.agentProductName}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1 flex flex-wrap items-center gap-1.5 font-roboto">
              <span>Operating DMC: <strong className="text-on-surface">{tour.operatorName}</strong></span>
              <span>•</span>
              <span>Ground Land Product: <strong className="text-secondary font-mono">{tour.dmcProductCode}</strong> ({tour.dmcProductName})</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono font-bold text-on-surface-variant bg-surface px-3 py-1.5 rounded-m3-full border border-outline-variant/50">
            {bookingGroups.length} Booking Parties • {passengers.length} Guests
          </span>
        </div>
      </div>

      {/* Flight & Arrival Execution Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Card 1: Outbound Flight Radar */}
        <M3Card variant="elevated" className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-m3-sm bg-primary-container text-on-primary-container">
                  <M3Icon name="flight_takeoff" filled size={20} />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    {t.agent.flightMonitor}
                  </span>
                  <h3 className="font-bold text-lg text-on-surface">
                    {tour.flight.number} • {tour.flight.carrier}
                  </h3>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-m3-full text-xs font-bold bg-[#D4F7DC] text-[#0A6324]">
                {tour.flight.status}
              </span>
            </div>

            <div className="bg-surface-container-low rounded-m3-md p-3.5 my-3 flex items-center justify-between text-xs">
              <div>
                <p className="text-on-surface-variant">{tour.flight.origin}</p>
                <p className="text-base font-bold text-on-surface">{tour.flight.depTime}</p>
              </div>
              <div className="flex flex-col items-center px-4">
                <span className="text-[10px] text-on-surface-variant">Direct Flight</span>
                <div className="w-16 h-0.5 bg-primary relative my-1">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-[10px] text-primary font-bold">7h 20m</span>
              </div>
              <div className="text-right">
                <p className="text-on-surface-variant">{tour.flight.destination}</p>
                <p className="text-base font-bold text-on-surface">{tour.flight.arrTime}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-on-surface-variant mt-3">
              <div className="p-2 rounded-m3-sm bg-surface-container">
                <span className="block text-[10px] uppercase font-bold text-on-surface-variant/70">
                  Terminal
                </span>
                <span className="font-semibold text-on-surface">{tour.flight.terminal}</span>
              </div>
              <div className="p-2 rounded-m3-sm bg-surface-container">
                <span className="block text-[10px] uppercase font-bold text-on-surface-variant/70">
                  Baggage Belt
                </span>
                <span className="font-semibold text-on-surface">{tour.flight.belt}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs">
            <span className="text-on-surface-variant">Arrival Clearance:</span>
            <span className="font-bold text-primary">
              {customsClearedCount} of {passengers.length} Guests Cleared Customs
            </span>
          </div>
        </M3Card>

        {/* Card 2: Overseas DMC Ground Operator */}
        <M3Card variant="elevated" className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-m3-sm bg-secondary-container text-on-secondary-container">
                  <M3Icon name="support_agent" filled size={20} />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Authorized Overseas DMC
                  </span>
                  <h3 className="font-bold text-base text-on-surface truncate">
                    {tour.operatorName}
                  </h3>
                </div>
              </div>
              <M3Badge label="Tokyo HQ" variant="secondary" />
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="flex items-center gap-3 p-2.5 rounded-m3-md bg-surface-container-low">
                <img
                  src={tour.staff.guidePhoto}
                  alt={tour.staff.guideName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-secondary/30"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-on-surface text-sm">{tour.staff.guideName}</p>
                  <p className="text-on-surface-variant text-[11px]">
                    Lead Guide ({tour.staff.guideLanguages.join(', ')})
                  </p>
                </div>
                <M3Button
                  variant="tonal"
                  size="sm"
                  icon="chat"
                  onClick={() => window.open(`https://wa.me/${tour.staff.guidePhone}`, '_blank')}
                >
                  WhatsApp
                </M3Button>
              </div>

              <div className="p-2.5 rounded-m3-md bg-surface-container-low flex items-center justify-between">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-on-surface-variant/70">
                    Dedicated Chauffeur & Vehicle
                  </span>
                  <span className="font-semibold text-on-surface">
                    {tour.staff.driverName} • {tour.staff.vehicleModel}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-m3-xs bg-surface-container text-primary">
                  {tour.staff.vehiclePlate}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs">
            <span className="text-on-surface-variant">Hotel Allocation:</span>
            <span className="font-semibold text-on-surface truncate">{tour.hotel.name}</span>
          </div>
        </M3Card>

        {/* Card 3: Checkpoint Progress Stream */}
        <M3Card variant="elevated" className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-m3-sm bg-primary-container text-on-primary-container">
                  <M3Icon name="alt_route" filled size={20} />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    {t.agent.checkpointProgress}
                  </span>
                  <h3 className="font-bold text-base text-on-surface">Live Arrival Handshake</h3>
                </div>
              </div>
              <span className="text-xs font-bold text-secondary">Step 3 of 4</span>
            </div>

            <div className="space-y-3 mt-3">
              {checkpoints.map((cp, idx) => {
                const isDone = cp.status === 'completed';
                const isCurrent = cp.status === 'in_progress';

                return (
                  <div key={cp.id} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isDone
                            ? 'bg-primary text-on-primary'
                            : isCurrent
                            ? 'bg-secondary-container text-on-secondary-container ring-2 ring-secondary animate-pulse'
                            : 'bg-surface-container-highest text-on-surface-variant'
                        }`}
                      >
                        {isDone ? <M3Icon name="check" size={14} /> : idx + 1}
                      </div>
                      {idx < checkpoints.length - 1 && (
                        <div
                          className={`w-0.5 h-6 my-0.5 ${
                            isDone ? 'bg-primary' : 'bg-outline-variant/50'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 -mt-0.5">
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-xs font-bold ${
                            isCurrent
                              ? 'text-secondary'
                              : isDone
                              ? 'text-on-surface'
                              : 'text-on-surface-variant/60'
                          }`}
                        >
                          {t.operator[cp.labelKey]}
                        </p>
                        <span className="text-[11px] font-mono text-on-surface-variant">
                          {cp.time}
                        </span>
                      </div>
                      <p className="text-[10px] text-on-surface-variant/80 truncate">
                        {cp.updatedBy}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs">
            <span className="text-on-surface-variant">Auto Sync:</span>
            <span className="text-primary font-bold inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping inline-block" />
              Real-time Ground Stream
            </span>
          </div>
        </M3Card>
      </div>

      {/* Standardized Digital Manifest & Passenger Compliance Table */}
      <M3Card variant="elevated" className="p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg font-roboto text-on-surface">
                {t.agent.manifestTitle}
              </h3>
              <M3Badge label={`${bookingGroups.length} Groups • ${passengers.length} Travellers`} variant="primary" />
            </div>
            <p className="text-xs text-on-surface-variant">{t.agent.manifestDesc}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Toggle: Groups vs Individuals */}
            <div className="flex items-center bg-surface-container-high rounded-m3-full p-1 border border-outline-variant/60">
              <button
                onClick={() => setViewMode('groups')}
                className={`px-3 py-1 rounded-m3-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'groups'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <M3Icon name="groups" size={15} />
                <span>By Group ({bookingGroups.length})</span>
              </button>
              <button
                onClick={() => setViewMode('individuals')}
                className={`px-3 py-1 rounded-m3-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'individuals'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <M3Icon name="person" size={15} />
                <span>All Guests ({passengers.length})</span>
              </button>
            </div>

            {/* Search & Quick Filter Chips */}
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="h-8 pl-8 pr-3 text-xs rounded-m3-full bg-surface-container border border-outline-variant text-on-surface focus:outline-none focus:border-primary w-36 sm:w-44"
              />
              <span className="absolute left-2.5 top-2 text-on-surface-variant">
                <M3Icon name="search" size={16} />
              </span>
            </div>

            <M3Chip
              label="All"
              selected={filter === 'all'}
              onClick={() => setFilter('all')}
            />
            <M3Chip
              label={`Flagged (${flaggedCount})`}
              selected={filter === 'flagged'}
              onClick={() => setFilter('flagged')}
              className={flaggedCount > 0 ? 'text-error border-error/50' : ''}
            />
            <M3Chip
              label="Halal (8)"
              selected={filter === 'halal'}
              onClick={() => setFilter('halal')}
            />
          </div>
        </div>

        {/* 1. Group / Family Parties View */}
        {viewMode === 'groups' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookingGroups.map((group) => {
              const members = passengers.filter((p) => p.groupId === group.id);
              const groupHasFlagged = members.some((p) => !p.isPassportValid);
              const allPresent = members.every((p) => p.rollCallStatus === 'present');
              const leadGuest = members.find((p) => p.isGroupLead) || members[0];

              return (
                <div
                  key={group.id}
                  className={`rounded-m3-lg border p-4 transition-all shadow-xs flex flex-col justify-between gap-3 ${
                    groupHasFlagged
                      ? 'bg-tertiary-container/15 border-tertiary/40'
                      : 'bg-surface-container-low border-outline-variant/50 hover:border-primary/50'
                  }`}
                >
                  <div>
                    {/* Group Header */}
                    <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-outline-variant/30">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm sm:text-base text-on-surface flex items-center gap-1.5">
                            <M3Icon name="family_restroom" size={18} className="text-primary" />
                            <span>{group.groupName}</span>
                          </h4>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {group.bookingRef}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          Lead: <strong className="text-on-surface">{leadGuest.name}</strong> • {group.roomNumbers.join(', ')}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface">
                          {group.paxCount} Pax
                        </span>
                        {groupHasFlagged && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-error text-on-error flex items-center gap-0.5">
                            <M3Icon name="warning" size={11} filled />
                            Flagged
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Member Rows */}
                    <div className="divide-y divide-outline-variant/20 pt-2 space-y-1">
                      {members.map((m) => {
                        const mExpiring = !m.isPassportValid;
                        return (
                          <div
                            key={m.id}
                            onClick={() => setSelectedPassenger(m)}
                            className="py-1.5 px-2 rounded-m3-xs hover:bg-surface-container transition-colors flex items-center justify-between cursor-pointer group/m"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-xs">{m.gender === 'F' ? '👩' : '👨'}</span>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-xs text-on-surface group-hover/m:text-primary transition-colors truncate">
                                    {m.name}
                                  </span>
                                  <span className="text-[9px] font-mono px-1 rounded-xs bg-surface-container-high text-on-surface-variant">
                                    {m.groupRole}
                                  </span>
                                  {mExpiring && (
                                    <span className="text-[9px] font-bold text-error bg-error-container px-1 rounded-xs">
                                      &lt;6mo
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-on-surface-variant font-mono block truncate">
                                  Pass: {m.passportNumber} • Seat {m.seatNumber || '14K'} • {m.dietary}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => {
                                  const url = getDocumentDirectUrl(m.id, 'passport');
                                  if (navigator.clipboard) {
                                    navigator.clipboard.writeText(url);
                                    setCopiedPassportId(m.id);
                                    setTimeout(() => setCopiedPassportId(null), 2000);
                                  }
                                }}
                                className="px-2 py-0.5 rounded-m3-full text-[10px] font-bold bg-surface border border-outline-variant/60 hover:bg-surface-container text-on-surface cursor-pointer"
                                title="Copy passenger document copy link"
                              >
                                {copiedPassportId === m.id ? '✓' : 'Doc ↗'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Group Action Footer */}
                  <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-on-surface-variant font-mono">
                      {allPresent ? '✓ All Members Present' : 'Roll call in progress'}
                    </span>
                    <button
                      onClick={() => nudgePassengerWhatsApp(leadGuest.phone, leadGuest.name)}
                      className="px-2.5 py-1 rounded-m3-full bg-primary/10 hover:bg-primary/20 text-primary font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                      title="Send WhatsApp update to Group Leader"
                    >
                      <M3Icon name="chat" size={13} />
                      <span>WhatsApp Leader</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* 2. Individual Passenger Table View */
          <div className="overflow-x-auto rounded-m3-md border border-outline-variant/40">
            <table className="w-full text-left text-xs font-roboto">
              <thead className="bg-surface-container text-on-surface-variant uppercase font-bold text-[10px] tracking-wider border-b border-outline-variant/40">
                <tr>
                  <th className="px-4 py-3">Guest Name</th>
                  <th className="px-3 py-3">Booking Group (Ref)</th>
                  <th className="px-3 py-3">Passport & Validity</th>
                  <th className="px-3 py-3">Japan Visa Status</th>
                  <th className="px-3 py-3">Room Assignment</th>
                  <th className="px-3 py-3">Dietary Requirements</th>
                  <th className="px-3 py-3 text-center">Customs Status</th>
                  <th className="px-3 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
              {filteredPassengers.map((p) => {
                const isExpiringSoon = !p.isPassportValid;

                return (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedPassenger(p)}
                    className={`hover:bg-primary-container/20 transition-colors cursor-pointer group ${
                      isExpiringSoon ? 'bg-tertiary-container/15' : ''
                    }`}
                    title="Click to view full passenger dossier"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-bold shrink-0 ring-1 ring-primary/20">
                          {p.gender === 'F' ? '👩' : '👨'}
                        </div>
                        <div>
                          <div className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors flex items-center gap-1">
                            <span>{p.name}</span>
                            <M3Icon name="open_in_new" size={13} className="opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
                          </div>
                          <span className="text-[11px] text-on-surface-variant font-mono">
                            {p.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="font-bold text-on-surface block truncate max-w-[130px]">{p.groupName}</span>
                      <span className="font-mono text-[10px] text-primary font-bold">{p.bookingRef}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-medium text-on-surface">
                          {p.passportNumber}
                        </span>
                        <a
                          href={getDocumentDirectUrl(p.id, 'passport')}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[10px] font-bold text-primary hover:underline inline-flex items-center gap-0.5 bg-primary/10 px-1.5 py-0.5 rounded cursor-pointer"
                          title="Open official passport scan link"
                        >
                          <M3Icon name="description" size={11} />
                          <span>Copy ↗</span>
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded-xs ${
                            isExpiringSoon
                              ? 'bg-error-container text-on-error-container'
                              : 'bg-surface-container text-on-surface-variant'
                          }`}
                        >
                          Exp: {p.passportExpiry}
                        </span>
                        {isExpiringSoon && (
                          <span className="text-[10px] text-error font-bold flex items-center gap-0.5">
                            <M3Icon name="warning" size={12} filled />
                            &lt; 6 Months
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-m3-full text-[11px] font-bold ${
                          p.visaStatus === 'approved'
                            ? 'bg-[#D4F7DC] text-[#0A6324]'
                            : p.visaStatus === 'flagged'
                            ? 'bg-error-container text-on-error-container'
                            : 'bg-secondary-container text-on-secondary-container'
                        }`}
                      >
                        <M3Icon
                          name={
                            p.visaStatus === 'approved'
                              ? 'check_circle'
                              : p.visaStatus === 'flagged'
                              ? 'error'
                              : 'schedule'
                          }
                          size={14}
                        />
                        {p.visaStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-medium text-on-surface">Room {p.roomNumber}</div>
                      <span className="text-[11px] text-on-surface-variant">
                        {p.roomType} Bed
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-m3-full text-[11px] font-semibold ${
                          p.dietary === 'Halal'
                            ? 'bg-primary-container text-on-primary-container'
                            : p.dietary === 'Vegetarian'
                            ? 'bg-secondary-container text-on-secondary-container'
                            : p.dietary === 'Allergy'
                            ? 'bg-error-container text-on-error-container'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        {p.dietary}
                      </span>
                      {p.dietaryNotes && (
                        <p className="text-[10px] text-on-surface-variant mt-0.5 truncate max-w-xs">
                          {p.dietaryNotes}
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center">
                      {p.hasClearedCustoms ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-m3-full border border-green-200">
                          <M3Icon name="done_all" size={14} /> Cleared
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-orange-700 bg-orange-50 px-2 py-0.5 rounded-m3-full border border-orange-200">
                          <M3Icon name="hourglass_top" size={14} /> In Customs
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <div
                        className="flex items-center justify-end gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            const url = getDocumentDirectUrl(p.id, 'passport');
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(url);
                              setCopiedPassportId(p.id);
                              setTimeout(() => setCopiedPassportId(null), 2000);
                            }
                          }}
                          className={`px-2 py-1 rounded-m3-full text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer transition-all border shadow-xs ${
                            copiedPassportId === p.id
                              ? 'bg-green-600 text-white border-green-600'
                              : 'bg-surface-container hover:bg-surface-container-high text-on-surface border-outline-variant/60'
                          }`}
                          title="Copy direct shareable document link"
                        >
                          <M3Icon
                            name={copiedPassportId === p.id ? 'done' : 'link'}
                            size={12}
                            className={copiedPassportId === p.id ? 'text-white' : 'text-primary'}
                          />
                          <span>{copiedPassportId === p.id ? 'Copied' : 'Doc Link'}</span>
                        </button>

                        <button
                          onClick={() => setSelectedPassenger(p)}
                          className="px-2.5 py-1 rounded-m3-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer transition-all border border-outline-variant/60"
                          title="View full passenger dossier"
                        >
                          <M3Icon name="visibility" size={13} className="text-primary" />
                          <span>Detail</span>
                        </button>
                        {isExpiringSoon ? (
                          <button
                            onClick={() => nudgePassengerWhatsApp(p.phone, p.name)}
                            className="px-2.5 py-1 rounded-m3-full bg-tertiary text-on-tertiary font-bold text-[11px] hover:bg-[#83344f] transition-all inline-flex items-center gap-1 cursor-pointer"
                            title="Nudge via WhatsApp"
                          >
                            <M3Icon name="chat" size={12} />
                            Nudge
                          </button>
                        ) : (
                          <button
                            onClick={() => nudgePassengerWhatsApp(p.phone, p.name)}
                            className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
                            title="Message via WhatsApp"
                          >
                            <M3Icon name="chat" size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </M3Card>

      {/* Lower Row: Cross-Border Incident Hub & Financial Settlement Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Shared Incident Desk */}
        <M3Card variant="elevated" className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-m3-sm bg-tertiary-container text-on-tertiary-container">
                  <M3Icon name="report" filled size={20} />
                </span>
                <div>
                  <h3 className="font-bold text-base text-on-surface">
                    {t.agent.incidentHub}
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Tri-party shared log between Agent HQ, Overseas DMC & Travellers
                  </p>
                </div>
              </div>
              <M3Button
                variant="tonal"
                size="sm"
                icon="add"
                onClick={() => setIncidentModalOpen(true)}
              >
                {t.agent.reportIncident}
              </M3Button>
            </div>

            <div className="space-y-3">
              {incidents.map((inc) => (
                <div
                  key={inc.id}
                  className="p-3 rounded-m3-md bg-surface-container-low border border-outline-variant/40 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-primary">{inc.id}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded-xs text-[10px] font-bold uppercase ${
                          inc.severity === 'high' || inc.severity === 'critical'
                            ? 'bg-error text-on-error'
                            : 'bg-tertiary-container text-on-tertiary-container'
                        }`}
                      >
                        {inc.severity}
                      </span>
                      <span className="text-[10px] text-on-surface-variant">
                        Logged by {inc.reportedBy} ({inc.timestamp})
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-m3-full ${
                        inc.status === 'resolved'
                          ? 'bg-[#D4F7DC] text-[#0A6324]'
                          : 'bg-primary-container text-on-primary-container'
                      }`}
                    >
                      {inc.status.toUpperCase()}
                    </span>
                  </div>

                  <p className="font-bold text-xs text-on-surface">{inc.title}</p>

                  <div className="text-[11px] text-on-surface-variant space-y-1 bg-surface-container p-2 rounded-m3-sm">
                    {inc.notes.map((note, idx) => (
                      <p key={idx} className="flex items-start gap-1">
                        <span>•</span>
                        <span>{note}</span>
                      </p>
                    ))}
                  </div>

                  {inc.status !== 'resolved' && (
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => resolveIncident(inc.id)}
                        className="text-xs font-bold text-primary hover:underline cursor-pointer"
                      >
                        Mark as Resolved
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-on-surface-variant mt-4 pt-2 border-t border-outline-variant/30 text-center">
            Incidents automatically notify all 3 parties in real time to avoid disputes.
          </p>
        </M3Card>

        {/* DMC Settlement & Invoicing */}
        <M3Card variant="elevated" className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-m3-sm bg-primary-container text-on-primary-container">
                  <M3Icon name="receipt_long" filled size={20} />
                </span>
                <div>
                  <h3 className="font-bold text-base text-on-surface">
                    {t.agent.settlementTitle}
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Agreed contract rates, verified extra hours & proof of service
                  </p>
                </div>
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-m3-full ${
                  settlement.isSettled
                    ? 'bg-[#D4F7DC] text-[#0A6324]'
                    : 'bg-secondary-container text-on-secondary-container'
                }`}
              >
                {settlement.isSettled ? t.agent.invoiceApproved : 'Pending Sign-Off'}
              </span>
            </div>

            <div className="p-3.5 rounded-m3-md bg-surface-container-low border border-outline-variant/40 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant">{t.agent.netRateTotal} (6D5N Coach + Hotels)</span>
                <span className="font-bold text-sm text-on-surface">
                  ${settlement.baseNetRate.toLocaleString()} {settlement.currency}
                </span>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-outline-variant/30">
                <span className="text-[11px] font-bold text-on-surface-variant block">
                  {t.agent.extraCharges}:
                </span>
                {settlement.extraCharges.map((ex) => (
                  <div key={ex.id} className="flex justify-between text-xs text-on-surface">
                    <span className="text-on-surface-variant flex items-center gap-1">
                      <M3Icon name="check" size={14} className="text-primary" />
                      {ex.description}
                    </span>
                    <span className="font-mono font-medium">+${ex.amount}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-outline-variant/30 flex justify-between items-center">
                <span className="font-bold text-sm text-on-surface">Total Authorized Payout:</span>
                <span className="font-extrabold text-base text-primary font-mono">
                  $
                  {(
                    settlement.baseNetRate +
                    settlement.extraCharges.reduce((acc, c) => acc + c.amount, 0)
                  ).toLocaleString()}{' '}
                  {settlement.currency}
                </span>
              </div>
            </div>

            {/* Operator Proof Photos */}
            <div className="mt-4">
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-2">
                Operator Service Proof & Receipts
              </span>
              <div className="flex gap-2">
                {settlement.proofImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Proof"
                    className="w-16 h-16 rounded-m3-sm object-cover border border-outline-variant cursor-pointer hover:opacity-90"
                    title="Click to inspect arrival proof"
                  />
                ))}
                <div className="flex-1 p-2 rounded-m3-sm bg-surface-container flex flex-col justify-center text-[10px] text-on-surface-variant">
                  <span className="font-bold text-on-surface">Digitally Certified:</span>
                  <span>{settlement.operatorSignedAt}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-outline-variant/30">
            {settlement.isSettled ? (
              <div className="flex items-center gap-2 text-xs font-bold text-green-700 bg-green-50 p-2.5 rounded-m3-md border border-green-200">
                <M3Icon name="verified" filled size={18} />
                <span>{settlement.agentApprovedAt}</span>
              </div>
            ) : (
              <M3Button
                variant="filled"
                fullWidth
                icon="check_circle"
                onClick={approveSettlement}
              >
                {t.agent.approveInvoice}
              </M3Button>
            )}
          </div>
        </M3Card>
      </div>

      {/* Incident Modal */}
      <M3Dialog
        open={incidentModalOpen}
        onClose={() => setIncidentModalOpen(false)}
        icon="report_problem"
        headline="Log Shared Outbound Incident"
        supportingText="This ticket will be immediately visible to both the Tokyo Ground DMC and Agent HQ."
        actions={
          <>
            <M3Button variant="text" onClick={() => setIncidentModalOpen(false)}>
              Cancel
            </M3Button>
            <M3Button variant="filled" onClick={handleCreateIncident}>
              Submit Incident Ticket
            </M3Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-on-surface-variant uppercase block mb-1">
              Incident Summary
            </label>
            <input
              type="text"
              value={incidentTitle}
              onChange={(e) => setIncidentTitle(e.target.value)}
              placeholder="e.g. Flight delay / Passport issue / Medical request..."
              className="w-full p-2.5 rounded-m3-sm bg-surface border border-outline-variant text-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface-variant uppercase block mb-1">
              Severity Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['low', 'medium', 'high', 'critical'] as const).map((sev) => (
                <button
                  key={sev}
                  type="button"
                  onClick={() => setIncidentSeverity(sev)}
                  className={`py-1.5 px-2 rounded-m3-sm text-xs font-bold uppercase cursor-pointer border ${
                    incidentSeverity === sev
                      ? 'bg-primary text-on-primary border-primary'
                      : 'bg-surface text-on-surface border-outline-variant hover:bg-surface-container'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>
        </div>
      </M3Dialog>
    </div>
  );
};
