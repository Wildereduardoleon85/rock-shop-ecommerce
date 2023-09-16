import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import styles from './GobackButton.module.scss'
import { getClassNames } from '../../../utils'

type GobackButtonProps = {
  to: string
  className?: string
}

function GobackButton({ to, className = '' }: GobackButtonProps) {
  return (
    <Link className={getClassNames([styles.root, className])} to={to}>
      <IoMdArrowRoundBack />
      GO BACK
    </Link>
  )
}

export default GobackButton
