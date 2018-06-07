import { Action } from '@ngrx/store'
import { Score } from '../../../entities/Score'

export const CHANGE_SCORES: string = '[Score] Change Scores'
export const INPUT_SCORE: string = '[Score] Input Score'
export const CHANGE_RESULT_SCORES: string = '[Score] Change Result Scores'

/**
 *スコアテーブルが変わった時
 *
 * @export
 * @class ChangeScores
 * @implements {Action}
 */
export class ChangeScores implements Action {
  readonly type = CHANGE_SCORES
  constructor(public payload: Score[][]) {}
}

/**
 *スコアが入力されたとき
 *
 * @export
 * @class InputScore
 * @implements {Action}
 */
export class InputScore implements Action {
  readonly type = INPUT_SCORE
  constructor(public payload: Score) {}
}

/**
 * スコアテーブルの結果が変わった時
 *
 * @export
 * @class ChangeResultScores
 * @implements {Action}
 */
export class ChangeResultScores implements Action {
  readonly type = CHANGE_RESULT_SCORES
  constructor(public payload: Score[]) {}
}

export type Actions = ChangeScores
                    | InputScore
                    | ChangeResultScores
                    | any;