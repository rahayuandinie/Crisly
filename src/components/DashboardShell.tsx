import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  BellRing,
  CheckCircle2,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Flame,
  Heart,
  HeartHandshake,
  Home,
  LayoutDashboard,
  Menu,
  MessageSquareHeart,
  Plus,
  RotateCcw,
  Settings,
  ShieldAlert,
  Sliders,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react';
import {
  CrisisStatus,
  DashboardTab,
  ResponseStatus,
  SentimentType,
  WorkspaceSettings,
} from '../types/crisly';
import { CrislyLogo } from './CrislyLogo';
import { CuteTooltip, SparkleButton } from './CutePrimitives';

export interface SubmenuAction {
  id: string;
  label: string;
  description: string;
  icon: typeof LayoutDashboard;
  tab?: DashboardTab;
  monitoringSentiment?: SentimentType | 'All';
  crisisStatus?: CrisisStatus | 'All';
  responseStatus?: ResponseStatus | 'All';
  openNewCrisis?: boolean;
}

interface NavConfig {
  id: DashboardTab;
  label: string;
  icon: typeof LayoutDashboard;
  pastelAccent: string;
  hoverBg: string;
  subHeaderBg: string;
  submenuTitle: string;
  submenuItems: SubmenuAction[];
}

const NAV_CONFIG: NavConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    pastelAccent: 'text-[#6D28D9]',
    hoverBg: 'hover:bg-[#E8DFFF]/60',
    subHeaderBg: 'from-[#E8DFFF]/85 to-[#FFD6E7]/70',
    submenuTitle: 'Command Overview',
    submenuItems: [
      {
        id: 'dash-home',
        label: 'Daily Brand Pulse',
        description: 'Stats, charts & recent mentions',
        icon: Activity,
        tab: 'dashboard',
      },
      {
        id: 'dash-alerts',
        label: 'Active Crisis Alerts',
        description: 'Jump to urgent brand issues',
        icon: BellRing,
        tab: 'management',
        crisisStatus: 'In Progress',
      },
      {
        id: 'dash-sentiment',
        label: 'Sentiment Snapshot',
        description: 'Inspect positive vs. negative mood',
        icon: TrendingUp,
        tab: 'sentiment',
      },
    ],
  },
  {
    id: 'monitoring',
    label: 'Crisis Monitoring',
    icon: Eye,
    pastelAccent: 'text-[#1E40AF]',
    hoverBg: 'hover:bg-[#D9EEFF]/70',
    subHeaderBg: 'from-[#D9EEFF]/85 to-[#E8DFFF]/70',
    submenuTitle: 'Live Mentions Feed',
    submenuItems: [
      {
        id: 'mon-all',
        label: 'All Social Mentions',
        description: 'Instagram, TikTok, X & Facebook',
        icon: Eye,
        tab: 'monitoring',
        monitoringSentiment: 'All',
      },
      {
        id: 'mon-neg',
        label: 'Negative Comments',
        description: 'Spot complaints & high severity',
        icon: AlertTriangle,
        tab: 'monitoring',
        monitoringSentiment: 'Negative',
      },
      {
        id: 'mon-pos',
        label: 'Positive Love Notes',
        description: 'See happy customer shoutouts',
        icon: Heart,
        tab: 'monitoring',
        monitoringSentiment: 'Positive',
      },
    ],
  },
  {
    id: 'management',
    label: 'Crisis Management',
    icon: ShieldAlert,
    pastelAccent: 'text-[#9D174D]',
    hoverBg: 'hover:bg-[#FFD6E7]/70',
    subHeaderBg: 'from-[#FFD6E7]/85 to-[#FFE0D1]/70',
    submenuTitle: 'Crisis Workflow',
    submenuItems: [
      {
        id: 'mgmt-all',
        label: 'All Tracked Crises',
        description: 'Full board & timeline cards',
        icon: ShieldAlert,
        tab: 'management',
        crisisStatus: 'All',
      },
      {
        id: 'mgmt-active',
        label: 'In Progress Cases',
        description: 'Active crises needing action',
        icon: Flame,
        tab: 'management',
        crisisStatus: 'In Progress',
      },
      {
        id: 'mgmt-resolved',
        label: 'Resolved Archive',
        description: 'Completed crisis playbooks',
        icon: CheckCircle2,
        tab: 'management',
        crisisStatus: 'Resolved',
      },
      {
        id: 'mgmt-new',
        label: 'Report New Crisis',
        description: 'Log a fresh social incident',
        icon: Plus,
        openNewCrisis: true,
      },
    ],
  },
  {
    id: 'sentiment',
    label: 'Sentiment Analysis',
    icon: HeartHandshake,
    pastelAccent: 'text-[#9A3412]',
    hoverBg: 'hover:bg-[#FFF1C7]/80',
    subHeaderBg: 'from-[#FFF1C7]/90 to-[#FFE0D1]/70',
    submenuTitle: 'Audience Mood Insights',
    submenuItems: [
      {
        id: 'sent-dist',
        label: 'Sentiment Distribution',
        description: 'Positive, Neutral & Negative mix',
        icon: HeartHandshake,
        tab: 'sentiment',
      },
      {
        id: 'sent-trends',
        label: '7-Day Trend & Keywords',
        description: 'Hashtags & platform breakdown',
        icon: TrendingUp,
        tab: 'sentiment',
      },
    ],
  },
  {
    id: 'responses',
    label: 'Response Center',
    icon: MessageSquareHeart,
    pastelAccent: 'text-[#9D174D]',
    hoverBg: 'hover:bg-[#FFE0D1]/75',
    subHeaderBg: 'from-[#FFE0D1]/85 to-[#FFD6E7]/70',
    submenuTitle: 'Empathetic Replies',
    submenuItems: [
      {
        id: 'res-pending',
        label: 'Pending Queue',
        description: 'Comments waiting for a reply',
        icon: MessageSquareHeart,
        tab: 'responses',
        responseStatus: 'Pending',
      },
      {
        id: 'res-replied',
        label: 'Replied & Reviewed',
        description: 'Check completed responses',
        icon: CheckCircle2,
        tab: 'responses',
        responseStatus: 'Replied',
      },
      {
        id: 'res-templates',
        label: 'Editable Templates',
        description: 'Customize & copy fast replies',
        icon: FileText,
        tab: 'responses',
        responseStatus: 'All',
      },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics & Reports',
    icon: BarChart3,
    pastelAccent: 'text-[#5B21B6]',
    hoverBg: 'hover:bg-[#E8DFFF]/70',
    subHeaderBg: 'from-[#E8DFFF]/85 to-[#D9EEFF]/70',
    submenuTitle: 'Metrics & Exports',
    submenuItems: [
      {
        id: 'ana-metrics',
        label: 'Resolution & Engagement',
        description: 'Weekly frequency & SLA speed',
        icon: BarChart3,
        tab: 'analytics',
      },
      {
        id: 'ana-csv',
        label: 'Crisis History & CSV',
        description: 'Review & export crisis log',
        icon: Download,
        tab: 'analytics',
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    pastelAccent: 'text-[#1E3A8A]',
    hoverBg: 'hover:bg-[#D9EEFF]/70',
    subHeaderBg: 'from-[#D9EEFF]/85 to-[#FFF1C7]/70',
    submenuTitle: 'Workspace Setup',
    submenuItems: [
      {
        id: 'set-brand',
        label: 'Brand & Alert Rules',
        description: 'Profile, threshold & chimes',
        icon: Sliders,
        tab: 'settings',
      },
      {
        id: 'set-reset',
        label: 'Restore Demo Data',
        description: 'Reset localStorage to default',
        icon: RotateCcw,
        tab: 'settings',
      },
    ],
  },
];

interface DashboardShellProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  onSubmenuAction: (action: SubmenuAction) => void;
  onOpenNewCrisis: () => void;
  onBackToLanding: () => void;
  activeCrisisCount: number;
  pendingResponseCount: number;
  settings: WorkspaceSettings;
  children: React.ReactNode;
}

export function DashboardShell({
  activeTab,
  onSelectTab,
  onSubmenuAction,
  onOpenNewCrisis,
  onBackToLanding,
  activeCrisisCount,
  pendingResponseCount,
  settings,
  children,
}: DashboardShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<DashboardTab | null>(null);
  const [mobileExpandedNav, setMobileExpandedNav] =
    useState<DashboardTab | null>(activeTab);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const openHoverMenu = (id: DashboardTab) => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setHoveredNav(id);
  };

  const scheduleCloseMenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setHoveredNav(null);
    }, 140);
  };

  const currentNavLabel =
    NAV_CONFIG.find((item) => item.id === activeTab)?.label ?? 'Dashboard';

  const handlePrimaryClick = (tab: DashboardTab) => {
    onSelectTab(tab);
    setHoveredNav(null);
    setMobileMenuOpen(false);
  };

  const handleSubClick = (action: SubmenuAction) => {
    onSubmenuAction(action);
    setHoveredNav(null);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFCFA] text-[#353044] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-72 shrink-0 bg-white border-r border-[#EFE8F6] sticky top-0 h-screen overflow-visible z-40">
        <div className="flex flex-col h-full justify-between p-4">
          <div className="space-y-5">
            <div className="flex items-center justify-between px-2 pt-1">
              <CuteTooltip label="Back to Landing Page" position="bottom">
                <button
                  type="button"
                  onClick={onBackToLanding}
                  className="hover:scale-[1.03] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] rounded-xl"
                >
                  <CrislyLogo />
                </button>
              </CuteTooltip>
            </div>

            {/* Active Brand Card with soft decorative shapes */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFD6E7]/55 via-[#E8DFFF]/60 to-[#D9EEFF]/55 border border-white p-3.5 shadow-xs">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -top-3 w-12 h-12 rounded-full bg-white/40"
              />
              <p className="text-[11px] font-bold text-[#6D28D9]">Active Brand</p>
              <p className="font-display text-sm font-extrabold text-[#353044] truncate mt-0.5">
                {settings.brandName}
              </p>
              <p className="text-[11px] text-[#5C5470] mt-0.5 truncate">
                {settings.guardianName} · {settings.guardianRole}
              </p>
            </div>

            {/* Interactive Hover Dropdown Navigation */}
            <nav aria-label="Workspace navigation" className="space-y-1.5">
              {NAV_CONFIG.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const isHovered = hoveredNav === item.id;
                const badgeCount =
                  item.id === 'management'
                    ? activeCrisisCount
                    : item.id === 'responses'
                      ? pendingResponseCount
                      : 0;

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => openHoverMenu(item.id)}
                    onMouseLeave={scheduleCloseMenu}
                  >
                    <button
                      type="button"
                      onClick={() => handlePrimaryClick(item.id)}
                      onFocus={() => openHoverMenu(item.id)}
                      aria-expanded={isHovered}
                      aria-haspopup="menu"
                      className={`group relative w-full min-h-[46px] px-3.5 py-2.5 rounded-full flex items-center justify-between gap-2 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] ${
                        isActive
                          ? 'animate-float-nav bg-gradient-to-r from-[#FFD6E7]/85 via-[#E8DFFF]/90 to-[#F3EEFF] text-[#353044] shadow-sm shadow-[#E8DFFF]/70'
                          : isHovered
                            ? `bg-[#F7F3FF] text-[#353044] translate-x-1 ${item.hoverBg}`
                            : `text-[#5C5470] hover:text-[#353044] hover:translate-x-1 ${item.hoverBg}`
                      }`}
                    >
                      {/* Pill-shaped left indicator */}
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-5 rounded-full bg-gradient-to-b from-[#EC4899] to-[#7C3AED]"
                        />
                      )}

                      <span className="flex items-center gap-3 min-w-0 pl-1">
                        <span
                          className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 ${
                            isActive || isHovered
                              ? 'bg-white shadow-xs'
                              : 'bg-transparent'
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:-rotate-8 group-hover:-translate-y-0.5 ${
                              isActive || isHovered
                                ? item.pastelAccent
                                : 'text-[#7A7094]'
                            }`}
                            aria-hidden="true"
                          />

                          {/* Tiny sparkle animations around selected menu item */}
                          {isActive && (
                            <>
                              <svg
                                aria-hidden="true"
                                width="9"
                                height="9"
                                viewBox="0 0 12 12"
                                className="animate-sparkle absolute -top-1 -right-1 text-[#EC4899]"
                              >
                                <path
                                  d="M6 0L7.3 4.7L12 6L7.3 7.3L6 12L4.7 7.3L0 6L4.7 4.7L6 0Z"
                                  fill="currentColor"
                                />
                              </svg>
                              <svg
                                aria-hidden="true"
                                width="7"
                                height="7"
                                viewBox="0 0 12 12"
                                style={{ animationDelay: '700ms' }}
                                className="animate-sparkle absolute -bottom-0.5 -left-1 text-[#7C3AED]"
                              >
                                <path
                                  d="M6 0L7.3 4.7L12 6L7.3 7.3L6 12L4.7 7.3L0 6L4.7 4.7L6 0Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </>
                          )}
                        </span>
                        <span className="truncate whitespace-nowrap">
                          {item.label}
                        </span>
                      </span>

                      <span className="flex items-center gap-1.5 shrink-0">
                        {badgeCount > 0 && (
                          <span
                            className={`animate-badge-bounce text-[11px] font-mono font-bold px-2 py-0.5 rounded-full tabular-nums ${
                              isActive
                                ? 'bg-white text-[#6D28D9] shadow-xs'
                                : 'bg-[#FFD6E7] text-[#9D174D]'
                            }`}
                          >
                            {badgeCount}
                          </span>
                        )}
                        <ChevronRight
                          className={`w-3.5 h-3.5 text-[#948CA8] transition-all duration-200 ${
                            isHovered
                              ? 'translate-x-0.5 text-[#6D28D9] opacity-100'
                              : 'opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5'
                          }`}
                          aria-hidden="true"
                        />
                      </span>
                    </button>

                    {/* Floating Pastel Pop-Up Submenu (Fade-in + Slide-down animation) */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          role="menu"
                          aria-label={`${item.label} submenu`}
                          initial={{ opacity: 0, y: -10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{
                            duration: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          onMouseEnter={() => openHoverMenu(item.id)}
                          onMouseLeave={scheduleCloseMenu}
                          className="absolute left-full top-0 ml-3 w-70 z-50"
                        >
                          {/* Invisible hover bridge so cursor smoothly crosses the gap */}
                          <div
                            aria-hidden="true"
                            className="absolute -left-4 top-0 w-4 h-full"
                          />

                          <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-[#EFE8F6] shadow-2xl shadow-[#A78BFA]/20 p-2.5 space-y-1.5">
                            <div
                              className={`rounded-2xl bg-gradient-to-r ${item.subHeaderBg} px-3.5 py-2 flex items-center justify-between`}
                            >
                              <span className="text-xs font-extrabold text-[#353044]">
                                {item.submenuTitle}
                              </span>
                              <Sparkles
                                className="w-3.5 h-3.5 text-[#6D28D9] animate-sparkle"
                                aria-hidden="true"
                              />
                            </div>

                            <div className="space-y-1">
                              {item.submenuItems.map((sub) => {
                                const SubIcon = sub.icon;
                                return (
                                  <button
                                    key={sub.id}
                                    role="menuitem"
                                    type="button"
                                    onClick={() => handleSubClick(sub)}
                                    className={`group/sub w-full text-left px-3 py-2.5 rounded-2xl flex items-start gap-3 transition-all duration-150 ${item.hoverBg} hover:translate-x-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]`}
                                  >
                                    <span className="w-8 h-8 rounded-2xl bg-[#FFFCFA] border border-[#EFE8F6] flex items-center justify-center shrink-0 mt-0.5 group-hover/sub:scale-110 group-hover/sub:-rotate-6 group-hover/sub:border-[#A78BFA] transition-all">
                                      <SubIcon
                                        className={`w-4 h-4 ${item.pastelAccent}`}
                                        aria-hidden="true"
                                      />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <span className="block text-xs font-extrabold text-[#353044] leading-snug">
                                        {sub.label}
                                      </span>
                                      <span className="block text-[11px] text-[#6E6584] leading-snug mt-0.5">
                                        {sub.description}
                                      </span>
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-[#EFE8F6]">
            <button
              type="button"
              onClick={onBackToLanding}
              className="group w-full min-h-[42px] px-3.5 py-2 rounded-full text-xs font-bold text-[#5C5470] hover:text-[#353044] hover:bg-[#FFF1C7]/70 flex items-center gap-2.5 transition-all hover:translate-x-0.5"
            >
              <Home
                className="w-4 h-4 shrink-0 group-hover:scale-110 group-hover:-rotate-6 transition-transform"
                aria-hidden="true"
              />
              <span>Back to Landing Page</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-[#353044]/35 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-76 max-w-[85vw] bg-white h-full shadow-2xl overflow-y-auto p-4 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between px-2 pt-1">
                  <button
                    type="button"
                    onClick={onBackToLanding}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] rounded-xl"
                  >
                    <CrislyLogo />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close navigation menu"
                    className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-2xl text-[#5C5470] hover:bg-[#F5F0FF]"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="rounded-3xl bg-gradient-to-br from-[#FFD6E7]/50 via-[#E8DFFF]/55 to-[#D9EEFF]/50 border border-white p-3.5">
                  <p className="text-[11px] font-bold text-[#6D28D9]">
                    Active Brand
                  </p>
                  <p className="font-display text-sm font-extrabold text-[#353044] truncate mt-0.5">
                    {settings.brandName}
                  </p>
                  <p className="text-[11px] text-[#5C5470] mt-0.5 truncate">
                    {settings.guardianName} · {settings.guardianRole}
                  </p>
                </div>

                <nav aria-label="Mobile navigation" className="space-y-1.5">
                  {NAV_CONFIG.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    const isExpanded = mobileExpandedNav === item.id;
                    const badgeCount =
                      item.id === 'management'
                        ? activeCrisisCount
                        : item.id === 'responses'
                          ? pendingResponseCount
                          : 0;

                    return (
                      <div key={item.id} className="space-y-1">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handlePrimaryClick(item.id)}
                            className={`flex-1 min-h-[44px] px-3.5 py-2.5 rounded-full flex items-center justify-between gap-2 text-sm font-bold transition-all ${
                              isActive
                                ? 'bg-gradient-to-r from-[#FFD6E7]/80 to-[#E8DFFF]/85 text-[#353044]'
                                : `text-[#5C5470] ${item.hoverBg}`
                            }`}
                          >
                            <span className="flex items-center gap-2.5 min-w-0">
                              <Icon
                                className={`w-4 h-4 shrink-0 ${
                                  isActive
                                    ? item.pastelAccent
                                    : 'text-[#7A7094]'
                                }`}
                                aria-hidden="true"
                              />
                              <span className="truncate">{item.label}</span>
                            </span>
                            {badgeCount > 0 && (
                              <span className="animate-badge-bounce text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFD6E7] text-[#9D174D] tabular-nums">
                                {badgeCount}
                              </span>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setMobileExpandedNav(isExpanded ? null : item.id)
                            }
                            aria-label={`Toggle ${item.label} submenu`}
                            className="min-w-[38px] min-h-[44px] flex items-center justify-center rounded-full text-[#6E6584] hover:bg-[#F5F0FF]"
                          >
                            <ChevronRight
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? 'rotate-90 text-[#6D28D9]' : ''
                              }`}
                              aria-hidden="true"
                            />
                          </button>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.16 }}
                              className="pl-4 pr-1 py-1 space-y-1"
                            >
                              {item.submenuItems.map((sub) => {
                                const SubIcon = sub.icon;
                                return (
                                  <button
                                    key={sub.id}
                                    type="button"
                                    onClick={() => handleSubClick(sub)}
                                    className={`w-full text-left px-3 py-2 rounded-2xl flex items-center gap-2.5 text-xs font-bold text-[#4A435E] ${item.hoverBg} transition-colors`}
                                  >
                                    <SubIcon
                                      className={`w-3.5 h-3.5 shrink-0 ${item.pastelAccent}`}
                                      aria-hidden="true"
                                    />
                                    <span>{sub.label}</span>
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-[#EFE8F6]">
                <button
                  type="button"
                  onClick={onBackToLanding}
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-full text-xs font-bold text-[#5C5470] hover:text-[#353044] hover:bg-[#FFF1C7]/60 flex items-center gap-2.5"
                >
                  <Home className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Back to Landing Page</span>
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 bg-[#FFFCFA]/90 backdrop-blur-md border-b border-[#EFE8F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="lg:hidden min-w-[44px] min-h-[44px] -ml-2 flex items-center justify-center rounded-2xl text-[#353044] hover:bg-[#F3EEF9]"
              >
                <Menu className="w-5 h-5" aria-hidden="true" />
              </button>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-[#7C3AED] hidden sm:block">
                  CRISLY Workspace
                </p>
                <h2 className="font-display text-base sm:text-lg font-extrabold text-[#353044] truncate">
                  {currentNavLabel}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <CuteTooltip label="Signed in as Brand Guardian" position="bottom">
                <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#5C5470] bg-[#F5F0FF] px-3.5 py-2 rounded-full cursor-default">
                  <Sparkles
                    className="w-3.5 h-3.5 text-[#7C3AED] animate-sparkle"
                    aria-hidden="true"
                  />
                  <span>{settings.guardianName}</span>
                </div>
              </CuteTooltip>

              <CuteTooltip label="Log a new social crisis" position="bottom">
                <SparkleButton
                  type="button"
                  onClick={onOpenNewCrisis}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-4.5 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:shadow-lg hover:shadow-[#FFD6E7]/70 rounded-full shadow-sm shadow-[#A78BFA]/30 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]"
                >
                  <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Report Crisis</span>
                </SparkleButton>
              </CuteTooltip>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
