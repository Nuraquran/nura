import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { DailyVerse } from '../../home.models';

@Component({
  selector: 'app-daily-verse-card',
  templateUrl: './daily-verse-card.component.html',
  styleUrl: './daily-verse-card.component.scss',
  imports: [SectionHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyVerseCardComponent {
  @Input({ required: true }) verse!: DailyVerse;
}
