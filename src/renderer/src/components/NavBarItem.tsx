import React from 'react'

interface Props {
  title: string
  icon: React.ReactNode
  active: boolean
  className?: string
}

export const NavBarItem: React.FC<Props> = ({ active, icon, title, className }) => {
  return (
    <div
      className={`flex items-center px-4 py-2 rounded-md cursor-pointer mb-1 ${
        active ? 'bg-zinc-500/30' : 'hover:bg-zinc-500/20'
      } ${className}`}
    >
      {icon}
      <span className="ml-2 text-sm font-medium">{title}</span>
    </div>
  )
}
