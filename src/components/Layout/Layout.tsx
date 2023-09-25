import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navbar, Footer, Ribbon } from '..'
import styles from './Layout.module.scss'
import { Alert, ConfirmModal } from '../UI'
import { RootState } from '../../store'
import { useMediaQuery } from '../../hooks'
import { LG_BREAKPOINT } from '../../constants'

function Layout() {
  const { isModalOpen } = useSelector((state: RootState) => state.modal)
  const { isRibbonOpen } = useSelector((state: RootState) => state.ribbon)
  const screenSize = useMediaQuery()
  const isMobile = screenSize <= LG_BREAKPOINT

  return (
    <>
      <Alert />
      {isModalOpen && <ConfirmModal />}
      <header>
        <Navbar />
        {isMobile && <Ribbon />}
      </header>
      <main className={isRibbonOpen ? styles.ribbonActive : ''}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
