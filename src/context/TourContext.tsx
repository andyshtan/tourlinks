import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type {
  TourPackage,
  Passenger,
  BookingGroup,
  ArrivalCheckpoint,
  ItineraryItem,
  GatheringPin,
  Incident,
  SettlementLedger,
  StakeholderRole,
} from '../types/tour';
import { scenario } from '../scenario';
import {
  umrahTour,
  umrahPassengers,
  umrahCheckpoints,
  umrahItinerary,
  umrahGatheringPin,
  umrahIncidents,
  umrahSettlement,
} from '../data/umrah';

interface TourContextType {
  role: StakeholderRole;
  setRole: (role: StakeholderRole) => void;
  tour: TourPackage;
  passengers: Passenger[];
  bookingGroups: BookingGroup[];
  checkpoints: ArrivalCheckpoint[];
  itinerary: ItineraryItem[];
  gatheringPin: GatheringPin;
  incidents: Incident[];
  settlement: SettlementLedger;
  activeSosAlert: { passengerName: string; time: string; location: string } | null;
  selectedPassenger: Passenger | null;
  setSelectedPassenger: (p: Passenger | null) => void;
  openPassengerDetailById: (id: string) => void;
  // Actions
  advanceCheckpoint: (updatedBy?: string) => void;
  updateRollCall: (id: string, status: 'present' | 'missing') => void;
  updateGroupRollCall: (groupId: string, status: 'present' | 'missing') => void;
  passengerClearedCustoms: (id: string) => void;
  shiftSchedule: (minutes: number) => void;
  toggleGatheringPin: () => void;
  triggerSOS: () => void;
  dismissSOS: () => void;
  approveSettlement: () => void;
  confirmExtraByLeader: (id: string) => void;
  nudgePassengerWhatsApp: (phone: string, name: string) => void;
  addIncident: (title: string, severity: 'low' | 'medium' | 'high' | 'critical') => void;
  resolveIncident: (id: string) => void;
}

