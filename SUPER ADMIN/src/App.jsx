import { useState } from 'react'
import { Sidebar }     from './components/layout/Sidebar'
import { Header }      from './components/layout/Header'
import { Dashboard }   from './components/pages/Dashboard'
import { Companies }   from './components/pages/Companies'
import { Users }       from './components/pages/Users'
import { Tariffs }     from './components/pages/Tariffs'
import { Transactions }  from './components/pages/Transactions'
import { Notifications } from './components/pages/Notifications'

const PAGES = {
  dashboard:     Dashboard,
  companies:     Companies,
  users:         Users,
  tariffs:       Tariffs,
  transactions:  Transactions,
  notifications: Notifications,
}

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const Page = PAGES[activePage] ?? Dashboard

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      {/* Right side: header + scrollable content */}
      <div className="flex flex-col flex-1 ml-64 min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto pt-16">
          <div className="p-6 max-w-screen-xl">
            <Page />
          </div>
        </main>
      </div>
    </div>
  )
}
