import { Component } from '@angular/core'
  
import { UserData } from '../../providers/user-data'
import { Store, select } from '@ngrx/store'
import { ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'
import { User } from '@firebase/auth-types'
import * as moment from 'moment'

import * as ScoreAction from '../../pages/score/store/action'
import * as ScoreStore from '../../pages/score/store'
import { ScoreProvider } from '../../providers/score/score'
import { GameScore } from '../../interfaces/GameScore'
/**
 * Generated class for the CricketKeyboardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cricket-keyboard',
  templateUrl: 'cricket-keyboard.html',
  providers: [ScoreProvider]
})
export class CricketKeyboardComponent {
  input: string = ""
  userId = ""
  gameScore: GameScore

  constructor(
    private store: Store<ScoreStore.State>,
    private scoreProvider: ScoreProvider,
    private toastCtrl: ToastController,
    public userData: UserData,
    private db: AngularFireDatabase,
  ) {
    this.store.pipe(select(ScoreStore.get4SaveGameScore))
    .subscribe((data: ScoreStore.State) => {
      this.gameScore = data
    })
    this.userData.getUser()
    .then((user: User) => {
      this.userId = user.uid
    })
  }

  onTap(event: any) {
    console.log("[onTap]")
    const inputScore: string = event.target.textContent
    if (inputScore === 'Triple') {
      this.input = 'T'
    } else if (inputScore === 'Double') {
      this.input = 'D'
    } else {
      this.input += inputScore
    }
    this.store.dispatch(new ScoreAction.InputScore(this.scoreProvider.getTemporaryScore(this.input)))
  }

  onNext() {
    try {
      this.store.dispatch(new ScoreAction.InputScore(this.scoreProvider.getScore(this.input, {
        isBigBull: false
      })))
    } catch (e) {
      console.log("[onNext ERROR]: " + e.message)
      this.showToast('This is invalid score', 'bottom')
      return 
    }
    this.input = ""
    this.store.dispatch(new ScoreAction.ChangeResultScores())
    this.store.dispatch(new ScoreAction.ChangeCricketTable())
    this.store.dispatch(new ScoreAction.IncrementCurrentPointer())
    this.store.dispatch(new ScoreAction.IncrementActivePointer())
  }

  onPrevious() {
    try {
      this.store.dispatch(new ScoreAction.InputScore(this.scoreProvider.getScore(this.input, {
        isBigBull: false
      })))
    } catch(e) {
      console.log("[onPrevious ERROR]: " + e.message)
      this.showToast('This is invalid score', 'bottom')
      return
    }
    this.input = ""
    this.store.dispatch(new ScoreAction.ChangeResultScores())
    this.store.dispatch(new ScoreAction.ChangeCricketTable())
    this.store.dispatch(new ScoreAction.DecrementActivePointer())
  }

  onClear() {
    console.log("[onClear]")
    this.input = ""
    this.store.dispatch(new ScoreAction.InputScore(this.scoreProvider.getTemporaryScore(this.input)))
  }

  onSave() {
    this.db.database
    .ref('game-scores/' + this.userId + '/' + moment().format('YYYYMMDD'))
    .push({...this.gameScore, created_at: new Date().getTime()})
    .then(() => {
      this.showToast('Save Score Data', 'top')
      return
    }, error => {
      console.log("[onSave ERROR]: " + error.message)
      this.showToast('something wrong...', 'middle')
      return
    })
  }

  private showToast(message: string, position: string) {
    let toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position
    })
    toast.present()
  }
}
