import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
  imports: [
    RouterLink,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    AppHeaderComponent,
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
