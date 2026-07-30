import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkOutline } from 'ionicons/icons';

import { RECITERS } from '../../../../core/audio/audio.mock-data';
import { Reciter } from '../../../../core/audio/audio.models';
import { BottomSheetComponent } from '../../../../shared/components/bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-reciter-settings',
  templateUrl: './reciter-settings.component.html',
  styleUrl: './reciter-settings.component.scss',
  imports: [IonIcon, BottomSheetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReciterSettingsComponent {
  @Input({ required: true }) open = false;
  @Input({ required: true }) selectedReciterId = '';
  @Output() readonly openChange = new EventEmitter<boolean>();
  @Output() readonly reciterChange = new EventEmitter<Reciter['id']>();

  readonly reciters = RECITERS;
  readonly sheetBreakpoints = [0, 0.5, 0.75];

  constructor() {
    addIcons({ checkmarkOutline });
  }

  selectReciter(reciterId: Reciter['id']): void {
    this.reciterChange.emit(reciterId);
    this.openChange.emit(false);
  }
}
