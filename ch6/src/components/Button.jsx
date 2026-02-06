import React from 'react'

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyle =
    'px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 shadow-lg'
  const variants = {
    primary:
      'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-indigo-500/30',
    secondary:
      'bg-white/80 text-gray-700 hover:bg-white hover:text-indigo-600 backdrop-blur-sm border border-white/20',
    danger:
      'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-red-500/30',
    ghost:
      'bg-transparent hover:bg-white/20 text-indigo-600 hover:text-white shadow-none',
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
