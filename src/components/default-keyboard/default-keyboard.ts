import { Component } from '@angular/core'
import { Store, select } from '@ngrx/store'

import * as ScoreAction from '../../pages/score/store/action'
import * as ScoreStore from '../../pages/score/store'
import { Score } from '../../entities/Score'
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
  constructor(
    private store: Store<ScoreStore.State>,
    private scoreProvider: ScoreProvider
  ) {
  }

  onTap(event: any) {
    console.log("[onTap]")
    const input: string = event.target.textContent
    if (input === 'Triple') {
      this.store.dispatch(new ScoreAction.InputCurrentScore('T'))
    } else if (input === 'Double') {
      this.store.dispatch(new ScoreAction.InputCurrentScore('D'))
    } else {
      this.store.dispatch(new ScoreAction.InputCurrentScore(input))
    }
    this.store.pipe(select(ScoreStore.getCurrentScore))
    .subscribe((data: string) => {
      this.store.dispatch(new ScoreAction.InputScore(this.scoreProvider.getTemporaryScore(data)))
    })
  }

  onNext(event: any) {
    console.log("[onNext]")
    this.store.pipe(select(ScoreStore.getCurrentScore))
    .subscribe((data: string) => {
      try {
        this.store.dispatch(new ScoreAction.InputScore(this.scoreProvider.getScore(data)))
      } catch(e) {
        // toast
      }
      this.store.dispatch(new ScoreAction.ClearCurrentScore())
      this.store.dispatch(new ScoreAction.IncrementCurrentPointer())
      this.store.dispatch(new ScoreAction.IncrementActivePointer())
    })
  }

  onPrevious(event: any) {
    console.log("[onPrevious]")
    this.store.pipe(select(ScoreStore.getCurrentScore))
    .subscribe((data: string) => {
      this.store.dispatch(new ScoreAction.InputScore(this.scoreProvider.getScore(data)))
      this.store.dispatch(new ScoreAction.ClearCurrentScore())
      this.store.dispatch(new ScoreAction.DecrementActivePointer())
    })
  }

  onClear(event: any) {
    console.log("[onClear]")
    this.store.dispatch(new ScoreAction.ClearCurrentScore())
  }
}
