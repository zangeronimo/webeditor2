import { useAuth } from '@/Presentations/Hooks/Auth'
import { memo, ReactNode } from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import { LogOutButton } from '../Sidebar/LogOutButton'
import Styles from './styles.module.scss'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const { user } = useAuth()

  if (!user) return <>{children}</>

  return (
    <div className={Styles.container}>
      <Sidebar />
      <div className={Styles.content}>
        <Navbar>
          <LogOutButton />
        </Navbar>
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default memo(Layout)
