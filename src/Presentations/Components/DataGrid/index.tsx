import { ReactNode, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Pagination } from './Pagination'
import Styles from './styles.module.scss'

type Props = {
  pagination?: number
  title?: string
  children: ReactNode
}

export const DataGrid = ({
  pagination = undefined,
  title = '',
  children,
}: Props) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!searchParams.get('page') && pagination >= 0) {
      let init = '?'

      for (const entry of searchParams.entries()) {
        init === '?'
          ? (init = `?${entry[0]}=${entry[1]}`)
          : (init += `&${entry[0]}=${entry[1]}`)
      }

      init = init !== '?' ? `${init}&` : init

      navigate(`${init}page=0&itemsPerPage=20`)
    }
  }, [])

  return (
    <div className={Styles.container}>
      <table>
        {!!title && <caption>{title}</caption>}
        {children}
      </table>
      {!!pagination && <Pagination total={pagination} />}
    </div>
  )
}

export { Header } from './Header'
export { Body } from './Body'
export { Row } from './Row'
export { Col } from './Col'
