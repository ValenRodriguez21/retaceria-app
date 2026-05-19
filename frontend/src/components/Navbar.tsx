import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../lib/auth'

export default function Navbar() {
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      <NavLink
        to="/"
        className={({ isActive }) =>
          [
            'text-sm font-semibold transition',
            isActive ? 'text-[#1b3b6f]' : 'text-slate-600 hover:text-[#2b5faa]',
          ].join(' ')
        }
      >
        Inicio
      </NavLink>

      <button
        type="button"
        onClick={handleLogout}
        className="cursor-pointer rounded-lg bg-[#c53030] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b91c1c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b3b6f]"
      >
        Cerrar sesión
      </button>
    </header>
  )
}
