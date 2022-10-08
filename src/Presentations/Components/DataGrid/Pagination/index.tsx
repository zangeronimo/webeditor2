import { useSearchParams } from 'react-router-dom'
import { PaginationItems } from './PaginationItems'

import Styles from './styles.module.scss'

type Props = {
  total: number
}

const siblingsCount = 1

const generatePagesArray = (from: number, to: number) => {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter(page => page > 0)
}

export const Pagination = ({ total }: Props) => {
  const [searchParams] = useSearchParams()
  const page = +searchParams.get('page')
  const itemsPerPage = +searchParams.get('itemsPerPage')

  const currentPage = page + 1

  const lastPage = Math.floor(total / itemsPerPage)

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    page < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : []

  const totalPage = (page + 1) * itemsPerPage

  return (
    <div className={Styles.container}>
      <div>
        <strong>{page * itemsPerPage}</strong> -{' '}
        <strong>{totalPage < total ? totalPage : total} </strong> de{' '}
        <strong>{total}</strong>
      </div>
      <div className={Styles.buttons}>
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItems number={1} />
            {currentPage > 2 + siblingsCount && (
              <div className={Styles.space}>...</div>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map(item => (
            <PaginationItems key={item} number={item} />
          ))}

        <PaginationItems number={currentPage} />

        {nextPages.length > 0 &&
          nextPages.map(item => <PaginationItems key={item} number={item} />)}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <div className={Styles.space}>...</div>
            )}
            <PaginationItems number={lastPage} />
          </>
        )}
      </div>
    </div>
  )
}
