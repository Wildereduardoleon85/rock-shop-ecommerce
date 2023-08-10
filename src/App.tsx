import './styles/main.scss'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Layout } from './components'
import { HomePage, ProductPage } from './pages'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index path='/' element={<HomePage />} />
      <Route path='/product/:id' element={<ProductPage />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
