import { memo, useEffect, useState } from 'react'
import { Logo } from '../Logo'
import {
  FaListUl,
  FaBreadSlice,
  FaHome,
  FaChevronDown,
  FaCircle,
} from 'react-icons/fa'
import Styles from './styles.module.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/Presentations/Hooks/Auth'

const Sidebar = () => {
  const [state, setState] = useState({ min: true, showSubItem: '' })

  const { user, hasAnyPermission, hasPermission } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const avatarGenerator = () => {
    if (user.avatar) return `${process.env.API_URL}/${user.avatar}`

    return user.name
  }

  const handleClick = (item: string) => {
    setState(old => ({ ...old, showSubItem: '' }))

    if (state.showSubItem !== item)
      setState(old => ({ ...old, showSubItem: item }))
  }

  const isActive = (item: string, exact = false) => {
    if (exact) return location.pathname === item
    return location.pathname.includes(item)
  }

  useEffect(() => {
    const element = document.getElementById(
      'WEBEditorSidebarID',
    ) as HTMLDivElement
    const listen = () => {
      setState(old => ({ ...old, min: element.offsetWidth <= 70 }))
    }

    new ResizeObserver(listen).observe(element)
  }, [])

  const styles = `${Styles.container} ${state.min && Styles.min}`
  return (
    <div id="WEBEditorSidebarID" className={styles}>
      <Logo min={state.min} />

      <Link to="/system/profile" title="Profile">
        <div className={Styles.profile}>
          <img src={avatarGenerator()} />
          <span>
            Welcome,
            <p>{user.name}</p>
          </span>
        </div>
      </Link>

      <div className={Styles.menu}>
        <div
          className={`${Styles.itemsWrap} ${
            isActive('/', true) && Styles.active
          }`}
        >
          <div
            className={Styles.items}
            onClick={() => {
              handleClick('')
              navigate('/')
            }}
          >
            <FaHome />
            <span> Home</span>
          </div>
        </div>

        {hasAnyPermission([
          'ROLE_GET_RECIPECATEGORY',
          'ROLE_GET_RECIPEIMAGE',
          'ROLE_GET_RECIPETAG',
          'ROLE_GET_RECIPERATE',
          'ROLE_GET_RECIPE',
        ]) && (
          <div
            className={`${Styles.itemsWrap} ${
              isActive('/recipe') && Styles.active
            }`}
            onClick={() => handleClick('recipes')}
          >
            <div className={Styles.items}>
              <FaBreadSlice />
              <span>
                {' '}
                Recipes <FaChevronDown />
              </span>
            </div>
            {state.showSubItem === 'recipes' && (
              <div className={Styles.subitems}>
                <ul>
                  {hasPermission('ROLE_GET_RECIPECATEGORY') && (
                    <Link to="/recipe/categories">
                      <li>
                        <FaCircle /> Categories
                      </li>
                    </Link>
                  )}
                  {hasPermission('ROLE_GET_RECIPEIMAGE') && (
                    <Link to="/recipe/images">
                      <li>
                        <FaCircle /> Images
                      </li>
                    </Link>
                  )}
                  {hasPermission('ROLE_GET_RECIPETAG') && (
                    <Link to="/recipe/tags">
                      <li>
                        <FaCircle /> Tags
                      </li>
                    </Link>
                  )}
                  {hasPermission('ROLE_GET_RECIPERATE') && (
                    <Link to="/recipe/rates">
                      <li>
                        <FaCircle /> Rates
                      </li>
                    </Link>
                  )}
                  {hasPermission('ROLE_GET_RECIPE') && (
                    <Link to="/recipes">
                      <li>
                        <FaCircle /> Recipes
                      </li>
                    </Link>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        <div
          className={`${Styles.itemsWrap} ${
            isActive('/system') && Styles.active
          }`}
          onClick={() => handleClick('system')}
        >
          <div className={Styles.items}>
            <FaListUl />
            <span>
              {' '}
              System <FaChevronDown />
            </span>
          </div>
          {state.showSubItem === 'system' && (
            <div className={Styles.subitems}>
              <ul>
                <Link to="/system/profile">
                  <li>
                    <FaCircle /> My Profile
                  </li>
                </Link>
                {hasPermission('ROLE_GET_SYSTEMUSER') && (
                  <Link to="/system/users">
                    <li>
                      <FaCircle /> System Users
                    </li>
                  </Link>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(Sidebar)
