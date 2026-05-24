import type { Proveedor } from '../types/proveedor'

export const proveedoresIniciales: Proveedor[] = [
  {
    id: '1',
    nombre: 'Textiles del Sur',
    telefono: '+54 11 4455-6677',
    email: 'ventas@textilesdelsur.com.ar',
    direccion: 'Av. Corrientes 1234, CABA',
    observaciones: 'Proveedor de telas y entretelas. Pedidos mínimos $50.000.',
  },
  {
    id: '2',
    nombre: 'Hilandería Norte',
    telefono: '+54 11 5566-7788',
    email: 'contacto@hilanderianorte.com.ar',
    direccion: 'Calle 123 456, Rosario',
    observaciones: 'Especialistas en hilos de poliéster y algodón.',
  },
  {
    id: '3',
    nombre: 'Mercería Central',
    telefono: '+54 11 6677-8899',
    email: 'pedidos@merceriacentral.com.ar',
    direccion: 'Belgrano 789, CABA',
    observaciones: 'Accesorios, cierres y botones. Entrega en 48hs.',
  },
  {
    id: '4',
    nombre: 'Importadora Lino',
    telefono: '+54 11 7788-9900',
    email: 'info@importadoralino.com.ar',
    direccion: 'Mendoza 321, CABA',
    observaciones: 'Telas de lino importadas. Solo contado.',
  },
]
