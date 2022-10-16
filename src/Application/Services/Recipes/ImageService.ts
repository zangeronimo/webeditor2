import { IImageService } from '@/Application/Interfaces/Recipes/IImageService'
import { Image } from '@/Application/Entities/Recipes/Image'
import { PaginationResponseModel } from '@/Application/Models/PaginationResponseModel'
import { FilterImageModel } from '@/Application/Models/Recipes/Image/FilterImageModel'
import api from '@/Infra/Providers/Http/AxiosProvider'
import { ActiveEnum } from '@/Application/Enum/ActiveEnum'

export class ImageService implements IImageService {
  private _urlBase = '/Recipes/Images'

  async GetAll(
    filter: FilterImageModel,
  ): Promise<PaginationResponseModel<Image[]>> {
    return await api
      .get(this._urlBase, { params: filter })
      .then(response => response.data)
  }

  async UpdateState(guid: string, state: ActiveEnum): Promise<Image> {
    return await api
      .patch(`${this._urlBase}/${guid}/${state}`)
      .then(response => response.data)
  }

  async Delete(guid: string): Promise<Image> {
    return await api
      .delete(`${this._urlBase}/${guid}`)
      .then(response => response.data)
  }
}
