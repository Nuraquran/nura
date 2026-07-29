import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
  @Input() selected = false;
  @Input() disabled = false;
  @Output() readonly selectedChange = new EventEmitter<boolean>();

  toggle(): void {
    if (!this.disabled) {
      this.selectedChange.emit(!this.selected);
    }
  }
}
