import type { Producto } from './producto'

export type ItemCarrito = {
  productoId: string
  cantidad: number
}

export type LineaCarrito = {
  producto: Producto
  cantidad: number
  subtotal: number
}

export type LineaVenta = {
  productoId: string
  nombre: string
  cantidad: number
  precioUnitario: number
  subtotal: number
}

export type Venta = {
  id: string
  fecha: string
  lineas: LineaVenta[]
  total: number
}
