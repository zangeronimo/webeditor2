import { IRateService } from '@/Application/Interfaces/Recipes/IRateService'
import { Rate } from '@/Application/Entities/Recipes/Rate'
import { PaginationResponseModel } from '@/Application/Models/PaginationResponseModel'
import { FilterRateModel } from '@/Application/Models/Recipes/Rate/FilterRateModel'
import api from '@/Infra/Providers/Http/AxiosProvider'
import { ActiveEnum } from '@/Application/Enum/ActiveEnum'

export class RateService implements IRateService {
  private _urlBase = '/Recipes/Rates'

  async GetAll(
    filter: FilterRateModel,
  ): Promise<PaginationResponseModel<Rate[]>> {
    return await api
      .get(this._urlBase, { params: filter })
      .then(response => response.data)
  }

  async UpdateState(guid: string, state: ActiveEnum): Promise<Rate> {
    return await api
      .patch(`${this._urlBase}/${guid}/${state}`)
      .then(response => response.data)
  }

  async Delete(guid: string): Promise<Rate> {
    return await api
      .delete(`${this._urlBase}/${guid}`)
      .then(response => response.data)
  }
}
