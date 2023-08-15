import { FaChevronDown } from 'react-icons/fa'
import styles from './QtyButton.module.scss'
import { getClassNames } from '../../utils'
import { ClickAwayWrapper } from '../UI'
import { CartItem, Product } from '../../types'
import { useQty } from '../../hooks'

type QtyButtonProps = {
  className?: string
  product: CartItem | Product
  isCartContext?: boolean
}

function QtyButton({
  className = '',
  product,
  isCartContext = false,
}: QtyButtonProps) {
  const {
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
  } = useQty(product, isCartContext)

  const { qty: itemQty } = product as CartItem

  return (
    <div className={getClassNames([styles.root, className])}>
      {product.countInStock ? (
        <ClickAwayWrapper onClickAway={() => setIsActive(false)}>
          <button
            type='button'
            className={styles.qty}
            onClick={() => {
              setIsActive(!isActive)
            }}
          >
            <span>Qty:</span>
            <span> {isCartContext ? itemQty : qty}</span>
            {!isCartContext && (
              <span> {`(${product.countInStock} in stock)`}</span>
            )}
            <FaChevronDown
              className={getClassNames([
                styles.chevronIcon,
                isActive && styles.rotate,
              ])}
            />
            {isCartContext && (
              <p className={styles.countInStock}>
                {`(${product.countInStock} in stock)`}
              </p>
            )}
          </button>

          {isActive && (
            <div className={getClassNames([styles.drawer])}>
              <ul>
                {[...Array(product.countInStock).keys()]
                  .slice(0, 5)
                  .map((item, index) => (
                    <li key={item}>
                      <button onClick={onQtyButtonClick} type='button'>
                        {`${item + 1} ${index === 0 ? 'unit' : 'units'}`}
                      </button>
                    </li>
                  ))}
                {product.countInStock > 5 && (
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
                            between 1 and {product.countInStock}
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
    </div>
  )
}

export default QtyButton
