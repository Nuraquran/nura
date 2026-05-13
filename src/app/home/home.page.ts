import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  menuOutline,
  moonOutline,
  bookOutline,
  bookmarkOutline,
  searchOutline,
  homeOutline,
  settingsOutline,
  arrowForwardOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon],
})
export class HomePage implements OnInit {
  constructor(private router: Router) {
    addIcons({
      menuOutline,
      moonOutline,
      bookOutline,
      bookmarkOutline,
      searchOutline,
      homeOutline,
      settingsOutline,
      arrowForwardOutline,
    });
  }

  ngOnInit() {}

  openMenu() {
    // Implement side menu / drawer logic here
    console.log('Open menu');
  }

  toggleDarkMode() {
    // Implement dark/light toggle logic here
    document.body.classList.toggle('light-mode');
  }

  navigate(route: string) {
    const routeMap: Record<string, string> = {
      quran: '/quran',
      'last-read': '/last-read',
      search: '/search',
      prayer: '/prayer-times',
      settings: '/settings',
    };
    const path = routeMap[route];
    if (path) this.router.navigateByUrl(path);
  }
}
