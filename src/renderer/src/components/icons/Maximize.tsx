import { SVGProps } from 'react'

export default function Maximize(props: SVGProps<SVGSVGElement>) {
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
        <path
          d="M161.499 38.1491C161.581 33.4554 157.843 29.5837 153.149 29.5013L76.6609 28.1594C71.9672 28.0771 68.0954 31.8153 68.0131 36.509C67.9307 41.2027 71.669 45.0744 76.3627 45.1568L144.352 46.3496L143.159 114.339C143.077 119.033 146.815 122.905 151.509 122.987C156.203 123.069 160.074 119.331 160.157 114.637L161.499 38.1491ZM100.904 100.115L158.904 44.1149L147.096 31.8851L89.0959 87.8851L100.904 100.115Z"
          fill="white"
        />
        <path
          d="M29.5828 151.026C29.5494 155.721 33.3278 159.553 38.0221 159.587L114.52 160.13C119.215 160.164 123.047 156.385 123.08 151.691C123.114 146.997 119.335 143.164 114.641 143.131L46.6427 142.647L47.126 74.6491C47.1594 69.9548 43.381 66.1222 38.6867 66.0889C33.9924 66.0555 30.1598 69.8339 30.1265 74.5282L29.5828 151.026ZM89.5275 88.4316L32.115 145.034L44.0501 157.14L101.463 100.538L89.5275 88.4316Z"
          fill="white"
        />
      </svg>
    </>
  )
}
