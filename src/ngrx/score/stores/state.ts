import { Score } from '../../../entities/Score'
import { GameType } from '../../../entities/GameType'

/**
 * 状態
 */
export interface State {
  loading: boolean
  scores: Score[][]
  resultScores: Score[]
  limitRound: number     /* 最大のラウンド数 */
  currentRound: number   /* 現在のラウンド数 */
  currentShot: number    /* 現在のラウンドの投目 */
  currentPointer: number /* 現在のカーソルのポインタ */
  activeRound: number    /* 現在入力対象のラウンド数 */
  activeShot: number     /* 現在入力対象のラウンドの投数 */
  activePointer: number  /* 現在入力対象のカーソルのポインタ */
  gameType: GameType     /* ゲームの種別 */
  cricketTable: object   /* クリケットのテーブル */
}

/**
 * 初期状態
 */
export const initialState: State = {
  loading: false,
  scores: [],
  resultScores: [],
  limitRound: 15,
  currentRound: 1,
  currentShot: 1,
  currentPointer: 0,
  activeRound: 1,
  activeShot: 1,
  activePointer: 0,
  gameType: GameType.COUNTUP,
  cricketTable: {
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    25: 0
  }
}