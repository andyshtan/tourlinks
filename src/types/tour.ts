export type StakeholderRole = 'agent' | 'leader' | 'operator' | 'traveller';

export interface BookingGroup {
  id: string;
  bookingRef: string;
  groupName: string;
  groupType: 'Family' | 'Couple' | 'Friends' | 'Corporate';
  leadPassengerId: string;
  leadPassengerName: string;
  leadPhone: string;
  paxCount: number;
  roomNumbers: string[];
}

export interface Passenger {
  id: string;
  name: string;
  gender: 'M' | 'F';
  passportNumber: string;
  passportExpiry: string; // YYYY-MM-DD
  isPassportValid: boolean; // false if expiry is < 6 months after the tour ends (agency policy)
  visaStatus: 'approved' | 'pending' | 'flagged'; // Japan visa waiver registration (e-passport)
  roomType: 'Twin' | 'Double' | 'Single';
  roomNumber: string;
  dietary: 'Standard' | 'Halal' | 'Vegetarian' | 'No Beef' | 'Allergy';
  dietaryNotes?: string;
  phone: string;
  rollCallStatus: 'present' | 'missing';
  hasClearedCustoms: boolean;
  seatNumber?: string;
  baggageTag?: string;
  eVisaNumber?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  roommateName?: string;

  // Group / Family Party Information
  groupId: string;
  groupName: string;
  bookingRef: string;
  groupRole: 'Lead Guest' | 'Spouse' | 'Child' | 'Friend' | 'Colleague';
  isGroupLead: boolean;

  // Consortium departure: the retail agency that sold this booking to the lead operator
  sellingAgent: string;
}

export type ArrivalStepId = 'standby' | 'landed' | 'customs_meet' | 'boarded_enroute';

export interface ArrivalCheckpoint {
  id: ArrivalStepId;
  labelKey: 'stepStandby' | 'stepLanded' | 'stepCustoms' | 'stepBoarded';
  time: string;
  status: 'completed' | 'in_progress' | 'pending';
  updatedBy: string;
}

export interface ItineraryItem {
  id: string;
  day: number;
  time: string;
  adjustedTime?: string;
  title: string;
  titleJa?: string;
  location: string;
  description: string;
  category: 'flight' | 'transfer' | 'sightseeing' | 'meal' | 'hotel' | 'free_time';
  status: 'completed' | 'current' | 'upcoming';
  delayMinutes: number;
}

export interface GatheringPin {
  isActive: boolean;
  locationName: string;
  targetTime: string;
  totalMinutes: number;
  remainingMinutes: number;
  latitude: number;
  longitude: number;
  notes: string;
}

export interface Incident {
  id: string;
  title: string;
  passengerName?: string;
  reportedBy: 'Agent' | 'Tour Leader' | 'Operator' | 'Traveller';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved';
  timestamp: string;
  notes: string[];
}

export interface SettlementLedger {
  baseNetRate: number;
  currency: string;
  extraCharges: {
    id: string;
    description: string;
    amount: number;
    approved: boolean;
    leaderConfirmed: boolean; // tour leader confirms on the ground that the extra happened
  }[];
  proofImages: { src: string; label: string }[];
  operatorSignedAt?: string;
  agentApprovedAt?: string;
  isSettled: boolean;
}

export interface TourPackage {
  id: string;
  code: string; // Universal Tour Reference
  name: string; // Master Friendly Name

  // Agent (Retail Outbound Package)
  agentPackageCode: string; // 'PKG-JKT-889'
  agentProductName: string; // '6D5N Tokyo Autumn Wonder & Mt. Fuji Discovery'
  agentName: string; // 'Nusantara Tour & Travel HQ'

  // DMC / Ground Operator (Land Arrangement Service)
  dmcProductCode: string; // 'TYO-PVT-06D'
  dmcProductName: string; // 'Kanto Golden Route 6D - Private Coach & Bilingual Guide'
  dmcProductNameJa: string; // '関東ゴールデンルート6日間 専用車・ガイド手配'
  operatorName: string; // 'Japan Land DMC Tokyo'

  destination: string;
  dates: string;
  flight: {
    number: string;
    carrier: string;
    origin: string;
    destination: string;
    depTime: string;
    arrTime: string;
    status: 'Scheduled' | 'In Flight' | 'Landed' | 'Delayed';
    terminal: string;
    belt: string;
  };
  staff: {
    tourLeaderName: string;
    tourLeaderPhone: string;
    tourLeaderLanguages: string[];
    guideName: string;
    guidePhone: string;
    guideLanguages: string[];
    driverName: string;
    driverPhone: string;
    vehicleModel: string;
    vehiclePlate: string;
  };
  meetingPoint: {
    terminal: string;
    zone: string;
    pillar: string;
    mapUrl: string;
    instructions: string;
  };
  hotel: {
    name: string;
    address: string;
    addressJapanese: string;
    phone: string;
    wifiSsid: string;
    wifiPass: string;
  };
}
