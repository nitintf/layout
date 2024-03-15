import React from 'react'
import * as Slider from '@radix-ui/react-slider'
import * as Tooltip from '@radix-ui/react-tooltip'

interface GapRangeSliderProps {
  gapSize: number
  setGapSize: (size: number) => void
}

export const GapRangeSlider: React.FC<GapRangeSliderProps> = ({ gapSize, setGapSize }) => {
  const handleChange = (value: number | number[]) => {
    console.log('value:', value)
    setGapSize(Array.isArray(value) ? value[0] : value)
  }

  return (
    <Slider.Root
      className="relative flex items-center select-none touch-none w-[200px] h-3"
      value={[gapSize]}
      min={0}
      max={100}
      step={10}
      onValueChange={handleChange}
    >
      <Slider.Track className="bg-zinc-500 relative grow rounded-full h-[3px]">
        <Slider.Range className="absolute bg-white rounded-full h-full" />
      </Slider.Track>
      <Tooltip.Provider>
        <Tooltip.Root open defaultOpen>
          <Tooltip.Trigger asChild>
            <Slider.Thumb
              className="block w-3 h-3 bg-white rounded-[10px] hover:bg-violet3"
              aria-label="Volume"
            />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="bottom"
              className="bg-zinc-900/70 text-[10px] font-semibold px-2 py-1 rounded-md"
              sideOffset={5}
            >
              {gapSize} px
              <Tooltip.Arrow className="fill-zinc-900/70" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </Slider.Root>
  )
}
