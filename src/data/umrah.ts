import type {
  TourPackage,
  Passenger,
  ArrivalCheckpoint,
  ItineraryItem,
  GatheringPin,
  Incident,
  SettlementLedger,
} from '../types/tour';

// Umrah demo: a Jakarta organiser (PPIU) sends 16 jamaah to Madinah and Makkah.
// All names, numbers and documents are sample data.

export const umrahTour: TourPackage = {
  scenario: 'umrah',
  copy: {
    tz: 'AST',
    nowLocal: '16:45 AST',
    weather: 'Madinah: 34°C Clear',
    destinationFlag: '🇸🇦',
    operatorBase: 'Makkah HQ',
    operatorContract: 'LA-MED-2026-118',
    flightBadge: 'SV827 • Landed at MED',
    flightDuration: '9h 30m',
    arrivalLine: 'Saudia SV-827 • Madinah Airport',
    welcomeLine: 'Ahlan wa Sahlan • Welcome to Madinah',
    signboardTitle: 'AL-HIDAYAH NUSANTARA',
    signboardSubtitle: 'UMRAH GROUP • 16 JAMAAH',
    meetingPointShort: 'Exit Gate 3',
    trafficTitle: 'Road to the Central Area',
    trafficNote: 'Heavy traffic near the Haram before Maghrib (+20 min expected to the hotel).',
    netRateNote: '9D Hotels + Coach + Muthawif',
    visaLabel: 'Umrah Visa',
    visaSubLabel: 'Issued through Nusuk',
    visaStay: 'UP TO 90 DAYS',
    passportWarning:
      'Passport validity is close to the 6-month minimum for an umrah visa. It is valid for this departure; recheck before any date change or rebooking.',
    guideRole: 'Muthawif',
    paxNoun: 'Jamaah',
    operatorNoun: 'Ground Operator',
    careLabel: 'Care needs',
    careHighlight: 'Wheelchair',
    incidentPlaceholder: 'e.g. Jamaah separated from the group at Masjid Nabawi / lost baggage / medical',
    taxiCardHeadline: 'Show to Taxi Driver (لسائق التاكسي)',
    cohortLabel: 'Bus Group B',
    agentHqLine: 'Al-Hidayah Nusantara HQ in Jakarta',
    nudgeMessage:
      'Assalamualaikum {name}, this is Al-Hidayah Nusantara. Your passport is close to the 6-month minimum for the umrah visa. Please contact us before any change to your departure date.',
    aircraft: 'Boeing 777-300ER',
    departureTerminal: 'T3',
  },

  id: 'UM-2026-K7',
  code: 'TL-UMR-204',
  name: 'Umrah 9 Days: Madinah & Makkah',

  // Organiser (PPIU) package
  agentPackageCode: 'UMR-JKT-204',
  agentProductName: '9D Umrah Program: Madinah 3N + Makkah 4N',
  agentName: 'Al-Hidayah Nusantara (PPIU, Jakarta)',

  // Saudi ground operator (land arrangement)
  dmcProductCode: 'LA-MED-MAK-09D',
  dmcProductName: 'Land Arrangement 9D - Hotels, Coach, Muthawif & Ziyarah',
  dmcProductNameLocal: 'ترتيبات أرضية 9 أيام - فنادق وحافلة ومطوف وزيارات',
  operatorName: 'Dar Al-Rahma Umrah Services (Makkah)',

  destination: 'Madinah & Makkah, Saudi Arabia',
  dates: 'Oct 2 - Oct 10, 2026',
  flight: {
    number: 'SV827',
    carrier: 'Saudia',
    origin: 'Jakarta (CGK)',
    destination: 'Madinah (MED)',
    depTime: '10:40 WIB',
    arrTime: '16:10 AST',
    status: 'Landed',
    terminal: 'International Terminal',
    belt: 'Carousel #4',
  },
  staff: {
    tourLeaderName: 'Fajar Ramadhan',
    tourLeaderPhone: '+62-812-9000-2204',
    tourLeaderLanguages: ['Indonesian', 'Arabic', 'English'],
    guideName: 'Ahmad Zaini',
    guidePhone: '+966-50-000-0142',
    guideLanguages: ['Indonesian', 'Arabic'],
    driverName: 'Khalid Al-Otaibi',
    driverPhone: '+966-50-000-0178',
    vehicleModel: '45-Seat Coach #12',
    vehiclePlate: 'ح ن ط 4812',
  },
  meetingPoint: {
    terminal: 'Madinah Airport (MED)',
    zone: 'International Arrivals Hall',
    pillar: 'Exit Gate 3 (Next to the Umrah Groups Desk)',
    mapUrl: '/demo/umrah/meeting-point-map.svg',
    instructions:
      'After baggage claim, leave through Exit Gate 3. Muthawif Ahmad holds an "AL-HIDAYAH NUSANTARA" board next to the umrah groups desk.',
  },
  hotel: {
    name: 'Dar Al-Naeem Hotel Madinah',
    nameLocal: 'فندق دار النعيم',
    address: 'King Fahd Road, Central Area (Markaziyah), Madinah',
    addressLocal: 'طريق الملك فهد، المنطقة المركزية، المدينة المنورة',
    phone: '+966-14-000-0100',
    wifiSsid: 'DarAlNaeem_Guest',
    wifiPass: 'madinah2026',
  },
};

