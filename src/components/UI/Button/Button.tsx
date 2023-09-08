/* eslint-disable react/button-has-type */
import React from 'react'
import styles from './Button.module.scss'
import { getClassNames } from '../../../utils'
import { SmallLoader } from '..'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  children?: React.ReactNode
  isLoading?: boolean
  disabled?: boolean
  ariaLabel?: string
  tabIndex?: number
  color?: 'red' | 'black'
  ariaHidden?: boolean
  large?: boolean
}

function Button({
  type = 'button',
  onClick,
  className,
  children,
  isLoading,
  disabled = false,
  ariaLabel,
  tabIndex = 0,
  color = 'red',
  ariaHidden = false,
  large = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={getClassNames([
        styles.root,
        className,
        color === 'black' && styles.black,
        large && styles.large,
      ])}
      disabled={disabled}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      aria-hidden={ariaHidden}
    >
      {children}
      <span>{isLoading && <SmallLoader />}</span>
    </button>
  )
}

export default Button
