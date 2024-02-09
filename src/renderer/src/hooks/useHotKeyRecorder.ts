import { useEffect, useState, useRef } from 'react'

const MacModifiers = ['Control', 'Alt', 'Shift', 'Meta']

const useHotKeyRecorder = (shouldListen: boolean) => {
  const [result, setResult] = useState<{
    success: boolean
    combination: string[]
    error: string | null
  }>({ success: false, combination: [], error: null })

  const keysDown = useRef(new Map<string, boolean>())

  const keyDownListener = (event: KeyboardEvent) => {
    if (event.repeat) return

    console.log('event :>> ', event)

    let key = event.key

    if (key.startsWith('Arrow')) {
      key = key.replace('Arrow', '')
    }

    if (/^[a-zA-Z]$/.test(key)) {
      key = key.toUpperCase()
    }

    setResult((prevResult) => {
      if (prevResult.error) return prevResult

      keysDown.current.set(key, true)
      if (
        (prevResult.combination.length === 0 ||
          !prevResult.combination.some((key) => MacModifiers.includes(key))) &&
        !MacModifiers.includes(key)
      ) {
        return {
          success: false,
          combination: [key],
          error: 'First key must be a MacModifier'
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
    setTimeout(() => {
      let key = event.key

      if (key.startsWith('Arrow')) {
        key = key.replace('Arrow', '')
      }

      if (/^[a-zA-Z]$/.test(key)) {
        key = key.toUpperCase()
      }
      keysDown.current.delete(key)
      setResult((prevResult) => {
        if (prevResult.success) return prevResult

        return {
          ...prevResult,
          combination: Array.from(keysDown.current.keys()),
          ...(prevResult.combination.length === 1 ? { error: null } : {})
        }
      })
    }, 700)
  }

  useEffect(() => {
    const newCombination = result.combination
    const firstModifierIndex = newCombination.findIndex((key) => MacModifiers.includes(key))
    const firstSimpleKeyIndex = newCombination.findIndex((key) => !MacModifiers.includes(key))
    const hasModifierBeforeSimpleKey =
      firstModifierIndex >= 0 &&
      firstSimpleKeyIndex >= 0 &&
      firstModifierIndex < firstSimpleKeyIndex
    if (hasModifierBeforeSimpleKey) {
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
        window.removeEventListener('keyup', keyUpListener)
      }

      return () => {
        window.removeEventListener('keydown', keyDownListener)
        window.removeEventListener('keyup', keyUpListener)
      }
    } else {
      if (result.success) return
      setResult({ success: false, combination: [], error: null })
    }
  }, [shouldListen, result.success])

  const reset = () => {
    setResult({ success: false, combination: [], error: null })
    keysDown.current.clear()
  }

  return { result, reset }
}

export default useHotKeyRecorder
