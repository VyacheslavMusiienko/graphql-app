import { forwardRef, HTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { SignInInputNames, SignUpInputNames } from '../../utils/enums';

interface Props extends HTMLAttributes<HTMLInputElement> {
  props: UseFormRegisterReturn<SignInInputNames | SignUpInputNames>;
  type: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, placeholder, type, props }, ref) => {
    const { onBlur, onChange, name } = props;
    return (
      <input
        name={name}
        ref={ref}
        className={className}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  }
);

export default Input;
