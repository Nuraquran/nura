import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  chevronForwardOutline,
  optionsOutline,
  pauseOutline,
  playOutline,
} from 'ionicons/icons';

import { AudioState } from '../../../../core/audio/audio.models';

@Component({
  selector: 'app-audio-mini-player',
  templateUrl: './audio-mini-player.component.html',
  styleUrl: './audio-mini-player.component.scss',
  imports: [IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioMiniPlayerComponent {
  @Input({ required: true }) state!: AudioState;
  @Input({ required: true }) reciterName = '';
  @Input() hasPrevious = false;
  @Input() hasNext = false;
  @Output() readonly playPause = new EventEmitter<void>();
  @Output() readonly previous = new EventEmitter<void>();
  @Output() readonly next = new EventEmitter<void>();
  @Output() readonly settings = new EventEmitter<void>();

  constructor() {
    addIcons({
      chevronBackOutline,
      chevronForwardOutline,
      optionsOutline,
      pauseOutline,
      playOutline,
    });
  }

  formatTime(seconds: number): string {
    const safeSeconds = Math.max(0, Math.floor(seconds));
    const minutes = Math.floor(safeSeconds / 60);
    const remainder = safeSeconds % 60;
    return `${minutes}:${remainder.toString().padStart(2, '0')}`;
  }
}
