import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BsCreditCard } from 'react-icons/bs'
import { Breadcrumbs, PaymentForm } from '../../components'
import styles from './PaymentPage.module.scss'
import { ROUTES } from '../../constants'
import { RootState } from '../../store'
import { isNotCartInfo } from '../../helpers'
import { getClassNames } from '../../utils'

function PaymentPage() {
  const [cardSelected, setCardSelected] = useState<string>('new-card')
  const cart = useSelector((state: RootState) => state.cart)
  const { shippingAddress } = cart
  const navigate = useNavigate()

  useEffect(() => {
    if (isNotCartInfo(cart)) {
      navigate(ROUTES.home)
    }

    if (!shippingAddress.address) {
      navigate(ROUTES.shipping)
    }
  }, [cart])

  return (
    <>
      <Breadcrumbs step1 step2 />
      <div className={styles.root}>
        <h1>Payment Method</h1>
        <h2>Select Method</h2>
        <div className={styles.buttonCardsContainer}>
          <button
            id='new-card'
            type='button'
            className={getClassNames([
              styles.buttonCard,
              cardSelected === 'new-card' && styles.active,
            ])}
            onClick={() => setCardSelected('new-card')}
          >
            <div className={styles.radio}>
              <div />
            </div>
            <BsCreditCard className={styles.cardIcon} />
            <p className={styles.buttonCardLabel}>New Credit or Debit Card</p>
          </button>
        </div>
        <PaymentForm />
      </div>
    </>
  )
}

export default PaymentPage
