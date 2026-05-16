import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  bookmarkOutline,
  searchOutline,
  closeOutline,
  refreshOutline,
} from 'ionicons/icons';

import {
  SurahCardComponent,
  Surah,
} from '../../shared/components/surah-card/surah-card.component';
import { QuranService } from 'src/app/core/services/quran';

@Component({
  selector: 'app-surah-list',
  templateUrl: './surah-list.page.html',
  styleUrls: ['./surah-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, CommonModule, FormsModule, SurahCardComponent],
})
export class SurahListPage implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;

  activeTab: 'read' | 'learn' | 'progress' = 'read';
  searchVisible = false;
  searchQuery = '';

  surahs: Surah[] = [];
  filteredSurahs: Surah[] = [];
  isLoading = true;
  errorMsg = '';

  constructor(
    private router: Router,
    private quranService: QuranService,
  ) {
    addIcons({
      arrowBackOutline,
      bookmarkOutline,
      searchOutline,
      closeOutline,
      refreshOutline,
    });
  }

  ngOnInit() {
    this.loadSurahs();
  }

  // ── API ──────────────────────────────────────────────────────────────────────
  loadSurahs() {
    this.isLoading = true;
    this.errorMsg = '';

    this.quranService.getSurahs().subscribe({
      next: (res: any) => {
        const raw: any[] = res?.data ?? [];
        this.surahs = raw.map((s) => this.mapToSurah(s));
        this.filteredSurahs = [...this.surahs];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load surahs', err);
        this.errorMsg = 'Gagal memuatkan senarai surah. Sila cuba semula.';
        this.isLoading = false;
      },
    });
  }

  // Map API shape → Surah interface
  private mapToSurah(s: any): Surah {
    // API returns nama dengan tashkeel — buang word pertama (سُورَةُ)
    const arabicName = (s.name as string).replace(/^\S+\s+/, '').trim();

    return {
      number: s.number,
      name: s.englishName,
      arabic: arabicName,
      meaning: s.englishNameTranslation,
      ayat: s.numberOfAyahs,
      type: s.revelationType === 'Meccan' ? 'Makkiyyah' : 'Madaniyyah',
    };
  }

  // ── Navigation ───────────────────────────────────────────────────────────────
  goBack() {
    this.router.navigateByUrl('/home');
  }
  goToBookmark() {
    this.router.navigateByUrl('/last-read');
  }
  openSurah(surah: Surah) {
    this.router.navigate(['/surah', surah.number]);
  }

  // ── Search ───────────────────────────────────────────────────────────────────
  toggleSearch() {
    this.searchVisible = !this.searchVisible;
    if (!this.searchVisible) {
      this.clearSearch();
    } else {
      setTimeout(() => this.searchInput?.nativeElement?.focus(), 350);
    }
  }

  onSearch() {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) {
      this.filteredSurahs = [...this.surahs];
      return;
    }
    this.filteredSurahs = this.surahs.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.meaning.toLowerCase().includes(q) ||
        s.number.toString() === q,
    );
  }

  clearSearch() {
    this.searchQuery = '';
    this.filteredSurahs = [...this.surahs];
  }

  // ── Tabs ─────────────────────────────────────────────────────────────────────
  setTab(tab: 'read' | 'learn' | 'progress') {
    this.activeTab = tab;
  }
}
