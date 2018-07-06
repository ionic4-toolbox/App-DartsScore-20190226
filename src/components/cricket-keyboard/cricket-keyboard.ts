import { Component } from '@angular/core'

import { Store } from '@ngrx/store'
import { ToastController } from 'ionic-angular'

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
  selector: 'cricket-keyboard',
  templateUrl: 'cricket-keyboard.html',
  providers: [ScoreProvider]
})
export class CricketKeyboardComponent {
  input: string = ""

  constructor(
    private store: Store<ScoreStore.State>,
    private scoreProvider: ScoreProvider,
    private toastCtrl: ToastController
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
        isBigBull: false
      })))
    } catch (e) {
      console.log("[onNext ERROR]: " + e.message)
      this.toastError()
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
        isBigBull: false
      })))
    } catch(e) {
      console.log("[onPrevious ERROR]: " + e.message)
      this.toastError()
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

  private toastError() {
    let toast = this.toastCtrl.create({
      message: 'This is invalid score',
      duration: 3000,
      position: 'bottom'
    })
    toast.present()
  }
}
