import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type BadgeTone = 'neutral' | 'primary' | 'gold';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  @Input() tone: BadgeTone = 'neutral';
}
