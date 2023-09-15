import { useDispatch, useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import { Button, Portal } from '..'
import { useModal } from '../../../hooks'
import { setModalConfirm, closeModal } from '../../../slices'
import styles from './ConfirmModal.module.scss'
import { RootState } from '../../../store'
import { capitalize } from '../../../utils'

function ConfirmModal() {
  const dispatch = useDispatch()
  const modalRef = useModal()
  const { message } = useSelector((state: RootState) => state.modal)

  const onConfirm = () => {
    dispatch(setModalConfirm(true))
    dispatch(closeModal())
  }

  return (
    <Portal wrapperId='modal-root'>
      <div ref={modalRef} className={styles.root}>
        <div
          className={styles.backdrop}
          onClick={() => dispatch(closeModal())}
          aria-hidden
        />
        <div className={styles.modal}>
          <button
            className={styles.closeButton}
            type='button'
            aria-label='close-alert'
            onClick={() => dispatch(closeModal())}
          >
            <FaTimes className={styles.closeIcon} />
          </button>
          <h2>{capitalize(message)}</h2>
          <Button className={styles.confirmButton} large onClick={onConfirm}>
            YES
          </Button>
        </div>
      </div>
    </Portal>
  )
}

export default ConfirmModal
