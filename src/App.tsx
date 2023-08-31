import './styles/main.scss'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Layout, PrivateRoute } from './components'
import { routes } from './routes'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      {routes.public.map((route) => (
        <Route
          key={route.name}
          index={route.name === 'home'}
          path={route.path}
          element={route.page}
        />
      ))}

      {/* private routes */}
      <Route path='' element={<PrivateRoute />}>
        {routes.private.map((route) => (
          <Route key={route.name} path={route.path} element={route.page} />
        ))}
      </Route>
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