type PassengerSeed = Pick<
  Passenger,
  'id' | 'name' | 'gender' | 'passportNumber' | 'passportExpiry' | 'roomType' | 'roomNumber' | 'dietary' | 'phone' | 'seatNumber' | 'groupRole'
> &
  Partial<Pick<Passenger, 'dietaryNotes' | 'isPassportValid' | 'rollCallStatus' | 'hasClearedCustoms'>>;

interface PartySeed {
  groupId: string;
  groupName: string;
  bookingRef: string;
  sellingAgent: string;
  members: PassengerSeed[];
}

const parties: PartySeed[] = [
  {
    groupId: 'grp-1',
    groupName: 'Hasan Family',
    bookingRef: 'UMR-HAS-411',
    sellingAgent: 'Al-Hidayah Nusantara (direct)',
    members: [
      { id: 'p1', name: 'Abdul Hasan', gender: 'M', passportNumber: 'C4471820', passportExpiry: '2030-03-18', roomType: 'Quad', roomNumber: '501', dietary: 'Standard', phone: '+628119004101', seatNumber: '31A', groupRole: 'Lead Guest' },
      { id: 'p2', name: 'Fatimah Hasan', gender: 'F', passportNumber: 'C4471821', passportExpiry: '2030-03-18', roomType: 'Quad', roomNumber: '501', dietary: 'Diabetic', dietaryNotes: 'Type 2 diabetes, regular meal times', phone: '+628119004102', seatNumber: '31B', groupRole: 'Spouse' },
      { id: 'p3', name: 'Rizky Hasan', gender: 'M', passportNumber: 'C5120033', passportExpiry: '2031-07-02', roomType: 'Quad', roomNumber: '501', dietary: 'Standard', phone: '+628119004103', seatNumber: '31C', groupRole: 'Child' },
      { id: 'p4', name: 'Aisyah Hasan', gender: 'F', passportNumber: 'C5120034', passportExpiry: '2031-07-02', roomType: 'Quad', roomNumber: '501', dietary: 'Standard', phone: '+628119004104', seatNumber: '31D', groupRole: 'Child' },
    ],
  },
  {
    groupId: 'grp-2',
    groupName: 'Siregar Family',
    bookingRef: 'UMR-SIR-412',
    sellingAgent: 'Amanah Travel Bekasi (sub-agent)',
    members: [
      { id: 'p5', name: 'Nurhayati Siregar', gender: 'F', passportNumber: 'B9903417', passportExpiry: '2028-11-09', roomType: 'Triple', roomNumber: '502', dietary: 'Wheelchair', dietaryNotes: 'Age 71, wheelchair for tawaf and sa\'i', phone: '+628137004201', seatNumber: '32A', groupRole: 'Lead Guest', rollCallStatus: 'missing', hasClearedCustoms: false },
      { id: 'p6', name: 'Dedi Siregar', gender: 'M', passportNumber: 'B9903418', passportExpiry: '2029-01-25', roomType: 'Triple', roomNumber: '502', dietary: 'Standard', phone: '+628137004202', seatNumber: '32B', groupRole: 'Child', hasClearedCustoms: false },
      { id: 'p7', name: 'Lina Siregar', gender: 'F', passportNumber: 'B9903419', passportExpiry: '2029-01-25', roomType: 'Triple', roomNumber: '502', dietary: 'Standard', phone: '+628137004203', seatNumber: '32C', groupRole: 'Child' },
    ],
  },
  {
    groupId: 'grp-3',
    groupName: 'Sutrisno Couple',
    bookingRef: 'UMR-SUT-413',
    sellingAgent: 'Al-Hidayah Nusantara (direct)',
    members: [
      { id: 'p8', name: 'Bambang Sutrisno', gender: 'M', passportNumber: 'E2204716', passportExpiry: '2029-09-30', roomType: 'Double', roomNumber: '503', dietary: 'Diabetic', dietaryNotes: 'Insulin must stay refrigerated', phone: '+628211004301', seatNumber: '33A', groupRole: 'Lead Guest' },
      { id: 'p9', name: 'Sri Wahyuni', gender: 'F', passportNumber: 'E2204717', passportExpiry: '2029-09-30', roomType: 'Double', roomNumber: '503', dietary: 'Standard', phone: '+628211004302', seatNumber: '33B', groupRole: 'Spouse' },
    ],
  },
  {
    groupId: 'grp-4',
    groupName: 'Zubaidah & Friends',
    bookingRef: 'UMR-ZUB-414',
    sellingAgent: 'Darul Iman Study Circle, Depok (sub-agent)',
    members: [
      { id: 'p10', name: 'Zubaidah Rahman', gender: 'F', passportNumber: 'A7718250', passportExpiry: '2028-05-14', roomType: 'Triple', roomNumber: '504', dietary: 'Elderly', dietaryNotes: 'Age 68, walks slowly, needs rest stops', phone: '+628158004401', seatNumber: '34A', groupRole: 'Lead Guest' },
      { id: 'p11', name: 'Ratna Sari', gender: 'F', passportNumber: 'A7718251', passportExpiry: '2030-08-21', roomType: 'Triple', roomNumber: '504', dietary: 'Standard', phone: '+628158004402', seatNumber: '34B', groupRole: 'Friend' },
      { id: 'p12', name: 'Yuliana Putri', gender: 'F', passportNumber: 'A7718252', passportExpiry: '2030-08-21', roomType: 'Triple', roomNumber: '504', dietary: 'Standard', phone: '+628158004403', seatNumber: '34C', groupRole: 'Friend' },
    ],
  },
  {
    groupId: 'grp-5',
    groupName: 'Fauzi Father & Son',
    bookingRef: 'UMR-FAU-415',
    sellingAgent: 'Amanah Travel Bekasi (sub-agent)',
    members: [
      { id: 'p13', name: 'Ahmad Fauzi', gender: 'M', passportNumber: 'B5530921', passportExpiry: '2027-04-12', isPassportValid: false, roomType: 'Double', roomNumber: '505', dietary: 'Elderly', dietaryNotes: 'Age 73, hearing aid', phone: '+628170004501', seatNumber: '35A', groupRole: 'Lead Guest' },
      { id: 'p14', name: 'Muhammad Iqbal', gender: 'M', passportNumber: 'B5530922', passportExpiry: '2031-02-06', roomType: 'Double', roomNumber: '505', dietary: 'Standard', phone: '+628170004502', seatNumber: '35B', groupRole: 'Child' },
    ],
  },
  {
    groupId: 'grp-6',
    groupName: 'Gunawan Couple',
    bookingRef: 'UMR-GUN-416',
    sellingAgent: 'Darul Iman Study Circle, Depok (sub-agent)',
    members: [
      { id: 'p15', name: 'Hendra Gunawan', gender: 'M', passportNumber: 'D8840155', passportExpiry: '2029-12-01', roomType: 'Double', roomNumber: '506', dietary: 'Standard', phone: '+628196004601', seatNumber: '36A', groupRole: 'Lead Guest' },
      { id: 'p16', name: 'Dian Permata', gender: 'F', passportNumber: 'D8840156', passportExpiry: '2029-12-01', roomType: 'Double', roomNumber: '506', dietary: 'Standard', phone: '+628196004602', seatNumber: '36B', groupRole: 'Spouse' },
    ],
  },
];

