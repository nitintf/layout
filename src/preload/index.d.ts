import { AppConfig } from '@shared/types'

declare global {
  interface Window {
    context: {
      locale: string
      getAppConfig: () => Promise<AppConfig>
      updateAppConfig: (config: AppConfig) => Promise<void>
      resetAppConfig: () => Promise<boolean>
    }
  }
}
