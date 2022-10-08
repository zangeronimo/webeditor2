import { FilterPaginationBaseModel } from '@/Application/Models/FilterPaginationBaseModel'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const usePagination = () => {
  const [state, setState] = useState({} as FilterPaginationBaseModel)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const page = +searchParams.get('page')
    const itemsPerPage = +searchParams.get('itemsPerPage')
    const orderBy = searchParams.get('orderBy')
    const asc = searchParams.get('asc') === 'true'

    setState(old => ({ ...old, page, itemsPerPage, orderBy, asc }))
  }, [searchParams])

  return state
}
