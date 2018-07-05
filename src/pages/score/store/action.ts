import { Action } from '@ngrx/store'
import { Score } from '../../../entities/Score'

export const CHANGE_SCORES: string = '[Score] Change Scores'
export const INPUT_SCORE: string = '[Score] Input Score'
export const CHANGE_RESULT_SCORES: string = '[Score] Change Result Scores'
export const INCREMENT_CURRENT_POINTER: string = '[Score] Increment Current Pointer'
export const INCREMENT_ACTIVE_POINTER: string = '[Score] Increment Active Pointer'
export const DECREMENT_ACTIVE_POINTER: string = '[Score] Decrement Active Pointer'
export const CLEAR_SCORE_INFO: string = '[Score] Clear Score Info'
export const SET_INITIAL_SCORES: string = '[Score] Set Initial Scores'

/**
 *スコアが入力されたとき
 *
 * @export
 * @class InputScore
 * @implements {Action}
 * @argument payload 入力されたスコア情報
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
  constructor() {}
}

/**
 * 現在のカーソルのポインタが1増えた時
 *
 * @export
 * @class IncrementCurrentPointer
 * @implements {Action}
 */
export class IncrementCurrentPointer implements Action {
  readonly type = INCREMENT_CURRENT_POINTER
  constructor() {}
}

/**
 * 現在入力対象のカーソルのポインタが1増えた時
 *
 * @export
 * @class IncrementActivePointer
 * @implements {Action}
 */
export class IncrementActivePointer implements Action {
  readonly type = INCREMENT_ACTIVE_POINTER
  constructor() {}
}

/**
 * 現在入力対象のカーソルのポインタが1減った時
 *
 * @export
 * @class DecrementActivePointer
 * @implements {Action}
 */
export class DecrementActivePointer implements Action {
  readonly type = DECREMENT_ACTIVE_POINTER
  constructor() {}
}

/**
 * スコアに関するすべての情報を初期化する
 *
 * @export
 * @class ClearScoreInfo
 * @implements {Action}
 */
export class ClearScoreInfo implements Action {
  readonly type = CLEAR_SCORE_INFO
  constructor() {}
}

/**
 * スコアテーブルに初期のスコアをセットする
 *
 * @export
 * @class SetInitialScores
 * @implements {Action}
 * @argument payload ラウンド数
 */
export class SetInitialScores implements Action {
  readonly type = SET_INITIAL_SCORES
  constructor(public payload: number) {}
}

export type Actions = ChangeScores
                    | InputScore
                    | ChangeResultScores
                    | IncrementCurrentPointer
                    | IncrementActivePointer
                    | DecrementActivePointer
                    | ClearScoreInfo
                    | SetInitialScores
                    | any;