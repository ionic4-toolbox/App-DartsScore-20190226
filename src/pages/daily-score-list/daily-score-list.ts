import { Component, ViewChild } from '@angular/core'

import { AlertController, App, IonicPage, /*FabContainer, ItemSliding, */List, ModalController, NavController, ToastController, LoadingController, /*Refresher*/ } from 'ionic-angular'

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment'

import { ConferenceData } from '../../providers/conference-data'

// import { ScoreListPage } from '../../pages/score-list/score-list'
// import { SessionDetailPage } from '../session-detail/session-detail'

@IonicPage()
@Component({
  selector: 'page-daily-score-list',
  templateUrl: 'daily-score-list.html'
})
export class DailyScoreListPage {
  @ViewChild('dailyScoreList', { read: List }) dailyScoreList: List

  dayIndex = 0
  queryText = ''
  segment = 'all'
  excludeTracks: any = []
  shownSessions: any = []
  groups: any = []
  confDate: string

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public confData: ConferenceData,
  ) {}

  // ionViewDidLoad() {
  //   this.app.setTitle('ScoreList')
  //   this.updateSchedule()
  // }

  // updateSchedule() {
  //   // Close any open sliding items when the schedule updates
  //   this.dailyScoreList && this.dailyScoreList.closeSlidingItems()

  //   this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
  //     this.shownSessions = data.shownSessions
  //     this.groups = data.groups
  //   })
  // }

  // goToScoreDetail(scoreDate: any) {
  //   // go to the session detail page
  //   // and pass in the session data

  //   this.navCtrl.push(ScoreListPage, { sessionId: scoreDate.id, name: scoreDate.name })
  //   // this.navCtrl.push(SessionDetailPage, { sessionId: sessionData.id, name: sessionData.name })
  // }

  // addFavorite(slidingItem: ItemSliding, sessionData: any) {

    // if (this.user.hasFavorite(sessionData.name)) {
    //   // woops, they already favorited it! What shall we do!?
    //   // prompt them to remove it
    //   this.removeFavorite(slidingItem, sessionData, 'Favorite already added')
    // } else {
    //   // remember this session as a user favorite
    //   this.user.addFavorite(sessionData.name)

    //   // create an alert instance
    //   let alert = this.alertCtrl.create({
    //     title: 'Favorite Added',
    //     buttons: [{
    //       text: 'OK',
    //       handler: () => {
    //         // close the sliding item
    //         slidingItem.close()
    //       }
    //     }]
    //   })
    //   // now present the alert on top of all other content
    //   alert.present()
    // }

  // }

  // removeFavorite(slidingItem: ItemSliding, sessionData: any, title: string) {
  //   let alert = this.alertCtrl.create({
  //     title: title,
  //     message: 'Would you like to remove this session from your favorites?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: () => {
  //           // they clicked the cancel button, do not remove the session
  //           // close the sliding item and hide the option buttons
  //           slidingItem.close()
  //         }
  //       },
  //       {
  //         text: 'Remove',
  //         handler: () => {
  //           // they want to remove this session from their favorites
  //           // this.user.removeFavorite(sessionData.name)
  //           this.updateSchedule()

  //           // close the sliding item and hide the option buttons
  //           slidingItem.close()
  //         }
  //       }
  //     ]
  //   })
  //   // now present the alert on top of all other content
  //   alert.present()
  // }

  // openSocial(network: string, fab: FabContainer) {
  //   let loading = this.loadingCtrl.create({
  //     content: `Posting to ${network}`,
  //     duration: (Math.random() * 1000) + 500
  //   })
  //   loading.onWillDismiss(() => {
  //     fab.close()
  //   })
  //   loading.present()
  // }

  // doRefresh(refresher: Refresher) {
  //   this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
  //     this.shownSessions = data.shownSessions
  //     this.groups = data.groups

  //     // simulate a network request that would take longer
  //     // than just pulling from out local json file
  //     setTimeout(() => {
  //       refresher.complete()

  //       const toast = this.toastCtrl.create({
  //         message: 'Sessions have been updated.',
  //         duration: 3000
  //       })
  //       toast.present()
  //     }, 1000)
  //   })
  // }
}
