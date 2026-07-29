import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-error-state',
  templateUrl: './error-state.component.html',
  styleUrl: './error-state.component.scss',
  imports: [IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorStateComponent {
  @Input() title = 'Something went wrong';
  @Input() message = 'Please try again.';

  constructor() {
    addIcons({ alertCircleOutline });
  }
}
