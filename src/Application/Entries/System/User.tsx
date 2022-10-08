export class User {
  private _guid: string
  private _name: string
  private _email: string
  private _avatar?: string
  private _active?: boolean
  private _roles?: string[]

  constructor(
    guid: string,
    name: string,
    email: string,
    avatar: string,
    active: boolean,
    roles: string[],
  ) {
    this._guid = guid
    this._name = name
    this._email = email
    this._avatar = avatar
    this._active = active
    this._roles = roles
  }

  public get guid() {
    return this._guid
  }

  public get name() {
    return this._name
  }

  public get email() {
    return this._email
  }

  public get avatar() {
    return this._avatar
  }

  public get active() {
    return this._active
  }

  public get roles() {
    return this._roles
  }
}
