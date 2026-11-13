"use client"

interface FaviconLogoProps {
  size?: number
  className?: string
}

export function FaviconLogo({ size = 32, className = "" }: FaviconLogoProps) {
  return (
    <img
      src="/favicon-logo.png"
      alt="Mental Math Mastery Favicon"
      width={size}
      height={size}
      className={`${className}`}
      style={{ width: size, height: size }}
    />
  )
}
