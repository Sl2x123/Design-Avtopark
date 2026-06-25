import { Menu, Moon, Bell, ChevronDown } from 'lucide-react'

export function Header() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20">
      <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
        <Menu className="h-5 w-5 text-slate-500" />
      </button>

      <div className="flex items-center gap-1">
        {/* Language */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700">
          <span className="text-base">🇷🇺</span>
          <span>Русский</span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>

        {/* Dark mode */}
        <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Moon className="h-5 w-5 text-slate-500" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Bell className="h-5 w-5 text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 mx-1" />

        {/* User */}
        <button className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold select-none">SA</span>
          </div>
          <span className="text-sm font-medium text-slate-700">Администратор</span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </header>
  )
}
