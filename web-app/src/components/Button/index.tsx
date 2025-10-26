import { ClassName } from '@/types';
import React from 'react'
export type ButtonProps = {
    text:string
      className?: ClassName;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button = ({text, className, ...props}  : ButtonProps) => {
  return (
    <button  {...props} className={`mt-4 w-full py-1.5 rounded-lg transition-colors button-var-primary  hover:button-var-primary-hover ${className}`} >
        {text}
    </button>
  )
}

export default Button