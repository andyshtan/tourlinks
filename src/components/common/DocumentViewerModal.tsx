import React, { useState } from 'react';
import type { Passenger } from '../../types/tour';
import { M3Icon } from '../m3/M3Icon';
import {
  type DocumentType,
  getPassengerDocuments,
  getDocumentDirectUrl,
  generateMRZ,
} from '../../utils/documentUtils';

interface DocumentViewerProps {
  passenger: Passenger;
  initialType?: DocumentType;
  isOpen: boolean;
  onClose: () => void;
  isStandalone?: boolean;
}

export const DocumentViewerModal: React.FC<DocumentViewerProps> = ({
  passenger,
  initialType = 'passport',
  isOpen,
  onClose,
  isStandalone = false,
}) => {
  const [activeType, setActiveType] = useState<DocumentType>(initialType);
  const [copied, setCopied] = useState(false);

  if (!isOpen && !isStandalone) return null;

  const docs = getPassengerDocuments(passenger);
  const activeDoc = docs.find((d) => d.type === activeType) || docs[0];
  const directUrl = getDocumentDirectUrl(passenger.id, activeType);
  const mrz = generateMRZ(passenger);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(directUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const containerClasses = isStandalone
    ? 'min-h-screen bg-surface-container-lowest p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-start'
    : 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs select-none';

  const modalClasses = isStandalone
    ? 'w-full max-w-4xl bg-surface rounded-m3-xl shadow-xl border border-outline-variant/60 overflow-hidden'
    : 'w-full max-w-4xl max-h-[92vh] bg-surface rounded-m3-xl shadow-2xl border border-outline-variant/60 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200';

  return (
    <div className={containerClasses} onClick={!isStandalone ? onClose : undefined}>
      <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
        {/* Top Header & Navigation */}
        <div className="bg-surface-container-high px-4 sm:px-6 py-3.5 border-b border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
              <M3Icon name="verified" size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-on-surface">
                  Official Travel Document Archive
                </h3>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container">
                  Verified Copy
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-roboto">
                Passenger: <span className="font-bold text-on-surface">{passenger.name}</span> ({passenger.passportNumber})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="h-8 px-3 rounded-m3-full bg-surface-container border border-outline-variant/60 hover:bg-surface-container-highest text-on-surface text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
              title="Print document or save as PDF"
            >
              <M3Icon name="print" size={16} className="text-primary" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            {!isStandalone && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer"
                title="Close"
              >
                <M3Icon name="close" size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Real Shareable Document Link Banner */}
        <div className="bg-surface-container-low px-4 sm:px-6 py-2.5 border-b border-outline-variant/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <M3Icon name="link" size={16} className="text-primary shrink-0" />
            <span className="font-bold text-on-surface shrink-0 hidden sm:inline">
              Real Document Link:
            </span>
            <input
              type="text"
              readOnly
              value={directUrl}
              className="font-mono text-[11px] bg-surface border border-outline-variant/60 rounded-m3-xs px-2.5 py-1 text-on-surface truncate flex-1 select-all cursor-text focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyLink}
              className={`h-8 px-3.5 rounded-m3-full font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                copied
                  ? 'bg-green-600 text-white'
                  : 'bg-primary text-on-primary hover:bg-primary/90'
              }`}
            >
              <M3Icon name={copied ? 'done' : 'content_copy'} size={15} />
              <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
            </button>

            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 px-3 rounded-m3-full bg-surface border border-outline-variant/60 hover:bg-surface-container text-on-surface text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
              title="Open full page in new window"
            >
              <M3Icon name="open_in_new" size={15} className="text-secondary" />
              <span className="hidden sm:inline">Open</span>
            </a>
          </div>
        </div>

        {/* Document Type Selector Tabs */}
        <div className="px-4 sm:px-6 py-2 bg-surface-container border-b border-outline-variant/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {docs.map((d) => {
            const isActive = d.type === activeType;
            return (
              <button
                key={d.type}
                onClick={() => setActiveType(d.type)}
                className={`px-3 py-1.5 rounded-m3-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <M3Icon
                  name={
                    d.type === 'passport'
                      ? 'badge'
                      : d.type === 'visa'
                      ? 'verified_user'
                      : d.type === 'eticket'
                      ? 'airplane_ticket'
                      : 'health_and_safety'
                  }
                  size={15}
                />
                <span>
                  {d.type === 'passport'
                    ? 'Passport Scan'
                    : d.type === 'visa'
                    ? 'Japan e-Visa'
                    : d.type === 'eticket'
                    ? 'Flight Ticket'
                    : 'Insurance Policy'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Document Render Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-surface-container-lowest">
          {/* 1. PASSPORT BIODATA COPY */}
          {activeType === 'passport' && (
            <div className="max-w-2xl mx-auto rounded-m3-lg bg-[#FAF8F5] text-stone-900 border-2 border-stone-300 shadow-md p-5 sm:p-7 font-sans relative overflow-hidden">
              {/* Security Watermark Background */}
              <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center -rotate-12 select-none">
                <span className="text-5xl font-black tracking-widest text-stone-900 uppercase">
                  VERIFIED PASSPORT ARCHIVE • TRAVELFLOWS
                </span>
              </div>

              {/* Passport Header */}
              <div className="flex items-center justify-between border-b-2 border-stone-800 pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-emerald-900 text-amber-300 rounded-md shadow-xs font-bold text-lg">
                    🇮🇩
                  </div>
                  <div>
                    <h4 className="text-sm font-black tracking-widest uppercase text-emerald-950 font-serif">
                      REPUBLIK INDONESIA
                    </h4>
                    <p className="text-[11px] font-bold tracking-wider text-stone-600 uppercase font-serif">
                      REPUBLIC OF INDONESIA • PASPOR / PASSPORT
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-stone-500 font-bold block uppercase">
                    Document No.
                  </span>
                  <span className="text-base font-mono font-black text-emerald-950 tracking-wider">
                    {passenger.passportNumber}
                  </span>
                </div>
              </div>

              {/* Passport Biodata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {/* Photo Portrait with Security Frame */}
                <div className="sm:col-span-1 flex flex-col items-center">
                  <div className="w-28 h-36 rounded-md bg-stone-200 border-2 border-stone-400 overflow-hidden relative shadow-inner flex flex-col items-center justify-center">
                    <span className="text-5xl select-none">
                      {passenger.gender === 'F' ? '👩' : '👨'}
                    </span>
                    <div className="absolute bottom-1 px-1.5 py-0.5 bg-black/60 rounded text-[9px] font-mono text-white font-bold uppercase">
                      IDN-{passenger.passportNumber.slice(-4)}
                    </div>
                    {/* Hologram stamp */}
                    <div className="absolute top-1 right-1 w-6 h-6 rounded-full border border-amber-500/80 bg-gradient-to-tr from-amber-400/40 via-emerald-300/40 to-blue-400/40 flex items-center justify-center text-[8px] font-bold text-amber-900 select-none">
                      ★
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-stone-500 mt-1 uppercase">
                    KANIM JAKARTA
                  </span>
                </div>

                {/* Data Fields */}
                <div className="sm:col-span-3 grid grid-cols-2 gap-y-2.5 gap-x-3 text-xs">
                  <div className="col-span-2">
                    <span className="text-[9px] uppercase font-bold text-stone-500 block">
                      Nama Lengkap / Full Name
                    </span>
                    <span className="text-sm font-bold uppercase font-mono text-stone-900">
                      {passenger.name}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-bold text-stone-500 block">
                      Kewarganegaraan / Nationality
                    </span>
                    <span className="font-bold uppercase font-mono text-stone-900">
                      INDONESIA
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-bold text-stone-500 block">
                      Jenis Kelamin / Sex
                    </span>
                    <span className="font-bold uppercase font-mono text-stone-900">
                      {passenger.gender === 'F' ? 'PEREMPUAN / F' : 'LAKI-LAKI / M'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-bold text-stone-500 block">
                      Tanggal Lahir / Date of Birth
                    </span>
                    <span className="font-bold uppercase font-mono text-stone-900">
                      14 AUG 1988
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-bold text-stone-500 block">
                      Tempat Lahir / Place of Birth
                    </span>
                    <span className="font-bold uppercase font-mono text-stone-900">
                      JAKARTA
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-bold text-stone-500 block">
                      Tanggal Pengeluaran / Date of Issue
                    </span>
                    <span className="font-bold uppercase font-mono text-stone-900">
                      {activeDoc.issueDate}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-bold text-stone-500 block">
                      Tanggal Habis Berlaku / Date of Expiry
                    </span>
                    <span
                      className={`font-bold uppercase font-mono text-xs px-1.5 py-0.5 rounded-xs inline-block ${
                        !passenger.isPassportValid
                          ? 'bg-red-100 text-red-800 border border-red-300'
                          : 'text-stone-900'
                      }`}
                    >
                      {passenger.passportExpiry}
                    </span>
                  </div>

                  <div className="col-span-2">
                    <span className="text-[9px] uppercase font-bold text-stone-500 block">
                      Kantor yang Mengeluarkan / Issuing Authority
                    </span>
                    <span className="font-bold uppercase font-mono text-xs text-stone-900">
                      KANTOR IMIGRASI KELAS I KHUSUS JAKARTA SELATAN
                    </span>
                  </div>
                </div>
              </div>

              {/* Machine Readable Zone (MRZ) */}
              <div className="mt-5 pt-3 border-t-2 border-stone-800 font-mono tracking-widest text-[11px] sm:text-xs leading-relaxed text-stone-900 bg-stone-100/90 p-2.5 rounded-sm select-all">
                <div className="truncate">{mrz.line1}</div>
                <div className="truncate">{mrz.line2}</div>
              </div>
            </div>
          )}

          {/* 2. JAPAN E-VISA COPY */}
          {activeType === 'visa' && (
            <div className="max-w-2xl mx-auto rounded-m3-lg bg-white text-stone-900 border-2 border-slate-300 shadow-md p-6 font-sans relative">
              <div className="flex items-center justify-between border-b-2 border-slate-700 pb-3 mb-4">
                <div>
                  <h4 className="text-sm font-black tracking-widest uppercase text-slate-900">
                    MINISTRY OF FOREIGN AFFAIRS OF JAPAN
                  </h4>
                  <p className="text-xs font-bold text-slate-600 uppercase">
                    ELECTRONIC VISA ISSUANCE NOTICE (JAPAN eVISA)
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-red-500 flex items-center justify-center text-red-600 font-serif font-bold text-xs select-none">
                  MOFA
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-bold block">
                      Visa Number
                    </span>
                    <span className="font-mono font-bold text-sm text-slate-900">
                      {activeDoc.docNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-bold block">
                      Applicant Name
                    </span>
                    <span className="font-bold text-sm uppercase text-slate-900">
                      {passenger.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase font-bold block">
                        Nationality
                      </span>
                      <span className="font-bold text-slate-900">INDONESIA</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase font-bold block">
                        Passport No.
                      </span>
                      <span className="font-mono font-bold text-slate-900">
                        {passenger.passportNumber}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase font-bold block">
                        Visa Category
                      </span>
                      <span className="font-bold text-slate-900">TEMPORARY VISITOR</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase font-bold block">
                        Entries Allowed
                      </span>
                      <span className="font-bold text-slate-900">SINGLE (90 DAYS)</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase font-bold block">
                        Date of Issue
                      </span>
                      <span className="font-mono text-slate-900">{activeDoc.issueDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase font-bold block">
                        Date of Expiry
                      </span>
                      <span className="font-mono text-slate-900">{activeDoc.expiryDate}</span>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-1 flex flex-col items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded-m3-sm">
                  {/* QR Code Graphic */}
                  <div className="w-28 h-28 bg-white border border-stone-300 p-2 flex items-center justify-center shadow-xs">
                    <M3Icon name="qr_code_2" size={90} className="text-slate-800" />
                  </div>
                  <span className="text-[9px] font-mono text-center text-slate-600 mt-2 font-bold uppercase">
                    Scan for Visit Japan Web
                  </span>
                  <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full mt-1">
                    VERIFIED ACTIVE
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 3. FLIGHT E-TICKET COPY */}
          {activeType === 'eticket' && (
            <div className="max-w-2xl mx-auto rounded-m3-lg bg-white text-stone-900 border-2 border-rose-200 shadow-md p-6 font-sans">
              <div className="flex items-center justify-between border-b-2 border-red-600 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs">
                    JAL
                  </div>
                  <div>
                    <h4 className="text-sm font-black tracking-wide uppercase text-slate-900">
                      JAPAN AIRLINES • ELECTRONIC TICKET PASSENGER RECEIPT
                    </h4>
                    <p className="text-xs font-mono text-slate-500">
                      ETKT No: {activeDoc.docNumber} • PNR: JAL-TK889
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-red-600 uppercase font-mono">
                  ONEWORLD
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3 bg-red-50/60 rounded-m3-sm border border-red-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500">
                      Passenger Name
                    </span>
                    <p className="font-bold text-sm text-slate-900">{passenger.name}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-500">
                      Confirmed Seat
                    </span>
                    <p className="font-mono font-bold text-sm text-red-700">
                      {passenger.seatNumber || '14K'} (Window)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-m3-sm border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Flight</span>
                    <p className="font-bold text-slate-900">JL 720</p>
                    <p className="text-[11px] text-slate-500 font-mono">Boeing 787-9</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Departure</span>
                    <p className="font-bold text-slate-900">Jakarta (CGK)</p>
                    <p className="text-[11px] text-slate-500 font-mono">06:45 WIB • T3</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Arrival</span>
                    <p className="font-bold text-slate-900">Tokyo Narita (NRT)</p>
                    <p className="text-[11px] text-slate-500 font-mono">16:15 JST • T1</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-200">
                  <span>Baggage Allowance: 2 Pieces (23kg each)</span>
                  <span>Meal: {passenger.dietary} (Confirmed)</span>
                </div>
              </div>
            </div>
          )}

          {/* 4. TRAVEL INSURANCE POLICY */}
          {activeType === 'insurance' && (
            <div className="max-w-2xl mx-auto rounded-m3-lg bg-white text-stone-900 border-2 border-blue-200 shadow-md p-6 font-sans">
              <div className="flex items-center justify-between border-b-2 border-blue-700 pb-3 mb-4">
                <div>
                  <h4 className="text-sm font-black tracking-wide uppercase text-blue-950">
                    CHUBB INTERNATIONAL TRAVEL INSURANCE
                  </h4>
                  <p className="text-xs font-mono text-slate-500">
                    Policy No: {activeDoc.docNumber}
                  </p>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  ACTIVE COVERAGE
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 p-3 bg-blue-50/50 rounded-m3-sm border border-blue-100">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">
                      Insured Traveller
                    </span>
                    <p className="font-bold text-slate-900">{passenger.name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">
                      Emergency 24/7 Hotline
                    </span>
                    <p className="font-mono font-bold text-blue-700">+1-302-777-1234</p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Overseas Medical Expenses & Hospitalization</span>
                    <span className="font-bold text-slate-900">$100,000 USD</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Emergency Medical Evacuation & Repatriation</span>
                    <span className="font-bold text-slate-900">Unlimited (Actual Cost)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Flight & Baggage Delay Compensation</span>
                    <span className="font-bold text-slate-900">$1,500 USD</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Personal Liability Coverage</span>
                    <span className="font-bold text-slate-900">$250,000 USD</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="bg-surface-container px-4 sm:px-6 py-2.5 border-t border-outline-variant/40 flex items-center justify-between text-xs text-on-surface-variant font-roboto">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span>Digital Hash: SHA256-TK889-{passenger.id.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Issuing Partner: {activeDoc.issuedBy}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
