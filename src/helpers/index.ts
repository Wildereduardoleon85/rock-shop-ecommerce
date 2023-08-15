import { ROUTES } from '../constants'
import { Route, RouteNames } from '../types'

export function getPath(routeName: RouteNames, pathParam: string = ''): string {
  const foundRoute = ROUTES.find((route: Route) => route.name === routeName)

  if (foundRoute) {
    if (pathParam && routeName === 'product') {
      return foundRoute.path.replace(':id', pathParam)
    }
    return foundRoute.path
  }

  return ''
}
