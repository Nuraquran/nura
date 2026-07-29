import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  bookmark,
  bookmarkOutline,
  checkmarkOutline,
  shareSocialOutline,
} from 'ionicons/icons';

import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { DailyVerse } from '../../home.models';

@Component({
  selector: 'app-daily-verse-card',
  templateUrl: './daily-verse-card.component.html',
  styleUrl: './daily-verse-card.component.scss',
  imports: [
    IonIcon,
    BadgeComponent,
    CardComponent,
    IconButtonComponent,
    SectionHeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyVerseCardComponent {
  @Input({ required: true }) verse!: DailyVerse;

  readonly bookmarked = signal(false);
  readonly shareAcknowledged = signal(false);

  constructor() {
    addIcons({
      bookmark,
      bookmarkOutline,
      checkmarkOutline,
      shareSocialOutline,
    });
  }

  toggleBookmark(): void {
    this.bookmarked.update((bookmarked) => !bookmarked);
  }

  acknowledgeShare(): void {
    this.shareAcknowledged.set(true);
  }
}
