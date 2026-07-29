import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonToast,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  bookmark,
  bookmarkOutline,
  optionsOutline,
  playOutline,
  shareSocialOutline,
} from 'ionicons/icons';

import { BookmarkService } from '../../core/bookmarks/bookmark.service';
import { ThemeService } from '../../core/theme/theme.service';
import { AyahListComponent } from './components/ayah-list/ayah-list.component';
import { ReadingSettingsComponent } from './components/reading-settings/reading-settings.component';
import { READER_MOCK_DATA } from './reader.mock-data';
import {
  Ayah,
  AyahActionRequest,
  ReadingPreferences,
} from './reader.models';

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
    IonToast,
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
  private readonly bookmarkService = inject(BookmarkService);
  private readonly route = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);

  readonly surah = READER_MOCK_DATA;
  readonly settingsOpen = signal(false);
  readonly selectedAyah = signal<Ayah | null>(this.getInitialAyah());
  readonly toastMessage = signal('');
  readonly toastOpen = signal(false);
  readonly preferences = signal<ReadingPreferences>({
    arabicFontSize: 'medium',
    translationFontSize: 'medium',
    showTranslation: true,
    theme: this.themeService.preference(),
  });
  readonly selectedAyahBookmarked = computed(() => {
    const selectedAyah = this.selectedAyah();
    return selectedAyah
      ? this.bookmarkService.isBookmarked(
          this.surah.number,
          selectedAyah.number,
        )
      : false;
  });
  readonly bookmarkedAyahNumbers = computed(() =>
    this.bookmarkService
      .bookmarks()
      .filter((bookmark) => bookmark.surahNumber === this.surah.number)
      .map((bookmark) => bookmark.ayahNumber),
  );

  constructor() {
    addIcons({
      arrowBackOutline,
      bookmark,
      bookmarkOutline,
      optionsOutline,
      playOutline,
      shareSocialOutline,
    });

    afterNextRender(() => {
      const selectedAyah = this.selectedAyah();
      if (selectedAyah) {
        this.document
          .getElementById(`ayah-${selectedAyah.number}`)
          ?.scrollIntoView({ block: 'center' });
      }
    });
  }

  acknowledgeAudioPreview(ayah: Ayah | null = this.selectedAyah()): void {
    const context = ayah ? ` for ayah ${ayah.number}` : '';
    this.showToast(
      `Audio preview${context} is not available in this mock Reader V1.`,
    );
  }

  toggleSelectedAyahBookmark(ayah: Ayah | null = this.selectedAyah()): void {
    if (!ayah) {
      this.showToast('Select an ayah before adding a bookmark.');
      return;
    }

    const result = this.bookmarkService.toggle(this.surah.number, ayah.number);
    this.showToast(result === 'saved' ? 'Bookmark saved' : 'Bookmark removed');
  }

  async shareReading(ayah: Ayah | null = this.selectedAyah()): Promise<void> {
    const title = ayah
      ? `${this.surah.name}, ayah ${ayah.number}`
      : `Surah ${this.surah.name}`;
    const text = ayah
      ? `${ayah.arabic}\n\n${ayah.translation}\n\n${title} — Nura`
      : `Continue reading Surah ${this.surah.name} in Nura.`;

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, text });
        return;
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
      }
    }

    await this.copyShareText(text);
  }

  handleAyahAction(request: AyahActionRequest): void {
    if (request.action === 'play') {
      this.acknowledgeAudioPreview(request.ayah);
      return;
    }

    if (request.action === 'bookmark') {
      this.toggleSelectedAyahBookmark(request.ayah);
      return;
    }

    void this.shareReading(request.ayah);
  }

  updatePreferences(preferences: ReadingPreferences): void {
    this.preferences.set(preferences);
  }

  private async copyShareText(text: string): Promise<void> {
    if (!navigator.clipboard) {
      this.showToast('Sharing is not available on this device.');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      this.showToast('Reader text copied to the clipboard.');
    } catch {
      this.showToast('Sharing is not available on this device.');
    }
  }

  private showToast(message: string): void {
    this.toastMessage.set(message);
    this.toastOpen.set(true);
  }

  private getInitialAyah(): Ayah | null {
    const ayahNumber = Number(this.route.snapshot.queryParamMap.get('ayah'));

    if (!Number.isInteger(ayahNumber) || ayahNumber < 1) {
      return null;
    }

    return (
      this.surah.ayahs.find((ayah) => ayah.number === ayahNumber) ?? null
    );
  }
}
