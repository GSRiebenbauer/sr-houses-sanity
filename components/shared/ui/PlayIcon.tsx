const PlayIcon = (props) => (
  <svg
    className="cursor-pointer"
    width={props.size || 24}
    height={props.size || 24}
    {...props}
    viewBox="0 0 8 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 5.50024L0.500001 10.2634L0.500001 0.737104L8 5.50024Z"
      fill={props.color || 'currentColor'}
    />
  </svg>
)

export default PlayIcon
