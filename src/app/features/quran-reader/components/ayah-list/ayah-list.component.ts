import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';

import {
  Ayah,
  AyahAction,
  AyahActionRequest,
  ReadingPreferences,
} from '../../reader.models';

@Component({
  selector: 'app-ayah-list',
  templateUrl: './ayah-list.component.html',
  styleUrl: './ayah-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AyahListComponent {
  @Input({ required: true }) ayahs: readonly Ayah[] = [];
  @Input({ required: true }) preferences!: ReadingPreferences;
  @Input() bookmarkedAyahIds: readonly number[] = [];
  @Output() readonly selectedAyahChange = new EventEmitter<Ayah | null>();
  @Output() readonly actionRequested =
    new EventEmitter<AyahActionRequest>();

  readonly selectedAyahId = signal<number | null>(null);

  trackByAyahId(_index: number, ayah: Ayah): number {
    return ayah.id;
  }

  toggleSelection(ayah: Ayah): void {
    const selectedAyah = this.selectedAyahId() === ayah.id ? null : ayah;
    this.selectedAyahId.set(selectedAyah?.id ?? null);
    this.selectedAyahChange.emit(selectedAyah);
  }

  handleSelectionKey(event: KeyboardEvent, ayah: Ayah): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleSelection(ayah);
    }
  }

  requestAction(action: AyahAction, ayah: Ayah): void {
    this.actionRequested.emit({ action, ayah });
  }

  isBookmarked(ayahId: number): boolean {
    return this.bookmarkedAyahIds.includes(ayahId);
  }
}
