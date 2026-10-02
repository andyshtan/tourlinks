import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { M3Icon } from '../m3/M3Icon';
import { M3Button } from '../m3/M3Button';
import { M3Badge } from '../m3/M3Badge';
import { DocumentViewerModal } from './DocumentViewerModal';
import {
  type DocumentType,
  getPassengerDocuments,
  getDocumentDirectUrl,
} from '../../utils/documentUtils';

export const TravellerDetailModal: React.FC = () => {
  const {
    selectedPassenger,
    setSelectedPassenger,
    updateRollCall,
    nudgePassengerWhatsApp,
    passengerClearedCustoms,
    tour,
    passengers,
  } = useTour();

  const [viewingDocType, setViewingDocType] = useState<DocumentType | null>(null);
  const [copiedDocId, setCopiedDocId] = useState<string | null>(null);

  if (!selectedPassenger) return null;

  const p = selectedPassenger;
  const isExpiringSoon = !p.isPassportValid;
  const isPresent = p.rollCallStatus === 'present';
  const docs = getPassengerDocuments(p);
  const companions = passengers.filter((m) => m.groupId === p.groupId && m.id !== p.id);

  const handleCopyDocLink = (passengerId: string, docType: DocumentType, docId: string) => {
    const url = getDocumentDirectUrl(passengerId, docType);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedDocId(docId);
      setTimeout(() => setCopiedDocId(null), 2500);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 select-none"
        onClick={() => setSelectedPassenger(null)}
      >
        <div
          className="w-full max-w-xl rounded-m3-xl bg-surface text-on-surface m3-elevation-3 p-5 sm:p-6 flex flex-col shadow-2xl transition-all scale-100 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto border border-outline-variant/60"
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
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-m3-full bg-primary/10 text-primary flex items-center gap-1">
                    <M3Icon name="groups" size={13} />
                    <span>{p.groupName}</span>
                    <span className="font-mono opacity-75">({p.bookingRef})</span>
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant">
                    {p.groupRole}
                  </span>
                </div>
                <p className="text-xs font-mono text-on-surface-variant mt-1">
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
          <div className="my-3.5 p-3 rounded-m3-md bg-surface-container-low border border-outline-variant/40 flex items-center justify-between text-xs">
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
                  {isExpiringSoon ? 'UNDER 6 MONTHS' : 'WITHIN POLICY'}
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
                    Passport expires within 6 months of the tour dates, below agency policy. Check the destination's entry rules and keep the return ticket and hotel voucher at hand.
                  </span>
                </div>
              )}
            </div>

            {/* Official Real Document Copies & Shareable Links */}
            <div className="p-3.5 rounded-m3-md bg-surface-container border border-outline-variant/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase tracking-wider text-[10px] text-on-surface-variant flex items-center gap-1.5">
                  <M3Icon name="folder_shared" size={16} className="text-primary" />
                  <span>Document Copies & Shareable Links</span>
                </span>
                <span className="text-[10px] text-primary font-bold">
                  {docs.length} Sample Documents
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {docs.map((doc) => {
                  const isCopied = copiedDocId === doc.id;
                  const directUrl = getDocumentDirectUrl(p.id, doc.type);

                  return (
                    <div
                      key={doc.id}
                      className="p-3 rounded-m3-md bg-surface border border-outline-variant/60 hover:border-primary/60 transition-all flex flex-col justify-between gap-2 shadow-xs group"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                          <M3Icon
                            name={
                              doc.type === 'passport'
                                ? 'badge'
                                : doc.type === 'visa'
                                ? 'verified_user'
                                : doc.type === 'eticket'
                                ? 'airplane_ticket'
                                : 'health_and_safety'
                            }
                            size={16}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-xs text-on-surface truncate">
                            {doc.title}
                          </p>
                          <p className="text-[10px] font-mono text-on-surface-variant truncate">
                            {doc.fileName} • {doc.fileSize}
                          </p>
                          <span className="text-[10px] font-mono text-primary font-bold">
                            {doc.docNumber}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-outline-variant/30 gap-1.5">
                        <button
                          onClick={() => setViewingDocType(doc.type)}
                          className="px-2.5 py-1 rounded-m3-full bg-surface-container hover:bg-primary-container text-on-surface hover:text-on-primary-container text-[11px] font-bold flex items-center gap-1 border border-outline-variant/60 transition-colors cursor-pointer"
                          title="View verified document copy"
                        >
                          <M3Icon name="visibility" size={13} className="text-primary" />
                          <span>View Copy</span>
                        </button>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleCopyDocLink(p.id, doc.type, doc.id)}
                            className={`px-2.5 py-1 rounded-m3-full text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs ${
                              isCopied
                                ? 'bg-green-600 text-white'
                                : 'bg-surface hover:bg-surface-container-high text-on-surface border border-outline-variant/60'
                            }`}
                            title="Copy shareable link"
                          >
                            <M3Icon name={isCopied ? 'done' : 'content_copy'} size={12} />
                            <span>{isCopied ? 'Copied!' : 'Copy Link'}</span>
                          </button>

                          <a
                            href={directUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer transition-colors"
                            title="Open direct URL in new tab"
                          >
                            <M3Icon name="open_in_new" size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visa & Flight Data */}
            <div className="grid grid-cols-2 gap-3">
              {/* Visa */}
              <div className="p-3 rounded-m3-md bg-surface-container border border-outline-variant/40 space-y-1">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant flex items-center gap-1">
                  <M3Icon name="verified_user" size={14} className="text-secondary" />
                  <span>Japan Visa Waiver</span>
                </span>
                <p className="font-mono font-bold text-xs text-on-surface">
                  {p.eVisaNumber || `VW-2026-JKT-${p.passportNumber.slice(-4)}`}
                </p>
                <span
                  className={`inline-block px-2 py-0.5 rounded-m3-full text-[10px] font-bold ${
                    p.visaStatus === 'approved'
                      ? 'bg-[#D4F7DC] text-[#0A6324]'
                      : 'bg-error-container text-on-error-container'
                  }`}
                >
                  {p.visaStatus === 'approved' ? 'REGISTERED' : p.visaStatus.toUpperCase()}
                </span>
              </div>

              {/* Flight */}
              <div className="p-3 rounded-m3-md bg-surface-container border border-outline-variant/40 space-y-1">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant flex items-center gap-1">
                  <M3Icon name="flight" size={14} className="text-primary" />
                  <span>Inbound Seat</span>
                </span>
                <p className="font-bold text-xs text-on-surface">
                  JL720 • Seat {p.seatNumber || '—'}
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

              {/* Bi-directional Product Name Reference */}
              <div className="pt-2 border-t border-outline-variant/30 flex flex-wrap items-center justify-between text-[11px] text-on-surface-variant gap-1">
                <span>Agent Retail: <strong className="text-on-surface font-mono">{tour.agentPackageCode}</strong></span>
                <span className="text-outline-variant">⇄</span>
                <span>DMC Ground: <strong className="text-on-surface font-mono">{tour.dmcProductCode}</strong></span>
              </div>
            </div>

            {/* Travel Group Party Members (if traveling as a group/family) */}
            {companions.length > 0 && (
              <div className="p-3.5 rounded-m3-md bg-surface-container border border-outline-variant/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-on-surface-variant flex items-center gap-1.5">
                    <M3Icon name="groups" size={16} className="text-primary" />
                    <span>Travel Group Party ({p.groupName})</span>
                  </span>
                  <span className="font-mono text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    PNR: {p.bookingRef}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {companions.map((comp) => (
                    <div
                      key={comp.id}
                      onClick={() => setSelectedPassenger(comp)}
                      className="p-2.5 rounded-m3-sm bg-surface hover:bg-primary-container/20 border border-outline-variant/60 flex items-center justify-between transition-colors cursor-pointer group"
                      title={`Switch to ${comp.name}'s dossier`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{comp.gender === 'F' ? '👩' : '👨'}</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-bold text-xs text-on-surface group-hover:text-primary transition-colors">
                              {comp.name}
                            </p>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-xs bg-surface-container-high text-on-surface-variant">
                              {comp.groupRole}
                            </span>
                          </div>
                          <p className="text-[10px] text-on-surface-variant font-mono">
                            Room {comp.roomNumber} ({comp.roomType}) • Seat {comp.seatNumber || '14K'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-bold text-primary">
                        <span>View</span>
                        <M3Icon name="chevron_right" size={14} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
          <div className="mt-5 pt-4 border-t border-outline-variant/40 flex flex-wrap items-center justify-between gap-3">
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

      {/* Real Document Viewer Overlay */}
      {viewingDocType && (
        <DocumentViewerModal
          passenger={p}
          initialType={viewingDocType}
          isOpen={true}
          onClose={() => setViewingDocType(null)}
        />
      )}
    </>
  );
};
