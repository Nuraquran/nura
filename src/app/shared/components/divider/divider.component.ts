import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-divider',
  template: '<hr />',
  styleUrl: './divider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {}
