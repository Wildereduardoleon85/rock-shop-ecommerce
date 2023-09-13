import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PiWarningOctagonFill } from 'react-icons/pi'
import { FaTimes } from 'react-icons/fa'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import styles from './Alert.module.scss'
import { capitalize, getClassNames, subString } from '../../../utils'
import { RootState } from '../../../store'
import { setAlert } from '../../../slices'
import { AlertVariant } from '../../../types'

const DEFAULT_VARIANT: AlertVariant = 'success'

function Alert() {
  const alert = useSelector((state: RootState) => state.alert)
  const { message, variant } = alert
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (message) {
      setShow(true)
    }

    const showTimer = setTimeout(() => {
      setShow(false)
    }, 3000)

    const clearAlertTimer = setTimeout(() => {
      dispatch(setAlert({ message: '', variant: DEFAULT_VARIANT }))
    }, 3500)

    function clearAllTimers() {
      clearTimeout(clearAlertTimer)
      clearTimeout(showTimer)
    }

    return () => clearAllTimers()
  }, [message, variant])

  return (
    <div
      className={getClassNames([
        styles.root,
        show ? styles.slideIn : styles.slideOut,
      ])}
    >
      {message && (
        <div className={styles.container}>
          {variant === 'success' ? (
            <BsFillCheckCircleFill className={styles.checkIcon} />
          ) : (
            <PiWarningOctagonFill className={styles.warningIcon} />
          )}
          <span className={styles.text}>
            {subString(capitalize(message), 100)}
          </span>

          <button
            className={styles.closeButton}
            type='button'
            aria-label='close-alert'
            // onClick={() => setShow(false)}
          >
            <FaTimes className={styles.closeIcon} />
          </button>
        </div>
      )}
    </div>
  )
}

export default Alert
