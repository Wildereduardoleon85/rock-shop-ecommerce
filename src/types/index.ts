export type Product = {
  _id: string
  name: string
  image: string
  description: string
  brand: string
  category: string
  price: number
  countInStock: number
  rating: number
  numReviews: number
  reviews?: Review[]
  user: string
}

export interface CartItem extends Product {
  qty: number
}

export type Response<T> = {
  data: T
  error: unknown
  statusCode?: number
}

export type Review = {
  user: User
  name: string
  rating: number
  comment: string
}

export type User = {
  name: string
  email: string
  password: string
  isAdmin: boolean
}

export type ErrorPageEnums = 'not-found' | 'internal-server-error'

export type ErrorPageConfig = {
  [key in ErrorPageEnums]: {
    code: string
    title: string
    message: string
  }
}

export type RouteEnums = 'home' | 'product' | 'cart' | 'login' | 'register'

export type Routes = {
  [key in RouteEnums]: string
}

export type CartState = {
  cartItems: CartItem[]
  itemsPrice: number
  paymentMethod: string
  shippingAddress: {}
  shippingPrice: number
  taxPrice: number
  totalPrice: number
}

export type Validation = {
  isValid: boolean
  error: string
}

export type UseInput = {
  value: string
  error: string
  isValid: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  reset: () => void
}

export type FormInputDefaultAttrs = {
  name: string
  type: string
  placeholder: string
  label: string
}

export interface FormInputDynamicAttrs extends FormInputDefaultAttrs {
  error: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  value: string
}

export type FormAttrsByName = {
  [char: string]: {
    error: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: () => void
    value: string
  }
}
