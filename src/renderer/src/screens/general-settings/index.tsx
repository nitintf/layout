import React from 'react'
import { SettingsItem } from '@renderer/components/SettingsItem'
import { Switch } from '@renderer/components/ui/Switch'
import Button from '@renderer/components/ui/Button'
import { GeneralSettings as GeneralSettingConfig } from '@shared/types'
import { useAppConfig } from '@renderer/hooks/useAppConfig'
import { PinTopIcon, PinBottomIcon } from '@radix-ui/react-icons'
import { GapRangeSlider } from '@renderer/components/GapRangeSlider'

interface Props {
  config: GeneralSettingConfig | undefined
}

export const GeneralSettings: React.FC<Props> = ({ config }) => {
  const { updateGeneralConfig, resetConfig } = useAppConfig()

  return (
    <div className="mt-2 px-4">
      <div className="mt-4 flex gap-3 flex-col">
        <div className="flex flex-col gap-2 border-[1px] border-zinc-500/70 rounded-lg py-5 px-6 bg-zinc-700/20">
          <SettingsItem>
            <SettingsItem.Label>Launch on login</SettingsItem.Label>
            <SettingsItem.Action>
              <Switch
                checked={config?.launchOnLogin}
                onCheckedChange={(value) => updateGeneralConfig('launchOnLogin', value)}
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

        <div className="flex flex-col gap-2 border-[1px] border-zinc-500/70 rounded-lg py-5 px-6 bg-zinc-700/20">
          <SettingsItem hideBorder>
            <SettingsItem.Label>Gaps between windows</SettingsItem.Label>
            <SettingsItem.Action classNames="">
              <GapRangeSlider
                gapSize={config?.gapSize || 0}
                setGapSize={(size) => updateGeneralConfig('gapSize', size)}
              />
            </SettingsItem.Action>
          </SettingsItem>
        </div>

        <div className="flex items-center justify-between mt-2">
          <Button onClick={resetConfig}>Reset to defaults settings</Button>
          <div className="flex flex-row gap-2">
            <Button Icon={PinTopIcon}>Import</Button>
            <Button Icon={PinBottomIcon}>Export</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
