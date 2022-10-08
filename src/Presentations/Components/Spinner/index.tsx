import Styles from './styles.module.scss'

export const Spinner = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.loader}></div>
    </div>
  )
}
