import React from 'react'
import { SettingsItem } from './SettingsItem'
import { Switch } from './ui/Switch'
import Button from './ui/Button'
import { CiImport, CiExport } from 'react-icons/ci'
import { GeneralSettings as GeneralSettingConfig } from '@shared/types'
import { useAppConfig } from '@renderer/hooks/useAppConfig'

interface Props {
  config: GeneralSettingConfig | undefined
}

export const GeneralSettings: React.FC<Props> = ({ config }) => {
  const { updateGeneralConfig } = useAppConfig()

  console.log('config :>> ', config)

  return (
    <div className="mt-2">
      <h1 className="text-2xl font-bold mt-2">General</h1>

      <div className="mt-4 flex gap-3 flex-col">
        <div className="flex flex-col gap-2 border-[1px] border-zinc-600/60 rounded-lg py-5 px-6 bg-zinc-700/20">
          <SettingsItem>
            <SettingsItem.Label>Launch on login</SettingsItem.Label>
            <SettingsItem.Action>
              <Switch
                checked={config?.launchOnLogin}
                onCheckedChange={(value) => updateGeneralConfig('launchOnLogin', value)}
              />
            </SettingsItem.Action>
          </SettingsItem>
          <SettingsItem>
            <SettingsItem.Label subLabel="When the menu bar icon is hidden, relaunch Layout from finder to open.">
              Hide menu bar icon
            </SettingsItem.Label>
            <SettingsItem.Action>
              <Switch
                checked={config?.hideMenuIcon}
                onCheckedChange={(value) => updateGeneralConfig('hideMenuIcon', value)}
              />
            </SettingsItem.Action>
          </SettingsItem>
          <SettingsItem hideBorder>
            <SettingsItem.Label>Check for updated automatically</SettingsItem.Label>
            <SettingsItem.Action>
              <Switch
                checked={config?.checkForUpdates}
                onCheckedChange={(value) => updateGeneralConfig('checkForUpdates', value)}
              />
            </SettingsItem.Action>
          </SettingsItem>
        </div>

        <div className="flex flex-col gap-2 border-[1px] border-zinc-600/60 rounded-lg py-5 px-6 bg-zinc-700/20">
          <SettingsItem hideBorder>
            <SettingsItem.Label>Gaps between windows</SettingsItem.Label>
            <SettingsItem.Action>
              <input
                type="range"
                min="0"
                max="100"
                value={config?.gapSize}
                onChange={(event) => updateGeneralConfig('gapSize', event.target.valueAsNumber)}
                className="bg-zinc-500 appearance-none h-0 rounded-full w-full py-[1.5px]"
              />
              <span className="text-xs text-slate-300 ml-1">{config?.gapSize}px</span>
            </SettingsItem.Action>
          </SettingsItem>
        </div>

        <div className="flex items-center justify-between mt-2">
          <Button>Reset to defaults shortcuts</Button>
          <div className="flex flex-row gap-2">
            <Button Icon={CiImport}>Import</Button>
            <Button Icon={CiExport}>Export</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
