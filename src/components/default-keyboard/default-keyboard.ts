import { Component } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ToastController } from 'ionic-angular'

import { AngularFireDatabase } from 'angularfire2/database'
import * as moment from 'moment'

import * as ScoreAction from '../../pages/score/store/action'
import * as ScoreStore from '../../pages/score/store'
import { ScoreProvider } from '../../providers/score/score'

/**
 * Generated class for the CricketKeyboardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'default-keyboard',
  templateUrl: 'default-keyboard.html',
  providers: [ScoreProvider]
})
export class DefaultKeyboardComponent {
  input: string = ""
  userId = "ferretdayo"

  constructor(
    private store: Store<ScoreStore.State>,
    private scoreProvider: ScoreProvider,
    private toastCtrl: ToastController,
    private db: AngularFireDatabase,
  ) {
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
        isBigBull: true
      })))
    } catch (e) {
      console.log("[onNext ERROR]: " + e.message)
      this.showToast('This is invalid score', 'bottom')
      return 
    }
    this.input = ""
    this.store.dispatch(new ScoreAction.ChangeResultScores())
    this.store.dispatch(new ScoreAction.IncrementCurrentPointer())
    this.store.dispatch(new ScoreAction.IncrementActivePointer())
  }

  onPrevious() {
    try {
      this.store.dispatch(new ScoreAction.InputScore(this.scoreProvider.getScore(this.input, {
        isBigBull: true
      })))
    } catch(e) {
      console.log("[onPrevious ERROR]: " + e.message)
      this.showToast('This is invalid score', 'bottom')
      return
    }
    this.input = ""
    this.store.dispatch(new ScoreAction.ChangeResultScores())
    this.store.dispatch(new ScoreAction.DecrementActivePointer())
  }

  onClear() {
    console.log("[onClear]")
    this.input = ""
    this.store.dispatch(new ScoreAction.InputScore(this.scoreProvider.getTemporaryScore(this.input)))
  }

  onSave() {
    this.store.pipe(select(ScoreStore.get4SaveGameScore))
    .subscribe((data: ScoreStore.State) => {
        this.db.database
        .ref('game-scores/' + this.userId + '/' + moment().format('YYYYMMDD'))
        .push({...data, created_at: new Date().getTime()})
        .then(() => {
          this.showToast('Save Score Data', 'top')
        }, error => {
          console.log("[onSave ERROR]: " + error.message)
          this.showToast('something wrong...', 'middle')
          return
        })
      }
    )
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
