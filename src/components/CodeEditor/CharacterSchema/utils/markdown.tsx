import { forwardRef } from 'react';

type MarkdownContentProps = {
  children: string;
  // eslint-disable-next-line react/require-default-props
  onlyShowFirstChild?: boolean;
  type: 'description' | 'deprecation';
};

const MarkdownContent = forwardRef<
  HTMLDivElement,
  MarkdownContentProps & Omit<JSX.IntrinsicElements['div'], 'children'>
>(({ children, onlyShowFirstChild, type, ...props }, ref) => {
  const classNames = [`graphiql-markdown-${type}`];
  if (props.className) {
    classNames.push(props.className);
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <div {...props} ref={ref} className={classNames.join(' ')} />;
});

MarkdownContent.displayName = 'MarkdownContent';

export default MarkdownContent;
