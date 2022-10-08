import api from '@/Infra/Providers/Http/AxiosProvider'
import { createContext, ReactNode, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '../Components/Spinner'

type Props = {
  children: ReactNode
}

const InterceptorContext = createContext({})

const InterceptorProvider = ({ children }: Props) => {
  const [state, setState] = useState({ showSpinner: false })

  const navigate = useNavigate()

  api.interceptors.request.use(
    function (config) {
      setState(old => ({ ...old, showSpinner: true }))
      return config
    },
    error => {
      setState(old => ({ ...old, showSpinner: false }))
      return Promise.reject(error)
    },
  )

  api.interceptors.response.use(
    function (response) {
      setState(old => ({ ...old, showSpinner: false }))
      return response
    },
    error => {
      setState(old => ({ ...old, showSpinner: false }))
      if (error.response?.status === 401) navigate('/auth')

      return Promise.reject(error)
    },
  )

  return (
    <InterceptorContext.Provider value={{}}>
      {state.showSpinner && <Spinner />}
      {children}
    </InterceptorContext.Provider>
  )
}

const useInterceptor = () => useContext(InterceptorContext)

export { InterceptorProvider, useInterceptor }
