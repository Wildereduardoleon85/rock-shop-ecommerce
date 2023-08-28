import { useEffect, useState } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styles from './Alert.module.scss'
import { capitalize, getClassNames, subString } from '../../../utils'
import { Product } from '../../../types'
import { ROUTES } from '../../../constants'

type VariantEnums = 'error' | 'productAddedToCart'

type AlertProps = {
  message?: string
  variant?: VariantEnums
  product?: Product
  duration?: number
  trigger: any
}

const VARIANTS: {
  [key in VariantEnums]: { icon?: React.JSX.Element; color?: string }
} = {
  error: {
    icon: <FaRegTimesCircle />,
    color: 'red',
  },
  productAddedToCart: {},
}

export function Alert({
  variant = 'error',
  message = '',
  product,
  duration = 3000,
  trigger,
}: AlertProps) {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShow(true)
    }, 50)

    const hideTimer = setTimeout(() => {
      setShow(false)
    }, duration)

    function clearAllTimers() {
      clearTimeout(hideTimer)
      clearTimeout(showTimer)
    }

    return () => clearAllTimers()
  }, [trigger])

  if (variant === 'productAddedToCart' && product) {
    return (
      <div className={getClassNames([styles.root, show && styles.show])}>
        <img src={product.image} alt={product.name} width={40} />
        <div className={styles.description}>
          <p>{subString(product.name, 24)}</p>
          <p>ADDED TO CART</p>
        </div>
        <Link to={ROUTES.home} className={styles.cartButton} type='button'>
          KEEP BUYING
        </Link>
        <Link to={ROUTES.cart} className={styles.cartButton} type='button'>
          TO CART
        </Link>
      </div>
    )
  }

  return (
    <div className={getClassNames([styles.root, show && styles.show])}>
      {VARIANTS[variant].icon}
      {`Error: ${capitalize(message)}`}
    </div>
  )
}
