import { SVGProps } from 'react'

export default function TopRight(props: SVGProps<SVGSVGElement>) {
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
          x="65.2501"
          y="89.1134"
          width="69.7521"
          height="100.868"
          rx="18"
          transform="rotate(-90.2055 65.2501 89.1134)"
          fill="white"
        />
      </svg>
    </>
  )
}
