import { ClassName } from '@/types';
import React from 'react'
import Loader from '../Loader';
export type ButtonProps = {
  isLoading?: boolean;
    text:string
      className?: ClassName;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button = ({text, className, isLoading, ...props}  : ButtonProps) => {
  return (
    <button  {...props} className={`mt-4 w-full py-1.5 rounded-lg transition-colors button-var-primary  hover:button-var-primary-hover ${className}`} >
        {isLoading?<Loader />:text}
    </button>
  )
}

export default Button