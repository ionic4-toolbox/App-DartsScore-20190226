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
  
  private _intValue: number
  private _strValue: string
  private _count: number
}
