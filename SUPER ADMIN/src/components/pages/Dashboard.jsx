import {
  Building2, Users, CreditCard, FileText,
  TrendingUp, ArrowUpRight, TrendingDown,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar,
} from 'recharts'
import {
  mockCompanies, mockUsers, mockTariffs, mockTransactions,
  revenueData, recentActions,
} from '../../data/mockData'

/* ── Pre-calculated analytics ── */
const monthRevenue   = revenueData[revenueData.length - 1].revenue
const prevRevenue    = revenueData[revenueData.length - 2].revenue
const revenueGrowth  = Math.round((monthRevenue - prevRevenue) / prevRevenue * 100)

const successTx  = mockTransactions.filter(t => t.status === 'success')
const totalPaid  = successTx.reduce((s, t) => s + t.amount, 0)

const tariffDist = mockTariffs.map(t => ({
  name:  t.name,
  value: mockCompanies.filter(c => c.tariffId === t.id).length,
}))

const methodDist = Object.entries(
  mockTransactions.reduce((acc, t) => {
    acc[t.method] = (acc[t.method] || 0) + 1
    return acc
  }, {})
).map(([name, value]) => ({ name, value }))
  .sort((a, b) => b.value - a.value)

const statusDist = [
  { name: 'Оплачено',    value: mockTransactions.filter(t => t.status === 'success').length, color: '#10B981' },
  { name: 'В обработке', value: mockTransactions.filter(t => t.status === 'pending').length,  color: '#F59E0B' },
  { name: 'Отклонено',   value: mockTransactions.filter(t => t.status === 'failed').length,   color: '#EF4444' },
]

const roleDist = [
  { name: 'Admin',  value: mockUsers.filter(u => u.role === 'Admin').length  },
  { name: 'Driver', value: mockUsers.filter(u => u.role === 'Driver').length },
]

const topCompanies = Object.entries(
  successTx.reduce((acc, t) => {
    acc[t.company] = (acc[t.company] || 0) + t.amount
    return acc
  }, {})
)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([raw, amount]) => ({
    name: raw.replace(/["'«»""ООО|АО|ИП]/g, '').replace(/\s+/g, ' ').trim().substring(0, 16),
    amount,
  }))

const companyStat = {
  active:  mockCompanies.filter(c => c.status === 'active').length,
  blocked: mockCompanies.filter(c => c.status === 'blocked').length,
}
const userStat = {
  active:  mockUsers.filter(u => u.status === 'active').length,
  blocked: mockUsers.filter(u => u.status === 'blocked').length,
}

/* ── Color palettes ── */
const TARIFF_COLORS = ['#94A3B8', '#3B82F6', '#8B5CF6', '#10B981']
const METHOD_COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B']
const ROLE_COLORS   = ['#8B5CF6', '#3B82F6']

const ACTION_DOT = {
  company: '#3B82F6',
  tariff:  '#8B5CF6',
  payment: '#10B981',
  block:   '#EF4444',
}

/* ── Reusable tooltip ── */
const RevenueTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-lg text-sm">
      <p className="font-medium text-slate-600 mb-0.5">{label}</p>
      <p className="font-bold text-blue-600">{payload[0].value.toLocaleString('ru-RU')} UZS</p>
    </div>
  )
}

const BarTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-lg text-sm">
      <p className="font-bold text-blue-600">{payload[0].value.toLocaleString('ru-RU')} UZS</p>
    </div>
  )
}

