import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bookmarkOutline, trashOutline } from 'ionicons/icons';

import { Bookmark } from '../../core/bookmarks/bookmark.model';
import { BookmarkService } from '../../core/bookmarks/bookmark.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { PageContainerComponent } from '../../shared/components/page-container/page-container.component';
import { SURAHS } from '../surah-list/surah-list.mock-data';
import { BookmarkListItem } from './bookmark-page.models';

@Component({
  selector: 'app-bookmark-page',
  templateUrl: './bookmark.page.html',
  styleUrl: './bookmark.page.scss',
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    EmptyStateComponent,
    PageContainerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkPage {
  private readonly bookmarkService = inject(BookmarkService);

  readonly bookmarkItems = computed<readonly BookmarkListItem[]>(() =>
    this.bookmarkService.bookmarks().map((bookmark) => ({
      bookmark,
      surahName: this.getSurahName(bookmark.surahNumber),
      dateLabel: formatBookmarkDate(bookmark.createdAt),
    })),
  );

  constructor() {
    addIcons({ bookmarkOutline, trashOutline });
  }

  removeBookmark(id: Bookmark['id']): void {
    this.bookmarkService.remove(id);
  }

  trackByBookmarkId(
    _index: number,
    item: BookmarkListItem,
  ): Bookmark['id'] {
    return item.bookmark.id;
  }

  private getSurahName(surahNumber: number): string {
    return (
      SURAHS.find((surah) => surah.number === surahNumber)?.englishName ??
      `Surah ${surahNumber}`
    );
  }
}

function formatBookmarkDate(createdAt: string): string {
  const createdDate = startOfDay(new Date(createdAt));
  const today = startOfDay(new Date());
  const daysAgo = Math.round(
    (today.getTime() - createdDate.getTime()) / (24 * 60 * 60 * 1000),
  );

  if (daysAgo === 0) {
    return 'Added today';
  }

  if (daysAgo === 1) {
    return 'Added yesterday';
  }

  return `Added ${new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(createdDate)}`;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
