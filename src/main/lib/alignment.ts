import { ActionType } from '@shared/actions'
import { AppConfig } from '@shared/types'
import { execSync } from 'child_process'
import { screen } from 'electron'

export default class Alignment {
  private screenWidth: number
  private screenHeight: number
  private menuBarHeight = 22
  private gapSize: number
  private windowsTracker = new Map<ActionType, boolean>()
  alignmentActions: { [key in ActionType]?: () => void }

  constructor(config: AppConfig) {
    this.gapSize = config.general.gapSize
    const mainScreen = screen.getPrimaryDisplay()
    this.screenWidth = mainScreen.workArea.width
    this.screenHeight = mainScreen.workArea.height

    this.alignmentActions = {
      [ActionType.LeftHalf]: this.alignLeft.bind(this),
      [ActionType.RightHalf]: this.alignRight.bind(this),
      [ActionType.TopHalf]: this.alignTopHalf.bind(this),
      [ActionType.BottomHalf]: this.alignBottomHalf.bind(this),
      [ActionType.CenterHalf]: this.alignCenterHalf.bind(this),
      [ActionType.TopLeft]: this.alignTopLeft.bind(this),
      [ActionType.TopRight]: this.alignTopRight.bind(this),
      [ActionType.BottomLeft]: this.alignBottomLeft.bind(this),
      [ActionType.BottomRight]: this.alignBottomRight.bind(this),
      [ActionType.Maximize]: this.alignMaximize.bind(this)
    }
  }

  private execAlignmentScript(script: string, alignment: ActionType): void {
    try {
      execSync(`osascript -e '${script}'`)
      this.windowsTracker.set(alignment, true)
    } catch (error) {
      console.error(
        `Error executing AppleScript for alignment ${alignment}:`,
        (error as Error).message
      )
    }
  }

  align(action: ActionType): void {
    const alignmentAction = this.alignmentActions[action]
    if (alignmentAction) {
      alignmentAction()
    }
  }

  reloadConfig(config: AppConfig): void {
    this.gapSize = config.general.gapSize
  }

  alignLeft(): void {
    const gapSize = this.gapSize
    const script = `
    tell application "System Events"
      set frontmostProcess to first process whose frontmost is true
      set frontWindow to front window of frontmostProcess

      set position of frontWindow to {${gapSize}, ${this.menuBarHeight + this.gapSize}}
      set size of frontWindow to {${this.screenWidth / 2 - 2 * gapSize}, ${this.screenHeight - 2 * gapSize}}
    end tell
  `

    this.execAlignmentScript(script, ActionType.LeftHalf)
  }

  alignRight(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        set position of frontWindow to {${this.screenWidth / 2}, ${this.menuBarHeight + this.gapSize}}
        set size of frontWindow to {${this.screenWidth / 2 - this.gapSize}, ${this.screenHeight - 2 * this.gapSize}}
      end tell
    `

    this.execAlignmentScript(script, ActionType.RightHalf)
  }

  alignTopHalf(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        set position of frontWindow to {${this.gapSize}, ${this.menuBarHeight + this.gapSize}}
        set size of frontWindow to {${this.screenWidth - 2 * this.gapSize}, ${this.screenHeight / 2 - 2 * this.gapSize}}
      end tell
    `

    this.execAlignmentScript(script, ActionType.TopHalf)
  }

  alignBottomHalf(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        set position of frontWindow to {${this.gapSize}, ${this.screenHeight / 2 + 2 * this.gapSize}}
        set size of frontWindow to {${this.screenWidth - 2 * this.gapSize}, ${this.screenHeight / 2 - this.gapSize}}
      end tell
    `

    this.execAlignmentScript(script, ActionType.BottomHalf)
  }

  alignMaximize(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        set position of frontWindow to {${this.gapSize}, ${this.menuBarHeight + this.gapSize}}
        set size of frontWindow to {${this.screenWidth - 2 * this.gapSize}, ${this.screenHeight - this.gapSize}}
      end tell
    `

    this.execAlignmentScript(script, ActionType.Maximize)
  }

  alignCenterHalf(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        -- Set position to {screenWidth / 4, screenHeight / 4} (align center) and size to {screenWidth / 2, screenHeight / 2}
        set position of frontWindow to {${this.screenWidth / 4}, ${this.screenHeight / 4}}
        set size of frontWindow to {${this.screenWidth / 2}, ${this.screenHeight / 2}}
      end tell
    `

    this.execAlignmentScript(script, ActionType.CenterHalf)
  }

  alignTopLeft(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        set position of frontWindow to {${this.gapSize}, ${this.menuBarHeight + this.gapSize}}
        set size of frontWindow to {${this.screenWidth / 2 - 2 * this.gapSize}, ${this.screenHeight / 2 - 2 * this.gapSize}}
      end tell
    `

    this.execAlignmentScript(script, ActionType.TopLeft)
  }

  alignBottomLeft(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        set position of frontWindow to {${this.gapSize}, ${this.screenHeight / 2 + 2 * this.gapSize}}
        set size of frontWindow to {${this.screenWidth / 2 - 2 * this.gapSize}, ${this.screenHeight / 2 - this.gapSize}}
      end tell
    `

    this.execAlignmentScript(script, ActionType.BottomLeft)
  }

  alignTopRight(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        set position of frontWindow to {${this.screenWidth / 2}, ${this.menuBarHeight + this.gapSize}}
        set size of frontWindow to {${this.screenWidth / 2 - this.gapSize}, ${this.screenHeight / 2 - 2 * this.gapSize}}
      end tell
    `

    this.execAlignmentScript(script, ActionType.TopRight)
  }

  alignBottomRight(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        -- Set position to {screenWidth / 2, screenHeight / 2} (align bottom) and size to {screenWidth, screenHeight / 2}
        set position of frontWindow to {${this.screenWidth / 2}, ${this.screenHeight / 2 + 2 * this.gapSize}}
        set size of frontWindow to {${this.screenWidth / 2 - this.gapSize}, ${this.screenHeight / 2 - this.gapSize}}
      end tell
    `

    this.execAlignmentScript(script, ActionType.BottomRight)
  }

  alignCenter(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        -- Get window size directly without using "get bounds"
        set windowSize to {size, position} of frontWindow

        -- Calculate the centered position
        set centerX to (${this.screenWidth} - item 1 of windowSize) / 2
        set centerY to (${this.screenHeight} - item 2 of windowSize) / 2

        -- Set position to {centerX, centerY}
        set position of frontWindow to {centerX, centerY}
      end tell
    `

    this.execAlignmentScript(script, ActionType.CenterHalf)
  }
}
