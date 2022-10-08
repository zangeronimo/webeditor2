import { Debounce } from '@/Presentations/Utils/Debounce'
import { ReactNode } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Input } from '../Form/Input'
import Styles from './styles.module.scss'

type Props = {
  title: string
  children: ReactNode
  search?: boolean
}

export const Container = ({ title, search = false, children }: Props) => {
  const [searchParams] = useSearchParams()
  const word = searchParams.get('word')
  const navigate = useNavigate()

  const handleSearchCommand = (value: string) => {
    let init = '?'
    const hasPage = +searchParams.get('page') >= 0

    for (const entry of searchParams.entries()) {
      if (entry[0] !== 'word' && entry[0] !== 'page') {
        init === '?'
          ? (init = `?${entry[0]}=${entry[1]}`)
          : (init += `&${entry[0]}=${entry[1]}`)
      }
    }

    init = init !== '?' ? `${init}&` : init

    if (hasPage) navigate(`${init}page=0&word=${value}`)
    else navigate(`${init}word=${value}`)
  }

  const handleSearch = (value: string) =>
    Debounce(() => handleSearchCommand(value))

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <h1>{title}</h1>
        {search && (
          <div>
            <Input
              label=""
              name="search"
              defaultValue={word}
              placeholder="Search for..."
              onChange={e => handleSearch(e.currentTarget.value)}
            />
          </div>
        )}
      </div>
      <div className={Styles.children}>{children}</div>
    </div>
  )
}
