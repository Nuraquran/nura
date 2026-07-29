import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { RecentSurah } from '../../home.models';

@Component({
  selector: 'app-recent-surahs',
  templateUrl: './recent-surahs.component.html',
  styleUrl: './recent-surahs.component.scss',
  imports: [
    RouterLink,
    BadgeComponent,
    CardComponent,
    SectionHeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentSurahsComponent {
  @Input({ required: true }) surahs: readonly RecentSurah[] = [];
}
