import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';

import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ReadingProgress } from '../../home.models';

@Component({
  selector: 'app-continue-reading-card',
  templateUrl: './continue-reading-card.component.html',
  styleUrl: './continue-reading-card.component.scss',
  imports: [CardComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContinueReadingCardComponent {
  private readonly router = inject(Router);

  @Input({ required: true }) reading!: ReadingProgress;

  continueReading(): void {
    void this.router.navigate(['/quran', this.reading.surahNumber]);
  }
}
