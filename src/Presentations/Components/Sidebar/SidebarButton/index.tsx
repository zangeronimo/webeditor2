import { useEffect, useState } from 'react'
import { FaBars } from 'react-icons/fa'

import Styles from './styles.module.scss'

export const SidebarButton = () => {
  const [state, setState] = useState({
    isMobile: false,
    isClose: false,
    isFull: false,
    sidebar: null,
  })

  const close = () => {
    if (state.sidebar) {
      state.sidebar.style.width = '70px'
      state.sidebar.style.marginLeft = '-70px'

      setState(old => ({ ...old, isClose: true, isFull: false }))
    }
  }

  const mid = () => {
    if (state.sidebar) {
      state.sidebar.style.width = '70px'
      state.sidebar.style.marginLeft = '0px'

      setState(old => ({ ...old, isClose: false, isFull: false }))
    }
  }

  const full = () => {
    if (state.sidebar) {
      state.sidebar.style.width = '230px'
      state.sidebar.style.marginLeft = '0px'

      setState(old => ({ ...old, isClose: false, isFull: true }))
    }
  }

  const handleClick = () => {
    if (state.isMobile) {
      if (state.isClose) mid()
      else close()
    } else {
      if (state.isClose) mid()
      else if (state.isFull) mid()
      else full()
    }
  }

  useEffect(() => {
    setState(old => ({
      ...old,
      isMobile: window.innerWidth <= 750,
      sidebar: document.getElementById('WEBEditorSidebarID') as HTMLDivElement,
    }))
    if (state.isMobile) close()
  }, [state.isMobile])

  return (
    <div className={Styles.container}>
      {' '}
      <button onClick={handleClick}>
        <FaBars />
      </button>
    </div>
  )
}
