import { ReactNode } from 'react'
import { AuthProvider } from './Auth'
import { DependencyInjectionProvider } from './DependencyInjection'
import { InterceptorProvider } from './Interceptor'
import { ToastProvider } from './Toast'

type Props = {
  children: ReactNode
}

export const Hooks = ({ children }: Props) => {
  return (
    <ToastProvider>
      <InterceptorProvider>
        <AuthProvider>
          <DependencyInjectionProvider>{children}</DependencyInjectionProvider>
        </AuthProvider>
      </InterceptorProvider>
    </ToastProvider>
  )
}
