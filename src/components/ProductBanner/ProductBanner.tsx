import { Link } from 'react-router-dom'
import styles from './ProductBanner.module.scss'
import { getClassNames, subString } from '../../utils'
import { Product } from '../../types'
import { PRODUCT_IMAGE_ASPECT_RATIO, ROUTES } from '../../constants'

type ProductBannerProps = {
  product: Product
  showAlert: boolean
}

const IMAGE_WIDTH = 60

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
          width={IMAGE_WIDTH}
          height={IMAGE_WIDTH * PRODUCT_IMAGE_ASPECT_RATIO}
          src={product.image}
          alt={product.name}
        />
        <div>
          <p>{subString(product.description, 24)} </p>
          <p>ADDED TO CART</p>
        </div>
        <div>
          <Link to={ROUTES.home}>KEEP BUYING</Link>
          <Link to={ROUTES.cart}>TO CART</Link>
        </div>
      </div>
    </div>
  )
}

export default ProductBanner
