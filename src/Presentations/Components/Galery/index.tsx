import Styles from './styles.module.scss'

export type ImageGalery = {
  key: string | number
  name: string
  path: string
}

type Props = {
  images: ImageGalery[]
}

export const Galery = ({ images }: Props) => {
  return (
    <div className={Styles.container}>
      {images.map(img => (
        <img
          className={Styles.thumb}
          key={img.key}
          src={`${process.env.API_URL}/${img.path}`}
          alt={img.name}
        />
      ))}
    </div>
  )
}
