/* eslint-disable react/jsx-props-no-spreading */
import { HTMLAttributes, ReactNode } from 'react';
import styles from './button.module.scss';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ className, children, ...rest }: Props) => {
  return (
    <button
      className={className ? [styles.button, className].join(' ') : styles.button}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
