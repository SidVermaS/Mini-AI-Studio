import { ClassName } from '@/types';
import React from 'react'
export type ButtonProps = {
    text:string
      className?: ClassName;
}
const Button = ({text, className}  : ButtonProps) => {
  return (
    <button   className={`mt-4 w-full py-3 rounded-lg transition-colors button-var-primary  hover:button-var-primary-hover ${className}`}>
        {text}
    </button>
  )
}

export default Button