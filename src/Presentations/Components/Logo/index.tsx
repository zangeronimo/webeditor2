import { useEffect, useState } from 'react'
import Styles from './logo.module.scss'

type Props = {
  min?: boolean
}

export const Logo = ({ min = false }: Props) => {
  const minState = { initial: 'W', final: '' }
  const normalState = { initial: 'WEB', final: 'Editor' }
  const [state, setState] = useState(normalState)

  useEffect(() => {
    if (min) setState(minState)
    else setState(normalState)
  }, [min])

  return (
    <h1 className={Styles.container}>
      {state.initial}
      <span>{state.final}</span>
    </h1>
  )
}
