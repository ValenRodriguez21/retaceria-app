import { useEffect, useState, type FormEvent } from 'react'
import { formatPrecio } from '../../lib/format'
import {
  cantidadMinima,
  esPorMetro,
  MIN_CENTIMETROS,
  MIN_METROS,
  unidadMedida,
} from '../../lib/unidadMedida'
import type { Producto } from '../../types/producto'

type AgregarAlCarritoModalProps = {
  producto: Producto | null
  cantidadEnCarrito: number
  onCerrar: () => void
  onAgregar: (cantidad: number) => void
}

function parsearCantidad(texto: string): number | null {
  const limpio = texto.trim().replace(',', '.')
  if (limpio === '') return null
  const valor = Number(limpio)
  return Number.isFinite(valor) ? valor : null
}

export default function AgregarAlCarritoModal({
  producto,
  cantidadEnCarrito,
  onCerrar,
  onAgregar,
}: AgregarAlCarritoModalProps) {
  const [cantidadInput, setCantidadInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (producto) {
      setCantidadInput('')
      setError(null)
    }
  }, [producto])

  if (!producto) return null

  const unidad = unidadMedida(producto.categoria)
  const stockDisponible = producto.stock - cantidadEnCarrito
  const cantidadPreview = parsearCantidad(cantidadInput)
  const subtotal =
    cantidadPreview !== null && cantidadPreview > 0
      ? producto.precio * cantidadPreview
      : null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!producto) return

    const valor = parsearCantidad(cantidadInput)

    if (valor === null) {
      setError('Ingresá una cantidad')
      return
    }

    if (esPorMetro(producto.categoria) && valor < MIN_METROS) {
      setError(`No se puede vender menos de ${MIN_CENTIMETROS} cm (0,1 m)`)
      return
    }

    if (!esPorMetro(producto.categoria) && valor < cantidadMinima(producto.categoria)) {
      setError('La cantidad mínima es 1 unidad')
      return
    }

    if (valor > stockDisponible) {
      setError(`Stock disponible: ${stockDisponible} ${unidad}`)
      return
    }

    onAgregar(valor)
    onCerrar()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onCerrar}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 text-left shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="agregar-carrito-titulo"
      >
        <h2 id="agregar-carrito-titulo" className="!m-0 !text-lg !font-bold !text-[#1b3b6f]">
          Agregar al carrito
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-700">{producto.nombre}</p>
        <p className="text-sm text-slate-500">
          {formatPrecio(producto.precio)} / {unidad === 'metros' ? 'metro' : 'unidad'} · Stock
          disponible: {stockDisponible} {unidad}
        </p>

        {stockDisponible <= 0 ? (
          <p className="mt-4 text-sm text-[#c53030]">
            No hay stock disponible (ya está todo en el carrito).
          </p>
        ) : (
          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="cantidad-agregar" className="mb-1 block text-sm font-semibold text-[#1b3b6f]">
                Cantidad ({unidad})
              </label>
              <input
                id="cantidad-agregar"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder={esPorMetro(producto.categoria) ? 'Ej. 1.5' : 'Ej. 2'}
                value={cantidadInput}
                onChange={(e) => {
                  setCantidadInput(e.target.value)
                  setError(null)
                }}
                className={[
                  'w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-3 focus:ring-[#2b5faa]/15',
                  error ? 'border-[#c53030] focus:border-[#c53030]' : 'border-slate-300 focus:border-[#2b5faa]',
                ].join(' ')}
              />
              {esPorMetro(producto.categoria) && !error && (
                <p className="mt-1 text-xs text-slate-500">Mínimo {MIN_CENTIMETROS} cm (0,1 m)</p>
              )}
              {error && <p className="mt-1 text-sm text-[#c53030]">{error}</p>}
            </div>

            {subtotal !== null && (
              <p className="text-sm text-slate-600">
                Subtotal: <span className="font-semibold text-[#1b3b6f]">{formatPrecio(subtotal)}</span>
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onCerrar}
                className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-lg bg-[#c53030] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#b91c1c]"
              >
                Agregar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
