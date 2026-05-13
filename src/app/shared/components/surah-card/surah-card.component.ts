import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Surah {
  number: number;
  name: string;
  arabic: string;
  meaning: string;
  ayat: number;
  type: 'Makkiyyah' | 'Madaniyyah';
}

@Component({
  selector: 'app-surah-card',
  templateUrl: './surah-card.component.html',
  styleUrls: ['./surah-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SurahCardComponent implements OnInit {
  /** Surah data untuk dipaparkan */
  @Input({ required: true }) surah!: Surah;

  /** Emit bila card diklik — parent handle navigation */
  @Output() cardClick = new EventEmitter<Surah>();

  constructor() {}

  ngOnInit() {}

  onCardClick() {
    this.cardClick.emit(this.surah);
  }
}
