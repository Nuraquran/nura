import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { RecentSurah } from '../../home.models';

@Component({
  selector: 'app-recent-surahs',
  templateUrl: './recent-surahs.component.html',
  styleUrl: './recent-surahs.component.scss',
  imports: [RouterLink, SectionHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentSurahsComponent {
  @Input({ required: true }) surahs: readonly RecentSurah[] = [];
}
