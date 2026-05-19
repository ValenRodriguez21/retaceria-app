import { useMemo, useState } from 'react'
import AgregarAlCarritoModal from '../components/ventas/AgregarAlCarritoModal'
import ConfirmarVentaModal from '../components/ventas/ConfirmarVentaModal'
import { useProductos } from '../contexts/ProductosContext'
import { formatPrecio } from '../lib/format'
import {
  cantidadMinima,
  normalizarCantidad,
  pasoCantidad,
  unidadMedida,
} from '../lib/unidadMedida'
import type { Producto } from '../types/producto'
import type { ItemCarrito, LineaCarrito } from '../types/venta'

function SearchIcon() {
  return (
    <svg
      className="pointer-events-none absolute left-3.5 size-[18px] text-slate-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M16 16l5 5" strokeLinecap="round" />
    </svg>
  )
}

function construirLineas(carrito: ItemCarrito[], productos: Producto[]): LineaCarrito[] {
  return carrito
    .map((item) => {
      const producto = productos.find((p) => p.id === item.productoId)
      if (!producto) return null
      return {
        producto,
        cantidad: item.cantidad,
        subtotal: producto.precio * item.cantidad,
      }
    })
    .filter((l): l is LineaCarrito => l !== null)
}

export default function Ventas() {
  const { productos, registrarVenta } = useProductos()
  const [busqueda, setBusqueda] = useState('')
  const [carrito, setCarrito] = useState<ItemCarrito[]>([])
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null)
  const [confirmarAbierto, setConfirmarAbierto] = useState(false)
  const [ventaExitosa, setVentaExitosa] = useState<string | null>(null)

  const productosConStock = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()
    return productos.filter((p) => {
      if (p.stock <= 0) return false
      if (!termino) return true
      return (
        p.nombre.toLowerCase().includes(termino) ||
        p.categoria.toLowerCase().includes(termino) ||
        p.color.toLowerCase().includes(termino)
      )
    })
  }, [productos, busqueda])

  const lineas = useMemo(() => construirLineas(carrito, productos), [carrito, productos])
  const total = useMemo(() => lineas.reduce((sum, l) => sum + l.subtotal, 0), [lineas])

  function cantidadEnCarrito(productoId: string) {
    return carrito.find((i) => i.productoId === productoId)?.cantidad ?? 0
  }

  function agregarAlCarrito(productoId: string, cantidad: number) {
    const producto = productos.find((p) => p.id === productoId)
    if (!producto) return

    const cantidadNorm = normalizarCantidad(producto.categoria, cantidad)

    setCarrito((prev) => {
      const existente = prev.find((i) => i.productoId === productoId)
      if (existente) {
        const total = normalizarCantidad(
          producto.categoria,
          existente.cantidad + cantidadNorm,
        )
        return prev.map((i) =>
          i.productoId === productoId ? { ...i, cantidad: Math.min(total, producto.stock) } : i,
        )
      }
      return [...prev, { productoId, cantidad: Math.min(cantidadNorm, producto.stock) }]
    })
  }

  function actualizarCantidad(productoId: string, cantidad: number) {
    const producto = productos.find((p) => p.id === productoId)
    if (!producto || cantidad < cantidadMinima(producto.categoria)) {
      quitarDelCarrito(productoId)
      return
    }
    const cantidadFinal = normalizarCantidad(
      producto.categoria,
      Math.min(cantidad, producto.stock),
    )
    setCarrito((prev) =>
      prev.map((i) => (i.productoId === productoId ? { ...i, cantidad: cantidadFinal } : i)),
    )
  }

  function quitarDelCarrito(productoId: string) {
    setCarrito((prev) => prev.filter((i) => i.productoId !== productoId))
  }

  function vaciarCarrito() {
    setCarrito([])
  }

  function confirmarVenta() {
    const venta = registrarVenta(carrito)
    if (venta) {
      setVentaExitosa(venta.id)
      setCarrito([])
      setConfirmarAbierto(false)
      setTimeout(() => setVentaExitosa(null), 4000)
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="!m-0 !text-2xl !font-bold !text-[#1b3b6f]">Nueva venta</h1>
        <p className="mt-1 text-sm text-slate-500">
          Buscá productos, agregalos al carrito y confirmá la venta.
        </p>
      </div>

      {ventaExitosa && (
        <div
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800"
          role="status"
        >
          Venta {ventaExitosa} registrada correctamente. El stock fue actualizado.
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-5">
        {/* Buscar y agregar */}
        <section className="space-y-4 xl:col-span-3">
          <div className="relative">
            <SearchIcon />
            <input
              type="search"
              placeholder="Buscar producto por nombre, categoría o color..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pr-3.5 pl-10 text-sm outline-none focus:border-[#2b5faa] focus:ring-3 focus:ring-[#2b5faa]/15"
            />
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="max-h-[420px] overflow-y-auto">
              {productosConStock.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-slate-500">
                  {busqueda
                    ? 'No hay productos que coincidan con la búsqueda.'
                    : 'No hay productos con stock disponible.'}
                </p>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {productosConStock.map((p) => {
                    const enCarrito = cantidadEnCarrito(p.id)
                    const disponible = p.stock - enCarrito
                    return (
                      <li
                        key={p.id}
                        className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50/80"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-[#1b3b6f]">{p.nombre}</p>
                          <p className="text-xs text-slate-500">
                            {p.categoria} · {p.color} · {formatPrecio(p.precio)}/
                            {unidadMedida(p.categoria) === 'metros' ? 'm' : 'u.'} · Stock:{' '}
                            {disponible} {unidadMedida(p.categoria)}
                          </p>
                        </div>
                        <button
                          type="button"
                          disabled={disponible <= 0}
                          onClick={() => setProductoSeleccionado(p)}
                          className="shrink-0 cursor-pointer rounded-lg bg-[#2b5faa] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#1b3b6f] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Agregar
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* Carrito */}
        <section className="xl:col-span-2">
          <div className="sticky top-6 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-4 py-3">
              <h2 className="!m-0 !text-lg !font-semibold !text-[#1b3b6f]">Carrito</h2>
              <p className="text-xs text-slate-500">{lineas.length} producto(s)</p>
            </div>

            {lineas.length === 0 ? (
              <p className="px-4 py-10 text-center text-sm text-slate-500">
                El carrito está vacío. Buscá y agregá productos.
              </p>
            ) : (
              <>
                <ul className="max-h-64 divide-y divide-slate-100 overflow-y-auto">
                  {lineas.map((l) => (
                    <li key={l.producto.id} className="space-y-2 px-4 py-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-[#1b3b6f]">{l.producto.nombre}</p>
                        <button
                          type="button"
                          onClick={() => quitarDelCarrito(l.producto.id)}
                          className="cursor-pointer text-xs text-[#c53030] hover:underline"
                        >
                          Quitar
                        </button>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <label className="sr-only" htmlFor={`qty-${l.producto.id}`}>
                            Cantidad
                          </label>
                          <input
                            id={`qty-${l.producto.id}`}
                            type="number"
                            min={cantidadMinima(l.producto.categoria)}
                            max={l.producto.stock}
                            step={pasoCantidad(l.producto.categoria)}
                            value={l.cantidad}
                            onChange={(e) =>
                              actualizarCantidad(l.producto.id, Number(e.target.value))
                            }
                            className="w-20 rounded border border-slate-300 px-2 py-1 text-sm outline-none focus:border-[#2b5faa]"
                          />
                          <span className="text-xs text-slate-500">
                            {unidadMedida(l.producto.categoria)}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-[#1b3b6f]">
                          {formatPrecio(l.subtotal)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-slate-200 px-4 py-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-semibold text-[#1b3b6f]">Total</span>
                    <span className="text-xl font-bold text-[#1b3b6f]">{formatPrecio(total)}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setConfirmarAbierto(true)}
                      className="w-full cursor-pointer rounded-lg bg-[#c53030] py-3 text-sm font-semibold text-white transition hover:bg-[#b91c1c]"
                    >
                      Confirmar venta
                    </button>
                    <button
                      type="button"
                      onClick={vaciarCarrito}
                      className="w-full cursor-pointer rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                      Vaciar carrito
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>

      <AgregarAlCarritoModal
        producto={productoSeleccionado}
        cantidadEnCarrito={
          productoSeleccionado ? cantidadEnCarrito(productoSeleccionado.id) : 0
        }
        onCerrar={() => setProductoSeleccionado(null)}
        onAgregar={(cantidad) => {
          if (productoSeleccionado) agregarAlCarrito(productoSeleccionado.id, cantidad)
        }}
      />

      <ConfirmarVentaModal
        abierto={confirmarAbierto}
        lineas={lineas}
        total={total}
        onCerrar={() => setConfirmarAbierto(false)}
        onConfirmar={confirmarVenta}
      />
    </div>
  )
}
