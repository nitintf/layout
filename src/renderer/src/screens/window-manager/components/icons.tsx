import React from 'react'
import { ActionType } from '@shared/actions'
import LeftHalf from '../../../components/icons/LeftHalf'
import ThirdCenter from '../../../components/icons/ThirdCenter'
import ThirdLeft from '../../../components/icons/ThirdLeft'
import RightHalf from '../../../components/icons/RightHalf'
import TopHalf from '../../../components/icons/TopHalf'
import BottomHalf from '../../../components/icons/BottomHalf'
import CenterHalf from '../../../components/icons/CenterHalf'
import TopLeft from '../../../components/icons/TopLeft'
import TopRight from '../../../components/icons/TopRight'
import BottomLeft from '../../../components/icons/BottomLeft'
import BottomRight from '../../../components/icons/BottomRight'
import Maximize from '../../../components/icons/Maximize'

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

export const renderCommandIcon = (actionType: ActionType, isDisabled: boolean) => {
  const Icon = commandIcons[actionType]
  return <Icon width={15} height={15} opacity={isDisabled ? '0.5' : '1'} />
}
