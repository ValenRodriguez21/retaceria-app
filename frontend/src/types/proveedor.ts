export type Proveedor = {
  id: string
  nombre: string
  telefono: string
  email: string
  direccion: string
  observaciones: string
}

export type ProveedorForm = Omit<Proveedor, 'id'>
