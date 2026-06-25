import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Input = forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm',
      'placeholder:text-slate-400 text-slate-900',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  />
))
Input.displayName = 'Input'