export const umrahPassengers: Passenger[] = parties.flatMap((party) =>
  party.members.map((m, idx) => ({
    isPassportValid: true,
    visaStatus: 'approved' as const,
    rollCallStatus: 'present' as const,
    hasClearedCustoms: true,
    baggageTag: `SV-44${m.id.slice(1).padStart(3, '0')}`,
    groupId: party.groupId,
    groupName: party.groupName,
    bookingRef: party.bookingRef,
    isGroupLead: idx === 0,
    sellingAgent: party.sellingAgent,
    ...m,
  }))
);

export const umrahCheckpoints: ArrivalCheckpoint[] = [
  { id: 'standby', labelKey: 'stepStandby', time: '15:30 AST', status: 'completed', updatedBy: 'Khalid Al-Otaibi (Driver)' },
  { id: 'landed', labelKey: 'stepLanded', time: '16:10 AST', status: 'completed', updatedBy: 'Flight status (SV827)' },
  { id: 'customs_meet', labelKey: 'stepCustoms', time: '16:50 AST', status: 'in_progress', updatedBy: 'Fajar Ramadhan (Tour Leader)' },
  { id: 'boarded_enroute', labelKey: 'stepBoarded', time: '17:40 AST (Est)', status: 'pending', updatedBy: 'System' },
];

