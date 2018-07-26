import { Injectable } from '@angular/core'
/*
  Generated class for the CricketCalculatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CricketCalculatorProvider {

  calcScore(cricketTable: object): number {
    const result = Object.keys(cricketTable).map(v => {
      return { "num": v, "count": cricketTable[v]}
    })
    .filter(object => object.count > 3)
    .map(v => parseInt(v.num) * (v.count - 3))
    .reduce((pre, current) => pre + current, 0)
    return result
  }
}
