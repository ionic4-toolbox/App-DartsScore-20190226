import { Score } from '../../../entities/Score'

/**
 * 状態
 */
export interface State {
  loading: boolean
  scores: Score[][]
  resultScores: Score[]
  currentRound: number  /* 現在のラウンド数 */
  currentShot: number   /* 現在のラウンドの投目 */
  activeRound: number   /* 現在入力対象のラウンド数 */
  activeShot: number    /* 現在入力対象のラウンドの投目 */
}

/**
 * 初期状態
 */
export const initialState: State = {
  loading: false,
  scores: [[]],
  resultScores: [],
  currentRound: 1,
  currentShot: 1,
  activeRound: 1,
  activeShot: 1
}