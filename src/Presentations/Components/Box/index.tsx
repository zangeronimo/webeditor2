import { ReactNode } from 'react'

import Styles from './styles.module.scss'

type Props = {
  direction?: 'row' | 'column'
  children: ReactNode
}

export const Box = ({ direction = 'row', children }: Props) => {
  const styles = `${Styles.container} ${Styles[direction]}`
  return <div className={styles}>{children}</div>
}
