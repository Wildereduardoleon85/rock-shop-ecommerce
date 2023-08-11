import { useEffect, useState } from 'react'
import { Product } from '../types'
import { fetchProducts } from '../services/productsService'

function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function setState() {
    setIsLoading(true)
    const res = await fetchProducts()
    setIsLoading(false)
    if (res.data) {
      setProducts(res.data)
    } else {
      setError('server error fetching products')
    }
  }

  useEffect(() => {
    setState()
  }, [])

  return {
    products,
    error,
    isLoading,
  }
}

export default useProducts
