import { memo } from 'react'
import Styles from './styles.module.scss'

const Footer = () => {
  return (
    <footer className={Styles.container}>
      by&nbsp;
      <a
        href="https://www.linkedin.com/in/zangeronimo/"
        target="_blank"
        rel="noreferrer"
      >
        /in/zangeronimo
      </a>
    </footer>
  )
}

export default memo(Footer)
