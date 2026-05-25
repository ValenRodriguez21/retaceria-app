const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export interface ProductoAPI {
  id: string
  codigo: string
  nombre: string
  precio_base: number
  stock: number
  categoria: string
  color: string
  proveedor: string
}

export interface ProductoFormAPI {
  codigo: string
  nombre: string
  precio_base: number
  stock: number
  categoria_id?: string
  color_id?: string
  proveedor_id?: string
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`Error en la petición: ${response.status}`)
  }

  return response.json()
}

export async function fetchProductos(): Promise<ProductoAPI[]> {
  return request<ProductoAPI[]>('/productos')
}

export async function fetchProducto(id: string): Promise<ProductoAPI> {
  return request<ProductoAPI>(`/productos/${id}`)
}

export async function createProducto(data: ProductoFormAPI): Promise<ProductoAPI> {
  return request<ProductoAPI>('/productos', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateProducto(id: string, data: ProductoFormAPI): Promise<ProductoAPI> {
  return request<ProductoAPI>(`/productos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function deleteProducto(id: string): Promise<ProductoAPI> {
  return request<ProductoAPI>(`/productos/${id}`, {
    method: 'DELETE',
  })
}
