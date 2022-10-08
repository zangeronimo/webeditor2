import { User } from '@/Application/Entries/System/User'
import { IUserService } from '@/Application/Interfaces/System/IUserService'
import { PaginationResponseModel } from '@/Application/Models/PaginationResponseModel'
import { FilterUserModel } from '@/Application/Models/System/FilterUserModel'
import api from '@/Infra/Providers/Http/AxiosProvider'

export class UserService implements IUserService {
  private _urlBase = '/SystemUser'

  async GetAll(
    filter: FilterUserModel,
  ): Promise<PaginationResponseModel<User[]>> {
    return await api
      .get(this._urlBase, { params: filter })
      .then(response => response.data)
  }

  async GetByGuid(guid: string): Promise<User> {
    return await api
      .get(`${this._urlBase}/${guid}`)
      .then(response => response.data)
  }
}
