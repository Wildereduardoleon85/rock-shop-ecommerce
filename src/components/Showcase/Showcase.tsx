import styles from './Showcase.module.scss'
import { Product } from '../../types'
import { ProductCard } from '..'

type ShowcaseProps = {
  products: Product[]
  className?: string
  title: string
}

function Showcase({ products, className = '', title }: ShowcaseProps) {
  return (
    <section className={className}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.container}>
        {products.map((product, index) => (
          <ProductCard key={product._id} product={product} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Showcase
