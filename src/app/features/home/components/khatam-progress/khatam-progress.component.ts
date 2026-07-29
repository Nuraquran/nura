import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { KhatamProgress } from '../../home.models';

@Component({
  selector: 'app-khatam-progress',
  templateUrl: './khatam-progress.component.html',
  styleUrl: './khatam-progress.component.scss',
  imports: [ButtonComponent, CardComponent, SectionHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KhatamProgressComponent {
  @Input({ required: true }) progress!: KhatamProgress;
}
