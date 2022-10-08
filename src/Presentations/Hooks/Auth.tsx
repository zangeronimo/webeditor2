import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'
import jwt from 'jwt-decode'
import { UserLoginDto } from '@/Application/DTOs/System/UserLoginDto'
import api from '@/Infra/Providers/Http/AxiosProvider'

type AuthContextData = {
  user: UserLoginDto
  signIn(token: string): Promise<void>
  signOut(): void
  updateUser(user: UserLoginDto): void
  hasPermission(role: string): boolean
  hasAnyPermission(roles: string[]): boolean
}

type AuthState = {
  token: string
  user: UserLoginDto
}

type Props = {
  children: ReactNode
}

const PREFIX = '@WEBEditor'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: Props) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(`${PREFIX}:token`)
    const user = localStorage.getItem(`${PREFIX}:user`)

    if (!!token && !!user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      return {
        token,
        user: JSON.parse(user),
      }
    }

    return {} as AuthState
  })

  const hasPermission = (role: string): boolean => {
    return !!data.user.roles.find(item => item === role)
  }

  const hasAnyPermission = (roles: string[]): boolean => {
    let result = false
    roles.forEach(role => {
      if (data.user.roles.find(item => item === role)) result = true
    })
    return result
  }

  const signIn = useCallback(async (token: string) => {
    const decodedToken = jwt(token)

    const user: UserLoginDto = {
      guid: decodedToken['Guid'],
      name: decodedToken['Name'],
      email: decodedToken['Email'],
      avatar: decodedToken['Avatar'],
      roles: JSON.parse(decodedToken['Roles'] ?? ''),
    }

    localStorage.setItem(`${PREFIX}:token`, token)
    localStorage.setItem(`${PREFIX}:user`, JSON.stringify(user))

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(`${PREFIX}:token`)
    localStorage.removeItem(`${PREFIX}:user`)

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(
    (user: UserLoginDto) => {
      setData({
        token: data.token,
        user,
      })
      localStorage.setItem(`${PREFIX}:user`, JSON.stringify(user))
    },
    [data.token],
  )

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        updateUser,
        hasPermission,
        hasAnyPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): AuthContextData => useContext(AuthContext)

export { AuthProvider, useAuth }
