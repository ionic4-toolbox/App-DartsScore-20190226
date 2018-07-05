import { Injectable } from '@angular/core'
import { Score } from '../../entities/Score'

/*
  Generated class for the ZerooneCalculatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ZerooneCalculatorProvider {

  calcScore(resultScores: Score[], initScore: number): number {
    return initScore - resultScores.map(value => value.summary).reduce((pre, cul) => pre + cul)
  }

}
