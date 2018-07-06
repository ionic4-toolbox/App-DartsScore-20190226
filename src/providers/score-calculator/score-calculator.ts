import { Injectable } from '@angular/core'
import { ZerooneCalculatorProvider } from '../zeroone-calculator/zeroone-calculator'
import { CountupCalculatorProvider } from '../countup-calculator/countup-calculator'
import { CricketCalculatorProvider } from '../cricket-calculator/cricket-calculator'

import { GameType } from '../../entities/GameType'
import { Score } from '../../entities/Score'

/*
  Generated class for the ScoreCalculatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ScoreCalculatorProvider {
  constructor(
    private zerooneCalc: ZerooneCalculatorProvider,
    private countupCalc: CountupCalculatorProvider,
    private cricketCalc: CricketCalculatorProvider
  ) {
  }
  /**
   * calcScore
   */
  public calcScore(
    type: GameType,
    resultScores: Score[],
    initScore?: number,
  ): number {
    if (resultScores.length <= 0) {
      throw new Error("result scores don\'t have score")
    }
    let score: number = 0
    switch(type) {
      case GameType.COUNTUP: {
        score = this.countupCalc.calcScore(resultScores)
        break
      }
      case GameType.CRICKET: {
        score = this.cricketCalc.calcScore(resultScores)
        break
      }
      case GameType.ZEROONE: {
        score = this.zerooneCalc.calcScore(resultScores, initScore)
        break
      }
      default: {
        throw new Error("This game type is not available")
      }
    }
    return score
  }
}
