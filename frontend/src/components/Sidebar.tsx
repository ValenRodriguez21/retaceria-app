import { NavLink } from 'react-router-dom'
import LogoRetaceria from '../assets/LogoRetaceria.jpeg'

const navItems = [
  { to: '/productos', label: 'Productos' },
  { to: '/ventas', label: 'Ventas' },
  { to: '/proveedores', label: 'Proveedores' },
  { to: '/clientes', label: 'Clientes' },
] as const

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'block rounded-lg px-4 py-2.5 text-sm font-medium transition',
    isActive
      ? 'bg-white/15 text-white'
      : 'text-white/80 hover:bg-white/10 hover:text-white',
  ].join(' ')

export default function Sidebar() {
  return (
    <aside className="flex w-60 shrink-0 flex-col bg-[#1b3b6f] text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <img
          src={LogoRetaceria}
          alt="La Retacería"
          className="mx-auto block h-auto w-full max-w-[140px] object-contain"
        />
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
