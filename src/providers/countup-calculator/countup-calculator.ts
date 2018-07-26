import { Injectable } from '@angular/core'
import { Score } from '../../entities/Score'

/*
  Generated class for the CountupCalculatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CountupCalculatorProvider {

  calcScore(resultScores: Score[]): number {
    return resultScores.map(v => v.summary).reduce((pre, cul) => pre + cul, 0)
  }

}
