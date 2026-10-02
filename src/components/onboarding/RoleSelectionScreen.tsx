import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { useTranslation } from '../../i18n/LanguageContext';
import type { SupportedLanguage } from '../../i18n/translations';
import { translations } from '../../i18n/translations';
import type { StakeholderRole } from '../../types/tour';
import { M3Icon } from '../m3/M3Icon';

interface RoleSelectionScreenProps {
  onEnterDashboard: (selectedRole: StakeholderRole, selectedLang: SupportedLanguage) => void;
  onBackToMarketing?: () => void;
}

const languageOptions: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ja', label: '日本語 (Japanese)', flag: '🇯🇵' },
  { code: 'th', label: 'ไทย (Thai)', flag: '🇹🇭' },
  { code: 'zh', label: '中文 (Chinese)', flag: '🇨🇳' },
  { code: 'ko', label: '한국어 (Korean)', flag: '🇰🇷' },
  { code: 'es', label: 'Español (Spanish)', flag: '🇪🇸' },
  { code: 'hi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'ar', label: 'العربية (Arabic)', flag: '🇸🇦' },
];

const roleFeaturesByLang: Record<StakeholderRole, Record<SupportedLanguage, string[]>> = {
  agent: {
    en: [
      'Passport (<6 months) Guard with 1-Click WhatsApp Nudge',
      'Digital Manifest of 14 Guests & Rooming Allocation',
      'Live Flight In-Transit Radar (JL720 CGK ➔ NRT)',
      'Sign-off & DMC Net Rate Settlement ($14,800)',
    ],
    id: [
      'Pengawal Paspor (<6 bulan) dengan 1-Klik Nudge WhatsApp',
      'Manifes Digital 14 Tamu & Alokasi Kamar Hotel',
      'Radar Penerbangan Langsung (JL720 CGK ➔ NRT)',
      'Tanda Tangan & Pelunasan Net Rate DMC ($14.800)',
    ],
    ja: [
      'パスポート残存期間（6ヶ月未満）検知＆WhatsApp督促',
      '14名のデジタル搭乗者名簿＆ホテル客室アサイン',
      '運航監視レーダー（JL720 CGK ➔ NRT）',
      'DMCネトレート決済承認＆送金管理（$14,800）',
    ],
    th: [
      'ระบบตรวจพาสปอร์ต (<6 เดือน) พร้อมแจ้งเตือน WhatsApp 1 คลิก',
      'บัญชีรายชื่อดิจิทัล 14 ท่านและการจัดสรรห้องพัก',
      'เรดาร์เที่ยวบินสด (JL720 CGK ➔ NRT)',
      'ลงนามและอนุมัติการชำระเงินสุทธิ DMC ($14,800)',
    ],
    zh: [
      '护照合规守卫（<6个月预警）与 1键 WhatsApp 催办',
      '14位旅客数字名册与酒店分房入住明细',
      '国际航班动态雷达（JL720 CGK ➔ NRT）',
      'DMC 地接净价结算签核与拨款（$14,800）',
    ],
    ko: [
      '여권 유효기간(6개월 미만) 감지 및 1클릭 왓츠앱 안내',
      '14명 디지털 승객 명부 및 객실 배정',
      '항공편 실시간 운항 레이더 (JL720 CGK ➔ NRT)',
      'DMC 넷레이트 정산 승인 및 결제 ($14,800)',
    ],
    es: [
      'Alerta de pasaporte (<6 meses) y recordatorio por WhatsApp',
      'Manifiesto digital de 14 huéspedes y asignación de habitaciones',
      'Radar de vuelo en tránsito (JL720 CGK ➔ NRT)',
      'Firma y liquidación de tarifa neta DMC ($14,800)',
    ],
    hi: [
      'पासपोर्ट (<6 महीने) सुरक्षा और 1-क्लिक व्हाट्सएप अनुस्मारक',
      '14 अतिथियों का डिजिटल घोषणापत्र और कमरा आवंटन',
      'लाइव उड़ान ट्रैकिंग रडार (JL720 CGK ➔ NRT)',
      'डीएमसी शुद्ध दर निपटान अनुमोदन ($14,800)',
    ],
    ar: [
      'مراقبة صلاحية الجوازات (أقل من 6 أشهر) والتذكير بواتساب',
      'القائمة الرقمية لـ 14 مسافراً وتوزيع الغرف الفندقية',
      'رادار تتبع الرحلة الجوية المباشرة (JL720 CGK ➔ NRT)',
      'اعتماد وصرف المستحقات المالية الصافية للمشغل (14,800$)',
    ],
  },
  operator: {
    en: [
      'Chauffeur (Tanaka) & Lead Guide (Sato) Dispatch',
      'Full-Screen Digital Airport Paging Board for iPad',
      'Arrival Handshake (Standby ➔ Landed ➔ Met ➔ Boarded)',
      'Dynamic Expressway Traffic Delay (+20m) & Gathering Radar',
    ],
    id: [
      'Penugasan Sopir (Tanaka) & Pemandu Utama (Sato)',
      'Papan Penjemputan Digital Bandara Layar Penuh untuk iPad',
      'Pemeriksaan Kedatangan (Siaga ➔ Mendarat ➔ Temu ➔ Naik Bus)',
      'Penyesuaian Jadwal Macet Tol (+20m) & Radar Titik Kumpul',
    ],
    ja: [
      '専属ドライバー（田中）＆ガイド（佐藤）の配車手配',
      'iPad用 フルスクリーン空港ミート看板',
      '空港到着ハンドシェイク（待機 ➔ 乗車完了）',
      '首都高渋滞による動的遅延調整（+20分）＆集合ピン',
    ],
    th: [
      'จัดสรรคนขับ (Tanaka) และมัคคุเทศก์หลัก (Sato)',
      'ป้ายต้อนรับดิจิทัลเต็มจอสำหรับ iPad ที่สนามบิน',
      'ขั้นตอนการรับที่สนามบิน (สแตนด์บาย ➔ ลงจอด ➔ พบกัน ➔ ขึ้นรถ)',
      'ปรับเวลาล่าช้าจากสภาพการจราจร (+20 นาที) และเรดาร์จุดรวมพล',
    ],
    zh: [
      '专车司机（田中）与带队导游（佐藤）就位调度',
      '适用于 iPad 的机场全屏电子接机牌',
      '成田机场入境交接流程（就位 ➔ 落地 ➔ 会合 ➔ 发车）',
      '高速拥堵动态行程顺延（+20分钟）与集合雷达',
    ],
    ko: [
      '전용 기사(다나카) 및 리드 가이드(사토) 배차',
      'iPad용 공항 영접 디지털 피켓 보드',
      '공항 영접 단계 (대기 ➔ 착륙 ➔ 미팅 ➔ 탑승)',
      '고속도로 정체 반영 동적 시간 조정 (+20분) 및 집결 레이더',
    ],
    es: [
      'Asignación de chofer (Tanaka) y guía líder (Sato)',
      'Cartel digital de bienvenida en pantalla completa para iPad',
      'Protocolo de recepción (Espera ➔ Aterrizaje ➔ Encuentro ➔ A bordo)',
      'Ajuste dinámico por tráfico (+20m) y radar de punto de encuentro',
    ],
    hi: [
      'ड्राइवर (तनाका) और टूर गाइड (सातो) प्रेषण',
      'iPad के लिए पूर्ण-स्क्रीन डिजिटल हवाई अड्डा स्वागत बोर्ड',
      'आगमन प्रक्रिया (तैयार ➔ उतरा ➔ मिले ➔ बस में सवार)',
      'हाईवे जाम के कारण गतिशील समायोजन (+20 मिनट) और सभा रडार',
    ],
    ar: [
      'جدولة السائق (تاناكا) والمرشد السياحي (ساتو)',
      'لافتة ترحيب رقمية ملء الشاشة لأجهزة iPad بالمطار',
      'مراحل الاستقبال (الاستعداد ➔ الهبوط ➔ اللقاء ➔ الصعود للحافلة)',
      'تعديل أوقات التأخير المروري (+20 دقيقة) ورادار التجمع',
    ],
  },
  traveller: {
    en: [
      'Offline-Ready Mobile Web Pass (Cached Vouchers & Wi-Fi)',
      'Narita T1 Meeting Point Photo (Pillar #17 Near Starbucks)',
      '1-Tap "I Have Cleared Customs! Heading to Exit"',
      'Japanese Taxi Address Card & Emergency SOS Radar',
    ],
    id: [
      'Paspor Digital Offline (Voucher Hotel & Sandi Wi-Fi Tersimpan)',
      'Foto Titik Temu Bandara Narita T1 (Tiang #17 Dekat Starbucks)',
      '1-Klik "Saya Sudah Lolos Imigrasi! Menuju Pintu Keluar"',
      'Kartu Alamat Taksi Jepang & Radar SOS Darurat',
    ],
    ja: [
      'オフライン対応モバイル旅程（バウチャー＆Wi-Fi保存済）',
      '成田空港T1 ミーティング柱写真（南ウイング17番柱）',
      '1タップ「税関通過・出口へ向かいます」連絡',
      'タクシー運転手提示カード（日本語住所）＆緊急SOS',
    ],
    th: [
      'พาสดิจิทัลออฟไลน์ (บันทึกวอชเชอร์และรหัส Wi-Fi)',
      'รูปถ่ายจุดนัดพบสนามบินนาริตะ T1 (เสา #17 ใกล้สตาร์บัคส์)',
      '1 แตะ "ฉันผ่านศุลกากรแล้ว! กำลังเดินไปทางออก"',
      'การ์ดที่อยู่ภาษาญี่ปุ่นสำหรับแท็กซี่ และ SOS ฉุกเฉิน',
    ],
    zh: [
      '离线可用随身行程单（酒店凭证与 Wi-Fi 密码离线存储）',
      '成田 T1 接机立柱实景指引图（南翼 17号立柱 星巴克旁）',
      '1键报备“我已通过海关！正前往出口会合”',
      '日文出租车司机地址卡与精准紧急 SOS 救援',
    ],
    ko: [
      '오프라인 지원 모바일 패스 (호텔 바우처 및 Wi-Fi 캐싱)',
      '나리타 T1 미팅 포인트 실사 사진 (스타벅스 옆 17번 기둥)',
      '1탭 "입국심사 완료! 출구로 이동 중" 알림',
      '일본어 택시 주소 카드 및 긴급 SOS 레이더',
    ],
    es: [
      'Pase móvil sin conexión (cupones y Wi-Fi en caché)',
      'Foto del punto de encuentro en Narita T1 (Pilar #17)',
      '1 toque "¡Pasé la aduana! Voy a la salida"',
      'Tarjeta de taxi en japonés y radar SOS de emergencia',
    ],
    hi: [
      'ऑफ़लाइन-तैयार मोबाइल पास (वाउचर और वाई-फ़ाई सहेजे गए)',
      'नरीता T1 मिलन स्थल फ़ोटो (स्टारबक्स के पास पिलर #17)',
      '1-टैप "मैंने कस्टम्स पार किया! बाहर आ रहा हूँ"',
      'जापानी टैक्सी पता कार्ड और आपातकालीन एसओएस',
    ],
    ar: [
      'بطاقة هاتف ذكية تعمل بدون إنترنت (القسائم وبيانات الواي فاي)',
      'صورة نقطة الالتقاء بمطار ناريتا T1 (أمام العمود رقم 17)',
      'ضغطة زر واحدة: "لقد اجتزت الجمارك وأتجه نحو المخرج"',
      'بطاقة عنوان الفندق لسائق التاكسي باليابانية ونداء SOS طارئ',
    ],
  },
};

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({
  onEnterDashboard,
  onBackToMarketing,
}) => {
  const { tour } = useTour();
  const { setLanguage, t } = useTranslation();

  const [selectedRole, setSelectedRole] = useState<StakeholderRole>('agent');

  // Independent in-card language state: Agent defaults to ID, Operator to JA, Traveler to EN
  const [cardLanguages, setCardLanguages] = useState<Record<StakeholderRole, SupportedLanguage>>({
    agent: 'id',
    operator: 'ja',
    traveller: 'en',
  });

  // Guarantee welcome page header stays clean in English by default
  React.useEffect(() => {
    setLanguage('en');
  }, []);

  const handleCardLangChange = (roleId: StakeholderRole, newLang: SupportedLanguage) => {
    setCardLanguages((prev) => ({ ...prev, [roleId]: newLang }));
    if (selectedRole === roleId) {
      setLanguage(newLang);
    }
  };

  const handleRoleSelect = (roleId: StakeholderRole) => {
    setSelectedRole(roleId);
    setLanguage(cardLanguages[roleId]);
  };

  const handleLaunch = (roleId: StakeholderRole) => {
    const targetLang = cardLanguages[roleId];
    setLanguage(targetLang);
    onEnterDashboard(roleId, targetLang);
  };

  const rolesMeta: {
    id: StakeholderRole;
    icon: string;
    colorAccent: string;
    bgAccent: string;
    borderActive: string;
  }[] = [
    {
      id: 'agent',
      icon: 'corporate_fare',
      colorAccent: 'text-primary',
      bgAccent: 'bg-primary-container text-on-primary-container',
      borderActive: 'border-primary ring-primary/20',
    },
    {
      id: 'operator',
      icon: 'commute',
      colorAccent: 'text-secondary',
      bgAccent: 'bg-secondary-container text-on-secondary-container',
      borderActive: 'border-secondary ring-secondary/20',
    },
    {
      id: 'traveller',
      icon: 'badge',
      colorAccent: 'text-tertiary',
      bgAccent: 'bg-tertiary-container text-on-tertiary-container',
      borderActive: 'border-tertiary ring-tertiary/20',
    },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between p-4 sm:p-6 lg:p-10 select-none animate-in fade-in duration-300">
      <div className="max-w-6xl w-full mx-auto space-y-8">
        {/* Top Bar with Return to Marketing Website */}
        <div className="flex items-center justify-between">
          <a
            href={
              typeof window !== 'undefined' && window.location.hostname.includes('travelflow.neralab.id')
                ? 'https://travelflow.neralab.id'
                : '/'
            }
            onClick={(e) => {
              if (onBackToMarketing) {
                e.preventDefault();
                onBackToMarketing();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-m3-full bg-surface-container border border-outline-variant/60 text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <M3Icon name="arrow_back" size={16} />
            <span className="font-black text-sm">Travelflow</span>
          </a>

          <span className="text-[11px] font-mono font-bold text-primary px-3 py-1 rounded-m3-full bg-primary-container text-on-primary-container hidden sm:inline">
            demo.travelflow.neralab.id
          </span>
        </div>

        {/* Brand & Hero Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center px-4 py-1.5 rounded-m3-full bg-primary-container text-on-primary-container text-xs font-extrabold tracking-wide uppercase shadow-xs">
            <span>Interactive Outbound Tour Workflow Demo</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-roboto tracking-tight text-on-surface">
            {t.roleSelection.heroTitle}
          </h1>

          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            {t.roleSelection.heroSubtitle}
          </p>

          {/* Standout Active Tour Showcase Capsule */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 sm:p-2 sm:pr-4 rounded-m3-full bg-surface-container-lowest m3-elevation-2 border border-primary/20 shadow-md hover:m3-elevation-3 transition-all duration-300">
              {/* Tour Code Badge with Live Pulse */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-m3-full bg-primary text-on-primary font-mono font-extrabold text-xs tracking-wider shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                <M3Icon name="confirmation_number" size={14} />
                <span>{tour.code}</span>
              </div>

              {/* Tour Name with Destination Flag */}
              <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm text-on-surface tracking-tight px-1">
                <span className="text-base" role="img" aria-label="Japan">🇯🇵</span>
                <span className="text-on-surface hover:text-primary transition-colors">
                  {tour.name}
                </span>
              </div>

              {/* Date & Duration Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-m3-full bg-secondary-container text-on-secondary-container text-xs font-bold font-roboto">
                <M3Icon name="calendar_month" size={14} className="text-secondary" />
                <span>{tour.dates}</span>
              </div>

              {/* Live Flight & Ground Radar Badge */}
              <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-m3-full bg-[#D4F7DC] text-[#0A6324] text-[11px] font-extrabold font-roboto border border-[#A1E8B2]">
                <M3Icon name="flight_land" size={14} />
                <span>JL720 • Landed at NRT T1</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Role Selection Cards — Each with its Own Interactive In-Card Language Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-2">
          {rolesMeta.map((cfg) => {
            const isSelected = selectedRole === cfg.id;
            const currentLang = cardLanguages[cfg.id];
            const dict = translations[currentLang] || translations.en;

            const title = dict.roles[cfg.id];
            const badge =
              cfg.id === 'agent'
                ? dict.roleSelection.agentBadge
                : cfg.id === 'operator'
                ? dict.roleSelection.operatorBadge
                : dict.roleSelection.travellerBadge;
            const summary =
              cfg.id === 'agent'
                ? dict.roleSelection.agentSummary
                : cfg.id === 'operator'
                ? dict.roleSelection.operatorSummary
                : dict.roleSelection.travellerSummary;

            const features = roleFeaturesByLang[cfg.id]?.[currentLang] || roleFeaturesByLang[cfg.id].en;

            return (
              <div
                key={cfg.id}
                onClick={() => handleRoleSelect(cfg.id)}
                className={`group relative rounded-m3-xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border-2 ${
                  isSelected
                    ? `bg-surface-container-lowest ${cfg.borderActive} shadow-xl ring-4 scale-[1.02]`
                    : 'bg-surface-container-low border-outline-variant/50 hover:border-outline hover:bg-surface-container shadow-xs'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Row: Language Selector Dropdown directly in the card header */}
                  <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30 gap-2">
                    {/* In-Card Language Selector */}
                    <div
                      className="relative flex items-center bg-surface-container-highest/90 hover:bg-surface-container-highest rounded-m3-full border border-outline-variant/70 px-2.5 py-1 text-xs transition-colors shadow-2xs group-hover:border-primary/50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <M3Icon name="translate" size={15} className="text-primary mr-1.5 shrink-0" />
                      <select
                        value={currentLang}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleCardLangChange(cfg.id, e.target.value as SupportedLanguage);
                        }}
                        className="bg-transparent font-black text-xs text-on-surface focus:outline-none cursor-pointer pr-1"
                        title="Select language for this role"
                      >
                        {languageOptions.map((opt) => (
                          <option key={opt.code} value={opt.code} className="bg-surface text-on-surface">
                            {opt.flag} {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Radio Select Ring */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'bg-primary text-on-primary shadow-xs'
                          : 'border-2 border-outline-variant group-hover:border-primary'
                      }`}
                    >
                      {isSelected && <M3Icon name="check" size={16} />}
                    </div>
                  </div>

                  {/* Origin / Role Location Badge */}
                  <div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-m3-full uppercase tracking-wider inline-block ${cfg.bgAccent}`}
                    >
                      {badge}
                    </span>
                  </div>

                  {/* Icon & Title in Selected Language */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-m3-lg flex items-center justify-center ${cfg.bgAccent} shadow-xs shrink-0`}
                    >
                      <M3Icon name={cfg.icon} filled size={28} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg sm:text-xl font-roboto text-on-surface tracking-tight leading-tight">
                        {title}
                      </h3>
                    </div>
                  </div>

                  {/* Summary in Selected Language */}
                  <p className="text-xs text-on-surface-variant leading-relaxed min-h-[48px]">
                    {summary}
                  </p>

                  {/* Workflow Responsibilities */}
                  <div className="space-y-2 pt-3 border-t border-outline-variant/30">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/80 block">
                      {dict.roles[cfg.id]} Capabilities:
                    </span>
                    {features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-on-surface"
                      >
                        <span className={`shrink-0 mt-0.5 ${cfg.colorAccent}`}>
                          <M3Icon name="check_circle" filled size={14} />
                        </span>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Launch Button in Selected Language */}
                <div className="mt-6 pt-4 border-t border-outline-variant/40">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLaunch(cfg.id);
                    }}
                    className={`w-full py-3 px-4 rounded-m3-full text-xs font-bold font-roboto transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98 ${
                      isSelected
                        ? 'bg-primary text-on-primary hover:bg-[#004FAF] shadow-md'
                        : 'bg-surface-container-highest text-on-surface hover:bg-outline-variant/40'
                    }`}
                  >
                    <span>{dict.roleSelection.launchBtn} {title}</span>
                    <M3Icon name="arrow_forward" size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center pt-8 text-xs text-on-surface-variant">
        <span>Google Material Design 3 • Multi-Lingual Architecture (9 Languages Supported) • Travelflow OS</span>
      </footer>
    </div>
  );
};
