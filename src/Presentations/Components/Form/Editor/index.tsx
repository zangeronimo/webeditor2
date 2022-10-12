import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import Styles from './styles.module.scss'

type Props = {
  label?: string
  name: string
  data: string
  setContent: (data: string) => void
  error?: string
}

export const Editor = ({
  label = '',
  name = '',
  data,
  setContent,
  error = '',
}: Props) => {
  return (
    <div className={Styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <CKEditor
        editor={ClassicEditor}
        id={name}
        data={data}
        onChange={(_, editor: { getData: () => string }) => {
          setContent(editor.getData())
        }}
      />
      {error && <p>{error}</p>}
    </div>
  )
}
