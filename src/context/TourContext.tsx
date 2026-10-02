import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  TourPackage,
  Passenger,
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
  name: 'Tokyo Autumn Discovery & Mt. Fuji 6D5N',
  destination: 'Tokyo & Yamanashi, Japan',
  dates: 'Oct 2 - Oct 7, 2026',
  agentName: 'Nusantara Odyssey Travel (Jakarta HQ)',
  operatorName: 'Sakura Nippon DMC & Ground Transport (Tokyo)',
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
  {
    id: 'p1',
    name: 'Budi Santoso (Lead Guest)',
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
  },
  {
    id: 'p3',
    name: 'Kevin Wijaya',
    gender: 'M',
    passportNumber: 'C1049281',
    passportExpiry: '2026-11-20', // LESS THAN 6 MONTHS!
    isPassportValid: false,
    visaStatus: 'flagged',
    roomType: 'Single',
    roomNumber: '814',
    dietary: 'Standard',
    phone: '+628123344556',
    rollCallStatus: 'present',
    hasClearedCustoms: false,
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
    roomNumber: '815',
    dietary: 'Vegetarian',
    dietaryNotes: 'Lacto-ovo vegetarian',
    phone: '+628139988776',
    rollCallStatus: 'present',
    hasClearedCustoms: true,
  },
  {
    id: 'p5',
    name: 'Michael Tan',
    gender: 'M',
    passportNumber: 'B7723911',
    passportExpiry: '2028-04-10',
    isPassportValid: true,
    visaStatus: 'approved',
    roomType: 'Double',
    roomNumber: '815',
    dietary: 'No Beef',
    phone: '+628139988777',
    rollCallStatus: 'present',
    hasClearedCustoms: true,
  },
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
  },
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
  },
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
  },
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
  },
];

const initialCheckpoints: ArrivalCheckpoint[] = [
  {
    id: 'standby',
    labelKey: 'stepStandby',
    time: '15:10 JST',
    status: 'completed',
    updatedBy: 'Kenji Tanaka (Driver)',
  },
  {
    id: 'landed',
    labelKey: 'stepLanded',
    time: '15:55 JST',
    status: 'completed',
    updatedBy: 'Narita Flight Radar (JL720)',
  },
  {
    id: 'customs_meet',
    labelKey: 'stepCustoms',
    time: '16:45 JST',
    status: 'in_progress',
    updatedBy: 'Yumi Sato (Guide) - 12/14 Guests Met',
  },
  {
    id: 'boarded_enroute',
    labelKey: 'stepBoarded',
    time: '17:15 JST (Est)',
    status: 'pending',
    updatedBy: 'Pending Roll Call completion',
  },
];

const initialItinerary: ItineraryItem[] = [
  {
    id: 'it-1',
    day: 1,
    time: '15:55',
    title: 'Touch Down at Narita Airport T1',
    titleJa: '成田空港第1ターミナル到着',
    location: 'Narita Airport (NRT)',
    description: 'Immigration clearance, luggage retrieval at belt #3, guide meet-up at Pillar 17.',
    category: 'flight',
    status: 'completed',
    delayMinutes: 0,
  },
  {
    id: 'it-2',
    day: 1,
    time: '17:15',
    adjustedTime: '17:35',
    title: 'Executive Coach Transfer to Shinjuku',
    titleJa: '貸切バスにて新宿ホテルへ移動',
    location: 'Metropolitan Expressway',
    description: 'Scenic transfer across Rainbow Bridge. Water and Wi-Fi onboard.',
    category: 'transfer',
    status: 'current',
    delayMinutes: 20,
  },
  {
    id: 'it-3',
    day: 1,
    time: '19:00',
    adjustedTime: '19:20',
    title: 'Hotel Check-In & Room Keycard Distribution',
    titleJa: 'ホテルチェックイン・部屋割り案内',
    location: 'Shinjuku Granbell Hotel',
    description: 'Baggage delivery to rooms, 30-min freshen up rest.',
    category: 'hotel',
    status: 'upcoming',
    delayMinutes: 20,
  },
  {
    id: 'it-4',
    day: 1,
    time: '20:00',
    adjustedTime: '20:20',
    title: 'Welcome Dinner: Halal/Wagyu Sukiyaki Set',
    titleJa: '歓迎夕食：ハラール和牛すき焼き御膳',
    location: 'Shinjuku Halal Dining Roppongi',
    description: 'Certified Halal authentic Sukiyaki dinner. Special vegetarian menu prepared.',
    category: 'meal',
    status: 'upcoming',
    delayMinutes: 20,
  },
  {
    id: 'it-5',
    day: 2,
    time: '09:00',
    title: 'Tokyo City Highlights: Meiji Jingu & Harajuku',
    titleJa: '明治神宮・原宿竹下通り観光',
    location: 'Shibuya City',
    description: 'Morning walk in cedar forest, visit main shrine sanctuary.',
    category: 'sightseeing',
    status: 'upcoming',
    delayMinutes: 0,
  },
  {
    id: 'it-6',
    day: 2,
    time: '14:30',
    title: 'Shibuya Crossing & Free Shopping Time',
    titleJa: '渋谷スクランブル交差点・自由散策',
    location: 'Shibuya Station Hachiko Square',
    description: 'Guided scramble crossing walk followed by 2 hours free shopping radar.',
    category: 'free_time',
    status: 'upcoming',
    delayMinutes: 0,
  },
];

