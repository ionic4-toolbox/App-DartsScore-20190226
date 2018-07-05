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
  scoreTable: Score[][] = []
  gameType: GameType = GameType.COUNTUP
  GameTypes = GameType

  constructor(
    public config: Config,
    private store: Store<ScoreStore.State>
  ) {
  }

  ionViewWillEnter() {
    this.store.dispatch(new ScoreAction.ClearScoreInfo())
    this.store.dispatch(new ScoreAction.SetInitialScores(15))
    this.store.dispatch(new ScoreAction.ChangeResultScores())
  }

  updateSchedule() {

  }

  // openContact(speaker: any) {
  //   let mode = this.config.get('mode');
  // }
}
