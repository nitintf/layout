import React from 'react'

interface Props {
  title: string
  icon: React.ReactNode
  active: boolean
  onClick: () => void
  className?: string
}

export const NavBarItem: React.FC<Props> = ({ active, icon, title, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col gap-1 items-center px-2 py-1 rounded-md cursor-pointer mb-3 ${
        active ? 'bg-zinc-400/40' : 'hover:bg-zinc-500/20'
      } ${className}`}
    >
      {icon}
      <span className="text-sm font-medium">{title}</span>
    </button>
  )
}
