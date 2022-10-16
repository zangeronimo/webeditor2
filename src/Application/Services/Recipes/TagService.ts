import { Tag } from '@/Application/Entities/Recipes/Tag'
import { ITagService } from '@/Application/Interfaces/Recipes/ITagService'
import { PaginationResponseModel } from '@/Application/Models/PaginationResponseModel'
import { FilterTagModel } from '@/Application/Models/Recipes/Tag/FilterTagModel'
import { TagPayloadModel } from '@/Application/Models/Recipes/Tag/TagPayloadModel'
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

  async Save(payload: TagPayloadModel): Promise<Tag> {
    if (payload.guid) {
      return await this.Update(payload)
    } else {
      return await this.Create(payload)
    }
  }

  async Delete(guid: string): Promise<Tag> {
    return await api
      .delete(`${this._urlBase}/${guid}`)
      .then(response => response.data)
  }

  private async Update(payload: TagPayloadModel): Promise<Tag> {
    return await api
      .put(`${this._urlBase}/${payload.guid}`, payload)
      .then(response => response.data)
  }

  private async Create(payload: TagPayloadModel): Promise<Tag> {
    return await api
      .post(this._urlBase, payload)
      .then(response => response.data)
  }
}
