import { Category } from '@/Application/Entities/Recipes/Category'
import { PaginationResponseModel } from '@/Application/Models/PaginationResponseModel'
import { CategoryPayloadModel } from '@/Application/Models/Recipes/Category/CategoryPayloadModel'
import { FilterCategoryModel } from '@/Application/Models/Recipes/Category/FilterCategoryModel'

export interface ICategoryService {
  GetAll(
    filter: FilterCategoryModel,
  ): Promise<PaginationResponseModel<Category[]>>
  GetByGuid(guid: string): Promise<Category>
  Save(payload: CategoryPayloadModel): Promise<Category>
  Delete(guid: string): Promise<Category>
}

