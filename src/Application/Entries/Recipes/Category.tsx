import { ActiveEnum } from '@/Application/Enum/ActiveEnum'

export class Category {
  private _guid: string
  private _name: string
  private _active: ActiveEnum

  constructor(guid: string, name: string, active: ActiveEnum) {
    this._guid = guid
    this._name = name
    this._active = active
  }

  public get guid() {
    return this._guid
  }

  public get name() {
    return this._name
  }

  public get active() {
    return this._active
  }
}
