import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { formatCurrency, subString } from '../../utils'
import { ROUTES } from '../../constants'
import { useDeleteProductMutation } from '../../slices'
import styles from './ProductsTable.module.scss'
import { Product } from '../../types'
import { Alert, SmallLoader } from '../UI'

type ProductsTableProps = {
  products: Product[]
  refetch?: () => void
}

function ProductsTable({ products, refetch }: ProductsTableProps) {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [alert, setAlert] = useState<{
    variant: 'success' | 'error'
    message: string
  }>({
    variant: 'error',
    message: '',
  })

  const onDeleteProduct = async (productId: string, index: number) => {
    if (alert.message) setAlert({ ...alert, message: '' })

    try {
      setActiveIndex(index)
      await deleteProduct(productId)
      setAlert({ variant: 'success', message: 'product deleted successfully!' })
      if (refetch) refetch()
    } catch (error: any) {
      setAlert({
        variant: 'error',
        message: error.data.message ?? 'something went wrong',
      })
    }
  }

  return (
    <>
      <Alert variant={alert.variant} message={alert.message} />
      {products.map((product: any, index) => (
        <tr key={product._id}>
          <td>{product._id}</td>
          <td>{subString(product.name, 100)}</td>
          <td>{formatCurrency(product.price)}</td>
          <td>{product.category}</td>
          <td>{product.brand}</td>
          <td className={styles.iconButtonsContainer}>
            <Link
              to={ROUTES.productEdit.replace(':id', product._id)}
              aria-label='edit-product'
              className={styles.editIconButton}
            >
              <FaEdit />
            </Link>
            <button
              type='button'
              aria-label='delete-product'
              className={styles.trashIconButton}
              onClick={() => onDeleteProduct(product._id, index)}
              disabled={isLoading && index === activeIndex}
            >
              <div>
                {isLoading && activeIndex === index ? (
                  <SmallLoader />
                ) : (
                  <FaTrashAlt />
                )}
              </div>
            </button>
          </td>
        </tr>
      ))}
    </>
  )
}

export default ProductsTable
