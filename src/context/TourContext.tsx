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
  advanceCheckpoint: () => void;
  updateRollCall: (id: string, status: 'present' | 'missing') => void;
  updateGroupRollCall: (groupId: string, status: 'present' | 'missing') => void;
  passengerClearedCustoms: (id: string) => void;
  shiftSchedule: (minutes: number) => void;
  toggleGatheringPin: () => void;
  triggerSOS: () => void;
  dismissSOS: () => void;
  approveSettlement: () => void;
  nudgePassengerWhatsApp: (phone: string, name: string) => void;
  addIncident: (title: string, severity: 'low' | 'medium' | 'high' | 'critical') => void;
  resolveIncident: (id: string) => void;
}

const initialTour: TourPackage = {
  id: 'TK-2026-B4',
  code: 'TK-OUT-889',
  name: 'Tokyo Autumn Wonder & Mt. Fuji Discovery',

  // Agent (Retail Outbound Package)
  agentPackageCode: 'PKG-JKT-889',
  agentProductName: '7D6N Tokyo Autumn Wonder & Mt. Fuji Discovery',
  agentName: 'Nusantara Odyssey Travel (Jakarta HQ)',

  // DMC / Ground Operator (Land Arrangement Service)
  dmcProductCode: 'TYO-PVT-07D',
  dmcProductName: 'Kanto Golden Route 7D - Private Coach & Bilingual Guide',
  dmcProductNameJa: '関東ゴールデンルート7日間 専用車・ガイド手配',
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
    guideName: 'Yumi Sato',
    guidePhone: '+81-90-5552-3819',
    guideLanguages: ['English', 'Indonesian', 'Japanese'],
    guidePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    driverName: 'Kenji Tanaka',
    driverPhone: '+81-80-4412-9901',
    vehicleModel: 'Toyota Coaster Executive Coach #4',
    vehiclePlate: '品川 200 か 48-12',
  },
  meetingPoint: {
    terminal: 'Narita Terminal 1 (NRT)',
    zone: 'South Wing Arrival Lobby',
    pillar: 'Pillar #17 (Near Starbucks & JR East Desk)',
    photoUrl: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=800&q=80',
    instructions: 'Exit Customs via South Gate, look right for Guide holding "NUSANTARA ODYSSEY" digital board.',
  },
  hotel: {
    name: 'Shinjuku Granbell Hotel Tokyo',
    address: '2-1-2 Kabukicho, Shinjuku-ku, Tokyo 160-0021',
    addressJapanese: '東京都新宿区歌舞伎町2-1-2 グランベルホテル新宿',
    phone: '+81-3-5155-2666',
    wifiSsid: 'Granbell_Guest_5G',
    wifiPass: 'tokyo2026',
  },
};

const initialPassengers: Passenger[] = [
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
  },

  // Group 2: Wijaya - Tan Couple (BKG-WIJ-882)
  {
    id: 'p3',
    name: 'Kevin Wijaya',
    gender: 'M',
    passportNumber: 'C1049281',
    passportExpiry: '2026-11-20', // LESS THAN 6 MONTHS!
    isPassportValid: false,
    visaStatus: 'flagged',
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
  },

  // Group 4: Rahmawati Family (BKG-RAH-884)
  {
    id: 'p6',
    name: 'Siti Rahmawati',
    gender: 'F',
    passportNumber: 'A9912033',
    passportExpiry: '2026-12-05', // ALSO < 6 MONTHS!
    isPassportValid: false,
    visaStatus: 'pending',
    roomType: 'Twin',
    roomNumber: '816',
    dietary: 'Halal',
    phone: '+628178822991',
    rollCallStatus: 'missing',
    hasClearedCustoms: false,
    seatNumber: '17C',
    baggageTag: 'JL-88906',
    groupId: 'grp-4',
    groupName: 'Rahmawati Family',
    bookingRef: 'BKG-RAH-884',
    groupRole: 'Lead Guest',
    isGroupLead: true,
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
    groupName: 'Rahmawati Family',
    bookingRef: 'BKG-RAH-884',
    groupRole: 'Spouse',
    isGroupLead: false,
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
  },
];

const initialCheckpoints: ArrivalCheckpoint[] = [
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
    updatedBy: 'Yumi Sato (Guide)',
  },
  {
    id: 'boarded_enroute',
    labelKey: 'stepBoarded',
    time: '17:15 JST (Est)',
    status: 'pending',
    updatedBy: 'System',
  },
];

