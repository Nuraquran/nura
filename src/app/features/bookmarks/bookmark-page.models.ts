import { Bookmark } from '../../core/bookmarks/bookmark.model';

export interface BookmarkListItem {
  readonly bookmark: Bookmark;
  readonly surahName: string;
  readonly dateLabel: string;
}
