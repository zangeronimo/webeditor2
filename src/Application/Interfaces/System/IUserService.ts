import { User } from '@/Application/Entities/System/User'
import { PaginationResponseModel } from '@/Application/Models/PaginationResponseModel'
import { FilterUserModel } from '@/Application/Models/System/FilterUserModel'

export interface IUserService {
  GetAll(filter: FilterUserModel): Promise<PaginationResponseModel<User[]>>
  GetByGuid(guid: string): Promise<User>
}

