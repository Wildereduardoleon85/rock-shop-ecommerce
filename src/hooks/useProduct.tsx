import { useEffect, useState } from 'react'
import { fetchProductById } from '../services/productsService'
import { Product } from '../types'

function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function setState() {
    setIsLoading(true)
    const res = await fetchProductById(id)
    setIsLoading(false)
    if (res.data) {
      setProduct(res.data)
    } else {
      setError('server error fetching product')
    }
  }

  useEffect(() => {
    setState()
  }, [])

  return {
    product,
    error,
    isLoading,
  }
}

export default useProduct
