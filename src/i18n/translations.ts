export type SupportedLanguage = 'en' | 'id' | 'ja';

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
  };
  roles: {
    agent: string;
    agentDesc: string;
    operator: string;
    operatorDesc: string;
    traveller: string;
    travellerDesc: string;
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
    offlineMode: string;
    offlineCached: string;
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
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appName: 'TourFlow Outbound',
    tagline: 'Collaborative Tri-Party Outbound Tour Workflow',
    roleSelection: {
      heroTitle: 'Select Your Perspective & Language',
      heroSubtitle: 'TourFlow synchronizes the 3 parties of outbound travel in real time. Choose a role and language to enter the dedicated dashboard.',
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
      travellerSummary: 'Offline-ready travel pass with meeting point photos, 1-tap customs clearance, taxi card in Japanese, and emergency SOS.',
    },
    roles: {
      agent: 'Outbound Agent (Seller)',
      agentDesc: 'HQ Origin Agency · Jakarta',
      operator: 'Ground DMC & Operator',
      operatorDesc: 'Destination Ground Ops · Tokyo',
      traveller: 'Traveller Pass',
      travellerDesc: 'Guest Mobile Digital Pass',
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
      offlineMode: 'Offline Mode Active',
      offlineCached: 'All vouchers & contacts cached locally',
    },
    agent: {
      title: 'Agent Command Center',
      badge: 'Outbound Origin Control',
      manifestTitle: 'Digital Manifest & Compliance Guard',
      manifestDesc: 'Standardized guest roster, passport expiry monitoring & dietary requirements',
      passportGuard: 'Passport & Visa Compliance Guard',
      passportAlert: 'Passports expiring in < 6 months or missing Japanese e-Visa detected!',
      nudgeWhatsApp: '1-Click WhatsApp Nudge',
      roomingChart: 'Room Allocation & Occupancy',
      dietarySummary: 'Special Dietary Requirements',
      flightMonitor: 'Live Flight In-Transit Radar',
      checkpointProgress: 'Ground Execution Milestones',
      incidentHub: 'Cross-Border Incident Desk',
      reportIncident: 'Log Shared Incident',
      settlementTitle: 'DMC Contract & Settlement Ledger',
      netRateTotal: 'Agreed Net Rate',
      extraCharges: 'Approved Extra Mileage/Hours',
      approveInvoice: 'Sign-off & Release Net Settlement',
      invoiceApproved: 'Settlement Signed & Disbursed',
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
      sosDesc: 'Instantly alerts your Tour Leader and Jakarta Travel Agent with your location',
      sosTriggered: 'SOS Alert Broadcasted! Guide is on the way.',
      hotelRoomTitle: 'Hotel & Keycard Voucher',
      roomNumber: 'Room 812 (Twin Bed)',
      wifiPassword: 'WiFi: Granbell_Guest / Pass: tokyo2026',
      taxiCardAddress: 'Show Taxi Driver (Japanese Address Card)',
      showTaxiCard: '東京都新宿区歌舞伎町2-1-2',
      tipPassTitle: 'Digital Boarding Pass',
    },
  },
  id: {
    appName: 'TourFlow Outbound',
    tagline: 'Alur Kerja Kolaboratif 3 Pihak untuk Tur Outbound',
    roleSelection: {
      heroTitle: 'Pilih Peran & Bahasa Demo Anda',
      heroSubtitle: 'TourFlow menyinkronkan 3 pihak tur outbound secara real-time. Pilih peran dan bahasa untuk masuk ke dashboard khusus.',
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
      travellerSummary: 'Paspor digital offline dengan foto titik jemput (Tiang 17), 1-klik lolos imigrasi, kartu alamat taksi Jepang, dan SOS darurat.',
    },
    roles: {
      agent: 'Agen Outbound (Penjual)',
      agentDesc: 'Kantor Pusat Asal · Jakarta',
      operator: 'DMC & Operator Lapangan',
      operatorDesc: 'Operasional Lapangan Destinasi · Tokyo',
      traveller: 'Paspor Digital Peserta',
      travellerDesc: 'Aplikasi Digital Tamu / Wisatawan',
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
      offlineMode: 'Mode Offline Aktif',
      offlineCached: 'Semua voucher & kontak tersimpan lokal',
    },
    agent: {
      title: 'Pusat Kendali Agen',
      badge: 'Kontrol Asal Outbound',
      manifestTitle: 'Manifes Digital & Pengawal Kepatuhan',
      manifestDesc: 'Daftar nama terstandarisasi, pantauan kedaluwarsa paspor & kebutuhan makanan',
      passportGuard: 'Pengawal Kepatuhan Paspor & Visa',
      passportAlert: 'Terdeteksi paspor berlaku < 6 bulan atau e-Visa Jepang belum diunggah!',
      nudgeWhatsApp: '1-Klik Kirim Pengingat WhatsApp',
      roomingChart: 'Distribusi Kamar & Hunian',
      dietarySummary: 'Kebutuhan Makanan Khusus (Halal / Alergi)',
      flightMonitor: 'Radar Penerbangan Langsung',
      checkpointProgress: 'Progres Titik Kumpul & Eksekusi',
      incidentHub: 'Meja Insiden Lintas Batas',
      reportIncident: 'Catat Insiden Bersama',
      settlementTitle: 'Kontrak DMC & Rekonsiliasi Pembayaran',
      netRateTotal: 'Total Tarif Bersih (Net Rate)',
      extraCharges: 'Biaya Tambahan Jam/BBM Disetujui',
      approveInvoice: 'Tandatangani & Cairkan Pembayaran',
      invoiceApproved: 'Pelunasan Disetujui & Dicairkan',
      allPassportsValid: 'Semua 14 Paspor Memenuhi Syarat',
      flaggedPassports: 'Perlu Tindakan: 2 Tamu Ditandai',
    },
    operator: {
      title: 'Pusat Operasional DMC Tokyo',
      badge: 'Penanganan Lapangan Tokyo',
      flightRadar: 'Pelacakan Penerbangan & Estimasi Kedatangan',
      driverGuideDispatch: 'Penugasan Sopir & Tour Leader',
      assignedDriver: 'Sopir Ditugaskan',
      assignedGuide: 'Pemandu Tur Utama',
      vehiclePlate: 'Plat Nomor Kendaraan',
      generateSignboard: 'Papan Paging Digital Bandara',
      signboardPreview: 'Pratinjau Papan Sambut Tamu',
      welcomeMessage: 'Selamat Datang di Tokyo!',
      arrivalHandshake: 'Titik Temu Kedatangan Bandara',
      stepStandby: '1. Sopir Siaga di Terminal Bandara',
      stepLanded: '2. Pesawat Mendarat (Pelacakan)',
      stepCustoms: '3. Tamu Lolos Imigrasi & Bertemu Pemandu',
      stepBoarded: '4. Semua Tamu Naik Bus Menuju Hotel',
      advanceCheckpoint: 'Perbarui Status Titik Temu',
      scheduleTitle: 'Jadwal Dinamis & Pergeseran Waktu',
      delayNotice: 'Penyesuaian jadwal akibat lalu lintas jalan tol',
      pushSchedule: 'Undur Waktu (+20 mnt)',
      dropGatheringPin: 'Pasang Titik Kumpul & Hitung Mundur',
      activePin: 'Radar Titik Kumpul Aktif',
      timeRemaining: 'Sisa Waktu Bebas',
      proofOfService: 'Bukti Digital Pelaksanaan Tur',
      uploadProof: 'Unggah Foto Bukti & Tanda Tangan',
      submitSettlement: 'Kirim untuk Persetujuan Invoice Agen',
      rollCall: 'Hitung Peserta Digital 1-Ketukan',
      present: 'Hadir',
      missing: 'Belum Hadir / Hubungi',
    },
    traveller: {
      title: 'Paspor Digital Peserta',
      passTitle: 'Pesona Musim Gugur Tokyo 6H5M',
      welcomeBack: 'Selamat datang, Budi Santoso',
      flightCardTitle: 'Penerbangan Outbound JL-720',
      meetingPointTitle: 'Titik Jemput & Pertemuan Pemandu',
      meetingPointDesc: 'Bandara Narita Terminal 1, South Wing Arrival Gate, Tiang #17',
      guideContact: 'Pemandu: Yumi Sato (Bisa Bhs Indonesia & Inggris)',
      callGuide: 'Hubungi Pemandu via WhatsApp',
      clearedCustomsBtn: 'Saya Sudah Lolos Imigrasi! Menuju Pintu Keluar',
      customsReported: 'Status kedatangan terkirim ke Sopir & Pemandu!',
      driverVehicle: 'Bus #04 • Toyota Coaster • 品川 200 か 48-12',
      todaySchedule: 'Jadwal Tur Hari Ini (Dinamis)',
      gatheringRadar: 'Titik Kumpul Sedang Aktif',
      gatheringNavBtn: 'Buka Arah di Google Maps',
      sosBtn: 'SAYA TERSESAT / BUTUH BANTUAN (SOS)',
      sosDesc: 'Kirim koordinat lokasi langsung ke Tour Leader & Agen Jakarta',
      sosTriggered: 'Peringatan SOS Terkirim! Pemandu sedang menuju lokasimu.',
      hotelRoomTitle: 'Voucher Hotel & Kartu Kamar',
      roomNumber: 'Kamar 812 (Twin Bed)',
      wifiPassword: 'WiFi: Granbell_Guest / Sandi: tokyo2026',
      taxiCardAddress: 'Tunjukkan ke Sopir Taksi (Alamat Jepang)',
      showTaxiCard: '東京都新宿区歌舞伎町2-1-2',
      tipPassTitle: 'Boarding Pass Digital',
    },
  },
  ja: {
    appName: 'TourFlow Outbound',
    tagline: 'アウトバウンドツアー・3者協調型運用プラットフォーム',
    roleSelection: {
      heroTitle: '体験する立場（ロール）と言語を選択',
      heroSubtitle: 'TourFlowはアウトバウンドツアーの3者をリアルタイムに同期します。役職と言語を選んでダッシュボードを開始してください。',
      selectPrompt: '1. あなたの役割を選択',
      languagePrompt: '2. 体験言語を選択',
      launchBtn: 'ダッシュボードへ入る:',
      orCompare: 'または3者の視点を同時に確認',
      launchSplitBtn: '3者並行同期ビューを起動',
      recommended: '推奨 / デフォルト',
      changeRoleBtn: '役職を変更',
      agentBadge: '送客旅行代理店HQ • ジャカルタ',
      agentSummary: '乗客マニフェスト、パスポート残存期間警告（6ヶ月未満）、フライトレーダー、現地DMC精算承認を一元管理。',
      operatorBadge: '着地運用オペレーター • 東京',
      operatorSummary: '専属ドライバー・ガイド手配、空港ミート進捗、交通状況による動的スケジュール調整、集合ピン送信。',
      travellerBadge: '旅行者エンドユーザー • スマホパス',
      travellerSummary: 'オフライン対応の旅程表、17番柱ミーティング写真、税関通過ワンタップ通知、日本語タクシーカード、緊急SOS。',
    },
    roles: {
      agent: '送客旅行代理店 (Agent)',
      agentDesc: '発地HQ・ジャカルタ',
      operator: '現地手配会社 (DMC / Operator)',
      operatorDesc: '着地運用・東京オペレーション',
      traveller: '旅行者デジタルパス',
      travellerDesc: 'お客様用モバイルパス',
    },
    common: {
      origin: 'ジャカルタ (CGK)',
      destination: '東京成田 (NRT)',
      status: 'ステータス',
      active: '進行中',
      completed: '完了',
      pending: '待機中',
      urgent: '緊急',
      warning: '要確認',
      save: '変更を保存',
      cancel: 'キャンセル',
      confirm: '確定する',
      edit: '編集',
      delete: '削除',
      viewDetails: '詳細を見る',
      refresh: '更新',
      liveSync: 'クラウド自動同期',
      homeTime: '日本時間 (JST / GMT+9)',
      destTime: '現地時間 (JST / GMT+9)',
      switchRole: '役職を変更',
      language: '言語切替',
      online: 'オンライン接続中',
      offlineMode: 'オフライン対応モード',
      offlineCached: 'バウチャーと緊急連絡先はローカル保存済み',
    },
    agent: {
      title: '送客エージェント管理画面',
      badge: '発地コントロール',
      manifestTitle: 'デジタルマニフェスト＆コンプライアンス管理',
      manifestDesc: '標準化された乗客リスト、パスポート残存期間、食事要件の統合管理',
      passportGuard: 'パスポート・ビザ事前チェック',
      passportAlert: '残存期間6ヶ月未満、またはビザ未確認のお客様が2名検出されました',
      nudgeWhatsApp: 'WhatsAppで督促メッセージを送信',
      roomingChart: 'ホテル部屋割り・利用人数',
      dietarySummary: '食事制限（ハラール・アレルギー等）',
      flightMonitor: 'フライト動態・追跡レーダー',
      checkpointProgress: '現地運行マイルストーン',
      incidentHub: '国境間インシデントデスク',
      reportIncident: '新規インシデント起票',
      settlementTitle: 'DMC精算および契約管理',
      netRateTotal: '契約ネット料金合計',
      extraCharges: '追加運行・待機料金承認',
      approveInvoice: '精算承認・送金手配を確定',
      invoiceApproved: '精算承認済み・決済完了',
      allPassportsValid: '参加者全員のパスポート要件確認済み',
      flaggedPassports: '要対応: 2名の書類に不備があります',
    },
    operator: {
      title: '東京現地DMC・運行管理ハブ',
      badge: '現地着地オペレーション',
      flightRadar: '到着便追跡・ETA管理',
      driverGuideDispatch: '配車および専属ガイド手配',
      assignedDriver: '担当ドライバー',
      assignedGuide: '主担当ガイド',
      vehiclePlate: '配車車両ナンバー',
      generateSignboard: 'デジタル歓迎ネームボード',
      signboardPreview: 'iPadミートボード表示',
      welcomeMessage: '東京へようこそ！',
      arrivalHandshake: '空港ミート＆ハンドシェイク進捗',
      stepStandby: '1. ドライバーがターミナルに待機完了',
      stepLanded: '2. 航空機着陸確認 (トラッキング)',
      stepCustoms: '3. 入国審査通過・ガイド合流完了',
      stepBoarded: '4. 全員バス乗車・ホテルへ出発',
      advanceCheckpoint: 'チェックポイントを更新',
      scheduleTitle: '動的スケジュール調整＆渋滞対応',
      delayNotice: '首都高渋滞によるスケジュールスライド',
      pushSchedule: '時間を20分繰り下げ',
      dropGatheringPin: '集合場所ピン設定＆カウントダウン',
      activePin: '集合レーダー発信中',
      timeRemaining: '自由行動残り時間',
      proofOfService: 'サービス提供証明・運行完了サイン',
      uploadProof: 'サイン入り運行日報の撮影・提出',
      submitSettlement: '代理店へ精算申請を送信',
      rollCall: 'ワンタップ人数点呼',
      present: '点呼済み',
      missing: '未確認 / 連絡',
    },
    traveller: {
      title: '参加者専用スマートパス',
      passTitle: '秋の東京・富士山満喫 6日間',
      welcomeBack: 'ようこそ、Budi Santoso 様',
      flightCardTitle: '往路フライト JL-720便',
      meetingPointTitle: '空港ピックアップ＆ガイド合流場所',
      meetingPointDesc: '成田空港第1ターミナル 南ウイング到着ロビー 17番柱前',
      guideContact: '担当ガイド: 佐藤 由美（英語・インドネシア語対応）',
      callGuide: 'ガイドへWhatsApp連絡',
      clearedCustomsBtn: '税関を通過しました！出口へ向かいます',
      customsReported: '到着完了ステータスをガイドと運転手へ通知しました！',
      driverVehicle: '専用中型バス4号車 • トヨタ コースター • 品川 200 か 48-12',
      todaySchedule: '本日のタイムスケジュール',
      gatheringRadar: '現在設定されている集合場所',
      gatheringNavBtn: 'Googleマップでルート案内',
      sosBtn: '迷子・緊急SOSボタン',
      sosDesc: '現在地を現地ガイドと旅行代理店本部へ即座に送信します',
      sosTriggered: 'SOSを発信しました！ガイドが向かっています。',
      hotelRoomTitle: 'ホテル宿泊情報・客室カード',
      roomNumber: '812号室 (ツインベッド)',
      wifiPassword: 'WiFi: Granbell_Guest / パスワード: tokyo2026',
      taxiCardAddress: 'タクシー運転手に見せるカード（日本語表記）',
      showTaxiCard: '東京都新宿区歌舞伎町2-1-2 グランベルホテル新宿',
      tipPassTitle: 'デジタルボーディングパス',
    },
  },
};
