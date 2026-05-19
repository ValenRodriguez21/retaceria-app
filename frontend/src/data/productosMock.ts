import type { Producto } from '../types/producto'

export const productosIniciales: Producto[] = [
  {
    id: '1',
    nombre: 'Tela algodón premium',
    categoria: 'Telas',
    color: 'Blanco',
    stock: 45,
    precio: 3200,
    proveedor: 'Textiles del Sur',
  },
  {
    id: '2',
    nombre: 'Hilo poliéster 500m',
    categoria: 'Hilos',
    color: 'Negro',
    stock: 8,
    precio: 890,
    proveedor: 'Hilandería Norte',
  },
  {
    id: '3',
    nombre: 'Cierre metálico 20 cm',
    categoria: 'Accesorios',
    color: 'Plateado',
    stock: 120,
    precio: 450,
    proveedor: 'Mercería Central',
  },
  {
    id: '4',
    nombre: 'Entretela fusible',
    categoria: 'Entretelas',
    color: 'Blanco',
    stock: 5,
    precio: 1100,
    proveedor: 'Textiles del Sur',
  },
  {
    id: '5',
    nombre: 'Tela lino natural',
    categoria: 'Telas',
    color: 'Beige',
    stock: 22,
    precio: 4100,
    proveedor: 'Importadora Lino',
  },
  {
    id: '6',
    nombre: 'Botón nácar 12mm',
    categoria: 'Accesorios',
    color: 'Marfil',
    stock: 200,
    precio: 25,
    proveedor: 'Mercería Central',
  },
]

export const STOCK_BAJO_UMBRAL = 10
