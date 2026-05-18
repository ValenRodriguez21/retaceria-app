type StatCard = {
  label: string
  value: string
  hint?: string
  accent?: 'blue' | 'red' | 'navy'
}

const accentStyles = {
  blue: 'border-l-[#2b5faa]',
  red: 'border-l-[#c53030]',
  navy: 'border-l-[#1b3b6f]',
}

const ventasStats: StatCard[] = [
  { label: 'Ventas hoy', value: '$ 48.250', hint: '+12% vs ayer', accent: 'blue' },
  { label: 'Ventas del mes', value: '$ 892.400', hint: 'Marzo 2026', accent: 'navy' },
  { label: 'Ticket promedio', value: '$ 3.180', hint: 'Por venta', accent: 'blue' },
  { label: 'Transacciones hoy', value: '15', hint: '3 pendientes de cobro', accent: 'red' },
]

const productosStats: StatCard[] = [
  { label: 'Productos activos', value: '248', accent: 'navy' },
  { label: 'Bajo stock', value: '12', hint: 'Requieren reposición', accent: 'red' },
  { label: 'Más vendido (mes)', value: 'Tela algodón premium', hint: '84 m vendidos', accent: 'blue' },
  { label: 'Categorías', value: '18', accent: 'navy' },
]

const ultimasVentas = [
  { id: 'V-1042', cliente: 'María González', total: '$ 12.400', hora: '10:32' },
  { id: 'V-1041', cliente: 'Taller El Punto', total: '$ 8.750', hora: '09:15' },
  { id: 'V-1040', cliente: 'Consumidor final', total: '$ 2.100', hora: '08:48' },
  { id: 'V-1039', cliente: 'Ana Ruiz', total: '$ 15.600', hora: 'Ayer 17:20' },
]

const alertasStock = [
  { producto: 'Hilo poliéster blanco', stock: '3 rollos', minimo: '10' },
  { producto: 'Cierre metálico 20 cm', stock: '8 u.', minimo: '25' },
  { producto: 'Entretela fusible', stock: '2 m', minimo: '15' },
]

function StatCardItem({ label, value, hint, accent = 'blue' }: StatCard) {
  return (
    <article
      className={`rounded-xl border border-slate-200 border-l-4 bg-white p-4 shadow-sm ${accentStyles[accent]}`}
    >
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-[#1b3b6f]">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </article>
  )
}

export default function Inicio() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="!m-0 !text-2xl !font-bold !text-[#1b3b6f]">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Resumen de ventas y productos · datos de ejemplo
        </p>
      </div>

      <section>
        <h2 className="!m-0 mb-4 !text-lg !font-semibold !text-[#1b3b6f]">Ventas</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {ventasStats.map((stat) => (
            <StatCardItem key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="!m-0 mb-4 !text-lg !font-semibold !text-[#1b3b6f]">Productos</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {productosStats.map((stat) => (
            <StatCardItem key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="!m-0 mb-4 !text-lg !font-semibold !text-[#1b3b6f]">Últimas ventas</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-2 font-medium">Nº</th>
                  <th className="pb-2 font-medium">Cliente</th>
                  <th className="pb-2 font-medium">Total</th>
                  <th className="pb-2 font-medium">Hora</th>
                </tr>
              </thead>
              <tbody>
                {ultimasVentas.map((v) => (
                  <tr key={v.id} className="border-b border-slate-100 last:border-0">
                    <td className="py-2.5 font-medium text-[#2b5faa]">{v.id}</td>
                    <td className="py-2.5 text-slate-700">{v.cliente}</td>
                    <td className="py-2.5 font-medium text-[#1b3b6f]">{v.total}</td>
                    <td className="py-2.5 text-slate-500">{v.hora}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="!m-0 mb-4 !text-lg !font-semibold !text-[#1b3b6f]">
            Alertas de stock bajo
          </h2>
          <ul className="space-y-3">
            {alertasStock.map((item) => (
              <li
                key={item.producto}
                className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50/50 px-3 py-2.5"
              >
                <span className="text-sm font-medium text-slate-700">{item.producto}</span>
                <span className="text-xs text-[#c53030]">
                  {item.stock} <span className="text-slate-400">/ mín. {item.minimo}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-xl border border-dashed border-[#2b5faa]/40 bg-[#2b5faa]/5 p-5">
        <h2 className="!m-0 mb-2 !text-base !font-semibold !text-[#1b3b6f]">
          Próximas métricas sugeridas
        </h2>
        <p className="text-sm text-slate-600">
          Cuentas por cobrar · pedidos a proveedores pendientes · top clientes del mes ·
          margen por categoría · comparativa ventas vs mes anterior.
        </p>
      </section>
    </div>
  )
}
