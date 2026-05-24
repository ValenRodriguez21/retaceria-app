import { useMemo, useState } from 'react'
import ProveedorModal from '../components/proveedores/ProveedorModal'
import { useProveedores } from '../contexts/ProveedoresContext'
import type { Proveedor } from '../types/proveedor'

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

function PlusIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  )
}

function filtrarProveedores(proveedores: Proveedor[], busqueda: string): Proveedor[] {
  const termino = busqueda.trim().toLowerCase()
  if (!termino) return proveedores

  return proveedores.filter((p) => {
    return (
      p.nombre.toLowerCase().includes(termino) ||
      p.email.toLowerCase().includes(termino) ||
      p.telefono.toLowerCase().includes(termino) ||
      p.direccion.toLowerCase().includes(termino)
    )
  })
}

export default function Proveedores() {
  const { proveedores, guardarProveedor, eliminarProveedor } = useProveedores()
  const [busqueda, setBusqueda] = useState('')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [proveedorEditando, setProveedorEditando] = useState<Proveedor | null>(null)

  const proveedoresFiltrados = useMemo(
    () => filtrarProveedores(proveedores, busqueda),
    [proveedores, busqueda],
  )

  function abrirCrear() {
    setProveedorEditando(null)
    setModalAbierto(true)
  }

  function abrirEditar(proveedor: Proveedor) {
    setProveedorEditando(proveedor)
    setModalAbierto(true)
  }

  function cerrarModal() {
    setModalAbierto(false)
    setProveedorEditando(null)
  }

  function handleEliminar(id: string) {
    if (window.confirm('¿Eliminar este proveedor?')) {
      eliminarProveedor(id)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="!m-0 !text-2xl !font-bold !text-[#1b3b6f]">Proveedores</h1>
          <p className="mt-1 text-sm text-slate-500">
            {proveedoresFiltrados.length} de {proveedores.length} proveedores
          </p>
        </div>

        <button
          type="button"
          onClick={abrirCrear}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#c53030] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b91c1c]"
        >
          <PlusIcon />
          Nuevo proveedor
        </button>
      </div>

      <div className="relative">
        <SearchIcon />
        <input
          type="search"
          placeholder="Buscar por nombre, email, teléfono o dirección..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pr-3.5 pl-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2b5faa] focus:ring-3 focus:ring-[#2b5faa]/15"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                <th className="px-4 py-3 font-semibold">Nombre</th>
                <th className="px-4 py-3 font-semibold">Teléfono</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedoresFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                    No se encontraron proveedores con esos criterios.
                  </td>
                </tr>
              ) : (
                proveedoresFiltrados.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/80">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-[#1b3b6f]">{p.nombre}</p>
                        {p.observaciones && (
                          <p className="mt-1 text-xs text-slate-500">{p.observaciones}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{p.telefono}</td>
                    <td className="px-4 py-3 text-slate-700">{p.email}</td>
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

      <ProveedorModal
        abierto={modalAbierto}
        proveedor={proveedorEditando}
        onCerrar={cerrarModal}
        onGuardar={guardarProveedor}
      />
    </div>
  )
}
