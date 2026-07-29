import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';

import { ThemeService } from '../../../../core/theme/theme.service';
import { ThemePreference } from '../../../../core/theme/theme.model';
import { BottomSheetComponent } from '../../../../shared/components/bottom-sheet/bottom-sheet.component';
import { ReaderFontScale, ReadingPreferences } from '../../reader.models';

@Component({
  selector: 'app-reading-settings',
  templateUrl: './reading-settings.component.html',
  styleUrl: './reading-settings.component.scss',
  imports: [BottomSheetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingSettingsComponent {
  private readonly themeService = inject(ThemeService);

  @Input({ required: true }) open = false;
  @Input({ required: true }) preferences!: ReadingPreferences;
  @Output() readonly openChange = new EventEmitter<boolean>();
  @Output() readonly preferencesChange =
    new EventEmitter<ReadingPreferences>();

  readonly sheetBreakpoints = [0, 0.85, 1];
  readonly fontScaleOptions: readonly ReaderFontScale[] = [
    'small',
    'medium',
    'large',
  ];
  readonly themeOptions: readonly ThemePreference[] = [
    'light',
    'dark',
    'system',
  ];

  updateArabicFontSize(event: Event): void {
    this.updatePreferences({
      arabicFontSize: this.readFontScale(event),
    });
  }

  updateTranslationFontSize(event: Event): void {
    this.updatePreferences({
      translationFontSize: this.readFontScale(event),
    });
  }

  updateTranslationVisibility(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.updatePreferences({ showTranslation: input.checked });
  }

  updateTheme(theme: ThemePreference): void {
    this.themeService.setPreference(theme);
    this.updatePreferences({ theme });
  }

  private readFontScale(event: Event): ReaderFontScale {
    const value = (event.target as HTMLInputElement).value;
    return value === 'small' || value === 'large' ? value : 'medium';
  }

  private updatePreferences(
    changes: Partial<ReadingPreferences>,
  ): void {
    this.preferencesChange.emit({ ...this.preferences, ...changes });
  }
}
