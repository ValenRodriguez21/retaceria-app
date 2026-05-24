import { useEffect, useState, type FormEvent } from 'react'
import type { Proveedor, ProveedorForm } from '../../types/proveedor'

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2b5faa] focus:ring-3 focus:ring-[#2b5faa]/15'

const labelClass = 'mb-1 block text-left text-sm font-semibold text-[#1b3b6f]'

const textareaClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2b5faa] focus:ring-3 focus:ring-[#2b5faa]/15 resize-none'

const formularioVacio: ProveedorForm = {
  nombre: '',
  telefono: '',
  email: '',
  direccion: '',
  observaciones: '',
}

type ProveedorModalProps = {
  abierto: boolean
  proveedor?: Proveedor | null
  onCerrar: () => void
  onGuardar: (datos: ProveedorForm, id?: string) => void
}

export default function ProveedorModal({
  abierto,
  proveedor,
  onCerrar,
  onGuardar,
}: ProveedorModalProps) {
  const [form, setForm] = useState<ProveedorForm>(formularioVacio)
  const esEdicion = Boolean(proveedor)

  useEffect(() => {
    if (abierto) {
      setForm(
        proveedor
          ? {
              nombre: proveedor.nombre,
              telefono: proveedor.telefono,
              email: proveedor.email,
              direccion: proveedor.direccion,
              observaciones: proveedor.observaciones,
            }
          : formularioVacio,
      )
    }
  }, [abierto, proveedor])

  if (!abierto) return null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onGuardar(form, proveedor?.id)
    onCerrar()
  }

  function actualizar<K extends keyof ProveedorForm>(campo: K, valor: ProveedorForm[K]) {
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
        aria-labelledby="modal-proveedor-titulo"
      >
        <h2 id="modal-proveedor-titulo" className="!m-0 !text-xl !font-bold !text-[#1b3b6f]">
          {esEdicion ? 'Editar proveedor' : 'Nuevo proveedor'}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {esEdicion ? 'Modificá los datos del proveedor.' : 'Completá los datos para agregar un nuevo proveedor.'}
        </p>

        <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="prov-nombre" className={labelClass}>
              Nombre *
            </label>
            <input
              id="prov-nombre"
              type="text"
              required
              value={form.nombre}
              onChange={(e) => actualizar('nombre', e.target.value)}
              className={inputClass}
              placeholder="Ej. Textiles del Sur"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="prov-telefono" className={labelClass}>
                Teléfono *
              </label>
              <input
                id="prov-telefono"
                type="tel"
                required
                value={form.telefono}
                onChange={(e) => actualizar('telefono', e.target.value)}
                className={inputClass}
                placeholder="Ej. +54 11 4455-6677"
              />
            </div>
            <div>
              <label htmlFor="prov-email" className={labelClass}>
                Email *
              </label>
              <input
                id="prov-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => actualizar('email', e.target.value)}
                className={inputClass}
                placeholder="Ej. ventas@proveedor.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="prov-direccion" className={labelClass}>
              Dirección *
            </label>
            <input
              id="prov-direccion"
              type="text"
              required
              value={form.direccion}
              onChange={(e) => actualizar('direccion', e.target.value)}
              className={inputClass}
              placeholder="Ej. Av. Corrientes 1234, CABA"
            />
          </div>

          <div>
            <label htmlFor="prov-observaciones" className={labelClass}>
              Observaciones
            </label>
            <textarea
              id="prov-observaciones"
              rows={3}
              value={form.observaciones}
              onChange={(e) => actualizar('observaciones', e.target.value)}
              className={textareaClass}
              placeholder="Notas adicionales sobre el proveedor..."
            />
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
              {esEdicion ? 'Guardar cambios' : 'Crear proveedor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
