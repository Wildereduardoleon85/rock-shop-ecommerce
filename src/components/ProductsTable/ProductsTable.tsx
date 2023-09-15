import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { formatCurrency, subString } from '../../utils'
import { ROUTES } from '../../constants'
import {
  openModal,
  setAlert,
  setModalConfirm,
  useDeleteProductMutation,
} from '../../slices'
import styles from './ProductsTable.module.scss'
import { Product } from '../../types'
import { SmallLoader } from '../UI'
import { RootState } from '../../store'

type ProductsTableProps = {
  products: Product[]
  refetch: () => void
}

function ProductsTable({ products, refetch }: ProductsTableProps) {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [idToDelete, setIdToDelete] = useState<string>('')
  const dispatch = useDispatch()
  const { isConfirmed } = useSelector((state: RootState) => state.modal)

  const onDeleteButtonClick = (productId: string, index: number) => {
    dispatch(openModal('do you really want to delete this product?'))
    setActiveIndex(index)
    setIdToDelete(productId)
  }

  async function removeProduct() {
    try {
      await deleteProduct(idToDelete).unwrap()
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

  useEffect(() => {
    if (isConfirmed) {
      removeProduct()
      dispatch(setModalConfirm(false))
    }
  }, [isConfirmed])

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
          onClick={() => onDeleteButtonClick(product._id, index)}
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
