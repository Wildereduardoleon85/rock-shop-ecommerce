import './styles/main.scss'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Layout } from './components'
import { HomePage } from './pages'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index path='/' element={<HomePage />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
