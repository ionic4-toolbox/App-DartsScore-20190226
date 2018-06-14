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
      console.log(JSON.stringify(action.payload))
      scores[state.activeRound][state.activeShot] = action.payload
      return Object.assign({}, state, { scores })
    }
    case ScoreAction.CHANGE_RESULT_SCORES: {
      return Object.assign({}, state, { loading: true, resultScores: action.payload })
    }
    case ScoreAction.INCREMENT_CURRENT_POINTER: {
      console.log("[INCREMENT_CURRENT_POINTER]")
      const nextPointer: number = state.currentPointer++
      const round: number = Math.floor((nextPointer + 1) / 3) + 1
      if (state.limitRound <= round) {
        return Object.assign({}, state, { currentPointer: nextPointer, currentShot: nextPointer % 3 + 1, currentRound: round })
      } else {
        return Object.assign({}, state)
      }
    }
    case ScoreAction.INCREMENT_ACTIVE_POINTER: {
      console.log("[INCREMENT_ACTIVE_POINTER]")
      const nextPointer: number = state.activePointer++
      const round: number = Math.floor((nextPointer + 1) / 3) + 1
      if (state.limitRound <= round) {
        return Object.assign({}, state, { activePointer: nextPointer, activeShot: nextPointer % 3 + 1, activeRound: round })
      } else {
        return Object.assign({}, state)
      }
    }
    case ScoreAction.DECREMENT_ACTIVE_POINTER: {
      console.log("[DECREMENT_ACTIVE_POINTER]")
      const nextPointer: number = state.activePointer--
      const round: number = Math.floor((nextPointer + 1) / 3) + 1
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