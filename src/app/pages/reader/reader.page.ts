import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  chevronDownOutline,
  chevronForwardOutline,
  informationCircleOutline,
  settingsOutline,
  playOutline,
  play,
  pause,
  bookmarkOutline,
  copyOutline,
  shareOutline,
  playSkipBackOutline,
  playSkipForwardOutline,
  refreshOutline,
} from 'ionicons/icons';

import { Surah } from '../../shared/components/surah-card/surah-card.component';
import { QuranService } from 'src/app/core/services/quran.service';

export interface Ayat {
  number: number;
  arabic: string;
  translation: string;
}

// Strip bismillah — buang 4 perkataan pertama jika ayat bermula dengan بسم
// Cara ini reliable kerana tak bergantung pada exact Unicode encoding
function stripBismillah(text: string): string {
  const trimmed = text.trim();
  // Buang semua harakat/diacritics untuk check sahaja
  const bare = trimmed.replace(
    /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g,
    '',
  );
  const words = bare.split(/\s+/);
  // Bismillah = 4 perkataan: بسم الله الرحمن الرحيم
  // Jika perkataan pertama mengandungi بسم, strip 4 perkataan dari original
  if (words.length > 4 && words[0].includes('بسم')) {
    const originalWords = trimmed.split(/\s+/);
    return originalWords.slice(4).join(' ').trim();
  }
  return trimmed;
}

