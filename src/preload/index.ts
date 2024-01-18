import { AppConfig } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getAppConfig: () => ipcRenderer.invoke('get-app-config'),
    updateAppConfig: (config: AppConfig) => ipcRenderer.invoke('update-app-config', config)
  })
} catch (error) {
  console.error(error)
}
