import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

import { PageContainerComponent } from '../../shared/components/page-container/page-container.component';

@Component({
  selector: 'app-placeholder',
  template: `
    <ion-content>
      <app-page-container aria-label="Reserved for future content" />
    </ion-content>
  `,
  imports: [IonContent, PageContainerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderPage {}
