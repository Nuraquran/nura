import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

import { ResolvedTheme, ThemePreference } from './theme.model';

const THEME_STORAGE_KEY = 'nura-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  readonly preference = signal<ThemePreference>(this.readPreference());
  readonly resolvedTheme = signal<ResolvedTheme>(
    this.resolveTheme(this.preference()),
  );

  constructor() {
    this.applyTheme(this.resolvedTheme());
    this.mediaQuery.addEventListener('change', this.handleSystemThemeChange);
  }

  setPreference(preference: ThemePreference): void {
    this.preference.set(preference);
    localStorage.setItem(THEME_STORAGE_KEY, preference);
    this.updateResolvedTheme();
  }

  toggle(): void {
    this.setPreference(this.resolvedTheme() === 'dark' ? 'light' : 'dark');
  }

  private readonly handleSystemThemeChange = (): void => {
    if (this.preference() === 'system') {
      this.updateResolvedTheme();
    }
  };

  private readPreference(): ThemePreference {
    const storedPreference = localStorage.getItem(THEME_STORAGE_KEY);
    return storedPreference === 'light' ||
      storedPreference === 'dark' ||
      storedPreference === 'system'
      ? storedPreference
      : 'system';
  }

  private updateResolvedTheme(): void {
    const theme = this.resolveTheme(this.preference());
    this.resolvedTheme.set(theme);
    this.applyTheme(theme);
  }

  private resolveTheme(preference: ThemePreference): ResolvedTheme {
    if (preference !== 'system') {
      return preference;
    }

    return this.mediaQuery.matches ? 'dark' : 'light';
  }

  private applyTheme(theme: ResolvedTheme): void {
    this.document.documentElement.dataset['theme'] = theme;
  }
}
