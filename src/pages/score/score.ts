import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { GameType } from '../../entities/GameType'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

import {
  // ActionSheet,
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
}

@Component({
  selector: 'page-score',
  templateUrl: 'score.html'
})
export class ScorePage {
  scoreTable: Score[][] = []
  gameType: GameType = GameType.COUNTUP
  GameTypes = GameType
  userList: AngularFireList<any>

  constructor(
    public config: Config,
    private store: Store<ScoreStore.State>,
    private db: AngularFireDatabase
  ) {
    // this.userList = this.db.database.ref('')
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
