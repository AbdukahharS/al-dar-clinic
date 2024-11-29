import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import classNames from 'classnames'

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  whileHover = { scale: 1.05 },
  whileTap = { scale: 0.95 },
  transition = { type: 'spring', stiffness: 300 },
}) => {
  const buttonRef = useRef(null)
  const [isDisabled, setIsDisabled] = useState(disabled)

  useEffect(() => {
    // Sync with the initial disabled state when the component mounts
    if (buttonRef.current) {
      setIsDisabled(buttonRef.current.disabled)
    }
  }, [])

  useEffect(() => {
    // Watch for changes to the disabled state on the button element
    const interval = setInterval(() => {
      if (buttonRef.current && buttonRef.current.disabled !== isDisabled) {
        setIsDisabled(buttonRef.current.disabled)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isDisabled])

  const baseClasses = 'rounded-full font-medium focus:outline-none'
  const variantClasses = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white hover:bg-gray-600 focus:ring-gray-400',
    danger: 'bg-red-500 text-white',
    outline: 'border border-white text-white',
    ghost: '',
  }
  const sizeClasses = {
    sm: 'px-5 py-1 text-sm',
    md: 'px-7 py-2 text-base',
    lg: 'px-10 py-3 text-xl',
    icon: 'h-12 w-12 flex items-center justify-center rounded-full',
    iconSM: 'h-8 w-8 flex items-center justify-center rounded-full',
  }

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      whileHover={!isDisabled ? whileHover : undefined}
      whileTap={!isDisabled ? whileTap : undefined}
      transition={transition}
      className={classNames(
        baseClasses,
        variantClasses[variant],
        variant !== 'icon' && sizeClasses[size],
        isDisabled ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
    >
      {children}
    </motion.button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'danger',
    'outline',
    'ghost',
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'icon', 'iconSM']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  whileHover: PropTypes.object,
  whileTap: PropTypes.object,
  transition: PropTypes.object,
}

export default Button
