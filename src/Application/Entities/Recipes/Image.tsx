import { ActiveEnum } from '@/Application/Enum/ActiveEnum'

export class Image {
  private _guid: string
  private _path: string
  private _active: ActiveEnum

  constructor(guid: string, path: string, active: ActiveEnum) {
    this._guid = guid
    this._path = path
    this._active = active
  }

  public get guid() {
    return this._guid
  }

  public get path() {
    return this._path
  }

  public get active() {
    return this._active
  }
}