const japanTour: TourPackage = {
  scenario: 'japan',
  copy: {
    tz: 'JST',
    nowLocal: '16:15 JST',
    weather: 'Tokyo: 19°C Crisp Autumn',
    destinationFlag: '🇯🇵',
    operatorBase: 'Tokyo HQ',
    operatorContract: 'DMC-TYO-994',
    flightBadge: 'JL720 • Landed at NRT T1',
    flightDuration: '7h 20m',
    arrivalLine: 'Japan Airlines JL-720 • Narita Terminal 1',
    welcomeLine: 'Welcome to Tokyo, Japan',
    signboardTitle: 'NUSANTARA ODYSSEY',
    signboardSubtitle: 'TOKYO & MT. FUJI DELEGATION',
    meetingPointShort: 'Pillar #17',
    trafficTitle: 'Metropolitan Expressway Traffic',
    trafficNote: 'Heavy traffic at Hakozaki Junction (+20 min delay expected to Shinjuku).',
    netRateNote: '6D5N Coach + Hotels',
    visaLabel: 'Japan Visa Waiver',
    visaSubLabel: 'e-passport registration',
    visaStay: 'UP TO 15 DAYS',
    passportWarning:
      "Passport expires within 6 months of the tour dates, below agency policy. Check the destination's entry rules and keep the return ticket and hotel voucher at hand.",
    guideRole: 'Local Guide',
    paxNoun: 'Guests',
    operatorNoun: 'DMC',
    careLabel: 'Dietary',
    careHighlight: 'Halal',
    incidentPlaceholder: 'e.g. Guest left the group at Shinjuku station / lost baggage / medical',
    taxiCardHeadline: 'Show to Taxi Driver (タクシー運転手様へ)',
    cohortLabel: 'Tokyo Cohort',
    agentHqLine: 'Nusantara Odyssey HQ in Jakarta',
    nudgeMessage:
      'Hello {name}, this is Nusantara Odyssey Travel. Your passport expires within 6 months of the tour dates. Please contact us about renewing it before departure.',
    aircraft: 'Boeing 787-9',
    departureTerminal: 'T3',
  },

  id: 'TK-2026-B4',
  code: 'TK-OUT-889',
  name: 'Tokyo Autumn Wonder & Mt. Fuji Discovery',

  // Agent (Retail Outbound Package)
  agentPackageCode: 'PKG-JKT-889',
  agentProductName: '6D5N Tokyo Autumn Wonder & Mt. Fuji Discovery',
  agentName: 'Nusantara Odyssey Travel (Jakarta HQ)',

  // DMC / Ground Operator (Land Arrangement Service)
  dmcProductCode: 'TYO-PVT-06D',
  dmcProductName: 'Kanto Golden Route 6D - Private Coach & Bilingual Guide',
  dmcProductNameLocal: '関東ゴールデンルート6日間 専用車・ガイド手配',
  operatorName: 'Sakura Nippon DMC & Ground Transport (Tokyo)',

  destination: 'Tokyo & Yamanashi, Japan',
  dates: 'Oct 2 - Oct 7, 2026',
  flight: {
    number: 'JL720',
    carrier: 'Japan Airlines',
    origin: 'Jakarta (CGK)',
    destination: 'Tokyo Narita (NRT)',
    depTime: '06:35 WIB',
    arrTime: '15:55 JST',
    status: 'Landed',
    terminal: 'Terminal 1 South Wing',
    belt: 'Carousel #3',
  },
  staff: {
    tourLeaderName: 'Rina Hartono',
    tourLeaderPhone: '+62-812-9000-1188',
    tourLeaderLanguages: ['Indonesian', 'English', 'Basic Japanese'],
    guideName: 'Yumi Sato',
    guidePhone: '+81-90-5552-3819',
    guideLanguages: ['English', 'Indonesian', 'Japanese'],
    driverName: 'Kenji Tanaka',
    driverPhone: '+81-80-4412-9901',
    vehicleModel: 'Toyota Coaster Executive Coach #4',
    vehiclePlate: '品川 200 か 48-12',
  },
  meetingPoint: {
    terminal: 'Narita Terminal 1 (NRT)',
    zone: 'South Wing Arrival Lobby',
    pillar: 'Pillar #17 (Near Starbucks & JR East Desk)',
    mapUrl: '/demo/meeting-point-map.svg',
    instructions: 'Exit Customs via the South Gate and turn right. Guide Yumi holds a "NUSANTARA ODYSSEY" board at Pillar #17.',
  },
  hotel: {
    name: 'Shinjuku Granbell Hotel Tokyo',
    nameLocal: '新宿グランベルホテル',
    address: '2-14-5 Kabukicho, Shinjuku-ku, Tokyo 160-0021',
    addressLocal: '東京都新宿区歌舞伎町2-14-5',
    phone: '+81-3-5155-2666',
    wifiSsid: 'Granbell_Guest_5G',
    wifiPass: 'tokyo2026',
  },
};

