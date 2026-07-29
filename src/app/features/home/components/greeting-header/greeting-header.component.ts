import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { HomeUser } from '../../home.models';

@Component({
  selector: 'app-greeting-header',
  templateUrl: './greeting-header.component.html',
  styleUrl: './greeting-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GreetingHeaderComponent {
  @Input({ required: true }) greeting = '';
  @Input({ required: true }) user!: HomeUser;
}
