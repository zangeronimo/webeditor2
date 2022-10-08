import { useAuth } from '@/Presentations/Hooks/Auth'
import { FaPowerOff } from 'react-icons/fa'

import Styles from './styles.module.scss'

export const LogOutButton = () => {
  const { signOut } = useAuth()

  return (
    <div className={Styles.container}>
      <button title="Sign Out" onClick={signOut}>
        <FaPowerOff />
      </button>
    </div>
  )
}
