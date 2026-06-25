import { cn } from '../../utils/cn'

const variants = {
  success: 'bg-emerald-100 text-emerald-700',
  error:   'bg-red-100 text-red-600',
  warning: 'bg-amber-100 text-amber-700',
  info:    'bg-blue-100 text-blue-700',
  default: 'bg-slate-100 text-slate-600',
}

export function Badge({ variant = 'default', className, children }) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
