import { ErrorPage } from '..'
import { Carousel, Meta, Showcase } from '../../components'
import { Loader } from '../../components/UI'
import { useGetProductsQuery } from '../../slices'

function HomePage() {
  const { data: products, error, isLoading } = useGetProductsQuery({})

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    const err = error as any
    if (err.status === 404) {
      return <ErrorPage variant='not-found' message={err.data.message} />
    }
    return <ErrorPage />
  }

  return (
    products && (
      <>
        <Meta />
        <Carousel
          products={products
            .map((product) => ({
              name: product.name,
              id: product._id,
              images: product.image,
              price: product.price,
            }))
            .slice(0, 6)}
        />
        <Showcase title='Latest Products' products={products} />
      </>
    )
  )
}

export default HomePage
