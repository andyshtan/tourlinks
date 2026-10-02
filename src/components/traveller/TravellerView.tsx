import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { useTranslation } from '../../i18n/LanguageContext';
import { M3Card } from '../m3/M3Card';
import { M3Button } from '../m3/M3Button';
import { M3Icon } from '../m3/M3Icon';
import { M3Badge } from '../m3/M3Badge';
import { M3Dialog } from '../m3/M3Dialog';

export const TravellerView: React.FC = () => {
  const {
    tour,
    passengers,
    itinerary,
    gatheringPin,
    passengerClearedCustoms,
    triggerSOS,
    activeSosAlert,
  } = useTour();
  const { t } = useTranslation();

  // Pick lead traveller (Budi Santoso)
  const currentTraveller = passengers[0];
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
      {/* Offline Status & Roaming Readiness Badge */}
      <div className="px-3.5 py-1.5 rounded-m3-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-on-surface-variant">
          <M3Icon name="cloud_done" size={16} className="text-primary" />
          <span className="font-semibold text-primary">{t.common.offlineMode}</span>
        </div>
        <span className="text-[11px] text-on-surface-variant">
          {t.common.offlineCached}
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
        <p className="text-xs text-white/90">
          Guest: <span className="font-bold text-white">{currentTraveller.name}</span> • Room {currentTraveller.roomNumber}
        </p>

        {/* Live Weather & Local Time Widget */}
        <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <M3Icon name="partly_cloudy_day" size={18} />
            <span>Tokyo: 19°C Crisp Autumn</span>
          </div>
          <div className="font-mono font-bold text-white bg-black/20 px-2.5 py-1 rounded-m3-full">
            16:15 JST (Local)
          </div>
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
          <M3Badge label="Pillar #17" variant="primary" />
        </div>

        {/* Visual Meeting Point Guide Photo */}
        <div className="relative rounded-m3-md overflow-hidden border border-outline-variant/40">
          <img
            src={tour.meetingPoint.photoUrl}
            alt="Meeting Point"
            className="w-full h-36 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end text-white">
            <p className="text-xs font-bold">{tour.meetingPoint.pillar}</p>
            <p className="text-[11px] text-white/80">{tour.meetingPoint.instructions}</p>
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

        {/* Guide & Driver Info */}
        <div className="p-3 rounded-m3-md bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={tour.staff.guidePhoto}
              alt="Guide"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
            />
            <div className="text-xs">
              <p className="font-bold text-on-surface">{tour.staff.guideName}</p>
              <p className="text-on-surface-variant text-[11px]">
                {tour.staff.vehicleModel} • {tour.staff.vehiclePlate}
              </p>
            </div>
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
          <span className="text-[11px] font-bold text-primary">Live Synchronized</span>
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
                  {item.adjustedTime || item.time} JST
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

      {/* Emergency SOS Button */}
      <div className="pt-2">
        {activeSosAlert ? (
          <div className="p-4 rounded-m3-xl bg-error text-on-error text-center space-y-2 animate-pulse">
            <M3Icon name="emergency" size={32} />
            <h4 className="font-bold text-base">{t.traveller.sosTriggered}</h4>
            <p className="text-xs text-white/90">
              Guide Yumi and Agent HQ have received your GPS coordinates.
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
        headline="Show to Taxi Driver (タクシー運転手様へ)"
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
              グランベルホテル新宿
            </h2>
            <p className="text-base font-bold text-primary">
              東京都新宿区歌舞伎町2-1-2
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
        supportingText="This will send an immediate loud alert with your GPS coordinates to Tour Leader Yumi Sato and Nusantara Odyssey HQ in Jakarta."
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
