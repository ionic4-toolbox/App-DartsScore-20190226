import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { GameType } from '../../entities/GameType'
import { Observable } from 'rxjs/Observable'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'

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
  userRef: AngularFirestoreCollection<object>
  userList: Observable<object>

  constructor(
    public config: Config,
    private store: Store<ScoreStore.State>,
    private afs: AngularFirestore
  ) {
    this.userRef = this.afs.collection<object>('userList')
    this.userList = this.userRef.valueChanges()
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
