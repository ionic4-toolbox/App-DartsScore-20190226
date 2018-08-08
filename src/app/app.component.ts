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

import { UserData } from '../providers/user-data'

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

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public splashScreen: SplashScreen,
    public authProvider: AuthProvider
  ) {
    this.auth = this.authProvider.firebaseAuth
    this.platformReady()
    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn: boolean) => {
      if (hasLoggedIn) {
        this.rootPage = TabsPage
      } else {
        this.rootPage = LoginPage
      }
    })
  }

  openPage(page: PageInterface) {
    let params = {}

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index }
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index)
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`)
      })
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.auth.logout()
      .then(() => this.userData.logout())
    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage)
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide()
    })
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0]

    // Tabs are a special case because they have their own navigation
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
}
