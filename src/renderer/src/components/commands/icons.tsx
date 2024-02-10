import React from 'react'
import { ActionType } from '@shared/actions'
import LeftHalf from '../icons/LeftHalf'
import ThirdCenter from '../icons/ThirdCenter'
import ThirdLeft from '../icons/ThirdLeft'
import RightHalf from '../icons/RightHalf'
import TopHalf from '../icons/TopHalf'
import BottomHalf from '../icons/BottomHalf'
import CenterHalf from '../icons/CenterHalf'
import TopLeft from '../icons/TopLeft'
import TopRight from '../icons/TopRight'
import BottomLeft from '../icons/BottomLeft'
import BottomRight from '../icons/BottomRight'
import Maximize from '../icons/Maximize'

const commandIcons: Record<ActionType, React.ElementType> = {
  [ActionType.LeftHalf]: LeftHalf,
  [ActionType.RightHalf]: RightHalf,
  [ActionType.TopHalf]: TopHalf,
  [ActionType.BottomHalf]: BottomHalf,
  [ActionType.CenterHalf]: CenterHalf,
  [ActionType.TopLeft]: TopLeft,
  [ActionType.TopRight]: TopRight,
  [ActionType.BottomLeft]: BottomLeft,
  [ActionType.BottomRight]: BottomRight,
  [ActionType.LeftOneThird]: ThirdLeft,
  [ActionType.RightOneThird]: () => <></>,
  [ActionType.TopOneThird]: () => <></>,
  [ActionType.BottomOneThird]: () => <></>,
  [ActionType.CenterOneThird]: ThirdCenter,
  [ActionType.Maximize]: Maximize
}

export const renderCommandIcon = (actionType: ActionType) => {
  const Icon = commandIcons[actionType]
  return <Icon width={15} height={15} />
}
