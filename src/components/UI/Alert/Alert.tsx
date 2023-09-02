import { useEffect, useState } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import styles from './Alert.module.scss'
import { capitalize, getClassNames, subString } from '../../../utils'
import { Product, VariantEnums } from '../../../types'
import { ROUTES } from '../../../constants'

const VARIANTS: {
  [key in VariantEnums]: { icon?: React.JSX.Element; prefix?: string }
} = {
  error: {
    icon: <FaRegTimesCircle className={styles.timesIcon} />,
    prefix: 'Error:',
  },
  success: {
    icon: <BsFillCheckCircleFill className={styles.checkIcon} />,
    prefix: 'Success:',
  },
  productAddedToCart: {},
}

type AnchorLinkProps = {
  linkTo: string
  children: React.ReactNode
  show: boolean
}

function AnchorLink({ linkTo, children, show }: AnchorLinkProps) {
  return (
    <Link
      className={styles.cartButton}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      to={linkTo}
      style={{
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      {children}
    </Link>
  )
}

type AlertProps = {
  message?: string
  variant?: VariantEnums
  product?: Product
  duration?: number
  trigger?: any
}

export function Alert({
  variant = 'error',
  message = '',
  product,
  duration = 3000,
  trigger,
}: AlertProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
    const showTimer = setTimeout(() => {
      setShow(false)
    }, duration)

    return () => clearTimeout(showTimer)
  }, [message, trigger])

  if (variant === 'productAddedToCart' && product) {
    return (
      <div className={getClassNames([styles.root, show && styles.show])}>
        <img src={product.image} alt={product.name} width={40} />
        <div className={styles.description}>
          <p>{subString(product.name, 24)}</p>
          <p>ADDED TO CART</p>
        </div>
        <AnchorLink linkTo={ROUTES.home} show={show}>
          KEEP BUYING
        </AnchorLink>
        <AnchorLink linkTo={ROUTES.cart} show={show}>
          TO CART
        </AnchorLink>
      </div>
    )
  }

  return (
    variant && (
      <div
        className={getClassNames([
          styles.root,
          !!message && show && styles.show,
        ])}
      >
        {VARIANTS[variant].icon}
        {`${VARIANTS[variant].prefix} ${capitalize(message)}`}
      </div>
    )
  )
}
