import { useState } from 'react';
import { ShieldAlert, X } from 'lucide-react';
import { CrisisSeverity, Platform } from '../types/crisly';

interface NewCrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    title: string;
    platform: Platform;
    severity: CrisisSeverity;
    description: string;
    sourceMention: string;
  }) => void;
}

const PLATFORMS: Platform[] = ['Instagram', 'TikTok', 'X', 'Facebook'];
const SEVERITIES: CrisisSeverity[] = ['Low', 'Medium', 'High', 'Critical'];

export function NewCrisisModal({
  isOpen,
  onClose,
  onSubmit,
}: NewCrisisModalProps) {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState<Platform>('Instagram');
  const [severity, setSeverity] = useState<CrisisSeverity>('Medium');
  const [description, setDescription] = useState('');
  const [sourceMention, setSourceMention] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Please enter both a crisis title and description.');
      return;
    }

    onSubmit({
      title: title.trim(),
      platform,
      severity,
      description: description.trim(),
      sourceMention:
        sourceMention.trim() ||
        `Reported manually on ${platform} for brand guardian triage.`,
    });

    setTitle('');
    setPlatform('Instagram');
    setSeverity('Medium');
    setDescription('');
    setSourceMention('');
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#353044]/40 backdrop-blur-xs p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-crisis-title"
    >
      <div className="w-full sm:max-w-lg bg-[#FFFCFA] rounded-t-3xl sm:rounded-3xl border border-[#EFE8F6] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-[#FFD6E7]/45 via-[#E8DFFF]/45 to-[#D9EEFF]/45 border-b border-[#EFE8F6] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-white text-[#9D174D] flex items-center justify-center shadow-xs">
              <ShieldAlert className="w-4.5 h-4.5" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="new-crisis-title"
                className="font-display text-base sm:text-lg font-extrabold text-[#353044]"
              >
                Add Crisis Report
              </h2>
              <p className="text-xs text-[#5C5470]">
                Log a new social media issue for tracking
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-2xl text-[#5C5470] hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label
              htmlFor="crisis-title"
              className="block text-xs font-bold text-[#353044] mb-1.5"
            >
              Crisis Title *
            </label>
            <input
              id="crisis-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              placeholder="e.g., Broken gift box reports on TikTok Live"
              className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-white border border-[#E8DFFF] rounded-2xl text-[#353044] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label
                htmlFor="crisis-platform"
                className="block text-xs font-bold text-[#353044] mb-1.5"
              >
                Platform
              </label>
              <select
                id="crisis-platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
                className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-white border border-[#E8DFFF] rounded-2xl text-[#353044] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="crisis-severity"
                className="block text-xs font-bold text-[#353044] mb-1.5"
              >
                Severity Level
              </label>
              <select
                id="crisis-severity"
                value={severity}
                onChange={(e) => setSeverity(e.target.value as CrisisSeverity)}
                className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-white border border-[#E8DFFF] rounded-2xl text-[#353044] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
              >
                {SEVERITIES.map((sev) => (
                  <option key={sev} value={sev}>
                    {sev}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="crisis-desc"
              className="block text-xs font-bold text-[#353044] mb-1.5"
            >
              Description *
            </label>
            <textarea
              id="crisis-desc"
              rows={3}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setError('');
              }}
              placeholder="Summarize what customers are reporting and its potential impact..."
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E8DFFF] rounded-2xl text-[#353044] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
            />
          </div>

          <div>
            <label
              htmlFor="crisis-source"
              className="block text-xs font-bold text-[#353044] mb-1.5"
            >
              Source Mention / Evidence (Optional)
            </label>
            <input
              id="crisis-source"
              type="text"
              value={sourceMention}
              onChange={(e) => setSourceMention(e.target.value)}
              placeholder="@username or link summary"
              className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-white border border-[#E8DFFF] rounded-2xl text-[#353044] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="text-xs font-bold text-[#9D174D] bg-[#FFD6E7] rounded-2xl px-3.5 py-2.5"
            >
              {error}
            </p>
          )}

          <div className="pt-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-5 py-2 text-sm font-bold text-[#5C5470] bg-white border border-[#E8DFFF] hover:bg-[#F7F3FF] rounded-2xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:opacity-95 rounded-2xl shadow-sm transition-all"
            >
              Save Crisis Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
