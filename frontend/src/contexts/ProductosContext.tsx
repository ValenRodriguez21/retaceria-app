import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { productosIniciales } from '../data/productosMock'
import { cantidadValida } from '../lib/unidadMedida'
import type { Producto, ProductoForm } from '../types/producto'
import type { ItemCarrito, Venta } from '../types/venta'

type ProductosContextValue = {
  productos: Producto[]
  ventas: Venta[]
  guardarProducto: (datos: ProductoForm, id?: string) => void
  eliminarProducto: (id: string) => void
  registrarVenta: (items: ItemCarrito[]) => Venta | null
}

const ProductosContext = createContext<ProductosContextValue | null>(null)

export function ProductosProvider({ children }: { children: ReactNode }) {
  const [productos, setProductos] = useState<Producto[]>(productosIniciales)
  const [ventas, setVentas] = useState<Venta[]>([])

  const guardarProducto = useCallback((datos: ProductoForm, id?: string) => {
    if (id) {
      setProductos((prev) => prev.map((p) => (p.id === id ? { ...p, ...datos } : p)))
    } else {
      setProductos((prev) => [...prev, { ...datos, id: crypto.randomUUID() }])
    }
  }, [])

  const eliminarProducto = useCallback((id: string) => {
    setProductos((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const registrarVenta = useCallback(
    (items: ItemCarrito[]): Venta | null => {
      if (items.length === 0) return null

      for (const item of items) {
        const producto = productos.find((p) => p.id === item.productoId)
        if (!producto || !cantidadValida(producto.categoria, item.cantidad, producto.stock)) {
          return null
        }
      }

      const lineas = items.map((item) => {
        const producto = productos.find((p) => p.id === item.productoId)!
        return {
          productoId: producto.id,
          nombre: producto.nombre,
          cantidad: item.cantidad,
          precioUnitario: producto.precio,
          subtotal: producto.precio * item.cantidad,
        }
      })

      const venta: Venta = {
        id: `V-${Date.now()}`,
        fecha: new Date().toISOString(),
        lineas,
        total: lineas.reduce((sum, l) => sum + l.subtotal, 0),
      }

      setProductos((prev) =>
        prev.map((p) => {
          const item = items.find((i) => i.productoId === p.id)
          return item ? { ...p, stock: p.stock - item.cantidad } : p
        }),
      )

      setVentas((prev) => [venta, ...prev])
      return venta
    },
    [productos],
  )

  return (
    <ProductosContext.Provider
      value={{ productos, ventas, guardarProducto, eliminarProducto, registrarVenta }}
    >
      {children}
    </ProductosContext.Provider>
  )
}

export function useProductos() {
  const ctx = useContext(ProductosContext)
  if (!ctx) {
    throw new Error('useProductos debe usarse dentro de ProductosProvider')
  }
  return ctx
}
