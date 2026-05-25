import { useMemo, useState, useEffect } from 'react'
import FiltrosProductosPanel from '../components/productos/FiltrosProductosPanel'
import ProductoModal from '../components/productos/ProductoModal'
import { useProductos } from '../contexts/ProductosContext'
import { STOCK_BAJO_UMBRAL } from '../data/productosMock'
import { formatPrecio } from '../lib/format'
import type { FiltrosProducto, Producto, ProductoForm } from '../types/producto'
import { filtrosVacios } from '../types/producto'

function SearchIcon() {
  return (
    <svg
      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-[18px] text-slate-400"
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

function FilterIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  )
}

function valoresUnicos(productos: Producto[], campo: keyof Producto) {
  return [...new Set(productos.map((p) => p[campo] as string))].sort()
}

function filtrarProductos(
  productos: Producto[],
  busqueda: string,
  filtros: FiltrosProducto,
): Producto[] {
  const termino = busqueda.trim().toLowerCase()

  return productos.filter((p) => {
    if (termino) {
      const coincide =
        p.nombre.toLowerCase().includes(termino) ||
        p.categoria.toLowerCase().includes(termino) ||
        p.color.toLowerCase().includes(termino) ||
        p.proveedor.toLowerCase().includes(termino)
      if (!coincide) return false
    }
    if (filtros.categoria && p.categoria !== filtros.categoria) return false
    if (filtros.color && p.color !== filtros.color) return false
    if (filtros.proveedor && p.proveedor !== filtros.proveedor) return false
    if (filtros.soloBajoStock && p.stock >= STOCK_BAJO_UMBRAL) return false
    return true
  })
}

export default function Productos() {
  const { productos, guardarProducto, eliminarProducto, loading } = useProductos()
  const [busqueda, setBusqueda] = useState('')
  const [filtros, setFiltros] = useState<FiltrosProducto>(filtrosVacios)
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null)

  const categorias = useMemo(() => valoresUnicos(productos, 'categoria'), [productos])
  const colores = useMemo(() => valoresUnicos(productos, 'color'), [productos])
  const proveedores = useMemo(() => valoresUnicos(productos, 'proveedor'), [productos])

  const productosFiltrados = useMemo(
    () => filtrarProductos(productos, busqueda, filtros),
    [productos, busqueda, filtros],
  )

  const hayFiltrosActivos =
    filtros.categoria !== '' ||
    filtros.color !== '' ||
    filtros.proveedor !== '' ||
    filtros.soloBajoStock

  function abrirCrear() {
    setProductoEditando(null)
    setModalAbierto(true)
  }

  function abrirEditar(producto: Producto) {
    setProductoEditando(producto)
    setModalAbierto(true)
  }

  function cerrarModal() {
    setModalAbierto(false)
    setProductoEditando(null)
  }

  async function handleGuardar(datos: ProductoForm, id?: string) {
    try {
      await guardarProducto(datos, id)
      cerrarModal()
    } catch (error) {
      console.error('Error al guardar producto:', error)
      alert('Error al guardar el producto. Por favor, intenta nuevamente.')
    }
  }

  async function handleEliminar(id: string) {
    if (window.confirm('¿Eliminar este producto?')) {
      try {
        await eliminarProducto(id)
      } catch (error) {
        console.error('Error al eliminar producto:', error)
        alert('Error al eliminar el producto. Por favor, intenta nuevamente.')
      }
    }
  }

  return (
    <div className="space-y-5">
      {loading && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
          Cargando productos...
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="!m-0 !text-2xl !font-bold !text-[#1b3b6f]">Productos</h1>
          <p className="mt-1 text-sm text-slate-500">
            {productosFiltrados.length} de {productos.length} productos
          </p>
        </div>

        <button
          type="button"
          onClick={abrirCrear}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#c53030] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b91c1c]"
        >
          <PlusIcon />
          Crear producto
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <SearchIcon />
          <input
            type="search"
            placeholder="Buscar por nombre, categoría, color o proveedor..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pr-3.5 pl-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2b5faa] focus:ring-3 focus:ring-[#2b5faa]/15"
          />
        </div>

        <button
          type="button"
          onClick={() => setFiltrosAbiertos((v) => !v)}
          className={[
            'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition',
            filtrosAbiertos || hayFiltrosActivos
              ? 'border-[#2b5faa] bg-[#2b5faa]/10 text-[#1b3b6f]'
              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
          ].join(' ')}
        >
          <FilterIcon />
          Filtrar
          {hayFiltrosActivos && (
            <span className="flex size-5 items-center justify-center rounded-full bg-[#c53030] text-xs text-white">
              !
            </span>
          )}
        </button>
      </div>

      <FiltrosProductosPanel
        abierto={filtrosAbiertos}
        filtros={filtros}
        categorias={categorias}
        colores={colores}
        proveedores={proveedores}
        onChange={setFiltros}
        onLimpiar={() => setFiltros(filtrosVacios)}
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                <th className="px-4 py-3 font-semibold">Código</th>
                <th className="px-4 py-3 font-semibold">Nombre</th>
                <th className="px-4 py-3 font-semibold">Categoría</th>
                <th className="px-4 py-3 font-semibold">Color</th>
                <th className="px-4 py-3 font-semibold">Stock</th>
                <th className="px-4 py-3 font-semibold">Precio</th>
                <th className="px-4 py-3 font-semibold">Proveedor</th>
                <th className="px-4 py-3 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-slate-500">
                    No se encontraron productos con esos criterios.
                  </td>
                </tr>
              ) : (
                productosFiltrados.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/80">
                    <td className="px-4 py-3 font-medium text-[#2b5faa]">{p.codigo}</td>
                    <td className="px-4 py-3 font-medium text-[#1b3b6f]">{p.nombre}</td>
                    <td className="px-4 py-3 text-slate-700">{p.categoria}</td>
                    <td className="px-4 py-3 text-slate-700">{p.color}</td>
                    <td className="px-4 py-3">
                      <span
                        className={[
                          'inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold',
                          p.stock < STOCK_BAJO_UMBRAL
                            ? 'bg-red-100 text-[#c53030]'
                            : 'bg-slate-100 text-slate-600',
                        ].join(' ')}
                      >
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">{formatPrecio(p.precio)}</td>
                    <td className="px-4 py-3 text-slate-700">{p.proveedor}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => abrirEditar(p)}
                          className="cursor-pointer text-sm font-medium text-[#2b5faa] hover:underline"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEliminar(p.id)}
                          className="cursor-pointer text-sm font-medium text-[#c53030] hover:underline"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductoModal
        abierto={modalAbierto}
        producto={productoEditando}
        categorias={categorias}
        proveedores={proveedores}
        onCerrar={cerrarModal}
        onGuardar={handleGuardar}
      />
    </div>
  )
}
