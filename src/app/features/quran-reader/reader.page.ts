import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  bookmark,
  bookmarkOutline,
  checkmarkOutline,
  ellipsisHorizontal,
  optionsOutline,
  pauseOutline,
  playOutline,
  shareSocialOutline,
} from 'ionicons/icons';

import { ThemeService } from '../../core/theme/theme.service';
import { AyahListComponent } from './components/ayah-list/ayah-list.component';
import { ReadingSettingsComponent } from './components/reading-settings/reading-settings.component';
import { READER_MOCK_DATA } from './reader.mock-data';
import { ReadingPreferences } from './reader.models';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.page.html',
  styleUrl: './reader.page.scss',
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
    IonContent,
    IonFooter,
    AyahListComponent,
    ReadingSettingsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReaderPage {
  private readonly themeService = inject(ThemeService);

  readonly surah = READER_MOCK_DATA;
  readonly settingsOpen = signal(false);
  readonly isPlaying = signal(false);
  readonly isBookmarked = signal(false);
  readonly shareAcknowledged = signal(false);
  readonly preferences = signal<ReadingPreferences>({
    arabicFontSize: 'medium',
    translationFontSize: 'medium',
    showTranslation: true,
    theme: this.themeService.preference(),
  });

  constructor() {
    addIcons({
      arrowBackOutline,
      bookmark,
      bookmarkOutline,
      checkmarkOutline,
      ellipsisHorizontal,
      optionsOutline,
      pauseOutline,
      playOutline,
      shareSocialOutline,
    });
  }

  togglePlayback(): void {
    this.isPlaying.update((isPlaying) => !isPlaying);
  }

  toggleBookmark(): void {
    this.isBookmarked.update((isBookmarked) => !isBookmarked);
  }

  acknowledgeShare(): void {
    this.shareAcknowledged.set(true);
  }

  updatePreferences(preferences: ReadingPreferences): void {
    this.preferences.set(preferences);
  }
}
