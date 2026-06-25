import { useState } from 'react'
import { Send, Bell, Users, Building2, User, Info, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'
import { mockNotifications, mockUsers, mockCompanies } from '../../data/mockData'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'

/* ── Config ── */
const TYPE_CONFIG = {
  info:    { label: 'Информация',     variant: 'info',    icon: Info,           color: '#3B82F6' },
  success: { label: 'Успех',          variant: 'success', icon: CheckCircle2,   color: '#10B981' },
  warning: { label: 'Предупреждение', variant: 'warning', icon: AlertTriangle,  color: '#F59E0B' },
  error:   { label: 'Ошибка',         variant: 'error',   icon: XCircle,        color: '#EF4444' },
}

const RECIPIENT_ICON = {
  all_users:     Users,
  all_companies: Building2,
  user:          User,
  company:       Building2,
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
}

/* ── Send modal ── */
function SendModal({ isOpen, onClose, onSend }) {
  const [form, setForm] = useState({
    recipientType: 'all_users',
    recipientId:   '',
    type:          'info',
    title:         '',
    message:       '',
  })
  const [errors, setErrors] = useState({})

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.title.trim())   e.title   = 'Введите заголовок'
    if (!form.message.trim()) e.message = 'Введите текст сообщения'
    if ((form.recipientType === 'user' || form.recipientType === 'company') && !form.recipientId)
      e.recipientId = 'Выберите получателя'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const recipientMap = {
      all_users:     'Все пользователи',
      all_companies: 'Все компании',
      user:          mockUsers.find(u => u.id === +form.recipientId)?.name ?? '',
      company:       mockCompanies.find(c => c.id === +form.recipientId)?.name ?? '',
    }

    onSend({
      title:         form.title,
      message:       form.message,
      type:          form.type,
      recipient:     recipientMap[form.recipientType],
      recipientType: form.recipientType,
    })
    setForm({ recipientType: 'all_users', recipientId: '', type: 'info', title: '', message: '' })
    setErrors({})
  }

  const handleClose = () => {
    setForm({ recipientType: 'all_users', recipientId: '', type: 'info', title: '', message: '' })
    setErrors({})
    onClose()
  }

  const needsId = form.recipientType === 'user' || form.recipientType === 'company'

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Отправить уведомление" className="max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Recipient type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Кому</label>
          <Select
            value={form.recipientType}
            onChange={e => { set('recipientType', e.target.value); set('recipientId', '') }}
          >
            <option value="all_users">Все пользователи</option>
            <option value="all_companies">Все компании</option>
            <option value="user">Конкретный пользователь</option>
            <option value="company">Конкретная компания</option>
          </Select>
        </div>

        {/* Specific user */}
        {form.recipientType === 'user' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Пользователь</label>
            <Select
              value={form.recipientId}
              onChange={e => set('recipientId', e.target.value)}
              className={errors.recipientId ? 'border-red-400' : ''}
            >
              <option value="">Выберите пользователя</option>
              {mockUsers.map(u => (
                <option key={u.id} value={u.id}>{u.name} — {u.company}</option>
              ))}
            </Select>
            {errors.recipientId && <p className="text-red-500 text-xs mt-1">{errors.recipientId}</p>}
          </div>
        )}

        {/* Specific company */}
        {form.recipientType === 'company' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Компания</label>
            <Select
              value={form.recipientId}
              onChange={e => set('recipientId', e.target.value)}
              className={errors.recipientId ? 'border-red-400' : ''}
            >
              <option value="">Выберите компанию</option>
              {mockCompanies.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </Select>
            {errors.recipientId && <p className="text-red-500 text-xs mt-1">{errors.recipientId}</p>}
          </div>
        )}

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Тип уведомления</label>
          <Select value={form.type} onChange={e => set('type', e.target.value)}>
            <option value="info">Информация</option>
            <option value="success">Успех</option>
            <option value="warning">Предупреждение</option>
            <option value="error">Ошибка</option>
          </Select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Заголовок</label>
          <Input
            placeholder="Например: Плановое обслуживание"
            value={form.title}
            onChange={e => set('title', e.target.value)}
            className={errors.title ? 'border-red-400 focus:ring-red-400' : ''}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Текст сообщения</label>
          <textarea
            placeholder="Введите текст уведомления…"
            value={form.message}
            onChange={e => set('message', e.target.value)}
            rows={4}
            className={`flex w-full rounded-lg border px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              errors.message ? 'border-red-400 focus:ring-red-400' : 'border-slate-200'
            }`}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>

        {/* Preview chip */}
        {(form.title || form.message) && (
          <div className="rounded-lg border border-slate-200 p-3 bg-slate-50">
            <p className="text-xs text-slate-400 mb-1.5 font-medium uppercase tracking-wide">Предпросмотр</p>
            <div className="flex items-start gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: (TYPE_CONFIG[form.type]?.color ?? '#3B82F6') + '20' }}
              >
                {(() => {
                  const Icon = TYPE_CONFIG[form.type]?.icon ?? Info
                  return <Icon className="h-3.5 w-3.5" style={{ color: TYPE_CONFIG[form.type]?.color }} />
                })()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">{form.title || '—'}</p>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{form.message || '—'}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-1">
          <Button type="submit" className="flex-1">
            <Send className="h-4 w-4 mr-1.5" />
            Отправить
          </Button>
          <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
            Отмена
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

/* ── Notifications Page ── */
export function Notifications() {
  const [list, setList] = useState(mockNotifications)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterType, setFilterType] = useState('all')

  const handleSend = (data) => {
    setList(prev => [{
      id: Date.now(),
      ...data,
      sentAt: new Date().toISOString().split('T')[0],
    }, ...prev])
    setIsModalOpen(false)
  }

  const filtered = filterType === 'all' ? list : list.filter(n => n.type === filterType)

  const stats = [
    { label: 'Всего отправлено',   value: list.length,                                                color: 'text-slate-900'   },
    { label: 'Всем пользователям', value: list.filter(n => n.recipientType === 'all_users').length,    color: 'text-blue-600'    },
    { label: 'Всем компаниям',     value: list.filter(n => n.recipientType === 'all_companies').length, color: 'text-purple-600'  },
    { label: 'Персональных',       value: list.filter(n => n.recipientType === 'user' || n.recipientType === 'company').length, color: 'text-emerald-600' },
  ]

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Уведомления</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Send className="h-4 w-4 mr-1.5" />
          Отправить уведомление
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1.5 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-200 flex-wrap">
          <span className="text-sm font-semibold text-slate-900 mr-2">История</span>
          {['all', 'info', 'success', 'warning', 'error'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filterType === t
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t === 'all' ? 'Все' : TYPE_CONFIG[t].label}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-sm">
              <Bell className="h-8 w-8 mx-auto mb-3 opacity-30" />
              Уведомлений нет
            </div>
          ) : filtered.map(n => {
            const cfg  = TYPE_CONFIG[n.type] ?? TYPE_CONFIG.info
            const Icon = cfg.icon
            const RIcon = RECIPIENT_ICON[n.recipientType] ?? User

            return (
              <div key={n.id} className="flex items-start gap-4 px-5 py-4 hover:bg-slate-50/60 transition-colors">
                {/* Type icon */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: cfg.color + '18' }}
                >
                  <Icon className="h-4 w-4" style={{ color: cfg.color }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                    <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">
                      {formatDate(n.sentAt)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5 leading-snug">{n.message}</p>
                  <div className="flex items-center gap-3 mt-2.5 flex-wrap">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      <RIcon className="h-3.5 w-3.5" />
                      {n.recipient}
                    </div>
                    <Badge variant={cfg.variant}>{cfg.label}</Badge>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <SendModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSend={handleSend}
      />
    </div>
  )
}
