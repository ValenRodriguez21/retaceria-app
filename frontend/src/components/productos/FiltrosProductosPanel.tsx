import type { FiltrosProducto } from '../../types/producto'

const selectClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[#2b5faa] focus:ring-3 focus:ring-[#2b5faa]/15'

type FiltrosProductosPanelProps = {
  abierto: boolean
  filtros: FiltrosProducto
  categorias: string[]
  colores: string[]
  proveedores: string[]
  onChange: (filtros: FiltrosProducto) => void
  onLimpiar: () => void
}

export default function FiltrosProductosPanel({
  abierto,
  filtros,
  categorias,
  colores,
  proveedores,
  onChange,
  onLimpiar,
}: FiltrosProductosPanelProps) {
  if (!abierto) return null

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="!m-0 !text-sm !font-semibold !text-[#1b3b6f]">Filtros</h3>
        <button
          type="button"
          onClick={onLimpiar}
          className="cursor-pointer text-sm font-medium text-[#2b5faa] hover:underline"
        >
          Limpiar filtros
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="filtro-categoria" className="mb-1 block text-left text-xs font-semibold text-[#1b3b6f]">
            Categoría
          </label>
          <select
            id="filtro-categoria"
            value={filtros.categoria}
            onChange={(e) => onChange({ ...filtros, categoria: e.target.value })}
            className={selectClass}
          >
            <option value="">Todas</option>
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filtro-color" className="mb-1 block text-left text-xs font-semibold text-[#1b3b6f]">
            Color
          </label>
          <select
            id="filtro-color"
            value={filtros.color}
            onChange={(e) => onChange({ ...filtros, color: e.target.value })}
            className={selectClass}
          >
            <option value="">Todos</option>
            {colores.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filtro-proveedor" className="mb-1 block text-left text-xs font-semibold text-[#1b3b6f]">
            Proveedor
          </label>
          <select
            id="filtro-proveedor"
            value={filtros.proveedor}
            onChange={(e) => onChange({ ...filtros, proveedor: e.target.value })}
            className={selectClass}
          >
            <option value="">Todos</option>
            {proveedores.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={filtros.soloBajoStock}
              onChange={(e) => onChange({ ...filtros, soloBajoStock: e.target.checked })}
              className="size-4 accent-[#1b3b6f]"
            />
            Solo bajo stock
          </label>
        </div>
      </div>
    </div>
  )
}
