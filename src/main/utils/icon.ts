import { nativeImage } from 'electron'
import path from 'path'

export const getAppIcon = () => {
  return nativeImage.createFromPath(path.join(__dirname, '../../resources/icon.icns'))
}
