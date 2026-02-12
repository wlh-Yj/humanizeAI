export function HumanizeIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Halo */}
      <ellipse
        cx="50"
        cy="20"
        rx="18"
        ry="4"
        fill="currentColor"
        opacity="0.3"
      />
      
      {/* Robot Head */}
      <rect
        x="25"
        y="35"
        width="50"
        height="45"
        rx="12"
        fill="currentColor"
      />
      
      {/* Antenna */}
      <line
        x1="50"
        y1="25"
        x2="50"
        y2="35"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle
        cx="50"
        cy="25"
        r="3"
        fill="currentColor"
      />
      
      {/* Left Eye */}
      <circle
        cx="38"
        cy="52"
        r="8"
        fill="white"
      />
      <circle
        cx="40"
        cy="52"
        r="4"
        fill="currentColor"
      />
      
      {/* Right Eye */}
      <circle
        cx="62"
        cy="52"
        r="8"
        fill="white"
      />
      <circle
        cx="64"
        cy="52"
        r="4"
        fill="currentColor"
      />
      
      {/* Smile */}
      <path
        d="M 38 68 Q 50 75 62 68"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Left Arm */}
      <rect
        x="15"
        y="50"
        width="12"
        height="8"
        rx="4"
        fill="currentColor"
      />
      
      {/* Right Arm */}
      <rect
        x="73"
        y="50"
        width="12"
        height="8"
        rx="4"
        fill="currentColor"
      />
    </svg>
  )
}