const initialGatheringPin: GatheringPin = {
  isActive: true,
  locationName: 'Shibuya Hachiko Plaza & Scramble Crossing',
  targetTime: '16:30 JST',
  totalMinutes: 90,
  remainingMinutes: 42,
  latitude: 35.6591,
  longitude: 139.7006,
  notes: 'Look for Tour Leader Yumi holding the yellow Nusantara flag in front of Hachiko bronze statue.',
};

const initialIncidents: Incident[] = [
  {
    id: 'INC-201',
    title: 'Luggage Delayed on Carousel 3 (Kevin Wijaya)',
    passengerName: 'Kevin Wijaya',
    reportedBy: 'Operator',
    severity: 'medium',
    status: 'resolved',
    timestamp: '16:15 JST',
    notes: [
      'Baggage was held for oversized tag inspection.',
      'Guide retrieved bag with JAL ground crew at 16:35 JST. Bag secured in bus.',
    ],
  },
  {
    id: 'INC-202',
    title: 'Passport Validity Warning (< 6 months) for 2 Guests',
    reportedBy: 'Agent',
    severity: 'high',
    status: 'investigating',
    timestamp: '10:00 WIB',
    notes: [
      'Kevin Wijaya & Siti Rahmawati passports expire within 60 days.',
      'Agent sent emergency WhatsApp reminders; Japanese border immigration cleared with return ticket inspection.',
    ],
  },
];

const initialSettlement: SettlementLedger = {
  baseNetRate: 14800,
  currency: 'USD',
  extraCharges: [
    {
      id: 'ex-1',
      description: 'Coach Overtime Standby (+1.5 hrs due to highway congestion)',
      amount: 220,
      approved: true,
    },
    {
      id: 'ex-2',
      description: 'Pre-ordered Halal Certified Lunch Boxes (Mt Fuji Day)',
      amount: 350,
      approved: true,
    },
  ],
  proofImages: [
    'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80',
  ],
  operatorSignedAt: '2026-10-02 16:50 JST by Sakura DMC Lead',
  agentApprovedAt: undefined,
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

  const openPassengerDetailById = (id: string) => {
    const p = passengers.find((x) => x.id === id);
    if (p) setSelectedPassenger(p);
  };

  // Active countdown timer for gathering pin
  useEffect(() => {
    if (!gatheringPin.isActive) return;
    const interval = setInterval(() => {
      setGatheringPin((prev) => ({
        ...prev,
        remainingMinutes: Math.max(0, prev.remainingMinutes - 1),
      }));
    }, 60000); // 1 minute
    return () => clearInterval(interval);
  }, [gatheringPin.isActive]);

  const advanceCheckpoint = () => {
    setCheckpoints((prev) => {
      const inProgressIndex = prev.findIndex((cp) => cp.status === 'in_progress');
      if (inProgressIndex === -1) {
        return prev;
      }
      return prev.map((cp, idx) => {
        if (idx === inProgressIndex) {
          return { ...cp, status: 'completed' as const, time: '17:10 JST (Now)' };
        }
        if (idx === inProgressIndex + 1) {
          return { ...cp, status: 'in_progress' as const, time: '17:15 JST (Active)' };
        }
        return cp;
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
          adjustedTime: '17:55',
        };
      })
    );
  };

  const toggleGatheringPin = () => {
    setGatheringPin((prev) => ({
      ...prev,
      isActive: !prev.isActive,
      remainingMinutes: prev.isActive ? 0 : 45,
    }));
  };

  const triggerSOS = () => {
    setActiveSosAlert({
      passengerName: 'Budi Santoso',
      time: new Date().toLocaleTimeString(),
      location: 'Shinjuku Kabukicho East Exit (Near Don Quijote)',
    });
  };

  const dismissSOS = () => {
    setActiveSosAlert(null);
  };

  const approveSettlement = () => {
    setSettlement((prev) => ({
      ...prev,
      agentApprovedAt: 'Signed & Released by Outbound Finance Director',
      isSettled: true,
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
