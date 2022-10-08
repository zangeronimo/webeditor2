import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Header = ({ children }: Props) => {
  return <thead>{children}</thead>
}
