import { useState, type FormEvent } from 'react'
import LogoRetaceria from '../assets/LogoRetaceria.jpeg'

function UserIcon() {
  return (
    <svg
      className="pointer-events-none absolute left-3.5 size-[18px] text-slate-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20c0-4 3.13-7 7-7s7 3 7 7" strokeLinecap="round" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg
      className="pointer-events-none absolute left-3.5 size-[18px] text-slate-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 1 1 8 0v3" strokeLinecap="round" />
    </svg>
  )
}

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white py-2.5 pr-3.5 pl-10 text-[0.95rem] text-slate-800 transition outline-none placeholder:text-slate-400 focus:border-[#2b5faa] focus:ring-3 focus:ring-[#2b5faa]/15'

export default function InicioSesion() {
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [recordarme, setRecordarme] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO: conectar con API de autenticación
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#2b5faa] p-6 font-sans">
      <div className="w-full max-w-[400px] rounded-2xl bg-white px-9 pt-10 pb-8 text-left shadow-[0_20px_40px_rgba(0,0,0,0.18)]">
        <div className="mb-7 flex min-h-[88px] items-center justify-center">
          { <img src={LogoRetaceria} alt="La Retacería" className="block h-auto w-full max-w-[220px] object-contain" /> }
        </div>

        <header className="mb-7 text-center">
          <h1 className="!m-0 mb-1.5 !text-[1.65rem] !font-bold !tracking-tight !text-[#1b3b6f]">
            Bienvenido
          </h1>
          <p className="text-[0.95rem] text-slate-500">Inicia sesión en tu cuenta</p>
        </header>

        <form className="flex flex-col gap-[1.15rem] text-left" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="usuario" className="block text-left text-sm font-semibold text-[#1b3b6f]">
              Usuario
            </label>
            <div className="relative flex items-center">
              <UserIcon />
              <input
                id="usuario"
                type="text"
                placeholder="Ingresa tu usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                autoComplete="username"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contrasena" className="block text-left text-sm font-semibold text-[#1b3b6f]">
              Contraseña
            </label>
            <div className="relative flex items-center">
              <LockIcon />
              <input
                id="contrasena"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                autoComplete="current-password"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-0.5 flex items-center gap-2">
            <input
              id="recordarme"
              type="checkbox"
              checked={recordarme}
              onChange={(e) => setRecordarme(e.target.checked)}
              className="size-4 cursor-pointer accent-[#1b3b6f]"
            />
            <label
              htmlFor="recordarme"
              className="cursor-pointer text-sm font-medium text-slate-700"
            >
              Recordarme
            </label>
          </div>

          <button
            type="submit"
            className="mt-2 w-full cursor-pointer rounded-lg border-0 bg-[#c53030] py-3.5 text-base font-semibold text-white transition hover:bg-[#b91c1c] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b3b6f]"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}
