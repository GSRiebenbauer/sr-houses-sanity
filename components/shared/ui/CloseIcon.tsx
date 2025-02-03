const CloseIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.size || 24}
    height={props.size || 24}
    className={` ${props.className || ''}`}
    fill="none"
    {...props}
  >
    <line
      x1="4"
      y1="4"
      x2="20"
      y2="20"
      stroke={props.color || 'currentColor'}
      strokeWidth="2"
    />
    <line
      x1="20"
      y1="4"
      x2="4"
      y2="20"
      stroke={props.color || 'currentColor'}
      strokeWidth="2"
    />
  </svg>
)

export default CloseIcon
