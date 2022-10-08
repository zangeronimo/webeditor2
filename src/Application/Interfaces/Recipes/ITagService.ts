import { Tag } from '@/Application/Entries/Recipes/Tag'
import { PaginationResponseModel } from '@/Application/Models/PaginationResponseModel'
import { FilterTagModel } from '@/Application/Models/Recipes/FilterTagModel'

export interface ITagService {
  GetAll(filter: FilterTagModel): Promise<PaginationResponseModel<Tag[]>>
  GetByGuid(guid: string): Promise<Tag>
}
