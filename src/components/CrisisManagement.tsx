import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  CalendarClock,
  CheckCircle2,
  Plus,
  ShieldAlert,
  X,
} from 'lucide-react';
import {
  CrisisItem,
  CrisisSeverity,
  CrisisStatus,
} from '../types/crisly';
import {
  getCrisisStatusStyle,
  getCurrentTimeLabel,
  getPlatformTint,
  getSeverityStyle,
} from '../utils/crislyHelpers';
import { CuteEmptyState, SparkleButton } from './CutePrimitives';

interface CrisisManagementProps {
  crises: CrisisItem[];
  selectedCrisis: CrisisItem | null;
  statusPreset?: CrisisStatus | 'All';
  onSelectCrisis: (crisis: CrisisItem | null) => void;
  onUpdateCrisis: (updated: CrisisItem) => void;
  onOpenNewCrisis: () => void;
}

const SEVERITIES: (CrisisSeverity | 'All')[] = [
  'All',
  'Low',
  'Medium',
  'High',
  'Critical',
];
const STATUSES: (CrisisStatus | 'All')[] = [
  'All',
  'Monitoring',
  'In Progress',
  'Resolved',
];

export function CrisisManagement({
  crises,
  selectedCrisis,
  statusPreset,
  onSelectCrisis,
  onUpdateCrisis,
  onOpenNewCrisis,
}: CrisisManagementProps) {
  const [severityFilter, setSeverityFilter] = useState<CrisisSeverity | 'All'>(
    'All'
  );
  const [statusFilter, setStatusFilter] = useState<CrisisStatus | 'All'>(
    statusPreset ?? 'All'
  );
  const [newStepText, setNewStepText] = useState('');

  useEffect(() => {
    if (statusPreset) {
      setStatusFilter(statusPreset);
    }
  }, [statusPreset]);

  const filteredCrises = crises.filter((c) => {
    if (severityFilter !== 'All' && c.severity !== severityFilter) return false;
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    return true;
  });

  const handleStatusChange = (crisis: CrisisItem, status: CrisisStatus) => {
    const timeLabel = getCurrentTimeLabel().replace('Today, ', '');
    const updated: CrisisItem = {
      ...crisis,
      status,
      resolutionMinutes:
        status === 'Resolved' ? crisis.resolutionMinutes ?? 45 : crisis.resolutionMinutes,
      chronology: [
        ...crisis.chronology,
        {
          id: `ch-${Date.now()}`,
          time: timeLabel,
          event: `Crisis status updated to ${status}.`,
          actor: 'Brand Guardian',
        },
      ],
    };
    onUpdateCrisis(updated);
    onSelectCrisis(updated);
  };

  const handleSeverityChange = (
    crisis: CrisisItem,
    severity: CrisisSeverity
  ) => {
    const timeLabel = getCurrentTimeLabel().replace('Today, ', '');
    const updated: CrisisItem = {
      ...crisis,
      severity,
      chronology: [
        ...crisis.chronology,
        {
          id: `ch-${Date.now()}`,
          time: timeLabel,
          event: `Severity level adjusted to ${severity}.`,
          actor: 'Brand Guardian',
        },
      ],
    };
    onUpdateCrisis(updated);
    onSelectCrisis(updated);
  };

  const handleAddActionStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCrisis || !newStepText.trim()) return;
    const timeLabel = getCurrentTimeLabel().replace('Today, ', '');
    const updated: CrisisItem = {
      ...selectedCrisis,
      actionsTaken: [...selectedCrisis.actionsTaken, newStepText.trim()],
      chronology: [
        ...selectedCrisis.chronology,
        {
          id: `ch-${Date.now()}`,
          time: timeLabel,
          event: `Handling step recorded: ${newStepText.trim()}`,
          actor: 'Brand Guardian',
        },
      ],
    };
    onUpdateCrisis(updated);
    onSelectCrisis(updated);
    setNewStepText('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Header & Filters */}
      <section className="rounded-3xl bg-white border border-[#EFE8F6] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-xl font-extrabold text-[#353044]">
              Crisis Management Board
            </h1>
            <p className="text-xs sm:text-sm text-[#6E6584] mt-0.5">
              Click any crisis card to inspect its chronology, source mentions, and handling steps.
            </p>
          </div>
          <SparkleButton
            type="button"
            onClick={onOpenNewCrisis}
            className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-4.5 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#EC4899] rounded-full shadow-xs self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Add Crisis Report</span>
          </SparkleButton>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-[#F5F0FF] rounded-2xl overflow-x-auto max-w-full">
            {STATUSES.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 min-h-[34px] text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                  statusFilter === st
                    ? 'bg-white text-[#6D28D9] shadow-xs'
                    : 'text-[#5C5470] hover:text-[#353044]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#FFD6E7]/40 rounded-2xl overflow-x-auto max-w-full">
            {SEVERITIES.map((sev) => (
              <button
                key={sev}
                type="button"
                onClick={() => setSeverityFilter(sev)}
                className={`px-3 py-1.5 min-h-[34px] text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                  severityFilter === sev
                    ? 'bg-white text-[#9D174D] shadow-xs'
                    : 'text-[#5C5470] hover:text-[#353044]'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Crisis Cards Grid */}
      {filteredCrises.length === 0 ? (
        <CuteEmptyState
          title="No crises match these filters ✨"
          description="Select All to view every tracked crisis item or report a new one."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCrises.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectCrisis(item)}
              className="text-left rounded-3xl bg-white border border-[#EFE8F6] hover:border-[#A78BFA] hover:-translate-y-0.5 hover:shadow-md p-6 shadow-xs transition-all flex flex-col justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold ${getPlatformTint(
                        item.platform
                      )}`}
                    >
                      {item.platform}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#6E6584]">
                      {item.code}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-xl border text-xs font-bold ${getSeverityStyle(
                        item.severity
                      )}`}
                    >
                      {item.severity}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-xl border text-xs font-bold ${getCrisisStatusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-base sm:text-lg font-extrabold text-[#353044] leading-snug">
                    {item.title}
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#5C5470] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F3EEF9] flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#6E6584]">
                  <CalendarClock className="w-3.5 h-3.5" aria-hidden="true" />
                  {item.dateTime}
                </span>
                <span className="font-bold text-[#6D28D9]">
                  {item.actionsTaken.length} steps taken →
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Crisis Detail Modal */}
      {selectedCrisis && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#353044]/40 backdrop-blur-xs p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="crisis-detail-title"
        >
          <div className="w-full sm:max-w-2xl bg-[#FFFCFA] rounded-t-3xl sm:rounded-3xl border border-[#EFE8F6] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#E8DFFF]/65 via-[#FFD6E7]/50 to-[#D9EEFF]/55 border-b border-[#EFE8F6] flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-[#6D28D9]">
                    {selectedCrisis.code}
                  </span>
                  <span>·</span>
                  <span className="font-bold text-[#353044]">
                    {selectedCrisis.platform}
                  </span>
                  <span>·</span>
                  <span className="text-[#5C5470]">{selectedCrisis.dateTime}</span>
                </div>
                <h2
                  id="crisis-detail-title"
                  className="font-display text-lg sm:text-xl font-extrabold text-[#353044]"
                >
                  {selectedCrisis.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => onSelectCrisis(null)}
                aria-label="Close crisis details"
                className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-2xl text-[#5C5470] hover:bg-white/80 transition-colors shrink-0"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              <p className="text-sm text-[#4A435E] leading-relaxed">
                {selectedCrisis.description}
              </p>

              {/* Status & Severity Switchers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl bg-white border border-[#EFE8F6] p-4">
                <div>
                  <span className="block text-xs font-bold text-[#6E6584] mb-2">
                    Crisis Status
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(['Monitoring', 'In Progress', 'Resolved'] as CrisisStatus[]).map(
                      (st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleStatusChange(selectedCrisis, st)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            selectedCrisis.status === st
                              ? getCrisisStatusStyle(st)
                              : 'bg-[#FFFCFA] border-[#EFE8F6] text-[#5C5470] hover:border-[#A78BFA]'
                          }`}
                        >
                          {st}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-bold text-[#6E6584] mb-2">
                    Severity Level
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(['Low', 'Medium', 'High', 'Critical'] as CrisisSeverity[]).map(
                      (sev) => (
                        <button
                          key={sev}
                          type="button"
                          onClick={() =>
                            handleSeverityChange(selectedCrisis, sev)
                          }
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            selectedCrisis.severity === sev
                              ? getSeverityStyle(sev)
                              : 'bg-[#FFFCFA] border-[#EFE8F6] text-[#5C5470] hover:border-[#A78BFA]'
                          }`}
                        >
                          {sev}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Source Mentions */}
              <div className="space-y-2.5">
                <h3 className="font-display text-sm font-extrabold text-[#353044] flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#EC4899]" aria-hidden="true" />
                  <span>Source Mentions</span>
                </h3>
                <ul className="space-y-2">
                  {selectedCrisis.sourceMentions.map((src, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm text-[#4A435E] bg-white border border-[#EFE8F6] rounded-2xl p-3 leading-relaxed"
                    >
                      {src}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Handling Steps Taken */}
              <div className="space-y-3">
                <h3 className="font-display text-sm font-extrabold text-[#353044] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                  <span>Handling Steps Taken</span>
                </h3>
                <ul className="space-y-2">
                  {selectedCrisis.actionsTaken.map((step, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm text-[#353044] bg-[#D9EEFF]/35 border border-[#D9EEFF] rounded-2xl px-3.5 py-2.5 flex items-start gap-2.5"
                    >
                      <span className="font-mono text-xs font-bold text-[#1E40AF] mt-0.5">
                        {i + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>

                <form onSubmit={handleAddActionStep} className="flex gap-2">
                  <input
                    type="text"
                    value={newStepText}
                    onChange={(e) => setNewStepText(e.target.value)}
                    placeholder="Add a new handling action..."
                    className="flex-1 min-h-[42px] px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E8DFFF] rounded-2xl text-[#353044] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
                  />
                  <button
                    type="submit"
                    className="min-h-[42px] px-4 py-2 text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-2xl transition-colors shrink-0"
                  >
                    Add Step
                  </button>
                </form>
              </div>

              {/* Chronology */}
              <div className="space-y-2.5">
                <h3 className="font-display text-sm font-extrabold text-[#353044]">
                  Chronology
                </h3>
                <ol className="space-y-2.5 border-l-2 border-[#E8DFFF] pl-4 ml-1">
                  {selectedCrisis.chronology.map((entry) => (
                    <li key={entry.id} className="text-xs space-y-0.5">
                      <p className="font-mono font-bold text-[#6D28D9]">
                        {entry.time} · {entry.actor}
                      </p>
                      <p className="text-[#4A435E] leading-relaxed">
                        {entry.event}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
