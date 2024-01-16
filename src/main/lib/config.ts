import { appDirectoryName, fileEncoding } from '@shared/constants'
import { config as defaultConfig } from '@shared/config'
import { ensureDir, readFile, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import { AppConfig } from '@shared/types'

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getAppConfig = async (): Promise<AppConfig> => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const configFilePath = `${rootDir}/config.json`

  try {
    await stat(configFilePath)
  } catch (error) {
    await writeFile(configFilePath, JSON.stringify(defaultConfig), fileEncoding)
    return defaultConfig
  }

  const config = await readFile(configFilePath, fileEncoding)

  return JSON.parse(config)
}
