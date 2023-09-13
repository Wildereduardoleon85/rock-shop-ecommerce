import { Outlet } from 'react-router-dom'
import { Navbar, Footer } from '..'
import './Layout.module.scss'
import { Alert } from '../UI'

function Layout() {
  return (
    <>
      <Alert />
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
