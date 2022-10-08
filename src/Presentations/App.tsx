import { BrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout'
import { Hooks } from './Hooks'
import { Routes } from './Routes'

export const App = () => {
  return (
    <BrowserRouter>
      <Hooks>
        <Layout>
          <Routes />
        </Layout>
      </Hooks>
    </BrowserRouter>
  )
}
