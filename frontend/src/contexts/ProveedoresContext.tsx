import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { proveedoresIniciales } from '../data/proveedoresMock'
import type { Proveedor, ProveedorForm } from '../types/proveedor'

type ProveedoresContextValue = {
  proveedores: Proveedor[]
  guardarProveedor: (datos: ProveedorForm, id?: string) => void
  eliminarProveedor: (id: string) => void
}

const ProveedoresContext = createContext<ProveedoresContextValue | null>(null)

export function ProveedoresProvider({ children }: { children: ReactNode }) {
  const [proveedores, setProveedores] = useState<Proveedor[]>(proveedoresIniciales)

  const guardarProveedor = useCallback((datos: ProveedorForm, id?: string) => {
    if (id) {
      setProveedores((prev) => prev.map((p) => (p.id === id ? { ...p, ...datos } : p)))
    } else {
      setProveedores((prev) => [...prev, { ...datos, id: crypto.randomUUID() }])
    }
  }, [])

  const eliminarProveedor = useCallback((id: string) => {
    setProveedores((prev) => prev.filter((p) => p.id !== id))
  }, [])

  return (
    <ProveedoresContext.Provider value={{ proveedores, guardarProveedor, eliminarProveedor }}>
      {children}
    </ProveedoresContext.Provider>
  )
}

export function useProveedores() {
  const ctx = useContext(ProveedoresContext)
  if (!ctx) {
    throw new Error('useProveedores debe usarse dentro de ProveedoresProvider')
  }
  return ctx
}
