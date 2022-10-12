import { ActiveEnum } from '@/Application/Enum/ActiveEnum'
import { Category } from './Category'

export class Recipe {
  private _guid: string
  private _name: string
  private _ingredients: string
  private _preparation: string
  private _active: ActiveEnum
  private _recipeCategoryGuid: string
  private _recipeCategory: Category
  private _image: string

  constructor(
    guid: string,
    name: string,
    ingredients: string,
    preparation: string,
    active: ActiveEnum,
    recipeCategoryGuid: string,
    image: string,
  ) {
    this._guid = guid
    this._name = name
    this._ingredients = ingredients
    this._preparation = preparation
    this._active = active
    this._recipeCategoryGuid = recipeCategoryGuid
    this._image = image
  }

  public get guid() {
    return this._guid
  }

  public get name() {
    return this._name
  }

  public get ingredients() {
    return this._ingredients
  }

  public get preparation() {
    return this._preparation
  }

  public get recipeCategoryGuid() {
    return this._recipeCategoryGuid
  }

  public get recipeCategory() {
    return this._recipeCategory
  }

  public get active() {
    return this._active
  }

  public get image() {
    return this._image
  }
}
