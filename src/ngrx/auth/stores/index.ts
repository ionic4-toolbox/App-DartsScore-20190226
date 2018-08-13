import { createSelector, createFeatureSelector } from '@ngrx/store'
import { State } from './state'
import { reducer } from './reducer'

export { State, reducer }
/**
 * セレクタ（Storeから特定の状態を取得する）
 */
export const getState = createFeatureSelector<State>('auth')
export const getUser = createSelector(getState, state => state.user)