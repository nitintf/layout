import { SVGProps } from 'react'

export default function TopHalf(props: SVGProps<SVGSVGElement>) {
  return (
    <>
      <svg
        width="190"
        height="190"
        viewBox="0 0 190 190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect width="190" height="190" rx="53" fill="#F28585" />
        <rect
          x="20.0016"
          y="98.2725"
          width="80.7784"
          height="138"
          rx="18"
          transform="rotate(-90.2055 26.0016 98.2725)"
          fill="white"
        />
      </svg>
    </>
  )
}
