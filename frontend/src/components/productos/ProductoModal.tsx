import { useEffect, useState, type FormEvent } from 'react'
import type { Producto, ProductoForm } from '../../types/producto'

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2b5faa] focus:ring-3 focus:ring-[#2b5faa]/15'

const labelClass = 'mb-1 block text-left text-sm font-semibold text-[#1b3b6f]'

const formularioVacio: ProductoForm = {
  codigo: '',
  nombre: '',
  categoria: '',
  color: '',
  stock: 0,
  precio: 0,
  proveedor: '',
}

type ProductoModalProps = {
  abierto: boolean
  producto?: Producto | null
  categorias: string[]
  proveedores: string[]
  onCerrar: () => void
  onGuardar: (datos: ProductoForm, id?: string) => void
}

export default function ProductoModal({
  abierto,
  producto,
  categorias,
  proveedores,
  onCerrar,
  onGuardar,
}: ProductoModalProps) {
  const [form, setForm] = useState<ProductoForm>(formularioVacio)
  const esEdicion = Boolean(producto)

  useEffect(() => {
    if (abierto) {
      setForm(
        producto
          ? {
              codigo: producto.codigo,
              nombre: producto.nombre,
              categoria: producto.categoria,
              color: producto.color,
              stock: producto.stock,
              precio: producto.precio,
              proveedor: producto.proveedor,
            }
          : formularioVacio,
      )
    }
  }, [abierto, producto])

  if (!abierto) return null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onGuardar(form, producto?.id)
    onCerrar()
  }

  function actualizar<K extends keyof ProductoForm>(campo: K, valor: ProductoForm[K]) {
    setForm((prev) => ({ ...prev, [campo]: valor }))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onCerrar}
      role="presentation"
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 text-left shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-producto-titulo"
      >
        <h2 id="modal-producto-titulo" className="!m-0 !text-xl !font-bold !text-[#1b3b6f]">
          {esEdicion ? 'Editar producto' : 'Nuevo producto'}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {esEdicion ? 'Modificá los datos del producto.' : 'Completá los datos para agregar al catálogo.'}
        </p>

        <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="prod-codigo" className={labelClass}>
              Código
            </label>
            <input
              id="prod-codigo"
              type="text"
              required
              value={form.codigo}
              onChange={(e) => actualizar('codigo', e.target.value)}
              className={inputClass}
              placeholder="Ej. TELA-001"
            />
          </div>
          <div>
            <label htmlFor="prod-nombre" className={labelClass}>
              Nombre
            </label>
            <input
              id="prod-nombre"
              type="text"
              required
              value={form.nombre}
              onChange={(e) => actualizar('nombre', e.target.value)}
              className={inputClass}
              placeholder="Ej. Tela algodón premium"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="prod-categoria" className={labelClass}>
                Categoría
              </label>
              <input
                id="prod-categoria"
                type="text"
                required
                list="categorias-list"
                value={form.categoria}
                onChange={(e) => actualizar('categoria', e.target.value)}
                className={inputClass}
                placeholder="Telas, Hilos..."
              />
              <datalist id="categorias-list">
                {categorias.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <div>
              <label htmlFor="prod-color" className={labelClass}>
                Color
              </label>
              <input
                id="prod-color"
                type="text"
                required
                value={form.color}
                onChange={(e) => actualizar('color', e.target.value)}
                className={inputClass}
                placeholder="Ej. Blanco"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="prod-stock" className={labelClass}>
                Stock
              </label>
              <input
                id="prod-stock"
                type="number"
                required
                min={0}
                value={form.stock || ''}
                onChange={(e) => actualizar('stock', Number(e.target.value))}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="prod-precio" className={labelClass}>
                Precio
              </label>
              <input
                id="prod-precio"
                type="number"
                required
                min={0}
                step="0.01"
                value={form.precio || ''}
                onChange={(e) => actualizar('precio', Number(e.target.value))}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="prod-proveedor" className={labelClass}>
              Proveedor
            </label>
            <input
              id="prod-proveedor"
              type="text"
              required
              list="proveedores-list"
              value={form.proveedor}
              onChange={(e) => actualizar('proveedor', e.target.value)}
              className={inputClass}
              placeholder="Nombre del proveedor"
            />
            <datalist id="proveedores-list">
              {proveedores.map((p) => (
                <option key={p} value={p} />
              ))}
            </datalist>
          </div>

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCerrar}
              className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-[#c53030] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b91c1c]"
            >
              {esEdicion ? 'Guardar cambios' : 'Crear producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
