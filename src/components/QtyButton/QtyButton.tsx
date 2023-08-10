import { useEffect, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import styles from './QtyButton.module.scss'
import { getClassNames } from '../../utils'
import { ClickAwayWrapper } from '..'

type QtyButtonProps = {
  countInStock: number
}

function QtyButton({ countInStock }: QtyButtonProps) {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [qty, setQty] = useState<number>(1)
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
    setQty(Number(target.innerText.charAt(0)))
    setIsActive(false)
  }

  function onQtyInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    // The value is set only if it is number
    if (!Number.isNaN(+e.target.value)) {
      setQtyInputValue(e.target.value)
    }
  }

  function onApplyButtonClick() {
    if (Number(qtyInputValue) > countInStock) {
      setIsisErrorQty(true)
    } else {
      setQty(Number(qtyInputValue))
      setIsQtyInputActive(false)
      setIsActive(false)
    }
  }

  return (
    <div className={styles.root}>
      {countInStock ? (
        <ClickAwayWrapper onClickAway={() => setIsActive(false)}>
          <button
            type='button'
            className={styles.qty}
            onClick={() => {
              setIsActive(!isActive)
            }}
          >
            <span>Qty:</span>
            <span> {qty}</span>
            <span> {`(${countInStock} in stock)`}</span>
            <FaChevronDown
              className={getClassNames([
                styles.chevronIcon,
                isActive && styles.rotate,
              ])}
            />
          </button>

          {isActive && (
            <div className={getClassNames([styles.drawer])}>
              <ul>
                {[...Array(countInStock).keys()]
                  .slice(0, 5)
                  .map((item, index) => (
                    <li key={item}>
                      <button onClick={onQtyButtonClick} type='button'>
                        {`${item + 1} ${index === 0 ? 'unit' : 'units'}`}
                      </button>
                    </li>
                  ))}
                {countInStock > 5 && (
                  <>
                    <li>
                      <button
                        onClick={() => {
                          setIsQtyInputActive(!isQtyInputActive)
                        }}
                        type='button'
                      >
                        More than 5 units
                      </button>
                    </li>
                    {isQtyInputActive && (
                      <li className={styles.qtyInput}>
                        <p>Qty:</p>
                        <div className={styles.container}>
                          <input
                            type='text'
                            value={qtyInputValue}
                            onChange={onQtyInputChange}
                          />
                          <button type='button' onClick={onApplyButtonClick}>
                            APPLY
                          </button>
                        </div>
                        {isErrorQty && (
                          <p className={styles.errorText}>
                            There&apos;s not enough stock, choose a value
                            between 1 and {countInStock}
                          </p>
                        )}
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>
          )}
        </ClickAwayWrapper>
      ) : (
        <h3 className={styles.outOfStock}>Out of Stock</h3>
      )}
      <button type='button' className={styles.addToCartButton}>
        add to cart
      </button>
    </div>
  )
}

export default QtyButton
