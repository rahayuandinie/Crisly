import { motion } from 'motion/react';
import {
  CheckCircle2,
  Clock,
  Download,
  MessageSquareHeart,
  TrendingUp,
} from 'lucide-react';
import {
  CrisisItem,
  ResponseTicket,
  SocialMention,
} from '../types/crisly';
import {
  getCrisisStatusStyle,
  getSeverityStyle,
} from '../utils/crislyHelpers';
import { CuteTooltip, SparkleButton } from './CutePrimitives';

interface AnalyticsReportsProps {
  crises: CrisisItem[];
  mentions: SocialMention[];
  tickets: ResponseTicket[];
}

const WEEKLY_FREQUENCY = [
  { label: 'Week 1', count: 3, resolved: 3 },
  { label: 'Week 2', count: 5, resolved: 5 },
  { label: 'Week 3', count: 2, resolved: 2 },
  { label: 'This Week', count: 5, resolved: 2 },
];

export function AnalyticsReports({
  crises,
  mentions,
  tickets,
}: AnalyticsReportsProps) {
  const resolvedWithTime = crises.filter((c) => c.resolutionMinutes);
  const avgResolutionMin = resolvedWithTime.length
    ? Math.round(
        resolvedWithTime.reduce(
          (sum, c) => sum + (c.resolutionMinutes ?? 0),
          0
        ) / resolvedWithTime.length
      )
    : 75;

  const repliedOrReviewed = tickets.filter(
    (t) => t.status === 'Replied' || t.status === 'Reviewed'
  ).length;
  const responseRate = tickets.length
    ? Math.round((repliedOrReviewed / tickets.length) * 100)
    : 100;

  const totalEngagement = mentions.reduce(
    (sum, m) => sum + m.likes + m.comments + m.shares,
    0
  );

  const posCount = mentions.filter((m) => m.sentiment === 'Positive').length;
  const neuCount = mentions.filter((m) => m.sentiment === 'Neutral').length;
  const negCount = mentions.filter((m) => m.sentiment === 'Negative').length;

  const handleExportCsv = () => {
    const header = [
      'Code',
      'Title',
      'Platform',
      'Date Time',
      'Severity',
      'Status',
      'Resolution Minutes',
      'Actions Count',
    ];
    const rows = crises.map((c) => [
      c.code,
      `"${c.title.replace(/"/g, '""')}"`,
      c.platform,
      `"${c.dateTime}"`,
      c.severity,
      c.status,
      c.resolutionMinutes ?? '-',
      c.actionsTaken.length,
    ]);

    const csvContent = [header.join(','), ...rows.map((r) => r.join(','))].join(
      '\n'
    );
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'crisly-crisis-report.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Top Banner with CSV Download */}
      <section className="rounded-3xl bg-white border border-[#EFE8F6] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-xl font-extrabold text-[#353044]">
            Analytics &amp; Reports
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6584] mt-0.5">
            Track crisis resolution speed, response performance, engagement, and export CSV summaries.
          </p>
        </div>

        <CuteTooltip label="Export crisis history as CSV" position="bottom">
          <SparkleButton
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#EC4899] rounded-full shadow-sm self-start sm:self-auto"
          >
            <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Download CSV Report</span>
          </SparkleButton>
        </CuteTooltip>
      </section>

      {/* 4 Key Performance Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl bg-[#E8DFFF]/55 border border-[#E8DFFF] p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5B21B6]">
              Avg. Resolution Time
            </span>
            <Clock className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#353044] tabular-nums">
            {avgResolutionMin} min
          </p>
          <p className="text-xs text-[#5C5470]">18% faster than target SLA</p>
        </div>

        <div className="rounded-3xl bg-[#D9EEFF]/60 border border-[#D9EEFF] p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1E3A8A]">
              Response Performance
            </span>
            <MessageSquareHeart className="w-4 h-4 text-[#1E40AF]" aria-hidden="true" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#353044] tabular-nums">
            {responseRate}%
          </p>
          <p className="text-xs text-[#5C5470] tabular-nums">
            {repliedOrReviewed} of {tickets.length} negative tickets handled
          </p>
        </div>

        <div className="rounded-3xl bg-[#FFF1C7]/65 border border-[#FFF1C7] p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A5608]">
              Social Engagement
            </span>
            <TrendingUp className="w-4 h-4 text-[#9A3412]" aria-hidden="true" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#353044] tabular-nums">
            {totalEngagement.toLocaleString()}
          </p>
          <p className="text-xs text-[#5C5470]">Likes, comments &amp; shares</p>
        </div>

        <div className="rounded-3xl bg-[#FFD6E7]/55 border border-[#FFD6E7] p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#9D174D]">
              Total Crises Logged
            </span>
            <CheckCircle2 className="w-4 h-4 text-[#9D174D]" aria-hidden="true" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#353044] tabular-nums">
            {crises.length}
          </p>
          <p className="text-xs text-[#5C5470]">
            {crises.filter((c) => c.status === 'Resolved').length} resolved
          </p>
        </div>
      </section>

      {/* Crisis Frequency + Sentiment Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-7 rounded-3xl bg-white border border-[#EFE8F6] p-6 shadow-xs space-y-4">
          <h2 className="font-display text-base sm:text-lg font-extrabold text-[#353044]">
            Crisis Frequency (Weekly)
          </h2>
          <div className="grid grid-cols-4 gap-4 items-end h-44 pt-2">
            {WEEKLY_FREQUENCY.map((wk) => {
              const barH = Math.min(wk.count * 18, 100);
              return (
                <div
                  key={wk.label}
                  className="h-full flex flex-col items-center justify-end gap-2"
                >
                  <span className="text-xs font-mono font-bold text-[#6D28D9] tabular-nums">
                    {wk.count}
                  </span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${barH}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="w-full max-w-[54px] rounded-2xl bg-gradient-to-t from-[#A78BFA] to-[#FFD6E7]"
                  />
                  <span className="text-xs font-bold text-[#5C5470]">
                    {wk.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="lg:col-span-5 rounded-3xl bg-white border border-[#EFE8F6] p-6 shadow-xs space-y-4">
          <h2 className="font-display text-base sm:text-lg font-extrabold text-[#353044]">
            Sentiment Comparison
          </h2>
          <div className="space-y-3.5">
            {[
              {
                label: 'Positive Mentions',
                count: posCount,
                color: 'bg-emerald-400',
                bg: 'bg-emerald-50',
              },
              {
                label: 'Neutral Mentions',
                count: neuCount,
                color: 'bg-[#FDE047]',
                bg: 'bg-[#FFF1C7]/55',
              },
              {
                label: 'Negative Mentions',
                count: negCount,
                color: 'bg-[#FB7185]',
                bg: 'bg-[#FFD6E7]/55',
              },
            ].map((item) => {
              const pct = Math.round(
                (item.count / Math.max(mentions.length, 1)) * 100
              );
              return (
                <div key={item.label} className={`rounded-2xl ${item.bg} p-3.5 space-y-2`}>
                  <div className="flex items-center justify-between text-xs font-bold text-[#353044]">
                    <span>{item.label}</span>
                    <span className="font-mono tabular-nums">
                      {item.count} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/80 overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Crisis History Table */}
      <section className="rounded-3xl bg-white border border-[#EFE8F6] p-5 sm:p-6 shadow-xs space-y-4 overflow-hidden">
        <h2 className="font-display text-base sm:text-lg font-extrabold text-[#353044]">
          Crisis History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#EFE8F6] text-xs font-bold text-[#6E6584]">
                <th className="py-3 pr-4">Code</th>
                <th className="py-3 pr-4">Crisis Title</th>
                <th className="py-3 pr-4">Platform</th>
                <th className="py-3 pr-4">Severity</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 text-right">Date &amp; Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EEF9]">
              {crises.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF7FF]/60 transition-colors">
                  <td className="py-3 pr-4 font-mono font-bold text-[#6D28D9] whitespace-nowrap">
                    {c.code}
                  </td>
                  <td className="py-3 pr-4 font-bold text-[#353044] min-w-[200px]">
                    {c.title}
                  </td>
                  <td className="py-3 pr-4 text-[#5C5470] whitespace-nowrap">
                    {c.platform}
                  </td>
                  <td className="py-3 pr-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-lg border text-xs font-bold ${getSeverityStyle(
                        c.severity
                      )}`}
                    >
                      {c.severity}
                    </span>
                  </td>
                  <td className="py-3 pr-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-lg border text-xs font-bold ${getCrisisStatusStyle(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 text-right font-mono text-xs text-[#6E6584] whitespace-nowrap tabular-nums">
                    {c.dateTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
}
