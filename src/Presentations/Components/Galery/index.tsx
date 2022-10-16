import { ActiveEnum } from '@/Application/Enum/ActiveEnum'
import Styles from './styles.module.scss'

export type ImageGalery = {
  key: string | number
  name: string
  path: string
  active: ActiveEnum
}

type Props = {
  images: ImageGalery[]
}

export const Galery = ({ images }: Props) => {
  return (
    <div className={Styles.container}>
      {images.map(img => (
        <div key={img.key}>
          <p style={{ textAlign: 'center' }}>
            {img.active ? 'enable' : 'disable'}
          </p>
          <img
            className={Styles.thumb}
            src={`${process.env.API_URL}/${img.path}`}
            alt={img.name}
          />
        </div>
      ))}
    </div>
  )
}
