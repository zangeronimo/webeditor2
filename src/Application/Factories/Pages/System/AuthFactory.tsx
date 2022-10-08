import { useDependencyInjection } from '@/Presentations/Hooks/DependencyInjection'
import { Login } from '@/Presentations/Pages/System/Login'
import { AuthValidation } from '../../Validations/System/AuthValidation'

export const AuthFactory = () => {
  const { makeInjection } = useDependencyInjection()
  return (
    <Login
      _validation={AuthValidation()}
      _auth={makeInjection('IAuthService')}
    />
  )
}
