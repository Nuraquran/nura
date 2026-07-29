import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  imports: [IonSearchbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  @Input() value = '';
  @Input() placeholder = 'Search';
  @Input() label = 'Search';
  @Input() debounce = 250;
  @Output() readonly valueChange = new EventEmitter<string>();
}
