import { useState } from 'react'
import { Search, Download, CheckCircle2, Clock, XCircle } from 'lucide-react'
import { mockTransactions } from '../../data/mockData'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
}

const STATUS_CONFIG = {
  success: { variant: 'success', label: 'Оплачено',      icon: CheckCircle2 },
  pending: { variant: 'warning', label: 'В обработке',   icon: Clock },
  failed:  { variant: 'error',   label: 'Отклонено',     icon: XCircle },
}

const METHOD_STYLE = {
  Click:     'bg-blue-50 text-blue-700',
  Payme:     'bg-purple-50 text-purple-700',
  Uzum:      'bg-emerald-50 text-emerald-700',
  Наличные:  'bg-amber-50 text-amber-700',
}

export function Transactions() {
  const [search, setSearch] = useState('')

  const filtered = mockTransactions.filter(t =>
    t.company.toLowerCase().includes(search.toLowerCase()) ||
    t.tariff.toLowerCase().includes(search.toLowerCase()) ||
    t.method.toLowerCase().includes(search.toLowerCase())
  )

  const totalRevenue = mockTransactions
    .filter(t => t.status === 'success')
    .reduce((s, t) => s + t.amount, 0)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Транзакции</h1>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-1.5" />
          Экспорт CSV
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Всего транзакций', value: mockTransactions.length, color: 'text-slate-900' },
          { label: 'Успешных платежей', value: mockTransactions.filter(t => t.status === 'success').length, color: 'text-emerald-600' },
          { label: 'Общая сумма (успешных)', value: `${totalRevenue.toLocaleString('ru-RU')} UZS`, color: 'text-slate-900' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">{label}</p>
            <p className={`text-2xl font-bold mt-1.5 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск по компании, тарифу…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 w-full text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/60">
                {['#', 'Компания', 'Тариф', 'Сумма', 'Способ оплаты', 'Дата', 'Статус'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-400 text-sm">
                    Транзакции не найдены
                  </td>
                </tr>
              ) : filtered.map((tx, i) => {
                const cfg = STATUS_CONFIG[tx.status] ?? STATUS_CONFIG.pending
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 text-sm text-slate-400 w-10">{i + 1}</td>
                    <td className="py-3.5 px-4 text-sm font-medium text-slate-900 whitespace-nowrap">{tx.company}</td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {tx.tariff}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-sm font-semibold text-slate-900 whitespace-nowrap">
                      {tx.amount.toLocaleString('ru-RU')} <span className="text-slate-400 font-normal text-xs">UZS</span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${METHOD_STYLE[tx.method] ?? 'bg-slate-100 text-slate-600'}`}>
                        {tx.method}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-sm text-slate-500 whitespace-nowrap">{formatDate(tx.date)}</td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge variant={cfg.variant}>{cfg.label}</Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-slate-200 text-sm text-slate-500">
          Показано {filtered.length} из {mockTransactions.length} транзакций
        </div>
      </div>
    </div>
  )
}
