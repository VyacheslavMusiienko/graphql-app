/* eslint-disable react/jsx-props-no-spreading */
import { HTMLAttributes } from 'react';

import styles from './SvgNText.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  text: string;
  src: string;
}

const SvgNText = ({ text, src, className, ...rest }: Props) => {
  return (
    <div
      className={className ? [styles.container, className].join(' ') : styles.container}
      {...rest}
    >
      <img className={styles.img} src={src} alt={text} />
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default SvgNText;
