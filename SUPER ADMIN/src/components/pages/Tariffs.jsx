import { useState } from 'react'
import { Plus, Pencil, Trash2, Users, Package, ShoppingCart, Zap, Check } from 'lucide-react'
import { mockTariffs } from '../../data/mockData'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

const unlimited = v => v === -1

function TariffCard({ tariff, onEdit, onDelete }) {
  return (
    <div className={`bg-white rounded-xl border-2 p-5 flex flex-col gap-4 transition-shadow hover:shadow-md ${
      tariff.popular ? 'border-blue-500' : 'border-slate-200'
    }`}>
      {/* Top */}
      <div className="flex items-start justify-between">
        <div>
          {tariff.popular && (
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-xs font-medium mb-2">
              <Zap className="h-3 w-3" />
              Популярный
            </div>
          )}
          <h3 className="text-lg font-bold text-slate-900">{tariff.name}</h3>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-900">
              {tariff.price.toLocaleString('ru-RU')}
            </span>
            <span className="text-sm text-slate-500">UZS / {tariff.period}</span>
          </div>
        </div>
        <Badge variant={tariff.status === 'active' ? 'success' : 'error'}>
          {tariff.status === 'active' ? 'Активен' : 'Неактивен'}
        </Badge>
      </div>

      {/* Limits */}
      <div className="bg-slate-50 rounded-lg p-3 space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Лимиты</p>
        {[
          { icon: Users, label: 'Пользователи', value: tariff.limits.users },
          { icon: Package, label: 'Товары', value: tariff.limits.products },
          { icon: ShoppingCart, label: 'Заказы / мес', value: tariff.limits.orders },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Icon className="h-3.5 w-3.5 text-slate-400" />
              {label}
            </div>
            <span className={`font-semibold ${unlimited(value) ? 'text-blue-600' : 'text-slate-900'}`}>
              {unlimited(value) ? '∞ безлимит' : value.toLocaleString('ru-RU')}
            </span>
          </div>
        ))}
      </div>

      {/* Features */}
      <ul className="space-y-1.5 flex-1">
        {tariff.features.map(f => (
          <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
            <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      {/* Usage */}
      <p className="text-xs text-slate-500">
        Используют: <span className="font-semibold text-slate-700">{tariff.companies} компании</span>
      </p>

      {/* Actions */}
      <div className="flex gap-2 pt-1 border-t border-slate-100">
        <button
          onClick={() => onEdit(tariff)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <Pencil className="h-3.5 w-3.5" />
          Изменить
        </button>
        <button
          onClick={() => onDelete(tariff.id)}
          className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
          title="Удалить тариф"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export function Tariffs() {
  const [tariffs, setTariffs] = useState(mockTariffs)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Тарифы</h1>
        <Button>
          <Plus className="h-4 w-4 mr-1.5" />
          Добавить тариф
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {tariffs.map(t => (
          <TariffCard
            key={t.id}
            tariff={t}
            onEdit={t => alert(`Редактирование тарифа: ${t.name}`)}
            onDelete={id => {
              if (window.confirm('Удалить тариф?')) {
                setTariffs(prev => prev.filter(t => t.id !== id))
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}
