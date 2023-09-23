import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navbar, Footer, Search } from '..'
import styles from './Layout.module.scss'
import { Alert, ConfirmModal } from '../UI'
import { RootState } from '../../store'
import { useMediaQuery } from '../../hooks'

function Layout() {
  const { isModalOpen } = useSelector((state: RootState) => state.modal)
  const screenSize = useMediaQuery()

  return (
    <>
      <Alert />
      {isModalOpen && <ConfirmModal />}
      <header>
        <Navbar />
      </header>
      <main>
        {screenSize <= 945 && <Search className={styles.search} />}
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
