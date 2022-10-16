import { Category } from '@/Application/Entities/Recipes/Category'
import { ICategoryService } from '@/Application/Interfaces/Recipes/ICategoryService'
import { PaginationResponseModel } from '@/Application/Models/PaginationResponseModel'
import { CategoryPayloadModel } from '@/Application/Models/Recipes/Category/CategoryPayloadModel'
import { FilterCategoryModel } from '@/Application/Models/Recipes/Category/FilterCategoryModel'
import api from '@/Infra/Providers/Http/AxiosProvider'

export class CategoryService implements ICategoryService {
  private _urlBase = '/Recipes/Categories'

  async GetAll(
    filter: FilterCategoryModel,
  ): Promise<PaginationResponseModel<Category[]>> {
    return await api
      .get(this._urlBase, { params: filter })
      .then(response => response.data)
  }

  async GetByGuid(guid: string): Promise<Category> {
    return await api
      .get(`${this._urlBase}/${guid}`)
      .then(response => response.data)
  }

  async Save(payload: CategoryPayloadModel): Promise<Category> {
    if (payload.guid) {
      return await this.Update(payload)
    } else {
      return await this.Create(payload)
    }
  }

  async Delete(guid: string): Promise<Category> {
    return await api
      .delete(`${this._urlBase}/${guid}`)
      .then(response => response.data)
  }

  private async Update(payload: CategoryPayloadModel): Promise<Category> {
    return await api
      .put(`${this._urlBase}/${payload.guid}`, payload)
      .then(response => response.data)
  }

  private async Create(payload: CategoryPayloadModel): Promise<Category> {
    return await api
      .post(this._urlBase, payload)
      .then(response => response.data)
  }
}

