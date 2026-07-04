import type { BandProgressPoint } from "@/features/progress/types/bandProgress";

export interface AccountProfileStats {
  totalEssays: number;
  totalEssaysGrowth: number;
  totalWords: number;
  totalWordsGrowth: number;
}

export interface AccountProfile {
  avatarUrl?: string;
  email: string;
  name: string;
  phone: string;
  streakDays: number;
  stats: AccountProfileStats;
  bandProgress: BandProgressPoint[];
}
