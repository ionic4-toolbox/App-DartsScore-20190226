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
      let scores: Score[][] = state.scores
      console.log(JSON.stringify(action.payload))
      scores[state.activeRound - 1][state.activeShot - 1] = action.payload
      return Object.assign({}, state, { scores })
    }
    case ScoreAction.CHANGE_RESULT_SCORES: {
      return Object.assign({}, state, { loading: true, resultScores: action.payload })
    }
    default: {
      return state
    }
  }
}