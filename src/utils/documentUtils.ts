import type { Passenger, TourPackage } from '../types/tour';
import { scenarioBasePath } from '../scenario';

export type DocumentType = 'passport' | 'visa' | 'eticket' | 'insurance';

export interface PassengerDocument {
  id: string;
  type: DocumentType;
  title: string;
  subtitle: string;
  fileName: string;
  fileSize: string;
  docNumber: string;
  status: 'verified' | 'warning' | 'pending';
  statusLabel: string;
  issuedBy: string;
  issueDate: string;
  expiryDate?: string;
}

const airportCode = (label: string): string => label.match(/\((\w{3})\)/)?.[1] || label;

export const getPassengerDocuments = (p: Passenger, tour: TourPackage): PassengerDocument[] => {
  const isExpiringSoon = !p.isPassportValid;
  const isUmrah = tour.scenario === 'umrah';
  const { flight } = tour;

  return [
    {
      id: `${p.id}-passport`,
      type: 'passport',
      title: 'Passport Biodata Page (Scan)',
      subtitle: 'Republic of Indonesia Official Travel Document',
      fileName: `PASSPORT_${p.passportNumber}_SCAN.pdf`,
      fileSize: '1.84 MB PDF',
      docNumber: p.passportNumber,
      status: isExpiringSoon ? 'warning' : 'verified',
      statusLabel: isExpiringSoon ? 'Expiring Soon (<6mo)' : 'Verified Compliant',
      issuedBy: 'Directorate General of Immigration Indonesia',
      issueDate: '2021-08-14',
      expiryDate: p.passportExpiry,
    },
    {
      id: `${p.id}-visa`,
      type: 'visa',
      title: isUmrah ? 'Umrah Visa' : 'Japan Visa Waiver Registration',
      subtitle: isUmrah ? 'Issued through Nusuk for this departure' : 'For Indonesian e-passport holders',
      fileName: isUmrah ? `UMRAH_VISA_${p.passportNumber}.pdf` : `VISA_WAIVER_JP_${p.passportNumber}.pdf`,
      fileSize: '624 KB PDF',
      docNumber: p.eVisaNumber || `${isUmrah ? 'UV-2026-KSA' : 'VW-2026-JKT'}-${p.passportNumber.slice(-4)}`,
      status: p.visaStatus === 'approved' ? 'verified' : p.visaStatus === 'flagged' ? 'warning' : 'pending',
      statusLabel: p.visaStatus === 'approved' ? (isUmrah ? 'Issued' : 'Registered') : p.visaStatus === 'flagged' ? 'Needs Review' : 'Pending',
      issuedBy: isUmrah ? 'Saudi umrah visa platform (sample)' : 'Embassy of Japan in Indonesia',
      issueDate: '2026-09-15',
      // A waiver registration cannot outlive the passport it is tied to
      expiryDate: isUmrah ? '2026-12-14' : p.passportExpiry < '2029-09-14' ? p.passportExpiry : '2029-09-14',
    },
    {
      id: `${p.id}-eticket`,
      type: 'eticket',
      title: 'Flight E-Ticket Receipt & Boarding Pass',
      subtitle: `${flight.carrier} ${flight.number} (${airportCode(flight.origin)} ➔ ${airportCode(flight.destination)})`,
      fileName: `ETICKET_${flight.number}_${p.passportNumber}.pdf`,
      fileSize: '890 KB PDF',
      docNumber: `131-${Math.abs(hashString(p.name)).toString().padStart(10, '0').slice(0, 10)}`,
      status: 'verified',
      statusLabel: p.seatNumber ? `Confirmed Seat ${p.seatNumber}` : 'Confirmed',
      issuedBy: flight.carrier,
      issueDate: '2026-09-20',
      expiryDate: '2026-10-15',
    },
    {
      id: `${p.id}-insurance`,
      type: 'insurance',
      title: 'Travel Insurance Policy',
      subtitle: 'Overseas Emergency Medical & Trip Coverage',
      fileName: `TRAVEL_POLICY_${p.passportNumber}.pdf`,
      fileSize: '1.15 MB PDF',
      docNumber: `TI-ID-889-${p.id.toUpperCase()}`,
      status: 'verified',
      statusLabel: '$100,000 USD Medical Coverage',
      issuedBy: 'Sample Insurer',
      issueDate: '2026-09-25',
      expiryDate: '2026-10-25',
    },
  ];
};

export const getDocumentDirectUrl = (
  passengerId: string,
  docType: DocumentType = 'passport'
): string => {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://demo.tourlinks.co';

  return `${origin}${scenarioBasePath}/docs?passenger=${passengerId}&type=${docType}`;
};

export const generateMRZ = (p: Passenger): { line1: string; line2: string } => {
  // Format Name: SURNAME<<FIRSTNAME<MIDDLENAME
  const parts = p.name.replace(/[^a-zA-Z ]/g, '').trim().toUpperCase().split(' ');
  const surname = parts[parts.length - 1] || 'SANTOSO';
  const firstNames = parts.slice(0, parts.length - 1).join('<') || 'GUEST';
  const nameLine = `${surname}<<${firstNames}`.padEnd(39, '<').slice(0, 39);
  const line1 = `P<IDN${nameLine}`;

  // Line 2: Passport (9) + Check + Nationality (3) + DOB (6) + Check + Sex (1) + Expiry (6) + Check + Personal No (14) + Final Check
  const passportFmt = p.passportNumber.toUpperCase().padEnd(9, '<');
  const dobFmt = '880814'; // Standard birth date format YYMMDD
  const expiryRaw = p.passportExpiry.replace(/-/g, '').slice(2); // YYMMDD
  const sex = p.gender === 'F' ? 'F' : 'M';
  const line2 = `${passportFmt}4IDN${dobFmt}5${sex}${expiryRaw}3<<<<<<<<<<<<<<06`;

  return { line1, line2 };
};

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
