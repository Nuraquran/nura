import { ThemePreference } from '../../core/theme/theme.model';

export type ReaderFontScale = 'small' | 'medium' | 'large';

export interface Ayah {
  readonly id: number;
  readonly number: number;
  readonly arabic: string;
  readonly translation: string;
}

export type AyahAction = 'play' | 'bookmark' | 'share';

export interface AyahActionRequest {
  readonly action: AyahAction;
  readonly ayah: Ayah;
}

export interface SurahReaderData {
  readonly number: number;
  readonly name: string;
  readonly arabicName: string;
  readonly totalAyahs: number;
  readonly revelationPlace: string;
  readonly ayahs: readonly Ayah[];
}

export interface ReadingPreferences {
  readonly arabicFontSize: ReaderFontScale;
  readonly translationFontSize: ReaderFontScale;
  readonly showTranslation: boolean;
  readonly theme: ThemePreference;
}
