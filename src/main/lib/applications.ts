import { ExecException } from 'child_process'
import * as child_process from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

interface AppData {
  name: string
  icon: string | null
}

function getApplicationsWithIcons(
  callback: (error: ExecException | null, appData: AppData[] | null) => void
): void {
  child_process.exec(
    'mdfind kMDItemKind==Application',
    (err: ExecException | null, stdout: string) => {
      if (err) {
        callback(err, null)
        return
      }

      const apps: string[] = stdout.split('\n').filter(Boolean)
      const appData: AppData[] = apps.map((app: string) => {
        const appName: string = path.basename(app, '.app')
        const iconPath: string = path.join(app, 'Contents', 'Resources', `${appName}.icns`)

        return {
          name: appName,
          icon: fs.existsSync(iconPath) ? iconPath : null
        }
      })

      callback(null, appData)
    }
  )
}

getApplicationsWithIcons((err: ExecException | null, apps: AppData[] | null) => {
  if (err) {
    console.error(err)
    return
  }

  console.log(apps)
})