export const umrahItinerary: ItineraryItem[] = [
  {
    id: 'it-1',
    day: 1,
    time: '16:10',
    title: 'SV827 Landed at Madinah Airport',
    titleLocal: 'وصول الرحلة SV827 إلى مطار المدينة المنورة',
    location: 'Prince Mohammad bin Abdulaziz International Airport',
    description: 'Jamaah disembark, clear immigration and collect baggage.',
    category: 'flight',
    status: 'completed',
    delayMinutes: 0,
  },
  {
    id: 'it-2',
    day: 1,
    time: '17:00',
    title: 'Arrival Handover & Boarding Coach',
    titleLocal: 'استقبال المجموعة والصعود إلى الحافلة',
    location: 'MED Arrivals, Exit Gate 3',
    description: 'Tour leader Fajar meets muthawif Ahmad Zaini at Exit Gate 3; the group boards Coach #12 driven by Khalid Al-Otaibi.',
    category: 'transfer',
    status: 'current',
    delayMinutes: 10,
  },
  {
    id: 'it-3',
    day: 1,
    time: '18:30',
    title: 'Hotel Check-in & Room Key Distribution',
    titleLocal: 'تسجيل الدخول في الفندق وتوزيع مفاتيح الغرف',
    location: 'Dar Al-Naeem Hotel Madinah',
    description: 'Rooms pre-blocked on the 5th floor. Tour leader hands out room keys and meal coupons.',
    category: 'hotel',
    status: 'upcoming',
    delayMinutes: 0,
  },
  {
    id: 'it-4',
    day: 1,
    time: '19:30',
    title: 'Dinner at the Hotel (Indonesian Buffet)',
    titleLocal: 'العشاء في الفندق (بوفيه إندونيسي)',
    location: 'Dar Al-Naeem Hotel, Level 1 Restaurant',
    description: 'Buffet for 16. Two diabetic-friendly plates requested; early seating for elderly jamaah.',
    category: 'meal',
    status: 'upcoming',
    delayMinutes: 0,
  },
  {
    id: 'it-5',
    day: 1,
    time: '21:00',
    title: 'First Visit to Masjid Nabawi with the Muthawif',
    titleLocal: 'الزيارة الأولى للمسجد النبوي مع المطوف',
    location: 'Masjid Nabawi',
    description: 'Walk together from the hotel lobby. Wheelchair jamaah leave 15 minutes earlier with a helper.',
    category: 'sightseeing',
    status: 'upcoming',
    delayMinutes: 0,
  },
  {
    id: 'it-6',
    day: 2,
    time: '08:00',
    title: 'Madinah Ziyarah: Quba Mosque, Uhud & Qiblatain',
    titleLocal: 'زيارات المدينة: مسجد قباء وأحد والقبلتين',
    location: 'Madinah',
    description: 'Coach leaves the hotel at 08:00 sharp. Gathering point set at each stop.',
    category: 'sightseeing',
    status: 'upcoming',
    delayMinutes: 0,
  },
];

