import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';

import { Ayah, ReadingPreferences } from '../../reader.models';

@Component({
  selector: 'app-ayah-list',
  templateUrl: './ayah-list.component.html',
  styleUrl: './ayah-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AyahListComponent {
  @Input({ required: true }) ayahs: readonly Ayah[] = [];
  @Input({ required: true }) preferences!: ReadingPreferences;

  readonly selectedAyahId = signal<number | null>(null);
  readonly actionMessage = signal('');

  trackByAyahId(_index: number, ayah: Ayah): number {
    return ayah.id;
  }

  toggleSelection(ayahId: number): void {
    this.selectedAyahId.update((selectedId) =>
      selectedId === ayahId ? null : ayahId,
    );
    this.actionMessage.set('');
  }

  handleSelectionKey(event: KeyboardEvent, ayahId: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleSelection(ayahId);
    }
  }

  performMockAction(action: string, ayahNumber: number): void {
    this.actionMessage.set(`${action} selected for ayah ${ayahNumber}.`);
  }
}
