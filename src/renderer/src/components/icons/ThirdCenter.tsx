import { SVGProps } from 'react'

export default function ThirdCenter(props: SVGProps<SVGSVGElement>) {
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
        <rect x="68" y="29" width="53" height="138" rx="18" fill="white" />
      </svg>
    </>
  )
}
