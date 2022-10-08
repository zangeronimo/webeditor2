import { ReactNode, TableHTMLAttributes } from 'react'
import { FaSort } from 'react-icons/fa'
import { useNavigate, useSearchParams } from 'react-router-dom'

import Styles from './styles.module.scss'

type Props = TableHTMLAttributes<HTMLTableCellElement> & {
  orderBy?: string
  header?: boolean
  children: ReactNode
}

export const Col = ({
  orderBy = '',
  header = false,
  children,
  ...rest
}: Props) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const asc = searchParams.get('asc') === 'true'

  const handleClick = (order: string) => {
    let init = '?'

    for (const entry of searchParams.entries()) {
      if (entry[0] !== 'orderBy' && entry[0] !== 'asc')
        init === '?'
          ? (init = `?${entry[0]}=${entry[1]}`)
          : (init += `&${entry[0]}=${entry[1]}`)
    }

    init = init !== '?' ? `${init}&` : init

    navigate(`${init}orderBy=${order}&asc=${!asc}`)
  }

  return (
    <>
      {header ? (
        <th scope="col" {...rest}>
          <div className={Styles.container}>
            {children}{' '}
            {!!orderBy && <FaSort onClick={() => handleClick(orderBy)} />}
          </div>
        </th>
      ) : (
        <td scope="row" {...rest}>
          {children}
        </td>
      )}
    </>
  )
}
