import * as ScoreAction from './action'
import { State, initialState } from './state'

/**
 * Reducer
 */
export function reducer(state = initialState, action: ScoreAction.Actions): State {
  switch (action.type) {
    case ScoreAction.CREATE: {
      // 作成
      return Object.assign({}, state, { loading: true, scores: action.payload });
    }
    case ScoreAction.CHANGE_SCORE_RESULT: {
      return Object.assign({}, state, { loading: true, resultScores: action.payload })
    }
    case ScoreAction.CREATE_SUCCESS: {
      // 作成成功したら一覧に追加
      return Object.assign({}, state, { loading: false, scores: action.payload });
    }
    case ScoreAction.CREATE_FAILURE: {
      // 作成失敗
      return Object.assign({}, state, { loading: false });
    }
    default: {
      return state;
    }
  }
}