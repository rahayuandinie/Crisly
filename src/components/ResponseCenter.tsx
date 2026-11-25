import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  Copy,
  Edit3,
  FileText,
  Plus,
  Send,
  Sparkles,
} from 'lucide-react';
import {
  ResponseStatus,
  ResponseTemplate,
  ResponseTicket,
} from '../types/crisly';
import {
  getCurrentTimeLabel,
  getPlatformTint,
  getResponseStatusStyle,
  getSeverityStyle,
} from '../utils/crislyHelpers';
import { CuteTooltip, SparkleButton } from './CutePrimitives';

interface ResponseCenterProps {
  tickets: ResponseTicket[];
  templates: ResponseTemplate[];
  statusPreset?: ResponseStatus | 'All';
  onUpdateTicket: (updated: ResponseTicket) => void;
  onUpdateTemplate: (updated: ResponseTemplate) => void;
  onAddTemplate: (created: ResponseTemplate) => void;
}

const STATUS_FILTERS: (ResponseStatus | 'All')[] = [
  'All',
  'Pending',
  'Replied',
  'Reviewed',
];

export function ResponseCenter({
  tickets,
  templates,
  statusPreset,
  onUpdateTicket,
  onUpdateTemplate,
  onAddTemplate,
}: ResponseCenterProps) {
  const [statusFilter, setStatusFilter] = useState<ResponseStatus | 'All'>(
    statusPreset ?? 'All'
  );

  useEffect(() => {
    if (statusPreset) {
      setStatusFilter(statusPreset);
    }
  }, [statusPreset]);
  const [selectedId, setSelectedId] = useState<string>(tickets[0]?.id ?? '');
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);

  // Editable template state
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(
    null
  );
  const [tplTitle, setTplTitle] = useState('');
  const [tplContent, setTplContent] = useState('');
  const [addingTemplate, setAddingTemplate] = useState(false);

  const filteredTickets = tickets.filter(
    (t) => statusFilter === 'All' || t.status === statusFilter
  );

  const selectedTicket =
    tickets.find((t) => t.id === selectedId) ?? filteredTickets[0] ?? null;

  useEffect(() => {
    if (selectedTicket) {
      setDraft(selectedTicket.replyText);
    }
  }, [selectedTicket?.id]);

  const handleApplyTemplate = (tpl: ResponseTemplate) => {
    if (!selectedTicket) return;
    const personalized = tpl.content.replace(
      /\[Name\]/g,
      selectedTicket.author.split(' ')[0]
    );
    setDraft(personalized);
  };

  const handleCopyResponse = async () => {
    if (!draft.trim()) return;
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  const handleSaveReply = (newStatus: ResponseStatus) => {
    if (!selectedTicket) return;
    onUpdateTicket({
      ...selectedTicket,
      replyText: draft.trim(),
      status: newStatus,
      repliedAt:
        newStatus === 'Replied' || newStatus === 'Reviewed'
          ? getCurrentTimeLabel()
          : selectedTicket.repliedAt,
    });
  };

  const startEditTemplate = (tpl: ResponseTemplate) => {
    setAddingTemplate(false);
    setEditingTemplateId(tpl.id);
    setTplTitle(tpl.title);
    setTplContent(tpl.content);
  };

  const handleSaveTemplateEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tplTitle.trim() || !tplContent.trim()) return;

    if (addingTemplate) {
      onAddTemplate({
        id: `tpl-${Date.now()}`,
        title: tplTitle.trim(),
        category: 'Custom',
        content: tplContent.trim(),
      });
      setAddingTemplate(false);
    } else if (editingTemplateId) {
      const existing = templates.find((t) => t.id === editingTemplateId);
      if (existing) {
        onUpdateTemplate({
          ...existing,
          title: tplTitle.trim(),
          content: tplContent.trim(),
        });
      }
      setEditingTemplateId(null);
    }

    setTplTitle('');
    setTplContent('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Top Bar */}
      <section className="rounded-3xl bg-white border border-[#EFE8F6] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-xl font-extrabold text-[#353044]">
            Response Center
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6584] mt-0.5">
            Craft empathetic replies using editable crisis templates and track ticket status.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-[#F5F0FF] rounded-2xl overflow-x-auto max-w-full self-start sm:self-auto">
          {STATUS_FILTERS.map((st) => (
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
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Negative Comment List */}
        <section className="lg:col-span-4 rounded-3xl bg-white border border-[#EFE8F6] p-4 shadow-xs space-y-2.5">
          <h2 className="font-display text-sm font-extrabold text-[#353044] px-2 pt-1">
            Negative Comments ({filteredTickets.length})
          </h2>

          {filteredTickets.length === 0 ? (
            <p className="text-xs text-[#6E6584] p-4 text-center">
              No comments under &ldquo;{statusFilter}&rdquo;.
            </p>
          ) : (
            <div className="space-y-2">
              {filteredTickets.map((ticket) => {
                const isSelected = selectedTicket?.id === ticket.id;
                return (
                  <button
                    key={ticket.id}
                    type="button"
                    onClick={() => setSelectedId(ticket.id)}
                    className={`w-full text-left rounded-2xl p-3.5 border transition-all space-y-2 ${
                      isSelected
                        ? 'bg-[#FAF7FF] border-[#A78BFA] shadow-xs'
                        : 'bg-[#FFFCFA] border-[#F3EEF9] hover:border-[#E8DFFF]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="font-bold text-[#353044] truncate">
                        {ticket.author} · {ticket.platform}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-lg border font-bold shrink-0 ${getResponseStatusStyle(
                          ticket.status
                        )}`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#5C5470] line-clamp-2 leading-relaxed">
                      {ticket.comment}
                    </p>
                    <div className="flex items-center justify-between text-[11px]">
                      <span
                        className={`px-2 py-0.5 rounded-lg border font-bold ${getSeverityStyle(
                          ticket.severity
                        )}`}
                      >
                        {ticket.severity}
                      </span>
                      <span className="text-[#6E6584]">{ticket.timestamp}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* Middle: Comment Detail & Reply Composer */}
        <section className="lg:col-span-5 rounded-3xl bg-white border border-[#EFE8F6] p-5 sm:p-6 shadow-xs space-y-5">
          {selectedTicket ? (
            <>
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#F3EEF9]">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0 ${getPlatformTint(
                      selectedTicket.platform
                    )}`}
                  >
                    {selectedTicket.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-display text-sm font-extrabold text-[#353044]">
                      {selectedTicket.author}{' '}
                      <span className="font-normal text-xs text-[#6E6584]">
                        {selectedTicket.handle}
                      </span>
                    </p>
                    <p className="text-xs text-[#6E6584]">
                      {selectedTicket.platform} · {selectedTicket.timestamp}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-xl border text-xs font-bold shrink-0 ${getResponseStatusStyle(
                    selectedTicket.status
                  )}`}
                >
                  {selectedTicket.status}
                </span>
              </div>

              <div className="rounded-2xl bg-[#FFD6E7]/30 border border-[#FFD6E7] p-4 space-y-1">
                <p className="text-[11px] font-bold text-[#9D174D]">
                  Customer Comment
                </p>
                <p className="text-sm text-[#353044] leading-relaxed">
                  {selectedTicket.comment}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="reply-composer"
                    className="text-xs font-bold text-[#353044]"
                  >
                    Write Official Response
                  </label>
                  <CuteTooltip label="Copy reply to clipboard" position="top">
                    <button
                      type="button"
                      onClick={handleCopyResponse}
                      disabled={!draft.trim()}
                      className="inline-flex items-center gap-1.5 min-h-[34px] px-3 py-1 rounded-full text-xs font-bold text-[#6D28D9] bg-[#F5F0FF] hover:bg-[#E8DFFF] hover:scale-[1.03] disabled:opacity-50 transition-all"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                          <span>Copied! ✨</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy Response</span>
                        </>
                      )}
                    </button>
                  </CuteTooltip>
                </div>

                <textarea
                  id="reply-composer"
                  rows={6}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Write a warm, factual reply or click a template on the right..."
                  className="w-full px-4 py-3 text-sm bg-[#FFFCFA] border border-[#E8DFFF] rounded-2xl text-[#353044] leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
                />
              </div>

              <div className="space-y-2.5 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  <SparkleButton
                    type="button"
                    onClick={() => handleSaveReply('Replied')}
                    disabled={!draft.trim()}
                    className="inline-flex items-center justify-center gap-2 min-h-[42px] px-5 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#EC4899] disabled:opacity-50 rounded-full shadow-xs"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Save &amp; Mark Replied</span>
                  </SparkleButton>

                  {(['Pending', 'Reviewed'] as ResponseStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleSaveReply(st)}
                      className={`min-h-[42px] px-3.5 py-2 text-xs font-bold rounded-2xl border transition-colors ${
                        selectedTicket.status === st
                          ? getResponseStatusStyle(st)
                          : 'bg-white border-[#EFE8F6] text-[#5C5470] hover:border-[#A78BFA]'
                      }`}
                    >
                      Set {st}
                    </button>
                  ))}
                </div>
                {selectedTicket.repliedAt && (
                  <p className="text-[11px] font-semibold text-[#6E6584]">
                    Last updated: {selectedTicket.repliedAt}
                  </p>
                )}
              </div>
            </>
          ) : (
            <p className="text-sm text-[#6E6584] py-8 text-center">
              Select a comment from the list to compose a response.
            </p>
          )}
        </section>

        {/* Right: Editable Response Templates */}
        <section className="lg:col-span-3 rounded-3xl bg-white border border-[#EFE8F6] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#7C3AED]" aria-hidden="true" />
              <h2 className="font-display text-sm font-extrabold text-[#353044]">
                Response Templates
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingTemplateId(null);
                setAddingTemplate(true);
                setTplTitle('');
                setTplContent('');
              }}
              className="min-h-[32px] px-2.5 py-1 rounded-xl bg-[#E8DFFF] text-[#5B21B6] text-xs font-bold inline-flex items-center gap-1 hover:bg-[#DDD0FF]"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>New</span>
            </button>
          </div>

          {(editingTemplateId || addingTemplate) && (
            <form
              onSubmit={handleSaveTemplateEdit}
              className="rounded-2xl bg-[#FAF7FF] border border-[#A78BFA] p-3.5 space-y-2.5"
            >
              <input
                type="text"
                value={tplTitle}
                onChange={(e) => setTplTitle(e.target.value)}
                placeholder="Template title"
                className="w-full min-h-[38px] px-3 py-1.5 text-xs font-bold bg-white border border-[#E8DFFF] rounded-xl text-[#353044]"
              />
              <textarea
                rows={4}
                value={tplContent}
                onChange={(e) => setTplContent(e.target.value)}
                placeholder="Empathetic template text (use [Name] for customer name)..."
                className="w-full px-3 py-2 text-xs bg-white border border-[#E8DFFF] rounded-xl text-[#353044]"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingTemplateId(null);
                    setAddingTemplate(false);
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-[#6E6584]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-bold text-white bg-[#7C3AED] rounded-xl"
                >
                  Save
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2.5">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                className="rounded-2xl bg-[#FFFCFA] border border-[#F3EEF9] p-3.5 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-extrabold text-[#353044]">
                      {tpl.title}
                    </p>
                    <p className="text-[11px] font-semibold text-[#7C3AED]">
                      {tpl.category}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => startEditTemplate(tpl)}
                    aria-label={`Edit ${tpl.title}`}
                    className="min-w-[30px] min-h-[30px] flex items-center justify-center rounded-lg text-[#6E6584] hover:text-[#6D28D9] hover:bg-[#F5F0FF]"
                  >
                    <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>

                <p className="text-xs text-[#5C5470] line-clamp-3 leading-relaxed">
                  {tpl.content}
                </p>

                <button
                  type="button"
                  onClick={() => handleApplyTemplate(tpl)}
                  className="w-full min-h-[34px] px-3 py-1 rounded-xl text-xs font-bold text-[#6D28D9] bg-[#E8DFFF]/65 hover:bg-[#E8DFFF] transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3" aria-hidden="true" />
                  <span>Use Template</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
