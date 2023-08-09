import { Outlet } from 'react-router-dom'
import { Navbar, Footer } from '..'
import './Layout.module.scss'

function Layout() {
  return (
    <>
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
