import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertCircle,
  Hash,
  Heart,
  MessageSquare,
  Repeat2,
  Search,
  ShieldAlert,
  X,
} from 'lucide-react';
import { Platform, SentimentType, SocialMention } from '../types/crisly';
import {
  getPlatformTint,
  getSentimentStyle,
  getSeverityStyle,
} from '../utils/crislyHelpers';
import { CuteEmptyState } from './CutePrimitives';

interface CrisisMonitoringProps {
  mentions: SocialMention[];
  brandName: string;
  sentimentPreset?: SentimentType | 'All';
  onEscalateMention: (mention: SocialMention) => void;
  onOpenResponseCenter: () => void;
}

const PLATFORMS: (Platform | 'All')[] = [
  'All',
  'Instagram',
  'TikTok',
  'X',
  'Facebook',
];
const SENTIMENTS: (SentimentType | 'All')[] = [
  'All',
  'Positive',
  'Neutral',
  'Negative',
];

export function CrisisMonitoring({
  mentions,
  brandName,
  sentimentPreset,
  onEscalateMention,
  onOpenResponseCenter,
}: CrisisMonitoringProps) {
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState<Platform | 'All'>('All');
  const [sentimentFilter, setSentimentFilter] = useState<SentimentType | 'All'>(
    sentimentPreset ?? 'All'
  );
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);

  useEffect(() => {
    if (sentimentPreset) {
      setSentimentFilter(sentimentPreset);
    }
  }, [sentimentPreset]);

  const trendingHashtags = useMemo(() => {
    const map = new Map<string, number>();
    mentions.forEach((m) => {
      m.hashtags.forEach((tag) => {
        map.set(tag, (map.get(tag) ?? 0) + 1);
      });
    });
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7);
  }, [mentions]);

  const filteredMentions = useMemo(() => {
    return mentions.filter((m) => {
      if (platformFilter !== 'All' && m.platform !== platformFilter) return false;
      if (sentimentFilter !== 'All' && m.sentiment !== sentimentFilter)
        return false;
      if (selectedHashtag && !m.hashtags.includes(selectedHashtag)) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const hit =
          m.content.toLowerCase().includes(q) ||
          m.author.toLowerCase().includes(q) ||
          m.handle.toLowerCase().includes(q) ||
          m.hashtags.some((h) => h.toLowerCase().includes(q));
        if (!hit) return false;
      }
      return true;
    });
  }, [mentions, platformFilter, sentimentFilter, selectedHashtag, search]);

  const recentNegativeComments = useMemo(
    () => mentions.filter((m) => m.sentiment === 'Negative'),
    [mentions]
  );

  const hasCriticalOrHigh = recentNegativeComments.some(
    (m) => m.severity === 'Critical' || m.severity === 'High'
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Top Indicator & Filters */}
      <section className="rounded-3xl bg-white border border-[#EFE8F6] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-xl font-extrabold text-[#353044]">
              Live Social Media Monitoring · {brandName}
            </h1>
            <p className="text-xs sm:text-sm text-[#6E6584] mt-0.5">
              Track brand conversations, filter sentiment, and catch early drama spikes.
            </p>
          </div>

          {/* Crisis Severity Indicator */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-bold self-start md:self-auto ${
              hasCriticalOrHigh
                ? 'bg-[#FFD6E7]/75 border-pink-300 text-[#9D174D]'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}
          >
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>
              Crisis Severity Indicator:{' '}
              {hasCriticalOrHigh ? 'Elevated (High/Critical)' : 'Calm & Normal'}
            </span>
          </div>
        </div>

        {/* Search + Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              className="w-4 h-4 text-[#7A7094] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search keywords, @handles, or "${brandName}" mentions...`}
              aria-label="Search social media mentions"
              className="w-full min-h-[44px] pl-10 pr-4 py-2 text-sm bg-[#FFFCFA] border border-[#E8DFFF] rounded-2xl text-[#353044] placeholder:text-[#948CA8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Platform Filter */}
            <div className="flex items-center gap-1 p-1 bg-[#F5F0FF] rounded-2xl overflow-x-auto max-w-full">
              {PLATFORMS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatformFilter(p)}
                  className={`px-3 py-1.5 min-h-[34px] text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                    platformFilter === p
                      ? 'bg-white text-[#6D28D9] shadow-xs'
                      : 'text-[#5C5470] hover:text-[#353044]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Sentiment Filter */}
            <div className="flex items-center gap-1 p-1 bg-[#FFF1C7]/50 rounded-2xl overflow-x-auto max-w-full">
              {SENTIMENTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSentimentFilter(s)}
                  className={`px-3 py-1.5 min-h-[34px] text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                    sentimentFilter === s
                      ? 'bg-white text-[#353044] shadow-xs'
                      : 'text-[#5C5470] hover:text-[#353044]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {(selectedHashtag || search || platformFilter !== 'All' || sentimentFilter !== 'All') && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#6E6584] font-semibold">
              Showing {filteredMentions.length} of {mentions.length} mentions
            </span>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setPlatformFilter('All');
                setSentimentFilter('All');
                setSelectedHashtag(null);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#F5F0FF] text-[#6D28D9] font-bold hover:bg-[#E8DFFF]"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Clear filters</span>
            </button>
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Mentions Feed */}
        <section className="lg:col-span-8 space-y-3.5">
          {filteredMentions.length === 0 ? (
            <CuteEmptyState
              title="No matching mentions found ✨"
              description="Try clearing your hashtag or sentiment filters to see all live brand chatter."
            />
          ) : (
            filteredMentions.map((m) => {
              const sent = getSentimentStyle(m.sentiment);
              return (
                <article
                  key={m.id}
                  className="rounded-3xl bg-white border border-[#EFE8F6] hover:border-[#A78BFA] p-5 shadow-xs transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-extrabold shrink-0 ${getPlatformTint(
                          m.platform
                        )}`}
                      >
                        {m.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#353044]">
                          {m.author}{' '}
                          <span className="font-normal text-xs text-[#6E6584]">
                            {m.handle}
                          </span>
                        </p>
                        <p className="text-[11px] font-semibold text-[#6E6584]">
                          {m.platform} · {m.timestamp}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-xl border text-xs font-bold ${sent.badge}`}
                      >
                        {sent.label}
                      </span>
                      {m.sentiment === 'Negative' && (
                        <span
                          className={`px-2.5 py-1 rounded-xl border text-xs font-bold ${getSeverityStyle(
                            m.severity
                          )}`}
                        >
                          {m.severity}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-[#353044] leading-relaxed">
                    {m.content}
                  </p>

                  <div className="pt-2 border-t border-[#F3EEF9] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4 text-xs font-bold text-[#6E6584] tabular-nums">
                      <span className="inline-flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-[#EC4899]" aria-hidden="true" />
                        {m.likes.toLocaleString()}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-[#7C3AED]" aria-hidden="true" />
                        {m.comments}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Repeat2 className="w-3.5 h-3.5 text-[#3B82F6]" aria-hidden="true" />
                        {m.shares}
                      </span>
                    </div>

                    {m.sentiment === 'Negative' && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={onOpenResponseCenter}
                          className="min-h-[34px] px-3 py-1 rounded-xl text-xs font-bold text-[#6D28D9] bg-[#E8DFFF]/70 hover:bg-[#E8DFFF] transition-colors"
                        >
                          Reply
                        </button>
                        {!m.escalatedToCrisisId ? (
                          <button
                            type="button"
                            onClick={() => onEscalateMention(m)}
                            className="min-h-[34px] px-3 py-1 rounded-xl text-xs font-bold text-[#9D174D] bg-[#FFD6E7] hover:bg-pink-200 transition-colors inline-flex items-center gap-1"
                          >
                            <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Escalate</span>
                          </button>
                        ) : (
                          <span className="text-[11px] font-bold text-[#6E6584]">
                            Tracked in Crisis Manager
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </section>

        {/* Right Column: Trending Hashtags & Recent Negative Comments */}
        <aside className="lg:col-span-4 space-y-5">
          {/* Trending Hashtags */}
          <section className="rounded-3xl bg-white border border-[#EFE8F6] p-5 shadow-xs space-y-3.5">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-[#7C3AED]" aria-hidden="true" />
              <h2 className="font-display text-base font-extrabold text-[#353044]">
                Trending Hashtags
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingHashtags.map(([tag, count]) => {
                const active = selectedHashtag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() =>
                      setSelectedHashtag(active ? null : tag)
                    }
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      active
                        ? 'bg-[#7C3AED] text-white border-[#7C3AED]'
                        : 'bg-[#F5F0FF] text-[#5B21B6] border-[#E8DFFF] hover:border-[#A78BFA]'
                    }`}
                  >
                    {tag}{' '}
                    <span className="opacity-75 tabular-nums">({count})</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Recent Negative Comments */}
          <section className="rounded-3xl bg-[#FFD6E7]/30 border border-[#FFD6E7] p-5 space-y-3.5">
            <h2 className="font-display text-base font-extrabold text-[#353044]">
              Recent Negative Comments
            </h2>
            <div className="space-y-2.5">
              {recentNegativeComments.map((neg) => (
                <div
                  key={neg.id}
                  className="rounded-2xl bg-white/95 border border-pink-100 p-3.5 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="font-bold text-[#353044]">
                      {neg.handle} · {neg.platform}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-lg border font-bold ${getSeverityStyle(
                        neg.severity
                      )}`}
                    >
                      {neg.severity}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C5470] line-clamp-2 leading-relaxed">
                    {neg.content}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </motion.div>
  );
}
