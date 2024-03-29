import { Injectable } from '@angular/core'
import { Score } from '../../entities/Score'

/*
  Generated class for the ScoreParserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ScoreParserProvider {

  constructor() {
    console.log('Hello ScoreParserProvider Provider')
  }

  parse2Score(input: string, option: any): Score {
    if (!this.isValidRegScore(input)) {
      throw new Error("Invalid Input Score")
    }
    if (input.length <= 0) {
      throw new Error("String Length is lower than 1")
    }
    let score: Score = new Score()
    score.strValue = input
    score.intValue = this.getIntValue(input, option)
    score.count = this.getCount(input)
    return score
  }

  temporaryScore(input: string): Score {
    let score: Score = new Score()
    score.strValue = input
    score.intValue = 1
    score.count = 1
    return score
  }

  private getCount(input: string): number {
    const prefix: string = this.getPrefix(input)
    if (prefix === 'T') {
      return 3
    } else if (prefix === 'D') {
      return 2
    } else if (prefix === '-') {
      return 0
    } else {
      return 1
    }
  }

  private getIntValue(input: string, option: any): number {
    const strValue: string = this.getValueExceptedForDoubleTriple(input)
    if (strValue === '-') {
      return 0
    } else if (strValue === 'Bull') {
      if (!this.isDouble(input) && !this.isTriple(input) && option.isBigBull) {
        return 50
      }
      return 25
    } else {
      return Number(strValue)
    }
  }

  private getPrefix(input: string): string {
    return input.substr(0, 1)
  }

  private getValueExceptedForDoubleTriple(input: string): string {
    if (this.isDouble(input) || this.isTriple(input)) {
      return input.substr(1)
    }
    return input
  }

  private isValidRegScore(input: string): boolean {
    return input.match(/^D?([1-9]|1[0-9]|20|Bull)$|^T?([1-9]|1[0-9]|20)$|^-$/gi) !== null
  }
  
  private isDouble(input: string): boolean {
    return this.getPrefix(input) === 'D'
  }

  private isTriple(input: string): boolean {
    return this.getPrefix(input) === 'T'
  }
}
