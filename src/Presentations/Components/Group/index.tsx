import { ReactNode } from 'react'

import Styles from './styles.module.scss'

type Props = {
  display?: 'column' | 'row'
  align?: 'left' | 'center' | 'right'
  children: ReactNode
}

export const Group = ({ display = 'row', align = 'left', children }: Props) => {
  const styles = `${Styles.container} ${Styles[display]} ${Styles[align]}`
  return <div className={styles}>{children}</div>
}
