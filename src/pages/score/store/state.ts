import { Score } from '../../../entities/Score'

/**
 * 状態
 */
export interface State {
  currentScore: string
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
}

/**
 * 初期状態
 */
export const initialState: State = {
  currentScore: "",
  loading: false,
  scores: [[]],
  resultScores: [],
  limitRound: 15,
  currentRound: 0,
  currentShot: 0,
  currentPointer: 0,
  activeRound: 0,
  activeShot: 0,
  activePointer: 0
}