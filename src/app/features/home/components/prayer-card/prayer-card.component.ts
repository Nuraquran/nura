import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locationOutline } from 'ionicons/icons';

import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { PrayerSummary } from '../../home.models';

@Component({
  selector: 'app-prayer-card',
  templateUrl: './prayer-card.component.html',
  styleUrl: './prayer-card.component.scss',
  imports: [CardComponent, BadgeComponent, ButtonComponent, IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrayerCardComponent {
  @Input({ required: true }) prayer!: PrayerSummary;

  constructor() {
    addIcons({ locationOutline });
  }
}
