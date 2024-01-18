import { configAtom } from '@renderer/store'
import { useAtomValue, useSetAtom } from 'jotai'
import { Commands, GeneralSettings } from '@shared/types'

export const useAppConfig = () => {
  const config = useAtomValue(configAtom)
  const setConfig = useSetAtom(configAtom)

  const updateCommandsConfig = (newCommands: Commands) => {
    if (config) {
      setConfig((prevConfig) => ({ ...prevConfig, commands: newCommands }))
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

  return { config, updateCommandsConfig, updateGeneralConfig }
}
