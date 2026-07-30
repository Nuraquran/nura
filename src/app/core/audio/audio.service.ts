import { Injectable, computed, inject, signal } from '@angular/core';

import {
  DEFAULT_RECITER_ID,
  RECITERS,
} from './audio.mock-data';
import { AudioState, Reciter } from './audio.models';
import { AUDIO_REPOSITORY } from './audio.repository';

const INACTIVE_AUDIO_STATE: Omit<AudioState, 'reciterId'> = {
  playing: false,
  loading: false,
  surahNumber: 0,
  ayahNumber: 0,
  progress: 0,
  duration: 0,
};

@Injectable({ providedIn: 'root' })
export class AudioService {
  private readonly repository = inject(AUDIO_REPOSITORY);
  private readonly audioState = signal<AudioState>({
    ...INACTIVE_AUDIO_STATE,
    reciterId: this.getInitialReciterId(),
  });

  readonly state = this.audioState.asReadonly();
  readonly active = computed(
    () =>
      this.audioState().surahNumber > 0 &&
      this.audioState().ayahNumber > 0,
  );
  readonly currentReciter = computed<Reciter>(
    () =>
      RECITERS.find(
        (reciter) => reciter.id === this.audioState().reciterId,
      ) ?? RECITERS[0],
  );

  toggle(surahNumber: number, ayahNumber: number): void {
    const state = this.audioState();
    const isCurrentAyah =
      state.surahNumber === surahNumber && state.ayahNumber === ayahNumber;

    if (isCurrentAyah && (state.playing || state.loading)) {
      this.pause();
      return;
    }

    this.play(surahNumber, ayahNumber);
  }

  play(surahNumber: number, ayahNumber: number): void {
    const state = this.audioState();
    const canResume =
      state.surahNumber === surahNumber &&
      state.ayahNumber === ayahNumber &&
      state.duration > 0 &&
      state.progress < state.duration;

    if (canResume) {
      this.repository.resume();
      this.audioState.update((current) => ({
        ...current,
        playing: true,
        loading: false,
      }));
      return;
    }

    this.startAyah(surahNumber, ayahNumber);
  }

  pause(): void {
    this.repository.pause();
    this.audioState.update((state) => ({
      ...state,
      playing: false,
      loading: false,
    }));
  }

  next(maxAyahNumber: number): void {
    const state = this.audioState();
    if (!this.active() || state.ayahNumber >= maxAyahNumber) {
      return;
    }

    this.startAyah(state.surahNumber, state.ayahNumber + 1);
  }

  previous(minAyahNumber = 1): void {
    const state = this.audioState();
    if (!this.active() || state.ayahNumber <= minAyahNumber) {
      return;
    }

    this.startAyah(state.surahNumber, state.ayahNumber - 1);
  }

  setReciter(reciterId: string): void {
    if (!RECITERS.some((reciter) => reciter.id === reciterId)) {
      return;
    }

    this.audioState.update((state) => ({ ...state, reciterId }));
    this.repository.saveReciterId(reciterId);
  }

  stop(): void {
    const reciterId = this.audioState().reciterId;
    this.repository.stop();
    this.audioState.set({ ...INACTIVE_AUDIO_STATE, reciterId });
  }

  private startAyah(surahNumber: number, ayahNumber: number): void {
    this.audioState.update((state) => ({
      ...state,
      playing: false,
      loading: true,
      surahNumber,
      ayahNumber,
      progress: 0,
      duration: 0,
    }));

    this.repository.start(
      { surahNumber, ayahNumber, progress: 0 },
      {
        onReady: (duration) => {
          this.audioState.update((state) => ({
            ...state,
            playing: true,
            loading: false,
            duration,
          }));
        },
        onProgress: (progress) => {
          this.audioState.update((state) => ({ ...state, progress }));
        },
        onEnded: () => {
          this.audioState.update((state) => ({
            ...state,
            playing: false,
            loading: false,
          }));
        },
      },
    );
  }

  private getInitialReciterId(): string {
    const storedReciterId = this.repository.loadReciterId();
    return RECITERS.some((reciter) => reciter.id === storedReciterId)
      ? (storedReciterId ?? DEFAULT_RECITER_ID)
      : DEFAULT_RECITER_ID;
  }
}
