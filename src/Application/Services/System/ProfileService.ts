import { User } from '@/Application/Entries/System/User'
import { IProfileService } from '@/Application/Interfaces/System/IProfileService'
import { ChangePasswordModel } from '@/Application/Models/System/ChangePasswordModel'
import { ProfileModel } from '@/Application/Models/System/ProfileModel'
import api from '@/Infra/Providers/Http/AxiosProvider'

export class ProfileService implements IProfileService {
  private _urlBase = '/Profile'

  async saveProfile(profile: ProfileModel): Promise<User> {
    return await api
      .post(this._urlBase, profile)
      .then(response => response.data)
  }

  async changePassword(payload: ChangePasswordModel): Promise<string> {
    return await api
      .post(`${this._urlBase}/Password`, {
        current: payload.current,
        new: payload.newPassword,
        confirmation: payload.confirmation,
      })
      .then(response => response.data)
  }
}
