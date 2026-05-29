
export interface Producto {
    id: number
    codigo: string
    nombre: string
    precio: number
    stock: number
    categoria_id: number
    color_id: number
    proveedor_id: number
}

export interface crearProductoDTO {
    codigo: string
    nombre: string
    precio_base: number
    stock: number
    categoria_id: number
    color_id: number
    proveedor_id: number
}
