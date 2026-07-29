import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import {
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { moonOutline, sunnyOutline } from 'ionicons/icons';

import { ThemeService } from '../../../core/theme/theme.service';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonIcon,
    IconButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent {
  private readonly themeService = inject(ThemeService);

  @Input({ required: true }) title = '';

  readonly resolvedTheme = this.themeService.resolvedTheme;

  constructor() {
    addIcons({ moonOutline, sunnyOutline });
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
