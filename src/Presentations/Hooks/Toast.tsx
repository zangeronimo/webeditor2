import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'
import { v4 as uuid } from 'uuid'

import ToastContainer from '../Components/ToastContainer'

export interface ToastMessage {
  id: string
  type?: 'success' | 'error' | 'info'
  title: string
  description?: string
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void
  addSuccess(description?: string): void
  addError(description?: string): void
  removeToast(id: string): void
}

type Props = {
  children: ReactNode
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

const ToastProvider = ({ children }: Props) => {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid()

      const toast = {
        id,
        type,
        title,
        description,
      }

      setMessages(oldMessages => [...oldMessages, toast])
    },
    [],
  )

  const addSuccess = (description = 'Operation performed successfully!') => {
    addToast({
      title: 'Success',
      description,
      type: 'success',
    })
  }

  const addError = (description = 'Failed to perform operation.') => {
    addToast({
      title: 'Error',
      description,
      type: 'error',
    })
  }

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id))
  }, [])

  return (
    <ToastContext.Provider
      value={{ addToast, addSuccess, addError, removeToast }}
    >
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

const useToast = () => useContext(ToastContext)

export { ToastProvider, useToast }
