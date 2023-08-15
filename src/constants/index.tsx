import { CartPage, HomePage, ProductPage } from '../pages'
import { ErrorPageConfig, Route } from '../types'

export const PRODUCT_CARD_STRING_LIMIT: number = 55
export const ERROR_PAGE_CONFIG: ErrorPageConfig = {
  'not-found': {
    code: '404',
    title: '404 - page not found',
    message:
      'The page that you are looking might be removed, had its name changed or is temporary unavailable.',
  },
  'internal-server-error': {
    code: '500',
    title: '500 - internal server error',
    message: 'Something went wrong',
  },
}

export const ROUTES: Route[] = [
  {
    name: 'home',
    path: '/',
    page: <HomePage />,
  },
  {
    name: 'product',
    path: '/product/:id',
    page: <ProductPage />,
  },
  {
    name: 'cart',
    path: '/cart',
    page: <CartPage />,
  },
]
