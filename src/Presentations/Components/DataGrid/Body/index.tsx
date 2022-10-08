import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Body = ({ children }: Props) => {
  return <tbody>{children}</tbody>
}
