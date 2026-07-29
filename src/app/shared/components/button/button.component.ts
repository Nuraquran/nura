import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Input() fullWidth = false;
}
