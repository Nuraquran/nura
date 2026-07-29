import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  bookmarkOutline,
  bookOutline,
  ellipsisHorizontalOutline,
  headsetOutline,
  homeOutline,
} from 'ionicons/icons';

import { PRIMARY_NAVIGATION } from '../../mock-data/navigation.mock';
@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
  imports: [
    RouterLink,
    RouterLinkActive,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  readonly navigationItems = PRIMARY_NAVIGATION;

  constructor() {
    addIcons({
      bookmarkOutline,
      bookOutline,
      ellipsisHorizontalOutline,
      headsetOutline,
      homeOutline,
    });
  }
}
