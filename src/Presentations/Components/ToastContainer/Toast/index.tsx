import { ToastMessage, useToast } from '@/Presentations/Hooks/Toast'
import { useEffect } from 'react'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'
import { animated } from 'react-spring'

import Styles from './styles.module.scss'

type Props = {
  message: ToastMessage
  style: Record<string, unknown>
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
}

const Toast = ({ message, style }: Props) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => removeToast(message.id), 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [removeToast, message])

  const styles = `${Styles.container} ${Styles[message.type]} ${
    !message.description && Styles.no_description
  }`

  return (
    <animated.div style={style} className={styles}>
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </animated.div>
  )
}

export default Toast
