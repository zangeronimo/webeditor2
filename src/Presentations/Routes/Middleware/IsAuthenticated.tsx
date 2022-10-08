import { useAuth } from '@/Presentations/Hooks/Auth'

type Props = {
  children: JSX.Element
}

export const IsAuthenticated = ({ children }: Props) => {
  const { user } = useAuth()
  if (user) {
    return children
  }
  window.location.href = '/auth'
}
