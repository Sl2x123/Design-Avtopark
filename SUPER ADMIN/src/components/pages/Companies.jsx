import { useState } from 'react'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { mockCompanies, mockTariffs } from '../../data/mockData'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'

const PER_PAGE = 10

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
}

/* ─── Add Company Modal ─── */
function AddCompanyModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm]     = useState({ name: '', phone: '', tariffId: '' })
  const [errors, setErrors] = useState({})

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())   e.name    = 'Введите название компании'
    if (!form.phone.trim())  e.phone   = 'Введите номер телефона'
    if (!form.tariffId)      e.tariffId = 'Выберите тариф'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit(form)
    setForm({ name: '', phone: '', tariffId: '' })
    setErrors({})
  }

  const handleClose = () => {
    setForm({ name: '', phone: '', tariffId: '' })
    setErrors({})
    onClose()
  }

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Добавить компанию">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Название компании
          </label>
          <Input
            placeholder='ООО "Название"'
            value={form.name}
            onChange={e => set('name', e.target.value)}
            className={errors.name ? 'border-red-400 focus:ring-red-400' : ''}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Номер телефона
          </label>
          <Input
            placeholder="+998 90 123 45 67"
            value={form.phone}
            onChange={e => set('phone', e.target.value)}
            className={errors.phone ? 'border-red-400 focus:ring-red-400' : ''}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Тариф
          </label>
          <Select
            value={form.tariffId}
            onChange={e => set('tariffId', e.target.value)}
            className={errors.tariffId ? 'border-red-400 focus:ring-red-400' : ''}
          >
            <option value="">Выберите тариф</option>
            {mockTariffs.map(t => (
              <option key={t.id} value={t.id}>
                {t.name} — {t.price.toLocaleString('ru-RU')} UZS/мес
              </option>
            ))}
          </Select>
          {errors.tariffId && <p className="text-red-500 text-xs mt-1">{errors.tariffId}</p>}
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" className="flex-1">
            <Plus className="h-4 w-4 mr-1.5" />
            Добавить
          </Button>
          <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
            Отмена
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

/* ─── Company Table ─── */
function CompanyTable({ companies, onEdit, onDelete }) {
  if (!companies.length) {
    return (
      <div className="py-16 text-center text-slate-400 text-sm">
        Компании не найдены
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/60">
            {['#', 'Название', 'Телефон', 'Тариф', 'Статус', 'Дата регистрации', ''].map(h => (
              <th key={h} className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {companies.map((c, i) => (
            <tr key={c.id} className="hover:bg-slate-50/70 transition-colors group">
              <td className="py-3.5 px-4 text-sm text-slate-400 w-10">{i + 1}</td>
              <td className="py-3.5 px-4 text-sm font-medium text-slate-900 whitespace-nowrap">{c.name}</td>
              <td className="py-3.5 px-4 text-sm text-slate-600 whitespace-nowrap">{c.phone}</td>
              <td className="py-3.5 px-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                  {c.tariff}
                </span>
              </td>
              <td className="py-3.5 px-4 whitespace-nowrap">
                <Badge variant={c.status === 'active' ? 'success' : 'error'}>
                  {c.status === 'active' ? 'Активен' : 'Заблокирован'}
                </Badge>
              </td>
              <td className="py-3.5 px-4 text-sm text-slate-500 whitespace-nowrap">{formatDate(c.createdAt)}</td>
              <td className="py-3.5 px-4">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(c)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                    title="Редактировать"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(c.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                    title="Удалить"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─── Pagination ─── */
function Pagination({ page, total, perPage, onChange }) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null
  const from = (page - 1) * perPage + 1
  const to   = Math.min(page * perPage, total)

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 text-sm">
      <span className="text-slate-500">
        Показано {from} – {to} из {total}
      </span>
      <div className="flex items-center gap-0.5">
        {[
          { label: 'К', action: () => onChange(1),           disabled: page === 1 },
          { label: 'Назад', action: () => onChange(page - 1), disabled: page === 1 },
        ].map(btn => (
          <button
            key={btn.label}
            onClick={btn.action}
            disabled={btn.disabled}
            className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 transition-colors"
          >
            {btn.label}
          </button>
        ))}

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
              p === page ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            {p}
          </button>
        ))}

        {[
          { label: 'Вперёд', action: () => onChange(page + 1), disabled: page === totalPages },
          { label: 'Я',      action: () => onChange(totalPages), disabled: page === totalPages },
        ].map(btn => (
          <button
            key={btn.label}
            onClick={btn.action}
            disabled={btn.disabled}
            className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 transition-colors"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── Companies Page ─── */
export function Companies() {
  const [companies, setCompanies] = useState(mockCompanies)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch]   = useState('')
  const [page, setPage]       = useState(1)

  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  )

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleAdd = (form) => {
    const tariff = mockTariffs.find(t => t.id === Number(form.tariffId))
    setCompanies(prev => [
      {
        id: Date.now(),
        name: form.name,
        phone: form.phone,
        tariff: tariff?.name ?? 'Basic',
        tariffId: Number(form.tariffId),
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
      },
      ...prev,
    ])
    setIsModalOpen(false)
    setPage(1)
  }

  const handleDelete = (id) => {
    if (!window.confirm('Удалить компанию? Это действие нельзя отменить.')) return
    setCompanies(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Компании</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-1.5" />
          Добавить компанию
        </Button>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Search */}
        <div className="px-4 py-3 border-b border-slate-200 bg-white">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск по названию или телефону…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              className="pl-9 pr-4 py-2 w-full text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        <CompanyTable
          companies={paginated}
          onEdit={c => alert(`Редактирование: ${c.name}`)}
          onDelete={handleDelete}
        />

        <Pagination
          page={page}
          total={filtered.length}
          perPage={PER_PAGE}
          onChange={setPage}
        />
      </div>

      <AddCompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAdd}
      />
    </div>
  )
}
