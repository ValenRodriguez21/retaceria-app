import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { productosIniciales } from '../data/productosMock'
import { cantidadValida } from '../lib/unidadMedida'
import * as productosAPI from '../lib/api/productos'
import type { Producto, ProductoForm } from '../types/producto'
import type { ItemCarrito, Venta } from '../types/venta'

type ProductosContextValue = {
  productos: Producto[]
  ventas: Venta[]
  loading: boolean
  guardarProducto: (datos: ProductoForm, id?: string) => Promise<void>
  eliminarProducto: (id: string) => Promise<void>
  registrarVenta: (items: ItemCarrito[]) => Venta | null
}

const ProductosContext = createContext<ProductosContextValue | null>(null)

function mapearProductoAPI(apiProducto: productosAPI.ProductoAPI): Producto {
  return {
    id: apiProducto.id,
    codigo: apiProducto.codigo,
    nombre: apiProducto.nombre,
    categoria: apiProducto.categoria,
    color: apiProducto.color,
    stock: apiProducto.stock,
    precio: apiProducto.precio_base,
    proveedor: apiProducto.proveedor,
  }
}

function mapearProductoFormAPI(form: ProductoForm): productosAPI.ProductoFormAPI {
  return {
    codigo: form.codigo,
    nombre: form.nombre,
    precio_base: form.precio,
    stock: form.stock,
  }
}

export function ProductosProvider({ children }: { children: ReactNode }) {
  const [productos, setProductos] = useState<Producto[]>(productosIniciales)
  const [ventas, setVentas] = useState<Venta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function cargarProductos() {
      try {
        const productosDesdeAPI = await productosAPI.fetchProductos()
        const productosMapeados = productosDesdeAPI.map(mapearProductoAPI)
        setProductos(productosMapeados)
      } catch (error) {
        console.error('Error al cargar productos:', error)
        // Fallback a datos mock si falla la API
        setProductos(productosIniciales)
      } finally {
        setLoading(false)
      }
    }

    cargarProductos()
  }, [])

  const guardarProducto = useCallback(async (datos: ProductoForm, id?: string) => {
    try {
      const datosAPI = mapearProductoFormAPI(datos)
      let productoAPI: productosAPI.ProductoAPI

      if (id) {
        productoAPI = await productosAPI.updateProducto(id, datosAPI)
      } else {
        productoAPI = await productosAPI.createProducto(datosAPI)
      }

      const productoMapeado = mapearProductoAPI(productoAPI)

      setProductos((prev) => {
        if (id) {
          return prev.map((p) => (p.id === id ? productoMapeado : p))
        } else {
          return [...prev, productoMapeado]
        }
      })
    } catch (error) {
      console.error('Error al guardar producto:', error)
      throw error
    }
  }, [])

  const eliminarProducto = useCallback(async (id: string) => {
    try {
      await productosAPI.deleteProducto(id)
      setProductos((prev) => prev.filter((p) => p.id !== id))
    } catch (error) {
      console.error('Error al eliminar producto:', error)
      throw error
    }
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
      value={{ productos, ventas, loading, guardarProducto, eliminarProducto, registrarVenta }}
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
