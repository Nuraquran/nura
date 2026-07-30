export interface AudioState {
  readonly playing: boolean;
  readonly loading: boolean;
  readonly surahNumber: number;
  readonly ayahNumber: number;
  readonly reciterId: string;
  readonly progress: number;
  readonly duration: number;
}

export interface AudioPlaybackRequest {
  readonly surahNumber: number;
  readonly ayahNumber: number;
  readonly progress: number;
}

export interface AudioPlaybackCallbacks {
  readonly onReady: (duration: number) => void;
  readonly onProgress: (progress: number) => void;
  readonly onEnded: () => void;
}

export interface Reciter {
  readonly id: string;
  readonly name: string;
}
