import { Component } from '@angular/core'

import { NavParams } from 'ionic-angular'

import { DailyScoreListPage } from '../daily-score-list/daily-score-list'
import { ScorePage } from '../score/score'
import { DashboardPage } from '../dashboard/dashboard'

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = DashboardPage
  tab2Root: any = ScorePage
  tab3Root: any = DailyScoreListPage
  mySelectedIndex: number

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0
  }

}
