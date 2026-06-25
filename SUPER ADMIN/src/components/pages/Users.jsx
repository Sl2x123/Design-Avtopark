import { useState } from 'react'
import { Pencil, Trash2, Search, UserPlus } from 'lucide-react'
import { mockUsers } from '../../data/mockData'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { cn } from '../../utils/cn'

const ROLE_STYLES = {
  Admin:  'bg-purple-50 text-purple-700',
  Driver: 'bg-blue-50 text-blue-700',
}

function Avatar({ initials, color }) {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: color }}
    >
      <span className="text-white text-xs font-bold select-none">{initials}</span>
    </div>
  )
}

export function Users() {
  const [users, setUsers] = useState(mockUsers)
  const [search, setSearch] = useState('')

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.company.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase()) ||
    (u.phone && u.phone.includes(search))
  )

  const handleDelete = (id) => {
    if (!window.confirm('Удалить пользователя?')) return
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Пользователи</h1>
        <Button>
          <UserPlus className="h-4 w-4 mr-1.5" />
          Добавить пользователя
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Search */}
        <div className="px-4 py-3 border-b border-slate-200">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск по имени, компании или роли…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 w-full text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/60">
                {['#', 'Пользователь', 'Телефон', 'Компания', 'Роль', 'Статус', ''].map(h => (
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
                    Пользователи не найдены
                  </td>
                </tr>
              ) : filtered.map((u, i) => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition-colors group">
                  <td className="py-3.5 px-4 text-sm text-slate-400 w-10">{i + 1}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar initials={u.initials} color={u.color} />
                      <span className="text-sm font-medium text-slate-900 whitespace-nowrap">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-sm text-slate-600 whitespace-nowrap">{u.phone}</td>
                  <td className="py-3.5 px-4 text-sm text-slate-600 whitespace-nowrap">{u.company}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      ROLE_STYLES[u.role] ?? ROLE_STYLES.Staff
                    )}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge variant={u.status === 'active' ? 'success' : 'error'}>
                      {u.status === 'active' ? 'Активен' : 'Заблокирован'}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
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

        {/* Footer count */}
        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-200 text-sm text-slate-500">
            Показано {filtered.length} из {users.length} пользователей
          </div>
        )}
      </div>
    </div>
  )
}
