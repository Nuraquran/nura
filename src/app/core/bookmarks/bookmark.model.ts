export interface Bookmark {
  readonly id: string;
  readonly surahNumber: number;
  readonly ayahNumber: number;
  readonly createdAt: string;
}

export function createBookmarkId(
  surahNumber: number,
  ayahNumber: number,
): string {
  return `${surahNumber}:${ayahNumber}`;
}