const japanPassengers: Passenger[] = [
  // Group 1: Santoso Family (BKG-SAN-881)
  {
    id: 'p1',
    name: 'Budi Santoso',
    gender: 'M',
    passportNumber: 'A8892104',
    passportExpiry: '2029-08-14',
    isPassportValid: true,
    visaStatus: 'approved',
    roomType: 'Twin',
    roomNumber: '812',
    dietary: 'Halal',
    dietaryNotes: 'Strict Halal, No Pork / Mirin',
    phone: '+628119876543',
    rollCallStatus: 'present',
    hasClearedCustoms: true,
    seatNumber: '14A',
    baggageTag: 'JL-88901',
    groupId: 'grp-1',
    groupName: 'Santoso Family',
    bookingRef: 'BKG-SAN-881',
    groupRole: 'Lead Guest',
    isGroupLead: true,
    sellingAgent: 'Nusantara Odyssey (direct)',
  },
  {
    id: 'p2',
    name: 'Dewi Lestari',
    gender: 'F',
    passportNumber: 'A8892105',
    passportExpiry: '2029-08-14',
    isPassportValid: true,
    visaStatus: 'approved',
    roomType: 'Twin',
    roomNumber: '812',
    dietary: 'Halal',
    phone: '+628119876544',
    rollCallStatus: 'present',
    hasClearedCustoms: true,
    seatNumber: '14B',
    baggageTag: 'JL-88902',
    groupId: 'grp-1',
    groupName: 'Santoso Family',
    bookingRef: 'BKG-SAN-881',
    groupRole: 'Spouse',
    isGroupLead: false,
    sellingAgent: 'Nusantara Odyssey (direct)',
  },

  // Group 2: Wijaya - Tan Couple (BKG-WIJ-882)
  {
    id: 'p3',
    name: 'Kevin Wijaya',
    gender: 'M',
    passportNumber: 'C1049281',
    passportExpiry: '2026-11-20', // under the agency 6-month policy
    isPassportValid: false,
    visaStatus: 'approved',
    roomType: 'Double',
    roomNumber: '814',
    dietary: 'Standard',
    phone: '+628123344556',
    rollCallStatus: 'present',
    hasClearedCustoms: false,
    seatNumber: '15C',
    baggageTag: 'JL-88903',
    groupId: 'grp-2',
    groupName: 'Wijaya & Tan Couple',
    bookingRef: 'BKG-WIJ-882',
    groupRole: 'Lead Guest',
    isGroupLead: true,
    sellingAgent: 'Lintas Sakura Tour (Surabaya)',
  },
  {
    id: 'p4',
    name: 'Jessica Tan',
    gender: 'F',
    passportNumber: 'B7723910',
    passportExpiry: '2028-04-10',
    isPassportValid: true,
    visaStatus: 'approved',
    roomType: 'Double',
    roomNumber: '814',
    dietary: 'Vegetarian',
    dietaryNotes: 'Lacto-ovo vegetarian',
    phone: '+628139988776',
    rollCallStatus: 'present',
    hasClearedCustoms: true,
    seatNumber: '15D',
    baggageTag: 'JL-88904',
    groupId: 'grp-2',
    groupName: 'Wijaya & Tan Couple',
    bookingRef: 'BKG-WIJ-882',
    groupRole: 'Spouse',
    isGroupLead: false,
    sellingAgent: 'Lintas Sakura Tour (Surabaya)',
  },

  // Group 3: Tan & Salim Duo (BKG-TAN-883)
  {
    id: 'p5',
    name: 'Michael Tan',
    gender: 'M',
    passportNumber: 'B7723911',
    passportExpiry: '2028-04-10',
    isPassportValid: true,
    visaStatus: 'approved',
    roomType: 'Single',
    roomNumber: '815',
    dietary: 'No Beef',
    phone: '+628139988777',
    rollCallStatus: 'present',
    hasClearedCustoms: true,
    seatNumber: '16A',
    baggageTag: 'JL-88905',
    groupId: 'grp-3',
    groupName: 'Tan & Salim Duo',
    bookingRef: 'BKG-TAN-883',
    groupRole: 'Lead Guest',
    isGroupLead: true,
    sellingAgent: 'Lintas Sakura Tour (Surabaya)',
  },
  {
    id: 'p10',
    name: 'Clarissa Salim',
    gender: 'F',
    passportNumber: 'C8819022',
    passportExpiry: '2027-11-30',
    isPassportValid: true,
    visaStatus: 'approved',
    roomType: 'Single',
    roomNumber: '818',
    dietary: 'Allergy',
    dietaryNotes: 'Severe Peanut & Shellfish allergy',
    phone: '+628190011223',
    rollCallStatus: 'present',
    hasClearedCustoms: true,
    seatNumber: '16B',
    baggageTag: 'JL-88910',
    groupId: 'grp-3',
    groupName: 'Tan & Salim Duo',
    bookingRef: 'BKG-TAN-883',
    groupRole: 'Colleague',
    isGroupLead: false,
    sellingAgent: 'Lintas Sakura Tour (Surabaya)',
  },

  // Group 4: Rahmawati & Hidayah (BKG-RAH-884)
  {
    id: 'p6',
    name: 'Siti Rahmawati',
    gender: 'F',
    passportNumber: 'A9912033',
    passportExpiry: '2026-12-05', // under the agency 6-month policy
    isPassportValid: false,
    visaStatus: 'approved',
    roomType: 'Twin',
    roomNumber: '816',
    dietary: 'Halal',
    phone: '+628178822991',
    rollCallStatus: 'missing',
    hasClearedCustoms: false,
    seatNumber: '17C',
    baggageTag: 'JL-88906',
    groupId: 'grp-4',
    groupName: 'Rahmawati & Hidayah',
    bookingRef: 'BKG-RAH-884',
    groupRole: 'Lead Guest',
    isGroupLead: true,
    sellingAgent: 'Danau Biru Travel (Medan)',
  },
  {
    id: 'p7',
    name: 'Nurul Hidayah',
    gender: 'F',
    passportNumber: 'A9912034',
    passportExpiry: '2030-01-22',
    isPassportValid: true,
    visaStatus: 'approved',
    roomType: 'Twin',
    roomNumber: '816',
    dietary: 'Halal',
    phone: '+628178822992',
    rollCallStatus: 'present',
    hasClearedCustoms: true,
    seatNumber: '17D',
    baggageTag: 'JL-88907',
    groupId: 'grp-4',
    groupName: 'Rahmawati & Hidayah',
    bookingRef: 'BKG-RAH-884',
    groupRole: 'Friend',
    isGroupLead: false,
    sellingAgent: 'Danau Biru Travel (Medan)',
  },

  // Group 5: Kusuma & Pratama (BKG-KUS-885)
  {
    id: 'p8',
    name: 'Hendro Kusuma',
    gender: 'M',
    passportNumber: 'D4401928',
    passportExpiry: '2029-05-18',
    isPassportValid: true,
    visaStatus: 'approved',
    roomType: 'Twin',
    roomNumber: '817',
    dietary: 'Standard',
    phone: '+628155533112',
    rollCallStatus: 'present',
    hasClearedCustoms: true,
    seatNumber: '18A',
    baggageTag: 'JL-88908',
    groupId: 'grp-5',
    groupName: 'Kusuma & Pratama',
    bookingRef: 'BKG-KUS-885',
    groupRole: 'Lead Guest',
    isGroupLead: true,
    sellingAgent: 'Nusantara Odyssey (direct)',
  },
  {
    id: 'p9',
    name: 'Agus Pratama',
    gender: 'M',
    passportNumber: 'D4401929',
    passportExpiry: '2029-05-18',
    isPassportValid: true,
    visaStatus: 'approved',
    roomType: 'Twin',
    roomNumber: '817',
    dietary: 'Standard',
    phone: '+628155533113',
    rollCallStatus: 'present',
    hasClearedCustoms: true,
    seatNumber: '18B',
    baggageTag: 'JL-88909',
    groupId: 'grp-5',
    groupName: 'Kusuma & Pratama',
    bookingRef: 'BKG-KUS-885',
    groupRole: 'Friend',
    isGroupLead: false,
    sellingAgent: 'Nusantara Odyssey (direct)',
  },

  // Group 6: Kurniawan & Basri (BKG-KUR-886)
  {
    id: 'p11',
    name: 'Rian Kurniawan',
    gender: 'M',
    passportNumber: 'B3301988',
    passportExpiry: '2031-02-14',
    isPassportValid: true,
    visaStatus: 'approved',
    roomType: 'Twin',
    roomNumber: '819',
    dietary: 'Halal',
    phone: '+628127788441',
    rollCallStatus: 'present',
    hasClearedCustoms: true,
    seatNumber: '19C',
    baggageTag: 'JL-88911',
    groupId: 'grp-6',
    groupName: 'Kurniawan & Basri',
    bookingRef: 'BKG-KUR-886',
    groupRole: 'Lead Guest',
    isGroupLead: true,
    sellingAgent: 'Karang Emas Holiday (Makassar)',
  },
  {
    id: 'p12',
    name: 'Faisal Basri',
    gender: 'M',
    passportNumber: 'B3301989',
    passportExpiry: '2031-02-14',
    isPassportValid: true,
    visaStatus: 'approved',
    roomType: 'Twin',
    roomNumber: '819',
    dietary: 'Halal',
    phone: '+628127788442',
    rollCallStatus: 'present',
    hasClearedCustoms: true,
    seatNumber: '19D',
    baggageTag: 'JL-88912',
    groupId: 'grp-6',
    groupName: 'Kurniawan & Basri',
    bookingRef: 'BKG-KUR-886',
    groupRole: 'Friend',
    isGroupLead: false,
    sellingAgent: 'Karang Emas Holiday (Makassar)',
  },

  // Group 7: Wardhana Couple (BKG-WAR-887)
  {
    id: 'p13',
    name: 'Anita Wardhana',
    gender: 'F',
    passportNumber: 'E9981240',
    passportExpiry: '2028-09-09',
    isPassportValid: true,
    visaStatus: 'approved',
    roomType: 'Double',
    roomNumber: '820',
    dietary: 'Standard',
    phone: '+628131100998',
    rollCallStatus: 'present',
    hasClearedCustoms: true,
    seatNumber: '20A',
    baggageTag: 'JL-88913',
    groupId: 'grp-7',
    groupName: 'Wardhana Couple',
    bookingRef: 'BKG-WAR-887',
    groupRole: 'Lead Guest',
    isGroupLead: true,
    sellingAgent: 'Danau Biru Travel (Medan)',
  },
  {
    id: 'p14',
    name: 'Doni Wardhana',
    gender: 'M',
    passportNumber: 'E9981241',
    passportExpiry: '2028-09-09',
    isPassportValid: true,
    visaStatus: 'approved',
    roomType: 'Double',
    roomNumber: '820',
    dietary: 'Standard',
    phone: '+628131100999',
    rollCallStatus: 'present',
    hasClearedCustoms: true,
    seatNumber: '20B',
    baggageTag: 'JL-88914',
    groupId: 'grp-7',
    groupName: 'Wardhana Couple',
    bookingRef: 'BKG-WAR-887',
    groupRole: 'Spouse',
    isGroupLead: false,
    sellingAgent: 'Danau Biru Travel (Medan)',
  },
];

