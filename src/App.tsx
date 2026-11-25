import { useEffect, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { AnalyticsReports } from './components/AnalyticsReports';
import { CrisisManagement } from './components/CrisisManagement';
import { CrisisMonitoring } from './components/CrisisMonitoring';
import { CuteLoadingOverlay } from './components/CutePrimitives';
import { DashboardOverview } from './components/DashboardOverview';
import { DashboardShell, SubmenuAction } from './components/DashboardShell';
import { LandingPage } from './components/LandingPage';
import { NewCrisisModal } from './components/NewCrisisModal';
import { ResponseCenter } from './components/ResponseCenter';
import { SentimentAnalysis } from './components/SentimentAnalysis';
import { SettingsPage } from './components/SettingsPage';
import { INITIAL_CRISLY_STATE } from './data/mockData';
import {
  CrislyState,
  CrisisItem,
  CrisisSeverity,
  CrisisStatus,
  DashboardTab,
  Platform,
  ResponseStatus,
  ResponseTemplate,
  ResponseTicket,
  SentimentType,
  SocialMention,
  WorkspaceSettings,
} from './types/crisly';
import { getCurrentTimeLabel } from './utils/crislyHelpers';

const STORAGE_KEY = 'crisly_workspace_state_v1';

function loadInitialState(): CrislyState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_CRISLY_STATE;
    const parsed = JSON.parse(raw) as Partial<CrislyState>;
    if (
      !parsed ||
      !Array.isArray(parsed.mentions) ||
      !Array.isArray(parsed.crises)
    ) {
      return INITIAL_CRISLY_STATE;
    }
    return {
      mentions: parsed.mentions,
      crises: parsed.crises,
      tickets: Array.isArray(parsed.tickets)
        ? parsed.tickets
        : INITIAL_CRISLY_STATE.tickets,
      templates: Array.isArray(parsed.templates)
        ? parsed.templates
        : INITIAL_CRISLY_STATE.templates,
      activities: Array.isArray(parsed.activities)
        ? parsed.activities
        : INITIAL_CRISLY_STATE.activities,
      settings: parsed.settings ?? INITIAL_CRISLY_STATE.settings,
    };
  } catch {
    return INITIAL_CRISLY_STATE;
  }
}

