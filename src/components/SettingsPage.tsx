import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, RotateCcw, Save, Sparkles } from 'lucide-react';
import { WorkspaceSettings } from '../types/crisly';

interface SettingsPageProps {
  settings: WorkspaceSettings;
  onSaveSettings: (updated: WorkspaceSettings) => void;
  onResetDemoData: () => void;
}

export function SettingsPage({
  settings,
  onSaveSettings,
  onResetDemoData,
}: SettingsPageProps) {
  const [form, setForm] = useState<WorkspaceSettings>(settings);
  const [savedNotice, setSavedNotice] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(form);
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-3xl space-y-6"
    >
      <section className="rounded-3xl bg-white border border-[#EFE8F6] p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-[#F3EEF9]">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FFD6E7] to-[#E8DFFF] text-[#6D28D9] flex items-center justify-center">
            <Sparkles className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-display text-lg font-extrabold text-[#353044]">
              Brand &amp; Alert Settings
            </h1>
            <p className="text-xs text-[#6E6584]">
              Customize your CRISLY workspace profile and notification preferences.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="set-brand"
                className="block text-xs font-bold text-[#353044] mb-1.5"
              >
                Brand Name
              </label>
              <input
                id="set-brand"
                type="text"
                value={form.brandName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, brandName: e.target.value }))
                }
                className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-[#FFFCFA] border border-[#E8DFFF] rounded-2xl text-[#353044] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
              />
            </div>

            <div>
              <label
                htmlFor="set-guardian"
                className="block text-xs font-bold text-[#353044] mb-1.5"
              >
                Guardian Display Name
              </label>
              <input
                id="set-guardian"
                type="text"
                value={form.guardianName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, guardianName: e.target.value }))
                }
                className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-[#FFFCFA] border border-[#E8DFFF] rounded-2xl text-[#353044] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="set-role"
                className="block text-xs font-bold text-[#353044] mb-1.5"
              >
                Team Role
              </label>
              <input
                id="set-role"
                type="text"
                value={form.guardianRole}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, guardianRole: e.target.value }))
                }
                className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-[#FFFCFA] border border-[#E8DFFF] rounded-2xl text-[#353044] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
              />
            </div>

            <div>
              <label
                htmlFor="set-threshold"
                className="block text-xs font-bold text-[#353044] mb-1.5"
              >
                Crisis Alert Sensitivity
              </label>
              <select
                id="set-threshold"
                value={form.alertThreshold}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    alertThreshold: e.target.value as WorkspaceSettings['alertThreshold'],
                  }))
                }
                className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-[#FFFCFA] border border-[#E8DFFF] rounded-2xl text-[#353044] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
              >
                <option value="All Negative">All Negative Mentions</option>
                <option value="High & Critical Only">High &amp; Critical Only</option>
                <option value="Critical Only">Critical Only</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="flex items-center justify-between gap-3 rounded-2xl bg-[#FFFCFA] border border-[#EFE8F6] px-4 py-3 cursor-pointer">
              <span className="text-xs font-bold text-[#353044]">
                Daily Email Digest
              </span>
              <input
                type="checkbox"
                checked={form.emailDigest}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, emailDigest: e.target.checked }))
                }
                className="w-4 h-4 accent-[#7C3AED]"
              />
            </label>

            <label className="flex items-center justify-between gap-3 rounded-2xl bg-[#FFFCFA] border border-[#EFE8F6] px-4 py-3 cursor-pointer">
              <span className="text-xs font-bold text-[#353044]">
                Cute Sound Chimes
              </span>
              <input
                type="checkbox"
                checked={form.soundAlerts}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, soundAlerts: e.target.checked }))
                }
                className="w-4 h-4 accent-[#7C3AED]"
              />
            </label>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:opacity-95 rounded-2xl shadow-xs transition-all"
            >
              <Save className="w-4 h-4" aria-hidden="true" />
              <span>Save Changes</span>
            </button>

            {savedNotice && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                Settings saved to localStorage! ✨
              </span>
            )}
          </div>
        </form>
      </section>

      {/* Reset Demo Data Card */}
      <section className="rounded-3xl bg-[#FFD6E7]/35 border border-[#FFD6E7] p-6 space-y-3">
        <h2 className="font-display text-base font-extrabold text-[#353044]">
          Reset Workspace Data
        </h2>
        <p className="text-xs sm:text-sm text-[#5C5470]">
          Restore the original sample mentions, crises, templates, and activity history in localStorage.
        </p>

        {!confirmReset ? (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 text-xs font-bold text-[#9D174D] bg-white border border-pink-200 hover:bg-pink-50 rounded-2xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Reset Demo Data</span>
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                onResetDemoData();
                setConfirmReset(false);
              }}
              className="min-h-[40px] px-4 py-2 text-xs font-bold text-white bg-[#BE185D] hover:bg-[#9D174D] rounded-2xl"
            >
              Confirm Reset
            </button>
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="min-h-[40px] px-4 py-2 text-xs font-bold text-[#5C5470] bg-white border border-[#EFE8F6] rounded-2xl"
            >
              Cancel
            </button>
          </div>
        )}
      </section>
    </motion.div>
  );
}
