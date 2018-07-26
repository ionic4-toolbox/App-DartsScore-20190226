import * as ScoreAction from './action'
import { Score } from '../../../entities/Score'
import { State, initialState } from './state'

/**
 * Reducer
 */
export function reducer(state = initialState, action: ScoreAction.Actions): State {
  switch (action.type) {
    case ScoreAction.INPUT_SCORE: {
      console.log("[INPUT_SCORE]: (x, y) = ("+state.currentRound+", " + state.currentShot + ")")
      let scores: Score[][] = state.scores
      console.log("[INPUT_SCORE]: " + JSON.stringify(action.payload))
      console.log("[INPUT_SCORE]: activeRound: " + state.activeRound + ", activeShot: " + state.activeShot)
      scores[state.activeShot - 1][state.activeRound - 1] = action.payload
      return Object.assign({}, state, { scores })
    }
    case ScoreAction.CHANGE_RESULT_SCORES: {
      let resultScores: Score[] = []
      let result: Score = null
      const lastRound: number = state.scores[0].length
      for(let i = 0; i < lastRound; i++) {
        result = new Score()
        result.count = 0
        result.add(state.scores[0][i])
        result.add(state.scores[1][i])
        result.add(state.scores[2][i])
        resultScores.push(result)
      }
      console.log("[CHANGE_RESULT_SCORES]: " + JSON.stringify(resultScores))
      return Object.assign({}, state, { loading: true, resultScores })
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
    case ScoreAction.CLEAR_SCORE_INFO: {
      console.log("[CLEAR_SCORE_INFO] " + JSON.stringify(initialState))
      return Object.assign({}, state, initialState)
    }
    case ScoreAction.SET_INITIAL_SCORES: {
      console.log("[SET_INITIAL_SCORES] " + JSON.stringify(action.payload))
      let scoreTable: Score[][] = []
      const maxRound: number = action.payload
      for(let i = 0; i < 3; i++) {
        let scoreRow: Score[] = []
        for(let j = 0; j < maxRound; j++) {
          let score: Score = new Score()
          score.count = 0
          score.strValue = ""
          score.intValue = 0
          scoreRow.push(score)
        }
        scoreTable.push(scoreRow)
      }
      console.log("[SET_INITIAL_SCORES] " + JSON.stringify(scoreTable))
      return Object.assign({}, state, { scores: scoreTable })
    }
    case ScoreAction.CHANGE_GAME_TYPE: {
      console.log("[CHANGE_GAME_TYPE]: " + action.payload)
      return Object.assign({}, state, { gameType: action.payload })
    }
    case ScoreAction.CHANGE_CRICKET_TABLE: {
      let cricketTable = Object.assign({}, initialState.cricketTable)
      const result = state.resultScores
      result.map(score => score.getAll())
      .reduce((previous, current) => [...previous, ...current], [])
      .map(score => {
        if (score.intValue >= 15) {
          cricketTable[score.intValue] += score.count
        }
      })
      console.log("[CHANGE_GAME_TYPE]: " + JSON.stringify(cricketTable))
      return Object.assign({}, state, { cricketTable })
    }
    default: {
      return state
    }
  }
}