/* ── DonutChart widget ── */
function DonutChart({ title, subtitle, data, colors }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 h-full">
      <p className="font-semibold text-slate-900 text-sm">{title}</p>
      {subtitle && <p className="text-xs text-slate-400 mt-0.5 mb-3">{subtitle}</p>}
      <div className="flex items-center gap-4 mt-3">
        {/* Donut */}
        <div className="relative flex-shrink-0" style={{ width: 110, height: 110 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%" cy="50%"
                innerRadius={32} outerRadius={52}
                dataKey="value"
                paddingAngle={data.length > 1 ? 3 : 0}
                startAngle={90} endAngle={-270}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, n) => [v, n]}
                contentStyle={{ borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-base font-bold text-slate-900">{total}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2 min-w-0">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: colors[i % colors.length] }} />
                <span className="text-xs text-slate-600 truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="text-xs font-semibold text-slate-900">{item.value}</span>
                <span className="text-xs text-slate-400">{Math.round(item.value / total * 100)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── KPI card ── */
function KpiCard({ label, value, suffix, icon: Icon, iconBg, iconColor, active, blocked, trend, trendUp }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        {trend != null && (
          trendUp
            ? <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full"><TrendingUp className="h-3 w-3" />{trend}</div>
            : <div className="flex items-center gap-1 text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-full"><TrendingDown className="h-3 w-3" />{trend}</div>
        )}
      </div>
      <div className="flex items-baseline gap-1.5 mb-0.5">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        {suffix && <span className="text-sm text-slate-400 font-medium">{suffix}</span>}
      </div>
      <p className="text-sm text-slate-500">{label}</p>
      {(active != null) && (
        <div className="flex items-center gap-3 mt-2.5 pt-2.5 border-t border-slate-100 text-xs">
          <span className="text-emerald-600 font-medium">✓ {active} активных</span>
          <span className="text-red-500 font-medium">✕ {blocked} заблок.</span>
        </div>
      )}
    </div>
  )
}

/* ── Main Dashboard ── */
export function Dashboard() {
  return (
    <div className="space-y-5">

      {/* Row 1 — KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          label="Компании"        value={mockCompanies.length}
          icon={Building2}        iconBg="bg-blue-50"    iconColor="text-blue-600"
          active={companyStat.active} blocked={companyStat.blocked}
        />
        <KpiCard
          label="Пользователи"   value={mockUsers.length}
          icon={Users}            iconBg="bg-purple-50"  iconColor="text-purple-600"
          active={userStat.active}    blocked={userStat.blocked}
        />
        <KpiCard
          label="Доход (месяц)"
          value={(monthRevenue / 1000000).toFixed(1) + ' M'} suffix="UZS"
          icon={CreditCard}       iconBg="bg-emerald-50" iconColor="text-emerald-600"
          trend={`${revenueGrowth > 0 ? '+' : ''}${revenueGrowth}%`} trendUp={revenueGrowth > 0}
        />
        <KpiCard
          label="Транзакции"     value={mockTransactions.length}
          icon={FileText}         iconBg="bg-amber-50"   iconColor="text-amber-600"
          trend={`${successTx.length} успешных`} trendUp
        />
      </div>

      {/* Row 2 — Revenue chart + Tariff donut */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-slate-900">График доходов</h3>
              <p className="text-sm text-slate-500 mt-0.5">За последние 6 месяцев</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
              <TrendingUp className="h-3.5 w-3.5" />
              +{revenueGrowth}% к прошлому
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3B82F6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false}
                tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} width={40}
              />
              <Tooltip content={<RevenueTooltip />} />
              <Area
                type="monotone" dataKey="revenue"
                stroke="#3B82F6" strokeWidth={2}
                fill="url(#rev)" dot={false}
                activeDot={{ r: 4, fill: '#3B82F6', strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <DonutChart
          title="Компании по тарифам"
          subtitle="Активные подписки"
          data={tariffDist}
          colors={TARIFF_COLORS}
        />
      </div>

      {/* Row 3 — 3 analytics panels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <DonutChart
          title="Методы оплаты"
          subtitle="По кол-ву транзакций"
          data={methodDist}
          colors={METHOD_COLORS}
        />

        {/* Transaction statuses with progress bars */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="font-semibold text-slate-900 text-sm">Статусы транзакций</p>
          <p className="text-xs text-slate-400 mt-0.5 mb-5">Всего {mockTransactions.length} операций</p>

          <div className="space-y-4">
            {statusDist.map(s => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-xs text-slate-600">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{s.value}</span>
                    <span className="text-xs text-slate-400 w-8 text-right">
                      {Math.round(s.value / mockTransactions.length * 100)}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.round(s.value / mockTransactions.length * 100)}%`,
                      backgroundColor: s.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 mb-1">Сумма успешных платежей</p>
            <p className="text-lg font-bold text-slate-900">
              {totalPaid.toLocaleString('ru-RU')}
              <span className="text-sm font-normal text-slate-400 ml-1">UZS</span>
            </p>
          </div>
        </div>

        <DonutChart
          title="Пользователи по роли"
          subtitle="Admin и Driver"
          data={roleDist}
          colors={ROLE_COLORS}
        />
      </div>

      {/* Row 4 — Top companies bar + Recent actions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Horizontal bar chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="font-semibold text-slate-900 text-sm">Топ компании по платежам</p>
          <p className="text-xs text-slate-400 mt-0.5 mb-4">Успешные транзакции, UZS</p>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={topCompanies} layout="vertical" margin={{ left: 4, right: 24, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false}
                tickFormatter={v => `${(v / 1000000).toFixed(1)}M`}
              />
              <YAxis
                type="category" dataKey="name" width={80}
                tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false}
              />
              <Tooltip content={<BarTooltip />} />
              <Bar dataKey="amount" fill="#3B82F6" radius={[0, 4, 4, 0]} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent actions feed */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="font-semibold text-slate-900 text-sm mb-4">Последние действия</p>
          <div>
            {recentActions.map((action, i) => (
              <div key={action.id} className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: ACTION_DOT[action.type] ?? '#94A3B8' }}
                  />
                  {i < recentActions.length - 1 && (
                    <div className="w-px bg-slate-100 mt-1" style={{ height: 24 }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 leading-snug">{action.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{action.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