export const umrahGatheringPin: GatheringPin = {
  isActive: true,
  locationName: 'Madinah Airport • Exit Gate 3 Meeting Point',
  targetTime: '17:20 AST',
  totalMinutes: 35,
  remainingMinutes: 24,
  latitude: 24.5534,
  longitude: 39.7051,
  notes: 'Muthawif holding the "AL-HIDAYAH NUSANTARA" board next to the umrah groups desk.',
};

export const umrahIncidents: Incident[] = [
  {
    id: 'INC-201',
    title: 'Wheelchair assistance: Nurhayati Siregar (71)',
    passengerName: 'Nurhayati Siregar',
    reportedBy: 'Agent',
    severity: 'medium',
    status: 'investigating',
    timestamp: '15:05 AST',
    notes: [
      'Airport wheelchair requested with the airline before departure; her son Dedi stays with her through immigration.',
      'Operator to arrange a wheelchair helper for tawaf and sa\'i in Makkah (listed as an extra charge).',
    ],
  },
  {
    id: 'INC-202',
    title: 'Insulin storage: Bambang Sutrisno (room 503)',
    passengerName: 'Bambang Sutrisno',
    reportedBy: 'Operator',
    severity: 'medium',
    status: 'investigating',
    timestamp: '15:20 AST',
    notes: [
      'Hotel confirmed an in-room fridge for room 503.',
      'Muthawif briefed on meal times for the two diabetic jamaah.',
    ],
  },
];

export const umrahSettlement: SettlementLedger = {
  baseNetRate: 52800, // SAR, land arrangement for 16 jamaah, 9 days
  currency: 'SAR',
  extraCharges: [
    { id: 'ex-1', description: 'Airport Porter Service (32 Bags)', amount: 320, approved: true, leaderConfirmed: true },
    { id: 'ex-2', description: 'Wheelchair Helper, First Night at Masjid Nabawi (1 Jamaah)', amount: 150, approved: false, leaderConfirmed: false },
    { id: 'ex-3', description: 'Late Arrival Snack Boxes (16 Pax)', amount: 240, approved: false, leaderConfirmed: false },
  ],
  proofImages: [
    {
      src: '/demo/umrah/proof-service-sheet.svg',
      label: 'Signed arrival service sheet',
      detail: '17:05 AST • 16 jamaah • signed by muthawif and tour leader',
    },
    {
      src: '/demo/umrah/proof-porter-receipt.svg',
      label: 'Airport porter receipt',
      detail: '16:55 AST • SAR 320 • 32 bags, MED arrivals',
    },
  ],
  operatorSignedAt: '2026-10-02 17:05 AST',
  isSettled: false,
};
