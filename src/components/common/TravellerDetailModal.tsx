import React from 'react';
import { useTour } from '../../context/TourContext';
import { M3Icon } from '../m3/M3Icon';
import { M3Button } from '../m3/M3Button';
import { M3Badge } from '../m3/M3Badge';

export const TravellerDetailModal: React.FC = () => {
  const {
    selectedPassenger,
    setSelectedPassenger,
    updateRollCall,
    nudgePassengerWhatsApp,
    passengerClearedCustoms,
    tour,
  } = useTour();

  if (!selectedPassenger) return null;

  const p = selectedPassenger;
  const isExpiringSoon = !p.isPassportValid;
  const isPresent = p.rollCallStatus === 'present';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 select-none"
      onClick={() => setSelectedPassenger(null)}
    >
      <div
        className="w-full max-w-lg rounded-m3-xl bg-surface text-on-surface m3-elevation-3 p-6 flex flex-col shadow-2xl transition-all scale-100 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto border border-outline-variant/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header & Avatar */}
        <div className="flex items-start justify-between pb-4 border-b border-outline-variant/40">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xl ring-2 ring-primary/20 shadow-xs">
              {p.gender === 'F' ? '👩' : '👨'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg sm:text-xl text-on-surface font-roboto">
                  {p.name}
                </h3>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-m3-full bg-surface-container-high text-on-surface-variant">
                  {p.gender === 'M' ? 'Male' : 'Female'}
                </span>
              </div>
              <p className="text-xs font-mono text-on-surface-variant mt-0.5">
                {p.phone}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedPassenger(null)}
            className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors cursor-pointer"
            title="Close"
          >
            <M3Icon name="close" size={20} />
          </button>
        </div>

        {/* Live Ground Status Strip */}
        <div className="my-4 p-3 rounded-m3-md bg-surface-container-low border border-outline-variant/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                isPresent ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}
            />
            <span className="font-bold text-on-surface">
              Roll Call: {isPresent ? 'Present on Ground' : 'Flagged Missing'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {p.hasClearedCustoms ? (
              <span className="px-2.5 py-0.5 rounded-m3-full font-bold bg-[#D4F7DC] text-[#0A6324] text-[11px] flex items-center gap-1">
                <M3Icon name="check_circle" size={14} />
                Cleared Customs
              </span>
            ) : (
              <button
                onClick={() => passengerClearedCustoms(p.id)}
                className="px-2.5 py-0.5 rounded-m3-full font-bold bg-orange-100 text-orange-800 text-[11px] hover:bg-orange-200 cursor-pointer"
              >
                Mark Cleared Customs
              </button>
            )}
          </div>
        </div>

        {/* Passport & Compliance Section */}
        <div className="space-y-4 text-xs font-roboto">
          <div className="p-3.5 rounded-m3-md bg-surface-container space-y-2 border border-outline-variant/40">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider text-[10px] text-on-surface-variant flex items-center gap-1.5">
                <M3Icon name="badge" size={16} className="text-primary" />
                <span>Passport & Border Compliance</span>
              </span>
              <span
                className={`font-bold px-2 py-0.5 rounded-m3-full text-[10px] uppercase ${
                  isExpiringSoon
                    ? 'bg-error text-on-error'
                    : 'bg-[#D4F7DC] text-[#0A6324]'
                }`}
              >
                {isExpiringSoon ? 'CRITICAL (< 6 Months)' : 'COMPLIANT'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-[10px] text-on-surface-variant uppercase font-semibold">
                  Passport Number
                </span>
                <p className="font-mono font-bold text-sm text-on-surface">
                  {p.passportNumber}
                </p>
              </div>

              <div>
                <span className="text-[10px] text-on-surface-variant uppercase font-semibold">
                  Expiry Date
                </span>
                <p className="font-mono font-bold text-sm text-on-surface">
                  {p.passportExpiry}
                </p>
              </div>
            </div>

            {isExpiringSoon && (
              <div className="mt-2 p-2 rounded-m3-xs bg-error-container text-on-error-container text-[11px] flex items-start gap-1.5 font-medium leading-snug">
                <M3Icon name="warning" filled size={16} className="text-error shrink-0 mt-0.5" />
                <span>
                  Passport expires in less than 6 months from tour departure! Requires return ticket and hotel voucher inspection at Japanese immigration.
                </span>
              </div>
            )}
          </div>

          {/* Visa & Flight Data */}
          <div className="grid grid-cols-2 gap-3">
            {/* Visa */}
            <div className="p-3 rounded-m3-md bg-surface-container border border-outline-variant/40 space-y-1">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant flex items-center gap-1">
                <M3Icon name="verified_user" size={14} className="text-secondary" />
                <span>Japan e-Visa</span>
              </span>
              <p className="font-mono font-bold text-xs text-on-surface">
                {p.eVisaNumber || `EV-2026-JP-${p.passportNumber.slice(-4)}`}
              </p>
              <span
                className={`inline-block px-2 py-0.5 rounded-m3-full text-[10px] font-bold ${
                  p.visaStatus === 'approved'
                    ? 'bg-[#D4F7DC] text-[#0A6324]'
                    : 'bg-error-container text-on-error-container'
                }`}
              >
                {p.visaStatus.toUpperCase()}
              </span>
            </div>

            {/* Flight */}
            <div className="p-3 rounded-m3-md bg-surface-container border border-outline-variant/40 space-y-1">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant flex items-center gap-1">
                <M3Icon name="flight" size={14} className="text-primary" />
                <span>Inbound Seat</span>
              </span>
              <p className="font-bold text-xs text-on-surface">
                JL720 • {p.seatNumber || `Seat ${Math.floor(12 + Math.random() * 20)}K`}
              </p>
              <p className="text-[10px] text-on-surface-variant font-mono">
                Baggage: {p.baggageTag || `JL-889${p.id.slice(-2)}`} (Carousel 3)
              </p>
            </div>
          </div>

          {/* Hotel & Room Allocation */}
          <div className="p-3.5 rounded-m3-md bg-surface-container border border-outline-variant/40 space-y-2">
            <span className="font-bold uppercase tracking-wider text-[10px] text-on-surface-variant flex items-center gap-1.5">
              <M3Icon name="hotel" size={16} className="text-secondary" />
              <span>Hotel & Room Allocation</span>
            </span>

            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="font-bold text-sm text-on-surface">
                  Room {p.roomNumber} ({p.roomType} Bed)
                </p>
                <p className="text-[11px] text-on-surface-variant">
                  {tour.hotel.name}
                </p>
              </div>
              <M3Badge label={`Keycard Active`} variant="secondary" />
            </div>
          </div>

          {/* Dietary & Medical */}
          <div className="p-3.5 rounded-m3-md bg-surface-container border border-outline-variant/40 space-y-2">
            <span className="font-bold uppercase tracking-wider text-[10px] text-on-surface-variant flex items-center gap-1.5">
              <M3Icon name="restaurant" size={16} className="text-primary" />
              <span>Dietary & Special Notes</span>
            </span>

            <div className="flex items-center gap-2 pt-1">
              <span
                className={`px-2.5 py-0.5 rounded-m3-full text-xs font-bold ${
                  p.dietary === 'Halal'
                    ? 'bg-primary-container text-on-primary-container'
                    : p.dietary === 'Vegetarian'
                    ? 'bg-secondary-container text-on-secondary-container'
                    : p.dietary === 'Allergy'
                    ? 'bg-error-container text-on-error-container'
                    : 'bg-surface-container-highest text-on-surface'
                }`}
              >
                {p.dietary}
              </span>
              {p.dietaryNotes && (
                <span className="text-xs text-on-surface font-medium">
                  {p.dietaryNotes}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-outline-variant/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                updateRollCall(p.id, isPresent ? 'missing' : 'present')
              }
              className={`px-3.5 py-2 rounded-m3-full text-xs font-bold font-roboto transition-all cursor-pointer ${
                isPresent
                  ? 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isPresent ? 'Mark as Missing' : 'Mark as Present'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <M3Button
              variant="tonal"
              size="sm"
              icon="chat"
              onClick={() => nudgePassengerWhatsApp(p.phone, p.name)}
            >
              WhatsApp
            </M3Button>

            <M3Button
              variant="filled"
              size="sm"
              onClick={() => setSelectedPassenger(null)}
            >
              Done
            </M3Button>
          </div>
        </div>
      </div>
    </div>
  );
};
