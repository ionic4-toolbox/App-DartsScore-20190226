import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { DailyScoreListPage } from './daily-score-list'

@NgModule({
  declarations: [
    DailyScoreListPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyScoreListPage),
  ],
})
export class DailyScoreListPageModule {}
