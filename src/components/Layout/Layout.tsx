import { Navbar, Footer } from '..'
import { HomePage } from '../../pages'
import './Layout.module.scss'

function Layout() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <HomePage />
      </main>
      <Footer />
    </>
  )
}

export default Layout
