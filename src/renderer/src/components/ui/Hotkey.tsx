import { cn, wait } from '@renderer/utils'
import { shortcutToIcons } from '@renderer/utils/keys'
import React, { LegacyRef, useEffect, useRef } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import useHotKeyRecorder from '@renderer/hooks/useHotKeyRecorder'
import useOnClickOutside from '@renderer/hooks/useOnClickOutside'
import { useAppConfig } from '@renderer/hooks/useAppConfig'
import { ActionType } from '@shared/actions'

interface HotkeyProps {
  hotkey: string
  action: ActionType
  className?: string
}

export const Hotkey: React.FC<HotkeyProps> = ({ hotkey, className, action }) => {
  const ref = useRef<HTMLDivElement>() as LegacyRef<HTMLDivElement> | undefined

  const [listenForHotkey, setListenForHotkey] = React.useState(false)

  const { updateCommandsConfig } = useAppConfig()
  const { result, reset } = useHotKeyRecorder(listenForHotkey)

  useOnClickOutside(ref, () => setListenForHotkey(false))

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (result.success) {
        updateCommandsConfig(action, 'shortcut', result.combination.join('+'))
        // await wait(1000)
        setListenForHotkey(false)
        reset()
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [result.success])

  console.log('result :>> ', result)
  return (
    <div ref={ref}>
      <Popover open={listenForHotkey} onOpenChange={() => setListenForHotkey(true)}>
        <PopoverTrigger className={cn('text-xs text-gray-400', className)}>
          <p>{shortcutToIcons(hotkey)}</p>
        </PopoverTrigger>
        <PopoverContent side="top" className="w-60 bg-zinc-800/90  border-zinc-500/70 text-center">
          <div className="flex items-center justify-center">
            {result.combination.length > 0 ? (
              <p className="mb-2">
                {result.combination.map((key, index) => (
                  <span
                    key={index}
                    className={cn('bg-slate-500/40 text-sm p-0.5 px-2 rounded-md mb-2 mr-1', {
                      'text-red-500/80 bg-red-300/30 ': result.error,
                      'text-green-400/80 bg-green-400/30': result.success
                    })}
                  >
                    {shortcutToIcons(key)}
                  </span>
                ))}
              </p>
            ) : (
              <div className="flex items-center justify-center mb-2 opacity-60">
                <p className="text-xs text-gray-400 pr-2">eg: </p>
                <div className="flex gap-1">
                  <p className="bg-slate-500/40 text-sm p-0.5 px-2 rounded-md">
                    {shortcutToIcons('Command')}
                  </p>
                  <p className="bg-slate-500/40 text-sm p-0.5 px-2 rounded-md">
                    {shortcutToIcons('S')}
                  </p>
                </div>
              </div>
            )}
          </div>
          {result.error ? (
            <p className="text-xs text-red-500 font-semibold">{result.error}</p>
          ) : (
            <p className="text-xs text-gray-400 font-semibold">Recording...</p>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
