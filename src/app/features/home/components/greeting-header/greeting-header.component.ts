import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  moonOutline,
  notificationsOutline,
  sunnyOutline,
} from 'ionicons/icons';

import { ThemeService } from '../../../../core/theme/theme.service';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';
import { HomeUser } from '../../home.models';

@Component({
  selector: 'app-greeting-header',
  templateUrl: './greeting-header.component.html',
  styleUrl: './greeting-header.component.scss',
  imports: [IonIcon, IconButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GreetingHeaderComponent {
  private readonly themeService = inject(ThemeService);

  @Input({ required: true }) greeting = '';
  @Input({ required: true }) user!: HomeUser;

  readonly resolvedTheme = this.themeService.resolvedTheme;

  constructor() {
    addIcons({ moonOutline, notificationsOutline, sunnyOutline });
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
