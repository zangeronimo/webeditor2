import ReactDOM from 'react-dom/client'

import '@/Presentations/Styles/Global.scss'
import { App } from '@/Presentations/App'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(<App />)
