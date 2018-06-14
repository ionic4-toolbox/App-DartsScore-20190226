import { Component } from '@angular/core'
import { Store, select } from '@ngrx/store'

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

  constructor(
    private store: Store<ScoreStore.State>,
    private scoreProvider: ScoreProvider
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
    console.log("[onNext]")
    try {
      this.store.dispatch(new ScoreAction.InputScore(this.scoreProvider.getScore(this.input)))
    } catch (e) {
      // todo
    }
    this.input = ""
    this.store.dispatch(new ScoreAction.IncrementCurrentPointer())
    this.store.dispatch(new ScoreAction.IncrementActivePointer())
  }

  onPrevious() {
    console.log("[onPrevious]")
    try {
      this.store.dispatch(new ScoreAction.InputScore(this.scoreProvider.getScore(this.input)))
    } catch(e) {
      // toast
      return
    }
    this.input = ""
    this.store.dispatch(new ScoreAction.DecrementActivePointer())
  }

  onClear() {
    console.log("[onClear]")
    this.store.dispatch(new ScoreAction.ClearCurrentScore())
  }
}
