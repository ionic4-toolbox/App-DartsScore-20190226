import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { GameType } from '../../entities/GameType'

import {
  // ActionSheet,
  Config,
  IonicPage,
} from 'ionic-angular'

import * as ScoreAction from '../../ngrx/score/stores/action'
import * as ScoreStore from '../../ngrx/score/stores/state'
import { Score } from '../../entities/Score'

// TODO remove
export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean|void;
}

@IonicPage()
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

  updateGameType() {
    this.store.dispatch(new ScoreAction.ClearScoreInfo())
    this.store.dispatch(new ScoreAction.ChangeGameType(this.gameType))
    this.store.dispatch(new ScoreAction.SetInitialScores(15))
    this.store.dispatch(new ScoreAction.ChangeResultScores())
  }

  // openContact(speaker: any) {
  //   let mode = this.config.get('mode');
  // }
}
