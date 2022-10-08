import { User } from '@/Application/Entries/System/User'
import { ChangePasswordModel } from '@/Application/Models/System/ChangePasswordModel'
import { ProfileModel } from '@/Application/Models/System/ProfileModel'

export interface IProfileService {
  saveProfile(profile: ProfileModel): Promise<User>
  changePassword(payload: ChangePasswordModel): Promise<string>
}
