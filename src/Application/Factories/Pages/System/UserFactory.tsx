import { useDependencyInjection } from '@/Presentations/Hooks/DependencyInjection'
import { SystemUsers } from '@/Presentations/Pages/System/SystemUsers'

export const UserFactory = () => {
  const { makeInjection } = useDependencyInjection()
  return <SystemUsers _user={makeInjection('IUserService')} />
}
