import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

import { PageContainerComponent } from '../../shared/components/page-container/page-container.component';
import { ContinueReadingCardComponent } from './components/continue-reading-card/continue-reading-card.component';
import { DailyVerseCardComponent } from './components/daily-verse-card/daily-verse-card.component';
import { GreetingHeaderComponent } from './components/greeting-header/greeting-header.component';
import { KhatamProgressComponent } from './components/khatam-progress/khatam-progress.component';
import { PrayerCardComponent } from './components/prayer-card/prayer-card.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';
import { RecentSurahsComponent } from './components/recent-surahs/recent-surahs.component';
import { HOME_MOCK_DATA } from './home.mock-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  imports: [
    IonContent,
    PageContainerComponent,
    GreetingHeaderComponent,
    PrayerCardComponent,
    ContinueReadingCardComponent,
    QuickActionsComponent,
    DailyVerseCardComponent,
    KhatamProgressComponent,
    RecentSurahsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  readonly home = HOME_MOCK_DATA;
  readonly greeting = this.resolveGreeting(new Date().getHours());

  private resolveGreeting(hour: number): string {
    if (hour < 12) {
      return 'Good morning';
    }

    if (hour < 18) {
      return 'Good afternoon';
    }

    return 'Good evening';
  }
}
