import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowForwardOutline } from 'ionicons/icons';

import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { PageContainerComponent } from '../../shared/components/page-container/page-container.component';
import { SearchInputComponent } from '../../shared/components/search-input/search-input.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';
import { LAST_READ_SURAH, SURAHS } from './surah-list.mock-data';
import { SurahSummary } from './surah-list.models';

@Component({
  selector: 'app-surah-list',
  templateUrl: './surah-list.page.html',
  styleUrl: './surah-list.page.scss',
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    EmptyStateComponent,
    PageContainerComponent,
    SearchInputComponent,
    SkeletonLoaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurahListPage {
  readonly searchQuery = signal('');
  readonly isLoading = signal(true);
  readonly lastRead = LAST_READ_SURAH;
  readonly skeletonRows = [1, 2, 3, 4, 5, 6] as const;
  readonly filteredSurahs = computed(() => {
    const query = this.searchQuery().trim().toLocaleLowerCase();

    if (!query) {
      return SURAHS;
    }

    return SURAHS.filter(
      (surah) =>
        surah.englishName.toLocaleLowerCase().includes(query) ||
        surah.arabicName.includes(query) ||
        surah.number.toString().includes(query),
    );
  });

  constructor() {
    addIcons({ arrowForwardOutline });
    afterNextRender(() => {
      this.isLoading.set(false);
    });
  }

  trackBySurahNumber(
    _index: number,
    surah: SurahSummary,
  ): SurahSummary['number'] {
    return surah.number;
  }
}
