import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function AppLayout() {
  return (
    <div className="flex min-h-svh font-sans">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col bg-slate-100">
        <Navbar />
        <main className="flex-1 overflow-auto p-6 text-left">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
