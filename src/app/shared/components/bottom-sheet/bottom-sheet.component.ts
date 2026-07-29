import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss',
  imports: [
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomSheetComponent {
  @Input({ required: true }) title = '';
  @Input() open = false;
  @Output() readonly openChange = new EventEmitter<boolean>();

  close(): void {
    this.openChange.emit(false);
  }
}
