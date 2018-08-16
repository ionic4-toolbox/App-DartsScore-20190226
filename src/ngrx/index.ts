import { ActionReducerMap } from '@ngrx/store'
import * as fromScore from './score/stores'
import * as fromAuth from './auth/stores'

/**
 * アプリ全体の状態
 */
export interface State {
  score: fromScore.State  // createFeatureSelectorで指定したものと同じ名前にすること
  auth: fromAuth.State
}

/**
 * アプリ全体のStoreとReducerの関連付け
 */
export const reducers: ActionReducerMap<State> = {
  score: fromScore.reducer,
  auth: fromAuth.reducer
}