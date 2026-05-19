import type { LineaCarrito } from '../../types/venta'
import { formatPrecio } from '../../lib/format'
import { unidadMedida } from '../../lib/unidadMedida'

type ConfirmarVentaModalProps = {
  abierto: boolean
  lineas: LineaCarrito[]
  total: number
  onCerrar: () => void
  onConfirmar: () => void
}

export default function ConfirmarVentaModal({
  abierto,
  lineas,
  total,
  onCerrar,
  onConfirmar,
}: ConfirmarVentaModalProps) {
  if (!abierto) return null

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
        aria-labelledby="confirmar-venta-titulo"
      >
        <h2 id="confirmar-venta-titulo" className="!m-0 !text-lg !font-bold !text-[#1b3b6f]">
          Confirmar venta
        </h2>
        <p className="mt-1 text-sm text-slate-500">Revisá el detalle antes de registrar la venta.</p>

        <ul className="mt-4 max-h-48 space-y-2 overflow-y-auto">
          {lineas.map((l) => (
            <li
              key={l.producto.id}
              className="flex justify-between gap-2 border-b border-slate-100 pb-2 text-sm last:border-0"
            >
              <span className="text-slate-700">
                {l.producto.nombre}{' '}
                <span className="text-slate-400">
                  × {l.cantidad} {unidadMedida(l.producto.categoria)}
                </span>
              </span>
              <span className="shrink-0 font-medium text-[#1b3b6f]">{formatPrecio(l.subtotal)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
          <span className="font-semibold text-[#1b3b6f]">Total</span>
          <span className="text-xl font-bold text-[#1b3b6f]">{formatPrecio(total)}</span>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCerrar}
            className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Volver
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            className="cursor-pointer rounded-lg bg-[#c53030] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#b91c1c]"
          >
            Confirmar venta
          </button>
        </div>
      </div>
    </div>
  )
}
