import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { closeModal } from '../../slices'

function useModal() {
  const { isModalOpen } = useSelector((state: RootState) => state.modal)
  const dispatch = useDispatch()

  const modalRef = useRef<HTMLDivElement>(null)

  function escapeKeyHandler(e: globalThis.KeyboardEvent): void {
    if (e.key === 'Escape' && isModalOpen) {
      dispatch(closeModal())
    }
  }

  function handleTab(e: globalThis.KeyboardEvent): void {
    const focusableElements = modalRef.current?.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    ) as NodeListOf<HTMLElement>

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    const penultimateElement = focusableElements[focusableElements.length - 2]

    const elements = Array.prototype.slice.call(focusableElements)
    const isLastElementSelected = document.activeElement === lastElement
    const isFirstElementSelected = document.activeElement === firstElement
    const shiftPlusTabPressed = e.shiftKey && e.key === 'Tab'

    if (!elements.includes(document.activeElement)) {
      firstElement.focus()
      e.preventDefault()
    }

    if (isLastElementSelected) {
      firstElement.focus()
      e.preventDefault()
    }

    if (shiftPlusTabPressed && isFirstElementSelected) {
      lastElement.focus()
      e.preventDefault()
    }

    if (shiftPlusTabPressed && isLastElementSelected) {
      penultimateElement.focus()
      e.preventDefault()
    }
  }

  function keyListener(e: globalThis.KeyboardEvent) {
    if (e.key === 'Tab') {
      return handleTab(e)
    }

    if (e.key === 'Escape') {
      return escapeKeyHandler(e)
    }

    return () => {}
  }

  useEffect(() => {
    window.addEventListener('keydown', keyListener)

    return () => {
      window.removeEventListener('keydown', keyListener)
    }
  }, [])

  return modalRef
}

export default useModal
