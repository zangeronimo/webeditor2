import { Image } from '@/Application/Entities/Recipes/Image'
import { ActiveEnum } from '@/Application/Enum/ActiveEnum'
import { PaginationResponseModel } from '@/Application/Models/PaginationResponseModel'
import { FilterImageModel } from '@/Application/Models/Recipes/Image/FilterImageModel'

export interface IImageService {
  GetAll(filter: FilterImageModel): Promise<PaginationResponseModel<Image[]>>
  UpdateState(guid: string, state: ActiveEnum): Promise<Image>
  Delete(guid: string): Promise<Image>
}
