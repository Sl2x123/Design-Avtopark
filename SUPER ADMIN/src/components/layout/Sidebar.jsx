import {
  LayoutDashboard, Building2, Users, Zap,
  CreditCard, Bell, Settings, ShieldCheck,
} from 'lucide-react'
import { cn } from '../../utils/cn'

const NAV = [
  { id: 'dashboard',     label: 'Панель управления', icon: LayoutDashboard },
  { id: 'companies',     label: 'Компании',           icon: Building2 },
  { id: 'users',         label: 'Пользователи',       icon: Users },
  { id: 'tariffs',       label: 'Тарифы',             icon: Zap },
  { id: 'transactions',  label: 'Транзакции',         icon: CreditCard },
  { id: 'notifications', label: 'Уведомления',        icon: Bell },
]

export function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0D1117] flex flex-col z-30 border-r border-[#21262D]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-[#21262D] flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="h-4 w-4 text-white" />
        </div>
        <div className="flex items-center">
          <span className="text-white font-bold text-base tracking-wider">FURA</span>
          <span className="text-slate-500 font-bold text-base tracking-wider ml-1">SENTR</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin space-y-0.5">
        {NAV.map(({ id, label, icon: Icon }) => {
          const active = activePage === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left',
                active
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-900/40'
                  : 'text-[#8B929C] hover:bg-[#161B22] hover:text-slate-100'
              )}
            >
              <Icon className="h-4.5 w-4.5 flex-shrink-0 h-[18px] w-[18px]" />
              {label}
            </button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-[#21262D] flex-shrink-0">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#8B929C] hover:bg-[#161B22] hover:text-slate-100 transition-colors">
          <Settings className="h-[18px] w-[18px] flex-shrink-0" />
          Настройки
        </button>
      </div>
    </aside>
  )
}
