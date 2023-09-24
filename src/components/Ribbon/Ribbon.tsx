import { useSelector } from 'react-redux'
import styles from './Ribbon.module.scss'
import { getClassNames } from '../../utils'
import { RootState } from '../../store'
import { useMediaQuery } from '../../hooks'
import { CartButton, SignInButton } from '..'
import { SM_BREAKPOINT } from '../../constants'

function Ribbon() {
  const { isRibbonOpen } = useSelector((state: RootState) => state.ribbon)
  const screenSize = useMediaQuery()

  return (
    screenSize <= SM_BREAKPOINT && (
      <nav
        className={getClassNames([styles.root, isRibbonOpen && styles.active])}
      >
        <CartButton />
        <SignInButton />
      </nav>
    )
  )
}

export default Ribbon
