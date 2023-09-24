import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navbar, Footer, Search, Ribbon } from '..'
import styles from './Layout.module.scss'
import { Alert, ConfirmModal } from '../UI'
import { RootState } from '../../store'
import { useMediaQuery } from '../../hooks'
import { LG_BREAKPOINT } from '../../constants'

function Layout() {
  const { isModalOpen } = useSelector((state: RootState) => state.modal)
  const { isRibbonOpen } = useSelector((state: RootState) => state.ribbon)
  const screenSize = useMediaQuery()

  return (
    <>
      <Alert />
      {isModalOpen && <ConfirmModal />}
      <header>
        <Navbar />
        <Ribbon />
      </header>
      <main className={isRibbonOpen ? styles.ribbonActive : ''}>
        {screenSize <= LG_BREAKPOINT && <Search />}
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
