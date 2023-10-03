import { useDispatch } from 'react-redux'
import { Table } from '../../../components'
import {
  setAlert,
  useCreateProductMutation,
  useGetProductsQuery,
} from '../../../slices'
import styles from './ProductListPage.module.scss'

function ProductListPage() {
  const dispatch = useDispatch()
  const { data, error, isLoading, refetch } = useGetProductsQuery({})
  const [createProduct, { isLoading: createProductLoading }] =
    useCreateProductMutation()

  const onCreateProduct = async () => {
    try {
      await createProduct().unwrap()
      refetch()
      dispatch(setAlert({ message: 'Product added successfuly' }))
    } catch (err: any) {
      dispatch(
        setAlert({
          message: err?.data?.message || 'something went wrong',
          variant: 'error',
        })
      )
    }
  }

  return (
    <Table
      className={styles.productList}
      variant='products'
      data={data}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      onCreateProduct={onCreateProduct}
      createProductLoading={createProductLoading}
    />
  )
}

export default ProductListPage
