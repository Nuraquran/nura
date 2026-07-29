import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  bookmarkOutline,
  bookOutline,
  headsetOutline,
  heartOutline,
} from 'ionicons/icons';

import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { QuickAction } from '../../home.models';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
  styleUrl: './quick-actions.component.scss',
  imports: [RouterLink, IonIcon, SectionHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickActionsComponent {
  @Input({ required: true }) actions: readonly QuickAction[] = [];

  constructor() {
    addIcons({
      bookmarkOutline,
      bookOutline,
      headsetOutline,
      heartOutline,
    });
  }
}
