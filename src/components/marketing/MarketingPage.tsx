import React from 'react';
import { M3Icon } from '../m3/M3Icon';
import { M3Card } from '../m3/M3Card';

interface MarketingPageProps {
  onLaunchDemo: () => void;
}

export const MarketingPage: React.FC<MarketingPageProps> = ({ onLaunchDemo }) => {
  const demoUrl =
    typeof window !== 'undefined' && window.location.hostname.includes('travelflow.neralab.id')
      ? 'https://demo.travelflow.neralab.id'
      : '/demo';

  const handleDemoClick = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.location.hostname.startsWith('travelflow.')) {
      // Allow default navigation to demo.travelflow.neralab.id
      return;
    }
    e.preventDefault();
    onLaunchDemo();
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-roboto selection:bg-primary-container selection:text-on-primary-container">
      {/* Navigation Header - Clean 1-Pager */}
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-black text-2xl sm:text-3xl tracking-tighter text-on-surface select-none">
              Travelflow
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={demoUrl}
              onClick={handleDemoClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-m3-full bg-primary text-on-primary font-bold text-xs sm:text-sm shadow-md hover:bg-[#004FAF] active:scale-98 transition-all cursor-pointer"
            >
              <span>Demo</span>
              <M3Icon name="arrow_forward" size={16} />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-m3-full bg-primary-container text-on-primary-container text-xs font-bold tracking-wide uppercase shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>The Operating System for Outbound Tour Management</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-roboto tracking-tight text-on-surface max-w-4xl mx-auto leading-[1.1]">
            Stop Managing Outbound Tours in <span className="text-primary underline decoration-primary/30">Chaotic WhatsApp Groups.</span>
          </h1>

          <p className="text-base sm:text-xl text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
            TravelFlow unifies <strong>Origin Travel Agents</strong>, <strong>Destination Ground DMCs</strong>, and <strong>International Travelers</strong> into a single synchronized operating system.
            Zero immigration delays. Zero missing passport validity. Instant arrival handshakes.
          </p>

          <div className="flex items-center justify-center pt-4">
            <a
              href={demoUrl}
              onClick={handleDemoClick}
              className="w-full sm:w-auto px-8 py-4 rounded-m3-full bg-primary text-on-primary font-extrabold text-base shadow-lg hover:bg-[#004FAF] active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <M3Icon name="play_circle" filled size={22} />
              <span>Experience Live Interactive Demo</span>
            </a>
          </div>

          {/* Active Batch Showcase Card Preview */}
          <div className="pt-10 max-w-4xl mx-auto">
            <div className="p-6 rounded-m3-xl bg-surface-container-lowest m3-elevation-2 border border-outline-variant/60 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-outline-variant/40">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-m3-full bg-primary text-on-primary font-mono font-extrabold text-xs">
                    TK-OUT-889
                  </span>
                  <div className="text-left">
                    <h3 className="font-extrabold text-base text-on-surface">
                      Tokyo Autumn Discovery & Mt. Fuji 6D5N
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      Jakarta HQ ➔ Tokyo Narita • Oct 2 – Oct 7, 2026
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-m3-full bg-[#D4F7DC] text-[#0A6324] font-bold text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    JL720 • Landed at NRT T1
                  </span>
                </div>
              </div>

              {/* 3 Columns Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="p-4 rounded-m3-lg bg-primary-container/20 border border-primary/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary">
                    <M3Icon name="corporate_fare" size={18} />
                    <span>Agent (Jakarta HQ)</span>
                  </div>
                  <p className="text-xs text-on-surface font-semibold">
                    14 Travellers Manifest & Passport Compliance Guard
                  </p>
                  <p className="text-[11px] text-on-surface-variant">
                    2 Guests flagged for passport &lt; 6 months; 1-click WhatsApp alerts sent.
                  </p>
                </div>

                <div className="p-4 rounded-m3-lg bg-secondary-container/20 border border-secondary/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-secondary">
                    <M3Icon name="commute" size={18} />
                    <span>Ground DMC (Tokyo)</span>
                  </div>
                  <p className="text-xs text-on-surface font-semibold">
                    Chauffeur Kenji & Guide Yumi on Standby at Pillar #17
                  </p>
                  <p className="text-[11px] text-on-surface-variant">
                    Real-time flight arrival handshake & iPad welcome paging board ready.
                  </p>
                </div>

                <div className="p-4 rounded-m3-lg bg-tertiary-container/20 border border-tertiary/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-tertiary">
                    <M3Icon name="badge" size={18} />
                    <span>Traveler Pass (Mobile)</span>
                  </div>
                  <p className="text-xs text-on-surface font-semibold">
                    Offline Meeting Point Photo & 1-Tap Customs Signal
                  </p>
                  <p className="text-[11px] text-on-surface-variant">
                    Guest taps "Cleared Customs" ➔ Guide & Agent notified simultaneously.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section: Why Outbound Fails Today */}
      <section id="problem" className="py-20 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-wider text-error">
              The Reality of Outbound Travel Today
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-on-surface">
              Why 85% of Outbound Tour Friction Happens in the First 24 Hours
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant">
              When travel agencies send groups across international borders, existing tools collapse into chaotic phone calls and fragmented spreadsheets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <M3Card variant="elevated" className="p-6 space-y-3 border-t-4 border-t-error">
              <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
                <M3Icon name="chat_error" size={22} />
              </div>
              <h3 className="font-bold text-base text-on-surface">The WhatsApp Black Hole</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Critical meeting points, flight delay notices, and rooming allocations drown in 200+ unstructured chat messages.
              </p>
            </M3Card>

            <M3Card variant="elevated" className="p-6 space-y-3 border-t-4 border-t-error">
              <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
                <M3Icon name="travel_explore" size={22} />
              </div>
              <h3 className="font-bold text-base text-on-surface">Airport Meetup Chaos</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Foreign airports, multi-terminal confusion, and language barriers leave jet-lagged travelers wandering without finding the guide.
              </p>
            </M3Card>

            <M3Card variant="elevated" className="p-6 space-y-3 border-t-4 border-t-error">
              <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
                <M3Icon name="badge" size={22} />
              </div>
              <h3 className="font-bold text-base text-on-surface">Passport Expiry Shocks</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Travelers arriving at immigration with less than 6 months validity face deportation risk because agencies lacked automated compliance filters.
              </p>
            </M3Card>

            <M3Card variant="elevated" className="p-6 space-y-3 border-t-4 border-t-error">
              <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
                <M3Icon name="receipt_long" size={22} />
              </div>
              <h3 className="font-bold text-base text-on-surface">Post-Trip Invoice Wars</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Disputes over overtime driver hours, missed entries, and extra mileage take weeks of manual reconciliation between Agent and DMC.
              </p>
            </M3Card>
          </div>
        </div>
      </section>

      {/* Ecosystem Section: The Tri-Party Model */}
      <section id="ecosystem" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
              The Solution Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-on-surface">
              One Synchronized Hub for All Three Stakeholders
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant">
              Every action taken by one party propagates immediately to the other two.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Persona 1: Agent */}
            <div className="rounded-m3-xl p-6 bg-surface-container border-2 border-primary/30 flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-m3-full bg-primary text-on-primary font-bold text-xs uppercase">
                    1. The Seller
                  </span>
                  <span className="text-xs font-bold text-on-surface-variant">Origin HQ</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-m3-lg bg-primary-container text-on-primary-container flex items-center justify-center">
                    <M3Icon name="corporate_fare" filled size={28} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xl text-on-surface">Outbound Agent</h3>
                    <p className="text-xs text-on-surface-variant">Travel Agency HQ (e.g. Jakarta)</p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-on-surface pt-2">
                  <li className="flex items-start gap-2">
                    <M3Icon name="check_circle" filled size={16} className="text-primary shrink-0 mt-0.5" />
                    <span><strong>Passport Compliance Guard:</strong> Flags expiry &lt; 6 months with 1-click WhatsApp alerts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <M3Icon name="check_circle" filled size={16} className="text-primary shrink-0 mt-0.5" />
                    <span><strong>Digital Standard Manifest:</strong> Room allocations, emergency contacts, dietary rules (Halal/Veg).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <M3Icon name="check_circle" filled size={16} className="text-primary shrink-0 mt-0.5" />
                    <span><strong>Shared Cross-Border Incident Desk:</strong> Real-time ticketing with DMC to resolve issues instantly.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <M3Icon name="check_circle" filled size={16} className="text-primary shrink-0 mt-0.5" />
                    <span><strong>1-Click Settlement Ledger:</strong> Digital sign-off and fund release based on verified service proof.</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-m3-md bg-surface-container-high text-xs font-semibold text-primary">
                Operates natively in 🇮🇩 Bahasa Indonesia or 🇺🇸 English
              </div>
            </div>

            {/* Persona 2: Ground DMC Operator */}
            <div className="rounded-m3-xl p-6 bg-surface-container border-2 border-secondary/30 flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-m3-full bg-secondary text-on-secondary font-bold text-xs uppercase">
                    2. The Supplier
                  </span>
                  <span className="text-xs font-bold text-on-surface-variant">Destination Field Ops</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-m3-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                    <M3Icon name="commute" filled size={28} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xl text-on-surface">Ground DMC & Ops</h3>
                    <p className="text-xs text-on-surface-variant">Destination Handler (e.g. Tokyo)</p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-on-surface pt-2">
                  <li className="flex items-start gap-2">
                    <M3Icon name="check_circle" filled size={16} className="text-secondary shrink-0 mt-0.5" />
                    <span><strong>Dedicated Dispatch:</strong> Assigns vehicle plates, chauffeur contact, and lead tour guide.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <M3Icon name="check_circle" filled size={16} className="text-secondary shrink-0 mt-0.5" />
                    <span><strong>iPad Arrival Paging Board:</strong> High-contrast digital welcome sign for drivers at the gate.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <M3Icon name="check_circle" filled size={16} className="text-secondary shrink-0 mt-0.5" />
                    <span><strong>Dynamic Schedule Time-Shift:</strong> 1-Tap `+20m` delay adjustments when highway traffic hits.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <M3Icon name="check_circle" filled size={16} className="text-secondary shrink-0 mt-0.5" />
                    <span><strong>Free-Time Gathering Pin Radar:</strong> Drops gathering point with a live countdown timer.</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-m3-md bg-surface-container-high text-xs font-semibold text-secondary">
                Operates natively in 🇯🇵 日本語 (Japanese) or 🇺🇸 English
              </div>
            </div>

            {/* Persona 3: Traveller */}
            <div className="rounded-m3-xl p-6 bg-surface-container border-2 border-tertiary/30 flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-m3-full bg-tertiary text-on-tertiary font-bold text-xs uppercase">
                    3. The End User
                  </span>
                  <span className="text-xs font-bold text-on-surface-variant">Guest Mobile PWA</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-m3-lg bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
                    <M3Icon name="badge" filled size={28} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xl text-on-surface">Traveler Pass</h3>
                    <p className="text-xs text-on-surface-variant">Outbound Tourist Mobile Pass</p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-on-surface pt-2">
                  <li className="flex items-start gap-2">
                    <M3Icon name="check_circle" filled size={16} className="text-tertiary shrink-0 mt-0.5" />
                    <span><strong>Offline-First Vouchers:</strong> Hotel address, room number, and Wi-Fi cached without roaming.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <M3Icon name="check_circle" filled size={16} className="text-tertiary shrink-0 mt-0.5" />
                    <span><strong>Visual Airport Meet Photo:</strong> Shows Pillar #17 with directions and driver's plate number.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <M3Icon name="check_circle" filled size={16} className="text-tertiary shrink-0 mt-0.5" />
                    <span><strong>1-Tap "Cleared Customs":</strong> Alerts the guide and driver instantly that guest is heading to exit.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <M3Icon name="check_circle" filled size={16} className="text-tertiary shrink-0 mt-0.5" />
                    <span><strong>Japanese Taxi Card & SOS:</strong> Large Kanji address for local cabbies + 1-tap emergency beacon.</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-m3-md bg-surface-container-high text-xs font-semibold text-tertiary">
                Operates natively in 🇺🇸 English or 🇮🇩 Bahasa Indonesia
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Lingual Section */}
      <section id="multilingual" className="py-20 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-secondary">
              Cross-Border Communication
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-on-surface">
              Built Multi-Lingual from Day One
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              In international outbound travel, the Jakarta agency speaks Indonesian, the Tokyo DMC operates in Japanese, and the traveler uses English or Indonesian. TravelFlow translates every milestone, status, and alert dynamically so no party is left in the dark.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold max-w-4xl mx-auto">
            <div className="px-4 py-2 rounded-m3-full bg-surface-container-lowest border border-outline-variant/60 shadow-xs flex items-center gap-2">
              <span className="text-base">🇺🇸</span>
              <span>English (Universal)</span>
            </div>
            <div className="px-4 py-2 rounded-m3-full bg-surface-container-lowest border border-outline-variant/60 shadow-xs flex items-center gap-2">
              <span className="text-base">🇮🇩</span>
              <span>Bahasa Indonesia (HQ Agent)</span>
            </div>
            <div className="px-4 py-2 rounded-m3-full bg-surface-container-lowest border border-outline-variant/60 shadow-xs flex items-center gap-2">
              <span className="text-base">🇯🇵</span>
              <span>日本語 (Japan DMC)</span>
            </div>
            <div className="px-4 py-2 rounded-m3-full bg-surface-container-lowest border border-outline-variant/60 shadow-xs flex items-center gap-2">
              <span className="text-base">🇹🇭</span>
              <span>ภาษาไทย (Thai)</span>
            </div>
            <div className="px-4 py-2 rounded-m3-full bg-surface-container-lowest border border-outline-variant/60 shadow-xs flex items-center gap-2">
              <span className="text-base">🇨🇳</span>
              <span>简体中文 (Chinese)</span>
            </div>
            <div className="px-4 py-2 rounded-m3-full bg-surface-container-lowest border border-outline-variant/60 shadow-xs flex items-center gap-2">
              <span className="text-base">🇰🇷</span>
              <span>한국어 (Korean)</span>
            </div>
            <div className="px-4 py-2 rounded-m3-full bg-surface-container-lowest border border-outline-variant/60 shadow-xs flex items-center gap-2">
              <span className="text-base">🇪🇸</span>
              <span>Español (Spanish)</span>
            </div>
            <div className="px-4 py-2 rounded-m3-full bg-surface-container-lowest border border-outline-variant/60 shadow-xs flex items-center gap-2">
              <span className="text-base">🇮🇳</span>
              <span>हिन्दी (Indian / Hindi)</span>
            </div>
            <div className="px-4 py-2 rounded-m3-full bg-surface-container-lowest border border-outline-variant/60 shadow-xs flex items-center gap-2">
              <span className="text-base">🇸🇦</span>
              <span>العربية (Arabic)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary via-[#004FAF] to-[#00367A] text-on-primary text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black font-roboto tracking-tight text-white">
            Experience the Complete Outbound Workflow Now.
          </h2>

          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Test the live interactive simulation. Walk in the shoes of an Outbound Travel Agent, a Tokyo Ground DMC Chauffeur, or an International Traveler.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={demoUrl}
              onClick={handleDemoClick}
              className="w-full sm:w-auto px-10 py-4 rounded-m3-full bg-white text-primary font-black text-base shadow-xl hover:bg-white/95 active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>Launch Live Interactive Demo</span>
              <M3Icon name="arrow_forward" size={20} />
            </a>
          </div>

          <p className="text-xs text-white/70 pt-2">
            No signup required • Live demo deployed on Vercel at demo.travelflow.neralab.id
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-surface-container border-t border-outline-variant/30 text-xs text-on-surface-variant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-base text-on-surface">Travelflow</span>
            <span>•</span>
            <span>Tri-Party Outbound Tour Workflow</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://travelflow.neralab.id" className="hover:text-primary transition-colors">
              travelflow.neralab.id
            </a>
            <a href="https://demo.travelflow.neralab.id" className="hover:text-primary transition-colors">
              demo.travelflow.neralab.id
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
