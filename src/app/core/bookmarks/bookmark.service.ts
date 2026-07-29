import { Injectable, computed, inject, signal } from '@angular/core';

import { Bookmark, createBookmarkId } from './bookmark.model';
import { BOOKMARK_REPOSITORY } from './bookmark.repository';

export type BookmarkToggleResult = 'saved' | 'removed';

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  private readonly repository = inject(BOOKMARK_REPOSITORY);
  private readonly bookmarkState = signal<readonly Bookmark[]>(
    deduplicateBookmarks(this.repository.load()),
  );

  readonly bookmarks = computed(() =>
    [...this.bookmarkState()].sort((first, second) =>
      second.createdAt.localeCompare(first.createdAt),
    ),
  );

  isBookmarked(surahNumber: number, ayahNumber: number): boolean {
    const id = createBookmarkId(surahNumber, ayahNumber);
    return this.bookmarkState().some((bookmark) => bookmark.id === id);
  }

  toggle(surahNumber: number, ayahNumber: number): BookmarkToggleResult {
    const id = createBookmarkId(surahNumber, ayahNumber);

    if (this.isBookmarked(surahNumber, ayahNumber)) {
      this.remove(id);
      return 'removed';
    }

    const updatedBookmarks = [
      ...this.bookmarkState(),
      {
        id,
        surahNumber,
        ayahNumber,
        createdAt: new Date().toISOString(),
      },
    ];
    this.updateState(updatedBookmarks);
    return 'saved';
  }

  remove(id: string): void {
    const updatedBookmarks = this.bookmarkState().filter(
      (bookmark) => bookmark.id !== id,
    );

    if (updatedBookmarks.length !== this.bookmarkState().length) {
      this.updateState(updatedBookmarks);
    }
  }

  private updateState(bookmarks: readonly Bookmark[]): void {
    this.bookmarkState.set(bookmarks);
    this.repository.save(bookmarks);
  }
}

function deduplicateBookmarks(bookmarks: readonly Bookmark[]): Bookmark[] {
  return [
    ...new Map(bookmarks.map((bookmark) => [bookmark.id, bookmark])).values(),
  ];
}