export default function App() {
  const [state, setState] = useState<CrislyState>(loadInitialState);
  const [viewMode, setViewMode] = useState<'landing' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [monitoringSentimentPreset, setMonitoringSentimentPreset] = useState<
    SentimentType | 'All'
  >('All');
  const [crisisStatusPreset, setCrisisStatusPreset] = useState<
    CrisisStatus | 'All'
  >('All');
  const [responseStatusPreset, setResponseStatusPreset] = useState<
    ResponseStatus | 'All'
  >('All');

  const [selectedCrisis, setSelectedCrisis] = useState<CrisisItem | null>(null);
  const [isNewCrisisOpen, setIsNewCrisisOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }, [state]);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleEnterDashboard = () => {
    setIsTransitioning(true);
    window.setTimeout(() => {
      setViewMode('dashboard');
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 280);
  };

  const handleSubmenuAction = (action: SubmenuAction) => {
    if (action.openNewCrisis) {
      setIsNewCrisisOpen(true);
      return;
    }
    if (action.tab) {
      setActiveTab(action.tab);
      if (action.tab !== 'management') {
        setSelectedCrisis(null);
      }
    }
    if (action.monitoringSentiment) {
      setMonitoringSentimentPreset(action.monitoringSentiment);
    }
    if (action.crisisStatus) {
      setCrisisStatusPreset(action.crisisStatus);
    }
    if (action.responseStatus) {
      setResponseStatusPreset(action.responseStatus);
    }
  };

  const handleAddCrisis = (payload: {
    title: string;
    platform: Platform;
    severity: CrisisSeverity;
    description: string;
    sourceMention: string;
  }) => {
    const nextCodeNum = 200 + state.crises.length + 1;
    const code = `CR-${nextCodeNum}`;
    const nowLabel = getCurrentTimeLabel();
    const shortTime = nowLabel.replace('Today, ', '');

    const newCrisis: CrisisItem = {
      id: `cr-${Date.now()}`,
      code,
      title: payload.title,
      platform: payload.platform,
      description: payload.description,
      dateTime: nowLabel,
      severity: payload.severity,
      status: 'Monitoring',
      sourceMentions: [payload.sourceMention],
      chronology: [
        {
          id: `ch-${Date.now()}`,
          time: shortTime,
          event: `Crisis report ${code} created on ${payload.platform} (${payload.severity}).`,
          actor: state.settings.guardianName,
        },
      ],
      actionsTaken: ['Initial triage logged in CRISLY Crisis Management.'],
    };

    setState((prev) => ({
      ...prev,
      crises: [newCrisis, ...prev.crises],
      activities: [
        {
          id: `act-${Date.now()}`,
          time: shortTime,
          text: `New ${payload.severity} crisis ${code} logged on ${payload.platform}`,
          type: 'alert',
        },
        ...prev.activities,
      ],
    }));

    setActiveTab('management');
    setCrisisStatusPreset('All');
    setSelectedCrisis(newCrisis);
    showToast(`${code} added to Crisis Management! ✨`);
  };

  const handleEscalateMention = (mention: SocialMention) => {
    const nextCodeNum = 200 + state.crises.length + 1;
    const code = `CR-${nextCodeNum}`;
    const nowLabel = getCurrentTimeLabel();
    const shortTime = nowLabel.replace('Today, ', '');
    const newCrisisId = `cr-${Date.now()}`;

    const escalatedCrisis: CrisisItem = {
      id: newCrisisId,
      code,
      title: `Escalated Mention from ${mention.handle} on ${mention.platform}`,
      platform: mention.platform,
      description: mention.content,
      dateTime: nowLabel,
      severity: mention.severity,
      status: 'Monitoring',
      sourceMentions: [
        `${mention.handle} on ${mention.platform}: "${mention.content}" (${mention.likes} likes, ${mention.comments} comments)`,
      ],
      chronology: [
        {
          id: `ch-${Date.now()}`,
          time: shortTime,
          event: `Escalated from Crisis Monitoring feed (${mention.handle}).`,
          actor: state.settings.guardianName,
        },
      ],
      actionsTaken: ['Escalated from live monitoring feed for team follow-up.'],
    };

    setState((prev) => ({
      ...prev,
      crises: [escalatedCrisis, ...prev.crises],
      mentions: prev.mentions.map((m) =>
        m.id === mention.id ? { ...m, escalatedToCrisisId: newCrisisId } : m
      ),
      activities: [
        {
          id: `act-${Date.now()}`,
          time: shortTime,
          text: `Escalated ${mention.handle}'s ${mention.platform} mention to ${code}`,
          type: 'alert',
        },
        ...prev.activities,
      ],
    }));

    setActiveTab('management');
    setCrisisStatusPreset('All');
    setSelectedCrisis(escalatedCrisis);
    showToast(`Mention escalated to ${code}!`);
  };

  const handleUpdateCrisis = (updated: CrisisItem) => {
    const shortTime = getCurrentTimeLabel().replace('Today, ', '');
    setState((prev) => ({
      ...prev,
      crises: prev.crises.map((c) => (c.id === updated.id ? updated : c)),
      activities: [
        {
          id: `act-${Date.now()}`,
          time: shortTime,
          text: `${updated.code} updated (${updated.status} · ${updated.severity})`,
          type: updated.status === 'Resolved' ? 'resolved' : 'reply',
        },
        ...prev.activities,
      ],
    }));
  };

  const handleUpdateTicket = (updated: ResponseTicket) => {
    const shortTime = getCurrentTimeLabel().replace('Today, ', '');
    setState((prev) => ({
      ...prev,
      tickets: prev.tickets.map((t) => (t.id === updated.id ? updated : t)),
      activities: [
        {
          id: `act-${Date.now()}`,
          time: shortTime,
          text: `Response for ${updated.handle} marked ${updated.status}`,
          type: 'reply',
        },
        ...prev.activities,
      ],
    }));
    showToast(`Ticket for ${updated.handle} updated to ${updated.status} ✨`);
  };

  const handleUpdateTemplate = (updated: ResponseTemplate) => {
    setState((prev) => ({
      ...prev,
      templates: prev.templates.map((t) => (t.id === updated.id ? updated : t)),
    }));
    showToast('Response template updated!');
  };

  const handleAddTemplate = (created: ResponseTemplate) => {
    setState((prev) => ({
      ...prev,
      templates: [created, ...prev.templates],
    }));
    showToast('New response template saved!');
  };

  const handleSaveSettings = (updated: WorkspaceSettings) => {
    setState((prev) => ({
      ...prev,
      settings: updated,
    }));
  };

  const handleResetDemoData = () => {
    setState(INITIAL_CRISLY_STATE);
    setSelectedCrisis(null);
    showToast('Demo data restored cleanly ✨');
  };

  const activeCrisisCount = state.crises.filter(
    (c) => c.status !== 'Resolved'
  ).length;
  const pendingResponseCount = state.tickets.filter(
    (t) => t.status === 'Pending'
  ).length;

  return (
    <>
      {isTransitioning && (
        <CuteLoadingOverlay message="Opening your CRISLY workspace... ✨" />
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 bg-white/95 backdrop-blur-md border border-[#FFD6E7] shadow-xl shadow-[#FFD6E7]/40 rounded-full px-4.5 py-2.5 flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#353044]"
        >
          <Sparkles
            className="w-4 h-4 text-[#EC4899] animate-sparkle shrink-0"
            aria-hidden="true"
          />
          <span>{toast}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Dismiss notification"
            className="p-1 rounded-full hover:bg-[#FFF1C7] text-[#6E6584]"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      )}

      {viewMode === 'landing' ? (
        <LandingPage onExploreDashboard={handleEnterDashboard} />
      ) : (
        <DashboardShell
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            if (tab !== 'management') setSelectedCrisis(null);
          }}
          onSubmenuAction={handleSubmenuAction}
          onOpenNewCrisis={() => setIsNewCrisisOpen(true)}
          onBackToLanding={() => setViewMode('landing')}
          activeCrisisCount={activeCrisisCount}
          pendingResponseCount={pendingResponseCount}
          settings={state.settings}
        >
          {activeTab === 'dashboard' && (
            <DashboardOverview
              mentions={state.mentions}
              crises={state.crises}
              activities={state.activities}
              guardianName={state.settings.guardianName}
              onNavigateTab={setActiveTab}
              onSelectCrisis={(crisis) => {
                setActiveTab('management');
                setSelectedCrisis(crisis);
              }}
            />
          )}

          {activeTab === 'monitoring' && (
            <CrisisMonitoring
              mentions={state.mentions}
              brandName={state.settings.brandName}
              sentimentPreset={monitoringSentimentPreset}
              onEscalateMention={handleEscalateMention}
              onOpenResponseCenter={() => setActiveTab('responses')}
            />
          )}

          {activeTab === 'management' && (
            <CrisisManagement
              crises={state.crises}
              selectedCrisis={selectedCrisis}
              statusPreset={crisisStatusPreset}
              onSelectCrisis={setSelectedCrisis}
              onUpdateCrisis={handleUpdateCrisis}
              onOpenNewCrisis={() => setIsNewCrisisOpen(true)}
            />
          )}

          {activeTab === 'sentiment' && (
            <SentimentAnalysis mentions={state.mentions} />
          )}

          {activeTab === 'responses' && (
            <ResponseCenter
              tickets={state.tickets}
              templates={state.templates}
              statusPreset={responseStatusPreset}
              onUpdateTicket={handleUpdateTicket}
              onUpdateTemplate={handleUpdateTemplate}
              onAddTemplate={handleAddTemplate}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsReports
              crises={state.crises}
              mentions={state.mentions}
              tickets={state.tickets}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPage
              settings={state.settings}
              onSaveSettings={handleSaveSettings}
              onResetDemoData={handleResetDemoData}
            />
          )}
        </DashboardShell>
      )}

      <NewCrisisModal
        isOpen={isNewCrisisOpen}
        onClose={() => setIsNewCrisisOpen(false)}
        onSubmit={handleAddCrisis}
      />
    </>
  );
}
