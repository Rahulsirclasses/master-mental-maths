"use client"

interface LogoProps {
  size?: number
  className?: string
}

export function Logo({ size = 40, className = "" }: LogoProps) {
  return (
    <img
      src="/logo-teal-dark.png"
      alt="Mental Math Mastery Logo"
      width={size}
      height={size}
      className={`transition-opacity duration-300 ${className}`}
    />
  )
}
