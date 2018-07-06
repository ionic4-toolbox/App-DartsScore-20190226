import { Injectable } from '@angular/core'
import { Score } from '../../entities/Score'

/*
  Generated class for the CricketCalculatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CricketCalculatorProvider {

  calcScore(resultScores: Score[]): number {
    const cricketTable = {
      15: 0,
      16: 0,
      17: 0,
      18: 0,
      19: 0,
      20: 0,
      25: 0
    }
    resultScores.map(score => score.getAll())
    .reduce((previous, current) => [...previous, ...current], [])
    .map(score => {
      cricketTable[score.intValue] += score.count
    })

    const result = Object.keys(cricketTable).map(v => {
      return { "num": v, "count": cricketTable[v]}
    })
    .filter(object => object.count > 3)
    .map(v => parseInt(v.num) * (v.count - 3))
    .reduce((pre, current) => pre + current, 0)
    return result
  }
}
