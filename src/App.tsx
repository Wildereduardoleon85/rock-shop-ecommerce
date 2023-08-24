import './styles/main.scss'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Layout } from './components'
import {
  CartPage,
  HomePage,
  ProductPage,
  LoginPage,
  RegisterPage,
  ShippingPage,
} from './pages'
import { ROUTES } from './constants'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index path={ROUTES.home} element={<HomePage />} />
      <Route path={ROUTES.product} element={<ProductPage />} />
      <Route path={ROUTES.cart} element={<CartPage />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.register} element={<RegisterPage />} />
      <Route path={ROUTES.shipping} element={<ShippingPage />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
