import { Recipe } from '@/Application/Entities/Recipes/Recipe'
import { PaginationResponseModel } from '@/Application/Models/PaginationResponseModel'
import { RecipePayloadModel } from '@/Application/Models/Recipes/Recipe/RecipePayloadModel'
import { FilterRecipeModel } from '@/Application/Models/Recipes/Recipe/FilterRecipeModel'

export interface IRecipeService {
  GetAll(filter: FilterRecipeModel): Promise<PaginationResponseModel<Recipe[]>>
  GetByGuid(guid: string): Promise<Recipe>
  Save(payload: RecipePayloadModel): Promise<Recipe>
  Delete(guid: string): Promise<Recipe>
}

