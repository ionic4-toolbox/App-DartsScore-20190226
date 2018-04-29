import * as TodoAction from './action'
import { State, initialState } from './state'

/**
 * Reducer
 */
export function reducer(state = initialState, action: TodoAction.Actions): State {
  switch (action.type) {
    case TodoAction.CREATE: {
      // 作成
      return Object.assign({}, state, { loading: true });
    }
    case TodoAction.CREATE_SUCCESS: {
      // 作成成功したら一覧に追加
      return Object.assign({}, state, { loading: false, scores: action.payload });
    }
    case TodoAction.CREATE_FAILURE: {
      // 作成失敗
      return Object.assign({}, state, { loading: false });
    }
    default: {
      return state;
    }
  }
}