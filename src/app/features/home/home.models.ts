export interface HomeUser {
  readonly name: string;
  readonly initials: string;
}

export interface PrayerSummary {
  readonly name: string;
  readonly time: string;
  readonly countdown: string;
  readonly location: string;
  readonly hijriDate: string;
}

export interface ReadingProgress {
  readonly surahNumber: number;
  readonly surahName: string;
  readonly lastAyah: number;
  readonly totalAyahs: number;
  readonly juz: number;
  readonly progress: number;
}

export interface QuickAction {
  readonly label: string;
  readonly icon: string;
  readonly route: string;
}

export interface DailyVerse {
  readonly arabic: string;
  readonly translation: string;
  readonly surahName: string;
  readonly ayahNumber: number;
}

export interface KhatamProgress {
  readonly percentage: number;
  readonly completedPages: number;
  readonly totalPages: number;
  readonly target: string;
}

export interface RecentSurah {
  readonly number: number;
  readonly name: string;
  readonly arabicName: string;
  readonly totalAyahs: number;
  readonly lastAyah: number;
  readonly progress: number;
}

export interface HomeViewModel {
  readonly user: HomeUser;
  readonly prayer: PrayerSummary;
  readonly reading: ReadingProgress;
  readonly quickActions: readonly QuickAction[];
  readonly dailyVerse: DailyVerse;
  readonly khatam: KhatamProgress;
  readonly recentSurahs: readonly RecentSurah[];
}
