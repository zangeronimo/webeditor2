import { InputHTMLAttributes } from 'react'
import Styles from './styles.module.scss'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  error?: string
}

export const Input = ({ label, name, error = '', ...rest }: Props) => {
  return (
    <div className={Styles.container}>
      <label htmlFor={name}>{label}</label>
      <input id={name} {...rest} />
      {error && <p>{error}</p>}
    </div>
  )
}
