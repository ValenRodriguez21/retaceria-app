export type Producto = {
  id: string
  codigo: string
  nombre: string
  categoria: string
  color: string
  stock: number
  precio: number
  proveedor: string
}

export type ProductoForm = Omit<Producto, 'id'> 

export type FiltrosProducto = {
  categoria: string
  color: string
  proveedor: string
  soloBajoStock: boolean
}

export const filtrosVacios: FiltrosProducto = {
  categoria: '',
  color: '',
  proveedor: '',
  soloBajoStock: false,
}
