import data from '../../data'

function HomePage() {
  return (
    <>
      <h1>Latest Products</h1>
      <div>
        {data.map((product) => (
          // eslint-disable-next-line no-underscore-dangle
          <h3 key={product._id}>{product.name}</h3>
        ))}
      </div>
    </>
  )
}

export default HomePage
