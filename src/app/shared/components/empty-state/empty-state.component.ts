import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { leafOutline } from 'ionicons/icons';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  imports: [IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  @Input({ required: true }) title = '';
  @Input() message = '';
  @Input() icon = 'leaf-outline';

  constructor() {
    addIcons({ leafOutline });
  }
}
