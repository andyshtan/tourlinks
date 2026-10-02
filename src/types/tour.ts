export type StakeholderRole = 'agent' | 'operator' | 'traveller';

export interface Passenger {
  id: string;
  name: string;
  gender: 'M' | 'F';
  passportNumber: string;
  passportExpiry: string; // YYYY-MM-DD
  isPassportValid: boolean; // false if < 6 months from Oct 2026
  visaStatus: 'approved' | 'pending' | 'flagged';
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
  avatarUrl?: string;
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
  reportedBy: 'Agent' | 'Operator' | 'Traveller';
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
  }[];
  proofImages: string[];
  operatorSignedAt?: string;
  agentApprovedAt?: string;
  isSettled: boolean;
}

export interface TourPackage {
  id: string;
  code: string;
  name: string;
  destination: string;
  dates: string;
  agentName: string;
  operatorName: string;
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
    guideName: string;
    guidePhone: string;
    guideLanguages: string[];
    guidePhoto: string;
    driverName: string;
    driverPhone: string;
    vehicleModel: string;
    vehiclePlate: string;
  };
  meetingPoint: {
    terminal: string;
    zone: string;
    pillar: string;
    photoUrl: string;
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
