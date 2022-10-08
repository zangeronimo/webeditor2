import { ButtonHTMLAttributes, ReactNode } from 'react'

import Styles from './styles.module.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  skin?: 'primary' | 'secondary'
  children: ReactNode
}

export const Button = ({ skin = 'primary', children, ...rest }: Props) => {
  const styles = `${Styles.container} ${Styles[skin]}`
  return (
    <button className={styles} {...rest}>
      {children}
    </button>
  )
}
