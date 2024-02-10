import { SVGProps } from 'react'

export default function RightHalf(props: SVGProps<SVGSVGElement>) {
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
        <rect x="76" y="17" width="81" height="145" rx="18" fill="white" />
      </svg>
    </>
  )
}
