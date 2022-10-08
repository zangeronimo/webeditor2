import { Button } from '@/Presentations/Components/Form/Button'
import { useNavigate, useSearchParams } from 'react-router-dom'

type Props = {
  number: number
}

export const PaginationItems = ({ number }: Props) => {
  const [searchParams] = useSearchParams()
  const page = +searchParams.get('page')
  const navigate = useNavigate()

  const handleClick = (page: number) => {
    let init = '?'

    for (const entry of searchParams.entries()) {
      if (entry[0] !== 'page')
        init === '?'
          ? (init = `?${entry[0]}=${entry[1]}`)
          : (init += `&${entry[0]}=${entry[1]}`)
    }

    init = init !== '?' ? `${init}&` : init

    navigate(`${init}page=${page}`)
  }

  const isCurrent = page === number - 1

  return (
    <Button
      skin={isCurrent ? 'secondary' : 'primary'}
      disabled={isCurrent}
      onClick={() => handleClick(number - 1)}
    >
      {number}
    </Button>
  )
}
