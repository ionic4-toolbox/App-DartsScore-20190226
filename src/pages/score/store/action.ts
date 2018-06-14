import { Action } from '@ngrx/store'
import { Score } from '../../../entities/Score'

export const CHANGE_SCORES: string = '[Score] Change Scores'
export const INPUT_SCORE: string = '[Score] Input Score'
export const CHANGE_RESULT_SCORES: string = '[Score] Change Result Scores'
export const INCREMENT_CURRENT_POINTER: string = '[Score] Increment Current Pointer'
export const INCREMENT_ACTIVE_POINTER: string = '[Score] Increment Active Pointer'
export const DECREMENT_ACTIVE_POINTER: string = '[Score] Decrement Active Pointer'
export const INPUT_CURRENT_SCORE: string = '[Score] Input Current Score'
export const CLEAR_CURRENT_SCORE: string = '[Score] Clear Current Score'

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
 *キーボードで入力された時
 *
 * @export
 * @class InputCurrentScore
 * @implements {Action}
 */
export class InputCurrentScore implements Action {
  readonly type = INPUT_CURRENT_SCORE
  constructor(public payload: string) {}
}

export class ClearCurrentScore implements Action {
  readonly type = CLEAR_CURRENT_SCORE
  constructor() {}
}

export type Actions = ChangeScores
                    | InputScore
                    | ChangeResultScores
                    | IncrementCurrentPointer
                    | IncrementActivePointer
                    | DecrementActivePointer
                    | InputCurrentScore
                    | ClearCurrentScore
                    | any;