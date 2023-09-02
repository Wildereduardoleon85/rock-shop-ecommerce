import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { ROUTES } from '../../constants'

function AdminRoute() {
  const { userInfo } = useSelector((state: RootState) => state.auth)

  if (userInfo?.isAdmin) {
    return <Outlet />
  }

  return <Navigate to={ROUTES.login} replace />
}

export default AdminRoute
