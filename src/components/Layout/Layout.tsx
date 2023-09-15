import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navbar, Footer } from '..'
import './Layout.module.scss'
import { Alert, ConfirmModal } from '../UI'
import { RootState } from '../../store'

function Layout() {
  const { isModalOpen } = useSelector((state: RootState) => state.modal)

  return (
    <>
      <Alert />
      {isModalOpen && <ConfirmModal />}
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
