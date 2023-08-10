/* eslint-disable no-underscore-dangle */
import { useParams, Link } from 'react-router-dom'
import { FaChevronDown } from 'react-icons/fa'
import styles from './ProductPage.module.scss'
import data from '../../data'
import { Rating } from '../../components/Rating'

function ProductPage() {
  const { id: productId } = useParams()
  const product = data.find((item) => item._id === productId)

  return (
    <div className={styles.root}>
      <Link className={styles.goBackButton} to='/'>
        Go Back
      </Link>
      <div className={styles.container}>
        <img width={636} src={product?.image} alt={product?.name} />
        <div className={styles.details}>
          <h1>{product?.name}</h1>
          <p className={styles.price}>${product?.price}</p>
          <button type='button' className={styles.qty}>
            <span>Qty:</span>
            <span> 1</span>
            <span> (9 in stock)</span>
            <FaChevronDown className={styles.chevronIcon} />
          </button>
          <Rating
            value={product?.rating as number}
            text={`${product?.numReviews} reviews`}
          />
          <h3>Description</h3>
          <p className={styles.description}>{product?.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
