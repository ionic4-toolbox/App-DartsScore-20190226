import * as ScoreAction from './action'
import { Score } from '../../../entities/Score'
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
    case ScoreAction.INPUT_SCORE: {
      console.log("[INPUT_SCORE]: (x, y) = ("+state.currentRound+", " + state.currentShot + ")")
      let scores: Score[][] = state.scores
      console.log("[INPUT_SCORE]: " + JSON.stringify(action.payload))
      console.log("[INPUT_SCORE]: activeRound: " + state.activeRound + ", activeShot: " + state.activeShot)
      scores[state.activeShot - 1][state.activeRound - 1] = action.payload
      return Object.assign({}, state, { scores })
    }
    case ScoreAction.CHANGE_RESULT_SCORES: {
      return Object.assign({}, state, { loading: true, resultScores: action.payload })
    }
    case ScoreAction.INCREMENT_CURRENT_POINTER: {
      const nextPointer: number = state.currentPointer + 1
      const nextRound: number = Math.floor((nextPointer) / 3) + 1
      console.log("[INCREMENT_CURRENT_POINTER]: " + nextPointer + ", currentShot: " + (nextPointer % 3 + 1) + ", currentRound: " + nextRound)
      if (nextRound <= state.limitRound) {
        return Object.assign({}, state, { currentPointer: nextPointer, currentShot: nextPointer % 3 + 1, currentRound: nextRound })
      } else {
        return Object.assign({}, state)
      }
    }
    case ScoreAction.INCREMENT_ACTIVE_POINTER: {
      const nextPointer: number = state.activePointer + 1
      const nextRound: number = Math.floor((nextPointer) / 3) + 1
      console.log("[INCREMENT_ACTIVE_POINTER]: " + nextPointer + ", activeShot: " + (nextPointer % 3 + 1) + ", activeRound: " + nextRound)
      if (nextRound <= state.limitRound) {
        return Object.assign({}, state, { activePointer: nextPointer, activeShot: nextPointer % 3 + 1, activeRound: nextRound })
      } else {
        return Object.assign({}, state)
      }
    }
    case ScoreAction.DECREMENT_ACTIVE_POINTER: {
      const nextPointer: number = state.activePointer - 1
      const round: number = Math.floor((nextPointer + 1) / 3) + 1
      console.log("[DECREMENT_ACTIVE_POINTER]: " + nextPointer + ", activeShot: " + (nextPointer % 3 + 1) + ", activeRound: " + round)
      if (state.activePointer > 0) {
        return Object.assign({}, state, { activePointer: nextPointer, activeShot: nextPointer % 3 + 1, activeRound: round })
      } else {
        return Object.assign({}, state)
      }
    }
    default: {
      return state
    }
  }
}