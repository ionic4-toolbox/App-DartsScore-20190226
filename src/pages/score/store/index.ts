import { createSelector, createFeatureSelector } from '@ngrx/store'
import { State } from './state'
import { reducer } from './reducer'

export { State, reducer }
/**
 * セレクタ（Storeから特定の状態を取得する）
 */
export const getState = createFeatureSelector<State>('score')
export const getLoading = createSelector(getState, state => state.loading)
export const getScores = createSelector(getState, state => state.scores)
export const getResultScores = createSelector(getState, state => state.resultScores)
export const getCricketTable = createSelector(getState, state => state.cricketTable)
export const get4ScoreTable = createSelector(getState, state => {
  return {
    scores: state.scores,
    resultScores: state.resultScores,
    activeRound: state.activeRound,
    activeShot: state.activeShot,
    activePointer: state.activePointer,
    gameType: state.gameType
  }
})
export const get4ScoreDisplay = createSelector(getState, state => {
  return {
    resultScores: state.resultScores,
    gameType: state.gameType,
    cricketTable: state.cricketTable
  }
})