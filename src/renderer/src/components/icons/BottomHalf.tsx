import { SVGProps } from 'react'

export default function BottomHalf(props: SVGProps<SVGSVGElement>) {
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
        <rect width="190" height="190" rx="53" fill="#3b82f6" />
        <rect
          x="36.2896"
          y="170.273"
          width="80.7784"
          height="138"
          rx="18"
          transform="rotate(-90.2055 26.2896 170.273)"
          fill="white"
        />
      </svg>
    </>
  )
}
