import { useEffect, useState, useRef } from 'react'
import isAccelerator from 'electron-is-accelerator'
import { KEY_CODES } from '@shared/keyCodes'

const MacModifiers = ['Control', 'Alt', 'Shift', 'Meta', 'Cmd']

const useHotKeyRecorder = (shouldListen: boolean) => {
  const [result, setResult] = useState<{
    success: boolean
    combination: string[]
    error: string | null
  }>({ success: false, combination: [], error: null })

  const keysDown = useRef(new Map<string, boolean>())

  const keyDownListener = (event: KeyboardEvent) => {
    if (event.repeat || event.key === 'Escape') return
    const key = KEY_CODES[event.keyCode]

    setResult((prevResult) => {
      if (prevResult.error) return prevResult
      console.log('key :>> ', key)

      keysDown.current.set(key, true)
      if (
        (prevResult.combination.length === 0 ||
          !prevResult.combination.some((key) => MacModifiers.includes(key))) &&
        !MacModifiers.includes(key)
      ) {
        return {
          success: false,
          combination: [key],
          error: 'At least one modifier should be included into a hotkey.'
        }
      } else {
        return {
          success: false,
          combination: Array.from(keysDown.current.keys()),
          error: null
        }
      }
    })
  }

  const keyUpListener = (event: KeyboardEvent) => {
    if (event.key === 'Escape') return
    setTimeout(() => {
      const key = KEY_CODES[event.keyCode]

      keysDown.current.delete(key)
      setResult((prevResult) => {
        if (prevResult.success) return prevResult

        if (prevResult.error) {
          keysDown.current.clear()
          return {
            ...prevResult,
            combination: [],
            error: null
          }
        }

        return {
          ...prevResult,
          combination: Array.from(keysDown.current.keys()),
          ...(prevResult.combination.length === 1 ? { error: null } : {})
        }
      })
    }, 200)
  }

  useEffect(() => {
    const newCombination = result.combination
    const firstModifierIndex = newCombination.findIndex((key) => MacModifiers.includes(key))
    const firstSimpleKeyIndex = newCombination.findIndex((key) => !MacModifiers.includes(key))
    const hasModifierBeforeSimpleKey =
      firstModifierIndex >= 0 &&
      firstSimpleKeyIndex >= 0 &&
      firstModifierIndex < firstSimpleKeyIndex
    if (isAccelerator(newCombination.join('+')) && hasModifierBeforeSimpleKey) {
      setResult((prevResult) => ({
        ...prevResult,
        success: true
      }))
    }
  }, [result.combination])

  useEffect(() => {
    if (shouldListen) {
      window.addEventListener('keydown', keyDownListener)
      window.addEventListener('keyup', keyUpListener)

      // If success is true, remove the listeners
      if (result.success) {
        window.removeEventListener('keydown', keyDownListener)
        window.removeEventListener('keyup', keyUpListener)
      } else if (result.error) {
        window.removeEventListener('keydown', keyDownListener)
      }
    } else {
      if (result.success) return
      setResult({ success: false, combination: [], error: null })
    }

    return () => {
      window.removeEventListener('keydown', keyDownListener)
      window.removeEventListener('keyup', keyUpListener)
    }
  }, [shouldListen, result.success, result.error])

  const reset = () => {
    setResult({ success: false, combination: [], error: null })
    keysDown.current.clear()
  }

  return { result, reset }
}

export default useHotKeyRecorder
