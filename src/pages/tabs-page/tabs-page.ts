import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { DailyScoreListPage } from '../daily-score-list/daily-score-list';
import { SpeakerListPage } from '../speaker-list/speaker-list';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = SpeakerListPage;
  tab2Root: any = SpeakerListPage;
  tab3Root: any = DailyScoreListPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
