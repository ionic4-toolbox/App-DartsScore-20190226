import * as ScoreAction from './action'
import { State, initialState } from './state'

/**
 * Reducer
 */
export function reducer(state = initialState, action: ScoreAction.Actions): State {
  switch (action.type) {
    case ScoreAction.CHANGE_SCORES: {
      // 作成
      return Object.assign({}, state, { loading: true, scores: action.payload });
    }
    case ScoreAction.CHANGE_RESULT_SCORES: {
      return Object.assign({}, state, { loading: true, resultScores: action.payload })
    }
    default: {
      return state;
    }
  }
}