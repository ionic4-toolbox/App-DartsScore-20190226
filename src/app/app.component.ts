import { Component, ViewChild } from '@angular/core'

import { Events, MenuController, Nav, Platform } from 'ionic-angular'
import { SplashScreen } from '@ionic-native/splash-screen'
import { AuthProvider } from '../providers/auth/auth'
import { AuthAbstract } from '../providers/auth/authAbstract'

import { AccountPage } from '../pages/account/account'
import { LoginPage } from '../pages/login/login'
import { TabsPage } from '../pages/tabs-page/tabs-page'
import { TutorialPage } from '../pages/tutorial/tutorial'
import { SupportPage } from '../pages/support/support'

import { Storage } from '../../node_modules/@ionic/storage'
import * as authActions from '../ngrx/auth/stores/action'
import * as fromAuth from '../ngrx/auth/stores/state'
import { Store } from '@ngrx/store'

export interface PageInterface {
  title: string
  name: string
  component: any
  icon: string
  logsOut?: boolean
  index?: number
  tabName?: string
  tabComponent?: any
}

@Component({
  templateUrl: 'app.template.html',
  providers: [AuthProvider]
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav

  /**
   * サイドメニューのリスト
   */
  appPages: PageInterface[] = [
    { title: 'Home', name: 'TabsPage', component: TabsPage, icon: 'home' },
    { title: 'Account', name: 'AccountPage', component: AccountPage, icon: 'person' },
    { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
    { title: 'Logout', name: 'LoginPage', component: LoginPage, icon: 'log-out', logsOut: true }
  ]
  rootPage: any
  auth: AuthAbstract
  hasLoggedIn: boolean

  constructor(
    public events: Events,
    public storage: Storage,
    public menu: MenuController,
    public platform: Platform,
    public store: Store<fromAuth.State>,
    public splashScreen: SplashScreen,
    public authProvider: AuthProvider
  ) {
    this.auth = this.authProvider.firebaseAuth
    this.platformReady()
    // decide which menu items should be hidden by current login status stored in local storage
    this.getHasLoggedIn().then((hasLoggedIn: boolean) => {
      this.hasLoggedIn = hasLoggedIn
      if (hasLoggedIn) {
        this.rootPage = TabsPage
      } else {
        this.rootPage = LoginPage
      }
    })
  }

  openPage(page: PageInterface) {
    let params = {}
    if (page.index) {
      params = { tabIndex: page.index }
    }

    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index)
    } else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`)
      })
    }

    if (page.logsOut === true) {
      this.store.dispatch(new authActions.Logout())
    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage)
  }

  platformReady() {
    this.platform.ready().then(() => {
      this.splashScreen.hide()
    })
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0]
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary'
      }
      return
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary'
    }
    return
  }

  getHasLoggedIn(): Promise<boolean> {
    return this.storage.get('hasLoggedIn').then((value) => {
      return value === true
    })
  }
}