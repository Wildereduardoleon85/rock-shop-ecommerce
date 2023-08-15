import { Link } from 'react-router-dom'
import styles from './ProductBanner.module.scss'
import { getClassNames, subString } from '../../utils'
import { Product } from '../../types'
import { getPath } from '../../helpers'

type ProductBannerProps = {
  product: Product
  showAlert: boolean
}

function ProductBanner({ product, showAlert }: ProductBannerProps) {
  return (
    <div
      className={getClassNames([
        styles.bannerContainer,
        showAlert && styles.translate,
      ])}
    >
      <div className={styles.banner}>
        <img
          width={60}
          height={60 * 0.7955974842767296}
          src={product.image}
          alt={product.name}
        />
        <div>
          <p>{subString(product.description, 24)} </p>
          <p>ADDED TO CART</p>
        </div>
        <div>
          <Link to={getPath('home')}>KEEP BUYING</Link>
          <Link to={getPath('cart')}>TO CART</Link>
        </div>
      </div>
    </div>
  )
}

export default ProductBanner
