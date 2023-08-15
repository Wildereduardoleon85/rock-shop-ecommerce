import './styles/main.scss'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Layout } from './components'
import { ROUTES } from './constants'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      {ROUTES.map((route) => (
        <Route
          key={route.name}
          index={route.name === 'home'}
          path={route.path}
          element={route.page}
        />
      ))}
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
