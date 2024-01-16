import React, { useEffect } from 'react'
import { Command, Commands as CommandsI } from '@shared/types'
import { config } from '@shared/config'
import { CommandItem } from './CommandItem'

export const Commands: React.FC = () => {
  const [commands, setCommands] = React.useState<CommandsI>({
    ...config.commands
  })

  const loadConfig = async () => {
    const data = await window.context.getAppConfig()
    setCommands(data.commands)
  }

  useEffect(() => {
    loadConfig()
  }, [])

  return (
    <div className="mt-2">
      {/* <Input placeholder="Search Commands..." className="w-1/2" /> */}

      <section className="mt-4">
        <ul className="mt-2 flex gap-3 flex-col">
          {Object.keys(commands).map((key) => (
            <li key={key}>
              <div className="flex flex-col gap-5 border-[1px] border-zinc-600/60 rounded-lg py-5 px-6 bg-zinc-700/20">
                {commands[key].map((command: Command) => (
                  <CommandItem key={command.label} command={command} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
