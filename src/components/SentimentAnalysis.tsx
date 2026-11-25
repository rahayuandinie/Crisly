import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Hash, Sparkles } from 'lucide-react';
import { SENTIMENT_TREND_DATA } from '../data/mockData';
import { Platform, SocialMention } from '../types/crisly';
import { getPlatformTint } from '../utils/crislyHelpers';

interface SentimentAnalysisProps {
  mentions: SocialMention[];
}

const PLATFORMS: Platform[] = ['Instagram', 'TikTok', 'X', 'Facebook'];

const KEYWORDS = [
  { word: 'Glowie Berry Serum', count: 312, sentiment: 'Positive' as const },
  { word: 'Checkout Promo', count: 248, sentiment: 'Negative' as const },
  { word: 'Pastel Box', count: 194, sentiment: 'Positive' as const },
  { word: 'Bandung Courier', count: 142, sentiment: 'Negative' as const },
  { word: 'SPF Texture', count: 118, sentiment: 'Neutral' as const },
  { word: 'Customer Care', count: 165, sentiment: 'Positive' as const },
];

export function SentimentAnalysis({ mentions }: SentimentAnalysisProps) {
  const [selectedDay, setSelectedDay] = useState(
    SENTIMENT_TREND_DATA[SENTIMENT_TREND_DATA.length - 1]
  );

  const total = Math.max(mentions.length, 1);
  const posCount = mentions.filter((m) => m.sentiment === 'Positive').length;
  const neuCount = mentions.filter((m) => m.sentiment === 'Neutral').length;
  const negCount = mentions.filter((m) => m.sentiment === 'Negative').length;

  const posPct = Math.round((posCount / total) * 100);
  const neuPct = Math.round((neuCount / total) * 100);
  const negPct = Math.max(0, 100 - posPct - neuPct);

  // SVG Donut Calculations
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const posLen = (posPct / 100) * circumference;
  const neuLen = (neuPct / 100) * circumference;
  const negLen = (negPct / 100) * circumference;

  const trendingHashtags = useMemo(() => {
    const counts = new Map<string, number>();
    mentions.forEach((m) => {
      m.hashtags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
    });
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [mentions]);

  const platformComparison = PLATFORMS.map((platform) => {
    const pMentions = mentions.filter((m) => m.platform === platform);
    const pTotal = Math.max(pMentions.length, 1);
    const pPos = Math.round(
      (pMentions.filter((m) => m.sentiment === 'Positive').length / pTotal) * 100
    );
    const pNeu = Math.round(
      (pMentions.filter((m) => m.sentiment === 'Neutral').length / pTotal) * 100
    );
    const pNeg = Math.max(0, 100 - pPos - pNeu);
    return {
      platform,
      total: pMentions.length,
      pos: pPos,
      neu: pNeu,
      neg: pNeg,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Top Grid: Donut Distribution + Sentiment Trend Over Time */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Donut Card */}
        <section className="lg:col-span-5 rounded-3xl bg-white border border-[#EFE8F6] p-6 shadow-xs flex flex-col justify-between gap-5">
          <div>
            <h1 className="font-display text-lg font-extrabold text-[#353044]">
              Sentiment Distribution
            </h1>
            <p className="text-xs text-[#6E6584] mt-0.5">
              Overall audience mood across {mentions.length} tracked mentions
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 148 148" className="w-full h-full -rotate-90">
                <circle
                  cx="74"
                  cy="74"
                  r={radius}
                  fill="none"
                  stroke="#F5F0FF"
                  strokeWidth="18"
                />
                <motion.circle
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{ strokeDasharray: `${posLen} ${circumference}` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  cx="74"
                  cy="74"
                  r={radius}
                  fill="none"
                  stroke="#34D399"
                  strokeWidth="18"
                  strokeDashoffset={0}
                />
                <motion.circle
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{ strokeDasharray: `${neuLen} ${circumference}` }}
                  transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                  cx="74"
                  cy="74"
                  r={radius}
                  fill="none"
                  stroke="#FACC15"
                  strokeWidth="18"
                  strokeDashoffset={-posLen}
                />
                <motion.circle
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{ strokeDasharray: `${negLen} ${circumference}` }}
                  transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                  cx="74"
                  cy="74"
                  r={radius}
                  fill="none"
                  stroke="#FB7185"
                  strokeWidth="18"
                  strokeDashoffset={-(posLen + neuLen)}
                />
              </svg>
              <div className="absolute text-center">
                <p className="font-display text-2xl font-extrabold text-[#353044] tabular-nums">
                  {posPct}%
                </p>
                <p className="text-[11px] font-bold text-emerald-700">Positive</p>
              </div>
            </div>

            <div className="flex-1 w-full space-y-2.5 text-xs font-bold">
              <div className="rounded-2xl bg-emerald-50 border border-emerald-100 px-3.5 py-2.5 flex items-center justify-between">
                <span className="text-emerald-800">Positive</span>
                <span className="font-mono text-emerald-900 tabular-nums">
                  {posPct}% ({posCount})
                </span>
              </div>
              <div className="rounded-2xl bg-[#FFF1C7]/70 border border-amber-100 px-3.5 py-2.5 flex items-center justify-between">
                <span className="text-[#7A5608]">Neutral</span>
                <span className="font-mono text-[#7A5608] tabular-nums">
                  {neuPct}% ({neuCount})
                </span>
              </div>
              <div className="rounded-2xl bg-[#FFD6E7]/75 border border-pink-200 px-3.5 py-2.5 flex items-center justify-between">
                <span className="text-[#9D174D]">Negative</span>
                <span className="font-mono text-[#9D174D] tabular-nums">
                  {negPct}% ({negCount})
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Sentiment Trend Over Time (Interactive Grouped Bars) */}
        <section className="lg:col-span-7 rounded-3xl bg-white border border-[#EFE8F6] p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-display text-lg font-extrabold text-[#353044]">
                Sentiment Trend Over Time
              </h2>
              <p className="text-xs text-[#6E6584]">
                Click or hover any day column to inspect percentages
              </p>
            </div>
            <span className="text-xs font-bold text-[#6D28D9] bg-[#F5F0FF] px-3 py-1.5 rounded-xl tabular-nums">
              {selectedDay.day}: +{selectedDay.positive}% / ~{selectedDay.neutral}% / -{selectedDay.negative}%
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 sm:gap-3 pt-2 items-end h-52">
            {SENTIMENT_TREND_DATA.map((d) => {
              const isSelected = selectedDay.day === d.day;
              return (
                <button
                  key={d.day}
                  type="button"
                  onClick={() => setSelectedDay(d)}
                  onMouseEnter={() => setSelectedDay(d)}
                  className={`h-full flex flex-col justify-end items-center gap-2 p-1.5 rounded-2xl transition-colors ${
                    isSelected ? 'bg-[#FAF7FF] ring-1 ring-[#A78BFA]' : 'hover:bg-[#FFFCFA]'
                  }`}
                >
                  <div className="w-full max-w-[36px] flex-1 flex flex-col justify-end gap-0.5 overflow-hidden rounded-xl">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${d.negative}%` }}
                      transition={{ duration: 0.5 }}
                      className="w-full bg-[#FB7185] rounded-t-md"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${d.neutral}%` }}
                      transition={{ duration: 0.5, delay: 0.05 }}
                      className="w-full bg-[#FDE047]"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${d.positive}%` }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="w-full bg-[#34D399] rounded-b-md"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-[#5C5470] whitespace-nowrap">
                    {d.day}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Bottom Grid: Platform Comparison + Most Discussed Keywords + Trending Hashtags */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Platform Comparison */}
        <section className="lg:col-span-6 rounded-3xl bg-white border border-[#EFE8F6] p-6 shadow-xs space-y-4">
          <h2 className="font-display text-base sm:text-lg font-extrabold text-[#353044]">
            Platform Comparison
          </h2>
          <div className="space-y-4">
            {platformComparison.map((row) => (
              <div key={row.platform} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span
                    className={`px-2.5 py-0.5 rounded-lg ${getPlatformTint(
                      row.platform
                    )}`}
                  >
                    {row.platform}
                  </span>
                  <span className="font-mono text-[#5C5470] tabular-nums">
                    +{row.pos}% · ~{row.neu}% · -{row.neg}%
                  </span>
                </div>
                <div className="h-3 rounded-full overflow-hidden flex bg-[#F5F0FF] gap-0.5">
                  <div
                    style={{ width: `${row.pos}%` }}
                    className="bg-emerald-400 transition-all duration-500"
                  />
                  <div
                    style={{ width: `${row.neu}%` }}
                    className="bg-[#FDE047] transition-all duration-500"
                  />
                  <div
                    style={{ width: `${row.neg}%` }}
                    className="bg-[#FB7185] transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Most Discussed Keywords */}
        <section className="lg:col-span-3 rounded-3xl bg-white border border-[#EFE8F6] p-6 shadow-xs space-y-3.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#EC4899]" aria-hidden="true" />
            <h2 className="font-display text-base font-extrabold text-[#353044]">
              Top Keywords
            </h2>
          </div>
          <ul className="space-y-2.5">
            {KEYWORDS.map((kw) => (
              <li
                key={kw.word}
                className="flex items-center justify-between gap-2 text-xs py-1.5 border-b border-[#F3EEF9] last:border-b-0"
              >
                <span className="font-bold text-[#353044]">{kw.word}</span>
                <span
                  className={`font-mono font-bold px-2 py-0.5 rounded-lg tabular-nums ${
                    kw.sentiment === 'Positive'
                      ? 'bg-emerald-100 text-emerald-800'
                      : kw.sentiment === 'Neutral'
                        ? 'bg-[#FFF1C7] text-[#7A5608]'
                        : 'bg-[#FFD6E7] text-[#9D174D]'
                  }`}
                >
                  {kw.count}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Trending Hashtags */}
        <section className="lg:col-span-3 rounded-3xl bg-gradient-to-br from-[#E8DFFF]/45 to-[#D9EEFF]/50 border border-[#E8DFFF] p-6 space-y-3.5">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" />
            <h2 className="font-display text-base font-extrabold text-[#353044]">
              Trending Hashtags
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingHashtags.map(([tag, count]) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-xl bg-white/90 border border-white text-xs font-bold text-[#353044] shadow-xs"
              >
                {tag}{' '}
                <span className="font-mono text-[#6D28D9] tabular-nums">
                  {count}
                </span>
              </span>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
