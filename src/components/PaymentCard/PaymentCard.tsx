import styles from './PaymentCard.module.scss'
import chipImage from '../../assets/img/chip.png'
import { getClassNames } from '../../utils'

type PaymentCardProps = {
  flipCard: boolean
}

function PaymentCard({ flipCard }: PaymentCardProps) {
  return (
    <div className={getClassNames([styles.root, flipCard && styles.flip])}>
      <div className={styles.creditCardFront}>
        <img src={chipImage} alt='chip' />
        <p>****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;****</p>
        <div>
          <p>NAME&nbsp;&nbsp;SURNAME</p>
          <p>MM/AA</p>
        </div>
      </div>
      <div className={styles.creditCardBack}>
        <div />
        <div />
        <div>*&nbsp;*&nbsp;*</div>
      </div>
    </div>
  )
}

export default PaymentCard
