import React from 'react'

const PlusIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.size || 24}
    height={props.size || 24}
    className="cursor-pointer"
    fill="none"
    {...props}
  >
    <line
      x1="12"
      y1="0"
      x2="12"
      y2="24"
      stroke={props.color || 'currentColor'}
      strokeWidth="2"
    />
    <line
      x1="0"
      y1="12"
      x2="24"
      y2="12"
      stroke={props.color || 'currentColor'}
      strokeWidth="2"
    />
  </svg>
)

export default PlusIcon
