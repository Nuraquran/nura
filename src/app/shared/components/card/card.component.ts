import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type CardElevation = 'flat' | 'raised';
export type CardTone = 'default' | 'primary';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() elevation: CardElevation = 'flat';
  @Input() tone: CardTone = 'default';
}
