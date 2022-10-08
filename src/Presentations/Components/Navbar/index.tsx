import { memo, ReactNode } from 'react'
import { SidebarButton } from '../Sidebar/SidebarButton'

import Styles from './styles.module.scss'

type Props = {
  children: ReactNode
}

const Navbar = ({ children }: Props) => {
  return (
    <nav className={Styles.container}>
      <div>
        <SidebarButton />
      </div>
      <div>{children}</div>
    </nav>
  )
}

export default memo(Navbar)
