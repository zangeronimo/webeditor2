import { Recipe } from '@/Application/Entries/Recipes/Recipe'
import { ActiveEnum } from '@/Application/Enum/ActiveEnum'

export class RecipePayloadModel {
  guid?: string
  name: string
  ingredients: string
  preparation: string
  recipeCategoryGuid: string
  active: ActiveEnum
  image?: string
  tags?: string[]

  constructor(recipe: Recipe) {
    this.guid = recipe.guid
    this.name = recipe.name
    this.ingredients = recipe.ingredients
    this.preparation = recipe.preparation
    this.recipeCategoryGuid = recipe.recipeCategoryGuid
    this.active = recipe.active
    this.tags = recipe.recipeTags?.map(tag => tag.guid)
  }
}
