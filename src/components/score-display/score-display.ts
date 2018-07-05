import { Component } from '@angular/core'

import { Store, select } from '@ngrx/store'
import { GameType } from '../../entities/GameType'
import { ScoreCalculatorProvider } from '../../providers/score-calculator/score-calculator'

import * as ScoreStore from '../../pages/score/store'
import { Score } from '../../entities/Score'
/**
 * Generated class for the ScoreDisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'score-display',
  templateUrl: 'score-display.html',
  providers: [ScoreCalculatorProvider]
})
export class ScoreDisplayComponent {
  resultScore: number
  resultScores: Score[]
  initScore: number = 501
  gameType: GameType

  constructor(
    private store: Store<ScoreStore.State>,
    private scoreCalcProvider: ScoreCalculatorProvider
  ) {
    this.store.pipe(select(ScoreStore.get4ScoreDisplay))
    .subscribe((data: ScoreStore.State) => {
      this.resultScores = data.resultScores
      this.gameType = data.gameType
    })
  }

  calcScore(): number {
    try {
      return this.scoreCalcProvider.calcScore(this.gameType, this.resultScores, this.initScore)
    } catch(e) {
      console.log("[score-table ERROR]: " + e.message)
      return 0
    }
  }

}
