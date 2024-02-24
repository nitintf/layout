import { cn } from '@renderer/utils'
import { PropsWithChildren, ReactNode } from 'react'

export interface ActionProps {
  children: ReactNode
  classNames?: string
}

export const SettingsItem = ({
  children,
  hideBorder = false
}: PropsWithChildren & { hideBorder?: boolean }) => {
  return (
    <div
      className={cn('flex items-center justify-between py-2', {
        'border-b border-zinc-500/70': !hideBorder
      })}
    >
      {children}
    </div>
  )
}

export const Label = ({ children, subLabel }: PropsWithChildren & { subLabel?: string }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-slate-200">{children}</label>
      {subLabel && <span className="text-xs text-zinc-500">{subLabel}</span>}
    </div>
  )
}

export const Action = ({ children, classNames }: PropsWithChildren<ActionProps>) => {
  return <div className={cn('flex items-center gap-2', classNames)}>{children}</div>
}

SettingsItem.Label = Label
SettingsItem.Action = Action
