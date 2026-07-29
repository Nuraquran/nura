import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowForwardOutline, bookOutline } from 'ionicons/icons';

import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ReadingProgress } from '../../home.models';

@Component({
  selector: 'app-continue-reading-card',
  templateUrl: './continue-reading-card.component.html',
  styleUrl: './continue-reading-card.component.scss',
  imports: [RouterLink, IonIcon, CardComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContinueReadingCardComponent {
  @Input({ required: true }) reading!: ReadingProgress;

  constructor() {
    addIcons({ arrowForwardOutline, bookOutline });
  }
}
