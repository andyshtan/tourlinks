export type SupportedLanguage = 'en' | 'id' | 'ja' | 'ko' | 'zh' | 'ar';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  roleSelection: {
    heroTitle: string;
    heroSubtitle: string;
    selectPrompt: string;
    languagePrompt: string;
    launchBtn: string;
    orCompare: string;
    launchSplitBtn: string;
    recommended: string;
    changeRoleBtn: string;
    agentBadge: string;
    agentSummary: string;
    operatorBadge: string;
    operatorSummary: string;
    travellerBadge: string;
    travellerSummary: string;
    leaderBadge: string;
    leaderSummary: string;
  };
  roles: {
    agent: string;
    agentDesc: string;
    operator: string;
    operatorDesc: string;
    traveller: string;
    travellerDesc: string;
    leader: string;
    leaderDesc: string;
  };
  common: {
    origin: string;
    destination: string;
    status: string;
    active: string;
    completed: string;
    pending: string;
    urgent: string;
    warning: string;
    save: string;
    cancel: string;
    confirm: string;
    edit: string;
    delete: string;
    viewDetails: string;
    refresh: string;
    liveSync: string;
    homeTime: string;
    destTime: string;
    switchRole: string;
    language: string;
    online: string;
    passLabel: string;
    passNote: string;
  };
  agent: {
    title: string;
    badge: string;
    manifestTitle: string;
    manifestDesc: string;
    passportGuard: string;
    passportAlert: string;
    nudgeWhatsApp: string;
    roomingChart: string;
    dietarySummary: string;
    flightMonitor: string;
    checkpointProgress: string;
    incidentHub: string;
    reportIncident: string;
    settlementTitle: string;
    netRateTotal: string;
    extraCharges: string;
    approveInvoice: string;
    invoiceApproved: string;
    allPassportsValid: string;
    flaggedPassports: string;
  };
  operator: {
    title: string;
    badge: string;
    flightRadar: string;
    driverGuideDispatch: string;
    assignedDriver: string;
    assignedGuide: string;
    vehiclePlate: string;
    generateSignboard: string;
    signboardPreview: string;
    welcomeMessage: string;
    arrivalHandshake: string;
    stepStandby: string;
    stepLanded: string;
    stepCustoms: string;
    stepBoarded: string;
    advanceCheckpoint: string;
    scheduleTitle: string;
    delayNotice: string;
    pushSchedule: string;
    dropGatheringPin: string;
    activePin: string;
    timeRemaining: string;
    proofOfService: string;
    uploadProof: string;
    submitSettlement: string;
    rollCall: string;
    present: string;
    missing: string;
  };
  traveller: {
    title: string;
    passTitle: string;
    welcomeBack: string;
    flightCardTitle: string;
    meetingPointTitle: string;
    meetingPointDesc: string;
    guideContact: string;
    callGuide: string;
    clearedCustomsBtn: string;
    customsReported: string;
    driverVehicle: string;
    todaySchedule: string;
    gatheringRadar: string;
    gatheringNavBtn: string;
    sosBtn: string;
    sosDesc: string;
    sosTriggered: string;
    hotelRoomTitle: string;
    roomNumber: string;
    wifiPassword: string;
    taxiCardAddress: string;
    showTaxiCard: string;
    tipPassTitle: string;
  };
  leader: {
    title: string;
    badge: string;
    tabToday: string;
    tabRollCall: string;
    tabRooming: string;
    tabIssues: string;
    groupThroughBtn: string;
    confirmExtra: string;
  };
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  // 1. English
  en: {
    appName: 'Tourlinks',
    tagline: 'Shared Outbound Tour Workflow for Agents, Tour Leaders, DMCs and Travellers',
    roleSelection: {
      heroTitle: 'Select Your Perspective & Language',
      heroSubtitle: 'Tourlinks gives the agent, tour leader, ground DMC and traveller one shared view of a departure. Choose a role and language to explore the demo.',
      selectPrompt: '1. Select Your Role',
      languagePrompt: '2. Select Experience Language',
      launchBtn: 'Enter Dashboard as',
      orCompare: 'Or explore all 3 perspectives simultaneously',
      launchSplitBtn: 'Launch Side-by-Side Tri-Party View',
      recommended: 'Default / Recommended',
      changeRoleBtn: 'Switch Role',
      agentBadge: 'Origin HQ • Jakarta',
      agentSummary: 'Oversee digital manifests, passport validity (<6 months alerts), flight radar, and approve DMC net-rate settlements.',
      operatorBadge: 'Destination Ground Ops • Tokyo',
      operatorSummary: 'Manage chauffeur & guide dispatch, airport arrival handshake, dynamic delay adjustments, and free-time gathering pins.',
      travellerBadge: 'End User • Guest Mobile Pass',
      travellerSummary: 'Mobile travel pass with a meeting point map, 1-tap customs clearance, taxi card in Japanese, and an SOS button.',
      leaderBadge: 'On Tour • Travels With the Group',
      leaderSummary: 'Run the group on the ground: meet the local guide, take roll calls, check rooming and dietary needs, log incidents, and confirm extra charges.',
    },
    roles: {
      agent: 'Outbound Agent (Seller)',
      agentDesc: 'HQ Origin Agency · Jakarta',
      operator: 'Ground DMC & Operator',
      operatorDesc: 'Destination Ground Ops · Tokyo',
      traveller: 'Traveller Pass',
      travellerDesc: 'Guest Mobile Digital Pass',
      leader: 'Tour Leader',
      leaderDesc: 'Agency Tour Leader · With the Group',
    },
    common: {
      origin: 'Jakarta (CGK)',
      destination: 'Tokyo (NRT)',
      status: 'Status',
      active: 'Active',
      completed: 'Completed',
      pending: 'Pending',
      urgent: 'Urgent',
      warning: 'Attention Needed',
      save: 'Save Changes',
      cancel: 'Cancel',
      confirm: 'Confirm Action',
      edit: 'Edit',
      delete: 'Delete',
      viewDetails: 'View Details',
      refresh: 'Refresh Status',
      liveSync: 'Live Cloud Sync',
      homeTime: 'Home Time (GMT+7)',
      destTime: 'Destination Time (GMT+9)',
      switchRole: 'Switch Role',
      language: 'Language',
      online: 'Live Connected',
      passLabel: 'Traveller Pass',
      passNote: 'Vouchers & contacts in one place',
    },
    agent: {
      title: 'Agent Command Center',
      badge: 'Outbound Origin Control',
      manifestTitle: 'Digital Manifest & Compliance Guard',
      manifestDesc: 'Standardized guest roster, passport expiry monitoring & dietary requirements',
      passportGuard: 'Passport & Visa Compliance Guard',
      passportAlert: 'Passport expires within 6 months of travel — below agency policy. Check the destination entry rules.',
      nudgeWhatsApp: '1-Click WhatsApp Nudge',
      roomingChart: 'Room Allocation & Occupancy',
      dietarySummary: 'Special Dietary Requirements',
      flightMonitor: 'Live Flight In-Transit Radar',
      checkpointProgress: 'Ground Execution Milestones',
      incidentHub: 'Cross-Border Incident Desk',
      reportIncident: 'Log Shared Incident',
      settlementTitle: 'DMC Contract & Settlement Ledger',
      netRateTotal: 'Agreed Net Rate',
      extraCharges: 'Extra Charges (Tolls, Overtime, Meals)',
      approveInvoice: 'Sign Off Settlement',
      invoiceApproved: 'Settlement Signed Off',
      allPassportsValid: 'All 14 Passports Passed Compliance',
      flaggedPassports: 'Action Required: 2 Guests Flagged',
    },
    operator: {
      title: 'Ground DMC Operations Hub',
      badge: 'Tokyo Ground Handling',
      flightRadar: 'Inbound Flight Tracking & ETA',
      driverGuideDispatch: 'Chauffeur & Tour Guide Dispatch',
      assignedDriver: 'Assigned Chauffeur',
      assignedGuide: 'Lead Tour Guide',
      vehiclePlate: 'Vehicle License Plate',
      generateSignboard: 'Digital Airport Welcome Signboard',
      signboardPreview: 'Preview iPad Paging Board',
      welcomeMessage: 'Welcome to Tokyo!',
      arrivalHandshake: 'Airport Arrival Handshake Checkpoints',
      stepStandby: '1. Chauffeur on Standby at Terminal',
      stepLanded: '2. Flight Touched Down (Tracking)',
      stepCustoms: '3. Guests Cleared Customs & Met',
      stepBoarded: '4. All Boarded on Coach & En Route',
      advanceCheckpoint: 'Update Checkpoint Status',
      scheduleTitle: 'Dynamic Itinerary & Time-Shift',
      delayNotice: 'Push schedule due to highway traffic',
      pushSchedule: 'Adjust Time Slot (+20m)',
      dropGatheringPin: 'Drop Gathering Pin & Countdown',
      activePin: 'Live Meeting Radar Active',
      timeRemaining: 'Free Time Remaining',
      proofOfService: 'Digital Proof of Service & Log',
      uploadProof: 'Attach Itinerary Sign-off Photo',
      submitSettlement: 'Submit for Agent Invoice Approval',
      rollCall: '1-Tap Digital Headcount',
      present: 'Present',
      missing: 'Missing / Call',
    },
    traveller: {
      title: 'Traveller Outbound Pass',
      passTitle: 'Tokyo Autumn Discovery 6D5N',
      welcomeBack: 'Welcome aboard, Budi Santoso',
      flightCardTitle: 'Outbound Flight JL-720',
      meetingPointTitle: 'Airport Pickup & Guide Meet-up',
      meetingPointDesc: 'Narita Airport Terminal 1, South Wing Arrival Gate, Pillar #17',
      guideContact: 'Lead Guide: Yumi Sato (Speaks EN/ID)',
      callGuide: 'Call Guide via WhatsApp',
      clearedCustomsBtn: 'I Have Cleared Customs! Heading to Exit',
      customsReported: 'Arrival status sent to Driver & Guide!',
      driverVehicle: 'Coach #04 • Toyota Coaster • 品川 200 か 48-12',
      todaySchedule: "Today's Dynamic Itinerary",
      gatheringRadar: 'Active Gathering Point',
      gatheringNavBtn: 'Open in Google Maps',
      sosBtn: "I'M LOST / NEED HELP (SOS)",
      sosDesc: 'Alerts your tour leader, the local guide and the Jakarta agency',
      sosTriggered: 'SOS sent to your tour leader and guide.',
      hotelRoomTitle: 'Hotel & Keycard Voucher',
      roomNumber: 'Room 812 (Twin Bed)',
      wifiPassword: 'WiFi: Granbell_Guest / Pass: tokyo2026',
      taxiCardAddress: 'Show Taxi Driver (Japanese Address Card)',
      showTaxiCard: '東京都新宿区歌舞伎町2-14-5',
      tipPassTitle: 'Digital Boarding Pass',
    },
    leader: {
      title: 'Tour Leader Field Kit',
      badge: 'Tour Leader',
      tabToday: 'Arrival & Today',
      tabRollCall: 'Roll Call',
      tabRooming: 'Rooming & Meals',
      tabIssues: 'Incidents & Extras',
      groupThroughBtn: 'Group Has Met the Guide',
      confirmExtra: 'Confirm It Happened',
    },
  },

  // 2. Bahasa Indonesia
  id: {
    appName: 'Tourlinks',
    tagline: 'Alur Kerja Tur Outbound Bersama untuk Agen, Tour Leader, DMC, dan Wisatawan',
    roleSelection: {
      heroTitle: 'Pilih Peran & Bahasa Demo Anda',
      heroSubtitle: 'Tourlinks memberi agen, tour leader, DMC, dan wisatawan satu tampilan bersama untuk setiap keberangkatan. Pilih peran dan bahasa untuk mencoba demo.',
      selectPrompt: '1. Pilih Peran Anda',
      languagePrompt: '2. Pilih Bahasa Pengalaman',
      launchBtn: 'Masuk Dashboard sebagai',
      orCompare: 'Atau jelajahi ketiga perspektif secara bersamaan',
      launchSplitBtn: 'Buka Tampilan Tri-Party Berdampingan',
      recommended: 'Disarankan / Bawaan',
      changeRoleBtn: 'Ganti Peran',
      agentBadge: 'Kantor Pusat Asal • Jakarta',
      agentSummary: 'Kelola manifes digital, peringatan kedaluwarsa paspor (<6 bulan), radar penerbangan, dan setujui pelunasan tarif DMC.',
      operatorBadge: 'Operasional Lapangan Destinasi • Tokyo',
      operatorSummary: 'Atur penugasan sopir & pemandu, titik temu bandara, penyesuaian jadwal dinamis, dan pasang titik kumpul.',
      travellerBadge: 'Pengguna Akhir • Paspor Digital Tamu',
      travellerSummary: 'Paspor digital tamu dengan peta titik jemput (Tiang 17), 1-klik lolos imigrasi, kartu alamat taksi Jepang, dan tombol SOS.',
      leaderBadge: 'Di Lapangan • Mendampingi Rombongan',
      leaderSummary: 'Pimpin rombongan di lapangan: bertemu pemandu lokal, absensi, cek kamar dan kebutuhan makanan, catat insiden, dan konfirmasi biaya tambahan.',
    },
    roles: {
      agent: 'Agen Outbound (Penjual)',
      agentDesc: 'Kantor Pusat Asal · Jakarta',
      operator: 'DMC & Operator Lapangan',
      operatorDesc: 'Operasional Lapangan Destinasi · Tokyo',
      traveller: 'Paspor Digital Peserta',
      travellerDesc: 'Aplikasi Digital Tamu / Wisatawan',
      leader: 'Tour Leader',
      leaderDesc: 'Tour Leader Agen · Bersama Rombongan',
    },
    common: {
      origin: 'Jakarta (CGK)',
      destination: 'Tokyo (NRT)',
      status: 'Status',
      active: 'Aktif',
      completed: 'Selesai',
      pending: 'Menunggu',
      urgent: 'Penting',
      warning: 'Perlu Perhatian',
      save: 'Simpan Perubahan',
      cancel: 'Batal',
      confirm: 'Konfirmasi',
      edit: 'Ubah',
      delete: 'Hapus',
      viewDetails: 'Lihat Detail',
      refresh: 'Perbarui Status',
      liveSync: 'Sinkronisasi Cloud Langsung',
      homeTime: 'Waktu Asal (WIB / GMT+7)',
      destTime: 'Waktu Destinasi (JST / GMT+9)',
      switchRole: 'Ganti Peran',
      language: 'Bahasa',
      online: 'Terhubung Langsung',
      passLabel: 'Paspor Digital Tamu',
      passNote: 'Voucher & kontak di satu tempat',
    },
    agent: {
      title: 'Pusat Kendali Agen',
      badge: 'Kontrol Asal Outbound',
      manifestTitle: 'Manifes Digital & Pengawal Kepatuhan',
      manifestDesc: 'Daftar nama terstandarisasi, pantauan kedaluwarsa paspor & kebutuhan makanan',
      passportGuard: 'Pengawal Kepatuhan Paspor & Visa',
      passportAlert: 'Paspor berlaku kurang dari 6 bulan saat perjalanan — di bawah kebijakan agen. Periksa aturan masuk negara tujuan.',
      nudgeWhatsApp: '1-Klik Kirim Pengingat WhatsApp',
      roomingChart: 'Distribusi Kamar & Hunian',
      dietarySummary: 'Kebutuhan Makanan Khusus (Halal / Alergi)',
      flightMonitor: 'Radar Penerbangan Langsung',
      checkpointProgress: 'Progres Titik Kumpul & Eksekusi',
      incidentHub: 'Meja Insiden Lintas Batas',
      reportIncident: 'Catat Insiden Bersama',
      settlementTitle: 'Kontrak DMC & Rekonsiliasi Pembayaran',
      netRateTotal: 'Total Tarif Bersih (Net Rate)',
      extraCharges: 'Biaya Tambahan (Tol, Lembur, Makan)',
      approveInvoice: 'Setujui Pelunasan',
      invoiceApproved: 'Pelunasan Disetujui',
      allPassportsValid: 'Semua 14 Paspor Memenuhi Syarat',
      flaggedPassports: 'Perlu Tindakan: 2 Tamu Ditandai',
    },
    operator: {
      title: 'Pusat Operasional DMC Tokyo',
      badge: 'Penanganan Lapangan Tokyo',
      flightRadar: 'Pelacakan Penerbangan & Estimasi Kedatangan',
      driverGuideDispatch: 'Penugasan Sopir & Pemandu Lokal',
      assignedDriver: 'Sopir Ditugaskan',
      assignedGuide: 'Pemandu Tur Utama',
      vehiclePlate: 'Plat Nomor Kendaraan',
      generateSignboard: 'Papan Paging Digital Bandara',
      signboardPreview: 'Pratinjau Papan Nama Digital iPad',
      welcomeMessage: 'Selamat Datang di Tokyo!',
      arrivalHandshake: 'Titik Pemeriksaan Kedatangan Bandara',
      stepStandby: '1. Sopir Bersiap di Terminal',
      stepLanded: '2. Pesawat Mendarat (Pelacakan)',
      stepCustoms: '3. Tamu Lolos Imigrasi & Bertemu',
      stepBoarded: '4. Semua Naik Bus & Menuju Hotel',
      advanceCheckpoint: 'Perbarui Status Titik Pantau',
      scheduleTitle: 'Jadwal Dinamis & Penyesuaian Waktu',
      delayNotice: 'Mundurkan jadwal akibat kemacetan jalan tol',
      pushSchedule: 'Sesuaikan Jadwal (+20 Menit)',
      dropGatheringPin: 'Pasang Pin Titik Kumpul & Hitung Mundur',
      activePin: 'Radar Titik Kumpul Aktif',
      timeRemaining: 'Sisa Waktu Bebas',
      proofOfService: 'Bukti Layanan & Verifikasi Digital',
      uploadProof: 'Unggah Foto Tanda Terima Jadwal',
      submitSettlement: 'Ajukan Persetujuan Tagihan Agen',
      rollCall: '1-Klik Absensi Kehadiran Digital',
      present: 'Hadir',
      missing: 'Belum Hadir / Hubungi',
    },
    traveller: {
      title: 'Paspor Digital Tamu',
      passTitle: 'Penjelajahan Musim Gugur Tokyo 6H5M',
      welcomeBack: 'Selamat datang, Budi Santoso',
      flightCardTitle: 'Penerbangan Outbound JL-720',
      meetingPointTitle: 'Titik Jemput Bandara & Temu Pemandu',
      meetingPointDesc: 'Bandara Narita Terminal 1, Gate Kedatangan South Wing, Tiang #17',
      guideContact: 'Pemandu Utama: Yumi Sato (Bahasa EN/ID)',
      callGuide: 'Hubungi Pemandu via WhatsApp',
      clearedCustomsBtn: 'Saya Sudah Lolos Imigrasi! Menuju Pintu Keluar',
      customsReported: 'Status kedatangan berhasil dikirim ke Sopir & Pemandu!',
      driverVehicle: 'Bus #04 • Toyota Coaster • 品川 200 か 48-12',
      todaySchedule: 'Jadwal Tur Dinamis Hari Ini',
      gatheringRadar: 'Titik Kumpul Aktif Saat Bebas',
      gatheringNavBtn: 'Buka di Google Maps',
      sosBtn: 'SAYA TERSESAT / BUTUH BANTUAN (SOS)',
      sosDesc: 'Memberi tahu tour leader, pemandu lokal, dan kantor agen di Jakarta',
      sosTriggered: 'SOS terkirim ke tour leader dan pemandu.',
      hotelRoomTitle: 'Voucher Hotel & Kartu Akses Kamar',
      roomNumber: 'Kamar 812 (Twin Bed)',
      wifiPassword: 'WiFi: Granbell_Guest / Sandi: tokyo2026',
      taxiCardAddress: 'Tunjukkan ke Sopir Taksi (Kartu Alamat Jepang)',
      showTaxiCard: '東京都新宿区歌舞伎町2-14-5',
      tipPassTitle: 'Boarding Pass Digital',
    },
    leader: {
      title: 'Perangkat Kerja Tour Leader',
      badge: 'Tour Leader',
      tabToday: 'Kedatangan & Hari Ini',
      tabRollCall: 'Absensi',
      tabRooming: 'Kamar & Makanan',
      tabIssues: 'Insiden & Biaya Tambahan',
      groupThroughBtn: 'Rombongan Sudah Bertemu Pemandu',
      confirmExtra: 'Konfirmasi Terjadi',
    },
  },

  // 3. Japanese (日本語)
  ja: {
    appName: 'Tourlinks',
    tagline: '送り出し会社・添乗員・DMC・旅行者をつなぐアウトバウンド運用ワークフロー',
    roleSelection: {
      heroTitle: 'デモの役割と表示言語を選択',
      heroSubtitle: 'Tourlinksは、送り出し旅行会社・添乗員・現地ランドオペレーター(DMC)・旅行者が同じ出発情報を共有できるようにします。役割と言語を選択してデモをご覧ください。',
      selectPrompt: '1. 役割を選択',
      languagePrompt: '2. 体験言語を選択',
      launchBtn: 'この役割でダッシュボードを開始',
      orCompare: 'または3者の視点を同時に並べて体験',
      launchSplitBtn: '3者並行スプリットビューを起動',
      recommended: '推奨 / デフォルト',
      changeRoleBtn: '役割を変更',
      agentBadge: '送り出し旅行会社本社 • ジャカルタ',
      agentSummary: 'デジタル搭乗者名簿、パスポート残存期間（6ヶ月未満警告）、フライト追跡、DMCネトレート決済承認を一元管理。',
      operatorBadge: '着地運用オペレーター • 東京',
      operatorSummary: 'ドライバー＆ガイド配車管理、空港到着ハンドシェイク、交通渋滞時の動的スケジュール調整、自由行動時の集合ピン配信。',
      travellerBadge: 'エンドユーザー • ゲストモバイルパス',
      travellerSummary: 'モバイル旅程、ミーティングポイント案内図、1タップ税関通過報告、タクシー提示カード、緊急SOSボタン。',
      leaderBadge: '現地同行 • 添乗員',
      leaderSummary: '現地でグループを統率：現地ガイドとの合流、点呼、部屋割りと食事要件の確認、インシデント記録、追加料金の確認。',
    },
    roles: {
      agent: '送り出し旅行会社 (販売店)',
      agentDesc: 'ジャカルタ本社 · インドネシア',
      operator: '現地手配会社 (DMC / Operator)',
      operatorDesc: '東京現地オペレーション · 日本',
      traveller: '旅行者モバイルパス',
      travellerDesc: 'ゲスト専用デジタル旅程・バウチャー',
      leader: '添乗員（ツアーリーダー）',
      leaderDesc: '送り出し旅行会社の添乗員 · グループ同行',
    },
    common: {
      origin: 'ジャカルタ (CGK)',
      destination: '東京成田 (NRT)',
      status: 'ステータス',
      active: '進行中',
      completed: '完了',
      pending: '保留中',
      urgent: '緊急',
      warning: '要注意',
      save: '変更を保存',
      cancel: 'キャンセル',
      confirm: '確定',
      edit: '編集',
      delete: '削除',
      viewDetails: '詳細を表示',
      refresh: '更新',
      liveSync: 'クラウド自動同期中',
      homeTime: '現地時間（ジャカルタ GMT+7）',
      destTime: '現地時間（東京 JST GMT+9）',
      switchRole: '役割を切り替え',
      language: '言語設定',
      online: 'オンライン接続中',
      passLabel: '旅行者パス',
      passNote: 'バウチャーと連絡先をひとつに',
    },
    agent: {
      title: 'エージェント統合指令センター',
      badge: 'アウトバウンド発地統括',
      manifestTitle: 'デジタル名簿＆コンプライアンス管理',
      manifestDesc: '標準化されたゲスト名簿、パスポート有効期限チェック、特別食（ハラール等）',
      passportGuard: 'パスポート・ビザ有効性ガード',
      passportAlert: '旅行時点でパスポート残存期間が6ヶ月未満です（旅行会社の基準未満）。渡航先の入国条件をご確認ください。',
      nudgeWhatsApp: '1タップでWhatsApp通知送信',
      roomingChart: 'ルームアサイン＆宿泊管理',
      dietarySummary: '特別食要件（ハラール / アレルギー）',
      flightMonitor: 'フライト運航監視レーダー',
      checkpointProgress: '現地運行進捗マイルストーン',
      incidentHub: '越境インシデント共有デスク',
      reportIncident: 'インシデントを起票',
      settlementTitle: 'DMC契約・精算台帳',
      netRateTotal: '契約ネトレート合計',
      extraCharges: '追加料金（高速代・時間外・食事）',
      approveInvoice: '精算内容を承認',
      invoiceApproved: '精算承認済み',
      allPassportsValid: '14名全員が規定を満たしています',
      flaggedPassports: '要対応: 2名のパスポートが警告中',
    },
    operator: {
      title: '東京DMC運行管理センター',
      badge: '東京現地手配オペレーション',
      flightRadar: '到着便追跡＆到着予想時刻',
      driverGuideDispatch: 'ドライバー＆専属ガイド配車状況',
      assignedDriver: '担当ドライバー',
      assignedGuide: '担当ツアーガイド',
      vehiclePlate: '車両登録番号',
      generateSignboard: 'デジタル迎名サインボード',
      signboardPreview: 'iPad用 ミート看板を表示',
      welcomeMessage: '東京へようこそ！',
      arrivalHandshake: '空港到着ハンドシェイク',
      stepStandby: '1. 車両・ドライバーがターミナル待機',
      stepLanded: '2. 航空機が成田空港に着陸',
      stepCustoms: '3. お客様が税関を通過・ガイドと合流',
      stepBoarded: '4. 全員がバスに乗車・ホテルへ出発',
      advanceCheckpoint: 'チェックポイントを更新',
      scheduleTitle: '動的運行スケジュール調整',
      delayNotice: '首都高渋滞による時間調整',
      pushSchedule: 'スケジュールを延長 (+20分)',
      dropGatheringPin: '集合ピン設置＆カウントダウン開始',
      activePin: '集合レーダー配信中',
      timeRemaining: '自由行動の残り時間',
      proofOfService: 'サービス完了証明・運行実績',
      uploadProof: '署名入り運行確認写真を添付',
      submitSettlement: 'エージェントへ精算申請を提出',
      rollCall: '1タップ点呼＆乗車確認',
      present: '乗車済',
      missing: '未確認 / 呼出',
    },
    traveller: {
      title: '旅行者専用モバイルパス',
      passTitle: '東京＆富士山 錦秋の旅 6日間',
      welcomeBack: 'ブディ・サントソ様、ご参加ありがとうございます',
      flightCardTitle: '往路フライト JL-720便',
      meetingPointTitle: '空港ピックアップ・合流地点',
      meetingPointDesc: '成田空港第1ターミナル 南ウイング到着ロビー 17番柱前',
      guideContact: '担当ガイド: 佐藤 ゆみ（英語・インドネシア語対応）',
      callGuide: 'ガイドへWhatsApp発信',
      clearedCustomsBtn: '税関を通過しました！出口へ向かいます',
      customsReported: '通過ステータスがドライバーとガイドに送信されました！',
      driverVehicle: '専用車 4号車 • トヨタコースター • 品川 200 か 48-12',
      todaySchedule: '本日の動的タイムスケジュール',
      gatheringRadar: '現在の集合場所案内',
      gatheringNavBtn: 'Googleマップでルート案内',
      sosBtn: '道に迷いました / 緊急ヘルプ (SOS)',
      sosDesc: '添乗員、現地ガイド、ジャカルタの旅行会社に通知します',
      sosTriggered: 'SOSを添乗員とガイドに送信しました。',
      hotelRoomTitle: '宿泊ホテル＆ルームキー情報',
      roomNumber: '812号室 (ツイン)',
      wifiPassword: 'WiFi: Granbell_Guest / PW: tokyo2026',
      taxiCardAddress: 'タクシー運転手様へ提示カード',
      showTaxiCard: '東京都新宿区歌舞伎町2-14-5',
      tipPassTitle: 'デジタルボーディングパス',
    },
    leader: {
      title: '添乗員フィールドキット',
      badge: '添乗員',
      tabToday: '到着・本日の行程',
      tabRollCall: '点呼',
      tabRooming: '部屋割り・食事',
      tabIssues: 'インシデント・追加料金',
      groupThroughBtn: 'ガイドと合流しました',
      confirmExtra: '発生を確認',
    },
  },

  // 4. Chinese (简体中文)
  zh: {
    appName: 'Tourlinks',
    tagline: '连接组团社、领队、地接社与游客的出境游协同流程',
    roleSelection: {
      heroTitle: '选择您的角色视角与语言',
      heroSubtitle: 'Tourlinks 让组团社、领队、地接社与游客共享同一份出团信息。选择角色与语言体验演示。',
      selectPrompt: '1. 选择您的身份',
      languagePrompt: '2. 选择界面语言',
      launchBtn: '以此身份进入控制台',
      orCompare: '或同时并排体验三方协同视角',
      launchSplitBtn: '启动三方并排实时视图',
      recommended: '推荐 / 默认',
      changeRoleBtn: '切换角色',
      agentBadge: '组团社总部 · 雅加达',
      agentSummary: '统筹数字旅客名单、护照合规（<6个月预警）、航班雷达与DMC地接款项结算审批。',
      operatorBadge: '地接社运营中心 · 东京',
      operatorSummary: '调度司导车队、航站楼接机交接、动态行程时差调整与自由活动集合雷达。',
      travellerBadge: '游客端 · 移动智能行程通',
      travellerSummary: '随身行程单、接机会合点示意图、1键通关报备、日语司机卡与紧急SOS按钮。',
      leaderBadge: '行中随团 • 领队',
      leaderSummary: '在目的地带领全团：与地接导游会合、点名、核对分房与餐饮需求、登记异常事件并确认额外费用。',
    },
    roles: {
      agent: '出境组团社（销售端）',
      agentDesc: '客源地组团社总部 · 雅加达',
      operator: '目的地地接社（DMC / 供应商）',
      operatorDesc: '目的地落地运营团队 · 东京',
      traveller: '游客随身数字通行证',
      travellerDesc: '参团游客移动端智能行中助理',
      leader: '领队',
      leaderDesc: '组团社领队 · 全程随团',
    },
    common: {
      origin: '雅加达 (CGK)',
      destination: '东京成田 (NRT)',
      status: '状态',
      active: '进行中',
      completed: '已完成',
      pending: '待处理',
      urgent: '紧急',
      warning: '需关注',
      save: '保存修改',
      cancel: '取消',
      confirm: '确认操作',
      edit: '编辑',
      delete: '删除',
      viewDetails: '查看详情',
      refresh: '刷新状态',
      liveSync: '实时云端同步',
      homeTime: '出发地时间 (GMT+7)',
      destTime: '目的地时间 (JST GMT+9)',
      switchRole: '切换角色',
      language: '语言设置',
      online: '实时在线',
      passLabel: '游客通行证',
      passNote: '凭证与联系人集中一处',
    },
    agent: {
      title: '组团社指挥中心',
      badge: '客源地出境全局把控',
      manifestTitle: '数字化旅客名册与合规防线',
      manifestDesc: '标准化出境名单、护照有效期监控与特殊餐食（清真/过敏）统计',
      passportGuard: '护照与签证合规守卫',
      passportAlert: '出行时护照有效期不足6个月，低于组团社标准。请核对目的地入境规定。',
      nudgeWhatsApp: '1键发送 WhatsApp 催促提醒',
      roomingChart: '分房表与酒店入住分配',
      dietarySummary: '特殊餐饮需求归集（清真/素食/过敏）',
      flightMonitor: '在途国际航班动态雷达',
      checkpointProgress: '目的地地面交接里程碑',
      incidentHub: '跨境协同异常事件台',
      reportIncident: '登记三方同步事件',
      settlementTitle: 'DMC地接合同与款项结算台账',
      netRateTotal: '约定地接净价总额',
      extraCharges: '额外费用（过路费/超时/餐食）',
      approveInvoice: '签核结算',
      invoiceApproved: '结算已签核',
      allPassportsValid: '全团14位旅客护照符合入境标准',
      flaggedPassports: '需立即跟进: 2位旅客被合规警示',
    },
    operator: {
      title: '东京DMC地接运营调度中心',
      badge: '东京目的地落地统筹',
      flightRadar: '入境航班动态与预计落地时间',
      driverGuideDispatch: '专车司导调度与就位监控',
      assignedDriver: '当班司机',
      assignedGuide: '主带队导游',
      vehiclePlate: '大巴车牌号码',
      generateSignboard: '电子机场接机欢迎牌',
      signboardPreview: '预览 iPad 接机举牌界面',
      welcomeMessage: '欢迎来到东京！',
      arrivalHandshake: '成田机场入境交接检查点',
      stepStandby: '1. 司导大巴于航站楼泊位就绪',
      stepLanded: '2. 航班已平稳降落（滑行跟踪）',
      stepCustoms: '3. 旅客全员通关并在接机柱会合',
      stepBoarded: '4. 全员登车清点完毕·发车前往酒店',
      advanceCheckpoint: '推进交接状态',
      scheduleTitle: '动态行程与时间弹性微调',
      delayNotice: '因首都高早晚高峰拥堵推迟行程',
      pushSchedule: '顺延时刻 (+20分钟)',
      dropGatheringPin: '放置集合点图钉与倒计时',
      activePin: '实时集合雷达运作中',
      timeRemaining: '自由活动倒计时',
      proofOfService: '数字化服务交付履约证明',
      uploadProof: '上传带签章的行程单与酒店交接单',
      submitSettlement: '提交组团社发起账单核销',
      rollCall: '1键数字化点名与乘车清点',
      present: '已在车上',
      missing: '未归队 / 呼叫',
    },
    traveller: {
      title: '出境旅客随身通行证',
      passTitle: '东京秋日探秘与富士山 6天5晚',
      welcomeBack: '欢迎参团，Budi Santoso 先生',
      flightCardTitle: '出境航班 JL-720',
      meetingPointTitle: '机场接机立柱与导游会合点',
      meetingPointDesc: '成田机场T1航站楼 南翼到达大厅 17号立柱前（星巴克旁）',
      guideContact: '带队导游: Yumi Sato（精通英语/印尼语/日语）',
      callGuide: '通过 WhatsApp 联络导游',
      clearedCustomsBtn: '我已通关完毕！正前往出口会合',
      customsReported: '通关就绪状态已实时送达司导团队！',
      driverVehicle: '专车4号车 • 丰田考斯特 • 品川 200 か 48-12',
      todaySchedule: '今日实时同步行程单',
      gatheringRadar: '自由活动集合点雷达',
      gatheringNavBtn: '在 Google 地图导航',
      sosBtn: '我迷路了 / 紧急求助 (SOS)',
      sosDesc: '通知领队、地接导游与雅加达组团社',
      sosTriggered: 'SOS 已发送给领队与导游。',
      hotelRoomTitle: '酒店凭证与房号卡',
      roomNumber: '812号房（双床 Twin）',
      wifiPassword: 'WiFi: Granbell_Guest / 密码: tokyo2026',
      taxiCardAddress: '出示给出租车司机（日文地址卡）',
      showTaxiCard: '東京都新宿区歌舞伎町2-14-5',
      tipPassTitle: '数字登机与行中通',
    },
    leader: {
      title: '领队行中工作台',
      badge: '领队',
      tabToday: '抵达与今日行程',
      tabRollCall: '点名',
      tabRooming: '分房与餐饮',
      tabIssues: '事件与额外费用',
      groupThroughBtn: '全团已与导游会合',
      confirmExtra: '确认已发生',
    },
  },

  // 5. Korean (한국어)
  ko: {
    appName: 'Tourlinks',
    tagline: '송출 여행사·인솔자·랜드사·여행자를 잇는 아웃바운드 투어 협업 워크플로',
    roleSelection: {
      heroTitle: '역할 관점 및 언어를 선택하세요',
      heroSubtitle: 'Tourlinks는 송출 여행사, 인솔자, 현지 랜드사(DMC), 여행자가 하나의 출발 정보를 함께 보도록 합니다. 역할과 언어를 선택해 데모를 살펴보세요.',
      selectPrompt: '1. 역할 선택',
      languagePrompt: '2. 사용 언어 선택',
      launchBtn: '해당 역할로 대시보드 입장',
      orCompare: '또는 3자 화면을 나란히 한 번에 확인',
      launchSplitBtn: '삼자 분할 화면 실행',
      recommended: '추천 / 기본값',
      changeRoleBtn: '역할 변경',
      agentBadge: '출발지 여행사 본사 · 자카르타',
      agentSummary: '디지털 명단 관리, 여권 만료 6개월 미만 경고, 항공편 실시간 추적 및 DMC 정산 승인.',
      operatorBadge: '도착지 현지 랜드사 · 도쿄',
      operatorSummary: '기사 및 가이드 배차, 공항 영접 핸드셰이크, 실시간 교통 지연 반영 및 집결 핀 공유.',
      travellerBadge: '여행자 게스트 모바일 패스',
      travellerSummary: '모바일 패스, 미팅 포인트 안내도, 1탭 입국심사 완료 알림, 일본어 택시 카드 및 SOS 버튼.',
      leaderBadge: '현지 동행 • 인솔자',
      leaderSummary: '현지에서 단체를 인솔: 현지 가이드 미팅, 인원 점검, 객실 및 식단 확인, 돌발상황 기록, 추가 요금 확인.',
    },
    roles: {
      agent: '송출 여행사 (판매사)',
      agentDesc: '출발지 본사 여행사 · 자카르타',
      operator: '현지 랜드사 (DMC / 운영사)',
      operatorDesc: '도착지 현지 운영팀 · 도쿄',
      traveller: '여행자 디지털 패스',
      travellerDesc: '게스트 전용 스마트 모바일 패스',
      leader: '인솔자 (투어 리더)',
      leaderDesc: '송출 여행사 인솔자 · 단체 동행',
    },
    common: {
      origin: '자카르타 (CGK)',
      destination: '도쿄 나리타 (NRT)',
      status: '상태',
      active: '진행 중',
      completed: '완료됨',
      pending: '대기 중',
      urgent: '긴급',
      warning: '주의 필요',
      save: '변경사항 저장',
      cancel: '취소',
      confirm: '확인',
      edit: '수정',
      delete: '삭제',
      viewDetails: '상세 정보 보기',
      refresh: '상태 새로고침',
      liveSync: '실시간 클라우드 동기화',
      homeTime: '출발지 시간 (GMT+7)',
      destTime: '도착지 시간 (JST GMT+9)',
      switchRole: '역할 전환',
      language: '언어',
      online: '온라인 연결됨',
      passLabel: '여행자 패스',
      passNote: '바우처와 연락처를 한곳에',
    },
    agent: {
      title: '여행사 종합 관제 센터',
      badge: '송출지 종합 컨트롤',
      manifestTitle: '디지털 승객 명부 및 규정 준수',
      manifestDesc: '표준화된 탑승객 명단, 여권 유효기간 모니터링 및 특수 식단 관리',
      passportGuard: '여권 및 비자 규정 준수 가드',
      passportAlert: '여행 시점 기준 여권 유효기간이 6개월 미만입니다(여행사 기준 미달). 목적지 입국 규정을 확인하세요.',
      nudgeWhatsApp: '1클릭 왓츠앱 안내 발송',
      roomingChart: '객실 배정 및 호텔 숙박 현황',
      dietarySummary: '특별 식단 요구사항 (할랄/알레르기)',
      flightMonitor: '운항 중인 국제선 실시간 레이더',
      checkpointProgress: '현지 도착 및 진행 마일스톤',
      incidentHub: '국경 간 돌발상황 공유 데스크',
      reportIncident: '돌발상황 기록 및 공유',
      settlementTitle: 'DMC 계약 및 정산 원장',
      netRateTotal: '합의된 넷레이트(Net Rate) 총액',
      extraCharges: '추가 요금 (통행료/시간 외/식사)',
      approveInvoice: '정산 승인',
      invoiceApproved: '정산 승인 완료',
      allPassportsValid: '14명 전원 입국 규정 통과',
      flaggedPassports: '조치 필요: 2명 경고 발생',
    },
    operator: {
      title: '도쿄 DMC 현지 운영 본부',
      badge: '도쿄 현지 핸들링',
      flightRadar: '도착 항공편 추적 및 예정 시각',
      driverGuideDispatch: '기사 및 투어 가이드 배차 현황',
      assignedDriver: '배정 기사',
      assignedGuide: '담당 리드 가이드',
      vehiclePlate: '차량 번호판',
      generateSignboard: '공항 픽업 디지털 환영 팻말',
      signboardPreview: 'iPad 피켓 미리보기',
      welcomeMessage: '도쿄에 오신 것을 환영합니다!',
      arrivalHandshake: '공항 영접 핸드셰이크 체크포인트',
      stepStandby: '1. 기사 및 전용 버스 터미널 대기',
      stepLanded: '2. 항공기 나리타 공항 착륙',
      stepCustoms: '3. 승객 세관 통과 및 가이드 미팅',
      stepBoarded: '4. 전원 버스 탑승 완료 및 호텔 출발',
      advanceCheckpoint: '체크포인트 단계 업데이트',
      scheduleTitle: '실시간 유동적 일정 관리',
      delayNotice: '고속도로 정체로 인한 일정 조정',
      pushSchedule: '일정 시간 연장 (+20분)',
      dropGatheringPin: '집결 핀 설정 및 카운트다운',
      activePin: '실시간 집결 레이더 작동 중',
      timeRemaining: '자유시간 남은 시간',
      proofOfService: '디지털 서비스 이행 증명',
      uploadProof: '서명된 일정 확인서 사진 첨부',
      submitSettlement: '여행사에 정산 청구 제출',
      rollCall: '1탭 디지털 인원 점검',
      present: '탑승 완료',
      missing: '미도착 / 전화 확인',
    },
    traveller: {
      title: '여행자 모바일 패스',
      passTitle: '도쿄 가을 정취와 후지산 5박 6일',
      welcomeBack: '부디 산토소 고객님, 환영합니다',
      flightCardTitle: '출국 항공편 JL-720',
      meetingPointTitle: '공항 픽업 및 가이드 미팅 장소',
      meetingPointDesc: '나리타 공항 1터미널 남쪽 윙 입국 로비 17번 기둥 앞',
      guideContact: '담당 가이드: 사토 유미 (영어/인도네시아어 가능)',
      callGuide: '왓츠앱으로 가이드 통화',
      clearedCustomsBtn: '입국심사 완료했습니다! 출구로 나갑니다',
      customsReported: '도착 상태가 기사 및 가이드에게 전송되었습니다!',
      driverVehicle: '전용 버스 4호차 • 도요타 코스터 • 品川 200 か 48-12',
      todaySchedule: '오늘의 실시간 동기화 일정표',
      gatheringRadar: '자유시간 집결 장소 안내',
      gatheringNavBtn: 'Google 지도에서 길찾기',
      sosBtn: '길을 잃었습니다 / 긴급 지원 (SOS)',
      sosDesc: '인솔자, 현지 가이드, 자카르타 여행사에 알립니다',
      sosTriggered: 'SOS가 인솔자와 가이드에게 전송되었습니다.',
      hotelRoomTitle: '호텔 바우처 및 룸키 정보',
      roomNumber: '812호 (트윈 베드)',
      wifiPassword: 'WiFi: Granbell_Guest / 비밀번호: tokyo2026',
      taxiCardAddress: '택시 기사님께 보여주기 (일본어 주소 카드)',
      showTaxiCard: '東京都新宿区歌舞伎町2-14-5',
      tipPassTitle: '디지털 탑승 패스',
    },
    leader: {
      title: '인솔자 현장 키트',
      badge: '인솔자',
      tabToday: '도착 및 오늘 일정',
      tabRollCall: '인원 점검',
      tabRooming: '객실 및 식사',
      tabIssues: '돌발상황 및 추가 요금',
      groupThroughBtn: '가이드와 미팅 완료',
      confirmExtra: '발생 확인',
    },
  },

  // 6. Arabic (العربية)
  ar: {
    appName: 'Tourlinks',
    tagline: 'سير عمل مشترك للرحلات الخارجية يربط الوكيل وقائد الرحلة والمشغل الأرضي والمسافر',
    roleSelection: {
      heroTitle: 'اختر دورك واللغة المناسبة',
      heroSubtitle: 'يمنح Tourlinks الوكيل وقائد الرحلة والمشغل الأرضي (DMC) والمسافر عرضاً مشتركاً واحداً لكل رحلة. اختر الدور واللغة لاستكشاف العرض التجريبي.',
      selectPrompt: '1. حدد دورك',
      languagePrompt: '2. اختر لغة العرض',
      launchBtn: 'الدخول إلى لوحة التحكم بصفتك',
      orCompare: 'أو استكشف وجهات النظر الثلاث في آن واحد',
      launchSplitBtn: 'عرض الشاشات الثلاث المتزامنة جنباً إلى جنب',
      recommended: 'الموصى به / الافتراضي',
      changeRoleBtn: 'تبديل الدور',
      agentBadge: 'المقر الرئيسي لوكالة السفر • جاكرتا',
      agentSummary: 'إدارة قوائم الركاب الرقمية، وصلاحية الجوازات (أقل من 6 أشهر)، ورادار الرحلات الجوية، وتسوية مستحقات المشغل.',
      operatorBadge: 'إدارة العمليات الميدانية في الوجهة • طوكيو',
      operatorSummary: 'تنسيق السائقين والمرشدين، ونقاط استقبال المطار، وتحديثات التأخير التلقائية، ودبابيس التجمع في الوقت الحر.',
      travellerBadge: 'المستخدم النهائي • بطاقة المسافر الذكية',
      travellerSummary: 'بطاقة سفر على الهاتف مع خريطة نقطة الالتقاء، وإشعار اجتياز الجمارك بضغطة واحدة، وبطاقة عنوان لسائق التاكسي باليابانية، وزر SOS.',
      leaderBadge: 'في الميدان • يرافق المجموعة',
      leaderSummary: 'إدارة المجموعة ميدانياً: لقاء المرشد المحلي، التحقق من الحضور، مراجعة توزيع الغرف والاحتياجات الغذائية، تسجيل الحوادث، وتأكيد الرسوم الإضافية.',
    },
    roles: {
      agent: 'وكيل السفر الخارجي (البائع)',
      agentDesc: 'المقر الرئيسي لوكالة السفر · جاكرتا',
      operator: 'مشغل الرحلات والخدمات الأرضية (DMC)',
      operatorDesc: 'إدارة العمليات الأرضية في الوجهة · طوكيو',
      traveller: 'بطاقة المسافر الرقمية',
      travellerDesc: 'البطاقة الذكية للمسافر عبر الهاتف',
      leader: 'قائد الرحلة',
      leaderDesc: 'قائد الرحلة من الوكالة · مع المجموعة',
    },
    common: {
      origin: 'جاكرتا (CGK)',
      destination: 'طوكيو ناريتا (NRT)',
      status: 'الحالة',
      active: 'نشط',
      completed: 'مكتمل',
      pending: 'قيد الانتظار',
      urgent: 'عاجل',
      warning: 'تنبيه مطلوب',
      save: 'حفظ التغييرات',
      cancel: 'إلغاء',
      confirm: 'تأكيد الإجراء',
      edit: 'تعديل',
      delete: 'حذف',
      viewDetails: 'عرض التفاصيل',
      refresh: 'تحديث الحالة',
      liveSync: 'مزامنة سحابية مباشرة',
      homeTime: 'توقيت بلد المصدر (GMT+7)',
      destTime: 'توقيت بلد الوجهة (JST GMT+9)',
      switchRole: 'تبديل الدور',
      language: 'اللغة',
      online: 'متصل بالإنترنت',
      passLabel: 'بطاقة المسافر',
      passNote: 'القسائم وجهات الاتصال في مكان واحد',
    },
    agent: {
      title: 'مركز قيادة وكيل السفر',
      badge: 'التحكم المركزي في رحلات المصدر',
      manifestTitle: 'القائمة الرقمية وضمان الامتثال',
      manifestDesc: 'بيان أسماء موحد، ومراقبة صلاحية الجوازات، والمتطلبات الغذائية الخاصة',
      passportGuard: 'حماية متطلبات الجوازات والتأشيرات',
      passportAlert: 'تنتهي صلاحية الجواز خلال أقل من 6 أشهر من موعد السفر، وهذا دون سياسة الوكالة. تحقق من شروط الدخول إلى الوجهة.',
      nudgeWhatsApp: 'إشعار تذكير عبر واتساب بضغطة زر',
      roomingChart: 'توزيع الغرف والإشغال الفندقي',
      dietarySummary: 'المتطلبات الغذائية الخاصة (حلال / حساسية)',
      flightMonitor: 'رادار تتبع الرحلات الجوية المباشرة',
      checkpointProgress: 'المراحل الميدانية لعمليات الوصول',
      incidentHub: 'مكتب إدارة الحوادث العابرة للحدود',
      reportIncident: 'تسجيل بلاغ حادث مشترك',
      settlementTitle: 'عقد المشغل وسجل التسويات المالية',
      netRateTotal: 'إجمالي السعر الصافي المتفق عليه (Net Rate)',
      extraCharges: 'رسوم إضافية (رسوم الطرق، ساعات إضافية، وجبات)',
      approveInvoice: 'اعتماد التسوية',
      invoiceApproved: 'تم اعتماد التسوية',
      allPassportsValid: 'كافة الجوازات الـ 14 مطابقة للشروط',
      flaggedPassports: 'إجراء مطلوب: تم التنبيه على راكبين',
    },
    operator: {
      title: 'مركز عمليات المشغل الميداني في طوكيو',
      badge: 'الخدمات الأرضية في طوكيو',
      flightRadar: 'تتبع رحلات الوصول والموعد المتوقع',
      driverGuideDispatch: 'جدولة السائقين والمرشدين السياحيين',
      assignedDriver: 'السائق المعين',
      assignedGuide: 'المرشد السياحي الرئيسي',
      vehiclePlate: 'لوحة ترخيص الحافلة',
      generateSignboard: 'لوحة الترحيب الرقمية في المطار',
      signboardPreview: 'معاينة لافتة الاستقبال على iPad',
      welcomeMessage: 'مرحباً بكم في طوكيو!',
      arrivalHandshake: 'مراحل استقبال وتأكيد ركاب المطار',
      stepStandby: '1. السائق والحافلة جاهزان في الصالة',
      stepLanded: '2. هبوط الطائرة في المطار (متابعة)',
      stepCustoms: '3. انتهاء الركاب من الجمارك والالتقاء بالمرشد',
      stepBoarded: '4. صعود كافة الركاب للحافلة والتحرك للفندق',
      advanceCheckpoint: 'تحديث مرحلة الاستقبال',
      scheduleTitle: 'الجدول الزمني الديناميكي وتعديل الأوقات',
      delayNotice: 'تأخير المواعيد بسبب الازدحام المروري على الطريق السريع',
      pushSchedule: 'تمديد الجدول الزمني (+20 دقيقة)',
      dropGatheringPin: 'تحديد نقطة التجمع وبدء العد التنازلي',
      activePin: 'رادار نقطة التجمع نشط حالياً',
      timeRemaining: 'الوقت المتبقي للجولة الحرة',
      proofOfService: 'إثبات تقديم الخدمة الرقمي والتوثيق',
      uploadProof: 'إرفاق صورة توقيع خط السير المعتمد',
      submitSettlement: 'إرسال الفاتورة للوكيل لاعتماد الدفع',
      rollCall: 'تسجيل الحضور الرقمي بضغطة زر',
      present: 'حاضر في الحافلة',
      missing: 'مفقود / الاتصال به',
    },
    traveller: {
      title: 'بطاقة المسافر الذكية',
      passTitle: 'رحلة خريف طوكيو وجبل فوجي 6 أيام و5 ليالٍ',
      welcomeBack: 'أهلاً بك على متن الرحلة، السيد بودي سانتوسو',
      flightCardTitle: 'رحلة المغادرة JL-720',
      meetingPointTitle: 'نقطة الاستقبال بالمطار ولقاء المرشد',
      meetingPointDesc: 'مطار ناريتا مبنى 1، صالة الوصول الجناح الجنوبي، أمام العمود رقم 17',
      guideContact: 'المرشد الرئيسي: يومي ساتو (يتحدث الإنجليزية والإندونيسية)',
      callGuide: 'الاتصال بالمرشد عبر واتساب',
      clearedCustomsBtn: 'لقد اجتزت الجمارك! متوجه الآن نحو المخرج',
      customsReported: 'تم إرسال إشعار الوصول إلى السائق والمرشد بنجاح!',
      driverVehicle: 'الحافلة رقم 04 • تويوتا كوستر • 品川 200 か 48-12',
      todaySchedule: 'الجدول الزمني المباشر لليوم',
      gatheringRadar: 'نقطة التجمع المحددة للوقت الحر',
      gatheringNavBtn: 'فتح الاتجاهات في خرائط Google',
      sosBtn: 'أنا تائه / أحتاج مساعدة عاجلة (SOS)',
      sosDesc: 'ينبّه قائد الرحلة والمرشد المحلي ووكالة السفر في جاكرتا',
      sosTriggered: 'تم إرسال نداء SOS إلى قائد الرحلة والمرشد.',
      hotelRoomTitle: 'قسيمة الفندق ومعلومات الغرفة',
      roomNumber: 'الغرفة 812 (سريران منفصلان)',
      wifiPassword: 'WiFi: Granbell_Guest / كلمة السر: tokyo2026',
      taxiCardAddress: 'بطاقة إظهار العنوان لسائق التاكسي (باليابانية)',
      showTaxiCard: '東京都新宿区歌舞伎町2-14-5',
      tipPassTitle: 'بطاقة الصعود الرقمية',
    },
    leader: {
      title: 'أدوات قائد الرحلة الميدانية',
      badge: 'قائد الرحلة',
      tabToday: 'الوصول وبرنامج اليوم',
      tabRollCall: 'التحقق من الحضور',
      tabRooming: 'الغرف والوجبات',
      tabIssues: 'الحوادث والرسوم الإضافية',
      groupThroughBtn: 'التقت المجموعة بالمرشد',
      confirmExtra: 'تأكيد حدوثها',
    },
  },
};