const initialItinerary: ItineraryItem[] = [
  {
    id: 'it-1',
    day: 1,
    time: '15:55',
    title: 'JL720 Flight Landed at NRT T1',
    titleJa: 'JL720便 成田空港第1ターミナル到着',
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
    titleJa: '到着ミーティング＆専用バス乗車',
    location: 'NRT T1 South Wing Pillar #17',
    description: 'Meet Guide Yumi Sato and board Toyota Coaster #4 driven by Kenji Tanaka.',
    category: 'transfer',
    status: 'current',
    delayMinutes: 10,
  },
  {
    id: 'it-3',
    day: 1,
    time: '18:15',
    title: 'Hotel Check-in & Room Key Distribution',
    titleJa: 'ホテルチェックイン・ルームキー配布',
    location: 'Shinjuku Granbell Hotel',
    description: 'Rooms pre-blocked on 8th floor. Handshake room keys, brief breakfast vouchers.',
    category: 'hotel',
    status: 'upcoming',
    delayMinutes: 0,
  },
  {
    id: 'it-4',
    day: 1,
    time: '19:30',
    title: 'Welcome Dinner: Halal & Washoku Banquet',
    titleJa: 'ウェルカムディナー（ハラール対応和食宴会）',
    location: 'Shinjuku Kappo Nakajima (Private Room)',
    description: 'Pre-ordered Halal set menus for 8 guests, 1 vegetarian, standard for 5 guests.',
    category: 'meal',
    status: 'upcoming',
    delayMinutes: 0,
  },
  {
    id: 'it-5',
    day: 2,
    time: '08:30',
    title: 'Mt. Fuji 5th Station & Lake Kawaguchiko Excursion',
    titleJa: '富士山五合目＆河口湖日帰り観光',
    location: 'Fuji-Hakone-Izu National Park',
    description: 'Private coach departs hotel prompt 08:30. Gathering pin armed at station.',
    category: 'sightseeing',
    status: 'upcoming',
    delayMinutes: 0,
  },
];

const initialGatheringPin: GatheringPin = {
  isActive: true,
  locationName: 'Narita T1 South Wing • Pillar #17 Meeting Point',
  targetTime: '17:00 JST',
  totalMinutes: 35,
  remainingMinutes: 24,
  latitude: 35.7647,
  longitude: 140.3863,
  notes: 'Guide holding digital "NUSANTARA ODYSSEY" sign near Starbucks entrance.',
};

const initialIncidents: Incident[] = [
  {
    id: 'INC-101',
    title: 'Passport Expiry <6mo Warning (Kevin Wijaya)',
    passengerName: 'Kevin Wijaya',
    reportedBy: 'Agent',
    severity: 'high',
    status: 'investigating',
    timestamp: '14:20 JST',
    notes: [
      'Origin Agent alerted of expiry 2026-11-20.',
      'Agent provided confirmed return ticket JL729 on Oct 7 & hotel voucher to Japanese immigration liaison.',
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
      'Dinner restaurant Kappo Nakajima briefed: zero cross-contamination.',
    ],
  },
];

const initialSettlement: SettlementLedger = {
  baseNetRate: 1450000, // JPY for 14 pax 6D5N
  currency: 'JPY',
  extraCharges: [
    {
      id: 'ex-1',
      description: 'Highway Toll Narita Sky Access & Shinjuku Ramp Overtime',
      amount: 8600,
      approved: true,
    },
    {
      id: 'ex-2',
      description: 'Halal Certified Bento Supplement (Day 2 Fuji Trip, 8 Pax)',
      amount: 14400,
      approved: false,
    },
    {
      id: 'ex-3',
      description: 'Late Night Chauffeur Standby Fee (>21:00)',
      amount: 12000,
      approved: false,
    },
  ],
  proofImages: [
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80',
  ],
  operatorSignedAt: '2026-10-02 16:15 JST',
  isSettled: false,
};

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

  const advanceCheckpoint = () => {
    setCheckpoints((prev) => {
      const next = [...prev];
      const inProgIdx = next.findIndex((c) => c.status === 'in_progress');
      if (inProgIdx !== -1) {
        next[inProgIdx].status = 'completed';
        if (inProgIdx + 1 < next.length) {
          next[inProgIdx + 1].status = 'in_progress';
          next[inProgIdx + 1].time = 'Just now';
        }
      }
      return next;
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
      passengerName: 'Kevin Wijaya',
      time: '16:42 JST',
      location: 'Narita Terminal 1 Immigration South Gate',
    });
  };

  const dismissSOS = () => {
    setActiveSosAlert(null);
  };

  const approveSettlement = () => {
    setSettlement((prev) => ({
      ...prev,
      isSettled: true,
      agentApprovedAt: '2026-10-02 16:50 JST (Approved by Agent HQ)',
      extraCharges: prev.extraCharges.map((e) => ({ ...e, approved: true })),
    }));
  };

  const nudgePassengerWhatsApp = (phone: string, name: string) => {
    const text = encodeURIComponent(
      `Hello ${name}, this is Nusantara Odyssey Travel. Please ensure your passport has at least 6 months validity before departure to Japan.`
    );
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const addIncident = (title: string, severity: 'low' | 'medium' | 'high' | 'critical') => {
    const newInc: Incident = {
      id: `INC-${Math.floor(100 + Math.random() * 900)}`,
      title,
      reportedBy: role === 'agent' ? 'Agent' : role === 'operator' ? 'Operator' : 'Traveller',
      severity,
      status: 'open',
      timestamp: 'Just now',
      notes: ['Incident logged into tri-party shared log.'],
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
