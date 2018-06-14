import { Injectable } from '@angular/core'
import { ScoreParserProvider } from '../score-parser/score-parser'
import { Score } from '../../entities/Score'

/*
  Generated class for the ScoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ScoreProvider {

  constructor(
    public scoreParser: ScoreParserProvider
  ) {
    console.log('Hello ScoreProvider Provider');
  }

  getScore(inputScore: string): Score {
    const result: Score = this.scoreParser.parse2Score(inputScore, {
      isBigBull: true
    })
    return result
  }

  getTemporaryScore(inputScore: string): Score {
    return this.scoreParser.temporaryScore(inputScore)
  }
}
