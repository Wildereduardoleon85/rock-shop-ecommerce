import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { setCartItemQty, setQty } from '../../slices'
import { CartItem, Product } from '../../types'

function useQty(product: Product | CartItem, isCartContext: boolean) {
  const { qty } = useSelector((state: RootState) => state.qty)
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState<boolean>(false)
  const [qtyInputValue, setQtyInputValue] = useState<string>('')
  const [isQtyInputActive, setIsQtyInputActive] = useState<boolean>(false)
  const [isErrorQty, setIsisErrorQty] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsisErrorQty(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [isErrorQty])

  function onQtyButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLButtonElement
    const value = Number(target.innerText.charAt(0))
    if (isCartContext) {
      dispatch(setCartItemQty({ productId: product._id, qty: value }))
    } else {
      dispatch(setQty(value))
    }
    setIsActive(false)
  }

  function onQtyInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    // The value is set only if it is number
    if (!Number.isNaN(+e.target.value)) {
      setQtyInputValue(e.target.value)
    }
  }

  function onApplyButtonClick() {
    if (Number(qtyInputValue) > product.countInStock) {
      setIsisErrorQty(true)
    } else {
      if (isCartContext) {
        dispatch(
          setCartItemQty({ productId: product._id, qty: Number(qtyInputValue) })
        )
      } else {
        dispatch(setQty(Number(qtyInputValue)))
      }
      setIsQtyInputActive(false)
      setIsActive(false)
      setQtyInputValue('')
    }
  }

  return {
    isActive,
    qty,
    qtyInputValue,
    isQtyInputActive,
    isErrorQty,
    onQtyButtonClick,
    onQtyInputChange,
    onApplyButtonClick,
    setIsActive,
    setIsQtyInputActive,
  }
}

export default useQty
