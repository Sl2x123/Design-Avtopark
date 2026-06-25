import { cn } from '../../utils/cn'

const variants = {
  default:     'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
  outline:     'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
  ghost:       'text-slate-600 hover:bg-slate-100',
  secondary:   'bg-slate-100 text-slate-900 hover:bg-slate-200',
}

const sizes = {
  default: 'h-10 px-4 py-2 text-sm',
  sm:      'h-8 px-3 text-xs',
  lg:      'h-12 px-6 text-base',
  icon:    'h-9 w-9',
}

export function Button({ variant = 'default', size = 'default', className, children, ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
