import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { formatCurrency, subString } from '../../utils'
import { ROUTES } from '../../constants'
import { setAlert, useDeleteProductMutation } from '../../slices'
import styles from './ProductsTable.module.scss'
import { Product } from '../../types'
import { SmallLoader } from '../UI'

type ProductsTableProps = {
  products: Product[]
  refetch: () => void
}

function ProductsTable({ products, refetch }: ProductsTableProps) {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const dispatch = useDispatch()

  const onDeleteProduct = async (productId: string, index: number) => {
    try {
      setActiveIndex(index)
      await deleteProduct(productId).unwrap()
      dispatch(setAlert({ message: 'product deleted successfully!' }))
      refetch()
    } catch (error: any) {
      dispatch(
        setAlert({
          variant: 'error',
          message: error?.data?.message ?? 'something went wrong',
        })
      )
    }
  }

  return products.map((product: any, index) => (
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
  ))
}

export default ProductsTable
