import { HTMLAttributes } from 'react'
import { IconType } from 'react-icons'

import Styles from './styles.module.scss'

type Props = HTMLAttributes<HTMLButtonElement> & {
  icon: IconType
  title: string
}

export const IconButton = ({ icon: Icon, title, ...rest }: Props) => {
  return (
    <button className={Styles.container} title={title} {...rest}>
      <Icon />
    </button>
  )
}
