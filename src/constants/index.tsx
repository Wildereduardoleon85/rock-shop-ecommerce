import { ErrorPageConfig, Routes, FormInputDefaultAttrs } from '../types'

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
  login: '/login',
  register: '/register',
  shipping: '/shipping',
  payment: '/payment',
  placeOrder: '/place-order',
}

export const SIGN_IN_FORM: FormInputDefaultAttrs[] = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'e.g John Doe',
    label: 'Name',
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'jdoe@email.com',
    label: 'Email Address',
  },
]