const japanCheckpoints: ArrivalCheckpoint[] = [
  {
    id: 'standby',
    labelKey: 'stepStandby',
    time: '15:15 JST',
    status: 'completed',
    updatedBy: 'Kenji Tanaka (Chauffeur)',
  },
  {
    id: 'landed',
    labelKey: 'stepLanded',
    time: '15:55 JST',
    status: 'completed',
    updatedBy: 'Auto Flight Radar (JL720)',
  },
  {
    id: 'customs_meet',
    labelKey: 'stepCustoms',
    time: '16:25 JST',
    status: 'in_progress',
    updatedBy: 'Rina Hartono (Tour Leader)',
  },
  {
    id: 'boarded_enroute',
    labelKey: 'stepBoarded',
    time: '17:15 JST (Est)',
    status: 'pending',
    updatedBy: 'System',
  },
];

const japanItinerary: ItineraryItem[] = [
  {
    id: 'it-1',
    day: 1,
    time: '15:55',
    title: 'JL720 Flight Landed at NRT T1',
    titleLocal: 'JL720便 成田空港第1ターミナル到着',
    location: 'Narita International Airport',
    description: 'Passengers disembark, clear immigration, collect baggage, pass customs.',
    category: 'flight',
    status: 'completed',
    delayMinutes: 0,
  },
  {
    id: 'it-2',
    day: 1,
    time: '16:30',
    title: 'Arrival Handshake & Boarding Coach',
    titleLocal: '到着ミーティング＆専用バス乗車',
    location: 'NRT T1 South Wing Pillar #17',
    description: 'Tour leader Rina meets guide Yumi Sato at Pillar #17; the group boards Toyota Coaster #4 driven by Kenji Tanaka.',
    category: 'transfer',
    status: 'current',
    delayMinutes: 10,
  },
  {
    id: 'it-3',
    day: 1,
    time: '18:15',
    title: 'Hotel Check-in & Room Key Distribution',
    titleLocal: 'ホテルチェックイン・ルームキー配布',
    location: 'Shinjuku Granbell Hotel',
    description: 'Rooms pre-blocked on the 8th floor. Tour leader hands out room keys and breakfast vouchers.',
    category: 'hotel',
    status: 'upcoming',
    delayMinutes: 0,
  },
  {
    id: 'it-4',
    day: 1,
    time: '19:30',
    title: 'Welcome Dinner: Halal & Washoku Banquet',
    titleLocal: 'ウェルカムディナー（ハラール対応和食宴会）',
    location: 'Sakura-tei Halal Washoku, Shinjuku (Private Room)',
    description: 'Pre-ordered set menus: 6 halal, 1 vegetarian, 1 no-beef, 1 allergy-safe, 5 standard.',
    category: 'meal',
    status: 'upcoming',
    delayMinutes: 0,
  },
  {
    id: 'it-5',
    day: 2,
    time: '08:30',
    title: 'Mt. Fuji 5th Station & Lake Kawaguchiko Excursion',
    titleLocal: '富士山五合目＆河口湖日帰り観光',
    location: 'Fuji-Hakone-Izu National Park',
    description: 'Private coach departs hotel prompt 08:30. Gathering pin armed at station.',
    category: 'sightseeing',
    status: 'upcoming',
    delayMinutes: 0,
  },
];

