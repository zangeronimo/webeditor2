import { ReactNode, SelectHTMLAttributes } from 'react'
import Styles from './styles.module.scss'

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string
  label: string
  error?: string
  defaultValue?: string | number
  children: ReactNode
}

export const Select = ({
  name,
  label,
  defaultValue,
  error = '',
  children,
  ...rest
}: Props) => {
  return (
    <div className={Styles.container}>
      <label htmlFor={name}>{label}</label>
      <select id={name} value={defaultValue} {...rest}>
        {children}
      </select>
      {error && <p>{error}</p>}
    </div>
  )
}
