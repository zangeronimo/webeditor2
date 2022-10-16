import { Rate } from '@/Application/Entities/Recipes/Rate'
import { ActiveEnum } from '@/Application/Enum/ActiveEnum'
import { PaginationResponseModel } from '@/Application/Models/PaginationResponseModel'
import { FilterRateModel } from '@/Application/Models/Recipes/Rate/FilterRateModel'

export interface IRateService {
  GetAll(filter: FilterRateModel): Promise<PaginationResponseModel<Rate[]>>
  UpdateState(guid: string, state: ActiveEnum): Promise<Rate>
  Delete(guid: string): Promise<Rate>
}
