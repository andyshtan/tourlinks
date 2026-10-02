import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { useTranslation } from '../../i18n/LanguageContext';
import { M3Card } from '../m3/M3Card';
import { M3Button } from '../m3/M3Button';
import { M3Badge } from '../m3/M3Badge';
import { M3Icon } from '../m3/M3Icon';
import { M3Dialog } from '../m3/M3Dialog';
import { M3Avatar } from '../m3/M3Avatar';
import { getDocumentDirectUrl } from '../../utils/documentUtils';

export const OperatorView: React.FC = () => {
  const {
    tour,
    passengers,
    bookingGroups,
    checkpoints,
    itinerary,
    gatheringPin,
    settlement,
    advanceCheckpoint,
    updateRollCall,
    updateGroupRollCall,
    shiftSchedule,
    toggleGatheringPin,
    setSelectedPassenger,
  } = useTour();
  const { t } = useTranslation();

  const [signboardModalOpen, setSignboardModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'arrival' | 'itinerary' | 'rollcall' | 'proof'>('arrival');
  const [rollCallMode, setRollCallMode] = useState<'groups' | 'individuals'>('groups');
  const [copiedOpDocId, setCopiedOpDocId] = useState<string | null>(null);

  const presentCount = passengers.filter((p) => p.rollCallStatus === 'present').length;
  const missingCount = passengers.filter((p) => p.rollCallStatus === 'missing').length;

  return (
    <div className="space-y-6">
      {/* Top Header Card: Destination Ground Handling Command */}
      <div className="p-5 rounded-m3-xl bg-secondary text-on-secondary shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-m3-full text-xs font-bold bg-secondary-container text-on-secondary-container">
              {t.operator.badge}
            </span>
            <span className="text-xs text-on-secondary/80">
              Contract Ref: DMC-TYO-994
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-roboto tracking-tight">
            {tour.operatorName}
          </h2>
          <p className="text-xs sm:text-sm text-on-secondary/90 mt-0.5">
            Handling Agent: <span className="font-semibold">{tour.agentName}</span> • Group Size: {passengers.length} Pax + Tour Leader {tour.staff.tourLeaderName}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Digital Signboard Button */}
          <M3Button
            variant="tonal"
            size="md"
            icon="tablet_mac"
            onClick={() => setSignboardModalOpen(true)}
            className="bg-secondary-container text-on-secondary-container"
          >
            {t.operator.signboardPreview}
          </M3Button>

          {/* Quick Schedule Push */}
          <M3Button
            variant="filled"
            size="md"
            icon="schedule"
            onClick={() => shiftSchedule(20)}
            className="bg-surface text-on-surface hover:bg-surface-container"
          >
            {t.operator.pushSchedule}
          </M3Button>
        </div>
      </div>

      {/* DMC Land Operator ⇄ Origin Travel Agent Dual Product Cross-Reference Banner */}
      <div className="p-3.5 rounded-m3-lg bg-surface-container border border-outline-variant/60 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-m3-sm bg-secondary-container text-on-secondary-container">
            <M3Icon name="sync_alt" size={20} />
          </span>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-on-surface flex-wrap">
              <span>Ground Land Product:</span>
              <span className="font-mono text-secondary bg-secondary-container/50 px-1.5 py-0.5 rounded text-[11px]">
                {tour.dmcProductCode}
              </span>
              <span>• {tour.dmcProductName}</span>
              {tour.dmcProductNameJa && (
                <span className="text-[11px] text-on-surface-variant font-normal">({tour.dmcProductNameJa})</span>
              )}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              Origin Retail Package: <span className="font-semibold text-primary">{tour.agentPackageCode || 'PKG-JKT-889'} • {tour.agentProductName || tour.name}</span> ({tour.agentName})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <span className="px-2 py-0.5 rounded-m3-full bg-surface text-[10px] font-mono font-bold text-on-surface-variant border border-outline-variant/50">
            Contract: DMC-TYO-994
          </span>
          <span className="px-2 py-0.5 rounded-m3-full bg-secondary text-on-secondary text-[10px] font-bold">
            {bookingGroups.length} Booking Groups • {passengers.length} Pax
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-outline-variant/40">
        <button
          onClick={() => setActiveTab('arrival')}
          className={`h-10 px-4 rounded-m3-full text-xs sm:text-sm font-roboto font-bold transition-all inline-flex items-center gap-2 cursor-pointer ${
            activeTab === 'arrival'
              ? 'bg-secondary-container text-on-secondary-container shadow-xs'
              : 'text-on-surface hover:bg-surface-container'
          }`}
        >
          <M3Icon name="flight_land" size={18} />
          {t.operator.arrivalHandshake}
        </button>

        <button
          onClick={() => setActiveTab('itinerary')}
          className={`h-10 px-4 rounded-m3-full text-xs sm:text-sm font-roboto font-bold transition-all inline-flex items-center gap-2 cursor-pointer ${
            activeTab === 'itinerary'
              ? 'bg-secondary-container text-on-secondary-container shadow-xs'
              : 'text-on-surface hover:bg-surface-container'
          }`}
        >
          <M3Icon name="calendar_month" size={18} />
          {t.operator.scheduleTitle}
        </button>

        <button
          onClick={() => setActiveTab('rollcall')}
          className={`h-10 px-4 rounded-m3-full text-xs sm:text-sm font-roboto font-bold transition-all inline-flex items-center gap-2 cursor-pointer ${
            activeTab === 'rollcall'
              ? 'bg-secondary-container text-on-secondary-container shadow-xs'
              : 'text-on-surface hover:bg-surface-container'
          }`}
        >
          <M3Icon name="checklist" size={18} />
          {t.operator.rollCall} ({presentCount}/{passengers.length})
        </button>

        <button
          onClick={() => setActiveTab('proof')}
          className={`h-10 px-4 rounded-m3-full text-xs sm:text-sm font-roboto font-bold transition-all inline-flex items-center gap-2 cursor-pointer ${
            activeTab === 'proof'
              ? 'bg-secondary-container text-on-secondary-container shadow-xs'
              : 'text-on-surface hover:bg-surface-container'
          }`}
        >
          <M3Icon name="verified" size={18} />
          {t.operator.proofOfService}
        </button>
      </div>

      {/* TAB 1: ARRIVAL HANDSHAKE & AIRPORT OPS */}
      {activeTab === 'arrival' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Handshake Checkpoints Progress */}
          <M3Card variant="elevated" className="p-5 lg:col-span-2 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-on-surface">
                  {t.operator.arrivalHandshake}
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Each update shows on the Jakarta agent's dashboard, the tour leader's kit and the traveller passes
                </p>
              </div>
              <M3Button
                variant="filled"
                size="sm"
                icon="check_circle"
                onClick={() => advanceCheckpoint()}
              >
                {t.operator.advanceCheckpoint}
              </M3Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {checkpoints.map((cp, index) => {
                const isCompleted = cp.status === 'completed';
                const isCurrent = cp.status === 'in_progress';

                return (
                  <div
                    key={cp.id}
                    className={`p-4 rounded-m3-lg border transition-all ${
                      isCurrent
                        ? 'border-secondary bg-secondary-container/20 ring-2 ring-secondary/30'
                        : isCompleted
                        ? 'border-green-300 bg-green-50/60'
                        : 'border-outline-variant/50 bg-surface-container-low opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            isCompleted
                              ? 'bg-green-600 text-white'
                              : isCurrent
                              ? 'bg-secondary text-on-secondary animate-bounce'
                              : 'bg-surface-container-highest text-on-surface-variant'
                          }`}
                        >
                          {isCompleted ? <M3Icon name="check" size={16} /> : index + 1}
                        </span>
                        <span
                          className={`text-xs font-bold uppercase ${
                            isCompleted
                              ? 'text-green-800'
                              : isCurrent
                              ? 'text-secondary font-black'
                              : 'text-on-surface-variant'
                          }`}
                        >
                          {cp.status.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-semibold text-on-surface">
                        {cp.time}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-on-surface mb-1">
                      {t.operator[cp.labelKey]}
                    </h4>
                    <p className="text-xs text-on-surface-variant">{cp.updatedBy}</p>
                  </div>
                );
              })}
            </div>

            {/* Visual Meeting Point Banner */}
            <div className="p-4 rounded-m3-lg bg-surface-container flex flex-col sm:flex-row items-center gap-4 border border-outline-variant/40">
              <a href={tour.meetingPoint.mapUrl} target="_blank" rel="noreferrer" className="w-full sm:w-48 shrink-0" title="Open meeting point map">
                <img
                  src={tour.meetingPoint.mapUrl}
                  alt="Meeting point map"
                  className="w-full rounded-m3-md border border-outline-variant/40 shadow-xs"
                />
              </a>
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                  Designated Meeting Zone
                </span>
                <h4 className="font-bold text-base text-on-surface">
                  {tour.meetingPoint.pillar}
                </h4>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  {tour.meetingPoint.instructions}
                </p>
              </div>
            </div>

            {/* Quick Inbound Manifest Strip */}
            <div className="p-3.5 rounded-m3-md bg-surface-container-low border border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold shrink-0">
                  <M3Icon name="groups" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-on-surface">
                    Inbound Tour Manifest ({passengers.length} Guests)
                  </h4>
                  <p className="text-[11px] text-on-surface-variant">
                    {passengers.filter((p) => p.hasClearedCustoms).length} Cleared Customs •{' '}
                    {passengers.filter((p) => !p.isPassportValid).length} Require Attention
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedPassenger(passengers[0])}
                  className="px-3 py-1.5 rounded-m3-full bg-surface-container-highest hover:bg-secondary-container hover:text-on-secondary-container text-xs font-bold text-on-surface inline-flex items-center gap-1.5 cursor-pointer transition-colors border border-outline-variant/60"
                >
                  <M3Icon name="badge" size={16} className="text-secondary" />
                  <span>Inspect Passenger Details</span>
                </button>
              </div>
            </div>
          </M3Card>

          {/* Chauffeur & Vehicle Status */}
          <M3Card variant="elevated" className="p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base text-on-surface">
                  {t.operator.driverGuideDispatch}
                </h3>
                <M3Badge label="On Site" variant="secondary" />
              </div>

              <div className="space-y-4 text-xs">
                {/* Guide Info */}
                <div className="p-3 rounded-m3-md bg-surface-container-low border border-outline-variant/30 flex items-center gap-3">
                  <M3Avatar name={tour.staff.guideName} size={48} />
                  <div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">
                      {t.operator.assignedGuide}
                    </span>
                    <p className="font-bold text-sm text-on-surface">{tour.staff.guideName}</p>
                    <p className="text-on-surface-variant font-mono">{tour.staff.guidePhone}</p>
                  </div>
                </div>

                {/* Driver Info */}
                <div className="p-3 rounded-m3-md bg-surface-container-low border border-outline-variant/30">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">
                    {t.operator.assignedDriver} & Vehicle
                  </span>
                  <p className="font-bold text-sm text-on-surface mt-0.5">
                    {tour.staff.driverName}
                  </p>
                  <p className="text-on-surface-variant">{tour.staff.vehicleModel}</p>
                  <div className="mt-2 flex items-center justify-between bg-surface-container p-2 rounded-m3-xs font-mono font-bold text-primary text-xs">
                    <span>{t.operator.vehiclePlate}:</span>
                    <span>{tour.staff.vehiclePlate}</span>
                  </div>
                </div>

                {/* Highway & Weather advisory */}
                <div className="p-3 rounded-m3-md bg-primary-container/40 text-on-primary-container text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <M3Icon name="traffic" size={16} />
                    <span>Metropolitan Expressway Traffic</span>
                  </div>
                  <p className="text-[11px]">
                    Heavy traffic at Hakozaki Junction (+20 min delay expected to Shinjuku).
                  </p>
                </div>
              </div>
            </div>

            <M3Button
              variant="tonal"
              fullWidth
              icon="call"
              onClick={() => window.open(`tel:${tour.staff.driverPhone}`)}
            >
              Call Chauffeur (Kenji)
            </M3Button>
          </M3Card>
        </div>
      )}

      {/* TAB 2: DYNAMIC ITINERARY & GATHERING PIN RADAR */}
      {activeTab === 'itinerary' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Live Dynamic Schedule */}
          <M3Card variant="elevated" className="p-5 lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-lg text-on-surface">
                  {t.operator.scheduleTitle}
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Adjust stop times on the ground. The tour leader and traveller passes show the new times.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <M3Button
                  variant="outlined"
                  size="sm"
                  icon="schedule"
                  onClick={() => shiftSchedule(15)}
                >
                  +15 Mins
                </M3Button>
                <M3Button
                  variant="filled"
                  size="sm"
                  icon="update"
                  onClick={() => shiftSchedule(30)}
                >
                  +30 Mins Delay
                </M3Button>
              </div>
            </div>

            <div className="space-y-3">
              {itinerary.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-m3-lg border transition-all ${
                    item.status === 'current'
                      ? 'border-primary bg-primary-container/20 ring-2 ring-primary/20'
                      : item.status === 'completed'
                      ? 'border-outline-variant/30 bg-surface-container-low opacity-75'
                      : 'border-outline-variant/50 bg-surface'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-primary">
                        {item.adjustedTime || item.time} JST
                      </span>
                      {item.delayMinutes > 0 && (
                        <span className="px-2 py-0.5 rounded-m3-full text-[10px] font-bold bg-error-container text-on-error-container">
                          +{item.delayMinutes}m adjusted
                        </span>
                      )}
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-m3-xs bg-surface-container text-on-surface-variant">
                        {item.category}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-m3-full ${
                        item.status === 'current'
                          ? 'bg-primary text-on-primary animate-pulse'
                          : item.status === 'completed'
                          ? 'bg-surface-container-highest text-on-surface-variant'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-on-surface mt-1.5">{item.title}</h4>
                  {item.titleJa && (
                    <p className="text-xs text-on-surface-variant font-medium">{item.titleJa}</p>
                  )}
                  <p className="text-xs text-on-surface-variant mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </M3Card>

          {/* Gathering Radar & Live Pin Dropper */}
          <M3Card variant="elevated" className="p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-m3-sm bg-tertiary-container text-on-tertiary-container">
                    <M3Icon name="pin_drop" filled size={20} />
                  </span>
                  <div>
                    <h3 className="font-bold text-base text-on-surface">
                      {t.operator.dropGatheringPin}
                    </h3>
                    <p className="text-xs text-on-surface-variant">Free Time Gathering Point</p>
                  </div>
                </div>
                <M3Badge
                  label={gatheringPin.isActive ? 'Active' : 'Inactive'}
                  variant={gatheringPin.isActive ? 'tertiary' : 'surface'}
                />
              </div>

              {gatheringPin.isActive ? (
                <div className="p-4 rounded-m3-lg bg-tertiary-container/30 border border-tertiary/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-on-tertiary-container">
                      Target Meeting Time
                    </span>
                    <span className="text-lg font-bold font-mono text-tertiary">
                      {gatheringPin.targetTime}
                    </span>
                  </div>

                  <div className="bg-surface p-3 rounded-m3-md border border-outline-variant/40">
                    <p className="font-bold text-sm text-on-surface">{gatheringPin.locationName}</p>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      {gatheringPin.notes}
                    </p>
                  </div>

                  {/* Countdown Display */}
                  <div className="flex items-center justify-between p-3 rounded-m3-md bg-tertiary text-on-tertiary">
                    <span className="text-xs font-bold">{t.operator.timeRemaining}:</span>
                    <span className="text-xl font-mono font-extrabold tracking-wider">
                      {gatheringPin.remainingMinutes}:00 Min
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-m3-lg bg-surface-container text-center space-y-2">
                  <M3Icon name="location_off" size={32} className="text-on-surface-variant" />
                  <p className="text-xs text-on-surface-variant">
                    No active gathering radar. Drop a pin during free shopping or sightseeing.
                  </p>
                </div>
              )}
            </div>

            <M3Button
              variant={gatheringPin.isActive ? 'outlined' : 'filled'}
              fullWidth
              icon={gatheringPin.isActive ? 'stop_circle' : 'play_circle'}
              onClick={toggleGatheringPin}
              className={gatheringPin.isActive ? 'text-error border-error' : ''}
            >
              {gatheringPin.isActive ? 'Stop / Clear Gathering Radar' : 'Drop Gathering Pin (45m)'}
            </M3Button>
          </M3Card>
        </div>
      )}

      {/* TAB 3: ROLL CALL ATTENDANCE */}
      {activeTab === 'rollcall' && (
        <M3Card variant="elevated" className="p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-lg text-on-surface">{t.operator.rollCall}</h3>
              <p className="text-xs text-on-surface-variant">
                1-Tap attendance at coach boarding or departure points
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Roll Call Mode: By Group vs All Guests */}
              <div className="flex items-center bg-surface-container-high rounded-m3-full p-1 border border-outline-variant/60">
                <button
                  onClick={() => setRollCallMode('groups')}
                  className={`px-3 py-1 rounded-m3-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    rollCallMode === 'groups'
                      ? 'bg-secondary text-on-secondary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <M3Icon name="groups" size={15} />
                  <span>By Group ({bookingGroups.length})</span>
                </button>
                <button
                  onClick={() => setRollCallMode('individuals')}
                  className={`px-3 py-1 rounded-m3-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    rollCallMode === 'individuals'
                      ? 'bg-secondary text-on-secondary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <M3Icon name="person" size={15} />
                  <span>All Guests ({passengers.length})</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-m3-full text-xs font-bold bg-green-100 text-green-800">
                  {t.operator.present}: {presentCount}
                </span>
                <span className="px-3 py-1 rounded-m3-full text-xs font-bold bg-red-100 text-red-800">
                  {t.operator.missing}: {missingCount}
                </span>
              </div>
            </div>
          </div>

          {rollCallMode === 'groups' ? (
            /* 1. Group / Party Roll Call Mode */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookingGroups.map((group) => {
                const members = passengers.filter((p) => p.groupId === group.id);
                const presentMembers = members.filter((p) => p.rollCallStatus === 'present');
                const allPresent = members.length > 0 && presentMembers.length === members.length;
                const leadGuest = members.find((p) => p.isGroupLead) || members[0];

                return (
                  <div
                    key={group.id}
                    className={`p-4 rounded-m3-lg border transition-all ${
                      allPresent
                        ? 'bg-surface-container-low border-outline-variant/50 hover:border-secondary/60'
                        : 'bg-error-container/15 border-error/70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-on-surface">{group.groupName}</h4>
                          <span className="font-mono text-[10px] font-bold text-secondary bg-secondary-container/60 px-1.5 py-0.5 rounded">
                            {group.bookingRef}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          Lead: <span className="font-semibold text-on-surface">{leadGuest?.name}</span> • Room {group.roomNumbers.join(', ')}
                        </p>
                      </div>

                      <span
                        className={`px-2.5 py-1 rounded-m3-full text-xs font-bold shrink-0 ${
                          allPresent
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800 animate-pulse'
                        }`}
                      >
                        {presentMembers.length}/{members.length} Present
                      </span>
                    </div>

                    {/* Member chips with status */}
                    <div className="space-y-1.5 mb-3 bg-surface p-2.5 rounded-m3-md border border-outline-variant/30">
                      {members.map((m) => {
                        const mPresent = m.rollCallStatus === 'present';
                        return (
                          <div
                            key={m.id}
                            onClick={() => setSelectedPassenger(m)}
                            className="flex items-center justify-between text-xs py-1 px-1.5 rounded hover:bg-surface-container cursor-pointer transition-colors"
                            title="Inspect passenger dossier"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                                  mPresent ? 'bg-green-600 text-white' : 'bg-error text-on-error'
                                }`}
                              >
                                {mPresent ? '✓' : '!'}
                              </span>
                              <span className="font-medium text-on-surface">{m.name}</span>
                              {m.isGroupLead && (
                                <span className="text-[9px] uppercase font-bold text-primary bg-primary-container px-1 rounded">
                                  Lead
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-on-surface-variant font-mono">
                              Seat {m.seatNumber || '14A'}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Actions: Batch Check-in & WhatsApp Lead */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-outline-variant/30">
                      <button
                        onClick={() => updateGroupRollCall(group.id, allPresent ? 'missing' : 'present')}
                        className={`px-3 py-1.5 rounded-m3-full text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                          allPresent
                            ? 'bg-surface-container text-on-surface hover:bg-surface-container-high border border-outline-variant'
                            : 'bg-green-600 text-white hover:bg-green-700 shadow-xs'
                        }`}
                      >
                        <M3Icon name={allPresent ? 'close' : 'done_all'} size={15} />
                        <span>{allPresent ? 'Mark Group Missing' : `Check In Group (${members.length}/${members.length})`}</span>
                      </button>

                      {leadGuest && (
                        <button
                          onClick={() => window.open(`https://wa.me/${leadGuest.phone}`, '_blank')}
                          className="px-2.5 py-1.5 rounded-m3-full bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          title="WhatsApp Group Leader"
                        >
                          <M3Icon name="chat" size={14} />
                          <span>WhatsApp Leader</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* 2. Individual Passenger Roll Call Mode */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {passengers.map((p) => {
                const isPresent = p.rollCallStatus === 'present';

                return (
                  <div
                    key={p.id}
                    className={`p-3 rounded-m3-md border flex items-center justify-between transition-all ${
                      isPresent
                        ? 'bg-surface-container-low border-outline-variant/40 hover:border-secondary/50'
                        : 'bg-error-container/20 border-error hover:border-error/80'
                    }`}
                  >
                    <div
                      onClick={() => setSelectedPassenger(p)}
                      className="flex items-center gap-3 cursor-pointer group/item flex-1 min-w-0"
                      title="Click to view full passenger dossier"
                    >
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isPresent
                            ? 'bg-green-600 text-white'
                            : 'bg-error text-on-error animate-pulse'
                        }`}
                      >
                        {isPresent ? <M3Icon name="check" size={16} /> : '!'}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-sm text-on-surface group-hover/item:text-secondary transition-colors truncate">
                            {p.name}
                          </p>
                          <M3Icon
                            name="visibility"
                            size={14}
                            className="text-secondary opacity-0 group-hover/item:opacity-100 transition-opacity"
                          />
                        </div>
                        <p className="text-xs text-on-surface-variant truncate">
                          <span className="font-semibold text-secondary">{p.groupName}</span> • Room {p.roomNumber} • {p.dietary} • Seat {p.seatNumber || '14A'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          const url = getDocumentDirectUrl(p.id, 'passport');
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(url);
                            setCopiedOpDocId(p.id);
                            setTimeout(() => setCopiedOpDocId(null), 2000);
                          }
                        }}
                        className={`h-7 px-2 rounded-m3-full text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer transition-all border shadow-xs ${
                          copiedOpDocId === p.id
                            ? 'bg-green-600 text-white border-green-600'
                            : 'bg-surface-container hover:bg-surface-container-high text-on-surface border-outline-variant/60'
                        }`}
                        title="Copy passenger document copy link"
                      >
                        <M3Icon
                          name={copiedOpDocId === p.id ? 'done' : 'link'}
                          size={12}
                          className={copiedOpDocId === p.id ? 'text-white' : 'text-secondary'}
                        />
                        <span className="hidden sm:inline">
                          {copiedOpDocId === p.id ? 'Copied' : 'Doc Link'}
                        </span>
                      </button>

                      <button
                        onClick={() => setSelectedPassenger(p)}
                        className="p-1.5 rounded-full text-secondary hover:bg-secondary/15 transition-colors cursor-pointer"
                        title="Inspect passenger dossier (passport, visa, hotel, baggage)"
                      >
                        <M3Icon name="badge" size={18} />
                      </button>

                      <button
                        onClick={() =>
                          updateRollCall(p.id, isPresent ? 'missing' : 'present')
                        }
                        className={`px-3 py-1 rounded-m3-full text-xs font-bold cursor-pointer transition-all ${
                          isPresent
                            ? 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {isPresent ? 'Mark Missing' : 'Mark Present'}
                      </button>

                      <button
                        onClick={() => window.open(`https://wa.me/${p.phone}`, '_blank')}
                        className="p-1.5 rounded-full text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                        title="Call guest"
                      >
                        <M3Icon name="chat" size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </M3Card>
      )}

      {/* TAB 4: DIGITAL PROOF OF SERVICE */}
      {activeTab === 'proof' && (
        <M3Card variant="elevated" className="p-5 space-y-4">
          <div>
            <h3 className="font-bold text-lg text-on-surface">{t.operator.proofOfService}</h3>
            <p className="text-xs text-on-surface-variant">
              Submit the signed arrival sheet and receipts so Agent HQ can sign off extras
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-outline-variant rounded-m3-lg p-6 text-center space-y-2 hover:bg-surface-container cursor-pointer transition-colors">
              <M3Icon name="add_photo_alternate" size={36} className="text-primary" />
              <h4 className="font-bold text-sm text-on-surface">{t.operator.uploadProof}</h4>
              <p className="text-xs text-on-surface-variant">
                Take photo of signed manifest / hotel voucher stamped by front desk
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-on-surface-variant uppercase">
                Uploaded Proof & Signatures
              </span>
              <div className="p-3.5 rounded-m3-md bg-surface-container-low border border-outline-variant/40 flex items-center gap-3">
                <img
                  src={settlement.proofImages[0].src}
                  alt={settlement.proofImages[0].label}
                  className="w-14 h-14 rounded-m3-xs object-cover border border-outline-variant/50"
                />
                <div className="text-xs">
                  <p className="font-bold text-on-surface">{settlement.proofImages[0].label}</p>
                  <p className="text-on-surface-variant">16:50 JST • {passengers.length} guests • signed by guide and tour leader</p>
                  <span className="text-green-700 font-bold inline-flex items-center gap-1 mt-1">
                    <M3Icon name="check_circle" size={14} /> Shared with Agent HQ
                  </span>
                </div>
              </div>
              <div className="p-3.5 rounded-m3-md bg-surface-container-low border border-outline-variant/40 flex items-center gap-3">
                <img
                  src={settlement.proofImages[1].src}
                  alt={settlement.proofImages[1].label}
                  className="w-14 h-14 rounded-m3-xs object-cover border border-outline-variant/50"
                />
                <div className="text-xs">
                  <p className="font-bold text-on-surface">{settlement.proofImages[1].label}</p>
                  <p className="text-on-surface-variant">17:42 JST • ¥8,600 • Narita IC to Shinjuku</p>
                </div>
              </div>
            </div>
          </div>
        </M3Card>
      )}

      {/* Digital Welcome Signboard Fullscreen / Modal */}
      <M3Dialog
        open={signboardModalOpen}
        onClose={() => setSignboardModalOpen(false)}
        headline="iPad Airport Welcome Signboard"
        maxWidth="lg"
        actions={
          <M3Button variant="filled" onClick={() => setSignboardModalOpen(false)}>
            Close Paging Board
          </M3Button>
        }
      >
        <div className="p-8 rounded-m3-xl bg-gradient-to-br from-primary to-[#003B80] text-on-primary text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-m3-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <M3Icon name="flight_land" size={18} />
            <span>Japan Airlines JL-720 • Narita Terminal 1</span>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-roboto tracking-widest uppercase text-white/80">
              Welcome to Tokyo, Japan
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-roboto tracking-tight drop-shadow-sm">
              NUSANTARA ODYSSEY
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-secondary-container">
              TOKYO & MT. FUJI DELEGATION
            </p>
          </div>

          <div className="pt-4 border-t border-white/20 flex items-center justify-around text-xs text-white/90">
            <div>
              <span className="block opacity-75">Local Guide</span>
              <span className="font-bold text-sm">Yumi Sato</span>
            </div>
            <div>
              <span className="block opacity-75">Coach #04</span>
              <span className="font-bold text-sm">品川 200 か 48-12</span>
            </div>
            <div>
              <span className="block opacity-75">Meeting Point</span>
              <span className="font-bold text-sm">Pillar #17</span>
            </div>
          </div>
        </div>
      </M3Dialog>
    </div>
  );
};