@Component({
  selector: 'app-reader',
  templateUrl: './reader.page.html',
  styleUrls: ['./reader.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, CommonModule, FormsModule],
})
export class ReaderPage implements OnInit {
  // ── Surah state ────────────────────────────────────────────────────────────
  currentSurah: Surah = {
    number: 1,
    name: 'Al-Faatiha',
    arabic: 'الفَاتِحَة',
    meaning: 'The Opener',
    ayat: 7,
    type: 'Makkiyyah',
  };

  allAyat: Ayat[] = [];
  displayedAyat: Ayat[] = [];
  pageSize = 15;
  hasMore = false;

  // ── Bismillah ──────────────────────────────────────────────────────────────
  bismillah = 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ';
  showBismillah = false;

  // ── Loading / error ────────────────────────────────────────────────────────
  isLoading = true;
  errorMsg = '';

  // ── UI state ───────────────────────────────────────────────────────────────
  pickerOpen = false;
  highlightedAyat: number | null = null;
  openAyatMenu: number | null = null;

  // ── Reading goal ───────────────────────────────────────────────────────────
  goalEnabled = false;
  goalProgress = 0;
  goalTarget = 5;

  // ── Audio player ───────────────────────────────────────────────────────────
  playerVisible = false;
  isPlaying = false;
  currentPlayingAyat = 1;
  reciterName = 'Saad Al-Ghamdi';
  playbackSpeed = 1;
  private speedOptions = [0.75, 1, 1.25, 1.5, 2];
  private speedIndex = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quranService: QuranService,
  ) {
    addIcons({
      arrowBackOutline,
      chevronDownOutline,
      chevronForwardOutline,
      informationCircleOutline,
      settingsOutline,
      playOutline,
      play,
      pause,
      bookmarkOutline,
      copyOutline,
      shareOutline,
      playSkipBackOutline,
      playSkipForwardOutline,
      refreshOutline,
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id') ?? 1);
    this.loadSurah(id);
  }

  // ── Load surah + ayat from API ─────────────────────────────────────────────
  loadSurah(id: number) {
    this.isLoading = true;
    this.errorMsg = '';

    this.quranService.getSurah(id).subscribe({
      next: (res: any) => {
        const data = res?.data;
        if (!data) {
          this.errorMsg = 'Data tidak dijumpai.';
          this.isLoading = false;
          return;
        }

        const arabicName = (data.name as string).replace(/^\S+\s+/, '').trim();
        this.currentSurah = {
          number: data.number,
          name: data.englishName,
          arabic: arabicName,
          meaning: data.englishNameTranslation,
          ayat: data.numberOfAyahs,
          type: data.revelationType === 'Meccan' ? 'Makkiyyah' : 'Madaniyyah',
        };

        // Surah 1 (Al-Fatihah): ayat 1 IS bismillah, paparkan terus dalam list, tiada bismillah banner
        // Surah 9 (At-Tawbah): tiada bismillah langsung
        // Semua lain: tunjuk bismillah banner, strip dari ayat 1
        const surahNum = data.number;
        this.showBismillah = surahNum !== 1 && surahNum !== 9;

        this.allAyat = (data.ayahs ?? []).map((a: any, index: number) => {
          let text = (a.text as string).trim();

          // Untuk surah selain Al-Fatihah dan At-Tawbah:
          // ayat pertama (index 0) akan ada bismillah digabung — strip je
          if (this.showBismillah && index === 0) {
            text = stripBismillah(text);
          }

          return {
            number: a.numberInSurah,
            arabic: text,
            translation: '',
          };
        });

        this.displayedAyat = this.allAyat.slice(0, this.pageSize);
        this.hasMore = this.allAyat.length > this.pageSize;
        this.isLoading = false;

        this.loadTranslation(id);
      },
      error: () => {
        this.errorMsg = 'Gagal memuatkan surah. Sila cuba semula.';
        this.isLoading = false;
      },
    });
  }

  private loadTranslation(id: number) {
    this.quranService.getSurahWithTranslation(id).subscribe({
      next: (res: any) => {
        const ayahs: any[] = res?.data?.ayahs ?? [];
        ayahs.forEach((a: any) => {
          const match = this.allAyat.find(
            (ay) => ay.number === a.numberInSurah,
          );
          if (match) match.translation = a.text;
        });
        this.displayedAyat = [
          ...this.allAyat.slice(0, this.displayedAyat.length),
        ];
      },
      error: () => {
        console.warn('Translation load failed');
      },
    });
  }

  loadMore() {
    const next = this.displayedAyat.length + this.pageSize;
    this.displayedAyat = this.allAyat.slice(0, next);
    this.hasMore = next < this.allAyat.length;
  }

  retry() {
    this.loadSurah(this.currentSurah.number);
  }

  // ── Navigation ─────────────────────────────────────────────────────────────
  goBack() {
    this.router.navigateByUrl('/surah-list');
  }
  toggleSurahPicker() {
    this.pickerOpen = !this.pickerOpen;
  }
  showInfo() {}
  openSettings() {
    this.router.navigateByUrl('/settings');
  }
  openGoal() {
    this.goalEnabled = !this.goalEnabled;
  }

  // ── Ayat interaction ───────────────────────────────────────────────────────
  selectAyat(num: number) {
    this.highlightedAyat = this.highlightedAyat === num ? null : num;
    if (this.openAyatMenu !== num) this.openAyatMenu = null;
  }

  toggleAyatMenu(num: number, event: Event) {
    event.stopPropagation();
    this.openAyatMenu = this.openAyatMenu === num ? null : num;
  }

  playAyat(num: number) {
    this.currentPlayingAyat = num;
    this.isPlaying = true;
    this.playerVisible = true;
    this.openAyatMenu = null;
  }

  bookmarkAyat(num: number) {
    console.log('Bookmark', this.currentSurah.number, num);
    this.openAyatMenu = null;
  }

  copyAyat(ayat: Ayat) {
    const text = `${ayat.arabic}\n${ayat.translation}\n— ${this.currentSurah.name} ${this.currentSurah.number}:${ayat.number}`;
    navigator.clipboard?.writeText(text);
    this.openAyatMenu = null;
  }

  shareAyat(ayat: Ayat) {
    const text = `${ayat.arabic}\n${ayat.translation}\n— ${this.currentSurah.name} ${this.currentSurah.number}:${ayat.number}`;
    if (navigator.share) navigator.share({ text });
    this.openAyatMenu = null;
  }

  // ── Audio player ───────────────────────────────────────────────────────────
  togglePlay() {
    this.isPlaying = !this.isPlaying;
    this.playerVisible = true;
  }

  prevAyat() {
    if (this.currentPlayingAyat > 1) this.currentPlayingAyat--;
  }
  nextAyat() {
    if (this.currentPlayingAyat < this.currentSurah.ayat)
      this.currentPlayingAyat++;
  }

  cycleSpeed() {
    this.speedIndex = (this.speedIndex + 1) % this.speedOptions.length;
    this.playbackSpeed = this.speedOptions[this.speedIndex];
  }
}
