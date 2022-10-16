import { ActiveEnum } from '@/Application/Enum/ActiveEnum'

export class Rate {
  private _guid: string
  private _rate: number
  private _comment: string
  private _active: ActiveEnum

  constructor(guid: string, rate: number, comment: string, active: ActiveEnum) {
    this._guid = guid
    this._rate = rate
    this._comment = comment
    this._active = active
  }

  public get guid() {
    return this._guid
  }

  public get rate() {
    return this._rate
  }

  public get comment() {
    return this._comment
  }

  public get active() {
    return this._active
  }
}
