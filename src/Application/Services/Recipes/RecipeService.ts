import { Recipe } from '@/Application/Entities/Recipes/Recipe'
import { IRecipeService } from '@/Application/Interfaces/Recipes/IRecipeService'
import { PaginationResponseModel } from '@/Application/Models/PaginationResponseModel'
import { FilterRecipeModel } from '@/Application/Models/Recipes/Recipe/FilterRecipeModel'
import { RecipePayloadModel } from '@/Application/Models/Recipes/Recipe/RecipePayloadModel'
import api from '@/Infra/Providers/Http/AxiosProvider'

export class RecipeService implements IRecipeService {
  private _urlBase = '/Recipes'

  async GetAll(
    filter: FilterRecipeModel,
  ): Promise<PaginationResponseModel<Recipe[]>> {
    return await api.get(this._urlBase, { params: filter }).then(response => {
      const pagination = response.data
      pagination.result.map(recipe => {
        recipe.recipeCategoryGuid = recipe.recipeCategory.guid
        return recipe
      })

      return pagination
    })
  }

  async GetByGuid(guid: string): Promise<Recipe> {
    return await api.get(`${this._urlBase}/${guid}`).then(response => {
      const result = response.data
      result.recipeCategoryGuid = response.data.recipeCategory.guid

      return result
    })
  }

  async Save(payload: RecipePayloadModel): Promise<Recipe> {
    if (payload.guid) {
      return await this.Update(payload)
    } else {
      return await this.Create(payload)
    }
  }

  async Delete(guid: string): Promise<Recipe> {
    return await api
      .delete(`${this._urlBase}/${guid}`)
      .then(response => response.data)
  }

  private async Update(payload: RecipePayloadModel): Promise<Recipe> {
    return await api
      .put(`${this._urlBase}/${payload.guid}`, payload)
      .then(response => response.data)
  }

  private async Create(payload: RecipePayloadModel): Promise<Recipe> {
    return await api
      .post(this._urlBase, payload)
      .then(response => response.data)
  }
}

