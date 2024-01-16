import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getAppConfig: () => ipcRenderer.invoke('get-app-config')
  })
} catch (error) {
  console.error(error)
}
