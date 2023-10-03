import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Footer, Ribbon } from '..'
import styles from './Layout.module.scss'
import { Alert, ConfirmModal } from '../UI'
import { RootState } from '../../store'
import { useMediaQuery } from '../../hooks'
import { LG_BREAKPOINT } from '../../constants'
import { toggleRibbon } from '../../slices'

function Layout() {
  const { isModalOpen } = useSelector((state: RootState) => state.modal)
  const { isRibbonOpen } = useSelector((state: RootState) => state.ribbon)
  const screenSize = useMediaQuery()
  const isMobile = screenSize <= LG_BREAKPOINT
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isMobile && isRibbonOpen) {
      dispatch(toggleRibbon())
    }
  }, [isMobile])

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
