import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'
import { NgModule, ErrorHandler } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { SplashScreen } from '@ionic-native/splash-screen'
import { EffectsModule } from '@ngrx/effects'
import { IonicStorageModule } from '@ionic/storage'

import { ConferenceApp } from './app.component'
import { ConferenceData } from '../providers/conference-data'

import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireStorageModule } from 'angularfire2/storage'
import { environment } from '../app/environment'

import { PagesModule } from '../pages/pages.module'
import { reducers } from '../ngrx'
import { ScoreParserProvider } from '../providers/score-parser/score-parser'
import { ScoreProvider } from '../providers/score/score'
import { ScoreCalculatorProvider } from '../providers/score-calculator/score-calculator'
import { ZerooneCalculatorProvider } from '../providers/zeroone-calculator/zeroone-calculator'
import { CricketCalculatorProvider } from '../providers/cricket-calculator/cricket-calculator'
import { CountupCalculatorProvider } from '../providers/countup-calculator/countup-calculator'
import { AuthProvider } from '../providers/auth/auth'
import { FirebaseAuthProvider } from '../providers/firebase-auth/firebase-auth'
import { AuthModule } from '../ngrx/auth/auth.module'
import { ScoreModule } from '../ngrx/score/score.module'

@NgModule({
  declarations: [
    ConferenceApp
  ],
  imports: [
    BrowserModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpModule,
    PagesModule,
    AuthModule,
    ScoreModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([]),
    IonicModule.forRoot(ConferenceApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    InAppBrowser,
    SplashScreen,
    ScoreParserProvider,
    ScoreProvider,
    ScoreCalculatorProvider,
    ZerooneCalculatorProvider,
    CricketCalculatorProvider,
    CountupCalculatorProvider,
    AuthProvider,
    FirebaseAuthProvider
  ]
})
export class AppModule { }
