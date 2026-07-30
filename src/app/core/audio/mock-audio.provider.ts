import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

import {
  AudioPlaybackCallbacks,
  AudioPlaybackRequest,
} from './audio.models';
import { AudioRepository } from './audio.repository';

const RECITER_STORAGE_KEY = 'nura.audio.reciter.v1';
const MOCK_DURATION_SECONDS = 342;
const MOCK_LOADING_DELAY_MS = 240;
const MOCK_TICK_MS = 1000;

@Injectable({ providedIn: 'root' })
export class MockAudioProvider implements AudioRepository {
  private readonly document = inject(DOCUMENT);
  private loadingTimer: number | null = null;
  private playbackTimer: number | null = null;
  private progress = 0;
  private duration = MOCK_DURATION_SECONDS;
  private callbacks: AudioPlaybackCallbacks | null = null;

  start(
    request: AudioPlaybackRequest,
    callbacks: AudioPlaybackCallbacks,
  ): void {
    this.clearTimers();
    this.progress = request.progress;
    this.duration = MOCK_DURATION_SECONDS;
    this.callbacks = callbacks;

    const window = this.document.defaultView;
    if (!window) {
      callbacks.onReady(this.duration);
      return;
    }

    this.loadingTimer = window.setTimeout(() => {
      this.loadingTimer = null;
      callbacks.onReady(this.duration);
      this.startPlaybackTimer();
    }, MOCK_LOADING_DELAY_MS);
  }

  pause(): void {
    this.clearTimers();
  }

  resume(): void {
    if (this.callbacks && this.progress < this.duration) {
      this.startPlaybackTimer();
    }
  }

  stop(): void {
    this.clearTimers();
    this.callbacks = null;
    this.progress = 0;
  }

  loadReciterId(): string | null {
    try {
      return (
        this.document.defaultView?.localStorage.getItem(
          RECITER_STORAGE_KEY,
        ) ?? null
      );
    } catch {
      return null;
    }
  }

  saveReciterId(reciterId: string): void {
    try {
      this.document.defaultView?.localStorage.setItem(
        RECITER_STORAGE_KEY,
        reciterId,
      );
    } catch {
      // The selected reciter remains available for this session.
    }
  }

  private startPlaybackTimer(): void {
    const window = this.document.defaultView;
    if (!window || !this.callbacks || this.playbackTimer !== null) {
      return;
    }

    this.playbackTimer = window.setInterval(() => {
      this.progress = Math.min(this.progress + 1, this.duration);
      this.callbacks?.onProgress(this.progress);

      if (this.progress >= this.duration) {
        this.clearTimers();
        this.callbacks?.onEnded();
      }
    }, MOCK_TICK_MS);
  }

  private clearTimers(): void {
    const window = this.document.defaultView;

    if (window && this.loadingTimer !== null) {
      window.clearTimeout(this.loadingTimer);
    }

    if (window && this.playbackTimer !== null) {
      window.clearInterval(this.playbackTimer);
    }

    this.loadingTimer = null;
    this.playbackTimer = null;
  }
}
