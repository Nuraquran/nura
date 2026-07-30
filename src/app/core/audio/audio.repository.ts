import { InjectionToken, inject } from '@angular/core';

import {
  AudioPlaybackCallbacks,
  AudioPlaybackRequest,
} from './audio.models';
import { MockAudioProvider } from './mock-audio.provider';

export interface AudioRepository {
  start(
    request: AudioPlaybackRequest,
    callbacks: AudioPlaybackCallbacks,
  ): void;
  pause(): void;
  resume(): void;
  stop(): void;
  loadReciterId(): string | null;
  saveReciterId(reciterId: string): void;
}

export const AUDIO_REPOSITORY = new InjectionToken<AudioRepository>(
  'AUDIO_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => inject(MockAudioProvider),
  },
);
