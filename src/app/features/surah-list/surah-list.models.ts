export type RevelationType = 'Makki' | 'Madani';

export interface SurahSummary {
  readonly number: number;
  readonly englishName: string;
  readonly arabicName: string;
  readonly revelationType: RevelationType;
  readonly totalAyahs: number;
}

export interface LastReadSurah {
  readonly surahNumber: number;
  readonly surahName: string;
  readonly lastAyah: number;
}