const japanGatheringPin: GatheringPin = {
  isActive: true,
  locationName: 'Narita T1 South Wing • Pillar #17 Meeting Point',
  targetTime: '17:00 JST',
  totalMinutes: 35,
  remainingMinutes: 24,
  latitude: 35.7647,
  longitude: 140.3863,
  notes: 'Guide holding digital "NUSANTARA ODYSSEY" sign near Starbucks entrance.',
};

const japanIncidents: Incident[] = [
  {
    id: 'INC-101',
    title: 'Short passport validity: Kevin Wijaya (expires 2026-11-20)',
    passengerName: 'Kevin Wijaya',
    reportedBy: 'Agent',
    severity: 'high',
    status: 'investigating',
    timestamp: '14:20 JST',
    notes: [
      'Flagged before departure: under the agency 6-month policy. Cleared to travel after the agency checked Japan entry rules.',
      'Tour leader carries his return e-ticket (JL729, Oct 7) and hotel voucher in case immigration asks.',
    ],
  },
  {
    id: 'INC-102',
    title: 'Severe Shellfish & Peanut Allergy Alert (Clarissa Salim)',
    passengerName: 'Clarissa Salim',
    reportedBy: 'Operator',
    severity: 'medium',
    status: 'investigating',
    timestamp: '14:35 JST',
    notes: [
      'Japanese allergy emergency card translated and issued to guide Yumi Sato.',
      'Dinner restaurant Sakura-tei briefed: no peanut or shellfish, separate preparation.',
    ],
  },
];

