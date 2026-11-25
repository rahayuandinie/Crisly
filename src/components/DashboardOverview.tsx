import { useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  ArrowUpRight,
  BellRing,
  CheckCircle2,
  Heart,
  MessageCircle,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { SENTIMENT_TREND_DATA } from '../data/mockData';
import {
  ActivityItem,
  CrisisItem,
  DashboardTab,
  Platform,
  SocialMention,
} from '../types/crisly';
import {
  getCrisisStatusStyle,
  getPlatformTint,
  getSentimentStyle,
  getSeverityStyle,
} from '../utils/crislyHelpers';
import { AnimatedCounter } from './AnimatedCounter';
import { SparkleButton } from './CutePrimitives';

interface DashboardOverviewProps {
  mentions: SocialMention[];
  crises: CrisisItem[];
  activities: ActivityItem[];
  guardianName: string;
  onNavigateTab: (tab: DashboardTab) => void;
  onSelectCrisis: (crisis: CrisisItem) => void;
}

const PLATFORMS: Platform[] = ['Instagram', 'TikTok', 'X', 'Facebook'];

export function DashboardOverview({
  mentions,
  crises,
  activities,
  guardianName,
  onNavigateTab,
  onSelectCrisis,
}: DashboardOverviewProps) {
  const [hoveredDayIdx, setHoveredDayIdx] = useState<number | null>(
    SENTIMENT_TREND_DATA.length - 1
  );

  // Live computed totals (base historical volume + live interactive mentions)
  const totalMentions = 1236 + mentions.length;
  const posCount = mentions.filter((m) => m.sentiment === 'Positive').length;
  const neuCount = mentions.filter((m) => m.sentiment === 'Neutral').length;
  const negCount = mentions.filter((m) => m.sentiment === 'Negative').length;
  const totalSample = Math.max(mentions.length, 1);

  const positivePct = Math.round((posCount / totalSample) * 100);
  const neutralPct = Math.round((neuCount / totalSample) * 100);
  const negativePct = Math.max(0, 100 - positivePct - neutralPct);

  const activeCrises = crises.filter((c) => c.status !== 'Resolved');
  const resolvedCrises = crises.filter((c) => c.status === 'Resolved');

  const platformStats = PLATFORMS.map((p) => {
    const count = mentions.filter((m) => m.platform === p).length;
    const pct = Math.round((count / totalSample) * 100);
    return { platform: p, count, pct };
  });

  // SVG Chart geometry for SENTIMENT_TREND_DATA
  const chartW = 520;
  const chartH = 180;
  const padX = 24;
  const padY = 18;
  const usableW = chartW - padX * 2;
  const usableH = chartH - padY * 2;

  const toPoints = (key: 'positive' | 'neutral' | 'negative') =>
    SENTIMENT_TREND_DATA.map((pt, idx) => {
      const x =
        padX + (idx / Math.max(SENTIMENT_TREND_DATA.length - 1, 1)) * usableW;
      const y = padY + usableH - (pt[key] / 100) * usableH;
      return { x, y, val: pt[key], day: pt.day };
    });

  const posPts = toPoints('positive');
  const negPts = toPoints('negative');
  const posPath = posPts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');
  const negPath = negPts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const hoveredData =
    hoveredDayIdx !== null ? SENTIMENT_TREND_DATA[hoveredDayIdx] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Greeting Banner with cute floating pastel shapes */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFD6E7]/75 via-[#E8DFFF]/80 to-[#D9EEFF]/80 border border-white p-6 sm:p-7 shadow-sm">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/40 animate-float-slow"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-28 bottom-2 w-8 h-8 rounded-full bg-[#FFF1C7]/70 animate-float-gentle"
        />
        <Heart
          aria-hidden="true"
          className="pointer-events-none hidden sm:block absolute right-14 top-4 w-4 h-4 text-[#EC4899]/50 animate-sparkle"
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-[#6D28D9] inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-sparkle" aria-hidden="true" />
              <span>Daily Brand Pulse</span>
            </p>
            <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#353044] tracking-tight text-balance">
              Hey, {guardianName}! Ready to keep things under control? ✨
            </h1>
            <p className="text-xs sm:text-sm text-[#5C5470]">
              You have{' '}
              <span className="font-bold text-[#9D174D] tabular-nums">
                {activeCrises.length} active crises
              </span>{' '}
              being tracked and{' '}
              <span className="font-bold text-emerald-700 tabular-nums">
                {positivePct}% positive sentiment
              </span>{' '}
              across your channels today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigateTab('monitoring')}
              className="min-h-[42px] px-4.5 py-2 text-xs sm:text-sm font-bold text-[#353044] bg-white/90 hover:bg-white hover:scale-[1.03] rounded-full border border-white shadow-xs transition-all"
            >
              Open Monitoring
            </button>
            <SparkleButton
              type="button"
              onClick={() => onNavigateTab('responses')}
              className="min-h-[42px] px-4.5 py-2 text-xs sm:text-sm font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-full shadow-xs"
            >
              Reply Queue
            </SparkleButton>
          </div>
        </div>
      </section>

      {/* 5 Statistic Cards */}
      <section
        aria-label="Dashboard statistics"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        <div className="rounded-3xl bg-white border border-[#EFE8F6] p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-bold text-[#6E6584]">Total Social Mentions</p>
            <span className="w-8 h-8 rounded-xl bg-[#E8DFFF] text-[#6D28D9] flex items-center justify-center">
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
          <p className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-[#353044]">
            <AnimatedCounter value={totalMentions} />
          </p>
          <p className="mt-1 text-xs font-semibold text-emerald-700">
            +12% vs last week
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-[#EFE8F6] p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-bold text-[#6E6584]">Positive Sentiment</p>
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Heart className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
          <p className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-emerald-700">
            <AnimatedCounter value={positivePct} suffix="%" />
          </p>
          <p className="mt-1 text-xs font-semibold text-[#6E6584] tabular-nums">
            {posCount} recent happy mentions
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-[#EFE8F6] p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-bold text-[#6E6584]">Negative Sentiment</p>
            <span className="w-8 h-8 rounded-xl bg-[#FFD6E7] text-[#9D174D] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
          <p className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-[#9D174D]">
            <AnimatedCounter value={negativePct} suffix="%" />
          </p>
          <p className="mt-1 text-xs font-semibold text-[#6E6584] tabular-nums">
            {negCount} flagged comments
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('management')}
          className="text-left rounded-3xl bg-[#FFE0D1]/55 border border-[#FFE0D1] p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-bold text-[#7C2D12]">Active Crisis</p>
            <span className="w-8 h-8 rounded-xl bg-white text-[#9A3412] flex items-center justify-center">
              <BellRing className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
          <p className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-[#353044]">
            <AnimatedCounter value={activeCrises.length} />
          </p>
          <p className="mt-1 text-xs font-bold text-[#9A3412] inline-flex items-center gap-1">
            <span>Manage now</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </p>
        </button>

        <div className="rounded-3xl bg-[#D9EEFF]/55 border border-[#D9EEFF] p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-bold text-[#1E3A8A]">Resolved Crisis</p>
            <span className="w-8 h-8 rounded-xl bg-white text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
          <p className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-[#353044]">
            <AnimatedCounter value={resolvedCrises.length} />
          </p>
          <p className="mt-1 text-xs font-semibold text-[#1E40AF]">
            Avg. 80 min resolution
          </p>
        </div>
      </section>

      {/* Charts Row: Interactive Trend + Sentiment Overview & Platform Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Sentiment Chart */}
        <section className="lg:col-span-7 rounded-3xl bg-white border border-[#EFE8F6] p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-base sm:text-lg font-extrabold text-[#353044]">
                Social Media Sentiment Overview
              </h2>
              <p className="text-xs text-[#6E6584]">
                Hover points to inspect daily Positive vs. Negative shifts
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="inline-flex items-center gap-1.5 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Positive
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#9D174D]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EC4899]" />
                Negative
              </span>
            </div>
          </div>

          {/* Interactive Tooltip Strip */}
          {hoveredData && (
            <div className="rounded-2xl bg-[#FFFCFA] border border-[#F3EEF9] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-[#353044]">
                {hoveredData.day}
              </span>
              <div className="flex items-center gap-4 tabular-nums font-bold">
                <span className="text-emerald-700">
                  Positive: {hoveredData.positive}%
                </span>
                <span className="text-[#7A5608]">
                  Neutral: {hoveredData.neutral}%
                </span>
                <span className="text-[#9D174D]">
                  Negative: {hoveredData.negative}%
                </span>
              </div>
            </div>
          )}

          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${chartW} ${chartH + 24}`}
              className="w-full min-w-[380px] h-52"
              role="img"
              aria-label="7-day sentiment trend chart"
            >
              {/* Horizontal Gridlines */}
              {[25, 50, 75].map((tick) => {
                const y = padY + usableH - (tick / 100) * usableH;
                return (
                  <g key={tick}>
                    <line
                      x1={padX}
                      y1={y}
                      x2={chartW - padX}
                      y2={y}
                      stroke="#F1ECF8"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={4}
                      y={y + 3}
                      fontSize="10"
                      fill="#948CA8"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {tick}%
                    </text>
                  </g>
                );
              })}

              {/* Lines */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                d={posPath}
                fill="none"
                stroke="#10B981"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
                d={negPath}
                fill="none"
                stroke="#EC4899"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Hover columns & dots */}
              {SENTIMENT_TREND_DATA.map((pt, idx) => {
                const pDot = posPts[idx];
                const nDot = negPts[idx];
                const active = hoveredDayIdx === idx;
                return (
                  <g
                    key={pt.day}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredDayIdx(idx)}
                    onClick={() => setHoveredDayIdx(idx)}
                  >
                    {active && (
                      <line
                        x1={pDot.x}
                        y1={padY}
                        x2={pDot.x}
                        y2={padY + usableH}
                        stroke="#A78BFA"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />
                    )}
                    <rect
                      x={pDot.x - 24}
                      y={0}
                      width={48}
                      height={chartH + 20}
                      fill="transparent"
                    />
                    <circle
                      cx={pDot.x}
                      cy={pDot.y}
                      r={active ? 6 : 4}
                      fill="#FFFFFF"
                      stroke="#10B981"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx={nDot.x}
                      cy={nDot.y}
                      r={active ? 6 : 4}
                      fill="#FFFFFF"
                      stroke="#EC4899"
                      strokeWidth="2.5"
                    />
                    <text
                      x={pDot.x}
                      y={chartH + 14}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight={active ? '700' : '500'}
                      fill={active ? '#6D28D9' : '#6E6584'}
                    >
                      {pt.day}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </section>

        {/* Platform Distribution + Quick Sentiment Bar */}
        <section className="lg:col-span-5 rounded-3xl bg-white border border-[#EFE8F6] p-6 shadow-xs flex flex-col justify-between gap-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base sm:text-lg font-extrabold text-[#353044]">
                Platform Distribution
              </h2>
              <button
                type="button"
                onClick={() => onNavigateTab('sentiment')}
                className="text-xs font-bold text-[#6D28D9] hover:underline"
              >
                Full breakdown
              </button>
            </div>

            <div className="space-y-3 pt-1">
              {platformStats.map((item) => (
                <div key={item.platform} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="inline-flex items-center gap-2 text-[#353044]">
                      <span
                        className={`px-2 py-0.5 rounded-lg text-[11px] ${getPlatformTint(
                          item.platform
                        )}`}
                      >
                        {item.platform}
                      </span>
                    </span>
                    <span className="font-mono text-[#5C5470] tabular-nums">
                      {item.count} mentions ({item.pct}%)
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-[#F5F0FF] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(item.pct, 6)}%` }}
                      transition={{ duration: 0.65, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-[#A78BFA] to-[#F472B6]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stacked Sentiment Bar */}
          <div className="rounded-2xl bg-[#FFFCFA] border border-[#F3EEF9] p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-[#353044]">
              <span>Current Sentiment Split</span>
              <span className="inline-flex items-center gap-1 text-emerald-700">
                <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                Healthy
              </span>
            </div>
            <div className="h-3.5 rounded-full overflow-hidden flex gap-0.5 bg-[#F5F0FF]">
              <div
                style={{ width: `${positivePct}%` }}
                className="bg-emerald-400 transition-all duration-500"
                title={`Positive ${positivePct}%`}
              />
              <div
                style={{ width: `${neutralPct}%` }}
                className="bg-[#FDE047] transition-all duration-500"
                title={`Neutral ${neutralPct}%`}
              />
              <div
                style={{ width: `${negativePct}%` }}
                className="bg-[#FB7185] transition-all duration-500"
                title={`Negative ${negativePct}%`}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-bold text-[#6E6584] tabular-nums">
              <span>Positive {positivePct}%</span>
              <span>Neutral {neutralPct}%</span>
              <span>Negative {negativePct}%</span>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom 3-Column Feed: Crisis Alerts, Recent Mentions, Latest Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Crisis Alerts */}
        <section className="lg:col-span-4 rounded-3xl bg-white border border-[#EFE8F6] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-extrabold text-[#353044]">
              Crisis Alerts
            </h2>
            <button
              type="button"
              onClick={() => onNavigateTab('management')}
              className="text-xs font-bold text-[#6D28D9] hover:underline"
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            {activeCrises.slice(0, 3).map((cr) => (
              <button
                key={cr.id}
                type="button"
                onClick={() => onSelectCrisis(cr)}
                className="w-full text-left rounded-2xl bg-[#FFFCFA] hover:bg-[#FAF7FF] border border-[#EFE8F6] hover:border-[#A78BFA] p-3.5 transition-all space-y-2"
              >
                <div className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="font-mono font-bold text-[#6E6584]">
                    {cr.code} · {cr.platform}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-lg border font-bold ${getSeverityStyle(
                      cr.severity
                    )}`}
                  >
                    {cr.severity}
                  </span>
                </div>
                <p className="text-sm font-bold text-[#353044] leading-snug">
                  {cr.title}
                </p>
                <div className="flex items-center justify-between text-[11px]">
                  <span
                    className={`px-2 py-0.5 rounded-lg border font-bold ${getCrisisStatusStyle(
                      cr.status
                    )}`}
                  >
                    {cr.status}
                  </span>
                  <span className="text-[#6E6584] font-semibold">{cr.dateTime}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Recent Mentions */}
        <section className="lg:col-span-5 rounded-3xl bg-white border border-[#EFE8F6] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-extrabold text-[#353044]">
              Recent Mentions
            </h2>
            <button
              type="button"
              onClick={() => onNavigateTab('monitoring')}
              className="text-xs font-bold text-[#6D28D9] hover:underline"
            >
              Monitor feed
            </button>
          </div>

          <div className="divide-y divide-[#F3EEF9]">
            {mentions.slice(0, 4).map((m) => {
              const sent = getSentimentStyle(m.sentiment);
              return (
                <div key={m.id} className="py-3 first:pt-0 last:pb-0 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-[#353044]">
                      {m.author}{' '}
                      <span className="font-normal text-[#6E6584]">
                        {m.handle} · {m.platform}
                      </span>
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-lg border text-[11px] font-bold shrink-0 ${sent.badge}`}
                    >
                      {sent.label}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C5470] line-clamp-2 leading-relaxed">
                    {m.content}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Latest Activities */}
        <section className="lg:col-span-3 rounded-3xl bg-white border border-[#EFE8F6] p-5 shadow-xs space-y-4">
          <h2 className="font-display text-base font-extrabold text-[#353044]">
            Latest Activities
          </h2>
          <ol className="space-y-3">
            {activities.slice(0, 5).map((act) => (
              <li
                key={act.id}
                className="text-xs pb-3 border-b border-[#F3EEF9] last:border-b-0 last:pb-0 space-y-1"
              >
                <span className="font-mono text-[11px] font-semibold text-[#7C3AED]">
                  {act.time}
                </span>
                <p className="text-[#4A435E] leading-relaxed">{act.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </motion.div>
  );
}
