import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { useTranslation } from '../../i18n/LanguageContext';
import { M3Card } from '../m3/M3Card';
import { M3Button } from '../m3/M3Button';
import { M3Badge } from '../m3/M3Badge';
import { M3Icon } from '../m3/M3Icon';
import { M3Avatar } from '../m3/M3Avatar';

type LeaderTab = 'today' | 'rollcall' | 'rooming' | 'issues';

export const TourLeaderView: React.FC = () => {
  const {
    tour,
    passengers,
    bookingGroups,
    checkpoints,
    itinerary,
    gatheringPin,
    incidents,
    settlement,
    advanceCheckpoint,
    updateRollCall,
    updateGroupRollCall,
    toggleGatheringPin,
    addIncident,
    confirmExtraByLeader,
    setSelectedPassenger,
  } = useTour();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<LeaderTab>('today');
  const [incidentTitle, setIncidentTitle] = useState('');
  const [incidentSeverity, setIncidentSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');

  const presentCount = passengers.filter((p) => p.rollCallStatus === 'present').length;
  const missing = passengers.filter((p) => p.rollCallStatus === 'missing');
  const notThroughCustoms = passengers.filter((p) => !p.hasClearedCustoms);
  const currentCheckpoint = checkpoints.find((c) => c.status === 'in_progress');
  const openIncidents = incidents.filter((inc) => inc.status !== 'resolved');
  const extrasToConfirm = settlement.extraCharges.filter((e) => !e.leaderConfirmed);

  // Rooming list: one row per room
  const rooms = Array.from(new Set(passengers.map((p) => p.roomNumber)))
    .sort()
    .map((roomNumber) => {
      const guests = passengers.filter((p) => p.roomNumber === roomNumber);
      return { roomNumber, roomType: guests[0].roomType, guests };
    });

  const dietaryCounts = passengers.reduce<Record<string, number>>((acc, p) => {
    acc[p.dietary] = (acc[p.dietary] || 0) + 1;
    return acc;
  }, {});

  const handleCreateIncident = () => {
    if (!incidentTitle.trim()) return;
    addIncident(incidentTitle, incidentSeverity);
    setIncidentTitle('');
  };

  const tabs: { id: LeaderTab; icon: string; label: string; count?: number }[] = [
    { id: 'today', icon: 'flight_land', label: t.leader.tabToday },
    { id: 'rollcall', icon: 'checklist', label: `${t.leader.tabRollCall} (${presentCount}/${passengers.length})` },
    { id: 'rooming', icon: 'hotel', label: t.leader.tabRooming },
    { id: 'issues', icon: 'report', label: t.leader.tabIssues, count: openIncidents.length + extrasToConfirm.length },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Header: who the tour leader is and what they run */}
      <div className="p-5 rounded-m3-xl bg-leader text-on-leader shadow-md space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-m3-full text-xs font-bold bg-leader-container text-on-leader-container">
                {t.leader.badge}
              </span>
              <span className="text-xs text-on-leader/80 font-mono">{tour.code}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-roboto tracking-tight">
              {tour.staff.tourLeaderName}
            </h2>
            <p className="text-xs sm:text-sm text-on-leader/90 mt-0.5">
              {tour.agentName} • {tour.agentProductName}
            </p>
          </div>
          <div className="text-right text-xs shrink-0">
            <p className="font-mono font-bold bg-black/20 px-2.5 py-1 rounded-m3-full">16:15 JST</p>
            <p className="mt-1.5 text-on-leader/80">{tour.dates}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-m3-md bg-white/15">
            <p className="text-lg font-extrabold font-mono">{passengers.length}</p>
            <p className="text-on-leader/80">Guests • {bookingGroups.length} parties</p>
          </div>
          <div className="p-2 rounded-m3-md bg-white/15">
            <p className="text-lg font-extrabold font-mono">
              {passengers.length - notThroughCustoms.length}/{passengers.length}
            </p>
            <p className="text-on-leader/80">Through customs</p>
          </div>
          <div className="p-2 rounded-m3-md bg-white/15">
            <p className="text-lg font-extrabold font-mono">{openIncidents.length}</p>
            <p className="text-on-leader/80">Open incidents</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-outline-variant/40">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`h-10 px-4 rounded-m3-full text-xs sm:text-sm font-roboto font-bold transition-all inline-flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === tab.id
                ? 'bg-leader-container text-on-leader-container shadow-xs'
                : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <M3Icon name={tab.icon} size={18} />
            {tab.label}
            {tab.count ? (
              <span className="min-w-5 h-5 px-1 rounded-full bg-error text-on-error text-[10px] font-bold inline-flex items-center justify-center">
                {tab.count}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {/* TAB 1: ARRIVAL HANDOVER & TODAY */}
      {activeTab === 'today' && (
        <div className="space-y-5">
          <M3Card variant="elevated" className="p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-lg text-on-surface">Airport Handover to Local Guide</h3>
                <p className="text-xs text-on-surface-variant">
                  You lead the group out of customs; the guide and driver take over at the meeting point.
                </p>
              </div>
              <M3Badge
                label={`Step ${checkpoints.filter((c) => c.status === 'completed').length + (currentCheckpoint ? 1 : 0)} of ${checkpoints.length}`}
                variant="surface"
              />
            </div>

            <div className="space-y-2">
              {checkpoints.map((cp) => {
                const isDone = cp.status === 'completed';
                const isCurrent = cp.status === 'in_progress';
                return (
                  <div
                    key={cp.id}
                    className={`p-3 rounded-m3-md border flex items-center justify-between gap-3 text-xs ${
                      isCurrent
                        ? 'border-leader bg-leader-container/30'
                        : isDone
                        ? 'border-green-300 bg-green-50/60'
                        : 'border-outline-variant/50 bg-surface-container-low opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          isDone
                            ? 'bg-green-600 text-white'
                            : isCurrent
                            ? 'bg-leader text-on-leader'
                            : 'bg-surface-container-highest text-on-surface-variant'
                        }`}
                      >
                        <M3Icon name={isDone ? 'check' : isCurrent ? 'more_horiz' : 'schedule'} size={14} />
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-on-surface">{t.operator[cp.labelKey]}</p>
                        <p className="text-on-surface-variant truncate">{cp.updatedBy}</p>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-on-surface shrink-0">{cp.time}</span>
                  </div>
                );
              })}
            </div>

            {notThroughCustoms.length > 0 && (
              <div className="p-3 rounded-m3-md bg-error-container/40 border border-error/40 text-xs space-y-2">
                <p className="font-bold text-on-error-container flex items-center gap-1.5">
                  <M3Icon name="hourglass_top" size={16} />
                  Still in immigration or customs ({notThroughCustoms.length})
                </p>
                {notThroughCustoms.map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedPassenger(p)}
                      className="font-semibold text-on-surface hover:underline cursor-pointer text-left"
                    >
                      {p.name}
                      {!p.isPassportValid && (
                        <span className="font-normal text-on-surface-variant"> • short passport validity</span>
                      )}
                    </button>
                    <button
                      onClick={() => window.open(`https://wa.me/${p.phone.replace(/[^0-9]/g, '')}`, '_blank')}
                      className="px-2.5 py-1 rounded-m3-full bg-surface text-on-surface border border-outline-variant/60 font-bold inline-flex items-center gap-1 cursor-pointer hover:bg-surface-container"
                    >
                      <M3Icon name="chat" size={14} />
                      WhatsApp
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              disabled={currentCheckpoint?.id !== 'customs_meet'}
              onClick={() => advanceCheckpoint(`${tour.staff.tourLeaderName} (Tour Leader)`)}
              className="w-full h-12 rounded-m3-full bg-leader text-on-leader font-roboto font-bold text-sm inline-flex items-center justify-center gap-2 shadow-md cursor-pointer hover:bg-[#6F4000] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <M3Icon name="handshake" size={20} />
              {t.leader.groupThroughBtn}
            </button>
          </M3Card>

          {/* Meeting point + ground contacts */}
          <M3Card variant="elevated" className="p-5 space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-leader">Meeting Point</span>
              <h3 className="font-bold text-base text-on-surface">{tour.meetingPoint.pillar}</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">{tour.meetingPoint.instructions}</p>
            </div>
            <img
              src={tour.meetingPoint.mapUrl}
              alt={`Map of the meeting point: ${tour.meetingPoint.zone}, ${tour.meetingPoint.pillar}`}
              className="w-full max-w-xl mx-auto rounded-m3-md border border-outline-variant/40"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-m3-md bg-surface-container-low border border-outline-variant/30 flex items-center gap-3">
                <M3Avatar name={tour.staff.guideName} size={44} />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Local guide</span>
                  <p className="font-bold text-sm text-on-surface">{tour.staff.guideName}</p>
                  <p className="text-on-surface-variant truncate">{tour.staff.guideLanguages.join(', ')}</p>
                </div>
                <M3Button
                  variant="tonal"
                  size="sm"
                  icon="chat"
                  onClick={() => window.open(`https://wa.me/${tour.staff.guidePhone.replace(/[^0-9]/g, '')}`, '_blank')}
                >
                  WhatsApp
                </M3Button>
              </div>

              <div className="p-3 rounded-m3-md bg-surface-container-low border border-outline-variant/30 flex items-center gap-3">
                <M3Avatar name={tour.staff.driverName} size={44} />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Driver & coach</span>
                  <p className="font-bold text-sm text-on-surface">{tour.staff.driverName}</p>
                  <p className="text-on-surface-variant truncate">
                    {tour.staff.vehicleModel} • <span className="font-mono">{tour.staff.vehiclePlate}</span>
                  </p>
                </div>
                <M3Button
                  variant="tonal"
                  size="sm"
                  icon="call"
                  onClick={() => window.open(`tel:${tour.staff.driverPhone}`)}
                >
                  Call
                </M3Button>
              </div>
            </div>
          </M3Card>

          {/* Today's run sheet + gathering point */}
          <M3Card variant="elevated" className="p-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-bold text-base text-on-surface">Today's Run Sheet</h3>
              <M3Button
                variant={gatheringPin.isActive ? 'outlined' : 'tonal'}
                size="sm"
                icon={gatheringPin.isActive ? 'stop_circle' : 'pin_drop'}
                onClick={toggleGatheringPin}
              >
                {gatheringPin.isActive ? `Gathering at ${gatheringPin.targetTime}` : 'Set Gathering Point'}
              </M3Button>
            </div>

            <div className="space-y-2">
              {itinerary
                .filter((item) => item.day === 1)
                .map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-m3-md border text-xs ${
                      item.status === 'current'
                        ? 'border-leader bg-leader-container/25'
                        : item.status === 'completed'
                        ? 'border-outline-variant/30 bg-surface-container-low opacity-70'
                        : 'border-outline-variant/40 bg-surface'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono font-bold text-leader">{item.time} JST</span>
                      {item.delayMinutes > 0 && (
                        <span className="text-[10px] font-bold text-error bg-error-container px-1.5 py-0.5 rounded-m3-xs">
                          +{item.delayMinutes}m
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-on-surface">{item.title}</p>
                    <p className="text-on-surface-variant mt-0.5">{item.description}</p>
                  </div>
                ))}
            </div>
          </M3Card>
        </div>
      )}

      {/* TAB 2: ROLL CALL */}
      {activeTab === 'rollcall' && (
        <M3Card variant="elevated" className="p-5 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h3 className="font-bold text-lg text-on-surface">{t.leader.tabRollCall}</h3>
              <p className="text-xs text-on-surface-variant">
                Tap a party to check everyone in, or a name to change one guest.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-m3-full text-xs font-bold bg-green-100 text-green-800">
                {t.operator.present}: {presentCount}
              </span>
              <span className="px-3 py-1 rounded-m3-full text-xs font-bold bg-red-100 text-red-800">
                {t.operator.missing}: {missing.length}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bookingGroups.map((group) => {
              const members = passengers.filter((p) => p.groupId === group.id);
              const allPresent = members.every((p) => p.rollCallStatus === 'present');

              return (
                <div
                  key={group.id}
                  className={`p-3.5 rounded-m3-lg border space-y-2.5 ${
                    allPresent
                      ? 'bg-surface-container-low border-outline-variant/50'
                      : 'bg-error-container/15 border-error/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-on-surface truncate">{group.groupName}</h4>
                      <p className="text-[11px] text-on-surface-variant">{group.roomNumbers.join(', ')}</p>
                    </div>
                    <button
                      onClick={() => updateGroupRollCall(group.id, allPresent ? 'missing' : 'present')}
                      className={`px-3 py-1.5 rounded-m3-full text-xs font-bold cursor-pointer transition-all inline-flex items-center gap-1 shrink-0 ${
                        allPresent
                          ? 'bg-green-100 text-green-800'
                          : 'bg-green-600 text-white hover:bg-green-700 shadow-xs'
                      }`}
                    >
                      <M3Icon name={allPresent ? 'check_circle' : 'done_all'} size={15} />
                      {allPresent ? 'All here' : 'Check in party'}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {members.map((m) => {
                      const isPresent = m.rollCallStatus === 'present';
                      return (
                        <button
                          key={m.id}
                          onClick={() => updateRollCall(m.id, isPresent ? 'missing' : 'present')}
                          className={`px-2.5 py-1 rounded-m3-full text-xs font-semibold cursor-pointer border inline-flex items-center gap-1 ${
                            isPresent
                              ? 'bg-surface text-on-surface border-outline-variant/60'
                              : 'bg-error text-on-error border-error'
                          }`}
                        >
                          <M3Icon name={isPresent ? 'check' : 'priority_high'} size={13} />
                          {m.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {missing.length > 0 && (
            <div className="p-3 rounded-m3-md bg-surface-container border border-outline-variant/40 text-xs space-y-2">
              <p className="font-bold text-on-surface">Not yet accounted for</p>
              {missing.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-2">
                  <span className="text-on-surface">
                    <strong>{p.name}</strong>{' '}
                    <span className="text-on-surface-variant font-mono">{p.phone}</span>
                  </span>
                  <button
                    onClick={() => window.open(`https://wa.me/${p.phone.replace(/[^0-9]/g, '')}`, '_blank')}
                    className="px-2.5 py-1 rounded-m3-full bg-leader-container text-on-leader-container font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <M3Icon name="chat" size={14} />
                    WhatsApp
                  </button>
                </div>
              ))}
            </div>
          )}
        </M3Card>
      )}

      {/* TAB 3: ROOMING & MEALS */}
      {activeTab === 'rooming' && (
        <M3Card variant="elevated" className="p-5 space-y-4">
          <div>
            <h3 className="font-bold text-lg text-on-surface">{t.leader.tabRooming}</h3>
            <p className="text-xs text-on-surface-variant">
              {tour.hotel.name} • {rooms.length} rooms • the same list the hotel and DMC hold
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(dietaryCounts).map(([diet, count]) => (
              <span
                key={diet}
                className={`px-3 py-1 rounded-m3-full text-xs font-bold ${
                  diet === 'Allergy'
                    ? 'bg-error-container text-on-error-container'
                    : diet === 'Standard'
                    ? 'bg-surface-container-highest text-on-surface'
                    : 'bg-leader-container text-on-leader-container'
                }`}
              >
                {diet}: {count}
              </span>
            ))}
          </div>

          <div className="divide-y divide-outline-variant/30 border border-outline-variant/40 rounded-m3-md overflow-hidden">
            {rooms.map((room) => (
              <div key={room.roomNumber} className="p-3 flex items-start gap-3 text-xs bg-surface">
                <div className="w-14 shrink-0">
                  <p className="font-mono font-extrabold text-sm text-on-surface">{room.roomNumber}</p>
                  <p className="text-on-surface-variant">{room.roomType}</p>
                </div>
                <div className="flex-1 space-y-1.5 min-w-0">
                  {room.guests.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setSelectedPassenger(g)}
                      className="w-full flex items-center justify-between gap-2 text-left cursor-pointer hover:underline"
                    >
                      <span className="font-semibold text-on-surface truncate">{g.name}</span>
                      {g.dietary !== 'Standard' && (
                        <span
                          className={`px-2 py-0.5 rounded-m3-full text-[10px] font-bold shrink-0 ${
                            g.dietary === 'Allergy'
                              ? 'bg-error text-on-error'
                              : 'bg-leader-container text-on-leader-container'
                          }`}
                          title={g.dietaryNotes}
                        >
                          {g.dietaryNotes || g.dietary}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </M3Card>
      )}

      {/* TAB 4: INCIDENTS & EXTRA CHARGES */}
      {activeTab === 'issues' && (
        <div className="space-y-5">
          <M3Card variant="elevated" className="p-5 space-y-4">
            <div>
              <h3 className="font-bold text-lg text-on-surface">Extra Charges to Confirm</h3>
              <p className="text-xs text-on-surface-variant">
                The DMC lists each extra. You confirm it really happened; the agency then signs it off.
              </p>
            </div>

            <div className="space-y-2">
              {settlement.extraCharges.map((ex) => (
                <div
                  key={ex.id}
                  className="p-3 rounded-m3-md bg-surface-container-low border border-outline-variant/40 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-on-surface">{ex.description}</p>
                    <p className="font-mono font-bold text-on-surface-variant mt-0.5">
                      ¥{ex.amount.toLocaleString()}
                    </p>
                  </div>
                  {ex.leaderConfirmed ? (
                    <span className="px-2.5 py-1 rounded-m3-full bg-green-100 text-green-800 font-bold inline-flex items-center gap-1 shrink-0">
                      <M3Icon name="check_circle" size={14} />
                      Confirmed
                    </span>
                  ) : (
                    <button
                      onClick={() => confirmExtraByLeader(ex.id)}
                      className="px-3 py-1.5 rounded-m3-full bg-leader text-on-leader font-bold cursor-pointer hover:bg-[#6F4000] shrink-0"
                    >
                      {t.leader.confirmExtra}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </M3Card>

          <M3Card variant="elevated" className="p-5 space-y-4">
            <div>
              <h3 className="font-bold text-lg text-on-surface">{t.agent.incidentHub}</h3>
              <p className="text-xs text-on-surface-variant">
                One log shared with agency HQ and the DMC, with who reported what and when.
              </p>
            </div>

            <div className="p-3 rounded-m3-md bg-surface-container border border-outline-variant/40 space-y-2">
              <input
                type="text"
                value={incidentTitle}
                onChange={(e) => setIncidentTitle(e.target.value)}
                placeholder="e.g. Guest left the group at Shinjuku station / lost baggage / medical"
                className="w-full p-2.5 rounded-m3-sm bg-surface border border-outline-variant text-sm text-on-surface focus:outline-none focus:border-leader"
              />
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex gap-1.5">
                  {(['low', 'medium', 'high', 'critical'] as const).map((sev) => (
                    <button
                      key={sev}
                      type="button"
                      onClick={() => setIncidentSeverity(sev)}
                      className={`py-1 px-2.5 rounded-m3-full text-[11px] font-bold uppercase cursor-pointer border ${
                        incidentSeverity === sev
                          ? 'bg-leader text-on-leader border-leader'
                          : 'bg-surface text-on-surface border-outline-variant hover:bg-surface-container'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
                <M3Button variant="filled" size="sm" icon="add" onClick={handleCreateIncident}>
                  {t.agent.reportIncident}
                </M3Button>
              </div>
            </div>

            <div className="space-y-2">
              {incidents.map((inc) => (
                <div
                  key={inc.id}
                  className="p-3 rounded-m3-md bg-surface-container-low border border-outline-variant/40 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-leader">{inc.id}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded-m3-xs text-[10px] font-bold uppercase ${
                          inc.severity === 'high' || inc.severity === 'critical'
                            ? 'bg-error text-on-error'
                            : 'bg-tertiary-container text-on-tertiary-container'
                        }`}
                      >
                        {inc.severity}
                      </span>
                      <span className="text-[10px] text-on-surface-variant">
                        {inc.reportedBy} • {inc.timestamp}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-m3-full uppercase ${
                        inc.status === 'resolved'
                          ? 'bg-[#D4F7DC] text-[#0A6324]'
                          : 'bg-primary-container text-on-primary-container'
                      }`}
                    >
                      {inc.status}
                    </span>
                  </div>
                  <p className="font-bold text-on-surface">{inc.title}</p>
                  {inc.notes.map((note, idx) => (
                    <p key={idx} className="text-on-surface-variant">
                      • {note}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </M3Card>
        </div>
      )}
    </div>
  );
};
