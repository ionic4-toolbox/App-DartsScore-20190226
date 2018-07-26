import { GameType } from '../entities/GameType'
import { Score } from '../entities/Score'

export interface GameScore {
  gameType: GameType,
  scores: Score[][],
  resultScores: Score[],
  cricketTable: object
}
