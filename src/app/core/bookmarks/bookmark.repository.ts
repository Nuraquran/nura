import { InjectionToken, inject } from '@angular/core';

import { Bookmark } from './bookmark.model';
import { LocalStorageBookmarkRepository } from './local-storage-bookmark.repository';

export interface BookmarkRepository {
  load(): readonly Bookmark[];
  save(bookmarks: readonly Bookmark[]): void;
}

export const BOOKMARK_REPOSITORY = new InjectionToken<BookmarkRepository>(
  'BOOKMARK_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => inject(LocalStorageBookmarkRepository),
  },
);
