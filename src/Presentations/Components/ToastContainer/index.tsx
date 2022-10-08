import { useTransition } from 'react-spring'
import Toast from './Toast'

import Styles from './styles.module.scss'
import { ToastMessage } from '@/Presentations/Hooks/Toast'

type Props = {
  messages: ToastMessage[]
}

const ToastContainer = ({ messages }: Props) => {
  const messagesWithTransitions = useTransition(messages, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  })

  return (
    <div className={Styles.container}>
      {messagesWithTransitions((styles, item) => (
        <Toast message={item} style={styles} />
      ))}
    </div>
  )
}

export default ToastContainer
