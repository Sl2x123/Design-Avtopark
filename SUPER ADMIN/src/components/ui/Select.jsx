import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

export function Select({ className, children, ...props }) {
  return (
    <div className="relative">
      <select
        className={cn(
          'flex h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white',
          'px-3 py-2 pr-8 text-sm text-slate-900',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
    </div>
  )
}
