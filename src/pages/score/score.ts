import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { GameType } from '../../entities/GameType'

import {
  ActionSheet,
  Config,
} from 'ionic-angular'

import * as ScoreAction from './store/action'
import * as ScoreStore from './store'
import { Score } from '../../entities/Score'

// TODO remove
export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean|void;
};

@Component({
  selector: 'page-score',
  templateUrl: 'score.html'
})
export class ScorePage {
  actionSheet: ActionSheet
  speakers: any[] = []
  scoreTable: Score[][] = []
  resultScores: Score[] = []
  gameType: GameType = GameType.COUNTUP
  GameTypes = GameType
  _scoreTable: any

  constructor(
    public config: Config,
    private store: Store<ScoreStore.State>
  ) {
    for(let i = 0; i < 3; i++) {
      let scoreRow: Score[] = []
      for(let j = 0; j < 12; j++) {
        let score: Score = new Score()
        if (j === 0) {
          score.count = 0
          score.strValue = "0"
          score.intValue = 0
        } else {
          score.count = 2
          score.strValue = "20"
          score.intValue = 20
        }
        scoreRow.push(score)
      }
      this.scoreTable.push(scoreRow)
    }
    for(let i = 0; i < 12; i++) {
      let resultScore = new Score()
      resultScore.add(this.scoreTable[0][i])
      resultScore.add(this.scoreTable[1][i])
      resultScore.add(this.scoreTable[2][i])
      this.resultScores.push(resultScore)
    }
  }

  ionViewDidLoad() {
    this.store.dispatch(new ScoreAction.ChangeScores(this.scoreTable))
    this.store.dispatch(new ScoreAction.ChangeResultScores(this.resultScores))
  }

  updateSchedule() {

  }

  // openContact(speaker: any) {
  //   let mode = this.config.get('mode');
  // }
}
