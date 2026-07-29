import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

import { Bookmark, createBookmarkId } from './bookmark.model';
import { BookmarkRepository } from './bookmark.repository';

const STORAGE_KEY = 'nura.bookmarks.v1';

@Injectable({ providedIn: 'root' })
export class LocalStorageBookmarkRepository implements BookmarkRepository {
  private readonly document = inject(DOCUMENT);

  load(): readonly Bookmark[] {
    const storage = this.document.defaultView?.localStorage;

    if (!storage) {
      return [];
    }

    try {
      const value: unknown = JSON.parse(storage.getItem(STORAGE_KEY) ?? '[]');
      return Array.isArray(value) ? value.filter(isBookmark) : [];
    } catch {
      return [];
    }
  }

  save(bookmarks: readonly Bookmark[]): void {
    try {
      this.document.defaultView?.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(bookmarks),
      );
    } catch {
      // Bookmark state remains usable for this session if storage is unavailable.
    }
  }
}

function isBookmark(value: unknown): value is Bookmark {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate['id'] === 'string' &&
    typeof candidate['surahNumber'] === 'number' &&
    Number.isInteger(candidate['surahNumber']) &&
    typeof candidate['ayahNumber'] === 'number' &&
    Number.isInteger(candidate['ayahNumber']) &&
    typeof candidate['createdAt'] === 'string' &&
    !Number.isNaN(Date.parse(candidate['createdAt'])) &&
    candidate['id'] ===
      createBookmarkId(candidate['surahNumber'], candidate['ayahNumber'])
  );
}
