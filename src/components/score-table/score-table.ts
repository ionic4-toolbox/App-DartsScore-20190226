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

  constructor(
    private store: Store<ScoreStore.State>
  ) {
    this.store.pipe(select(ScoreStore.getState))
    .subscribe((data: ScoreStore.State) => {
      this.scoreTable = data.scores
      this.resultScores = data.resultScores
    })
  }

}