import type { AccountProfile } from "../types/accountProfile";

export const accountProfileMock: AccountProfile = {
  avatarUrl:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=360&q=80",
  email: "khangquach@gmail.com",
  name: "Khang Quach",
  phone: "0816 345 345",
  streakDays: 36,
  stats: {
    totalEssays: 37,
    totalEssaysGrowth: 3,
    totalWords: 300,
    totalWordsGrowth: 16,
  },
  bandProgress: [
    { attempt: 32, band: 7, label: "7" },
    { attempt: 33, band: 7, label: "7" },
    { attempt: 34, band: 8, label: "8" },
    { attempt: 35, band: 8, label: "8" },
    { attempt: 36, band: 7.5, label: "7.5" },
    { attempt: 37, band: 6, label: "6" },
  ],
};
