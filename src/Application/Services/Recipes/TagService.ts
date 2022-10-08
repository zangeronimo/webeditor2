import { Tag } from '@/Application/Entries/Recipes/Tag'
import { ITagService } from '@/Application/Interfaces/Recipes/ITagService'
import { PaginationResponseModel } from '@/Application/Models/PaginationResponseModel'
import { FilterTagModel } from '@/Application/Models/Recipes/FilterTagModel'
import api from '@/Infra/Providers/Http/AxiosProvider'

export class TagService implements ITagService {
  private _urlBase = '/Recipes/Tags'

  async GetAll(
    filter: FilterTagModel,
  ): Promise<PaginationResponseModel<Tag[]>> {
    return await api
      .get(this._urlBase, { params: filter })
      .then(response => response.data)
  }

  async GetByGuid(guid: string): Promise<Tag> {
    return await api
      .get(`${this._urlBase}/${guid}`)
      .then(response => response.data)
  }
}
