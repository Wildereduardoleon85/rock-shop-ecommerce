import axios from 'axios'
import { Product, Response } from '../types'

const baseUrl = import.meta.env.VITE_PRODUCTS_BASE_URL
const path = import.meta.env.VITE_PRODUCTS_PATH

export async function fetchProducts(): Promise<Response<Product[] | null>> {
  try {
    const { data } = await axios(`${baseUrl}${path}`)
    return {
      data,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export async function fetchProductById(
  id: string
): Promise<Response<Product | null>> {
  try {
    const { data } = await axios(`${baseUrl}${path}/${id}`)
    return {
      data,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}
