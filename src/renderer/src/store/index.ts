import { AppConfig } from '@shared/types'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'

const loadConfig = async () => {
  const data = await window.context.getAppConfig()

  return data
}

const configAsyncAtom = atom<AppConfig | Promise<AppConfig>>(loadConfig())

const configAtom = unwrap(configAsyncAtom, (prev) => prev)

export { configAtom, configAsyncAtom }
