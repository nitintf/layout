import { cn, wait } from '@renderer/utils'
import { KEYS_PRIORITY, shortcutToIcons } from '@renderer/utils/keys'
import React, { LegacyRef, useCallback, useEffect, useRef } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import useHotKeyRecorder from '@renderer/hooks/useHotKeyRecorder'
import useOnClickOutside from '@renderer/hooks/useOnClickOutside'
import { useAppConfig } from '@renderer/hooks/useAppConfig'
import { ActionType } from '@shared/actions'
// import acceleratorFormat from 'electron-accelerator-formatter'

interface HotkeyProps {
  hotkey: string
  action: ActionType
  isDisabled: boolean
  className?: string
}

export const Hotkey: React.FC<HotkeyProps> = ({ hotkey, className, action, isDisabled }) => {
  const ref = useRef<HTMLDivElement>() as LegacyRef<HTMLDivElement> | undefined

  const [listenForHotkey, setListenForHotkey] = React.useState(false)

  const { updateCommandsConfig } = useAppConfig()
  const { result, reset } = useHotKeyRecorder(listenForHotkey)

  useOnClickOutside(ref, () => setListenForHotkey(false))

  const closePopover = useCallback(() => {
    setListenForHotkey(false)
  }, [])

  const openPopover = useCallback(() => {
    if (isDisabled) return
    setListenForHotkey(true)
  }, [isDisabled])

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (result.success) {
        updateCommandsConfig(action, 'shortcut', result.combination.join('+'))
        // wait for the user to see the success message for better UX
        await wait(700)
        setListenForHotkey(false)
        reset()
      }
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [result, action, reset, updateCommandsConfig])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setListenForHotkey(false)
      }
    }

    if (listenForHotkey) {
      window.addEventListener('keydown', handleKeyDown)
    } else {
      window.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [listenForHotkey])

  return (
    <div ref={ref}>
      <Popover open={listenForHotkey} onOpenChange={openPopover}>
        <PopoverTrigger
          className={cn('text-xs text-gray-100', className, {
            'cursor-default': isDisabled
          })}
        >
          <p>{shortcutToIcons(hotkey)}</p>
        </PopoverTrigger>
        <PopoverContent
          onEscapeKeyDown={closePopover}
          side="top"
          className="w-60 bg-zinc-800/90  border-zinc-500/70 text-center"
        >
          <div className="flex items-center justify-center">
            {result.combination.length > 0 ? (
              <p className="mb-2">
                {shortcutToIcons(result.combination.join('+'))
                  .split('')
                  .filter(Boolean)
                  .map((key, index) => (
                    <span
                      key={index}
                      className={cn('bg-slate-500/40 text-sm p-0.5 px-1.5 rounded-md mb-2 mr-1', {
                        'text-red-500/80 bg-red-300/30 ': result.error,
                        'text-green-400/80 bg-green-400/30': result.success
                      })}
                    >
                      {key}
                    </span>
                  ))}
              </p>
            ) : (
              <div className="flex items-center justify-center mb-2 opacity-60">
                <p className="text-xs text-gray-400 pr-2">eg: </p>
                <div className="flex gap-1">
                  <p className="bg-slate-500/40 text-sm p-0.5 px-2 rounded-md">
                    {/* {acceleratorFormat('Command')} */}
                  </p>
                  <p className="bg-slate-500/40 text-sm p-0.5 px-2 rounded-md">
                    {/* {acceleratorFormat('S')} */}
                  </p>
                </div>
              </div>
            )}
          </div>
          {result.error ? (
            <p className="text-xs text-red-500 font-semibold">{result.error}</p>
          ) : (
            <p className="text-xs text-gray-400 font-semibold">
              {result.success ? 'Your new Hotkey is set.' : 'Recording...'}
            </p>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
