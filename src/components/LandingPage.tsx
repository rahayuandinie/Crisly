import { motion } from 'motion/react';
import {
  ArrowRight,
  BellRing,
  CheckCircle2,
  Heart,
  LineChart,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { CrislyLogo } from './CrislyLogo';
import { SparkleButton } from './CutePrimitives';

interface LandingPageProps {
  onExploreDashboard: () => void;
}

export function LandingPage({ onExploreDashboard }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#FFFCFA] text-[#353044] overflow-x-hidden">
      {/* Top Bar (3-zone contract) */}
      <header className="sticky top-0 z-40 bg-[#FFFCFA]/90 backdrop-blur-md border-b border-[#EFE8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] rounded-xl"
          >
            <CrislyLogo />
          </a>

          <nav
            aria-label="Landing navigation"
            className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#5C5470]"
          >
            <a
              href="#what-is-crisisly"
              className="hover:text-[#6D28D9] transition-colors whitespace-nowrap shrink-0"
            >
              What is Crisly
            </a>
            <a
              href="#why-it-matters"
              className="hover:text-[#6D28D9] transition-colors whitespace-nowrap shrink-0"
            >
              Why It Matters
            </a>
            <a
              href="#key-features"
              className="hover:text-[#6D28D9] transition-colors whitespace-nowrap shrink-0"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-[#6D28D9] transition-colors whitespace-nowrap shrink-0"
            >
              How It Works
            </a>
          </nav>

          <div className="shrink-0">
            <button
              type="button"
              onClick={onExploreDashboard}
              className="inline-flex items-center gap-2 min-h-[42px] px-4 sm:px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:opacity-95 active:scale-[0.98] rounded-2xl shadow-sm shadow-[#A78BFA]/30 transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="top"
        className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden"
      >
        {/* Soft pastel ambient washes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#FFD6E7]/55 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-12 right-0 w-[28rem] h-[28rem] rounded-full bg-[#E8DFFF]/65 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-[#D9EEFF]/60 blur-3xl"
        />
        {/* Tiny decorative floating shapes */}
        <span
          aria-hidden="true"
          className="pointer-events-none hidden md:block absolute top-14 left-[44%] w-3.5 h-3.5 rounded-full bg-[#FFF1C7] border border-[#FDE68A] animate-float-slow"
        />
        <Heart
          aria-hidden="true"
          className="pointer-events-none hidden md:block absolute bottom-16 left-[46%] w-4 h-4 text-[#F472B6]/60 animate-float-gentle"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Copy */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#6D28D9]">
              <Sparkles className="w-4 h-4 text-[#EC4899] animate-sparkle" aria-hidden="true" />
              <span>Social Media Crisis Manager for Modern Brands</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-[#353044] tracking-tight leading-[1.1] text-balance">
              Social Media Drama? We&apos;ve Got Your Brand!
            </h1>

            <p className="text-base sm:text-lg text-[#5C5470] leading-relaxed max-w-xl">
              Your all-in-one companion to monitor, detect, and manage social media crises before they become bigger problems.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <SparkleButton
                type="button"
                onClick={onExploreDashboard}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:shadow-lg hover:shadow-[#A78BFA]/35 rounded-full whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2"
              >
                <span>Explore Dashboard</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </SparkleButton>

              <a
                href="#what-is-crisisly"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 text-sm sm:text-base font-bold text-[#353044] bg-white border border-[#E8DFFF] hover:border-[#A78BFA] hover:bg-[#FAF7FF] hover:scale-[1.02] rounded-full transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
              >
                <span>Learn More</span>
              </a>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-[#6E6584]">
              <span>Instagram · TikTok · X · Facebook</span>
              <span aria-hidden="true">·</span>
              <span>Real-Time Sentiment Pulse</span>
              <span aria-hidden="true">·</span>
              <span>14 min Avg. Response</span>
            </div>
          </motion.div>

          {/* Right Illustration: Cute Dashboard & Social Notification Bubbles */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Floating Notification Bubble 1 (Top Left) */}
              <div className="hidden sm:flex animate-float-slow absolute -top-5 -left-4 z-20 bg-white/95 backdrop-blur-md border border-[#FFD6E7] rounded-2xl px-3.5 py-2.5 shadow-lg shadow-[#FFD6E7]/40 items-center gap-2.5 max-w-[240px]">
                <div className="w-8 h-8 rounded-xl bg-[#FFD6E7] text-[#9D174D] flex items-center justify-center shrink-0">
                  <BellRing className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-[#353044] truncate">
                    Spike on TikTok ✨
                  </p>
                  <p className="text-[11px] text-[#6E6584] truncate">
                    @nadiaptr · Packaging check
                  </p>
                </div>
              </div>

              {/* Floating Notification Bubble 2 (Bottom Right) */}
              <div className="hidden sm:flex animate-float-gentle absolute -bottom-5 -right-3 z-20 bg-white/95 backdrop-blur-md border border-[#D9EEFF] rounded-2xl px-3.5 py-2.5 shadow-lg shadow-[#D9EEFF]/50 items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#353044]">
                    CR-201 Resolved! 💖
                  </p>
                  <p className="text-[11px] text-emerald-700 font-semibold">
                    Sentiment +18% in 1 hr
                  </p>
                </div>
              </div>

              {/* Main SaaS Dashboard Illustration Frame */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-[#EFE8F6] shadow-xl shadow-[#A78BFA]/15 p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F3EEF9]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FFD6E7]" />
                    <span className="w-3 h-3 rounded-full bg-[#FFF1C7]" />
                    <span className="w-3 h-3 rounded-full bg-[#D9EEFF]" />
                    <span className="ml-2 text-xs font-bold text-[#6E6584]">
                      Crisly Live Pulse
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-[#6D28D9]">
                    Glowie &amp; Co.
                  </span>
                </div>

                {/* Mini stat row */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="rounded-2xl bg-[#E8DFFF]/55 p-3">
                    <p className="text-[11px] font-semibold text-[#5C5470]">
                      Mentions
                    </p>
                    <p className="mt-1 font-display text-xl font-extrabold text-[#353044] tabular-nums">
                      1,248
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#D9EEFF]/65 p-3">
                    <p className="text-[11px] font-semibold text-[#5C5470]">
                      Positive
                    </p>
                    <p className="mt-1 font-display text-xl font-extrabold text-emerald-700 tabular-nums">
                      67%
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#FFD6E7]/65 p-3">
                    <p className="text-[11px] font-semibold text-[#5C5470]">
                      Active Alerts
                    </p>
                    <p className="mt-1 font-display text-xl font-extrabold text-[#9D174D] tabular-nums">
                      3
                    </p>
                  </div>
                </div>

                {/* Cute SVG Mini Sentiment Wave */}
                <div className="rounded-2xl bg-[#FFFCFA] border border-[#F3EEF9] p-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#353044]">
                      Sentiment Recovery Curve
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 inline-flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                      +14% today
                    </span>
                  </div>
                  <svg
                    viewBox="0 0 360 90"
                    className="w-full h-20 overflow-visible"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="crislyHeroGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#FFD6E7" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 65 C 45 55, 75 72, 120 48 C 165 24, 200 58, 245 32 C 285 10, 325 22, 360 12 L 360 90 L 0 90 Z"
                      fill="url(#crislyHeroGrad)"
                    />
                    <path
                      d="M 0 65 C 45 55, 75 72, 120 48 C 165 24, 200 58, 245 32 C 285 10, 325 22, 360 12"
                      fill="none"
                      stroke="#7C3AED"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="120" cy="48" r="4.5" fill="#FFFCFA" stroke="#EC4899" strokeWidth="2.5" />
                    <circle cx="245" cy="32" r="4.5" fill="#FFFCFA" stroke="#7C3AED" strokeWidth="2.5" />
                    <circle cx="360" cy="12" r="5" fill="#7C3AED" />
                  </svg>
                </div>

                {/* Live Comment Cards */}
                <div className="space-y-2">
                  <div className="rounded-2xl bg-[#FFF1C7]/55 px-3.5 py-2.5 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#FFE0D1] text-[#9A3412] flex items-center justify-center text-xs font-bold shrink-0">
                      C
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 text-[11px]">
                        <span className="font-bold text-[#353044]">@clarawjy · Instagram</span>
                        <span className="font-bold text-emerald-700">Positive</span>
                      </div>
                      <p className="text-xs text-[#5C5470] truncate mt-0.5">
                        Obsessed with the Lavender Cloud Moisturizer!! ✨💜
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#FFD6E7]/45 px-3.5 py-2.5 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#E8DFFF] text-[#5B21B6] flex items-center justify-center text-xs font-bold shrink-0">
                      R
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 text-[11px]">
                        <span className="font-bold text-[#353044]">@rizky_pr · X</span>
                        <span className="font-bold text-[#9D174D]">Needs Reply</span>
                      </div>
                      <p className="text-xs text-[#5C5470] truncate mt-0.5">
                        Promo code GLOW25 threw a checkout error at 10 AM!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Crisisly? */}
      <section id="what-is-crisisly" className="py-16 sm:py-20 bg-white border-y border-[#F3EEF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-bold tracking-wide text-[#7C3AED]">
              What is Crisisly?
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#353044] tracking-tight text-balance">
              Calm, cheerful command for every brand moment
            </h2>
            <p className="text-sm sm:text-base text-[#5C5470] leading-relaxed">
              CRISLY turns chaotic comment sections and viral threads into a clear, comforting workflow. Designed for social media teams, founders, and PR guardians who want clarity without cold corporate spreadsheets.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-3xl bg-[#FFD6E7]/40 border border-[#FFD6E7] p-6 space-y-2.5 hover:-translate-y-0.5 transition-transform">
              <div className="w-10 h-10 rounded-2xl bg-white text-[#9D174D] flex items-center justify-center shadow-xs">
                <BellRing className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-base font-bold text-[#353044]">
                Early Drama Radar
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5470] leading-relaxed">
                Catch sudden comment spikes across Instagram, TikTok, X, and Facebook before hashtags trend for the wrong reason.
              </p>
            </div>

            <div className="rounded-3xl bg-[#E8DFFF]/45 border border-[#E8DFFF] p-6 space-y-2.5 hover:-translate-y-0.5 transition-transform">
              <div className="w-10 h-10 rounded-2xl bg-white text-[#6D28D9] flex items-center justify-center shadow-xs">
                <MessageCircleHeart className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-base font-bold text-[#353044]">
                Empathetic Response Studio
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5470] leading-relaxed">
                Craft warm, consistent replies using curated crisis templates—copy, customize, and track every customer ticket cleanly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Crisis Management Matters */}
      <section id="why-it-matters" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-bold text-[#EC4899]">
              Why Crisis Management Matters
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#353044] tracking-tight text-balance">
              Minutes matter when trust is in the comments
            </h2>
            <p className="text-sm sm:text-base text-[#5C5470] leading-relaxed">
              A single unanswered shipping delay or checkout bug can snowball overnight. Responding quickly with warmth turns frustrated buyers into lifelong brand advocates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-3xl bg-[#D9EEFF]/55 border border-[#D9EEFF] p-6 space-y-2">
              <p className="font-display text-3xl sm:text-4xl font-extrabold text-[#353044] tabular-nums">
                14 min
              </p>
              <p className="text-sm font-bold text-[#353044]">
                Average first-reply speed
              </p>
              <p className="text-xs sm:text-sm text-[#5C5470] leading-relaxed">
                Faster triage with severity labels stops viral misinformation early.
              </p>
            </div>

            <div className="rounded-3xl bg-[#FFF1C7]/65 border border-[#FFF1C7] p-6 space-y-2">
              <p className="font-display text-3xl sm:text-4xl font-extrabold text-[#353044] tabular-nums">
                +28%
              </p>
              <p className="text-sm font-bold text-[#353044]">
                Sentiment recovery rate
              </p>
              <p className="text-xs sm:text-sm text-[#5C5470] leading-relaxed">
                Clear chronology tracking and caring replies win back community goodwill.
              </p>
            </div>

            <div className="rounded-3xl bg-[#FFE0D1]/65 border border-[#FFE0D1] p-6 space-y-2">
              <p className="font-display text-3xl sm:text-4xl font-extrabold text-[#353044] tabular-nums">
                4 Channels
              </p>
              <p className="text-sm font-bold text-[#353044]">
                Unified brand protection
              </p>
              <p className="text-xs sm:text-sm text-[#5C5470] leading-relaxed">
                Instagram, TikTok, X, and Facebook organized inside one joyful workspace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features (Asymmetric Bento Grid) */}
      <section id="key-features" className="py-16 sm:py-20 bg-white border-y border-[#F3EEF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-xl space-y-2">
              <p className="text-xs font-bold text-[#7C3AED]">Key Features</p>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#353044] tracking-tight text-balance">
                Everything your brand guardian toolkit needs
              </h2>
            </div>
            <button
              type="button"
              onClick={onExploreDashboard}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#6D28D9] hover:text-[#EC4899] transition-colors self-start sm:self-auto"
            >
              <span>Try the live workspace</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-7 rounded-3xl bg-gradient-to-br from-[#E8DFFF]/70 via-[#FFFCFA] to-[#FFD6E7]/50 border border-[#E8DFFF] p-6 sm:p-7 flex flex-col justify-between gap-4">
              <div className="w-11 h-11 rounded-2xl bg-white text-[#6D28D9] flex items-center justify-center shadow-xs">
                <LineChart className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#353044]">
                  Live Sentiment &amp; Crisis Monitoring
                </h3>
                <p className="mt-1.5 text-sm text-[#5C5470] leading-relaxed">
                  Filter mentions by platform, sentiment (Positive, Neutral, Negative), keyword, or trending hashtag—and spot high-severity comments immediately.
                </p>
              </div>
            </div>

            <div className="md:col-span-5 rounded-3xl bg-[#D9EEFF]/55 border border-[#D9EEFF] p-6 sm:p-7 flex flex-col justify-between gap-4">
              <div className="w-11 h-11 rounded-2xl bg-white text-[#1E40AF] flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#353044]">
                  Structured Crisis Timeline
                </h3>
                <p className="mt-1.5 text-sm text-[#5C5470] leading-relaxed">
                  Track Low, Medium, High, and Critical crises from Monitoring to Resolved with clear chronologies and action logs.
                </p>
              </div>
            </div>

            <div className="md:col-span-5 rounded-3xl bg-[#FFF1C7]/60 border border-[#FFF1C7] p-6 sm:p-7 flex flex-col justify-between gap-4">
              <div className="w-11 h-11 rounded-2xl bg-white text-[#9A3412] flex items-center justify-center shadow-xs">
                <Heart className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#353044]">
                  Response Center &amp; Templates
                </h3>
                <p className="mt-1.5 text-sm text-[#5C5470] leading-relaxed">
                  Edit compassionate templates, copy responses in one click, and keep Pending, Replied, and Reviewed queues tidy.
                </p>
              </div>
            </div>

            <div className="md:col-span-7 rounded-3xl bg-[#FFE0D1]/55 border border-[#FFE0D1] p-6 sm:p-7 flex flex-col justify-between gap-4">
              <div className="w-11 h-11 rounded-2xl bg-white text-[#9D174D] flex items-center justify-center shadow-xs">
                <Sparkles className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#353044]">
                  Visual Analytics &amp; CSV Reports
                </h3>
                <p className="mt-1.5 text-sm text-[#5C5470] leading-relaxed">
                  Review crisis frequency, average resolution time, platform comparisons, and export clean CSV reports anytime for team syncs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <p className="text-xs font-bold text-[#7C3AED]">How It Works</p>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#353044] tracking-tight text-balance">
              Four sweet steps from drama to calm
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                num: '01.',
                title: 'Spot Mentions',
                desc: 'Monitor incoming buzz across Instagram, TikTok, X, and Facebook in real time.',
                tint: 'bg-[#FFD6E7]/50 border-[#FFD6E7]',
              },
              {
                num: '02.',
                title: 'Assess Sentiment',
                desc: 'Group conversations into Positive, Neutral, or Negative and flag severity levels.',
                tint: 'bg-[#E8DFFF]/55 border-[#E8DFFF]',
              },
              {
                num: '03.',
                title: 'Respond with Care',
                desc: 'Pick an empathetic response template, personalize it, and mark tickets replied.',
                tint: 'bg-[#D9EEFF]/60 border-[#D9EEFF]',
              },
              {
                num: '04.',
                title: 'Resolve & Learn',
                desc: 'Update crisis status to Resolved and export CSV reports to strengthen future launches.',
                tint: 'bg-[#FFF1C7]/65 border-[#FFF1C7]',
              },
            ].map((step) => (
              <div
                key={step.num}
                className={`rounded-3xl border p-6 space-y-3 ${step.tint}`}
              >
                <span className="font-display text-xl font-extrabold text-[#6D28D9]">
                  {step.num}
                </span>
                <h3 className="font-display text-base font-bold text-[#353044]">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C5470] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Final CTA Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-[#FFD6E7]/75 via-[#E8DFFF]/80 to-[#D9EEFF]/80 border border-white p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 max-w-xl">
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#353044]">
                Ready to protect your brand with good vibes? ✨
              </h3>
              <p className="text-sm text-[#5C5470]">
                Jump straight into the interactive CRISLY dashboard—explore live mentions, update crisis timelines, and customize response templates.
              </p>
            </div>
            <button
              type="button"
              onClick={onExploreDashboard}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:opacity-95 active:scale-[0.98] rounded-2xl shadow-md shadow-[#A78BFA]/30 transition-all whitespace-nowrap shrink-0"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#EFE8F6] bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <CrislyLogo size="sm" />
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-[#6E6584]">
            <a href="#what-is-crisisly" className="hover:text-[#6D28D9]">
              What is Crisly
            </a>
            <a href="#why-it-matters" className="hover:text-[#6D28D9]">
              Why It Matters
            </a>
            <a href="#key-features" className="hover:text-[#6D28D9]">
              Features
            </a>
            <button
              type="button"
              onClick={onExploreDashboard}
              className="hover:text-[#6D28D9]"
            >
              Dashboard
            </button>
          </div>
          <p className="text-xs text-[#6E6584]">
            © 2026 CRISLY · Social Media Crisis Manager
          </p>
        </div>
      </footer>
    </div>
  );
}
