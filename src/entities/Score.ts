export class Score {
  get strValue(): string {
    return this._strValue
  }

  get intValue(): number {
    return this._intValue
  }

  get count(): number {
    return this._count
  }

  set count(value: number) {
    this._count = value
  }

  set value(value: string) {
    this._strValue = value
    this._intValue = Number(value)
  }

  public add(score: Score) {
    this._scores.push(score)
  }
  
  get summary(): number {
    let sum = 0
    this._scores.forEach(value => {
      sum += value._intValue * value._count
    })
    return sum
  }
  
  private _intValue: number = -1
  private _strValue: string = ""
  private _count: number = 0
  private _scores: Score[] = []
}
