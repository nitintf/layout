import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

interface GapRangeSliderProps {
  gapSize: number
  setGapSize: (size: number) => void
}

const gapMarks = {
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  60: '60',
  70: '70',
  80: '80',
  90: '90'
}

export const GapRangeSlider: React.FC<GapRangeSliderProps> = ({ gapSize, setGapSize }) => {
  const handleChange = (value: number | number[]) => {
    setGapSize(Array.isArray(value) ? value[0] : value)
  }

  return (
    <div className="w-48">
      <Slider
        value={gapSize}
        onChange={handleChange}
        aria-labelledby="gap-size-slider"
        min={0}
        max={100}
        step={10}
        marks={gapMarks}
        range
        dots
        dotStyle={{
          backgroundColor: '#86898b',
          border: 'none'
        }}
        activeDotStyle={{
          backgroundColor: '#515255'
        }}
        styles={{
          track: { backgroundColor: '#5a5f65' },
          rail: { backgroundColor: '#5d6064' },
          handle: {
            backgroundColor: '#515255',
            height: 20,
            borderRadius: 5,
            width: 3,
            marginTop: -8,
            display: 'none'
          }
        }}
      />
    </div>
  )
}
