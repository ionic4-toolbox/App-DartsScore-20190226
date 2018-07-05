import { Component } from '@angular/core'

import { Store, select } from '@ngrx/store'
import { ScoreCalculatorProvider } from '../../providers/score-calculator/score-calculator'

import * as ScoreStore from '../../pages/score/store'
import { Score } from '../../entities/Score'
import { GameType } from '../../entities/GameType'
/**
 * Generated class for the ScoreTableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'score-table',
  templateUrl: 'score-table.html',
  providers: [ScoreCalculatorProvider]
})
export class ScoreTableComponent {
  scoreTable: Score[][]
  resultScores: Score[]
  activeRound: number
  activeShot: number
  activePointer: number
  initScore: number = 501
  gameType: GameType

  constructor(
    private store: Store<ScoreStore.State>,
    private scoreCalcProvider: ScoreCalculatorProvider
  ) {
    this.store.pipe(select(ScoreStore.get4ScoreTable))
    .subscribe((data: ScoreStore.State) => {
      this.activeRound = data.activeRound
      this.activeShot = data.activeShot
      this.activePointer = data.activePointer
      this.scoreTable = data.scores
      this.resultScores = data.resultScores
      this.gameType = data.gameType
    })
  }

  calcScore(gameType: GameType): number {
    try {
      return this.scoreCalcProvider.calcScore(gameType, this.resultScores, this.initScore)
    } catch(e) {
      console.log("[score-table ERROR]: " + e.message)
      return 0
    }
  }
}
