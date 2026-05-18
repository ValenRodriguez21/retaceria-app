import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import AppLayout from './layouts/AppLayout'
import { isAuthenticated } from './lib/auth'
import Clientes from './pages/clientes'
import Inicio from './pages/inicio'
import InicioSesion from './pages/inicioSesion'
import Productos from './pages/productos'
import Proveedores from './pages/proveedores'
import Ventas from './pages/ventas'

function LoginRoute() {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />
  }
  return <InicioSesion />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginRoute />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Inicio />} />
            <Route path="productos" element={<Productos />} />
            <Route path="ventas" element={<Ventas />} />
            <Route path="proveedores" element={<Proveedores />} />
            <Route path="clientes" element={<Clientes />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
