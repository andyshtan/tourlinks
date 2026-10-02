import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { useTranslation } from '../../i18n/LanguageContext';
import { M3Card } from '../m3/M3Card';
import { M3Button } from '../m3/M3Button';
import { M3Icon } from '../m3/M3Icon';
import { M3Badge } from '../m3/M3Badge';
import { M3Dialog } from '../m3/M3Dialog';
import { M3Avatar } from '../m3/M3Avatar';

export const TravellerView: React.FC = () => {
  const {
    tour,
    passengers,
    itinerary,
    gatheringPin,
    passengerClearedCustoms,
    triggerSOS,
    activeSosAlert,
    setSelectedPassenger,
  } = useTour();
  const { t } = useTranslation();

  // Pick lead traveller (Budi Santoso)
  const currentTraveller = passengers[0];
  const familyCompanions = passengers.filter((p) => p.groupId === currentTraveller.groupId);
  const roommate = passengers.find(
    (p) => p.roomNumber === currentTraveller.roomNumber && p.id !== currentTraveller.id
  );
  const [taxiCardOpen, setTaxiCardOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [customsClicked, setCustomsClicked] = useState(currentTraveller.hasClearedCustoms);

  const handleClearedCustoms = () => {
    setCustomsClicked(true);
    passengerClearedCustoms(currentTraveller.id);
  };

  const handleConfirmSOS = () => {
    triggerSOS();
    setSosModalOpen(false);
  };

  return (
    <div className="max-w-md mx-auto space-y-4 pb-12 font-roboto animate-in fade-in">
      {/* Pass status strip */}
      <div className="px-3.5 py-1.5 rounded-m3-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-on-surface-variant">
          <M3Icon name="badge" size={16} className="text-primary" />
          <span className="font-semibold text-primary">{t.common.passLabel}</span>
        </div>
        <span className="text-[11px] text-on-surface-variant">
          {t.common.passNote}
        </span>
      </div>

      {/* Hero Pass Header */}
      <div className="rounded-m3-xl bg-gradient-to-br from-primary via-[#004FAF] to-[#00367A] text-on-primary p-5 shadow-lg relative overflow-hidden">
        <div className="absolute -right-4 -bottom-6 opacity-10 pointer-events-none">
          <M3Icon name="flight_takeoff" size={160} />
        </div>

        <div className="flex items-center justify-between text-xs text-white/80 mb-2">
          <span className="font-bold tracking-wider uppercase">{tour.agentName}</span>
          <span className="px-2 py-0.5 rounded-m3-full bg-white/20 font-mono font-bold text-[10px]">
            {tour.code}
          </span>
        </div>

        <h2 className="text-xl font-extrabold tracking-tight text-white mb-1">
          {tour.name}
        </h2>
        
        <div className="flex items-center justify-between text-xs text-white/90">
          <p>
            Guest: <span className="font-bold text-white">{currentTraveller.name}</span> • Room {currentTraveller.roomNumber}
          </p>
          <span className="font-mono text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
            Seat {currentTraveller.seatNumber || '14K'}
          </span>
        </div>

        {/* Dual Product Cross-Reference */}
        <div className="mt-2 pt-2 border-t border-white/15 text-[11px] text-white/80 flex items-center justify-between flex-wrap gap-1">
          <span>Ground Partner: <strong className="text-white">{tour.operatorName}</strong></span>
          <span className="font-mono text-[10px] bg-white/15 px-1.5 py-0.5 rounded text-white font-medium">
            Land: {tour.dmcProductCode}
          </span>
        </div>

        {/* 1-Tap Passenger Dossier Button */}
        <div className="mt-3">
          <button
            onClick={() => setSelectedPassenger(currentTraveller)}
            className="w-full py-2 px-3 rounded-m3-md bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center justify-between transition-all cursor-pointer border border-white/20 active:scale-98"
            title="Inspect passport, visa, baggage tag, and room details"
          >
            <div className="flex items-center gap-2">
              <M3Icon name="badge" size={16} />
              <span>My Passport, Visa & Baggage Tag</span>
            </div>
            <span className="flex items-center gap-1 text-[11px] opacity-90 font-medium">
              <span>View Dossier</span>
              <M3Icon name="chevron_right" size={14} />
            </span>
          </button>
        </div>

        {/* Live Weather & Local Time Widget */}
        <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <M3Icon name="partly_cloudy_day" size={18} />
            <span>{tour.copy.weather}</span>
          </div>
          <div className="font-mono font-bold text-white bg-black/20 px-2.5 py-1 rounded-m3-full">
            {tour.copy.nowLocal} (Local)
          </div>
        </div>
      </div>

      {/* My Travel Party / Booking Group Unit */}
      <div className="p-3.5 rounded-m3-lg bg-surface-container border border-outline-variant/40 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <M3Icon name="family_restroom" size={18} className="text-secondary" />
            <div>
              <h4 className="font-bold text-xs text-on-surface uppercase tracking-wider">
                My Travel Party ({familyCompanions.length} {tour.copy.paxNoun})
              </h4>
              <p className="text-[10px] text-on-surface-variant">
                {currentTraveller.groupName} • Booking Ref: <span className="font-mono font-bold text-secondary">{currentTraveller.bookingRef}</span>
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-secondary bg-secondary-container/60 px-2 py-0.5 rounded-full">
            Room {currentTraveller.roomNumber}
          </span>
        </div>

        <div className="space-y-1.5">
          {familyCompanions.map((comp) => {
            const isMe = comp.id === currentTraveller.id;
            return (
              <button
                key={comp.id}
                onClick={() => setSelectedPassenger(comp)}
                className={`w-full p-2.5 rounded-m3-md border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isMe
                    ? 'bg-surface border-primary/40 shadow-xs'
                    : 'bg-surface border-outline-variant/50 hover:bg-surface-container-high'
                }`}
                title={`Inspect ${comp.name}'s document copies & dossier`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    isMe ? 'bg-primary-container text-on-primary-container ring-1 ring-primary/30' : 'bg-surface-container-high text-on-surface'
                  }`}>
                    {comp.gender === 'F' ? '👩' : '👨'}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-on-surface">{comp.name}</span>
                      {comp.isGroupLead && (
                        <span className="text-[9px] font-bold uppercase bg-primary text-on-primary px-1.5 py-0.2 rounded-full">
                          Lead
                        </span>
                      )}
                      {isMe && (
                        <span className="text-[9px] font-bold text-on-surface-variant font-mono">
                          (You)
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-on-surface-variant font-mono">
                      Seat {comp.seatNumber || '14K'} • Pass: {comp.passportNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-medium text-primary">
                  <span>Dossier</span>
                  <M3Icon name="chevron_right" size={14} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Travel Document Copies Card */}
      <div className="p-3.5 rounded-m3-lg bg-surface-container border border-outline-variant/40 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <M3Icon name="folder_shared" size={18} className="text-primary" />
            <h4 className="font-bold text-xs text-on-surface uppercase tracking-wider">
              My Travel Document Copies
            </h4>
          </div>
          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            Ready
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => setSelectedPassenger(currentTraveller)}
            className="p-2.5 rounded-m3-md bg-surface border border-outline-variant/60 hover:bg-surface-container-high transition-all flex items-center justify-between cursor-pointer text-left shadow-xs active:scale-98"
          >
            <div>
              <p className="font-bold text-[11px] text-on-surface">Passport Scan</p>
              <p className="text-[10px] font-mono text-on-surface-variant">{currentTraveller.passportNumber}</p>
            </div>
            <M3Icon name="badge" size={16} className="text-primary" />
          </button>

          <button
            onClick={() => setSelectedPassenger(currentTraveller)}
            className="p-2.5 rounded-m3-md bg-surface border border-outline-variant/60 hover:bg-surface-container-high transition-all flex items-center justify-between cursor-pointer text-left shadow-xs active:scale-98"
          >
            <div>
              <p className="font-bold text-[11px] text-on-surface">{tour.copy.visaLabel}</p>
              <p className="text-[10px] font-mono text-on-surface-variant">{tour.copy.visaSubLabel}</p>
            </div>
            <M3Icon name="verified_user" size={16} className="text-secondary" />
          </button>
        </div>
      </div>

      {/* Stage 2: Airport Arrival Assistance Card */}
      <M3Card variant="elevated" className="p-4 space-y-3.5 border-l-4 border-l-primary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-m3-sm bg-primary-container text-on-primary-container">
              <M3Icon name="flight_land" filled size={18} />
            </span>
            <div>
              <h3 className="font-bold text-sm text-on-surface">
                {t.traveller.meetingPointTitle}
              </h3>
              <p className="text-[11px] text-on-surface-variant font-medium">
                {tour.flight.number} • Landed at {tour.flight.terminal}
              </p>
            </div>
          </div>
          <M3Badge label={tour.copy.meetingPointShort} variant="primary" />
        </div>

        {/* Meeting point map */}
        <div className="rounded-m3-md overflow-hidden border border-outline-variant/40">
          <img
            src={tour.meetingPoint.mapUrl}
            alt={`Map of the meeting point: ${tour.meetingPoint.zone}, ${tour.meetingPoint.pillar}`}
            className="w-full"
          />
          <div className="p-3 bg-surface-container-low border-t border-outline-variant/40">
            <p className="text-xs font-bold text-on-surface">{tour.meetingPoint.pillar}</p>
            <p className="text-[11px] text-on-surface-variant">{tour.meetingPoint.instructions}</p>
          </div>
        </div>

        {/* 1-Tap "I Have Cleared Customs" Handshake Button */}
        {customsClicked ? (
          <div className="p-3 rounded-m3-md bg-green-50 border border-green-200 text-green-800 text-xs font-bold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <M3Icon name="check_circle" filled size={18} />
              <span>{t.traveller.customsReported}</span>
            </div>
            <span className="text-[10px] bg-green-200 text-green-900 px-2 py-0.5 rounded-m3-full">
              Live
            </span>
          </div>
        ) : (
          <M3Button
            variant="filled"
            fullWidth
            size="lg"
            icon="door_front"
            onClick={handleClearedCustoms}
            className="shadow-md"
          >
            {t.traveller.clearedCustomsBtn}
          </M3Button>
        )}

        {/* Tour Leader Info */}
        <div className="p-3 rounded-m3-md bg-leader-container/40 border border-leader/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <M3Avatar name={tour.staff.tourLeaderName} size={40} className="bg-leader-container text-on-leader-container" />
            <div className="text-xs">
              <p className="font-bold text-on-surface">{tour.staff.tourLeaderName}</p>
              <p className="text-on-surface-variant text-[11px]">Your tour leader • travelling with you</p>
            </div>
          </div>
          <M3Button
            variant="tonal"
            size="sm"
            icon="chat"
            onClick={() => window.open(`https://wa.me/${tour.staff.tourLeaderPhone.replace(/[^0-9]/g, '')}`, '_blank')}
          >
            WhatsApp
          </M3Button>
        </div>

        {/* Guide & Driver Info */}
        <div className="p-3 rounded-m3-md bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <M3Avatar name={tour.staff.guideName} size={40} />
            <div className="text-xs">
              <p className="font-bold text-on-surface">{tour.staff.guideName} <span className="font-normal text-on-surface-variant">• {tour.copy.guideRole.toLowerCase()}</span></p>
              <p className="text-on-surface-variant text-[11px]">
                {tour.staff.vehicleModel} • {tour.staff.vehiclePlate}
              </p>
            </div>
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
      </M3Card>

      {/* Stage 3: Live Gathering Radar (If Active) */}
      {gatheringPin.isActive && (
        <M3Card
          variant="elevated"
          className="p-4 bg-tertiary-container/30 border border-tertiary/40 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-ping" />
              <h3 className="font-bold text-sm text-tertiary">
                {t.traveller.gatheringRadar}
              </h3>
            </div>
            <span className="text-xs font-bold font-mono text-tertiary bg-surface px-2 py-0.5 rounded-m3-full shadow-xs">
              Meet at {gatheringPin.targetTime}
            </span>
          </div>

          <div className="bg-surface p-3 rounded-m3-md border border-outline-variant/30 space-y-1">
            <p className="font-bold text-sm text-on-surface">{gatheringPin.locationName}</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {gatheringPin.notes}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 p-2 rounded-m3-sm bg-tertiary text-on-tertiary text-center font-mono font-extrabold text-sm">
              ⏳ {gatheringPin.remainingMinutes} Mins Left
            </div>
            <M3Button
              variant="filled"
              size="md"
              icon="near_me"
              onClick={() =>
                window.open(
                  `https://maps.google.com/?q=${gatheringPin.latitude},${gatheringPin.longitude}`,
                  '_blank'
                )
              }
              className="bg-tertiary text-on-tertiary hover:bg-[#83344f]"
            >
              {t.traveller.gatheringNavBtn}
            </M3Button>
          </div>
        </M3Card>
      )}

      {/* Dynamic Today's Itinerary */}
      <M3Card variant="elevated" className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-on-surface">
            {t.traveller.todaySchedule} (Day 1)
          </h3>
          <span className="text-[11px] font-bold text-primary">Updated by {tour.copy.guideRole.toLowerCase()} & tour leader</span>
        </div>

        <div className="space-y-2.5">
          {itinerary.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-m3-md border text-xs transition-all ${
                item.status === 'current'
                  ? 'border-primary bg-primary-container/20 ring-1 ring-primary/40'
                  : item.status === 'completed'
                  ? 'border-outline-variant/30 bg-surface-container-low opacity-60'
                  : 'border-outline-variant/40 bg-surface'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-bold text-primary">
                  {item.adjustedTime || item.time} {tour.copy.tz}
                </span>
                {item.delayMinutes > 0 && (
                  <span className="text-[10px] font-bold text-error bg-error-container px-1.5 py-0.2 rounded-xs">
                    +{item.delayMinutes}m adjusted
                  </span>
                )}
              </div>
              <p className="font-bold text-on-surface">{item.title}</p>
              <p className="text-on-surface-variant text-[11px] mt-0.5">{item.description}</p>
            </div>
          ))}
        </div>
      </M3Card>

      {/* Hotel & Japanese Taxi Card */}
      <M3Card variant="elevated" className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-m3-sm bg-secondary-container text-on-secondary-container">
              <M3Icon name="hotel" filled size={18} />
            </span>
            <div>
              <h3 className="font-bold text-sm text-on-surface">
                {t.traveller.hotelRoomTitle}
              </h3>
              <p className="text-[11px] text-on-surface-variant">{tour.hotel.name}</p>
            </div>
          </div>
          <M3Badge label={t.traveller.roomNumber} variant="secondary" />
        </div>

        <div className="p-2.5 rounded-m3-md bg-surface-container-low text-xs flex items-center justify-between">
          <span className="font-medium text-on-surface-variant">Hotel Wi-Fi:</span>
          <span className="font-mono font-bold text-primary">{tour.hotel.wifiPass}</span>
        </div>

        {/* Roommate details */}
        {roommate && (
        <div
          onClick={() => setSelectedPassenger(roommate)}
          className="p-2.5 rounded-m3-md bg-surface-container-low hover:bg-surface-container-high transition-colors text-xs flex items-center justify-between cursor-pointer border border-outline-variant/30"
          title="Click to view roommate details"
        >
          <div className="flex items-center gap-2">
            <M3Icon name="people" size={16} className="text-secondary" />
            <span className="text-on-surface">
              Roommate: <strong className="text-primary font-bold">{roommate.name}</strong>
            </span>
          </div>
          <span className="text-primary font-bold text-[11px] flex items-center gap-0.5">
            <span>View Dossier</span>
            <M3Icon name="chevron_right" size={14} />
          </span>
        </div>
        )}

        {/* Taxi Card Button (Shows large Japanese text to driver) */}
        <M3Button
          variant="outlined"
          fullWidth
          size="md"
          icon="local_taxi"
          onClick={() => setTaxiCardOpen(true)}
        >
          {t.traveller.taxiCardAddress}
        </M3Button>
      </M3Card>

      {/* Tour Companions List */}
      <M3Card variant="elevated" className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-m3-sm bg-primary-container text-on-primary-container">
              <M3Icon name="groups" filled size={18} />
            </span>
            <div>
              <h3 className="font-bold text-sm text-on-surface">
                My Travel Group ({passengers.length} {tour.copy.paxNoun})
              </h3>
              <p className="text-[11px] text-on-surface-variant">Tap any guest to view details</p>
            </div>
          </div>
          <M3Badge label={tour.copy.cohortLabel} variant="primary" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {passengers.slice(0, 6).map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedPassenger(p)}
              className="p-2 rounded-m3-md bg-surface-container-low hover:bg-primary-container/20 border border-outline-variant/40 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs shrink-0">
                {p.gender === 'F' ? '👩' : '👨'}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs text-on-surface truncate">{p.name.split(' ')[0]}</p>
                <p className="text-[10px] text-on-surface-variant font-mono">Room {p.roomNumber}</p>
              </div>
            </div>
          ))}
        </div>

        {passengers.length > 6 && (
          <button
            onClick={() => setSelectedPassenger(passengers[0])}
            className="w-full py-1.5 text-center text-xs font-bold text-primary hover:underline cursor-pointer"
          >
            + View all {passengers.length} companions & manifest
          </button>
        )}
      </M3Card>

      {/* Emergency SOS Button */}
      <div className="pt-2">
        {activeSosAlert ? (
          <div className="p-4 rounded-m3-xl bg-error text-on-error text-center space-y-2 animate-pulse">
            <M3Icon name="emergency" size={32} />
            <h4 className="font-bold text-base">{t.traveller.sosTriggered}</h4>
            <p className="text-xs text-white/90">
              Tour leader {tour.staff.tourLeaderName}, {tour.copy.guideRole.toLowerCase()} {tour.staff.guideName} and Agent HQ have been alerted.
            </p>
          </div>
        ) : (
          <button
            onClick={() => setSosModalOpen(true)}
            className="w-full py-4 rounded-m3-xl bg-error text-on-error font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:bg-[#a01616] active:scale-98 transition-all cursor-pointer"
          >
            <M3Icon name="emergency_share" filled size={22} />
            <span>{t.traveller.sosBtn}</span>
          </button>
        )}
        <p className="text-[11px] text-on-surface-variant text-center mt-1.5 px-4 leading-relaxed">
          {t.traveller.sosDesc}
        </p>
      </div>

      {/* Japanese Taxi Driver Address Card Modal */}
      <M3Dialog
        open={taxiCardOpen}
        onClose={() => setTaxiCardOpen(false)}
        headline={tour.copy.taxiCardHeadline}
        maxWidth="md"
        actions={
          <M3Button variant="filled" onClick={() => setTaxiCardOpen(false)}>
            Close Card
          </M3Button>
        }
      >
        <div className="p-6 rounded-m3-xl bg-surface-container-highest text-center space-y-4 border-2 border-outline">
          <p className="text-xs uppercase font-bold text-on-surface-variant">
            Please take me to this hotel:
          </p>
          <div className="space-y-1">
            <h2 className="text-2xl font-black font-roboto text-on-surface tracking-tight">
              {tour.hotel.nameLocal}
            </h2>
            <p className="text-base font-bold text-primary">
              {tour.hotel.addressLocal}
            </p>
          </div>
          <div className="pt-3 border-t border-outline-variant/40 text-xs text-on-surface-variant font-mono">
            TEL: {tour.hotel.phone}
          </div>
        </div>
      </M3Dialog>

      {/* SOS Confirmation Dialog */}
      <M3Dialog
        open={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
        icon="emergency"
        headline="Broadcast Emergency SOS?"
        supportingText={`This alerts tour leader ${tour.staff.tourLeaderName}, ${tour.copy.guideRole.toLowerCase()} ${tour.staff.guideName} and ${tour.copy.agentHqLine}.`}
        actions={
          <>
            <M3Button variant="text" onClick={() => setSosModalOpen(false)}>
              Cancel
            </M3Button>
            <M3Button
              variant="filled"
              onClick={handleConfirmSOS}
              className="bg-error text-on-error hover:bg-[#a01616]"
            >
              Yes, Broadcast SOS Now
            </M3Button>
          </>
        }
      />
    </div>
  );
};
