interface PlusIconProps {
  size?: number
  rotation?: number
  color?: string
}

const PlusIconMenu: React.FC<PlusIconProps> = ({
  size = 60,
  rotation = 0,
  color = 'white',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 60 60"
      className="transition-all"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <line x1="10" y1="30" x2="50" y2="30" stroke={color} strokeWidth="3" />
      <line x1="30" y1="10" x2="30" y2="50" stroke={color} strokeWidth="3" />
    </svg>
  )
}

export default PlusIconMenu
