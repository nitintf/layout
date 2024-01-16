import { AppConfig } from '@shared/types'

declare global {
  interface Window {
    context: {
      locale: string
      getAppConfig: () => Promise<AppConfig>
    }
  }
}