const japanSettlement: SettlementLedger = {
  baseNetRate: 1450000, // JPY, land arrangement for 14 pax, 6D5N
  currency: 'JPY',
  extraCharges: [
    {
      id: 'ex-1',
      description: 'Highway Toll Narita Sky Access & Shinjuku Ramp Overtime',
      amount: 8600,
      approved: true,
      leaderConfirmed: true,
    },
    {
      id: 'ex-2',
      description: 'Halal Certified Bento Supplement (Day 2 Fuji Trip, 6 Pax)',
      amount: 14400,
      approved: false,
      leaderConfirmed: false,
    },
    {
      id: 'ex-3',
      description: 'Late Night Chauffeur Standby Fee (>21:00)',
      amount: 12000,
      approved: false,
      leaderConfirmed: false,
    },
  ],
  proofImages: [
    {
      src: '/demo/proof-service-sheet.svg',
      label: 'Signed arrival service sheet',
      detail: '16:50 JST • 14 guests • signed by guide and tour leader',
    },
    {
      src: '/demo/proof-toll-receipt.svg',
      label: 'Expressway toll receipt',
      detail: '17:42 JST • ¥8,600 • Narita IC to Shinjuku',
    },
  ],
  operatorSignedAt: '2026-10-02 16:15 JST',
  isSettled: false,
};

