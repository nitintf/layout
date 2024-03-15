import { configAtom } from '@renderer/store'
import { useAtomValue, useSetAtom } from 'jotai'
import { CommandKey, WindowsCommands, GeneralSettings } from '@shared/types'
import { config as defaultConfig } from '@shared/config'
import { useEffect } from 'react'
import { ActionType } from '@shared/actions'

export const useAppConfig = () => {
  const config = useAtomValue(configAtom)
  const setConfig = useSetAtom(configAtom)

  useEffect(() => {
    if (!config) return
    window.context.updateAppConfig(config)
  }, [config])

  const resetConfig = () => {
    window.context.resetAppConfig().then((response) => {
      if (response) {
        setConfig(defaultConfig)
      }
    })
  }

  const updateCommandsConfig = (
    action: ActionType,
    key: CommandKey,
    newValue: string | boolean
  ) => {
    if (!config) return

    // Iterate over each command category
    for (const commandCategoryKey in config.windowsCommands) {
      const commandCategory = config.windowsCommands[commandCategoryKey as keyof WindowsCommands]

      if (!commandCategory) continue

      // Find the command with the matching label
      const commandIndex = commandCategory?.findIndex((command) => command.action === action)

      // If the command is found, update it
      if (commandIndex !== undefined && commandIndex !== -1) {
        const updatedCommand = { ...commandCategory[commandIndex], [key]: newValue }
        const updatedCommandCategory = [...commandCategory]
        updatedCommandCategory[commandIndex] = updatedCommand

        const updatedConfig = {
          ...config.windowsCommands,
          [commandCategoryKey]: updatedCommandCategory
        }
        setConfig(() => ({ ...config, windowsCommands: updatedConfig }))
      }
    }
  }

  const updateGeneralConfig = (key: keyof GeneralSettings, value: boolean | number) => {
    if (config) {
      setConfig(() => ({
        ...config,
        general: {
          ...config.general,
          [key]: value
        }
      }))
    }
  }

  return { config, updateCommandsConfig, updateGeneralConfig, resetConfig }
}
