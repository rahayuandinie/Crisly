export type Platform = 'Instagram' | 'TikTok' | 'X' | 'Facebook';

export type SentimentType = 'Positive' | 'Neutral' | 'Negative';

export type CrisisSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export type CrisisStatus = 'Monitoring' | 'In Progress' | 'Resolved';

export type ResponseStatus = 'Pending' | 'Replied' | 'Reviewed';

export type DashboardTab =
  | 'dashboard'
  | 'monitoring'
  | 'management'
  | 'sentiment'
  | 'responses'
  | 'analytics'
  | 'settings';

export interface SocialMention {
  id: string;
  author: string;
  handle: string;
  platform: Platform;
  content: string;
  sentiment: SentimentType;
  severity: CrisisSeverity;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  hashtags: string[];
  escalatedToCrisisId?: string;
}

export interface ChronologyEntry {
  id: string;
  time: string;
  event: string;
  actor: string;
}

export interface CrisisItem {
  id: string;
  code: string;
  title: string;
  platform: Platform;
  description: string;
  dateTime: string;
  severity: CrisisSeverity;
  status: CrisisStatus;
  resolutionMinutes?: number;
  sourceMentions: string[];
  chronology: ChronologyEntry[];
  actionsTaken: string[];
}

export interface ResponseTicket {
  id: string;
  author: string;
  handle: string;
  platform: Platform;
  comment: string;
  timestamp: string;
  severity: CrisisSeverity;
  status: ResponseStatus;
  replyText: string;
  repliedAt?: string;
}

export interface ResponseTemplate {
  id: string;
  title: string;
  category: string;
  content: string;
}

export interface ActivityItem {
  id: string;
  time: string;
  text: string;
  type: 'alert' | 'reply' | 'resolved' | 'mention';
}

export interface DailySentimentPoint {
  day: string;
  positive: number;
  neutral: number;
  negative: number;
}

export interface WorkspaceSettings {
  brandName: string;
  guardianName: string;
  guardianRole: string;
  alertThreshold: 'All Negative' | 'High & Critical Only' | 'Critical Only';
  emailDigest: boolean;
  soundAlerts: boolean;
}

export interface CrislyState {
  mentions: SocialMention[];
  crises: CrisisItem[];
  tickets: ResponseTicket[];
  templates: ResponseTemplate[];
  activities: ActivityItem[];
  settings: WorkspaceSettings;
}
