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
      className={`flex items-center px-4 py-2 rounded-md cursor-pointer mb-2 w-full ${
        active ? 'bg-zinc-400/40' : 'hover:bg-zinc-500/20'
      } ${className}`}
    >
      {icon}
      <span className="ml-2 text-sm font-medium">{title}</span>
    </button>
  )
}
