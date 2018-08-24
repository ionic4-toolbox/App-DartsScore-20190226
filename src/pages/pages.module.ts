import { NgModule } from '@angular/core'

import { AccountPageModule } from './account/account.module'
import { DailyScoreListPageModule } from './daily-score-list/daily-score-list.module'
import { DashboardPageModule } from './dashboard/dashboard.module'
import { LoginPageModule } from './login/login.module'
import { ScorePageModule } from './score/score.module'
import { ScoreListPageModule } from './score-list/score-list.module'
import { SessionDetailPageModule } from './session-detail/session-detail.module'
import { SignupPageModule } from './signup/signup.module'
import { SupportPageModule } from './support/support.module'
import { TabsPageModule } from './tabs-page/tabs-page.module'
import { TutorialPageModule } from './tutorial/tutorial.module'

import { ComponentsModule } from '../components/components.module'

@NgModule({
  imports: [
    AccountPageModule,
    DailyScoreListPageModule,
    DashboardPageModule,
    LoginPageModule,
    ScorePageModule,
    ScoreListPageModule,
    SessionDetailPageModule,
    SignupPageModule,
    SupportPageModule,
    TutorialPageModule,
    TabsPageModule,
    ComponentsModule
  ]
})
export class PagesModule {}
