/* eslint-disable no-underscore-dangle */
import { useParams, Link } from 'react-router-dom'
import styles from './ProductPage.module.scss'
import data from '../../data'
import { Rating } from '../../components/Rating'
import { QtyButton } from '../../components'

function ProductPage() {
  const { id: productId } = useParams()
  const product = data.find((item) => item._id === productId)

  return (
    <div className={styles.root}>
      <Link className={styles.goBackButton} to='/'>
        Go Back
      </Link>
      <div className={styles.container}>
        <img
          width={636}
          height={506}
          src={product?.image}
          alt={product?.name}
        />
        <div className={styles.details}>
          <h1>{product?.name}</h1>
          <p className={styles.price}>${product?.price}</p>
          <QtyButton countInStock={product?.countInStock as number} />
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
