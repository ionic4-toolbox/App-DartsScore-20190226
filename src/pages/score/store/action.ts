import { Action } from '@ngrx/store'
import { Score } from '../../../entities/Score'

export const CHANGE_SCORES = '[Score] Change Scores'
export const CHANGE_RESULT_SCORES = '[Score] Change Result Scores'

/**
 * スコアテーブルが変わった時
 */
export class ChangeScores implements Action {
  readonly type = CHANGE_SCORES;
  constructor(public payload: Score[][]) {}
}

/**
 * スコアテーブルの結果が変わった時
 */
export class ChangeResultScores implements Action {
  readonly type = CHANGE_RESULT_SCORES
  constructor(public payload: Score[]) {}
}

export type Actions = ChangeScores | ChangeResultScores;