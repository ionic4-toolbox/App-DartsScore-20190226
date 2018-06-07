import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'
import { NgModule, ErrorHandler } from '@angular/core'
import { StoreModule, State } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'

import { InAppBrowser } from '@ionic-native/in-app-browser'
import { SplashScreen } from '@ionic-native/splash-screen'

import { IonicStorageModule } from '@ionic/storage'

import { ConferenceApp } from './app.component'
import { PopoverPage } from '../pages/about-popover/about-popover'
import { AccountPage } from '../pages/account/account'
import { LoginPage } from '../pages/login/login'
import { ScoreListPage } from '../pages/score-list/score-list'
import { DailyScoreListPage } from '../pages/daily-score-list/daily-score-list'
import { SessionDetailPage } from '../pages/session-detail/session-detail'
import { SignupPage } from '../pages/signup/signup'
import { ScorePage } from '../pages/score/score'
import { DashboardPage } from '../pages/dashboard/dashboard'
import { TabsPage } from '../pages/tabs-page/tabs-page'
import { TutorialPage } from '../pages/tutorial/tutorial'
import { SupportPage } from '../pages/support/support'

import { ConferenceData } from '../providers/conference-data'
import { UserData } from '../providers/user-data'

// import { AngularFireModule } from 'angularfire2'
// import { AngularFirestoreModule } from 'angularfire2/firestore'
// import { AngularFireStorageModule } from 'angularfire2/storage'
// import { AngularFireAuthModule } from 'angularfire2/auth'
// import { environment } from '../app/environment'

import { ComponentsModule } from '../components/components.module'
import { reducers } from '../store'
import * as ScoreState from '../pages/score/store/state'

@NgModule({
  declarations: [
    ConferenceApp,
    AccountPage,
    LoginPage,
    PopoverPage,
    ScoreListPage,
    DailyScoreListPage,
    SessionDetailPage,
    SignupPage,
    ScorePage,
    DashboardPage,
    TabsPage,
    TutorialPage,
    SupportPage
  ],
  imports: [
    BrowserModule,
    // AngularFirestoreModule,
    // AngularFireAuthModule,
    // AngularFireStorageModule,
    HttpModule,
    ComponentsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    // AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(reducers, {
      initialState: { score: ScoreState.initialState }
    }),
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: ScoreListPage, name: 'ScoreList', segment: 'scoreList' },
        { component: DailyScoreListPage, name: 'DailyScoreList', segment: 'dailyScoreList' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: ScorePage, name: 'Score', segment: 'score' },
        { component: DashboardPage, name: 'Dashboard', segment: 'dashboard' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AccountPage,
    LoginPage,
    PopoverPage,
    ScoreListPage,
    DailyScoreListPage,
    SessionDetailPage,
    SignupPage,
    ScorePage,
    DashboardPage,
    TabsPage,
    TutorialPage,
    SupportPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen
  ]
})
export class AppModule { }
