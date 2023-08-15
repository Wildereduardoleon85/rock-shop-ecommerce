import { ErrorPageConfig, Routes } from '../types'

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

export const PRODUCT_IMAGE_ASPECT_RATIO: number = 0.7955974842767296
export const ROUTES: Routes = {
  home: '/',
  product: '/product/:id',
  cart: '/cart',
}
