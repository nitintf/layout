import { ActionType } from '@shared/actions'
import { execSync } from 'child_process'
import { screen } from 'electron'

export default class Alignment {
  screenWidth: number
  screenHeight: number
  alignmentActions: { [key in ActionType]?: () => void }

  constructor() {
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
      // [ActionType.Center]: () => this.alignCenter()
    }
  }

  private execAlignmentScript(script: string, alignment: string): void {
    try {
      execSync(`osascript -e '${script}'`)
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

  alignLeft(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        -- Set position to {0, 0} (align left) and size to {screenWidth / 2, screen height}
        set position of frontWindow to {0, 0}
        set size of frontWindow to {${this.screenWidth / 2}, ${this.screenHeight}}
      end tell
    `

    this.execAlignmentScript(script, 'left')
  }

  alignRight(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        -- Set position to {screenWidth / 2, 0} (align right) and size to {screenWidth / 2, screen height}
        set position of frontWindow to {${this.screenWidth / 2}, 0}
        set size of frontWindow to {${this.screenWidth / 2}, ${this.screenHeight}}
      end tell
    `

    this.execAlignmentScript(script, 'right')
  }

  alignTopHalf(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        -- Set position to {0, 0} (align left) and size to {screenWidth / 2, screen height}
        set position of frontWindow to {0, 0}
        set size of frontWindow to {${this.screenWidth}, ${this.screenHeight / 2}}
      end tell
    `

    this.execAlignmentScript(script, 'top')
  }

  alignBottomHalf(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        -- Set position to {0, screenHeight / 2} (align bottom) and size to {screenWidth, screenHeight / 2}
        set position of frontWindow to {0, ${this.screenHeight / 2}}
        set size of frontWindow to {${this.screenWidth}, ${this.screenHeight / 2}}
      end tell
    `

    this.execAlignmentScript(script, 'bottom')
  }

  alignMaximize(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        -- Set position to {0, 0} (align left) and size to {screenWidth / 2, screen height}
        set position of frontWindow to {0, 0}
        set size of frontWindow to {${this.screenWidth}, ${this.screenHeight}}
      end tell
    `

    this.execAlignmentScript(script, 'maximize')
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

    this.execAlignmentScript(script, 'center')
  }

  alignTopLeft(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        -- Set position to {0, 0} (align left) and size to {screenWidth / 2, screen height}
        set position of frontWindow to {0, 0}
        set size of frontWindow to {${this.screenWidth / 2}, ${this.screenHeight / 2}}
      end tell
    `

    this.execAlignmentScript(script, 'top-left')
  }

  alignBottomLeft(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        -- Set position to {0, screenHeight / 2} (align bottom) and size to {screenWidth, screenHeight / 2}
        set position of frontWindow to {0, ${this.screenHeight / 2}}
        set size of frontWindow to {${this.screenWidth / 2}, ${this.screenHeight / 2}}
      end tell
    `

    this.execAlignmentScript(script, 'bottom-left')
  }

  alignTopRight(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        -- Set position to {screenWidth / 2, 0} (align right) and size to {screenWidth / 2, screen height}
        set position of frontWindow to {${this.screenWidth / 2}, 0}
        set size of frontWindow to {${this.screenWidth / 2}, ${this.screenHeight / 2}}
      end tell
    `

    this.execAlignmentScript(script, 'top-right')
  }

  alignBottomRight(): void {
    const script = `
      tell application "System Events"
        set frontmostProcess to first process whose frontmost is true
        set frontWindow to front window of frontmostProcess

        -- Set position to {screenWidth / 2, screenHeight / 2} (align bottom) and size to {screenWidth, screenHeight / 2}
        set position of frontWindow to {${this.screenWidth / 2}, ${this.screenHeight / 2}}
        set size of frontWindow to {${this.screenWidth / 2}, ${this.screenHeight / 2}}
      end tell
    `

    this.execAlignmentScript(script, 'bottom-right')
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

    this.execAlignmentScript(script, 'center')
  }
}
