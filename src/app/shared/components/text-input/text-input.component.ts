import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IonInput } from '@ionic/angular/standalone';

export type TextInputType = 'email' | 'password' | 'search' | 'tel' | 'text';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  imports: [IonInput],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent {
  @Input({ required: true }) label = '';
  @Input() value = '';
  @Input() type: TextInputType = 'text';
  @Input() placeholder = '';
  @Input() helperText = '';
  @Input() errorText = '';
  @Input() autocomplete = 'off';
  @Input() disabled = false;
  @Output() readonly valueChange = new EventEmitter<string>();
}
