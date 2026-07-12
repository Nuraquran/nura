import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  menuOutline,
  notificationsOutline,
  moonOutline,
  bookOutline,
  arrowForwardOutline,
  trendingUpOutline,
  sunnyOutline,
  homeOutline,
  schoolOutline,
  personOutline,
  chevronForwardOutline,
  bookmarkOutline,
} from 'ionicons/icons';

export interface RecentSurah {
  id: number;
  name: string;
  number: number;
  meaning: string;
  progress: number;
  lastRead: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, CommonModule],
})
export class HomePage implements OnInit {
  hasNotification = true;

  dailyVerse = {
    arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    translation: 'Indeed, with hardship [will be] ease.',
    ref: 'Surah Ash-Sharh (94:6)',
  };

  recentSurahs: RecentSurah[] = [
    {
      id: 18,
      name: 'Al-Kahf',
      number: 18,
      meaning: 'The Cave',
      progress: 45,
      lastRead: '5 min ago',
    },
    {
      id: 2,
      name: 'Al-Baqarah',
      number: 2,
      meaning: 'The Cow',
      progress: 12,
      lastRead: '2 hours ago',
    },
  ];

  constructor(private router: Router) {
    addIcons({
      menuOutline,
      notificationsOutline,
      moonOutline,
      bookOutline,
      arrowForwardOutline,
      trendingUpOutline,
      sunnyOutline,
      homeOutline,
      schoolOutline,
      personOutline,
      chevronForwardOutline,
      bookmarkOutline,
    });
  }

  ngOnInit() {}

  // Progress ring offset (circumference = 2π × 18 ≈ 113.1)
  getRingOffset(progress: number): number {
    const circumference = 113.1;
    return circumference - (progress / 100) * circumference;
  }

  openMenu() {}
  openNotifications() {}
  goHome() {
    this.router.navigateByUrl('/home');
  }
  goToQuran() {
    this.router.navigateByUrl('/surah-list');
  }
  goToLearn() {
    this.router.navigateByUrl('/learn');
  }
  goToProgress() {
    this.router.navigateByUrl('/progress');
  }
  goToProfile() {
    this.router.navigateByUrl('/profile');
  }
  viewAllSurahs() {
    this.router.navigateByUrl('/surah-list');
  }
  goToSurah(id: number) {
    this.router.navigateByUrl(`/reader/${id}`);
  }
}
