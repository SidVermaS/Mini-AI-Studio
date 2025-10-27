import { ClassName } from '@/types';

export type LabelProps = {
    text: string;
    htmlFor: string;
    className?: ClassName;
}
const Label = ({ text, htmlFor, className }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={`block text-md font-normal ${className}`}>
      {text}
    </label>
  )
}

export default Label