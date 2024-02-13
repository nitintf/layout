import { SVGProps } from 'react'

export default function TopLeft(props: SVGProps<SVGSVGElement>) {
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
          x="19.2501"
          y="90.0018"
          width="69.7521"
          height="100.868"
          rx="18"
          transform="rotate(-90.2055 19.2501 90.0018)"
          fill="white"
        />
      </svg>
    </>
  )
}
