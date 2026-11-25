import {
  CrisisSeverity,
  CrisisStatus,
  Platform,
  ResponseStatus,
  SentimentType,
} from '../types/crisly';

export function getSentimentStyle(sentiment: SentimentType) {
  switch (sentiment) {
    case 'Positive':
      return {
        label: 'Positive',
        badge: 'bg-emerald-100/90 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
      };
    case 'Neutral':
      return {
        label: 'Neutral',
        badge: 'bg-[#FFF1C7] text-[#7A5608] border-amber-200',
        dot: 'bg-amber-400',
      };
    case 'Negative':
      return {
        label: 'Negative',
        badge: 'bg-[#FFD6E7] text-[#9D174D] border-pink-300',
        dot: 'bg-rose-500',
      };
  }
}

export function getSeverityStyle(severity: CrisisSeverity) {
  switch (severity) {
    case 'Low':
      return 'bg-[#D9EEFF] text-[#1E40AF] border-sky-200';
    case 'Medium':
      return 'bg-[#FFF1C7] text-[#7A5608] border-amber-200';
    case 'High':
      return 'bg-[#FFE0D1] text-[#9A3412] border-orange-200';
    case 'Critical':
      return 'bg-[#FFD6E7] text-[#9D174D] border-pink-300';
  }
}

export function getCrisisStatusStyle(status: CrisisStatus) {
  switch (status) {
    case 'Monitoring':
      return 'bg-[#E8DFFF] text-[#5B21B6] border-purple-200';
    case 'In Progress':
      return 'bg-[#FFF1C7] text-[#7A5608] border-amber-200';
    case 'Resolved':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  }
}

export function getResponseStatusStyle(status: ResponseStatus) {
  switch (status) {
    case 'Pending':
      return 'bg-[#FFD6E7] text-[#9D174D] border-pink-200';
    case 'Replied':
      return 'bg-[#D9EEFF] text-[#1E40AF] border-sky-200';
    case 'Reviewed':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  }
}

export function getPlatformTint(platform: Platform) {
  switch (platform) {
    case 'Instagram':
      return 'bg-gradient-to-br from-[#FFD6E7] to-[#FFE0D1] text-[#831843]';
    case 'TikTok':
      return 'bg-gradient-to-br from-[#E8DFFF] to-[#D9EEFF] text-[#4C1D95]';
    case 'X':
      return 'bg-[#F1EFF8] text-[#353044]';
    case 'Facebook':
      return 'bg-[#D9EEFF] text-[#1E3A8A]';
  }
}

export function getCurrentTimeLabel(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  return `Today, ${hours}:${mins}`;
}
