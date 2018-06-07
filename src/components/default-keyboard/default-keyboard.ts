import { Component } from '@angular/core'
import { Store, select } from '@ngrx/store'

import * as ScoreAction from '../../pages/score/store/action'
import * as ScoreStore from '../../pages/score/store'
import { Score } from '../../entities/Score'
/**
 * Generated class for the CricketKeyboardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'default-keyboard',
  templateUrl: 'default-keyboard.html'
})
export class DefaultKeyboardComponent {
  input: string = ''
  constructor(
    private store: Store<ScoreStore.State>
  ) {
  }

  onTap(event: any) {
    this.input += event.target.textContent
  }

  onNext(event: any) {
    let score: Score = new Score()
    score.value = event.target.textContent
    score.count = 1
    this.store.dispatch(new ScoreAction.InputScore(score))
  }

  onPrevious(event: any) {
    let score: Score = new Score()
    score.value = event.target.textContent
    score.count = 1
    this.store.dispatch(new ScoreAction.InputScore(score))
  }

  onClear(event: any) {
    this.input = ''
  }
}
