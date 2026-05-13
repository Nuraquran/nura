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
} from 'ionicons/icons';

import { Surah } from '../../shared/components/surah-card/surah-card.component';

export interface Ayat {
  number: number;
  arabic: string;
  translation: string;
}

// ── Sample data: Al-Faatiha (surah 1) full ayat ──────────────────────────────
const SURAH_DATA: Record<number, Ayat[]> = {
  1: [
    {
      number: 1,
      arabic: 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ ١',
      translation:
        'Dengan nama Allah, Yang Maha Pemurah, lagi Maha Mengasihani',
    },
    {
      number: 2,
      arabic: 'ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ ٢',
      translation:
        'Segala puji tertentu bagi Allah, Tuhan yang memelihara dan mentadbirkan sekalian alam',
    },
    {
      number: 3,
      arabic: 'ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ ٣',
      translation: 'Yang Maha Pemurah, lagi Maha Mengasihani',
    },
    {
      number: 4,
      arabic: 'مَٰلِكِ يَوۡمِ ٱلدِّينِ ٤',
      translation: 'Yang menguasai pemerintahan hari Pembalasan (hari Akhirat)',
    },
    {
      number: 5,
      arabic: 'إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ ٥',
      translation:
        'Engkaulah sahaja (Ya Allah) yang kami sembah, dan kepada Engkaulah sahaja kami memohon pertolongan',
    },
    {
      number: 6,
      arabic: 'ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ ٦',
      translation: 'Tunjukilah kami jalan yang lurus',
    },
    {
      number: 7,
      arabic:
        'صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ ٧',
      translation:
        'Iaitu jalan orang-orang yang Engkau telah kurniakan nikmat kepada mereka, bukan (jalan) orang-orang yang Engkau telah murkai, dan bukan pula (jalan) orang-orang yang sesat',
    },
  ],
};

const SURAHS: Surah[] = [
  {
    number: 1,
    name: 'Al-Faatiha',
    arabic: 'الفَاتِحَة',
    meaning: 'The Opener',
    ayat: 7,
    type: 'Makkiyyah',
  },
  {
    number: 2,
    name: 'Al-Baqara',
    arabic: 'البَقَرَة',
    meaning: 'The Cow',
    ayat: 286,
    type: 'Madaniyyah',
  },
  {
    number: 18,
    name: 'Al-Kahf',
    arabic: 'الكَهۡف',
    meaning: 'The Cave',
    ayat: 110,
    type: 'Makkiyyah',
  },
  {
    number: 36,
    name: 'Yaseen',
    arabic: 'يٰسٓ',
    meaning: 'Ya Sin',
    ayat: 83,
    type: 'Makkiyyah',
  },
  {
    number: 55,
    name: 'Ar-Rahman',
    arabic: 'الرَّحۡمَٰن',
    meaning: 'The Beneficent',
    ayat: 78,
    type: 'Madaniyyah',
  },
  {
    number: 67,
    name: 'Al-Mulk',
    arabic: 'المُلۡك',
    meaning: 'The Sovereignty',
    ayat: 30,
    type: 'Makkiyyah',
  },
  {
    number: 112,
    name: 'Al-Ikhlaas',
    arabic: 'الإِخۡلَاص',
    meaning: 'The Sincerity',
    ayat: 4,
    type: 'Makkiyyah',
  },
  {
    number: 113,
    name: 'Al-Falaq',
    arabic: 'الفَلَق',
    meaning: 'The Daybreak',
    ayat: 5,
    type: 'Makkiyyah',
  },
  {
    number: 114,
    name: 'An-Naas',
    arabic: 'النَّاس',
    meaning: 'Mankind',
    ayat: 6,
    type: 'Makkiyyah',
  },
];

@Component({
  selector: 'app-reader',
  templateUrl: './reader.page.html',
  styleUrls: ['./reader.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, CommonModule, FormsModule],
})
export class ReaderPage implements OnInit {
  // ── Surah state ────────────────────────────────────────────────────────────
  currentSurah: Surah = SURAHS[0];
  allAyat: Ayat[] = [];
  displayedAyat: Ayat[] = [];
  pageSize = 10;
  hasMore = false;

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
    });
  }

  ngOnInit() {
    // Get surah number from route param e.g. /surah/1
    const id = Number(this.route.snapshot.paramMap.get('id') ?? 1);
    this.loadSurah(id);
  }

  // ── Load surah ─────────────────────────────────────────────────────────────
  loadSurah(id: number) {
    const found = SURAHS.find((s) => s.number === id);
    this.currentSurah = found ?? SURAHS[0];

    // Use sample data if available, else generate placeholder ayat
    this.allAyat =
      SURAH_DATA[this.currentSurah.number] ??
      Array.from({ length: this.currentSurah.ayat }, (_, i) => ({
        number: i + 1,
        arabic: `آيَةٌ ${i + 1}`,
        translation: `Terjemahan ayat ${i + 1} surah ${this.currentSurah.name}`,
      }));

    this.displayedAyat = this.allAyat.slice(0, this.pageSize);
    this.hasMore = this.allAyat.length > this.pageSize;
  }

  loadMore() {
    const next = this.displayedAyat.length + this.pageSize;
    this.displayedAyat = this.allAyat.slice(0, next);
    this.hasMore = next < this.allAyat.length;
  }

  // ── Navigation ─────────────────────────────────────────────────────────────
  goBack() {
    this.router.navigateByUrl('/surah-list');
  }

  // ── Surah picker ───────────────────────────────────────────────────────────
  toggleSurahPicker() {
    this.pickerOpen = !this.pickerOpen;
    // TODO: open ion-modal / action-sheet with surah list
  }

  // ── Info / settings ────────────────────────────────────────────────────────
  showInfo() {
    // TODO: open surah info modal
  }

  openSettings() {
    this.router.navigateByUrl('/settings');
  }

  // ── Reading goal ───────────────────────────────────────────────────────────
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
    console.log('Bookmark ayat', this.currentSurah.number, num);
    this.openAyatMenu = null;
    // TODO: save to storage
  }

  copyAyat(ayat: Ayat) {
    const text = `${ayat.arabic}\n${ayat.translation}\n— ${this.currentSurah.name} ${this.currentSurah.number}:${ayat.number}`;
    navigator.clipboard?.writeText(text);
    this.openAyatMenu = null;
  }

  shareAyat(ayat: Ayat) {
    const text = `${ayat.arabic}\n${ayat.translation}\n— ${this.currentSurah.name} ${this.currentSurah.number}:${ayat.number}`;
    if (navigator.share) {
      navigator.share({ text });
    }
    this.openAyatMenu = null;
  }

  // ── Audio player ───────────────────────────────────────────────────────────
  togglePlay() {
    this.isPlaying = !this.isPlaying;
    this.playerVisible = true;
  }

  prevAyat() {
    if (this.currentPlayingAyat > 1) {
      this.currentPlayingAyat--;
    }
  }

  nextAyat() {
    if (this.currentPlayingAyat < this.currentSurah.ayat) {
      this.currentPlayingAyat++;
    }
  }

  cycleSpeed() {
    this.speedIndex = (this.speedIndex + 1) % this.speedOptions.length;
    this.playbackSpeed = this.speedOptions[this.speedIndex];
  }
}
