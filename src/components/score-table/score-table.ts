import { Component } from '@angular/core'

import { Store, select } from '@ngrx/store'

import * as ScoreStore from '../../pages/score/store'
import { Score } from '../../entities/Score'
/**
 * Generated class for the ScoreTableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'score-table',
  templateUrl: 'score-table.html'
})
export class ScoreTableComponent {
  scoreTable: Score[][]
  resultScores: Score[]
  activeRound: number
  activeShot: number
  activePointer: number
  initScore: number = 501

  constructor(
    private store: Store<ScoreStore.State>
  ) {
    this.store.pipe(select(ScoreStore.get4ScoreTable))
    .subscribe((data: ScoreStore.State) => {
      this.activeRound = data.activeRound
      this.activeShot = data.activeShot
      this.activePointer = data.activePointer
      this.scoreTable = data.scores
      this.resultScores = data.resultScores
    })
  }

  calcScore(option: string): number {
    if (this.resultScores.length <= 0) {
      return 0
      // throw new Error("result scores don\'t have score")
    }

    if (option === 'zeroone') {
      return this.initScore - this.resultScores.map(value => value.summary).reduce((pre, cul) => pre + cul)
    } else if (option === 'countup') {
      return this.resultScores.map(v => v.summary).reduce((pre, cul) => pre + cul)
    }
  }
}