// The demo scenario is fixed per page load (see src/scenario.ts)
const isUmrah = scenario === 'umrah';
const initialTour = isUmrah ? umrahTour : japanTour;
const initialPassengers = isUmrah ? umrahPassengers : japanPassengers;
const initialCheckpoints = isUmrah ? umrahCheckpoints : japanCheckpoints;
const initialItinerary = isUmrah ? umrahItinerary : japanItinerary;
const initialGatheringPin = isUmrah ? umrahGatheringPin : japanGatheringPin;
const initialIncidents = isUmrah ? umrahIncidents : japanIncidents;
const initialSettlement = isUmrah ? umrahSettlement : japanSettlement;

const TourContext = createContext<TourContextType | undefined>(undefined);

export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<StakeholderRole>('agent');
  const [tour] = useState<TourPackage>(initialTour);
  const [passengers, setPassengers] = useState<Passenger[]>(initialPassengers);
  const [checkpoints, setCheckpoints] = useState<ArrivalCheckpoint[]>(initialCheckpoints);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(initialItinerary);
  const [gatheringPin, setGatheringPin] = useState<GatheringPin>(initialGatheringPin);
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [settlement, setSettlement] = useState<SettlementLedger>(initialSettlement);
  const [activeSosAlert, setActiveSosAlert] = useState<{
    passengerName: string;
    time: string;
    location: string;
  } | null>(null);

  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | null>(null);

  // Compute Booking Groups dynamically from passengers
  const bookingGroups: BookingGroup[] = useMemo(() => {
    const groupMap = new Map<string, Passenger[]>();
    passengers.forEach((p) => {
      const list = groupMap.get(p.groupId) || [];
      list.push(p);
      groupMap.set(p.groupId, list);
    });

    return Array.from(groupMap.entries()).map(([groupId, members]) => {
      const lead = members.find((m) => m.isGroupLead) || members[0];
      const rooms = Array.from(new Set(members.map((m) => `Room ${m.roomNumber}`)));

      return {
        id: groupId,
        bookingRef: lead.bookingRef,
        groupName: lead.groupName,
        groupType:
          members.length > 2
            ? 'Family'
            : lead.groupRole === 'Spouse' || members.some((m) => m.groupRole === 'Spouse')
            ? 'Couple'
            : lead.groupRole === 'Colleague'
            ? 'Corporate'
            : 'Friends',
        leadPassengerId: lead.id,
        leadPassengerName: lead.name,
        leadPhone: lead.phone,
        paxCount: members.length,
        roomNumbers: rooms,
      };
    });
  }, [passengers]);

  const openPassengerDetailById = (id: string) => {
    const p = passengers.find((x) => x.id === id);
    if (p) setSelectedPassenger(p);
  };

  // 1-Click Roll Call by entire Travel Group
  const updateGroupRollCall = (groupId: string, status: 'present' | 'missing') => {
    setPassengers((prev) =>
      prev.map((p) => (p.groupId === groupId ? { ...p, rollCallStatus: status } : p))
    );
  };

  // Interval timer for Gathering Pin countdown
  useEffect(() => {
    if (!gatheringPin.isActive) return;
    const interval = setInterval(() => {
      setGatheringPin((prev) => {
        if (prev.remainingMinutes <= 0) return prev;
        return { ...prev, remainingMinutes: prev.remainingMinutes - 1 };
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [gatheringPin.isActive]);

  const advanceCheckpoint = (updatedBy?: string) => {
    setCheckpoints((prev) => {
      const inProgIdx = prev.findIndex((c) => c.status === 'in_progress');
      if (inProgIdx === -1) return prev;
      return prev.map((c, idx) => {
        if (idx === inProgIdx) {
          return { ...c, status: 'completed', updatedBy: updatedBy || c.updatedBy };
        }
        if (idx === inProgIdx + 1) {
          return { ...c, status: 'in_progress', time: 'Just now' };
        }
        return c;
      });
    });
  };

  const updateRollCall = (id: string, status: 'present' | 'missing') => {
    setPassengers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, rollCallStatus: status } : p))
    );
  };

  const passengerClearedCustoms = (id: string) => {
    setPassengers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, hasClearedCustoms: true } : p))
    );
  };

  const shiftSchedule = (minutes: number) => {
    setItinerary((prev) =>
      prev.map((item) => {
        if (item.status === 'completed') return item;
        return {
          ...item,
          delayMinutes: item.delayMinutes + minutes,
          adjustedTime: `+${minutes}m delay`,
        };
      })
    );
  };

  const toggleGatheringPin = () => {
    setGatheringPin((prev) => ({
      ...prev,
      isActive: !prev.isActive,
      remainingMinutes: prev.isActive ? 0 : prev.totalMinutes,
    }));
  };

  const triggerSOS = () => {
    setActiveSosAlert({
      passengerName: passengers[0].name,
      time: tour.copy.nowLocal,
      location: `${tour.meetingPoint.terminal}, ${tour.meetingPoint.zone}`,
    });
  };

  const dismissSOS = () => {
    setActiveSosAlert(null);
  };

  const approveSettlement = () => {
    setSettlement((prev) => ({
      ...prev,
      isSettled: true,
      agentApprovedAt: `2026-10-02 ${tour.copy.nowLocal} (Approved by Agent HQ)`,
      extraCharges: prev.extraCharges.map((e) => ({ ...e, approved: true })),
    }));
  };

  const confirmExtraByLeader = (id: string) => {
    setSettlement((prev) => ({
      ...prev,
      extraCharges: prev.extraCharges.map((e) =>
        e.id === id ? { ...e, leaderConfirmed: true } : e
      ),
    }));
  };

  const nudgePassengerWhatsApp = (phone: string, name: string) => {
    const text = encodeURIComponent(tour.copy.nudgeMessage.replace('{name}', name));
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const addIncident = (title: string, severity: 'low' | 'medium' | 'high' | 'critical') => {
    const newInc: Incident = {
      id: `INC-${Math.floor(100 + Math.random() * 900)}`,
      title,
      reportedBy:
        role === 'agent'
          ? 'Agent'
          : role === 'leader'
          ? 'Tour Leader'
          : role === 'operator'
          ? 'Operator'
          : 'Traveller',
      severity,
      status: 'open',
      timestamp: 'Just now',
      notes: ['Logged to the shared incident log for this departure.'],
    };
    setIncidents((prev) => [newInc, ...prev]);
  };

  const resolveIncident = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status: 'resolved' } : inc))
    );
  };

  return (
    <TourContext.Provider
      value={{
        role,
        setRole,
        tour,
        passengers,
        bookingGroups,
        checkpoints,
        itinerary,
        gatheringPin,
        incidents,
        settlement,
        activeSosAlert,
        selectedPassenger,
        setSelectedPassenger,
        openPassengerDetailById,
        advanceCheckpoint,
        updateRollCall,
        updateGroupRollCall,
        passengerClearedCustoms,
        shiftSchedule,
        toggleGatheringPin,
        triggerSOS,
        dismissSOS,
        approveSettlement,
        confirmExtraByLeader,
        nudgePassengerWhatsApp,
        addIncident,
        resolveIncident,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};
