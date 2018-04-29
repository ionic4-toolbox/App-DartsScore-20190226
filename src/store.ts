import { ActionReducerMap } from '@ngrx/store'
import * as fromScore from './pages/score/store'

/**
 * アプリ全体の状態
 */
export interface State {
  score: fromScore.State;  // createFeatureSelectorで指定したものと同じ名前にすること
}

/**
 * アプリ全体のStoreとReducerの関連付け
 */
export const reducers: ActionReducerMap<State> = {
  score: fromScore.reducer
}