import { Link, useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import styles from './GobackButton.module.scss'
import { getClassNames } from '../../../utils'

type GobackButtonProps = {
  to?: string
  className?: string
}

function GobackButton({ to, className = '' }: GobackButtonProps) {
  const navigate = useNavigate()

  function onGoback() {
    navigate(-1)
  }

  return to ? (
    <Link className={getClassNames([styles.root, className])} to={to}>
      <IoMdArrowRoundBack />
      GO BACK
    </Link>
  ) : (
    <button
      type='button'
      className={getClassNames([styles.root, className])}
      onClick={onGoback}
    >
      <IoMdArrowRoundBack />
      GO BACK
    </button>
  )
}

export default GobackButton
