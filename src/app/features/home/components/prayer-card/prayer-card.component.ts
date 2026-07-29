import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CardComponent } from '../../../../shared/components/card/card.component';
import { PrayerSummary } from '../../home.models';

@Component({
  selector: 'app-prayer-card',
  templateUrl: './prayer-card.component.html',
  styleUrl: './prayer-card.component.scss',
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrayerCardComponent {
  @Input({ required: true }) prayer!: PrayerSummary;
}
