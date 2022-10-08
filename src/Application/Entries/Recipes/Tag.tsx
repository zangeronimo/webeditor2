export class Tag {
  private _guid: string
  private _name: string
  private _active?: boolean
  private _recipeCategoryGuid: string

  constructor(
    guid: string,
    name: string,
    active: boolean,
    recipeCategoryGuid: string,
  ) {
    this._guid = guid
    this._name = name
    this._active = active
    this._recipeCategoryGuid = recipeCategoryGuid
  }

  public get guid() {
    return this._guid
  }

  public get name() {
    return this._name
  }

  public get recipeCategoryGuid() {
    return this._recipeCategoryGuid
  }

  public get active() {
    return this._active
  }
}
