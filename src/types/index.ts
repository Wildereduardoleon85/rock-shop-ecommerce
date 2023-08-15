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

export type RouteNames = 'home' | 'product' | 'cart'

export type Route = {
  name: RouteNames
  path: string
  page: React.JSX.Element
}

export type ErrorPageEnums = 'not-found' | 'internal-server-error'

export type ErrorPageConfig = {
  [key in ErrorPageEnums]: {
    code: string
    title: string
    message: string
  }
}
