import { Tag } from '@/Application/Entries/Recipes/Tag'
import { PaginationResponseModel } from '@/Application/Models/PaginationResponseModel'
import { FilterTagModel } from '@/Application/Models/Recipes/Tag/FilterTagModel'
import { TagPayloadModel } from '@/Application/Models/Recipes/Tag/TagPayloadModel'

export interface ITagService {
  GetAll(filter: FilterTagModel): Promise<PaginationResponseModel<Tag[]>>
  GetByGuid(guid: string): Promise<Tag>
  Save(payload: TagPayloadModel): Promise<Tag>
  Delete(guid: string): Promise<Tag>
}
