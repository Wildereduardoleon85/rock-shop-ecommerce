import { useSelector } from 'react-redux'
import styles from './Ribbon.module.scss'
import { getClassNames } from '../../utils'
import { RootState } from '../../store'
import { CartButton, Search, SignInButton } from '..'

function Ribbon() {
  const { isRibbonOpen } = useSelector((state: RootState) => state.ribbon)

  return (
    <nav
      className={getClassNames([styles.root, isRibbonOpen && styles.active])}
    >
      <div className={styles.searchContainer}>
        <Search />
      </div>
      <div className={styles.signInButtonContainer}>
        <CartButton />
        <SignInButton />
      </div>
    </nav>
  )
}

export default Ribbon
