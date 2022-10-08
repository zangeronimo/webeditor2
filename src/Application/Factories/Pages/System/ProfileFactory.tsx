import { useDependencyInjection } from '@/Presentations/Hooks/DependencyInjection'
import { Profile } from '@/Presentations/Pages/System/Profile'
import {
  ProfileValidationData,
  ProfileValidationPassword,
} from '../../Validations/System/ProfileValidation'

export const ProfileFactory = () => {
  const { makeInjection } = useDependencyInjection()
  return (
    <Profile
      _validations={{
        data: ProfileValidationData(),
        password: ProfileValidationPassword(),
      }}
      _profile={makeInjection('IProfileService')}
    />
  )
}
