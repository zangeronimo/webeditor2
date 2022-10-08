import { CategoryService } from '@/Application/Services/Recipes/CategoryService'
import { TagService } from '@/Application/Services/Recipes/TagService'
import { AuthService } from '@/Application/Services/System/AuthService'
import { ProfileService } from '@/Application/Services/System/ProfileService'
import { UserService } from '@/Application/Services/System/UserService'
import { createContext, ReactNode, useContext } from 'react'

type DependencyInjectionContextData = {
  makeInjection(interfaceInject: string): any
}

type Props = {
  children: ReactNode
}
const DependencyInjectionContext = createContext(
  {} as DependencyInjectionContextData,
)

const DependencyInjectionProvider = ({ children }: Props) => {
  const DI = {
    IAuthService: AuthService,
    IUserService: UserService,
    IProfileService: ProfileService,
    ITagService: TagService,
    ICategoryService: CategoryService,
  }

  const Injected: { [key: string]: object } = {}

  const makeInjection = (interfaceInject: string) => {
    if (!Injected[interfaceInject])
      Injected[interfaceInject] = new DI[interfaceInject]()

    return Injected[interfaceInject]
  }

  return (
    <DependencyInjectionContext.Provider value={{ makeInjection }}>
      {children}
    </DependencyInjectionContext.Provider>
  )
}

const useDependencyInjection = (): DependencyInjectionContextData => {
  return useContext(DependencyInjectionContext)
}

export { DependencyInjectionProvider, useDependencyInjection }
