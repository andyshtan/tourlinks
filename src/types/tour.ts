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
  roomType: 'Twin' | 'Double' | 'Single' | 'Triple' | 'Quad';
  roomNumber: string;
  // Dietary need (leisure tours) or care need (umrah), shown wherever the manifest is
  dietary: 'Standard' | 'Halal' | 'Vegetarian' | 'No Beef' | 'Allergy' | 'Wheelchair' | 'Elderly' | 'Diabetic';
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
  groupRole: 'Lead Guest' | 'Spouse' | 'Child' | 'Parent' | 'Friend' | 'Colleague';
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
  titleLocal?: string; // title in the ground operator's language
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
  proofImages: { src: string; label: string; detail: string }[];
  operatorSignedAt?: string;
  agentApprovedAt?: string;
  isSettled: boolean;
}

export type ScenarioId = 'japan' | 'umrah';

// Wording that differs per demo scenario and is not worth translating per language
export interface ScenarioCopy {
  tz: string; // destination time zone label, e.g. 'JST'
  nowLocal: string; // demo clock at the destination
  weather: string;
  destinationFlag: string;
  operatorBase: string; // badge on the agent's DMC card
  operatorContract: string;
  flightBadge: string;
  flightDuration: string;
  arrivalLine: string; // signboard strapline
  welcomeLine: string;
  signboardTitle: string;
  signboardSubtitle: string;
  meetingPointShort: string;
  trafficTitle: string;
  trafficNote: string;
  netRateNote: string;
  visaLabel: string;
  visaSubLabel: string;
  visaStay: string;
  passportWarning: string;
  guideRole: string; // 'Local Guide' | 'Muthawif'
  paxNoun: string; // 'Guests' | 'Jamaah'
  operatorNoun: string; // how the ground supplier is called: 'DMC' | 'Ground Operator'
  careLabel: string; // heading for the dietary / care column
  careHighlight: Passenger['dietary']; // quick filter on the manifest
  incidentPlaceholder: string;
  taxiCardHeadline: string;
  cohortLabel: string;
  agentHqLine: string;
  nudgeMessage: string; // WhatsApp text; {name} is replaced
  aircraft: string;
  departureTerminal: string;
}

export interface TourPackage {
  scenario: ScenarioId;
  copy: ScenarioCopy;
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
  dmcProductNameLocal: string; // '関東ゴールデンルート6日間 専用車・ガイド手配'
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
    nameLocal: string;
    addressLocal: string;
    phone: string;
    wifiSsid: string;
    wifiPass: string;
  };
}
