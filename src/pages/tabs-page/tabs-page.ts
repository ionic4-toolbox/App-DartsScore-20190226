import { Component } from '@angular/core'

import { NavParams, IonicPage } from 'ionic-angular'

@IonicPage()
@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = 'DashboardPage'
  tab2Root: any = 'ScorePage'
  tab3Root: any = 'DailyScoreListPage'
  mySelectedIndex: number

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0
  }

}
