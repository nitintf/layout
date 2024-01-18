import { cn } from '@renderer/utils'
import React, { ButtonHTMLAttributes } from 'react'
import { IconType } from 'react-icons'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  Icon?: IconType
}

const Button: React.FC<ButtonProps> = ({ children, className, Icon, ...props }) => {
  return (
    <button
      className={cn(
        'flex items-center py-1 px-3 bg-zinc-200/20 text-sm text-slate-200 font-medium rounded-md shadow-md ',
        className
      )}
      {...props}
    >
      {Icon && <Icon className="mr-2" />}
      {children}
    </button>
  )
}

export default Button
